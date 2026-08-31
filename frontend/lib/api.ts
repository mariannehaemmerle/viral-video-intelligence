// frontend/lib/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export async function uploadVideo(file: File, title: string) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('title', title);

  const response = await fetch(`${API_URL}/api/videos/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to upload video');
  }

  return response.json();
}

export async function getVideoAnalysis(videoId: string) {
  const response = await fetch(`${API_URL}/api/videos/${videoId}`);

  if (!response.ok) {
    throw new Error('Failed to fetch analysis');
  }

  return response.json();
}

export async function getVideos() {
  const response = await fetch(`${API_URL}/api/videos`);

  if (!response.ok) {
    throw new Error('Failed to fetch videos');
  }

  return response.json();
}

export async function deleteVideo(videoId: string) {
  const response = await fetch(`${API_URL}/api/videos/${videoId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete video');
  }

  return response.json();
}

export async function exportVideo(
  videoId: string,
  format: 'tiktok' | 'reels' | 'shorts'
) {
  return `${API_URL}/api/export/${videoId}?format=${format}`;
}

export async function getVideoIdeas(niche?: string) {
  const url = niche
    ? `${API_URL}/api/ideas?niche=${niche}`
    : `${API_URL}/api/ideas`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch ideas');
  }

  return response.json();
}

export async function reanalyzeVideo(videoId: string) {
  const response = await fetch(`${API_URL}/api/analysis/reanalyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ videoId }),
  });

  if (!response.ok) {
    throw new Error('Failed to reanalyze video');
  }

  return response.json();
}
