import type { Metadata } from 'next'
import '../styles/globals.css'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: 'Subtitle AI - Convert Media to Subtitles',
  description: 'Convert your audio and video files to subtitles using AI-powered Whisper technology',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  )
}
