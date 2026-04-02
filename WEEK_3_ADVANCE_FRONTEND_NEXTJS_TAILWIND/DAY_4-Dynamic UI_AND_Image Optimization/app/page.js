import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Start Bootstrap - Modern Admin Dashboard',
  description:
    'A powerful, modern admin dashboard built with Next.js, Tailwind CSS, and reusable components. Perfect for your next project.',
  keywords: 'admin dashboard, nextjs, tailwind css, bootstrap, modern ui',
  authors: [{ name: 'Start Bootstrap' }],
  openGraph: {
    title: 'Start Bootstrap - Modern Admin Dashboard',
    description:
      'A powerful, modern admin dashboard built with Next.js, Tailwind CSS, and reusable components.',
    type: 'website',
    images: [
      'https://assets.startbootstrap.com/img/meta/products/twitter/twitter-image-sb-admin.png',
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Start Bootstrap - Modern Admin Dashboard',
    description:
      'A powerful, modern admin dashboard built with Next.js, Tailwind CSS, and reusable components.',
    images: [
      'https://assets.startbootstrap.com/img/meta/products/twitter/twitter-image-sb-admin.png',
    ],
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />

        <div className="relative mx-auto max-w-7xl">
          <div className="text-center">
            <div className="mb-6 inline-block">
              <span className="rounded-full bg-blue-500/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-blue-400 ring-1 ring-blue-500/20 sm:text-sm">
                Start Bootstrap Admin
              </span>
            </div>

            <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Start{' '}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Bootstrap
              </span>
            </h1>

            <p className="mx-auto mb-10 max-w-2xl text-base text-slate-300 sm:text-lg md:text-xl">
              A powerful, modern admin dashboard built with Next.js, Tailwind
              CSS, and reusable components. Perfect for your next project.
            </p>

            {/* Integrated Buttons */}
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/dashboard"
                className="group w-full rounded-lg bg-blue-600 px-8 py-3.5 text-center font-semibold text-white shadow-lg transition-all hover:bg-blue-700 hover:shadow-xl sm:w-auto"
              >
                View Dashboard
                <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>

              <Link
                href="/login"
                className="w-full rounded-lg border border-slate-600 bg-slate-800/50 px-8 py-3.5 text-center font-semibold text-white backdrop-blur-sm transition-all hover:bg-slate-700/50 sm:w-auto"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            <div className="group rounded-2xl border border-blue-500/20 bg-slate-800/50 p-8 backdrop-blur-sm transition-all hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/10">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10 text-2xl">
                📊
              </div>
              <h3 className="mb-3 text-xl font-bold text-white">Dashboard</h3>
              <p className="mb-4 text-slate-400">
                Powerful analytics and data visualization tools to track your
                metrics in real-time.
              </p>
              <span className="inline-flex items-center text-sm font-medium text-blue-400">
                Explore →
              </span>
            </div>

            <div className="group rounded-2xl border border-green-500/20 bg-slate-800/50 p-8 backdrop-blur-sm transition-all hover:border-green-500/40 hover:shadow-xl hover:shadow-green-500/10">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/10 text-2xl">
                🎨
              </div>
              <h3 className="mb-3 text-xl font-bold text-white">Components</h3>
              <p className="mb-4 text-slate-400">
                Reusable UI components built with atomic design principles for
                consistency.
              </p>
              <span className="inline-block rounded-full bg-green-500/20 px-3 py-1 text-xs font-medium uppercase text-green-400">
                Ready to Use
              </span>
            </div>

            <div className="group rounded-2xl border border-yellow-500/20 bg-slate-800/50 p-8 backdrop-blur-sm transition-all hover:border-yellow-500/40 hover:shadow-xl hover:shadow-yellow-500/10">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-500/10 text-2xl">
                🌙
              </div>
              <h3 className="mb-3 text-xl font-bold text-white">Dark Mode</h3>
              <p className="mb-4 text-slate-400">
                Built-in dark mode support with smooth transitions and
                localStorage persistence.
              </p>
              <span className="inline-block rounded-full bg-yellow-500/20 px-3 py-1 text-xs font-medium uppercase text-yellow-400">
                Active
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 text-center text-slate-400">
            © 2024 Start Bootstrap. Built with Next.js & Tailwind CSS.
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link
              href="/about"
              className="text-slate-400 transition-colors hover:text-white"
            >
              About
            </Link>
            <Link
              href="/dashboard"
              className="text-slate-400 transition-colors hover:text-white"
            >
              Dashboard
            </Link>
            <Link
              href="/about/profile"
              className="text-slate-400 transition-colors hover:text-white"
            >
              Profile
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Landing page: responsive SaaS landing page with hero features testimonials and footer using next/image
