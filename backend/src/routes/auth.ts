import express from 'express'
import { authMiddleware } from '../middleware/auth'
import { signup, login, logout, getProfile } from '../controllers/authController'

const router = express.Router()

// Auth Routes
router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', authMiddleware, logout)
router.get('/profile', authMiddleware, getProfile)

export default router
