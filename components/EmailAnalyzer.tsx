'use client'

import { useState } from 'react'
import { Send, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import ResultsDashboard from './ResultsDashboard'
import type { AnalysisDisplayData } from '@/types'

export default function EmailAnalyzer() {
  const [emailBody, setEmailBody] = useState('')
  const [senderEmail, setSenderEmail] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<AnalysisDisplayData | null>(null)

  const handleAnalyze = async () => {
    if (!emailBody.trim() || !senderEmail.trim()) {
      alert('Please enter both email body and sender email')
      return
    }

    setIsAnalyzing(true)
    
    // Simulate analysis (in production, this would call your API)
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Generate mock analysis result
    const mockResult: AnalysisDisplayData = {
      type: 'email',
      riskLevel: emailBody.toLowerCase().includes('urgent') || emailBody.toLowerCase().includes('click') ? 'high' : 'low',
      confidenceScore: Math.floor(Math.random() * 30) + 70,
      highlights: {
        suspicious_links: emailBody.includes('http') ? ['http://suspicious-link.com'] : [],
        red_flags: emailBody.toLowerCase().includes('urgent') ? ['Urgent language detected', 'Suspicious sender domain'] : [],
        security_indicators: !emailBody.toLowerCase().includes('urgent') ? ['Verified sender', 'Secure links'] : []
      },
      details: emailBody.toLowerCase().includes('urgent') 
        ? 'Email contains multiple phishing indicators including urgent language and suspicious patterns.'
        : 'Email appears legitimate with no major phishing indicators detected.',
      timestamp: new Date().toISOString()
    }
    
    setResult(mockResult)
    setIsAnalyzing(false)
  }

  const handleReset = () => {
    setResult(null)
    setEmailBody('')
    setSenderEmail('')
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
            <div>
              <label className="block text-sm font-medium mb-2">Sender Email</label>
              <input
                type="email"
                value={senderEmail}
                onChange={(e) => setSenderEmail(e.target.value)}
                placeholder="suspicious@example.com"
                className="w-full px-4 py-2 bg-secondary border border-gray-700 rounded-lg focus:outline-none focus:border-primary transition-colors"
                disabled={isAnalyzing}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Email Body</label>
              <textarea
                value={emailBody}
                onChange={(e) => setEmailBody(e.target.value)}
                placeholder="Paste the email content here..."
                rows={6}
                className="w-full px-4 py-2 bg-secondary border border-gray-700 rounded-lg focus:outline-none focus:border-primary transition-colors resize-none"
                disabled={isAnalyzing}
              />
            </div>
            
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing || !emailBody.trim() || !senderEmail.trim()}
              className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-2"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Analyze Email</span>
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