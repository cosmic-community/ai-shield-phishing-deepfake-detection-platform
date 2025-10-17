import { Mail, Video, AlertTriangle, CheckCircle, Calendar } from 'lucide-react'
import type { AnalysisResult } from '@/types'

interface AnalysisResultCardProps {
  result: AnalysisResult
}

export default function AnalysisResultCard({ result }: AnalysisResultCardProps) {
  const isEmail = result.metadata?.analysis_type?.key === 'email'
  const riskLevel = result.metadata?.risk_level?.key || 'low'
  const confidenceScore = result.metadata?.confidence_score || 0

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high':
        return 'text-danger border-danger bg-danger/10'
      case 'medium':
        return 'text-warning border-warning bg-warning/10'
      case 'low':
        return 'text-success border-success bg-success/10'
      default:
        return 'text-foreground border-gray-800 bg-card'
    }
  }

  const getRiskIcon = (level: string) => {
    return level === 'low' ? (
      <CheckCircle className="w-5 h-5" />
    ) : (
      <AlertTriangle className="w-5 h-5" />
    )
  }

  return (
    <div className="bg-card border border-gray-800 rounded-lg p-6 hover:glow-border transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          {isEmail ? (
            <Mail className="w-6 h-6 text-primary" />
          ) : (
            <Video className="w-6 h-6 text-primary" />
          )}
          <div>
            <h3 className="font-bold">{result.title}</h3>
            <p className="text-sm text-foreground/60">
              {result.metadata?.analysis_type?.value}
            </p>
          </div>
        </div>
        
        <div className={`${getRiskColor(riskLevel)} px-3 py-1 rounded-full border flex items-center space-x-2`}>
          {getRiskIcon(riskLevel)}
          <span className="text-sm font-medium uppercase">{riskLevel}</span>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-foreground/60">Confidence Score</span>
          <span className="font-bold text-primary">{confidenceScore}%</span>
        </div>
        <div className="w-full bg-secondary rounded-full h-2">
          <div 
            className="bg-primary rounded-full h-2 transition-all duration-500"
            style={{ width: `${confidenceScore}%` }}
          />
        </div>
      </div>

      {result.metadata?.analysis_details && (
        <p className="text-sm text-foreground/70 mb-4 line-clamp-2">
          {result.metadata.analysis_details}
        </p>
      )}

      {result.metadata?.timestamp && (
        <div className="flex items-center space-x-2 text-xs text-foreground/50">
          <Calendar className="w-4 h-4" />
          <span>{new Date(result.metadata.timestamp).toLocaleString()}</span>
        </div>
      )}
    </div>
  )
}