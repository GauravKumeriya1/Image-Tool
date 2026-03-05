import { Request, Response } from 'express'
import { query } from '../config/database'
import { transcribeAudio } from '../services/whisperService'
import {
  generateSRT,
  generateVTT,
  generateSTL,
  generateJSON,
} from '../services/subtitleService'
import fs from 'fs'
import path from 'path'

/**
 * Start transcription process
 * POST /transcribe
 */
export const transcribeFile = async (req: Request, res: Response) => {
  try {
    const { uploadId } = req.body

    if (!uploadId) {
      return res.status(400).json({ error: 'uploadId is required' })
    }

    // Get file info from database
    const fileQuery = 'SELECT * FROM uploads WHERE id = $1'
    const fileResult = await query(fileQuery, [uploadId])

    if (fileResult.rows.length === 0) {
      return res.status(404).json({ error: 'File not found' })
    }

    const fileRecord = fileResult.rows[0]
    const filePath = fileRecord.file_path
    const language = fileRecord.language

    // Update status to processing
    await query('UPDATE uploads SET status = $1, updated_at = NOW() WHERE id = $2', [
      'processing',
      uploadId,
    ])

    // Call Whisper API
    console.log(`Starting transcription for upload: ${uploadId}`)
    const transcription = await transcribeAudio(filePath, language)

    // Generate subtitles in all formats
    const srtContent = generateSRT(transcription.text, transcription.segments)
    const vttContent = generateVTT(transcription.text, transcription.segments)
    const stlContent = generateSTL(transcription.text, transcription.segments)
    const jsonContent = generateJSON(transcription.text, transcription.segments)

    // Save transcript to database
    const transcriptId = require('uuid').v4()

    const transcriptQuery = `
      INSERT INTO transcripts (
        id, upload_id, full_text, language, duration, 
        srt_content, vtt_content, stl_content, json_content,
        status, created_at, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW(), NOW())
      RETURNING id, upload_id, status, created_at
    `

    const transcriptResult = await query(transcriptQuery, [
      transcriptId,
      uploadId,
      transcription.text,
      transcription.language,
      transcription.duration || 0,
      srtContent,
      vttContent,
      stlContent.toString(),
      jsonContent,
      'completed',
    ])

    // Update upload status
    await query('UPDATE uploads SET status = $1, updated_at = NOW() WHERE id = $2', [
      'completed',
      uploadId,
    ])

    res.status(201).json({
      success: true,
      message: 'Transcription completed successfully',
      data: {
        transcriptId: transcriptResult.rows[0].id,
        uploadId: transcriptResult.rows[0].upload_id,
        status: transcriptResult.rows[0].status,
        createdAt: transcriptResult.rows[0].created_at,
      },
    })
  } catch (error: any) {
    console.error('Transcription error:', error)

    // Update status to failed
    if (req.body.uploadId) {
      await query('UPDATE uploads SET status = $1, updated_at = NOW() WHERE id = $2', [
        'failed',
        req.body.uploadId,
      ]).catch(console.error)
    }

    res.status(500).json({
      error: 'Transcription failed',
      message: error.message,
    })
  }
}

/**
 * Get transcript by ID
 * GET /transcript/:id
 */
export const getTranscript = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const query_text = `
      SELECT 
        t.*, 
        u.file_name, u.project_name, u.mime_type
      FROM transcripts t
      JOIN uploads u ON t.upload_id = u.id
      WHERE t.id = $1
    `

    const result = await query(query_text, [id])

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Transcript not found' })
    }

    const transcript = result.rows[0]

    res.status(200).json({
      success: true,
      data: {
        id: transcript.id,
        uploadId: transcript.upload_id,
        fileName: transcript.file_name,
        projectName: transcript.project_name,
        mimeType: transcript.mime_type,
        language: transcript.language,
        duration: transcript.duration,
        fullText: transcript.full_text,
        status: transcript.status,
        createdAt: transcript.created_at,
        updatedAt: transcript.updated_at,
      },
    })
  } catch (error: any) {
    console.error('Get transcript error:', error)
    res.status(500).json({
      error: 'Failed to retrieve transcript',
      message: error.message,
    })
  }
}

/**
 * Download transcript in SRT format
 * GET /download/srt/:id
 */
export const downloadSRT = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const result = await query('SELECT srt_content, upload_id FROM transcripts WHERE id = $1', [
      id,
    ])

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Transcript not found' })
    }

    const { srt_content, upload_id } = result.rows[0]

    // Get project name for filename
    const uploadResult = await query('SELECT project_name FROM uploads WHERE id = $1', [
      upload_id,
    ])

    const projectName = uploadResult.rows[0]?.project_name || 'subtitle'
    const filename = `${projectName}.srt`

    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`)
    res.send(srt_content)
  } catch (error: any) {
    console.error('Download SRT error:', error)
    res.status(500).json({
      error: 'Failed to download SRT file',
      message: error.message,
    })
  }
}

/**
 * Download transcript in VTT format
 * GET /download/vtt/:id
 */
export const downloadVTT = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const result = await query('SELECT vtt_content, upload_id FROM transcripts WHERE id = $1', [
      id,
    ])

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Transcript not found' })
    }

    const { vtt_content, upload_id } = result.rows[0]

    // Get project name for filename
    const uploadResult = await query('SELECT project_name FROM uploads WHERE id = $1', [
      upload_id,
    ])

    const projectName = uploadResult.rows[0]?.project_name || 'subtitle'
    const filename = `${projectName}.vtt`

    res.setHeader('Content-Type', 'text/vtt; charset=utf-8')
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`)
    res.send(vtt_content)
  } catch (error: any) {
    console.error('Download VTT error:', error)
    res.status(500).json({
      error: 'Failed to download VTT file',
      message: error.message,
    })
  }
}

/**
 * Download transcript in STL format
 * GET /download/stl/:id
 */
export const downloadSTL = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const result = await query('SELECT stl_content, upload_id FROM transcripts WHERE id = $1', [
      id,
    ])

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Transcript not found' })
    }

    const { stl_content, upload_id } = result.rows[0]

    // Get project name for filename
    const uploadResult = await query('SELECT project_name FROM uploads WHERE id = $1', [
      upload_id,
    ])

    const projectName = uploadResult.rows[0]?.project_name || 'subtitle'
    const filename = `${projectName}.stl`

    res.setHeader('Content-Type', 'application/octet-stream')
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`)
    res.send(stl_content)
  } catch (error: any) {
    console.error('Download STL error:', error)
    res.status(500).json({
      error: 'Failed to download STL file',
      message: error.message,
    })
  }
}
