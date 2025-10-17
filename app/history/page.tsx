import { Shield, ArrowLeft, Filter } from 'lucide-react'
import Link from 'next/link'
import { getAnalysisResults } from '@/lib/cosmic'
import AnalysisResultCard from '@/components/AnalysisResultCard'

export default async function HistoryPage() {
  const results = await getAnalysisResults()

  return (
    <div className="min-h-screen gradient-bg">
      <header className="border-b border-gray-800 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8 text-primary" />
              <h1 className="text-2xl font-bold glow-text">AI Shield</h1>
            </div>
            <nav className="flex items-center space-x-6">
              <Link 
                href="/" 
                className="text-foreground/80 hover:text-primary transition-colors flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-4 glow-text">Analysis History</h2>
          <p className="text-xl text-foreground/80">
            View all your past email and media analyses with detailed results.
          </p>
        </div>

        {results.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((result) => (
              <AnalysisResultCard key={result.id} result={result} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-card border border-gray-800 rounded-lg">
            <Filter className="w-16 h-16 text-foreground/30 mx-auto mb-4" />
            <p className="text-foreground/60 text-lg mb-2">No analysis history yet</p>
            <p className="text-foreground/40">
              Start analyzing emails or media files to build your history
            </p>
            <Link 
              href="/"
              className="inline-block mt-6 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-all"
            >
              Start Analyzing
            </Link>
          </div>
        )}
      </section>
    </div>
  )
}