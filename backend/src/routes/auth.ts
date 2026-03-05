import express from 'express'
import { authMiddleware } from '../middleware/auth'

const router = express.Router()

// Auth Routes
router.post('/login', (req, res) => {
  // TODO: Implement login
  res.status(501).json({ message: 'Login not implemented' })
})

router.post('/signup', (req, res) => {
  // TODO: Implement signup
  res.status(501).json({ message: 'Signup not implemented' })
})

router.post('/logout', authMiddleware, (req, res) => {
  // TODO: Implement logout
  res.status(501).json({ message: 'Logout not implemented' })
})

export default router
