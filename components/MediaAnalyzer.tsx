'use client'

import { useState } from 'react'
import { Upload, Loader2, FileVideo, FileImage, Music } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import ResultsDashboard from './ResultsDashboard'
import type { AnalysisDisplayData } from '@/types'

export default function MediaAnalyzer() {
  const [file, setFile] = useState<File | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<AnalysisDisplayData | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleAnalyze = async () => {
    if (!file) {
      alert('Please select a file to analyze')
      return
    }

    setIsAnalyzing(true)
    
    // Simulate analysis
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    // Generate mock analysis result
    const mockResult: AnalysisDisplayData = {
      type: 'media',
      riskLevel: Math.random() > 0.5 ? 'high' : 'low',
      confidenceScore: Math.floor(Math.random() * 30) + 70,
      highlights: {
        suspicious_frames: Math.random() > 0.5 ? [45, 78, 123] : [],
        anomalies: Math.random() > 0.5 ? ['Facial boundary inconsistencies', 'Unnatural eye movements'] : [],
        security_indicators: Math.random() < 0.5 ? ['No manipulation detected', 'Authentic content'] : []
      },
      details: Math.random() > 0.5
        ? 'Media shows signs of manipulation with inconsistent lighting and unnatural facial boundaries.'
        : 'Media appears authentic with no deepfake indicators detected.',
      timestamp: new Date().toISOString()
    }
    
    setResult(mockResult)
    setIsAnalyzing(false)
  }

  const handleReset = () => {
    setResult(null)
    setFile(null)
  }

  const getFileIcon = () => {
    if (!file) return <Upload className="w-8 h-8 text-primary" />
    
    if (file.type.startsWith('video/')) return <FileVideo className="w-8 h-8 text-primary" />
    if (file.type.startsWith('image/')) return <FileImage className="w-8 h-8 text-primary" />
    if (file.type.startsWith('audio/')) return <Music className="w-8 h-8 text-primary" />
    
    return <Upload className="w-8 h-8 text-primary" />
  }

  return (
    <div>
      <AnimatePresence mode="wait">
        {!result ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
              <input
                type="file"
                onChange={handleFileChange}
                accept="image/*,video/*,audio/*"
                className="hidden"
                id="media-upload"
                disabled={isAnalyzing}
              />
              <label htmlFor="media-upload" className="cursor-pointer">
                <div className="flex flex-col items-center space-y-3">
                  {getFileIcon()}
                  <div>
                    <p className="font-medium">
                      {file ? file.name : 'Click to upload or drag and drop'}
                    </p>
                    <p className="text-sm text-foreground/60">
                      {file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : 'Images, videos, or audio files'}
                    </p>
                  </div>
                </div>
              </label>
            </div>
            
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing || !file}
              className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-2"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5" />
                  <span>Analyze Media</span>
                </>
              )}
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <ResultsDashboard result={result} onReset={handleReset} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}