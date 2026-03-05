import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <nav className="fixed top-0 w-full bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">Subtitle AI</div>
          <div className="space-x-4">
            <Link href="/login" className="text-gray-600 hover:text-gray-900">
              Login
            </Link>
            <Link href="/signup" className="btn-primary">
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      <div className="pt-20 max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Convert Audio & Video to Subtitles with AI
        </h1>
        <p className="text-xl text-gray-600 mb-12">
          Upload your media files and get professional subtitles in SRT, VTT, or STL format powered by Whisper AI
        </p>

        <div className="space-x-4 mb-20">
          <Link href="/signup" className="btn-primary text-lg">
            Get Started
          </Link>
          <Link href="#features" className="btn-secondary text-lg">
            Learn More
          </Link>
        </div>

        <div id="features" className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <div className="card p-8">
            <div className="text-4xl mb-4">🎥</div>
            <h3 className="text-xl font-bold mb-4">Easy Upload</h3>
            <p className="text-gray-600">
              Upload your video or audio files in any format
            </p>
          </div>

          <div className="card p-8">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-bold mb-4">AI Powered</h3>
            <p className="text-gray-600">
              Powered by OpenAI's Whisper for accurate transcriptions
            </p>
          </div>

          <div className="card p-8">
            <div className="text-4xl mb-4">📝</div>
            <h3 className="text-xl font-bold mb-4">Multiple Formats</h3>
            <p className="text-gray-600">
              Export as SRT, VTT, or STL subtitles
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
