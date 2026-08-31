# Viral Video Intelligence - Implementation Plan

## 📋 Project Overview

**Goal:** Build an AI-powered tool to help you create viral videos.

**Core Features:**
1. ✂️ Video upload & auto-editing (to 53s shorts)
2. 🎯 Virality score prediction (0-100)
3. 📝 Auto-captions with timing
4. 🎵 Trending music/sound integration
5. 💡 Video idea generator
6. 📊 Performance analytics

---

## 🏗️ Project Architecture

### Tech Stack
```
Frontend:     React 19 + Next.js 15 (App Router)
Backend:      Node.js + Express
Video:        FFmpeg (processing), Whisper (captions)
AI Analysis:  Claude API + Higgsfield Virality Predictor
Database:     PostgreSQL (project history)
Storage:      AWS S3 / Supabase (video uploads)
Hosting:      Vercel (frontend) + Railway (backend)
```

### Folder Structure
```
viral-video-intelligence/
├── frontend/                  # React/Next.js app
│   ├── app/
│   │   ├── page.tsx          # Dashboard/home
│   │   ├── upload/           # Video upload page
│   │   ├── editor/           # Video editing UI
│   │   └── analytics/        # Performance dashboard
│   ├── components/           # Reusable React components
│   ├── lib/                  # Helper functions (API calls, etc.)
│   ├── styles/               # Global CSS
│   └── public/               # Images, icons
│
├── backend/                   # Node.js/Express API
│   ├── routes/
│   │   ├── videos.js         # Video CRUD
│   │   ├── analysis.js       # Virality analysis
│   │   └── ideas.js          # Video idea generator
│   ├── services/
│   │   ├── videoProcessor.js # FFmpeg, Whisper
│   │   ├── viralityAnalyzer.js # Claude API calls
│   │   └── musicIntegration.js # Trending sounds
│   ├── middleware/           # Auth, error handling
│   ├── models/               # Database schemas
│   └── config/               # Environment config
│
├── scripts/                   # Automation scripts
│   ├── setup.sh              # Initial setup
│   └── deploy.sh             # Deployment script
│
├── .env.example              # Environment variables template
├── docker-compose.yml        # Local dev environment
├── package.json              # Dependencies
├── README.md                 # Project documentation
└── CLAUDE.md                 # Development instructions
```

---

## 🎯 MVP Features (Phase 1)

### Week 1-2: Foundation
- [ ] Project setup (Next.js + Express skeleton)
- [ ] Database schema (PostgreSQL)
- [ ] User authentication (JWT)
- [ ] Video upload endpoint (AWS S3)

### Week 3-4: Core Features
- [ ] Video processing pipeline (FFmpeg)
  - Auto-trim to 53s
  - Resolution optimization
  - Format conversion
- [ ] Auto-caption generation (Whisper API)
- [ ] Virality score prediction
  - Integration with Higgsfield virality_predictor
  - Hook strength analysis
  - Pacing analysis
  - Second-by-second attention curve

### Week 5: UI & UX
- [ ] Upload interface
- [ ] Video player with timeline editor
- [ ] Virality score display + breakdown
- [ ] Export formats (TikTok, Reels, Shorts)
- [ ] Simple analytics dashboard

### Week 6: Polish & Launch
- [ ] Performance optimization
- [ ] Testing (unit + integration)
- [ ] Deployment to production
- [ ] Documentation

---

## 🔌 API Endpoints (Backend)

### Video Management
```
POST   /api/videos/upload              # Upload video
GET    /api/videos/:id                 # Get video details
GET    /api/videos                     # List user's videos
DELETE /api/videos/:id                 # Delete video
```

### Analysis
```
POST   /api/analysis/virality          # Get virality score
GET    /api/analysis/:videoId          # Get analysis results
POST   /api/analysis/reanalyze         # Re-run analysis
```

### Video Ideas
```
GET    /api/ideas?niche=tech           # Get trending ideas
POST   /api/ideas/generate             # Generate custom ideas
```

### Export
```
GET    /api/export/:videoId?format=tiktok  # Download edited video
```

---

## 🤖 AI/ML Integration

### 1. Virality Prediction
**Service:** Higgsfield `virality_predictor`

**Analysis points:**
- Hook strength (first 3 seconds)
- Pacing (cuts per minute)
- Emotional engagement
- Trend alignment
- Audience retention curve

**Output:** Score (0-100) + detailed breakdown

### 2. Auto-Caption Generation
**Service:** OpenAI Whisper API

**Process:**
1. Extract audio from video
2. Transcribe with Whisper
3. Auto-sync captions with timeline
4. Apply styling/effects

### 3. Trending Content Analysis
**Service:** Claude API (gpt-4)

**Use for:**
- Current trend detection
- Niche-specific recommendations
- Hook/narrative suggestions
- Video ideas generator

---

## 📊 Database Schema

### Videos Table
```sql
CREATE TABLE videos (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL,
  title VARCHAR(255),
  original_url VARCHAR(500),
  processed_url VARCHAR(500),
  duration FLOAT,
  virality_score INT,
  analysis_data JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Analysis Results
```sql
CREATE TABLE analyses (
  id UUID PRIMARY KEY,
  video_id UUID NOT NULL REFERENCES videos(id),
  hook_strength FLOAT,
  pacing_score FLOAT,
  emotional_impact FLOAT,
  trend_alignment FLOAT,
  overall_score INT,
  attention_curve JSONB,
  recommendations TEXT[],
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Captions
```sql
CREATE TABLE captions (
  id UUID PRIMARY KEY,
  video_id UUID NOT NULL REFERENCES videos(id),
  transcript TEXT,
  captions JSONB, -- [{start: 0, end: 1.5, text: "Hello"}]
  language VARCHAR(10) DEFAULT 'en',
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🚀 Development Workflow

### Local Setup
```bash
# 1. Clone repo
git clone https://github.com/mariannehaemmerle/viral-video-intelligence
cd viral-video-intelligence

# 2. Install dependencies
npm install

# 3. Setup environment
cp .env.example .env.local
# Edit .env.local with your API keys

# 4. Start dev server
docker-compose up
npm run dev

# Frontend: http://localhost:3000
# Backend: http://localhost:5000
```

### Environment Variables
```
# .env.local
DATABASE_URL=postgresql://user:pass@localhost/viral_db
NEXT_PUBLIC_API_URL=http://localhost:5000

# OpenAI / Whisper
OPENAI_API_KEY=sk-...

# Higgsfield (Virality Prediction)
HIGGSFIELD_API_KEY=hf_...

# AWS S3
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_S3_BUCKET=viral-videos-uploads

# Clerk / Auth0 (Authentication)
AUTH_SECRET=...
AUTH_PROVIDER_ID=...
```

---

## 📈 Phase 2+ Features (Future)

### Phase 2: Music & Sounds
- [ ] Trending TikTok/Reels sounds database
- [ ] Auto music matching (based on mood/vibe)
- [ ] Sound effect library
- [ ] AI music generation (via Suno)

### Phase 3: Faceless Video Optimization
- [ ] B-roll generator
- [ ] Layout templates for faceless content
- [ ] Auto-voiceover (text-to-speech)
- [ ] Dynamic transitions

### Phase 4: Advanced Analytics
- [ ] Performance tracking (impressions, engagement)
- [ ] A/B testing framework
- [ ] Competitor analysis
- [ ] Niche insights

### Phase 5: Collaboration
- [ ] Team accounts
- [ ] Project sharing
- [ ] Feedback system
- [ ] Content calendar

---

## 🧪 Testing Strategy

### Unit Tests
- Video processing logic
- API endpoints
- Database queries

### Integration Tests
- Full upload → analysis → export flow
- Third-party API integrations (Whisper, Claude, Higgsfield)

### E2E Tests
- User journey: Upload → Edit → Analyze → Export

### Load Testing
- Handle 100+ concurrent uploads
- Video processing queue (async jobs)

---

## 📝 Next Steps

1. **Setup GitHub Repo**
   - Create `viral-video-intelligence` repo
   - Add this plan as `IMPLEMENTATION_PLAN.md`
   - Initialize with `.gitignore`, `README.md`

2. **Create Base Structure**
   - Frontend: `npx create-next-app@latest`
   - Backend: Express skeleton
   - Docker Compose for local dev

3. **Database Setup**
   - Create PostgreSQL schema
   - Migrations setup

4. **Phase 1 Development**
   - Start with video upload
   - Then virality analysis
   - Then UI/UX

---

## 💡 Key Success Metrics

- Upload process: < 30 seconds
- Analysis: < 2 minutes
- Virality prediction accuracy: Target 80%+
- User retention: Track daily active users
- Export quality: 1080p minimum

---

## 🔗 Resources

- [FFmpeg Documentation](https://ffmpeg.org/documentation.html)
- [OpenAI Whisper API](https://platform.openai.com/docs/guides/speech-to-text)
- [Claude API](https://claude.ai/api)
- [Higgsfield Virality Predictor](https://higgsfield.ai)
- [Next.js 15 App Router](https://nextjs.org/docs)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)

---

**Status:** Ready to start ✅
**Last Updated:** 2025-08-31
