import { Router } from 'express'
import { authMiddleware, adminMiddleware } from '../middleware/auth'
import {
  getAdminStats,
  getUsagePerUser,
  getAllUsers,
  deleteUser,
  getAllTranscripts
} from '../controllers/adminController'

const router = Router()

// All admin routes require authentication and admin role
router.use(authMiddleware)
router.use(adminMiddleware)

// Admin dashboard stats
router.get('/stats', getAdminStats)

// Usage statistics per user
router.get('/usage', getUsagePerUser)

// User management
router.get('/users', getAllUsers)
router.delete('/users/:userId', deleteUser)

// Transcript management
router.get('/transcripts', getAllTranscripts)

export default router