# Installation Guide

## Prerequisites

- Node.js 18 or higher
- PostgreSQL 12 or higher
- Docker & Docker Compose (optional)
- OpenAI API Key

## Steps

### 1. Clone Repository
```bash
git clone <repository-url>
cd subtitle-ai
```

### 2. Install Dependencies

#### Frontend
```bash
cd frontend
npm install
```

#### Backend
```bash
cd backend
npm install
```

### 3. Setup Environment Variables
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
- `OPENAI_API_KEY` - Get from https://platform.openai.com/api-keys
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Random secret for JWT

### 4. Setup Database

Option A: Using Docker
```bash
docker-compose up -d postgres
```

Option B: Local PostgreSQL
```bash
psql -U postgres
CREATE DATABASE subtitleai_db;
```

### 5. Run Migrations
```bash
cd backend
npm run migrate
```

### 6. Start Development Servers

#### Option A: Using Docker
```bash
docker-compose up
```

#### Option B: Local Development
```bash
# Terminal 1 - Frontend
cd frontend
npm run dev

# Terminal 2 - Backend
cd backend
npm run dev
```

## Verification

- Frontend: http://localhost:3000
- Backend: http://localhost:3001
- API Health: http://localhost:3001/api/health

All set! Proceed with development.
