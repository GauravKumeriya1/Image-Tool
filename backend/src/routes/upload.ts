import express from 'express'
import { uploadFile, upload } from '../controllers/uploadController'

const router = express.Router()

// Upload endpoint with file handling
router.post('/', upload.single('file'), uploadFile)

export default router
