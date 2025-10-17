'use client'

import { motion } from 'framer-motion'
import { AlertTriangle, CheckCircle, Shield, RotateCcw } from 'lucide-react'
import type { AnalysisDisplayData } from '@/types'

interface ResultsDashboardProps {
  result: AnalysisDisplayData
  onReset: () => void
}

export default function ResultsDashboard({ result, onReset }: ResultsDashboardProps) {
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high':
        return 'text-danger'
      case 'medium':
        return 'text-warning'
      case 'low':
        return 'text-success'
      default:
        return 'text-foreground'
    }
  }

  const getRiskBgColor = (level: string) => {
    switch (level) {
      case 'high':
        return 'bg-danger/20 border-danger'
      case 'medium':
        return 'bg-warning/20 border-warning'
      case 'low':
        return 'bg-success/20 border-success'
      default:
        return 'bg-secondary border-gray-700'
    }
  }

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'high':
      case 'medium':
        return <AlertTriangle className="w-6 h-6" />
      case 'low':
        return <CheckCircle className="w-6 h-6" />
      default:
        return <Shield className="w-6 h-6" />
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Risk Level Badge */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className={`${getRiskBgColor(result.riskLevel)} border rounded-lg p-6`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={getRiskColor(result.riskLevel)}>
              {getRiskIcon(result.riskLevel)}
            </div>
            <div>
              <div className="text-sm text-foreground/60">Risk Level</div>
              <div className={`text-2xl font-bold ${getRiskColor(result.riskLevel)}`}>
                {result.riskLevel.toUpperCase()}
              </div>
            </div>
          </div>
          
          {/* Confidence Score Circle */}
          <div className="relative w-24 h-24">
            <svg className="transform -rotate-90 w-24 h-24">
              <circle
                cx="48"
                cy="48"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-secondary"
              />
              <motion.circle
                cx="48"
                cy="48"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={`${2 * Math.PI * 40}`}
                initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 40 * (1 - result.confidenceScore / 100) }}
                transition={{ duration: 1, delay: 0.2 }}
                className="text-primary"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-xl font-bold">{result.confidenceScore}%</div>
                <div className="text-xs text-foreground/60">Confidence</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Analysis Details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-card border border-gray-800 rounded-lg p-6"
      >
        <h4 className="text-lg font-bold mb-3">Analysis Details</h4>
        <p className="text-foreground/80">{result.details}</p>
      </motion.div>

      {/* Highlights */}
      {result.highlights && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card border border-gray-800 rounded-lg p-6"
        >
          <h4 className="text-lg font-bold mb-4">Suspicious Highlights</h4>
          <div className="space-y-3">
            {result.highlights.suspicious_links && result.highlights.suspicious_links.length > 0 && (
              <div>
                <div className="text-sm font-medium text-danger mb-2">Suspicious Links:</div>
                <ul className="space-y-1">
                  {result.highlights.suspicious_links.map((link, index) => (
                    <li key={index} className="text-sm text-foreground/70 pl-4 border-l-2 border-danger">
                      {link}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {result.highlights.red_flags && result.highlights.red_flags.length > 0 && (
              <div>
                <div className="text-sm font-medium text-danger mb-2">Red Flags:</div>
                <ul className="space-y-1">
                  {result.highlights.red_flags.map((flag, index) => (
                    <li key={index} className="text-sm text-foreground/70 pl-4 border-l-2 border-danger">
                      {flag}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {result.highlights.anomalies && result.highlights.anomalies.length > 0 && (
              <div>
                <div className="text-sm font-medium text-warning mb-2">Anomalies Detected:</div>
                <ul className="space-y-1">
                  {result.highlights.anomalies.map((anomaly, index) => (
                    <li key={index} className="text-sm text-foreground/70 pl-4 border-l-2 border-warning">
                      {anomaly}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {result.highlights.security_indicators && result.highlights.security_indicators.length > 0 && (
              <div>
                <div className="text-sm font-medium text-success mb-2">Security Indicators:</div>
                <ul className="space-y-1">
                  {result.highlights.security_indicators.map((indicator, index) => (
                    <li key={index} className="text-sm text-foreground/70 pl-4 border-l-2 border-success">
                      {indicator}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Reset Button */}
      <button
        onClick={onReset}
        className="w-full bg-secondary text-foreground px-6 py-3 rounded-lg font-medium hover:bg-secondary/80 transition-all flex items-center justify-center space-x-2 border border-gray-800"
      >
        <RotateCcw className="w-5 h-5" />
        <span>Analyze Another</span>
      </button>
    </motion.div>
  )
}