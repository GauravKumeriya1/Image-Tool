# Architecture Overview

## System Architecture

```
┌─────────────┐         ┌──────────────┐         ┌──────────────┐
│  Next.js    │◄─────► │   Express    │◄─────► │ PostgreSQL   │
│ Frontend    │ HTTP   │   Backend    │  TCP   │   Database   │
└─────────────┘         └──────────────┘         └──────────────┘
       │                       │
       │                       ├──────────► OpenAI Whisper API
       │                       │
       │                       └──────────► File Storage (Local/S3)
       │
       └──────────────────────► Multer (File Upload)
```

## Key Components

### Frontend (Next.js)
- **Authentication**: JWT-based auth
- **State Management**: Zustand for global state
- **Styling**: Tailwind CSS
- **API Integration**: Axios client with interceptors
- **Pages**: Auth, Dashboard, Admin, Landing

### Backend (Express.js)
- **API Routes**: Auth, Upload, Projects
- **Database**: PostgreSQL with connection pooling
- **File Handling**: Multer for uploads
- **AI Integration**: OpenAI Whisper API
- **Security**: JWT, CORS, Helmet

### Database (PostgreSQL)
- **Users**: User accounts and roles
- **Projects**: Upload records and metadata
- **Subtitles**: Generated subtitles in different formats

## Data Flow

### Upload Flow
1. User selects file in dashboard
2. Frontend uploads to `/api/upload`
3. Backend stores file and creates project record
4. Webhook triggers transcription (async)
5. Whisper API transcribes audio
6. Backend generates subtitle formats
7. Frontend notifies user on completion

### Authentication Flow
1. User signs up/logs in
2. Backend validates credentials
3. JWT token generated
4. Frontend stores token in localStorage
5. Token sent with each API request
6. Backend validates token in middleware

## Security Considerations

- ✅ JWT tokens with expiration
- ✅ Password hashing with bcrypt
- ✅ CORS configuration
- ✅ File type validation
- ✅ File size limits
- ✅ SQL injection protection
- ✅ Environment variables for secrets
- ⚠️ TODO: Rate limiting
- ⚠️ TODO: Helmet security headers

## Scalability

### Improvements for Production
- Database replication
- Redis for caching
- Message queue (RabbitMQ/Bull) for async tasks
- CDN for static assets
- Load balancer
- Horizontal scaling for backend
- Database connection pooling
