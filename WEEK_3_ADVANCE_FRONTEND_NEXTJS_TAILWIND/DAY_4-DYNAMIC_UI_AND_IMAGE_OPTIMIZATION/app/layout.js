import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata = {
  metadataBase: new URL('https://yourdomain.com'),
  title: {
    default: 'Start Bootstrap - Modern Admin Dashboard',
    template: '%s | Start Bootstrap',
  },
  description: 'A powerful, modern admin dashboard built with Next.js, Tailwind CSS, and reusable components. Perfect for your next project.',
  keywords: ['admin dashboard', 'nextjs', 'tailwind css', 'bootstrap', 'modern ui', 'react dashboard'],
  authors: [{ name: 'Start Bootstrap', url: 'https://startbootstrap.com' }],
  creator: 'Start Bootstrap',
  publisher: 'Start Bootstrap',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://yourdomain.com',
    siteName: 'Start Bootstrap',
    title: 'Start Bootstrap - Modern Admin Dashboard',
    description: 'A powerful, modern admin dashboard built with Next.js, Tailwind CSS, and reusable components.',
    images: [
      {
        url: 'https://assets.startbootstrap.com/img/meta/products/twitter/twitter-image-sb-admin.png',
        width: 1200,
        height: 630,
        alt: 'Start Bootstrap Dashboard',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Start Bootstrap - Modern Admin Dashboard',
    description: 'A powerful, modern admin dashboard built with Next.js, Tailwind CSS, and reusable components.',
    images: ['https://assets.startbootstrap.com/img/meta/products/twitter/twitter-image-sb-admin.png'],
    creator: '@startbootstrap',
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
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
// Root layout: Next.js layout with SEO metadata config font optimization and TailwindCSS globals

// Root layout: Next.js layout with SEO metadata config font optimization and TailwindCSS globals
