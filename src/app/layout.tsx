import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Racial Discrimination Terms - Educational Resource',
    template: '%s | Racial Discrimination Terms'
  },
  description: 'Comprehensive educational resource explaining 100 racial discrimination terms, their history, context, and impact. Learn to identify and understand racial discrimination in modern society.',
  keywords: ['racial discrimination', 'anti-racism', 'education', 'social justice', 'diversity', 'inclusion'],
  authors: [{ name: 'Racial Education Team' }],
  creator: 'Racial Education Team',
  publisher: 'Racial Education Team',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Racial Discrimination Terms - Educational Resource',
    description: 'Learn about racial discrimination terms, their history, and impact through our comprehensive educational resource.',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000',
    siteName: 'Racial Discrimination Terms',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Racial Discrimination Terms Educational Resource',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Racial Discrimination Terms - Educational Resource',
    description: 'Learn about racial discrimination terms, their history, and impact through our comprehensive educational resource.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_VERIFICATION_CODE || '',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#f27522" />
      </head>
      <body className={`${inter.className} antialiased bg-neutral-50 text-neutral-900`}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
} 