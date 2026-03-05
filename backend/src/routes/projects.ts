import express from 'express'
import { authMiddleware, AuthRequest } from '../middleware/auth'

const router = express.Router()

// Get all projects for user
router.get('/', authMiddleware, (req: AuthRequest, res) => {
  // TODO: Implement get projects
  res.status(501).json({ message: 'Get projects not implemented' })
})

// Get project details
router.get('/:projectId', authMiddleware, (req: AuthRequest, res) => {
  // TODO: Implement get project
  res.status(501).json({ message: 'Get project not implemented' })
})

// Delete project
router.delete('/:projectId', authMiddleware, (req: AuthRequest, res) => {
  // TODO: Implement delete project
  res.status(501).json({ message: 'Delete project not implemented' })
})

// Download subtitles
router.get('/:projectId/subtitles/:format', authMiddleware, (req: AuthRequest, res) => {
  // TODO: Implement subtitle download
  res.status(501).json({ message: 'Subtitle download not implemented' })
})

export default router
