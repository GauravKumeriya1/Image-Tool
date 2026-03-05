// Migration: Create base tables

export const up = `
  -- Users table
  CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  -- Uploads table (for tracking uploaded files)
  CREATE TABLE IF NOT EXISTS uploads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(512) NOT NULL,
    file_size BIGINT,
    mime_type VARCHAR(100),
    project_name VARCHAR(255) NOT NULL,
    language VARCHAR(10) DEFAULT 'en',
    status VARCHAR(50) DEFAULT 'uploaded',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  -- Transcripts table (stores transcription results)
  CREATE TABLE IF NOT EXISTS transcripts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    upload_id UUID NOT NULL REFERENCES uploads(id) ON DELETE CASCADE,
    full_text TEXT,
    language VARCHAR(10),
    duration NUMERIC,
    srt_content TEXT,
    vtt_content TEXT,
    stl_content TEXT,
    json_content TEXT,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  -- Projects table
  CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    file_path VARCHAR(512) NOT NULL,
    duration INTEGER,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  -- Subtitles table
  CREATE TABLE IF NOT EXISTS subtitles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    format VARCHAR(10) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  -- Create indexes for performance
  CREATE INDEX idx_users_email ON users(email);
  CREATE INDEX idx_uploads_status ON uploads(status);
  CREATE INDEX idx_uploads_created_at ON uploads(created_at);
  CREATE INDEX idx_transcripts_upload_id ON transcripts(upload_id);
  CREATE INDEX idx_transcripts_status ON transcripts(status);
  CREATE INDEX idx_projects_user_id ON projects(user_id);
  CREATE INDEX idx_subtitles_project_id ON subtitles(project_id);
`

export const down = `
  DROP TABLE IF EXISTS subtitles;
  DROP TABLE IF EXISTS transcripts;
  DROP TABLE IF EXISTS projects;
  DROP TABLE IF EXISTS uploads;
  DROP TABLE IF EXISTS users;
`
