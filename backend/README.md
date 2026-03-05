# Subtitle AI Backend

A powerful Node.js + Express backend for converting audio and video files to subtitles using OpenAI's Whisper API.

## ✨ Features

- ✅ **File Upload** - Support for audio and video files (MP3, WAV, MP4, MOV, AVI, etc.)
- ✅ **Whisper Integration** - Uses OpenAI's state-of-the-art Whisper API for transcription
- ✅ **Multiple Subtitle Formats** - Generate SRT, VTT, and STL subtitle files
- ✅ **Timestamp Precision** - Accurate timing for each subtitle segment
- ✅ **PostgreSQL Storage** - Persist transcripts and metadata
- ✅ **RESTful API** - Complete REST API with proper error handling
- ✅ **Async Processing** - Non-blocking transcription workflow

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 12+
- OpenAI API Key

### Installation

```bash
# Install dependencies
npm install

# Setup environment
cp ../.env.example .env

# Edit .env with your values
# OPENAI_API_KEY=sk_...
# DATABASE_URL=postgresql://user:password@localhost:5432/db
```

### Database Setup

```bash
# Run migrations
npm run migrate

# Or manually:
psql -U username -d database_name < migrations/001_init.sql
```

### Start Server

```bash
# Development
npm run dev

# Production
npm run build
npm start
```

Server will run at `http://localhost:3001`

## 📚 API Endpoints

### 1. Upload File
```
POST /api/upload
```
Upload audio or video file for transcription

**Request:**
```bash
curl -X POST http://localhost:3001/api/upload \
  -F "file=@audio.mp3" \
  -F "projectName=My Podcast" \
  -F "language=en"
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "fileName": "audio.mp3",
    "projectName": "My Podcast",
    "status": "uploaded"
  }
}
```

### 2. Transcribe Audio
```
POST /api/transcribe
```
Start transcription using Whisper API

**Request:**
```json
{
  "uploadId": "uuid-from-upload"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "transcriptId": "uuid",
    "uploadId": "uuid",
    "status": "completed"
  }
}
```

### 3. Get Transcript
```
GET /api/transcript/:id
```
Get full transcript with metadata

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "uploadId": "uuid",
    "fullText": "Complete transcribed text...",
    "duration": 300.5,
    "language": "en",
    "status": "completed"
  }
}
```

### 4. Download SRT
```
GET /api/download/srt/:id
```

### 5. Download VTT
```
GET /api/download/vtt/:id
```

### 6. Download STL
```
GET /api/download/stl/:id
```

## 📁 Project Structure

```
backend/
├── src/
│   ├── index.ts                    # Server entry point
│   ├── routes/
│   │   ├── upload.ts              # Upload routes
│   │   ├── transcribe.ts           # Transcription routes
│   │   ├── auth.ts
│   │   └── projects.ts
│   ├── controllers/
│   │   ├── uploadController.ts     # Upload logic
│   │   └── transcribeController.ts # Transcription logic
│   ├── services/
│   │   ├── whisperService.ts       # Whisper API integration
│   │   └── subtitleService.ts      # Subtitle generators
│   ├── middleware/
│   │   └── auth.ts
│   ├── models/
│   │   └── queries.ts              # Database queries
│   ├── utils/
│   │   ├── jwt.ts
│   │   └── password.ts
│   └── config/
│       └── database.ts
├── migrations/
│   ├── 001_init.ts                 # Database schema
│   └── index.ts
├── uploads/                        # Upload storage
├── API_DOCUMENTATION.md            # Detailed API docs
└── package.json
```

## 🔧 Configuration

### Environment Variables

```env
# Server
PORT=3001
NODE_ENV=development

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/subtitleai_db

# OpenAI API
OPENAI_API_KEY=sk_...your_api_key...

# File Upload
MAX_FILE_SIZE=104857600  # 100MB
UPLOAD_DIR=./uploads

# CORS
CORS_ORIGIN=http://localhost:3000
```

## 🎯 Supported Formats

### Input (Audio/Video)
- **Audio**: MP3, WAV, M4A, OGG, WebM, FLAC
- **Video**: MP4, MOV, AVI, MKV, WebM, FLV

### Output (Subtitles)
- **SRT** - SubRip format (widely compatible)
- **VTT** - WebVTT format (HTML5 video)
- **STL** - EBU-STL format (professional broadcasting)
- **JSON** - Detailed timestamped segments

## 📊 Database Schema

### uploads table
Stores information about uploaded files

```sql
id          UUID        PRIMARY KEY
file_name   VARCHAR     Original file name
file_path   VARCHAR     Server storage path
file_size   BIGINT      File size in bytes
mime_type   VARCHAR     Content type
project_name VARCHAR    User-defined project name
language    VARCHAR     Language code (en, fr, etc)
status      VARCHAR     uploaded|processing|completed|failed
created_at  TIMESTAMP   Upload timestamp
updated_at  TIMESTAMP   Last update timestamp
```

### transcripts table
Stores transcribed content and subtitle formats

```sql
id          UUID        PRIMARY KEY
upload_id   UUID        FOREIGN KEY → uploads
full_text   TEXT        Complete transcription
language    VARCHAR     Detected language
duration    NUMERIC     Audio duration in seconds
srt_content TEXT        SRT format subtitle
vtt_content TEXT        VTT format subtitle
stl_content TEXT        STL format subtitle
json_content TEXT       JSON with detailed segments
status      VARCHAR     pending|completed|failed
created_at  TIMESTAMP   Creation timestamp
updated_at  TIMESTAMP   Last update timestamp
```

## 🧪 Testing

### Test All Endpoints
```bash
# Make the script executable
chmod +x test-api.sh

# Run tests (requires audio file)
./test-api.sh /path/to/audio.mp3
```

### Manual Testing with cURL

```bash
# Upload
curl -X POST http://localhost:3001/api/upload \
  -F "file=@test.mp3" \
  -F "projectName=Test"

# Transcribe
curl -X POST http://localhost:3001/api/transcribe \
  -H "Content-Type: application/json" \
  -d '{"uploadId":"uuid-here"}'

# Get transcript
curl http://localhost:3001/api/transcript/transcript-uuid

# Download formats
curl http://localhost:3001/api/download/srt/transcript-uuid > out.srt
curl http://localhost:3001/api/download/vtt/transcript-uuid > out.vtt
curl http://localhost:3001/api/download/stl/transcript-uuid > out.stl
```

## 🎨 Subtitle Formats

### SRT (SubRip)
```
1
00:00:01,000 --> 00:00:05,000
Hello, world!

2
00:00:05,000 --> 00:00:10,000
This is a subtitle.
```

### VTT (WebVTT)
```
WEBVTT

00:00:01.000 --> 00:00:05.000
Hello, world!

00:00:05.000 --> 00:00:10.000
This is a subtitle.
```

### STL (EBU-STL)
```
00000025 00000125 Hello, world!
00000125 00000250 This is a subtitle.
```

## 🔐 Security

- ✅ File type validation
- ✅ File size limits
- ✅ CORS protection
- ✅ Environment variable secrets
- ⚠️ TODO: Add rate limiting
- ⚠️ TODO: Add authentication
- ⚠️ TODO: Add request validation

## ⚡ Performance

- Concurrent file uploads supported
- Async Whisper API integration
- Database connection pooling
- Optimized queries with indexes
- File streaming for large uploads

### Processing Times
- Small audio (< 10 min): ~30-60 seconds
- Medium audio (10-30 min): ~2-3 minutes
- Large audio (30+ min): ~5-10 minutes

## 🚨 Error Handling

Common error responses:

- **400** - Bad Request (missing fields, invalid format)
- **404** - Not Found (file/transcript doesn't exist)
- **413** - File Too Large (exceeds max file size)
- **500** - Server Error (transcription failed, API error)

## 📝 Logging

Server logs are printed to console in development. In production, configure proper logging:

```bash
# View logs
tail -f server.log
```

## 🔄 Workflow Example

1. User uploads audio file → Upload stored, DB record created
2. Start transcription → File sent to Whisper API
3. Whisper processes → Returns text with timestamps
4. Server generates subtitles → SRT, VTT, STL created
5. Store in database → Full transcript saved
6. User downloads → Subtitle files sent to client

## 🛠️ Troubleshooting

### "OPENAI_API_KEY not set"
- Check `.env` file has the correct key
- Restart server after changing environment

### "Database connection failed"
- Verify PostgreSQL is running
- Check DATABASE_URL is correct
- Ensure database exists

### "File upload fails"
- Check server disk space
- Verify `/uploads` directory exists and is writable
- Check file size doesn't exceed MAX_FILE_SIZE

### "Transcription hangs"
- Large files take time (normal)
- Check OpenAI API quota/limits
- Verify internet connection

## 📚 Documentation

- [API Documentation](./API_DOCUMENTATION.md) - Detailed API reference
- [Usage Examples](./USAGE_EXAMPLES.ts) - Code examples
- [Database Schema](./migrations/) - SQL migrations

## 🤝 Contributing

1. Create a feature branch
2. Make changes
3. Test thoroughly
4. Submit pull request

## 📄 License

MIT License - See LICENSE file

## 🎓 Resources

- [OpenAI Whisper](https://openai.com/research/whisper)
- [Express.js Docs](https://expressjs.com)
- [PostgreSQL Docs](https://www.postgresql.org/docs)
- [Node.js Best Practices](https://nodejs.org/en/docs/guides/)

---

**Subtitle AI Backend** - Convert audio/video to subtitles with AI

For support, check logs and error messages. Ensure all environment variables are properly configured.

