// frontend/app/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Video {
  id: string;
  title: string;
  viralityScore: number;
  createdAt: string;
  thumbnail?: string;
}

export default function DashboardPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('/api/videos');
        if (response.ok) {
          const data = await response.json();
          setVideos(data);
        }
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Make Videos That Go <span className="text-orange-600">VIRAL</span>
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl">
          AI-powered analysis predicts if your video will go viral. Get specific,
          actionable recommendations to optimize every second.
        </p>

        <Link
          href="/upload"
          className="inline-block px-8 py-4 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition shadow-lg"
        >
          Upload Your First Video →
        </Link>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-4xl mb-2">📊</div>
          <p className="text-gray-600 text-sm">Videos Analyzed</p>
          <p className="text-3xl font-bold">{videos.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-4xl mb-2">🚀</div>
          <p className="text-gray-600 text-sm">Viral Candidates</p>
          <p className="text-3xl font-bold">
            {videos.filter((v) => v.viralityScore >= 70).length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-4xl mb-2">⭐</div>
          <p className="text-gray-600 text-sm">Average Score</p>
          <p className="text-3xl font-bold">
            {videos.length > 0
              ? Math.round(
                  videos.reduce((sum, v) => sum + v.viralityScore, 0) /
                    videos.length
                )
              : 0}
          </p>
        </div>
      </div>

      {/* Recent Videos */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h3 className="text-2xl font-bold mb-6">Your Videos</h3>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin text-4xl mb-4">🎬</div>
            <p className="text-gray-600">Loading videos...</p>
          </div>
        ) : videos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">No videos yet.</p>
            <Link
              href="/upload"
              className="text-orange-600 hover:text-orange-700 font-semibold"
            >
              Upload your first video →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <Link
                key={video.id}
                href={`/videos/${video.id}`}
                className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition cursor-pointer"
              >
                <div className="bg-gray-900 h-40 flex items-center justify-center">
                  <div className="text-5xl">🎬</div>
                </div>
                <div className="p-4">
                  <h4 className="font-semibold mb-2 line-clamp-2">
                    {video.title}
                  </h4>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">
                      {new Date(video.createdAt).toLocaleDateString()}
                    </span>
                    <span
                      className={`px-3 py-1 rounded text-sm font-semibold ${
                        video.viralityScore >= 70
                          ? 'bg-green-100 text-green-800'
                          : video.viralityScore >= 50
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {video.viralityScore}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Features Section */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-orange-50 rounded-lg p-8">
          <div className="text-5xl mb-4">⚡</div>
          <h3 className="text-xl font-bold mb-2">Real-time Analysis</h3>
          <p className="text-gray-700">
            Get instant virality predictions powered by advanced AI. Know within
            seconds if your video has viral potential.
          </p>
        </div>

        <div className="bg-yellow-50 rounded-lg p-8">
          <div className="text-5xl mb-4">✨</div>
          <h3 className="text-xl font-bold mb-2">Actionable Insights</h3>
          <p className="text-gray-700">
            Get specific recommendations for improving hook strength, pacing,
            emotional impact, and trend alignment.
          </p>
        </div>

        <div className="bg-red-50 rounded-lg p-8">
          <div className="text-5xl mb-4">📱</div>
          <h3 className="text-xl font-bold mb-2">Platform Optimization</h3>
          <p className="text-gray-700">
            Export your videos optimized for TikTok, Instagram Reels, or YouTube
            Shorts with perfect dimensions and format.
          </p>
        </div>

        <div className="bg-blue-50 rounded-lg p-8">
          <div className="text-5xl mb-4">🎯</div>
          <h3 className="text-xl font-bold mb-2">Trend Intelligence</h3>
          <p className="text-gray-700">
            Stay ahead of the curve with current trend analysis and viral format
            recommendations for your niche.
          </p>
        </div>
      </div>
    </div>
  );
}
