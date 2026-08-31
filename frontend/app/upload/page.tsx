// frontend/app/upload/page.tsx
'use client';

import { useState, useRef } from 'react';
import { useState as useLoadingState } from 'react';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      if (selected.size > 1024 * 1024 * 1024) {
        alert('File too large. Max 1GB.');
        return;
      }
      if (!selected.type.startsWith('video/')) {
        alert('Please select a valid video file.');
        return;
      }
      setFile(selected);
    }
  };

  const handleUpload = async () => {
    if (!file || !title.trim()) {
      alert('Please select a file and add a title.');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);

    try {
      const response = await fetch('/api/videos/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      alert('Video uploaded! Analyzing...');
      window.location.href = `/videos/${data.id}`;
    } catch (error) {
      alert('Upload failed. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-2">Upload Your Video</h2>
        <p className="text-gray-600 mb-8">
          Drop your video here and we'll analyze its viral potential instantly
        </p>

        {/* Upload Zone */}
        <div
          className="border-2 border-dashed border-orange-300 rounded-lg p-12 text-center mb-8 cursor-pointer hover:border-orange-500 transition"
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          {file ? (
            <div>
              <div className="text-4xl mb-2">✅</div>
              <p className="font-semibold text-lg">{file.name}</p>
              <p className="text-sm text-gray-500">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          ) : (
            <div>
              <div className="text-5xl mb-4">🎬</div>
              <p className="text-lg font-semibold mb-2">Drop your video here</p>
              <p className="text-gray-500">or click to browse (Max 1GB)</p>
              <p className="text-xs text-gray-400 mt-2">
                MP4, MOV, WebM, or other video formats
              </p>
            </div>
          )}
        </div>

        {/* Title Input */}
        <div className="mb-8">
          <label className="block text-sm font-semibold mb-2">
            Video Title (Optional)
          </label>
          <input
            type="text"
            placeholder="e.g., Tips for Going Viral on TikTok"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Upload Progress */}
        {loading && (
          <div className="mb-8">
            <div className="bg-gray-100 rounded-full h-2 w-full overflow-hidden">
              <div
                className="bg-orange-600 h-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-gray-600 mt-2">Uploading... {progress}%</p>
          </div>
        )}

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={loading || !file}
          className="w-full py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Uploading...' : 'Analyze Video'}
        </button>

        {/* Info Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-orange-50 p-6 rounded-lg">
            <div className="text-3xl mb-2">🎯</div>
            <h3 className="font-semibold mb-2">Virality Score</h3>
            <p className="text-sm text-gray-600">
              AI predicts if your video will go viral (0-100)
            </p>
          </div>

          <div className="bg-yellow-50 p-6 rounded-lg">
            <div className="text-3xl mb-2">✂️</div>
            <h3 className="font-semibold mb-2">Auto-Trim</h3>
            <p className="text-sm text-gray-600">
              Automatically cuts to 53-second perfect shorts
            </p>
          </div>

          <div className="bg-red-50 p-6 rounded-lg">
            <div className="text-3xl mb-2">📈</div>
            <h3 className="font-semibold mb-2">Platform Optimization</h3>
            <p className="text-sm text-gray-600">
              Optimized for TikTok, Reels, and YouTube Shorts
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
