# Setup Guide - Viral Video Intelligence

## Prerequisites

Before starting, ensure you have installed:

- **Node.js 18+** — [Download](https://nodejs.org)
- **Docker & Docker Compose** — [Install Docker](https://docs.docker.com/get-docker/)
- **Git** — [Install Git](https://git-scm.com)
- **FFmpeg** — `brew install ffmpeg` (macOS) or `sudo apt-get install ffmpeg` (Linux)

## Step 1: Clone Repository

```bash
git clone https://github.com/mariannehaemmerle/viral-video-intelligence
cd viral-video-intelligence
```

## Step 2: Get API Keys

You'll need credentials from these services:

### 1. OpenAI (for Whisper/Captions)
- Go to [OpenAI API](https://platform.openai.com/api-keys)
- Create a new API key
- Copy to `OPENAI_API_KEY` in `.env.local`

### 2. Higgsfield (for Virality Prediction)
- Visit [Higgsfield](https://higgsfield.ai)
- Sign up for API access
- Copy your API key to `HIGGSFIELD_API_KEY`

### 3. Claude API (for Content Analysis)
- Go to [Anthropic Console](https://console.anthropic.com/)
- Create API key
- Copy to `CLAUDE_API_KEY`

### 4. AWS S3 (for Video Storage)
- Sign up for [AWS](https://aws.amazon.com)
- Create an S3 bucket (e.g., `viral-videos-uploads`)
- Create IAM credentials with S3 access
- Copy `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_S3_BUCKET`

## Step 3: Setup Environment

```bash
# Copy example env file
cp .env.example .env.local

# Edit with your API keys
nano .env.local
```

### Minimal .env.local (to get started)
```
DATABASE_URL=postgresql://user:password@localhost:5432/viral_db
DATABASE_USER=user
DATABASE_PASSWORD=password
OPENAI_API_KEY=sk-...
HIGGSFIELD_API_KEY=hf_...
CLAUDE_API_KEY=sk-ant-...
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_S3_BUCKET=viral-videos-uploads
```

## Step 4: Install Dependencies

```bash
npm install
```

This installs dependencies for both frontend and backend.

## Step 5: Start Development Environment

### Option A: Using Docker (Recommended)
```bash
# Start all services (PostgreSQL, Redis, Backend, Frontend)
docker-compose up

# In another terminal, start frontend dev server
cd frontend
npm run dev
```

- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- Database Admin: http://localhost:5050

### Option B: Manual Setup
```bash
# Terminal 1: Start PostgreSQL
docker run --name viral_db \
  -e POSTGRES_PASSWORD=password \
  -p 5432:5432 \
  postgres:15-alpine

# Terminal 2: Start Backend
cd backend
npm install
npm run dev

# Terminal 3: Start Frontend
cd frontend
npm install
npm run dev
```

## Step 6: Verify Installation

### Check Backend
```bash
curl http://localhost:5000/health
# Should return: {"status":"ok"}
```

### Check Frontend
Open http://localhost:3000 in your browser — you should see the upload page.

### Check Database
```bash
psql -h localhost -U user -d viral_db -c "SELECT 1"
```

## Step 7: Create Initial Database Schema

```bash
npm run migrate
```

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000 (frontend)
lsof -i :3000 | grep LISTEN | awk '{print $2}' | xargs kill -9

# Kill process on port 5000 (backend)
lsof -i :5000 | grep LISTEN | awk '{print $2}' | xargs kill -9

# Kill process on port 5432 (database)
lsof -i :5432 | grep LISTEN | awk '{print $2}' | xargs kill -9
```

### Database Connection Error
```bash
# Verify PostgreSQL is running
docker ps | grep postgres

# Check logs
docker logs viral_db

# Reset database
npm run db:reset
```

### Missing Node Modules
```bash
# Clean and reinstall
rm -rf node_modules frontend/node_modules backend/node_modules
npm install
```

### API Key Issues
- Verify `.env.local` has correct keys
- Check that APIs are not rate-limited
- Test API keys individually:
  ```bash
  curl -H "Authorization: Bearer $OPENAI_API_KEY" \
    https://api.openai.com/v1/models
  ```

## Development Commands

```bash
# Start everything
npm run dev

# Start only frontend
npm run frontend

# Start only backend
npm run backend

# Run tests
npm test

# Run e2e tests
npm run test:e2e

# Format code
npm run format

# Lint code
npm run lint

# View database
docker-compose exec postgres psql -U user -d viral_db

# View logs
docker-compose logs -f backend
docker-compose logs -f postgres
```

## Project Structure

```
viral-video-intelligence/
├── frontend/              # Next.js app
│   ├── app/              # Pages & routes
│   ├── components/       # React components
│   ├── lib/              # Utilities
│   └── public/           # Assets
│
├── backend/              # Express API
│   ├── routes/           # API endpoints
│   ├── services/         # Business logic
│   ├── models/           # Database models
│   └── config/           # Configuration
│
├── .env.example          # Environment template
├── docker-compose.yml    # Docker config
├── IMPLEMENTATION_PLAN.md # Detailed plan
└── README.md             # Overview
```

## Next Steps

1. ✅ Setup complete!
2. Upload a test video at http://localhost:3000
3. Check virality analysis results
4. Export as TikTok/Reels/Shorts format
5. Start building more features!

## Getting Help

- Check [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md) for architecture
- Review backend code: `./backend/README.md`
- Check API docs: `./API.md` (coming soon)
- Contact: marianne.haemmerle8@gmail.com

Happy building! 🚀
