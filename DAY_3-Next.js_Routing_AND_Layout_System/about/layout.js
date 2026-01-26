'use client';

import Link from 'next/link';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950">
      {/* Navigation */}
      <nav className="bg-[#212529] dark:bg-gray-900 text-white py-4 px-6 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">
            Start Bootstrap
          </Link>
          <div className="flex gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">Home</Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="primary" size="sm">Dashboard</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="primary" className="mb-4">About Us</Badge>
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            About Start Bootstrap
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            A modern admin dashboard template built with cutting-edge technologies 
            and best practices for web development.
          </p>
        </div>

        {/* Mission Section */}
        <div className="mb-12">
          <Card variant="primary" padding="lg">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              We aim to provide developers with high-quality, free, and open-source 
              admin dashboard templates that accelerate development and deliver 
              exceptional user experiences. Our templates are built with modern 
              frameworks and follow industry best practices.
            </p>
          </Card>
        </div>

        {/* Features Grid */}
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card title="⚛️ Next.js 14" variant="elevated">
            <p className="text-gray-600 dark:text-gray-300">
              Built with the latest Next.js features including App Router, 
              Server Components, and optimized performance.
            </p>
          </Card>

          <Card title="🎨 Tailwind CSS" variant="elevated">
            <p className="text-gray-600 dark:text-gray-300">
              Utility-first CSS framework for rapid UI development with 
              responsive design out of the box.
            </p>
          </Card>

          <Card title="🧩 Reusable Components" variant="elevated">
            <p className="text-gray-600 dark:text-gray-300">
              Atomic design components (Button, Input, Card, Modal, Badge) 
              ready to use and customize.
            </p>
          </Card>

          <Card title="🌙 Dark Mode" variant="elevated">
            <p className="text-gray-600 dark:text-gray-300">
              Built-in dark mode with localStorage persistence and system 
              preference detection.
            </p>
          </Card>

          <Card title="📱 Responsive" variant="elevated">
            <p className="text-gray-600 dark:text-gray-300">
              Fully responsive design that works beautifully on desktop, 
              tablet, and mobile devices.
            </p>
          </Card>

          <Card title="🚀 Production Ready" variant="elevated">
            <p className="text-gray-600 dark:text-gray-300">
              Optimized for performance, SEO-friendly, and ready to deploy 
              to production.
            </p>
          </Card>
        </div>

        {/* Tech Stack */}
        <div className="mb-12">
          <Card variant="success" padding="lg">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Technology Stack
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <Badge variant="primary" size="lg">Next.js 14</Badge>
              </div>
              <div className="text-center">
                <Badge variant="info" size="lg">React 18</Badge>
              </div>
              <div className="text-center">
                <Badge variant="success" size="lg">Tailwind CSS</Badge>
              </div>
              <div className="text-center">
                <Badge variant="warning" size="lg">JavaScript</Badge>
              </div>
            </div>
          </Card>
        </div>

        {/* Team Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Component Library
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card title="UI Components" variant="primary">
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-center gap-2">
                  <Badge variant="primary" size="sm">✓</Badge> Button Component
                </li>
                <li className="flex items-center gap-2">
                  <Badge variant="primary" size="sm">✓</Badge> Input Component
                </li>
                <li className="flex items-center gap-2">
                  <Badge variant="primary" size="sm">✓</Badge> Card Component
                </li>
                <li className="flex items-center gap-2">
                  <Badge variant="primary" size="sm">✓</Badge> Badge Component
                </li>
                <li className="flex items-center gap-2">
                  <Badge variant="primary" size="sm">✓</Badge> Modal Component
                </li>
              </ul>
            </Card>

            <Card title="Layout Components" variant="success">
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-center gap-2">
                  <Badge variant="success" size="sm">✓</Badge> Navbar Component
                </li>
                <li className="flex items-center gap-2">
                  <Badge variant="success" size="sm">✓</Badge> Sidebar Component
                </li>
                <li className="flex items-center gap-2">
                  <Badge variant="success" size="sm">✓</Badge> Nested Layouts
                </li>
                <li className="flex items-center gap-2">
                  <Badge variant="success" size="sm">✓</Badge> Routing System
                </li>
                <li className="flex items-center gap-2">
                  <Badge variant="success" size="sm">✓</Badge> Dark Mode Toggle
                </li>
              </ul>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 rounded-lg p-12 text-white">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Start using our dashboard template today and accelerate your development.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/dashboard">
              <Button variant="secondary" size="lg">
                Explore Dashboard
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" size="lg">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white py-8 mt-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2024 Start Bootstrap. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}