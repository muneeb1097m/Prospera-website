'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Lock, Mail, ArrowRight, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { loginAction } from '../actions';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    const res = await loginAction(formData);

    if (!res.success) {
      setError(res.error || 'Failed to log in');
      setLoading(false);
    } else {
      router.push('/admin/dashboard');
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#111315] flex items-center justify-center p-6 selection:bg-[#FEACC6] selection:text-[#111315]">
      <div className="w-full max-w-md">
        
        {/* Branding */}
        <div className="text-center mb-8">
          <div className="inline-block mb-5">
            <Image
              src="/logo2.png"
              alt="Prospera Logo"
              width={200}
              height={50}
              className="object-contain mx-auto w-auto h-10"
              priority
            />
          </div>
          <h1 className="text-2xl font-serif text-[#111315] tracking-tight">
            Admin Content Portal
          </h1>
          <p className="text-xs font-sans text-gray-500 mt-2 uppercase tracking-widest font-medium">
            Authorized Personnel Only
          </p>
        </div>

        {/* Card */}
        <div className="bg-white border border-[#E8E4DF] rounded-[20px] p-8 md:p-10 shadow-xl shadow-black/5">
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-3">
              <AlertCircle className="w-5 h-5 shrink-0 text-red-500 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#111315] mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@prosperagroup.us"
                  className="w-full bg-[#FAF7F2] border border-[#E8E4DF] rounded-xl pl-10 pr-4 py-3 text-sm text-[#111315] placeholder-gray-400 focus:outline-none focus:border-[#111315] transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#111315]">
                  Password
                </label>
                <Link
                  href="/admin/forgot-password"
                  className="text-xs text-gray-600 hover:text-[#111315] font-medium underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-[#FAF7F2] border border-[#E8E4DF] rounded-xl pl-10 pr-11 py-3 text-sm text-[#111315] placeholder-gray-400 focus:outline-none focus:border-[#111315] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-[#111315] transition-colors cursor-pointer rounded-md focus:outline-none"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#111315] hover:bg-[#23272b] text-white font-bold text-xs uppercase tracking-widest py-3.5 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-3 shadow-md shadow-black/10"
            >
              {loading ? (
                <span>Signing in...</span>
              ) : (
                <>
                  <span>Access Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Back to site */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-xs text-gray-500 hover:text-[#111315] font-medium transition-colors"
          >
            ← Return to main website
          </Link>
        </div>

      </div>
    </div>
  );
}
