#!/bin/bash

# Subtitle AI Backend - Quick Test Script
# This script tests all the API endpoints

API_URL="http://localhost:3001/api"
PROJECT_NAME="Test Project $(date +%s)"
AUDIO_FILE="${1:-.test_audio.mp3}"

echo "========================================"
echo "Subtitle AI Backend API Test"
echo "========================================"
echo ""

# Check if server is running
echo "1. Checking server health..."
curl -s "${API_URL}/health" | jq . || {
  echo "❌ Server is not running. Start with: npm run dev"
  exit 1
}
echo "✅ Server is healthy"
echo ""

# Create a test audio file if it doesn't exist
if [ ! -f "$AUDIO_FILE" ]; then
  echo "2. Creating test audio file..."
  # Create a simple wav file header and content
  echo "⚠️  No audio file found at $AUDIO_FILE"
  echo "   Please provide an audio file as argument: $0 /path/to/audio.mp3"
  exit 1
fi

# Upload file
echo "2. Uploading file: $AUDIO_FILE"
UPLOAD_RESPONSE=$(curl -s -X POST "${API_URL}/upload" \
  -F "file=@${AUDIO_FILE}" \
  -F "projectName=${PROJECT_NAME}" \
  -F "language=en")

echo "Response: $UPLOAD_RESPONSE" | jq .

UPLOAD_ID=$(echo "$UPLOAD_RESPONSE" | jq -r '.data.id // empty')

if [ -z "$UPLOAD_ID" ]; then
  echo "❌ Upload failed"
  exit 1
fi

echo "✅ File uploaded successfully"
echo "   Upload ID: $UPLOAD_ID"
echo ""

# Start transcription
echo "3. Starting transcription..."
TRANSCRIBE_RESPONSE=$(curl -s -X POST "${API_URL}/transcribe" \
  -H "Content-Type: application/json" \
  -d "{\"uploadId\": \"${UPLOAD_ID}\"}")

echo "Response: $TRANSCRIBE_RESPONSE" | jq .

TRANSCRIPT_ID=$(echo "$TRANSCRIBE_RESPONSE" | jq -r '.data.transcriptId // empty')

if [ -z "$TRANSCRIPT_ID" ]; then
  echo "❌ Transcription failed"
  exit 1
fi

echo "✅ Transcription completed"
echo "   Transcript ID: $TRANSCRIPT_ID"
echo ""

# Get transcript details
echo "4. Getting transcript details..."
curl -s -X GET "${API_URL}/transcript/${TRANSCRIPT_ID}" | jq .
echo ""

# Download SRT
echo "5. Downloading SRT subtitle..."
curl -s -X GET "${API_URL}/download/srt/${TRANSCRIPT_ID}" > "output_${TRANSCRIPT_ID}.srt"
echo "✅ Downloaded: output_${TRANSCRIPT_ID}.srt"
echo ""

# Download VTT
echo "6. Downloading VTT subtitle..."
curl -s -X GET "${API_URL}/download/vtt/${TRANSCRIPT_ID}" > "output_${TRANSCRIPT_ID}.vtt"
echo "✅ Downloaded: output_${TRANSCRIPT_ID}.vtt"
echo ""

# Download STL
echo "7. Downloading STL subtitle..."
curl -s -X GET "${API_URL}/download/stl/${TRANSCRIPT_ID}" > "output_${TRANSCRIPT_ID}.stl"
echo "✅ Downloaded: output_${TRANSCRIPT_ID}.stl"
echo ""

echo "========================================"
echo "✅ All tests completed successfully!"
echo "========================================"
echo ""
echo "Generated files:"
echo "  - output_${TRANSCRIPT_ID}.srt"
echo "  - output_${TRANSCRIPT_ID}.vtt"
echo "  - output_${TRANSCRIPT_ID}.stl"
