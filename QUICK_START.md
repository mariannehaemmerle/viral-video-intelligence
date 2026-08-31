# Quick Start Guide

## 📦 Files Created

All files have been created in the scratchpad. Here's what you need to do:

### 1. Create GitHub Repository

```bash
# Go to https://github.com/new
# Name: viral-video-intelligence
# Description: AI-powered tool to predict video virality
# Make it PUBLIC
```

### 2. Clone & Setup Structure

```bash
git clone https://github.com/mariannehaemmerle/viral-video-intelligence
cd viral-video-intelligence

# Copy root level files from scratchpad:
cp IMPLEMENTATION_PLAN.md .
cp SETUP.md .
cp CLAUDE.md .
cp README.md .
cp docker-compose.yml .
cp .env.example .
cp .gitignore .
cp package.json .
```

### 3. Setup Backend

```bash
mkdir -p backend/src/{routes,services,models,config,migrations}
mkdir -p backend/migrations

# Copy backend files
cp backend-package.json backend/package.json
cp backend-index.ts backend/src/index.ts
cp backend-viralityAnalyzer.ts backend/src/services/viralityAnalyzer.ts

# Install deps
cd backend
npm install
```

### 4. Setup Frontend

```bash
# From root, create Next.js app
npx create-next-app@latest frontend --typescript --tailwind --app

cd frontend

# Copy frontend files
cp app/layout.tsx app/layout.tsx
cp app/page.tsx app/page.tsx
cp frontend-globals.css app/globals.css
cp next-config.js next.config.js
mkdir -p lib
cp frontend-api.ts lib/api.ts

# Create upload page
mkdir -p app/upload
cp frontend-upload-page.tsx app/upload/page.tsx

# Create video detail page
mkdir -p app/videos/[id]
cp frontend-video-detail-page.tsx app/videos/[id]/page.tsx

cd ..
```

### 5. Create Environment File

```bash
cp .env.example .env.local

# Edit .env.local and add your API keys:
# - OPENAI_API_KEY
# - HIGGSFIELD_API_KEY
# - CLAUDE_API_KEY
# - AWS credentials
```

### 6. Start Development

```bash
# Terminal 1: Start Docker
docker-compose up

# Terminal 2: Start Frontend
cd frontend
npm run dev

# Terminal 3: Start Backend
cd backend
npm run dev
```

Visit: http://localhost:3000

### 7. Commit & Push

```bash
git add .
git commit -m "Initial project setup with frontend and backend"
git push -u origin main
```

---

## 🗂️ File Manifest

### Root Files
- `IMPLEMENTATION_PLAN.md` — Detailed architecture
- `SETUP.md` — Full setup instructions
- `CLAUDE.md` — Development guidelines
- `README.md` — Project overview
- `docker-compose.yml` — Local dev environment
- `.env.example` — Environment template
- `.gitignore` — Git configuration
- `package.json` — Root dependencies

### Backend Files
- `backend/package.json` — Backend dependencies
- `backend/src/index.ts` — Express server entry point
- `backend/src/services/viralityAnalyzer.ts` — AI analysis service

### Frontend Files
- `frontend/app/layout.tsx` — Root layout
- `frontend/app/page.tsx` — Dashboard home
- `frontend/app/globals.css` — Global styles
- `frontend/app/upload/page.tsx` — Upload page
- `frontend/app/videos/[id]/page.tsx` — Analysis results page
- `frontend/lib/api.ts` — API client
- `frontend/next.config.js` — Next.js config

---

## 🚀 What You Have

✅ **Backend:**
- Express server skeleton
- Virality analysis service (ready for Higgsfield integration)
- API routes structure (videos, analysis, ideas, export)
- Database schema design

✅ **Frontend:**
- Modern Next.js 15 app with React 19
- Upload interface with drag-drop
- Virality score display + breakdown
- Video analysis dashboard
- Export for TikTok/Reels/Shorts
- Responsive design with TailwindCSS

✅ **Infrastructure:**
- Docker Compose for local development
- PostgreSQL database setup
- Environment configuration
- Complete documentation

---

## 📝 Next Steps After Setup

### Phase 1 (This Week)
1. [ ] Connect backend to database (PostgreSQL)
2. [ ] Implement video upload to S3
3. [ ] Integrate Higgsfield virality_predictor API
4. [ ] Test upload → analysis flow

### Phase 2 (Next Week)
1. [ ] Add OpenAI Whisper for captions
2. [ ] Implement FFmpeg video processing
3. [ ] Build export functionality (TikTok/Reels/Shorts)
4. [ ] UI polish

### Phase 3 (Final)
1. [ ] Music/sound integration
2. [ ] Analytics dashboard
3. [ ] Video ideas generator
4. [ ] Deploy to production

---

## 🔗 API Endpoints (Already Structured)

```
POST   /api/videos/upload              # Upload video
GET    /api/videos                     # List videos
GET    /api/videos/:id                 # Get video details
POST   /api/analysis/virality          # Analyze virality
GET    /api/export/:id?format=tiktok   # Export video
GET    /api/ideas?niche=tech           # Get video ideas
```

---

## 💡 Tips

1. **Use Docker** — It keeps everything consistent
2. **Test locally** — Before pushing to GitHub
3. **Keep frontend & backend in sync** — Use TypeScript for type safety
4. **Monitor API quotas** — FFmpeg, Whisper, and Higgsfield have limits
5. **Build incrementally** — Get upload working first, then analysis

---

## 🆘 Troubleshooting

### Port Already in Use
```bash
# Kill all processes
killall node
docker-compose down
```

### Docker Issues
```bash
# Reset everything
docker-compose down -v
docker-compose up --build
```

### Database Connection Error
```bash
# Check logs
docker logs viral_db

# Reset
docker-compose exec postgres psql -U user -d viral_db -c "SELECT 1"
```

---

## 📞 Questions?

Check these in order:
1. `SETUP.md` — Full environment setup
2. `IMPLEMENTATION_PLAN.md` — Architecture details
3. `CLAUDE.md` — Development guidelines
4. GitHub Issues — For bug reports

---

**Ready to build?** 🚀 Create the GitHub repo and start with Step 2!
