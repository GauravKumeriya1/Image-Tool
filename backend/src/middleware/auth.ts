import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../utils/jwt'
import { query } from '../config/database'
import { GET_USER_BY_ID } from '../models/queries'

export interface AuthRequest extends Request {
  userId?: string
  user?: any
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      return res.status(401).json({ message: 'No token provided' })
    }

    const decoded = verifyToken(token)
    req.userId = decoded.userId
    next()
  } catch (error: any) {
    res.status(401).json({ message: error.message || 'Invalid token' })
  }
}

export const adminMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    // Get user details including role
    const userResult = await query(GET_USER_BY_ID, [req.userId])
    if (userResult.rows.length === 0) {
      return res.status(401).json({ message: 'User not found' })
    }

    const user = userResult.rows[0]
    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' })
    }

    req.user = user
    next()
  } catch (error) {
    console.error('Admin middleware error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
