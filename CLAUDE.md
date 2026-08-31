# CLAUDE.md — Viral Video Intelligence

This file contains instructions for Claude Code to work effectively on this project.

---

## Project Context

**Viral Video Intelligence** is an AI-powered SaaS tool built for Marianne Hämmerle to help her (and eventually customers) create viral short-form videos.

**Owner:** Marianne Hämmerle (marianne.haemmerle8@gmail.com)

**Primary Goals:**
1. Build a tool that predicts if videos will go viral
2. Auto-edit long videos into 53-second shorts
3. Generate captions automatically
4. Suggest trending content ideas
5. Optimize videos for TikTok, Instagram Reels, YouTube Shorts

---

## Technical Stack

- **Frontend:** Next.js 15 (React 19) + TypeScript + TailwindCSS
- **Backend:** Node.js + Express + TypeScript
- **Database:** PostgreSQL
- **AI/ML:** Claude API + Higgsfield Virality Predictor + OpenAI Whisper
- **Storage:** AWS S3
- **Hosting:** Vercel (frontend) + Railway (backend)
- **Video Processing:** FFmpeg

---

## Project Structure

```
viral-video-intelligence/
├── frontend/                     # Next.js app
│   ├── app/                      # App router pages
│   │   ├── page.tsx             # Dashboard/Home
│   │   ├── upload/              # Video upload flow
│   │   ├── editor/              # Video editing UI
│   │   └── analytics/           # Analytics dashboard
│   ├── components/              # Reusable React components
│   ├── lib/                     # Utilities, hooks, API calls
│   └── styles/                  # Global CSS
│
├── backend/                      # Express API
│   ├── routes/                  # API routes
│   │   ├── videos.ts           # Video CRUD
│   │   ├── analysis.ts         # Virality analysis
│   │   └── ideas.ts            # Video ideas
│   ├── services/               # Business logic
│   │   ├── videoProcessor.ts   # FFmpeg wrapper
│   │   ├── viralityAnalyzer.ts # AI analysis
│   │   └── musicIntegration.ts # Music/sounds
│   ├── models/                 # Database models
│   └── config/                 # Configuration
│
├── IMPLEMENTATION_PLAN.md      # Detailed technical plan
├── SETUP.md                    # Environment setup
├── CLAUDE.md                   # This file
└── README.md                   # Overview
```

---

## Key Workflows

### When Working on Features

1. **Before coding** — Read the relevant section in `IMPLEMENTATION_PLAN.md`
2. **Check the API spec** — Understand endpoint requirements
3. **Update the database schema** (if needed) in `backend/models/`
4. **Implement backend** first, then frontend
5. **Test locally** — Use Docker for consistent environment
6. **Document changes** in commit messages

### For Video Processing

- All video editing happens in `backend/services/videoProcessor.ts`
- Uses FFmpeg for media operations
- Output goes to AWS S3
- Jobs are queued asynchronously (via Redis)

### For AI Analysis

- Virality prediction: `backend/services/viralityAnalyzer.ts`
- Uses Higgsfield API for prediction + Claude API for analysis
- Results stored in PostgreSQL `analyses` table
- Frontend displays scores + breakdown

### For Frontend Development

- Use TypeScript (no `any` without good reason)
- Component-driven approach (small, reusable components)
- State management: React Context (no Redux unless needed)
- API calls via `lib/api.ts`
- Styling: TailwindCSS (no custom CSS unless necessary)

---

## Database Schemas

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
  status VARCHAR(50),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

### Analyses Table
```sql
CREATE TABLE analyses (
  id UUID PRIMARY KEY,
  video_id UUID NOT NULL,
  hook_strength FLOAT,
  pacing_score FLOAT,
  emotional_impact FLOAT,
  trend_alignment FLOAT,
  overall_score INT,
  attention_curve JSONB,
  recommendations TEXT[],
  created_at TIMESTAMP
);
```

### Captions Table
```sql
CREATE TABLE captions (
  id UUID PRIMARY KEY,
  video_id UUID NOT NULL,
  transcript TEXT,
  captions JSONB,
  language VARCHAR(10),
  created_at TIMESTAMP
);
```

---

## Environment Setup

See `SETUP.md` for detailed instructions. Minimum required:

```
DATABASE_URL=postgresql://user:password@localhost/viral_db
OPENAI_API_KEY=sk-...
HIGGSFIELD_API_KEY=hf_...
CLAUDE_API_KEY=sk-ant-...
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_S3_BUCKET=viral-videos-uploads
```

---

## Development Commands

```bash
# Start all services
npm run dev

# Start only frontend
npm run frontend

# Start only backend
npm run backend

# Run migrations
npm run migrate

# Reset database
npm run db:reset

# Run tests
npm test

# View database
docker-compose exec postgres psql -U user -d viral_db
```

---

## Code Style & Conventions

### TypeScript
- Use strict mode: `strict: true` in tsconfig.json
- Type all function parameters and returns
- Use interfaces for data structures
- Avoid `any` type

### Naming
- Variables & functions: `camelCase`
- Classes & interfaces: `PascalCase`
- Constants: `UPPER_SNAKE_CASE`
- Database tables: `snake_case`

### Commits
- Format: `type(scope): description`
- Types: `feat`, `fix`, `refactor`, `docs`, `test`
- Example: `feat(video): add auto-trim to 53 seconds`

### File Organization
- One component per file
- Group related functions in services
- Keep routes simple (logic in services)
- Utilities in `lib/` folder

---

## Important Files to Know

| File | Purpose |
|------|---------|
| `IMPLEMENTATION_PLAN.md` | Complete architecture & roadmap |
| `SETUP.md` | Environment setup guide |
| `backend/services/viralityAnalyzer.ts` | AI analysis engine |
| `backend/services/videoProcessor.ts` | Video editing with FFmpeg |
| `frontend/app/upload/page.tsx` | Upload interface |
| `frontend/lib/api.ts` | API client |
| `docker-compose.yml` | Local dev environment |

---

## Testing Strategy

### Unit Tests
- Test individual functions in services
- Test API route handlers
- Test React components with React Testing Library

### Integration Tests
- Full upload → analysis → export flow
- API endpoint tests with database

### E2E Tests
- Real browser tests with Playwright
- Test complete user journeys

### Commands
```bash
npm test              # Run all unit tests
npm run test:watch   # Watch mode
npm run test:e2e     # E2E tests
npm run coverage     # Coverage report
```

---

## API Endpoints (Quick Reference)

### Videos
- `POST /api/videos/upload` — Upload video
- `GET /api/videos` — List videos
- `GET /api/videos/:id` — Get video details
- `DELETE /api/videos/:id` — Delete video

### Analysis
- `POST /api/analysis/virality` — Run virality analysis
- `GET /api/analysis/:videoId` — Get analysis results
- `POST /api/analysis/reanalyze` — Re-run analysis

### Ideas
- `GET /api/ideas?niche=tech` — Get trending ideas
- `POST /api/ideas/generate` — Generate custom ideas

### Export
- `GET /api/export/:videoId?format=tiktok` — Download edited video

---

## Deployment Checklist

Before pushing to production:

- [ ] Run `npm test` — all tests pass
- [ ] Run `npm run lint` — no errors
- [ ] Environment variables set correctly
- [ ] Database migrations applied
- [ ] S3 bucket configured
- [ ] API keys valid
- [ ] Frontend builds without errors
- [ ] Backend starts without errors
- [ ] Performance tested (load testing)
- [ ] Security review completed
- [ ] Documentation updated

---

## Common Tasks

### Adding a New API Endpoint

1. Create route in `backend/routes/`
2. Add service logic in `backend/services/`
3. Add database query in `backend/models/`
4. Create API client in `frontend/lib/api.ts`
5. Test with curl or Postman
6. Update API.md documentation

### Adding a New Database Table

1. Create migration file: `backend/migrations/YYYYMMDD_name.sql`
2. Define model in `backend/models/`
3. Update `IMPLEMENTATION_PLAN.md` schema section
4. Create TypeScript interface
5. Run `npm run migrate`

### Updating Frontend UI

1. Create component in `frontend/components/`
2. Use TailwindCSS for styling
3. Export from component file
4. Import and use in page
5. Test responsiveness (mobile, tablet, desktop)

---

## Performance Goals

- Video upload: < 30 seconds
- Virality analysis: < 2 minutes
- Page load: < 2 seconds
- API response: < 500ms
- Video export: < 1 minute

---

## Resources & Links

- [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md) — Full technical specification
- [SETUP.md](./SETUP.md) — Environment setup guide
- [Next.js Docs](https://nextjs.org/docs)
- [Express Docs](https://expressjs.com)
- [PostgreSQL Docs](https://postgresql.org/docs)
- [FFmpeg Docs](https://ffmpeg.org/documentation.html)
- [Claude API](https://claude.ai/api)
- [Higgsfield API](https://higgsfield.ai/docs)

---

## Key Contacts

- **Project Owner:** Marianne Hämmerle (marianne.haemmerle8@gmail.com)
- **For Issues/Questions:** Check GitHub Issues first

---

## Future Considerations

- [ ] Add user authentication (Clerk/Auth0)
- [ ] Implement team accounts
- [ ] Add video collaboration features
- [ ] Build mobile app (React Native)
- [ ] Add real-time analytics
- [ ] Integrate with TikTok/Instagram/YouTube APIs
- [ ] Build creator community features

---

**Last Updated:** August 31, 2025
**Status:** Development 🚀
