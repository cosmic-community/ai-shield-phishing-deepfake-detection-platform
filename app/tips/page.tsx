import { Shield, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { getSecurityTips } from '@/lib/cosmic'
import SecurityTipCard from '@/components/SecurityTipCard'

export default async function TipsPage() {
  const tips = await getSecurityTips()

  // Group tips by category
  const groupedTips = tips.reduce((acc, tip) => {
    const category = tip.metadata?.category?.key || 'general'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(tip)
    return acc
  }, {} as Record<string, typeof tips>)

  const categories = [
    { key: 'phishing', label: 'Phishing Awareness', color: 'text-danger' },
    { key: 'deepfake', label: 'Deepfake Detection', color: 'text-warning' },
    { key: 'general', label: 'General Security', color: 'text-primary' }
  ]

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
          <h2 className="text-4xl font-bold mb-4 glow-text">Security Tips & Best Practices</h2>
          <p className="text-xl text-foreground/80">
            Learn how to protect yourself from phishing attacks, deepfakes, and other digital threats.
          </p>
        </div>

        {categories.map((category) => {
          const categoryTips = groupedTips[category.key]
          
          if (!categoryTips || categoryTips.length === 0) {
            return null
          }

          return (
            <div key={category.key} className="mb-12">
              <h3 className={`text-2xl font-bold mb-6 ${category.color}`}>
                {category.label}
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryTips.map((tip) => (
                  <SecurityTipCard key={tip.id} tip={tip} />
                ))}
              </div>
            </div>
          )
        })}

        {tips.length === 0 && (
          <div className="text-center py-12">
            <p className="text-foreground/60 text-lg">No security tips available yet.</p>
          </div>
        )}
      </section>
    </div>
  )
}