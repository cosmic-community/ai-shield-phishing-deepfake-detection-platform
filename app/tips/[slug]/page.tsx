// app/tips/[slug]/page.tsx
import { Shield, ArrowLeft, Calendar, Tag } from 'lucide-react'
import Link from 'next/link'
import { getSecurityTipBySlug } from '@/lib/cosmic'
import ReactMarkdown from 'react-markdown'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function TipDetailPage({ params }: PageProps) {
  const { slug } = await params
  const tip = await getSecurityTipBySlug(slug)

  if (!tip) {
    notFound()
  }

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
                href="/tips" 
                className="text-foreground/80 hover:text-primary transition-colors flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Tips</span>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {tip.metadata?.featured_image && (
          <div className="mb-8 rounded-lg overflow-hidden glow-border">
            <img
              src={`${tip.metadata.featured_image.imgix_url}?w=1600&h=800&fit=crop&auto=format,compress`}
              alt={tip.title}
              className="w-full h-96 object-cover"
              width="800"
              height="400"
            />
          </div>
        )}

        <div className="flex items-center space-x-4 mb-6">
          {tip.metadata?.category && (
            <div className="flex items-center space-x-2 bg-card border border-gray-800 px-4 py-2 rounded-full">
              <Tag className="w-4 h-4 text-primary" />
              <span className="text-sm">{tip.metadata.category.value}</span>
            </div>
          )}
          
          {tip.metadata?.priority && (
            <span className="bg-danger/20 text-danger text-sm px-4 py-2 rounded-full border border-danger">
              Priority
            </span>
          )}
          
          <div className="flex items-center space-x-2 text-foreground/60 text-sm">
            <Calendar className="w-4 h-4" />
            <span>{new Date(tip.created_at).toLocaleDateString()}</span>
          </div>
        </div>

        <h1 className="text-4xl font-bold mb-8 glow-text">
          {tip.metadata?.headline || tip.title}
        </h1>

        <div className="prose prose-invert prose-lg max-w-none">
          {tip.metadata?.content ? (
            <ReactMarkdown>{tip.metadata.content}</ReactMarkdown>
          ) : (
            <p className="text-foreground/80">No content available.</p>
          )}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <Link 
            href="/tips"
            className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to all tips</span>
          </Link>
        </div>
      </article>
    </div>
  )
}