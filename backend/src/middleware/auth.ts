import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../utils/jwt'

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

export const adminMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  // TODO: Implement role checking
  if (!req.userId) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
  // Check if user is admin
  next()
}
