// backend/src/services/viralityAnalyzer.ts
import axios from 'axios';

export interface ViralityAnalysis {
  overallScore: number; // 0-100
  hookStrength: number; // 0-100
  pacingScore: number; // 0-100
  emotionalImpact: number; // 0-100
  trendAlignment: number; // 0-100
  attentionCurve: number[]; // Second-by-second scores
  recommendations: string[];
  confidence: number;
}

export class ViralityAnalyzer {
  /**
   * Analyze a video for virality potential
   * Uses Higgsfield AI API for prediction
   */
  async analyzeVideo(
    videoPath: string,
    metadata: {
      title?: string;
      description?: string;
      niche?: string;
      platform?: 'tiktok' | 'reels' | 'shorts';
    }
  ): Promise<ViralityAnalysis> {
    try {
      // Call Higgsfield virality_predictor API
      // This is a placeholder - real implementation would use the API
      const response = await axios.post(
        'https://api.higgsfield.ai/virality-predict',
        {
          videoPath,
          metadata,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.HIGGSFIELD_API_KEY}`,
          },
        }
      );

      return this.parseResponse(response.data);
    } catch (error) {
      console.error('Virality analysis error:', error);
      throw new Error('Failed to analyze video virality');
    }
  }

  /**
   * Parse Higgsfield response and return standardized format
   */
  private parseResponse(data: any): ViralityAnalysis {
    // Parse Higgsfield response
    const overallScore = Math.round(
      (data.hookStrength +
        data.pacingScore +
        data.emotionalImpact +
        data.trendAlignment) /
        4
    );

    const recommendations = this.generateRecommendations({
      hookStrength: data.hookStrength,
      pacingScore: data.pacingScore,
      emotionalImpact: data.emotionalImpact,
      trendAlignment: data.trendAlignment,
    });

    return {
      overallScore,
      hookStrength: data.hookStrength,
      pacingScore: data.pacingScore,
      emotionalImpact: data.emotionalImpact,
      trendAlignment: data.trendAlignment,
      attentionCurve: data.attentionCurve || [],
      recommendations,
      confidence: data.confidence || 0.85,
    };
  }

  /**
   * Generate actionable recommendations based on scores
   */
  private generateRecommendations(scores: {
    hookStrength: number;
    pacingScore: number;
    emotionalImpact: number;
    trendAlignment: number;
  }): string[] {
    const recommendations: string[] = [];

    if (scores.hookStrength < 70) {
      recommendations.push(
        '⚠️ Hook needs improvement - first 3 seconds are critical for retention'
      );
    }

    if (scores.pacingScore < 70) {
      recommendations.push(
        '🎬 Increase pacing - add more cuts, transitions, or visual changes'
      );
    }

    if (scores.emotionalImpact < 70) {
      recommendations.push(
        '💭 Add emotional triggers - surprise, humor, or relatable moments'
      );
    }

    if (scores.trendAlignment < 70) {
      recommendations.push('📈 Align with current trends and viral formats');
    }

    if (recommendations.length === 0) {
      recommendations.push('✨ Video looks great! Ready to post 🚀');
    }

    return recommendations;
  }

  /**
   * Calculate virality score for a given platform
   */
  async getPlatformScore(
    analysis: ViralityAnalysis,
    platform: 'tiktok' | 'reels' | 'shorts'
  ): Promise<number> {
    // Platform-specific weighting
    const weights = {
      tiktok: {
        hookStrength: 0.4,
        pacingScore: 0.3,
        emotionalImpact: 0.2,
        trendAlignment: 0.1,
      },
      reels: {
        hookStrength: 0.3,
        pacingScore: 0.2,
        emotionalImpact: 0.3,
        trendAlignment: 0.2,
      },
      shorts: {
        hookStrength: 0.25,
        pacingScore: 0.25,
        emotionalImpact: 0.25,
        trendAlignment: 0.25,
      },
    };

    const w = weights[platform];
    const score =
      analysis.hookStrength * w.hookStrength +
      analysis.pacingScore * w.pacingScore +
      analysis.emotionalImpact * w.emotionalImpact +
      analysis.trendAlignment * w.trendAlignment;

    return Math.round(score);
  }
}

export default new ViralityAnalyzer();
