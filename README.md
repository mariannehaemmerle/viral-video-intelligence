# Viral Video Intelligence

🎬 AI-powered tool to predict video virality, auto-edit short-form videos, and generate viral video ideas.

## Features

- 🎯 **Virality Score** — AI predicts if your video will go viral (0-100)
- ✂️ **Auto-Editing** — Automatically trim long videos to 53-second shorts
- 📝 **Auto-Captions** — Generate captions with perfect timing
- 🎵 **Smart Music** — Integrate trending sounds automatically
- 💡 **Video Ideas** — Get trending content ideas for your niche
- 📊 **Analytics** — Track performance and optimize

## Quick Start

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- PostgreSQL 14+
- Git

### Installation

```bash
# Clone repository
git clone https://github.com/mariannehaemmerle/viral-video-intelligence
cd viral-video-intelligence

# Install dependencies
npm install

# Setup environment
cp .env.example .env.local
# Edit .env.local with your API keys (see SETUP.md)

# Start development
docker-compose up
npm run dev
```

### Access
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000
- **Database:** postgresql://localhost:5432

## Project Structure

```
viral-video-intelligence/
├── frontend/          # React/Next.js app
├── backend/           # Node.js/Express API
├── scripts/           # Automation & setup
├── IMPLEMENTATION_PLAN.md  # Detailed plan
├── SETUP.md           # Environment setup guide
└── README.md          # This file
```

## Development

### Frontend
```bash
cd frontend
npm run dev
```

### Backend
```bash
cd backend
npm run dev
```

### Database Migrations
```bash
npm run migrate
```

## Testing

```bash
npm run test
npm run test:e2e
```

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for production setup.

## API Documentation

See [API.md](./API.md) for complete endpoint documentation.

## Contributing

1. Create a feature branch: `git checkout -b feature/my-feature`
2. Commit changes: `git commit -m "feat: add my feature"`
3. Push: `git push origin feature/my-feature`
4. Open a Pull Request

## Tech Stack

- **Frontend:** Next.js 15, React 19, TailwindCSS
- **Backend:** Node.js, Express, PostgreSQL
- **AI/ML:** Claude API, Higgsfield Virality Predictor, OpenAI Whisper
- **Video:** FFmpeg, sharp
- **Storage:** AWS S3
- **Hosting:** Vercel + Railway

## License

Private — Built for Marianne Hämmerle's Cyclebreaker platform.

## Status

🚀 **In Development**

- [x] Planning & Architecture
- [ ] Phase 1: Foundation (Video Upload, Basic Analysis)
- [ ] Phase 2: Music & Sounds Integration
- [ ] Phase 3: Advanced Features
- [ ] Phase 4: Launch

## Contact

For questions or issues, contact: marianne.haemmerle8@gmail.com
