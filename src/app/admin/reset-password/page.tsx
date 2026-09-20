'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Lock, CheckCircle2, AlertCircle, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { resetPasswordAction } from '../actions';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('password', password);
    formData.append('confirmPassword', confirmPassword);

    const res = await resetPasswordAction(formData);
    setLoading(false);

    if (!res.success) {
      setError(res.error || 'Failed to update password');
    } else {
      setSuccess(true);
      setTimeout(() => {
        router.push('/admin/dashboard');
      }, 2000);
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
            Set New Password
          </h1>
          <p className="text-xs font-sans text-gray-500 mt-2 font-medium">
            Enter your new secure password below
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

          {success ? (
            <div className="text-center py-4 space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <p className="text-sm text-[#111315] leading-relaxed font-medium">
                Password updated successfully! Redirecting to dashboard...
              </p>
              <div className="pt-2">
                <Link
                  href="/admin/dashboard"
                  className="text-xs text-[#111315] hover:underline font-bold uppercase tracking-wider inline-flex items-center gap-1"
                >
                  <span>Go to Dashboard now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#111315] mb-2">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimum 6 characters"
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

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#111315] mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter password"
                    className="w-full bg-[#FAF7F2] border border-[#E8E4DF] rounded-xl pl-10 pr-11 py-3 text-sm text-[#111315] placeholder-gray-400 focus:outline-none focus:border-[#111315] transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-[#111315] transition-colors cursor-pointer rounded-md focus:outline-none"
                    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                  >
                    {showConfirmPassword ? (
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
                {loading ? 'Updating password...' : 'Save New Password'}
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
