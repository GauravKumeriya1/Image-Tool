import axios, { AxiosProgressEvent } from 'axios'
import FormData from 'form-data'
import fs from 'fs'
import path from 'path'

const OPENAI_API_KEY = process.env.OPENAI_API_KEY

interface TranscriptionSegment {
  id: number
  seek: number
  start: number
  end: number
  text: string
  tokens: number[]
  temperature: number
  avg_logprob: number
  compression_ratio: number
  no_speech_prob: number
}

interface WhisperResponse {
  text: string
  language: string
  duration: number
  segments?: TranscriptionSegment[]
}

/**
 * Transcribe audio using OpenAI's Whisper API
 */
export const transcribeAudio = async (
  filePath: string,
  language?: string
): Promise<WhisperResponse> => {
  try {
    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY environment variable is not set')
    }

    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`)
    }

    const fileStream = fs.createReadStream(filePath)
    const form = new FormData()

    form.append('file', fileStream, path.basename(filePath))
    form.append('model', 'whisper-1')
    form.append('response_format', 'verbose_json')

    if (language) {
      form.append('language', language)
    }

    // Add timestamp_granularities for better timestamp data
    form.append('timestamp_granularities[]', 'segment')

    console.log(`Sending file to Whisper API: ${filePath}`)

    const response = await axios.post<WhisperResponse>(
      'https://api.openai.com/v1/audio/transcriptions',
      form,
      {
        headers: {
          ...form.getHeaders(),
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        timeout: 600000, // 10 minutes timeout for large files
      }
    )

    console.log(`Transcription completed for file: ${filePath}`)

    return {
      text: response.data.text,
      language: response.data.language,
      duration: response.data.duration || 0,
      segments: response.data.segments,
    }
  } catch (error: any) {
    console.error('Whisper API error:', error.response?.data || error.message)

    if (error.response?.status === 401) {
      throw new Error('Invalid OpenAI API key')
    }

    if (error.response?.status === 429) {
      throw new Error('Rate limit exceeded. Please try again later.')
    }

    throw new Error(
      `Transcription failed: ${error.response?.data?.error?.message || error.message}`
    )
  }
}

/**
 * Get transcription with detailed segments and timing
 */
export const getTranscriptionWithTimings = async (
  filePath: string,
  language?: string
): Promise<WhisperResponse> => {
  return transcribeAudio(filePath, language)
}
