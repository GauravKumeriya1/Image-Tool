# Backend Setup Guide

Complete setup instructions for the Subtitle AI Backend.

## Prerequisites

- **Node.js** 18 or higher
- **npm** or **yarn**
- **PostgreSQL** 12 or higher
- **OpenAI API Key** (get from https://platform.openai.com/api-keys)

## Step 1: Install Dependencies

```bash
cd backend
npm install
```

This will install all required packages:
- express - Web framework
- pg - PostgreSQL client
- axios - HTTP client for Whisper API
- multer - File upload handler
- uuid - ID generation
- form-data - Multi-part form handling
- typescript - Language support
- ts-node - TypeScript execution

## Step 2: Setup Environment Variables

```bash
# Copy the example file
cp ../.env.example .env

# Edit with your values
nano .env
```

**Required environment variables:**
```env
# Server Configuration
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000

# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/subtitleai_db

# OpenAI API
OPENAI_API_KEY=sk_test_your_actual_key_here

# File Upload
MAX_FILE_SIZE=104857600
UPLOAD_DIR=./uploads
```

### Getting OpenAI API Key

1. Go to https://platform.openai.com/account/api-keys
2. Create a new API key
3. Copy and paste into `.env`

### Setting Up PostgreSQL

#### On macOS with Homebrew:
```bash
brew install postgresql
brew services start postgresql
createdb subtitleai_db
```

#### On Linux (Ubuntu/Debian):
```bash
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo createdb subtitleai_db
```

#### On Windows:
1. Download PostgreSQL installer
2. Run installer and follow prompts
3. Create database using pgAdmin or psql

#### Using Docker:
```bash
docker run --name subtitleai-postgres \
  -e POSTGRES_DB=subtitleai_db \
  -e POSTGRES_PASSWORD=password \
  -p 5432:5432 \
  -d postgres:16-alpine

# Update .env with:
# DATABASE_URL=postgresql://postgres:password@localhost:5432/subtitleai_db
```

## Step 3: Run Database Migrations

```bash
# Run migrations
npm run migrate
```

This will create all necessary tables:
- `users` - User accounts
- `uploads` - File metadata
- `transcripts` - Transcription results
- `projects` - User projects
- `subtitles` - Subtitle formats

## Step 4: Create Upload Directory

```bash
mkdir -p uploads
chmod 755 uploads
```

## Step 5: Start the Server

```bash
# Development mode (with auto-reload)
npm run dev

# Or production mode
npm run build
npm start
```

**Expected output:**
```
╔══════════════════════════════════════╗
║  Subtitle AI Backend Server Started  ║
║  Port: 3001                         
║  Time: 2024-03-05T10:30:00.000Z
╚══════════════════════════════════════╝

API Health: http://localhost:3001/api/health
```

## Step 6: Test the Server

### Health Check
```bash
curl http://localhost:3001/api/health
```

Expected response:
```json
{
  "status": "OK",
  "message": "Server is running",
  "timestamp": "2024-03-05T10:30:00.000Z"
}
```

## Step 7: Test Complete Workflow

### Quick Test (requires audio file)

```bash
# Make test script executable
chmod +x test-api.sh

# Run with your audio file
./test-api.sh /path/to/audio.mp3
```

### Manual Test

```bash
# 1. Upload file
UPLOAD=$(curl -s -X POST http://localhost:3001/api/upload \
  -F "file=@test_audio.mp3" \
  -F "projectName=Test Project" \
  -F "language=en" | jq '.data.id')

echo "Upload ID: $UPLOAD"

# 2. Start transcription
TRANSCRIPT=$(curl -s -X POST http://localhost:3001/api/transcribe \
  -H "Content-Type: application/json" \
  -d "{\"uploadId\": \"$UPLOAD\"}" | jq '.data.transcriptId')

echo "Transcript ID: $TRANSCRIPT"

# 3. Get transcript
curl -s http://localhost:3001/api/transcript/$TRANSCRIPT | jq .

# 4. Download subtitles
curl -s http://localhost:3001/api/download/srt/$TRANSCRIPT > output.srt
curl -s http://localhost:3001/api/download/vtt/$TRANSCRIPT > output.vtt
curl -s http://localhost:3001/api/download/stl/$TRANSCRIPT > output.stl

echo "Downloaded subtitles:"
echo "  - output.srt"
echo "  - output.vtt"
echo "  - output.stl"
```

## Troubleshooting

### "Cannot find module 'express'"
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### "ECONNREFUSED - Database connection failed"
```bash
# Check PostgreSQL is running
psql -U postgres

# If not running, start it:
# macOS
brew services start postgresql

# Linux
sudo systemctl start postgresql

# Windows
# Start PostgreSQL service from Services
```

### "OPENAI_API_KEY is not set"
```bash
# Add to .env file
OPENAI_API_KEY=sk_test_...

# Or set as environment variable
export OPENAI_API_KEY=sk_test_...
npm run dev
```

### "File upload fails"
```bash
# Ensure uploads directory exists
mkdir -p uploads
chmod 755 uploads

# Check disk space
df -h
```

### "Error: listen EADDRINUSE :::3001"
```bash
# Port 3001 is in use. Options:

# 1. Kill the process using port
lsof -ti:3001 | xargs kill -9

# 2. Use different port
PORT=3002 npm run dev

# 3. Check what's using the port
netstat -tulpn | grep 3001
```

## Configuration Examples

### Using PostgreSQL Docker Container

```bash
# Start container
docker run --name subtitleai-postgres \
  -e POSTGRES_DB=subtitleai_db \
  -e POSTGRES_USER=subtitleai \
  -e POSTGRES_PASSWORD=secure_password \
  -p 5432:5432 \
  -v postgres_data:/var/lib/postgresql/data \
  -d postgres:16-alpine

# .env configuration
DATABASE_URL=postgresql://subtitleai:secure_password@localhost:5432/subtitleai_db
```

### Using Remote PostgreSQL

```env
DATABASE_URL=postgresql://user:password@remote-host:5432/subtitleai_db
```

### Using PostgreSQL with SSH Tunnel

```bash
# Create tunnel
ssh -L 5432:localhost:5432 user@remote-host

# .env
DATABASE_URL=postgresql://user:password@localhost:5432/subtitleai_db
```

## Development Workflow

### Project Structure
```
backend/
├── src/
│   ├── index.ts              # Server entry
│   ├── controllers/          # Business logic
│   ├── services/             # External APIs
│   ├── routes/               # API routes
│   ├── middleware/           # Express middleware
│   ├── config/               # Configuration
│   └── utils/                # Helper functions
├── migrations/               # Database schemas
├── uploads/                  # Upload storage
├── API_DOCUMENTATION.md      # API docs
└── test-api.sh              # Test script
```

### Making Changes

1. Edit files in `src/`
2. Server auto-reloads in dev mode
3. Check console for errors
4. Test with curl or test script

### Building for Production

```bash
# Compile TypeScript
npm run build

# Run compiled JavaScript
npm start

# Or use the compiled version
node dist/index.ts
```

## Performance Optimization

### Database Optimization
```bash
# Analyze query performance
EXPLAIN ANALYZE SELECT * FROM transcripts WHERE status = 'completed';

# Create indexes (already done in migrations)
CREATE INDEX idx_transcripts_status ON transcripts(status);
```

### File Upload Optimization
- Maximum file size: 100MB (configurable)
- Allowed concurrent uploads: Limited by system resources
- Recommended: 10-20 concurrent uploads

### Whisper API Optimization
- Batch process files in queue
- Reuse transcripts when possible
- Cache results in database

## Monitoring

### Check Server Status
```bash
curl http://localhost:3001/api/health
```

### View Logs
```bash
# Development (console output)
npm run dev

# Production (check error logs)
tail -f error.log
```

### Database Status
```bash
# Check database size
psql subtitleai_db -c "SELECT pg_database.datname, pg_size_pretty(pg_database_size(pg_database.datname)) 
FROM pg_database WHERE datname = 'subtitleai_db';"

# Check table sizes
psql subtitleai_db -c "SELECT schemaname, tablename, pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) 
FROM pg_tables ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;"
```

## Next Steps

1. ✅ Setup complete
2. 📚 Read [API Documentation](./API_DOCUMENTATION.md)
3. 🧪 Run [test script](./test-api.sh)
4. 🔗 Connect to frontend
5. 🚀 Deploy to production

## Support & Resources

- [API Documentation](./API_DOCUMENTATION.md)
- [OpenAI Whisper Docs](https://platform.openai.com/docs/guides/speech-to-text)
- [Express Documentation](https://expressjs.com)
- [PostgreSQL Documentation](https://www.postgresql.org/docs)
- [Node.js Best Practices](https://nodejs.org/en/docs/guides/)

---

**Setup Complete!** 🎉

Your Subtitle AI backend is ready to use. Start the server with `npm run dev` and access the API at `http://localhost:3001`
