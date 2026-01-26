'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 border-b border-slate-800 bg-slate-900/95 backdrop-blur-sm">
      <div className="flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Mobile Menu Button & Logo */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white lg:hidden"
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
          
          <Link href="/" className="text-xl font-bold text-white lg:hidden">
            Start Bootstrap
          </Link>
        </div>

        {/* Search Bar - Hidden on mobile */}
        <div className="hidden flex-1 max-w-md px-4 sm:block">
          <input
            type="search"
            placeholder="Search for..."
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* User Menu */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white sm:hidden">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          
          <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 sm:h-10 sm:w-10"></div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-slate-800 bg-slate-900 lg:hidden">
          <div className="space-y-1 px-4 py-3">
            <Link
              href="/dashboard"
              className="block rounded-lg px-3 py-2 text-white hover:bg-slate-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              📊 Dashboard
            </Link>
            <Link
              href="/about"
              className="block rounded-lg px-3 py-2 text-slate-400 hover:bg-slate-800 hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              📄 Layouts
            </Link>
            <Link
              href="/about"
              className="block rounded-lg px-3 py-2 text-slate-400 hover:bg-slate-800 hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              📄 Pages
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}