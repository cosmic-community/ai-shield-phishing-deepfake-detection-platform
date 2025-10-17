import { createBucketClient } from '@cosmicjs/sdk'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Helper function for error handling
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Fetch all security tips
export async function getSecurityTips() {
  try {
    const response = await cosmic.objects
      .find({ type: 'security-tips' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch security tips');
  }
}

// Fetch security tips by category
export async function getSecurityTipsByCategory(category: string) {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'security-tips',
        'metadata.category.key': category
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch security tips by category');
  }
}

// Fetch priority security tips
export async function getPriorityTips() {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'security-tips',
        'metadata.priority': true
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch priority tips');
  }
}

// Fetch single security tip by slug
export async function getSecurityTipBySlug(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({ 
        type: 'security-tips',
        slug
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch security tip');
  }
}

// Fetch all analysis results
export async function getAnalysisResults() {
  try {
    const response = await cosmic.objects
      .find({ type: 'analysis-results' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    // Manual sorting by timestamp (newest first)
    return response.objects.sort((a, b) => {
      const dateA = new Date(a.metadata?.timestamp || '').getTime();
      const dateB = new Date(b.metadata?.timestamp || '').getTime();
      return dateB - dateA;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch analysis results');
  }
}

// Fetch analysis results by type
export async function getAnalysisResultsByType(type: string) {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'analysis-results',
        'metadata.analysis_type.key': type
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects.sort((a, b) => {
      const dateA = new Date(a.metadata?.timestamp || '').getTime();
      const dateB = new Date(b.metadata?.timestamp || '').getTime();
      return dateB - dateA;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch analysis results by type');
  }
}

// Create new analysis result
export async function createAnalysisResult(data: {
  title: string;
  analysisType: 'email' | 'media';
  riskLevel: 'low' | 'medium' | 'high';
  confidenceScore: number;
  highlights: any;
  details: string;
}) {
  try {
    const response = await cosmic.objects.insertOne({
      type: 'analysis-results',
      title: data.title,
      metadata: {
        analysis_type: data.analysisType,
        risk_level: data.riskLevel,
        confidence_score: data.confidenceScore,
        highlights: data.highlights,
        analysis_details: data.details,
        timestamp: new Date().toISOString()
      }
    });
    
    return response.object;
  } catch (error) {
    throw new Error('Failed to create analysis result');
  }
}