# Subtitle AI Backend API Documentation

## Base URL
```
http://localhost:3001/api
```

## API Endpoints

### 1. Upload File
**Endpoint:** `POST /upload`

**Description:** Upload an audio or video file for transcription.

**Request:**
```bash
curl -X POST http://localhost:3001/api/upload \
  -F "file=@/path/to/audio.mp3" \
  -F "projectName=My Project" \
  -F "language=en"
```

**Form Data:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| file | File | Yes | Audio/Video file (max 100MB) |
| projectName | String | Yes | Name of the project |
| language | String | No | Language code (default: 'en') |

**Response (201):**
```json
{
  "success": true,
  "message": "File uploaded successfully",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "fileName": "audio_1234567890.mp3",
    "projectName": "My Project",
    "status": "uploaded",
    "createdAt": "2024-03-05T10:30:00Z"
  }
}
```

**Supported Formats:**
- Audio: MP3, WAV, MP4, OGG, WebM
- Video: MP4, MOV, AVI, MKV, WebM

---

### 2. Start Transcription
**Endpoint:** `POST /transcribe`

**Description:** Start the transcription process for an uploaded file using Whisper API.

**Request:**
```bash
curl -X POST http://localhost:3001/api/transcribe \
  -H "Content-Type: application/json" \
  -d '{
    "uploadId": "550e8400-e29b-41d4-a716-446655440000"
  }'
```

**Request Body:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| uploadId | String | Yes | ID from upload response |

**Response (201):**
```json
{
  "success": true,
  "message": "Transcription completed successfully",
  "data": {
    "transcriptId": "660e8400-e29b-41d4-a716-446655440001",
    "uploadId": "550e8400-e29b-41d4-a716-446655440000",
    "status": "completed",
    "createdAt": "2024-03-05T10:35:00Z"
  }
}
```

**Status Options:**
- `processing` - Transcription in progress
- `completed` - Transcription finished successfully
- `failed` - Transcription failed

---

### 3. Get Transcript
**Endpoint:** `GET /transcript/:id`

**Description:** Retrieve the full transcript details including text, timestamps, and metadata.

**Request:**
```bash
curl -X GET http://localhost:3001/api/transcript/660e8400-e29b-41d4-a716-446655440001
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "660e8400-e29b-41d4-a716-446655440001",
    "uploadId": "550e8400-e29b-41d4-a716-446655440000",
    "fileName": "audio_1234567890.mp3",
    "projectName": "My Project",
    "mimeType": "audio/mpeg",
    "language": "en",
    "duration": 300.5,
    "fullText": "This is the complete transcribed text with all the spoken content...",
    "status": "completed",
    "createdAt": "2024-03-05T10:35:00Z",
    "updatedAt": "2024-03-05T10:40:00Z"
  }
}
```

---

### 4. Download SRT Subtitles
**Endpoint:** `GET /download/srt/:id`

**Description:** Download the transcript in SRT (SubRip) format.

**Request:**
```bash
curl -X GET http://localhost:3001/api/download/srt/660e8400-e29b-41d4-a716-446655440001 \
  --output subtitles.srt
```

**Response:**
```
1
00:00:00,000 --> 00:00:05,000
Hello, welcome to this tutorial.

2
00:00:05,000 --> 00:00:10,000
Today we will learn about subtitle generation.

3
00:00:10,000 --> 00:00:15,000
This is very useful for video content creators.
```

**SRT Features:**
- Standard subtitle format compatible with most media players
- Precise timing in HH:MM:SS,mmm format
- Easy to edit and align
- Wide compatibility across platforms

---

### 5. Download VTT Subtitles
**Endpoint:** `GET /download/vtt/:id`

**Description:** Download the transcript in VTT (WebVTT) format.

**Request:**
```bash
curl -X GET http://localhost:3001/api/download/vtt/660e8400-e29b-41d4-a716-446655440001 \
  --output subtitles.vtt
```

**Response:**
```
WEBVTT

00:00:00.000 --> 00:00:05.000
Hello, welcome to this tutorial.

00:00:05.000 --> 00:00:10.000
Today we will learn about subtitle generation.

00:00:10.000 --> 00:00:15.000
This is very useful for video content creators.
```

**VTT Features:**
- Web Video Text Tracks format (IETF standard)
- Compatible with HTML5 video elements
- Supports styling with CSS
- Uses millisecond precision

---

### 6. Download STL Subtitles
**Endpoint:** `GET /download/stl/:id`

**Description:** Download the transcript in STL (EBU-STL) frame-based format.

**Request:**
```bash
curl -X GET http://localhost:3001/api/download/stl/660e8400-e29b-41d4-a716-446655440001 \
  --output subtitles.stl
```

**Response:**
```
00000000 00000125 Hello, welcome to this tutorial.
00000125 00000250 Today we will learn about subtitle generation.
00000250 00000375 This is very useful for video content creators.
```

**STL Features:**
- Frame-based format (not time-based)
- Commonly used in professional broadcasting
- Assumes 25 fps standard
- Binary format option available for EBU compliance

---

## Workflow Example

### Step-by-Step Process

1. **Upload File**
   ```bash
   curl -X POST http://localhost:3001/api/upload \
     -F "file=@podcast.mp3" \
     -F "projectName=Podcast Episode 1"
   ```
   Returns: `uploadId`

2. **Start Transcription**
   ```bash
   curl -X POST http://localhost:3001/api/transcribe \
     -H "Content-Type: application/json" \
     -d '{"uploadId": "550e8400-e29b-41d4-a716-446655440000"}'
   ```
   Returns: `transcriptId`

3. **Verify Transcript**
   ```bash
   curl -X GET http://localhost:3001/api/transcript/660e8400-e29b-41d4-a716-446655440001
   ```
   Returns: Full transcript details

4. **Download Subtitles**
   ```bash
   # Download as SRT
   curl -X GET http://localhost:3001/api/download/srt/660e8400-e29b-41d4-a716-446655440001 \
     --output episode1.srt

   # Download as VTT
   curl -X GET http://localhost:3001/api/download/vtt/660e8400-e29b-41d4-a716-446655440001 \
     --output episode1.vtt

   # Download as STL
   curl -X GET http://localhost:3001/api/download/stl/660e8400-e29b-41d4-a716-446655440001 \
     --output episode1.stl
   ```

---

## Error Handling

### Common Error Responses

**400 - Bad Request**
```json
{
  "error": "No file uploaded",
  "message": "File is required"
}
```

**404 - Not Found**
```json
{
  "error": "Transcript not found",
  "message": "The requested transcript does not exist"
}
```

**413 - Payload Too Large**
```json
{
  "error": "File too large",
  "message": "Maximum file size exceeded"
}
```

**500 - Internal Server Error**
```json
{
  "error": "Transcription failed",
  "message": "Failed to process the audio file"
}
```

---

## Environment Variables

Required in `.env`:
```env
# Server
PORT=3001
NODE_ENV=development

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/subtitleai_db

# OpenAI API
OPENAI_API_KEY=sk_...your_api_key_here...

# File Upload
MAX_FILE_SIZE=104857600  # 100MB in bytes
UPLOAD_DIR=./uploads

# CORS
CORS_ORIGIN=http://localhost:3000
```

---

## Database Schema

### uploads table
```sql
Column      | Type        | Description
------------|-------------|---------------------------
id          | UUID        | Primary key
file_name   | VARCHAR     | Original file name
file_path   | VARCHAR     | Storage path on server
file_size   | BIGINT      | File size in bytes
mime_type   | VARCHAR     | Content type
project_name| VARCHAR     | User-given project name
language    | VARCHAR     | Speech language code
status      | VARCHAR     | uploaded, processing, completed, failed
created_at  | TIMESTAMP   | Upload time
updated_at  | TIMESTAMP   | Last update time
```

### transcripts table
```sql
Column       | Type        | Description
-------------|-------------|---------------------------
id           | UUID        | Primary key
upload_id    | UUID        | Reference to uploads
full_text    | TEXT        | Complete transcription
language     | VARCHAR     | Detected language
duration     | NUMERIC     | Audio duration in seconds
srt_content  | TEXT        | SRT format subtitle
vtt_content  | TEXT        | VTT format subtitle
stl_content  | TEXT        | STL format subtitle
json_content | TEXT        | JSON format with segments
status       | VARCHAR     | pending, completed, failed
created_at   | TIMESTAMP   | Creation time
updated_at   | TIMESTAMP   | Last update time
```

---

## Performance Tips

1. **Concurrent Uploads**
   - The API can handle multiple concurrent uploads
   - Each file is processed independently

2. **Large Files**
   - Files up to 100MB can be uploaded
   - Processing time varies based on file duration
   - A 1-hour audio typically takes 2-5 minutes

3. **Caching**
   - Keep transcript IDs for future downloads
   - Don't re-upload the same file multiple times

4. **Batch Processing**
   - Use the API in a queue for batch transcription
   - Space out requests to avoid rate limiting

---

## Testing with Postman

1. Import the following collection:
   - POST: `/api/upload` - Upload a test file
   - POST: `/api/transcribe` - Start transcription
   - GET: `/api/transcript/:id` - Get transcript
   - GET: `/api/download/srt/:id` - Download SRT

2. Use environment variables for base URL and IDs

3. Test with small audio files first

---

## Support

For issues or questions:
- Check the server logs in `/backend/logs/`
- Ensure OPENAI_API_KEY is set correctly
- Verify PostgreSQL is running
- Check file permissions on `/uploads/` directory

---

*API Documentation - Subtitle AI*
*Last Updated: March 5, 2024*
