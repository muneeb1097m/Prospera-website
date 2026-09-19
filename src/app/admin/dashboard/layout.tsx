import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, LogOut, ShieldCheck } from 'lucide-react';
import { logoutAction } from '../actions';

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#111315] flex flex-col selection:bg-[#FEACC6] selection:text-[#111315]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200/80 sticky top-0 z-50 shadow-xs">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard" className="flex items-center gap-3">
              <Image
                src="/logo2.png"
                alt="Prospera Logo"
                width={160}
                height={40}
                className="object-contain w-auto h-7 sm:h-8"
                priority
              />
              <span className="hidden sm:inline-block px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-gray-100 text-gray-700 border border-gray-200 rounded-md">
                Admin
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-5 text-sm">
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-600 hover:text-gray-900 flex items-center gap-1.5 transition-colors font-medium hover:underline"
            >
              <span>View Site</span>
              <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
            </Link>

            <div className="h-4 w-px bg-gray-200" />

            <div className="hidden md:flex items-center gap-2 text-xs text-gray-700 font-medium bg-gray-50 border border-gray-200/80 px-2.5 py-1 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>{user.email}</span>
            </div>

            <form action={logoutAction}>
              <button
                type="submit"
                className="text-xs font-bold uppercase tracking-wider text-gray-600 hover:text-red-600 flex items-center gap-1.5 transition-colors cursor-pointer py-1.5 px-3 rounded hover:bg-gray-100"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Log Out</span>
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-8">
        {children}
      </main>
    </div>
  );
}
