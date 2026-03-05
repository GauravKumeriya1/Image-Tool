import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
import uploadRoutes from './routes/upload'
import transcribeRoutes from './routes/transcribe'
import authRoutes from './routes/auth'
import projectRoutes from './routes/projects'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(helmet())
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Log all requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.path}`)
  next()
})

// Routes
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  })
})

// API Routes
app.post('/api/upload', uploadRoutes)
app.post('/api/transcribe', transcribeRoutes)
app.get('/api/transcript/:id', transcribeRoutes)
app.get('/api/download/srt/:id', transcribeRoutes)
app.get('/api/download/vtt/:id', transcribeRoutes)
app.get('/api/download/stl/:id', transcribeRoutes)

app.use('/api/auth', authRoutes)
app.use('/api/projects', projectRoutes)

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Not Found',
    message: `${req.method} ${req.path} not found`
  })
})

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err)
  
  // Handle multer errors
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({
      error: 'File too large',
      message: 'Maximum file size exceeded'
    })
  }

  if (err.code === 'LIMIT_UNEXPECTED_FILE') {
    return res.status(400).json({
      error: 'Invalid file upload',
      message: 'Unexpected file in upload'
    })
  }

  res.status(err.status || 500).json({
    error: err.error || 'Internal Server Error',
    message: err.message || 'An unexpected error occurred',
  })
})

app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════╗
║  Subtitle AI Backend Server Started  ║
║  Port: ${PORT}                         
║  Time: ${new Date().toISOString()}
╚══════════════════════════════════════╝
  `)
  console.log(`API Health: http://localhost:${PORT}/api/health`)
})
