import Link from "next/link";
import { ArrowRight, Brain, Sparkles, Zap } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <header className="mb-16 text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <Brain className="h-12 w-12 text-purple-600" />
            <h1 className="text-4xl font-bold text-gray-900">Smart Note AI</h1>
          </div>
          <p className="text-xl text-gray-600">
            Transform your quick ideas into structured, actionable content with
            AI
          </p>
        </header>

        {/* Hero Section */}
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-5xl font-bold text-gray-900">
            Your Ideas, Amplified by AI
          </h2>
          <p className="mb-8 text-xl text-gray-600">
            Capture fleeting thoughts and let AI expand them into comprehensive,
            well-structured notes
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-purple-700"
            >
              Get Started
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/auth/login"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-purple-600 px-8 py-4 text-lg font-semibold text-purple-600 transition-all hover:bg-purple-50"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="mb-16 grid gap-8 md:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
              <Zap className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900">
              Quick Capture
            </h3>
            <p className="text-gray-600">
              Jot down ideas in seconds with our minimal, distraction-free
              interface
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
              <Sparkles className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900">
              AI Expansion
            </h3>
            <p className="text-gray-600">
              Watch your brief notes transform into detailed, structured content
              in real-time
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
              <Brain className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900">
              Collaborative Refinement
            </h3>
            <p className="text-gray-600">
              Iterate with AI to perfect your notes through natural conversation
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 p-12 text-center text-white">
          <h3 className="mb-4 text-3xl font-bold">
            Ready to amplify your ideas?
          </h3>
          <p className="mb-6 text-lg opacity-90">
            Start capturing and expanding your thoughts today
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-3 font-semibold text-purple-600 transition-all hover:bg-gray-100"
          >
            Start Taking Notes
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
