import { Request, Response } from 'express'
import { query } from '../config/database'
import { AuthRequest } from '../middleware/auth'

// Admin Queries
const GET_TOTAL_USERS = `SELECT COUNT(*) as count FROM users`
const GET_TOTAL_TRANSCRIPTS = `SELECT COUNT(*) as count FROM transcripts`
const GET_USAGE_PER_USER = `
  SELECT
    u.id,
    u.name,
    u.email,
    COUNT(t.id) as transcript_count,
    COUNT(p.id) as project_count,
    u.created_at
  FROM users u
  LEFT JOIN projects p ON u.id = p.user_id
  LEFT JOIN transcripts t ON p.id = t.upload_id
  GROUP BY u.id, u.name, u.email, u.created_at
  ORDER BY transcript_count DESC
`
const GET_ALL_USERS = `
  SELECT id, name, email, role, created_at, updated_at
  FROM users
  ORDER BY created_at DESC
`
const GET_ALL_TRANSCRIPTS = `
  SELECT
    t.id,
    t.full_text,
    t.language,
    t.duration,
    t.status,
    t.created_at,
    u.file_name,
    u.file_size,
    usr.name as user_name,
    usr.email as user_email
  FROM transcripts t
  JOIN uploads u ON t.upload_id = u.id
  JOIN projects p ON u.id = p.id
  JOIN users usr ON p.user_id = usr.id
  ORDER BY t.created_at DESC
  LIMIT 100
`
const DELETE_USER_BY_ID = `DELETE FROM users WHERE id = $1`

export const getAdminStats = async (req: AuthRequest, res: Response) => {
  try {
    const [usersResult, transcriptsResult] = await Promise.all([
      query(GET_TOTAL_USERS),
      query(GET_TOTAL_TRANSCRIPTS)
    ])

    const totalUsers = parseInt(usersResult.rows[0].count)
    const totalTranscripts = parseInt(transcriptsResult.rows[0].count)

    res.json({
      totalUsers,
      totalTranscripts
    })
  } catch (error) {
    console.error('Get admin stats error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const getUsagePerUser = async (req: AuthRequest, res: Response) => {
  try {
    const result = await query(GET_USAGE_PER_USER)
    res.json(result.rows)
  } catch (error) {
    console.error('Get usage per user error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const getAllUsers = async (req: AuthRequest, res: Response) => {
  try {
    const result = await query(GET_ALL_USERS)
    res.json(result.rows)
  } catch (error) {
    console.error('Get all users error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const deleteUser = async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req.params

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' })
    }

    // Prevent admin from deleting themselves
    if (req.userId === userId) {
      return res.status(400).json({ message: 'Cannot delete your own account' })
    }

    const result = await query(DELETE_USER_BY_ID, [userId])

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json({ message: 'User deleted successfully' })
  } catch (error) {
    console.error('Delete user error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const getAllTranscripts = async (req: AuthRequest, res: Response) => {
  try {
    const result = await query(GET_ALL_TRANSCRIPTS)
    res.json(result.rows)
  } catch (error) {
    console.error('Get all transcripts error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}