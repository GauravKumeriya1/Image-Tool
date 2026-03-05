import { Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { hashPassword, comparePassword } from '../utils/password'
import { generateToken } from '../utils/jwt'
import { query } from '../config/database'
import { CREATE_USER, GET_USER_BY_EMAIL } from '../models/queries'

export const signup = async (req: Request, res: Response) => {
  console.log('Signup function called')
  console.log('Request body:', req.body)
  console.log('Starting signup process...')
  try {
    const { name, email, password } = req.body

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' })
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' })
    }

    // Check if user already exists
    const existingUser = await query(GET_USER_BY_EMAIL, [email])
    if (existingUser.rows.length > 0) {
      return res.status(409).json({ message: 'User with this email already exists' })
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Create user
    const userId = uuidv4()
    const newUser = await query(CREATE_USER, [userId, name, email, hashedPassword])

    // Generate JWT token
    const token = generateToken(userId)

    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: newUser.rows[0].id,
        name: newUser.rows[0].name,
        email: newUser.rows[0].email,
        createdAt: newUser.rows[0].created_at,
      },
      token,
    })
  } catch (error) {
    console.error('Signup error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' })
    }

    // Find user
    const userResult = await query(GET_USER_BY_EMAIL, [email])
    if (userResult.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    const user = userResult.rows[0]

    // Verify password
    const isValidPassword = await comparePassword(password, user.password)
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    // Generate JWT token
    const token = generateToken(user.id)

    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.created_at,
      },
      token,
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const logout = async (req: Request, res: Response) => {
  // For JWT, logout is handled client-side by removing the token
  res.json({ message: 'Logout successful' })
}

export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const userResult = await query('SELECT id, name, email, created_at FROM users WHERE id = $1', [userId])

    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json({
      user: userResult.rows[0],
    })
  } catch (error) {
    console.error('Get profile error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}