import express from 'express'
import {
  transcribeFile,
  getTranscript,
  downloadSRT,
  downloadVTT,
  downloadSTL,
} from '../controllers/transcribeController'

const router = express.Router()

// Transcription routes
router.post('/transcribe', transcribeFile)
router.get('/transcript/:id', getTranscript)

// Download subtitle formats
router.get('/download/srt/:id', downloadSRT)
router.get('/download/vtt/:id', downloadVTT)
router.get('/download/stl/:id', downloadSTL)

export default router
