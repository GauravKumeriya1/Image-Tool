import { Request, Response } from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { v4 as uuidv4 } from 'uuid'
import { query } from '../config/database'

// Configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = process.env.UPLOAD_DIR || './uploads'
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }
    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`
    cb(null, uniqueName)
  },
})

const fileFilter = (req: any, file: Express.Multer.File, cb: Function) => {
  // Accept audio and video files
  const allowedMimes = [
    'audio/mpeg',
    'audio/wav',
    'audio/mp4',
    'audio/ogg',
    'audio/webm',
    'video/mp4',
    'video/quicktime',
    'video/x-msvideo',
    'video/x-matroska',
    'video/webm',
  ]

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error('Invalid file type. Only audio and video files are allowed.'))
  }
}

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE || '104857600'), // 100MB
  },
})

export const uploadFile = async (req: any, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' })
    }

    const { projectName, language = 'en' } = req.body

    if (!projectName) {
      // Delete file if no project name
      fs.unlinkSync(req.file.path)
      return res.status(400).json({ error: 'Project name is required' })
    }

    const fileId = uuidv4()
    const fileName = req.file.filename
    const filePath = req.file.path
    const fileSize = req.file.size
    const mimeType = req.file.mimetype

    // Save file metadata to database
    const insertQuery = `
      INSERT INTO uploads (id, file_name, file_path, file_size, mime_type, project_name, language, status, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW())
      RETURNING id, file_name, project_name, status, created_at
    `

    const result = await query(insertQuery, [
      fileId,
      fileName,
      filePath,
      fileSize,
      mimeType,
      projectName,
      language,
      'uploaded',
    ])

    res.status(201).json({
      success: true,
      message: 'File uploaded successfully',
      data: {
        id: result.rows[0].id,
        fileName: result.rows[0].file_name,
        projectName: result.rows[0].project_name,
        status: result.rows[0].status,
        createdAt: result.rows[0].created_at,
      },
    })
  } catch (error: any) {
    // Clean up uploaded file on error
    if (req.file) {
      fs.unlinkSync(req.file.path)
    }

    console.error('Upload error:', error)
    res.status(500).json({
      error: 'Failed to upload file',
      message: error.message,
    })
  }
}
