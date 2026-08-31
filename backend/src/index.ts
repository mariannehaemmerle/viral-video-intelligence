// backend/src/index.ts
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import Database from 'better-sqlite3';
import fs from 'fs';

// Load environment variables
dotenv.config({
  path: path.resolve(__dirname, '../../.env.local'),
});

// Initialize SQLite database
const dbPath = path.resolve(__dirname, '../../data/app.db');
const dataDir = path.resolve(__dirname, '../../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}
const db = new Database(dbPath);
db.pragma('journal_mode = WAL');

// Initialize database tables
db.exec(`
  CREATE TABLE IF NOT EXISTS videos (
    id TEXT PRIMARY KEY,
    filename TEXT NOT NULL,
    originalName TEXT NOT NULL,
    fileSize INTEGER,
    duration REAL,
    uploadedAt TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    s3Url TEXT
  );

  CREATE TABLE IF NOT EXISTS analyses (
    id TEXT PRIMARY KEY,
    videoId TEXT NOT NULL,
    viralityScore REAL,
    hookStrength REAL,
    pacing REAL,
    emotionalImpact REAL,
    trendAlignment REAL,
    recommendations TEXT,
    attentionCurve TEXT,
    createdAt TEXT NOT NULL,
    FOREIGN KEY(videoId) REFERENCES videos(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS edits (
    id TEXT PRIMARY KEY,
    videoId TEXT NOT NULL,
    editedVideoUrl TEXT,
    thumbnailUrl TEXT,
    caption TEXT,
    tags TEXT,
    createdAt TEXT NOT NULL,
    FOREIGN KEY(videoId) REFERENCES videos(id) ON DELETE CASCADE
  );
`);

global.db = db;

const app: Express = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes (will be added)
app.use('/api/videos', require('./routes/videos'));
app.use('/api/analysis', require('./routes/analysis'));
app.use('/api/ideas', require('./routes/ideas'));
app.use('/api/export', require('./routes/export'));

// Error handling middleware
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error('[ERROR]', err);
    res.status(err.status || 500).json({
      error: err.message || 'Internal server error',
      status: err.status || 500,
    });
  }
);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📝 API docs: http://localhost:${PORT}/api`);
  console.log(`🏥 Health check: http://localhost:${PORT}/health`);
});

export default app;
