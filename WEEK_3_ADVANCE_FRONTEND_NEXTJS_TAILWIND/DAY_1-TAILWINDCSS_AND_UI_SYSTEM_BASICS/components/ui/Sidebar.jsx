'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { icon: '📊', label: 'Dashboard', href: '/dashboard', id: 'dashboard' },
    { icon: '👥', label: 'Users', href: '/dashboard/users', id: 'users' },
    { icon: '👤', label: 'Profile', href: '/dashboard/profile', id: 'profile' },
  ];

  const interfaceItems = [
    { icon: '📄', label: 'Layouts', href: '/interface/layouts', id: 'layouts' },
    { icon: '📑', label: 'Pages', href: '/interface/pages', id: 'pages' },
  ];

  const addons = [
    { icon: '📊', label: 'Charts', href: '/dashboard#charts', id: 'charts' },
    { icon: '📋', label: 'Tables', href: '/dashboard#tables', id: 'tables' },
  ];

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-slate-800 bg-slate-900">
      {/* Logo */}
      <div className="border-b border-slate-800 p-6">
        <Link href="/" className="text-xl font-bold text-white">
          Start Bootstrap
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <div className="mb-6">
          <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
            Core
          </h3>
          <div className="space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                  pathname === item.href
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
            Interface
          </h3>
          <div className="space-y-1">
            {interfaceItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                  pathname === item.href
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
            Addons
          </h3>
          <div className="space-y-1">
            {addons.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Footer */}
      <div className="border-t border-slate-800 p-4">
        <div className="text-xs text-slate-500">
          Logged in as:<br />
          <span className="font-medium text-white">Start Bootstrap</span>
        </div>
      </div>
    </aside>
  );
}
// Sidebar: TailwindCSS responsive sidebar component with navigation links and spacing system

// Sidebar: TailwindCSS responsive sidebar component with navigation links and spacing system
