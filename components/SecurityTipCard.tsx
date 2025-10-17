import Link from 'next/link'
import { AlertTriangle, Shield, Eye } from 'lucide-react'
import type { SecurityTip } from '@/types'

interface SecurityTipCardProps {
  tip: SecurityTip
}

export default function SecurityTipCard({ tip }: SecurityTipCardProps) {
  const categoryIcon = {
    phishing: <AlertTriangle className="w-5 h-5" />,
    deepfake: <Eye className="w-5 h-5" />,
    general: <Shield className="w-5 h-5" />
  }

  const categoryColor = {
    phishing: 'text-danger',
    deepfake: 'text-warning',
    general: 'text-primary'
  }

  const categoryKey = tip.metadata?.category?.key || 'general'

  return (
    <Link href={`/tips/${tip.slug}`}>
      <div className="bg-card border border-gray-800 rounded-lg p-6 hover:glow-border-strong transition-all h-full group">
        {tip.metadata?.featured_image && (
          <div className="mb-4 overflow-hidden rounded-lg">
            <img
              src={`${tip.metadata.featured_image.imgix_url}?w=800&h=400&fit=crop&auto=format,compress`}
              alt={tip.title}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              width="400"
              height="200"
            />
          </div>
        )}
        
        <div className="flex items-center space-x-2 mb-3">
          <div className={categoryColor[categoryKey as keyof typeof categoryColor]}>
            {categoryIcon[categoryKey as keyof typeof categoryIcon]}
          </div>
          <span className={`text-sm font-medium ${categoryColor[categoryKey as keyof typeof categoryColor]}`}>
            {tip.metadata?.category?.value || 'General Security'}
          </span>
          {tip.metadata?.priority && (
            <span className="bg-danger/20 text-danger text-xs px-2 py-1 rounded">
              Priority
            </span>
          )}
        </div>
        
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
          {tip.metadata?.headline || tip.title}
        </h3>
        
        <p className="text-foreground/70 text-sm line-clamp-3">
          {tip.metadata?.content?.split('\n\n')[0]?.replace(/^#+ /, '') || ''}
        </p>
        
        <div className="mt-4 text-primary text-sm font-medium group-hover:translate-x-2 transition-transform inline-block">
          Read More →
        </div>
      </div>
    </Link>
  )
}