// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Security Tip type
export interface SecurityTip extends CosmicObject {
  type: 'security-tips';
  metadata: {
    headline?: string;
    content?: string;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    category?: {
      key: string;
      value: string;
    };
    priority?: boolean;
  };
}

// Analysis Result type
export interface AnalysisResult extends CosmicObject {
  type: 'analysis-results';
  metadata: {
    analysis_type?: {
      key: string;
      value: string;
    };
    risk_level?: {
      key: string;
      value: string;
    };
    confidence_score?: number;
    highlights?: {
      suspicious_links?: string[];
      suspicious_domains?: string[];
      red_flags?: string[];
      suspicious_frames?: number[];
      anomalies?: string[];
      manipulation_areas?: string[];
      verified_domains?: string[];
      security_indicators?: string[];
    };
    analysis_details?: string;
    timestamp?: string;
  };
}

// Type literals for select-dropdown values
export type AnalysisType = 'email' | 'media';
export type RiskLevel = 'low' | 'medium' | 'high';
export type CategoryKey = 'phishing' | 'deepfake' | 'general';

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit?: number;
  skip?: number;
}

// Form data types
export interface EmailAnalysisData {
  emailBody: string;
  senderEmail: string;
}

export interface MediaAnalysisData {
  file: File;
  analysisType: 'image' | 'video' | 'audio';
}

// Analysis result data for display
export interface AnalysisDisplayData {
  type: 'email' | 'media';
  riskLevel: RiskLevel;
  confidenceScore: number;
  highlights: AnalysisResult['metadata']['highlights'];
  details: string;
  timestamp: string;
}