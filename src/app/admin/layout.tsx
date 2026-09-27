'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Grid3X3,
  Settings,
  LogOut,
  Menu,
  X,
  Crown,
} from 'lucide-react';
import { createClient } from '@/lib/supabase';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/orders', label: 'Orders', icon: ShoppingBag },
  { href: '/admin/categories', label: 'Categories', icon: Grid3X3 },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user && pathname !== '/admin/login') {
          router.replace('/admin/login');
          return;
        }
      } catch {
        // Supabase not configured - allow access in dev
      }
      setAuthChecked(true);
    };
    checkAuth();
  }, [pathname, router]);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      router.push('/admin/login');
    } catch {
      router.push('/admin/login');
    } finally {
      setLoggingOut(false);
    }
  };

  if (!authChecked && pathname !== '/admin/login') {
    return (
      <div className="min-h-screen bg-[#160B1E] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
          <p className="text-[#FAF9F6]/50 text-sm">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin';
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-[#0D0612] flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-[250px] bg-[#160B1E] border-r border-[#D4AF37]/20 z-30 transform transition-transform duration-300 flex flex-col ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand */}
        <div className="flex items-center gap-3 px-6 py-6 border-b border-[#D4AF37]/20">
          <div className="w-9 h-9 rounded-full border border-[#D4AF37] flex items-center justify-center shrink-0">
            <Crown size={16} className="text-[#D4AF37]" />
          </div>
          <div>
            <p className="text-[#FAF9F6] font-semibold text-sm leading-tight">
              Deepu&apos;s Collection
            </p>
            <p className="text-[#D4AF37] text-xs">Admin Panel</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 group ${
                isActive(href)
                  ? 'bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30'
                  : 'text-[#FAF9F6]/60 hover:bg-white/5 hover:text-[#FAF9F6]'
              }`}
            >
              <Icon
                size={18}
                className={`shrink-0 ${isActive(href) ? 'text-[#D4AF37]' : 'text-[#FAF9F6]/40 group-hover:text-[#FAF9F6]/70'}`}
              />
              {label}
              {isActive(href) && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              )}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-[#D4AF37]/20">
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium text-[#FAF9F6]/50 hover:text-red-400 hover:bg-red-900/20 transition-all duration-200 disabled:opacity-50"
          >
            <LogOut size={18} className="shrink-0" />
            {loggingOut ? 'Signing out...' : 'Sign Out'}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:ml-[250px] min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-10 bg-[#160B1E]/90 backdrop-blur-md border-b border-[#D4AF37]/20 px-4 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg text-[#FAF9F6]/60 hover:text-[#FAF9F6] hover:bg-white/5 transition-colors"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <h1 className="text-[#FAF9F6] font-semibold text-lg">Admin Panel</h1>
          </div>

          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-[#FAF9F6]/60 hover:text-red-400 hover:bg-red-900/20 transition-all duration-200 disabled:opacity-50"
          >
            <LogOut size={16} />
            {loggingOut ? 'Signing out...' : 'Logout'}
          </button>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
