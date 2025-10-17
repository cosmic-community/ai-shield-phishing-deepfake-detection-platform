import { Shield, Mail, Video, AlertTriangle, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import EmailAnalyzer from '@/components/EmailAnalyzer'
import MediaAnalyzer from '@/components/MediaAnalyzer'
import { getPriorityTips } from '@/lib/cosmic'
import SecurityTipCard from '@/components/SecurityTipCard'

export default async function HomePage() {
  const priorityTips = await getPriorityTips()

  return (
    <div className="min-h-screen gradient-bg">
      {/* Header */}
      <header className="border-b border-gray-800 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8 text-primary" />
              <h1 className="text-2xl font-bold glow-text">AI Shield</h1>
            </div>
            <nav className="flex items-center space-x-6">
              <Link 
                href="/tips" 
                className="text-foreground/80 hover:text-primary transition-colors"
              >
                Security Tips
              </Link>
              <Link 
                href="/history" 
                className="text-foreground/80 hover:text-primary transition-colors"
              >
                Analysis History
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-4 glow-text">
            Detect Phishing & Deepfakes Instantly
          </h2>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
            Protect yourself from phishing and deepfakes using AI. Upload emails or media files for instant threat analysis.
          </p>
        </div>

        {/* Analyzer Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Email Analyzer */}
          <div className="bg-card border border-gray-800 rounded-lg p-6 glow-border hover:glow-border-strong transition-all">
            <div className="flex items-center space-x-3 mb-4">
              <Mail className="w-6 h-6 text-primary" />
              <h3 className="text-2xl font-bold">Email Analyzer</h3>
            </div>
            <p className="text-foreground/70 mb-6">
              Analyze emails for phishing attempts, suspicious links, and malicious content.
            </p>
            <EmailAnalyzer />
          </div>

          {/* Media Analyzer */}
          <div className="bg-card border border-gray-800 rounded-lg p-6 glow-border hover:glow-border-strong transition-all">
            <div className="flex items-center space-x-3 mb-4">
              <Video className="w-6 h-6 text-primary" />
              <h3 className="text-2xl font-bold">Media Analyzer</h3>
            </div>
            <p className="text-foreground/70 mb-6">
              Detect deepfakes and manipulation in images, videos, and audio files.
            </p>
            <MediaAnalyzer />
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-card border border-gray-800 rounded-lg p-6 text-center">
            <AlertTriangle className="w-12 h-12 text-danger mx-auto mb-3" />
            <div className="text-3xl font-bold text-primary mb-2">10,000+</div>
            <div className="text-foreground/70">Threats Detected</div>
          </div>
          <div className="bg-card border border-gray-800 rounded-lg p-6 text-center">
            <TrendingUp className="w-12 h-12 text-success mx-auto mb-3" />
            <div className="text-3xl font-bold text-primary mb-2">95%</div>
            <div className="text-foreground/70">Accuracy Rate</div>
          </div>
          <div className="bg-card border border-gray-800 rounded-lg p-6 text-center">
            <Shield className="w-12 h-12 text-primary mx-auto mb-3" />
            <div className="text-3xl font-bold text-primary mb-2">Real-Time</div>
            <div className="text-foreground/70">Protection</div>
          </div>
        </div>

        {/* Priority Security Tips */}
        {priorityTips && priorityTips.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-3xl font-bold">Priority Security Tips</h3>
              <Link 
                href="/tips" 
                className="text-primary hover:text-primary/80 transition-colors"
              >
                View All Tips →
              </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {priorityTips.slice(0, 3).map((tip) => (
                <SecurityTipCard key={tip.id} tip={tip} />
              ))}
            </div>
          </div>
        )}

        {/* About Section */}
        <div className="bg-card border border-gray-800 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">About AI Shield</h3>
          <p className="text-foreground/80 max-w-3xl mx-auto leading-relaxed">
            AI Shield uses advanced machine learning algorithms to detect phishing attempts in emails and deepfake manipulation in media files. Our platform provides real-time analysis with detailed reports, helping you stay protected against modern digital threats. With continuous updates and community-driven improvements, AI Shield is your first line of defense in the digital world.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-background/80 backdrop-blur-sm mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-foreground/60">
            <p>© {new Date().getFullYear()} AI Shield. Protecting you from digital threats.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}