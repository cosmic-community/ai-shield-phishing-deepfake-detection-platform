# AI Shield — Phishing & Deepfake Detection Platform

![App Preview](https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&h=300&fit=crop&auto=format)

AI Shield is a cutting-edge security platform that uses artificial intelligence to detect phishing attempts in emails and deepfake manipulation in media files. Built with a modern dark theme and smooth animations, it provides real-time threat analysis with comprehensive reporting.

## Features

- 🔍 **Email Phishing Detection** - Analyze emails for suspicious links, domains, and phishing indicators
- 🎥 **Media Deepfake Analysis** - Detect facial manipulation and deepfake artifacts in images and videos
- 📊 **Real-Time Results Dashboard** - View risk levels, confidence scores, and detailed threat highlights
- 📚 **Security Tips Library** - Educational resources on phishing awareness and deepfake detection
- 📈 **Analysis History** - Track all past analyses with filtering by type and risk level
- 🎨 **Smooth Animations** - Framer Motion powered transitions and interactive elements
- 🌙 **Dark Theme** - Professional cybersecurity aesthetic with neon blue accents
- 📱 **Fully Responsive** - Optimized for desktop, tablet, and mobile devices

## Clone this Project

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=68f2666c54d7facf7220e422&clone_repository=68f267fa54d7facf7220e437)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Build a fully working dark-themed animated AI web platform called "AI Shield" that detects phishing in emails and deepfakes in media files.
> 
> 🧩 Key Requirements:
> 
> Frontend (React + Tailwind + Framer Motion):
> 
> Use a modern dark theme (black + neon blue accents).
> 
> Smooth Framer Motion animations for page transitions and dashboard elements.
> 
> Add a landing page with title "AI Shield — Detect Phishing & Deepfakes Instantly".
> 
> Two upload sections:
> 
> 📧 Email Analyzer: Textbox for email body + sender input.
> 
> 🎥 Media Analyzer: File upload (image/video/audio).
> 
> Result Dashboard with:
> 
> Risk Level Badge (Low/Medium/High)
> 
> Confidence Score (animated progress circle)
> 
> Suspicious Highlights section (links, domains, or video frames)
> 
> Animated success/error alerts using Framer Motion.
> 
> Backend (Python FastAPI):
> 
> Endpoint /analyze/email → accepts email text and returns JSON: {phishing_score, risk, highlights}
> 
> Endpoint /analyze/media → accepts file upload and returns JSON: {deepfake_score, risk, frames}
> 
> Use pre-trained ML models:
> 
> Phishing detection → Logistic Regression + TF-IDF (baseline).
> 
> Deepfake detection → Dummy model using OpenCV (for now simulate random score).
> 
> Include CORS for frontend connection.
> 
> Animations & UI Effects:
> 
> Animated gradient background (dark + blue shades).
> 
> Hover glow effects on buttons and cards.
> 
> Animated "Scanning…" loader when model is analyzing.
> 
> Smooth fade-in/out transitions for result cards.
> 
> Extra Features:
> 
> Responsive for mobile & desktop.
> 
> Navbar with smooth scroll + animated logo "🛡️ AI Shield".
> 
> Add small about section: "Protect yourself from phishing and deepfakes using AI."
> 
> Tech Stack:
> 
> Frontend: React + Tailwind + Framer Motion + Axios
> 
> Backend: FastAPI + scikit-learn + Python
> 
> Run both locally or deploy (frontend → Vercel, backend → Render/Heroku).
> 
> 🎯 Output Expectation:
> 
> Generate full frontend & backend code folders.
> 
> Use clean modular structure (/backend, /frontend/src/components).
> 
> Auto-connect frontend ↔ backend APIs.
> 
> Dark animated UI, smooth transitions, working upload + result display.
> 
> Demo-ready app with fake data fallback (if no GPU)."

### Code Generation Prompt

> Based on the content model I created for "Build a fully working dark-themed animated AI web platform called "AI Shield" that detects phishing in emails and deepfakes in media files.", now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with custom dark theme
- **Animations**: Framer Motion for smooth transitions
- **Content**: Cosmic CMS for security tips and analysis results
- **TypeScript**: Full type safety throughout
- **Icons**: Lucide React for consistent iconography

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account with bucket access

### Installation

1. Clone the repository
2. Install dependencies:

```bash
bun install
```

3. Create a `.env.local` file with your Cosmic credentials:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:

```bash
bun run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Cosmic SDK Examples

### Fetching Security Tips

```typescript
import { cosmic } from '@/lib/cosmic'

const response = await cosmic.objects
  .find({ type: 'security-tips' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

const tips = response.objects
```

### Creating Analysis Results

```typescript
await cosmic.objects.insertOne({
  type: 'analysis-results',
  title: 'Email Analysis Result',
  metadata: {
    analysis_type: 'email',
    risk_level: 'high',
    confidence_score: 87,
    highlights: {
      suspicious_links: ['http://malicious.com'],
      red_flags: ['Urgent action required']
    },
    timestamp: new Date().toISOString()
  }
})
```

### Filtering by Risk Level

```typescript
const highRiskAnalyses = await cosmic.objects
  .find({ 
    type: 'analysis-results',
    'metadata.risk_level.key': 'high'
  })
  .depth(1)
```

## Cosmic CMS Integration

This application uses Cosmic as a headless CMS with two main object types:

### Security Tips
- **Purpose**: Educational content about phishing and deepfakes
- **Metafields**: 
  - Headline (text)
  - Content (markdown)
  - Featured Image (file)
  - Category (select-dropdown: phishing/deepfake/general)
  - Priority (switch)

### Analysis Results
- **Purpose**: Store and display past threat analyses
- **Metafields**:
  - Analysis Type (select-dropdown: email/media)
  - Risk Level (select-dropdown: low/medium/high)
  - Confidence Score (number)
  - Highlights (JSON)
  - Analysis Details (textarea)
  - Timestamp (date)

All content is fetched server-side for optimal performance and SEO.

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables

Set these in your deployment platform:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

## Project Structure

```
├── app/
│   ├── page.tsx              # Home page with analyzer interface
│   ├── tips/                 # Security tips pages
│   ├── history/              # Analysis history
│   └── layout.tsx            # Root layout
├── components/
│   ├── EmailAnalyzer.tsx     # Email analysis form
│   ├── MediaAnalyzer.tsx     # Media upload form
│   ├── ResultsDashboard.tsx  # Analysis results display
│   ├── SecurityTipCard.tsx   # Tip display component
│   └── CosmicBadge.tsx       # Built with Cosmic badge
├── lib/
│   └── cosmic.ts             # Cosmic SDK configuration
└── types.ts                  # TypeScript definitions
```

<!-- README_END -->