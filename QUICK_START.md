# Subtitle AI Backend - Quick Start Guide

Welcome! Your Subtitle AI backend is fully implemented and ready to run. Follow these simple steps to get started.

## 🚀 Quick Start (5 minutes)

### 1. Navigate to Backend
```bash
cd backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Database

**Option A: PostgreSQL (Easiest with Docker)**
```bash
docker run --name subtitleai-postgres \
  -e POSTGRES_DB=subtitleai_db \
  -e POSTGRES_PASSWORD=postgres \
  -p 5432:5432 \
  -d postgres:16-alpine
```

**Option B: Local PostgreSQL**
```bash
createdb subtitleai_db
```

### 4. Configure Environment
```bash
# Copy example
cp ../.env.example .env

# Edit .env with your settings
nano .env
```

**Essential .env variables:**
```env
PORT=3001
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/subtitleai_db
OPENAI_API_KEY=sk_your_key_here
CORS_ORIGIN=http://localhost:3000
```

**Get OpenAI API Key:**
1. Visit https://platform.openai.com/account/api-keys
2. Create new API key
3. Paste into .env as `OPENAI_API_KEY`

### 5. Run Migrations
```bash
npm run migrate
```

### 6. Start Server
```bash
npm run dev
```

**Expected output:**
```
➜ Subtitle AI Backend listening on port 3001
✅ Database connected
✅ Server ready for requests
```

### 7. Test with Simple Request
```bash
curl http://localhost:3001/api/health
```

## 📋 What's Been Implemented

### Core Components

| Component | File | Purpose |
|-----------|------|---------|
| **Upload Handler** | `src/controllers/uploadController.ts` | Handle file uploads with validation |
| **Transcription** | `src/controllers/transcribeController.ts` | Orchestrate transcription workflow |
| **Whisper Service** | `src/services/whisperService.ts` | OpenAI Whisper API integration |
| **Subtitle Generator** | `src/services/subtitleService.ts` | Generate SRT, VTT, STL formats |
| **Upload Routes** | `src/routes/upload.ts` | POST `/api/upload` endpoint |
| **Transcribe Routes** | `src/routes/transcribe.ts` | All transcription endpoints |
| **Database Schema** | `migrations/001_init.ts` | PostgreSQL tables setup |

### API Endpoints

```
POST   /api/upload                    - Upload audio/video file
POST   /api/transcribe                - Start transcription
GET    /api/transcript/:id            - Get transcript details
GET    /api/download/srt/:id          - Download SRT subtitle
GET    /api/download/vtt/:id          - Download VTT subtitle
GET    /api/download/stl/:id          - Download STL subtitle
GET    /api/health                    - Server health check
```

### Database Tables

- **uploads** - File metadata
- **transcripts** - Transcription results with all subtitle formats
- **users** - User accounts (ready for authentication)
- **projects** - Project management

## 🧪 Test Complete Workflow

### Using Test Script
```bash
chmod +x test-api.sh
./test-api.sh /path/to/audio.mp3
```

### Manual Step-by-Step Test

```bash
# Step 1: Upload audio file
curl -X POST http://localhost:3001/api/upload \
  -F "file=@sample.mp3" \
  -F "projectName=Test" \
  -F "language=en"

# Copy the returned upload ID

# Step 2: Start transcription
curl -X POST http://localhost:3001/api/transcribe \
  -H "Content-Type: application/json" \
  -d '{"uploadId":"<UPLOAD_ID>"}'

# Copy the returned transcript ID

# Step 3: Check transcript
curl http://localhost:3001/api/transcript/<TRANSCRIPT_ID>

# Step 4: Download subtitles
curl http://localhost:3001/api/download/srt/<TRANSCRIPT_ID> > output.srt
curl http://localhost:3001/api/download/vtt/<TRANSCRIPT_ID> > output.vtt
curl http://localhost:3001/api/download/stl/<TRANSCRIPT_ID> > output.stl
```

## 📚 Full Documentation

| Document | Content |
|----------|---------|
| [BACKEND_SETUP.md](./BACKEND_SETUP.md) | Detailed setup instructions & troubleshooting |
| [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) | Complete API reference |
| [README.md](./README.md) | Project overview & features |
| [USAGE_EXAMPLES.ts](./USAGE_EXAMPLES.ts) | Frontend integration examples |

## 🔧 Project Structure

```
backend/
├── src/
│   ├── controllers/          # Business logic
│   │   ├── uploadController.ts
│   │   └── transcribeController.ts
│   ├── services/             # External APIs & utilities
│   │   ├── whisperService.ts
│   │   └── subtitleService.ts
│   ├── routes/               # API endpoints
│   │   ├── upload.ts
│   │   ├── transcribe.ts
│   │   ├── auth.ts
│   │   └── projects.ts
│   ├── middleware/           # Express middleware
│   ├── models/               # TypeScript types
│   ├── config/               # Configuration
│   └── index.ts              # Server entry point
├── migrations/               # Database schema
├── uploads/                  # File storage
├── test-api.sh              # Testing script
├── API_DOCUMENTATION.md      # API reference
├── README.md                # Project README
└── package.json             # Dependencies
```

## ⚡ NPM Scripts

```bash
npm run dev        # Development (auto-reload)
npm run build      # Compile TypeScript
npm start          # Run compiled code
npm run migrate    # Run database migrations
npm run seed       # Seed database with test data
npm run type-check # Check TypeScript types
```

## 🐛 Common Issues & Solutions

### "Cannot connect to database"
```bash
# Start PostgreSQL (Docker)
docker start subtitleai-postgres

# OR Local PostgreSQL
brew services start postgresql  # macOS
sudo systemctl start postgresql  # Linux
```

### "OPENAI_API_KEY not found"
```bash
# Add to .env file
echo "OPENAI_API_KEY=sk_your_key" >> .env
```

### "Port 3001 already in use"
```bash
# Kill process using port
lsof -ti:3001 | xargs kill -9

# Or use different port
PORT=3002 npm run dev
```

## 📖 API Usage Examples

### Using TypeScript (Frontend)
See [USAGE_EXAMPLES.ts](./USAGE_EXAMPLES.ts) for complete examples.

### Upload File
```typescript
const formData = new FormData();
formData.append('file', audioFile);
formData.append('projectName', 'My Project');
formData.append('language', 'en');

const response = await fetch('/api/upload', {
  method: 'POST',
  body: formData
});
const { data } = await response.json();
console.log(data.id); // Use this for transcription
```

### Start Transcription
```typescript
const response = await fetch('/api/transcribe', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ uploadId })
});
const { data } = await response.json();
console.log(data.transcriptId);
```

### Download Subtitle
```typescript
// Download as SRT
const srtResponse = await fetch(`/api/download/srt/${transcriptId}`);
const srtBlob = await srtResponse.blob();
saveToFile(srtBlob, 'subtitle.srt');

// Download as VTT
const vttResponse = await fetch(`/api/download/vtt/${transcriptId}`);
const vttBlob = await vttResponse.blob();
saveToFile(vttBlob, 'subtitle.vtt');

// Download as STL
const stlResponse = await fetch(`/api/download/stl/${transcriptId}`);
const stlBlob = await stlResponse.blob();
saveToFile(stlBlob, 'subtitle.stl');
```

## ✅ Verification Checklist

After setup, verify everything works:

- [ ] `npm install` completes without errors
- [ ] Database migrations run successfully (`npm run migrate`)
- [ ] Server starts with `npm run dev`
- [ ] Health check returns 200: `curl http://localhost:3001/api/health`
- [ ] Can upload file: `curl -F "file=@test.mp3" http://localhost:3001/api/upload`
- [ ] Can start transcription
- [ ] Can download subtitle files
- [ ] All tests pass: `./test-api.sh sample.mp3`

## 🚀 Next Steps

1. ✅ Setup Database
2. ✅ Configure Environment
3. ✅ Start Server (`npm run dev`)
4. ✅ Test Endpoints
5. 🔗 **Connect Frontend** - Use USAGE_EXAMPLES.ts
6. 📊 **Monitor Logs** - Check for any errors
7. 🌐 **Deploy** - See BACKEND_SETUP.md for production setup

## 📞 Need Help?

**Quick Reference:**
- API Docs: [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
- Setup Help: [BACKEND_SETUP.md](./BACKEND_SETUP.md)
- Code Examples: [USAGE_EXAMPLES.ts](./USAGE_EXAMPLES.ts)
- Server Logs: Check console output from `npm run dev`
- Database: Use `psql subtitleai_db` to inspect directly

**Common Commands:**
```bash
# Start server
npm run dev

# Check health
curl http://localhost:3001/api/health

# View logs
npm run dev 2>&1 | tee server.log

# Reset database
npm run migrate

# Test endpoints
./test-api.sh
```

---

**You're all set!** 🎉

Your Subtitle AI backend is ready to convert audio and video files to subtitles using OpenAI's Whisper API.

**Start with:** `npm install && npm run dev`
