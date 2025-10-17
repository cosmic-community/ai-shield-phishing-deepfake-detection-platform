import { Loader2 } from 'lucide-react'

export default function Loading() {
  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
        <p className="text-foreground/70">Loading...</p>
      </div>
    </div>
  )
}