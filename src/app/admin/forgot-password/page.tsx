'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import { forgotPasswordAction } from '../actions';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<{ success?: boolean; message?: string; error?: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    setLoading(true);

    const formData = new FormData();
    formData.append('email', email);

    const res = await forgotPasswordAction(formData);
    setLoading(false);

    if (!res.success) {
      setStatus({ error: res.error || 'Failed to send recovery email' });
    } else {
      setStatus({ success: true, message: res.message });
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
            Reset Your Password
          </h1>
          <p className="text-xs font-sans text-gray-500 mt-2 font-medium">
            Enter your admin email to receive a recovery link
          </p>
        </div>

        {/* Card */}
        <div className="bg-white border border-[#E8E4DF] rounded-[20px] p-8 md:p-10 shadow-xl shadow-black/5">
          {status?.error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-3">
              <AlertCircle className="w-5 h-5 shrink-0 text-red-500 mt-0.5" />
              <span>{status.error}</span>
            </div>
          )}

          {status?.success ? (
            <div className="text-center py-4 space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <p className="text-sm text-[#111315] leading-relaxed font-medium">
                {status.message}
              </p>
              <div className="pt-2">
                <Link
                  href="/admin/login"
                  className="text-xs text-[#111315] hover:underline font-bold uppercase tracking-wider"
                >
                  Return to login
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#111315] mb-2">
                  Admin Email
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

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#111315] hover:bg-[#23272b] text-white font-bold text-xs uppercase tracking-widest py-3.5 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-3 shadow-md shadow-black/10"
              >
                {loading ? 'Sending link...' : 'Send Password Reset Link'}
              </button>
            </form>
          )}
        </div>

        {/* Back to login */}
        <div className="text-center mt-6">
          <Link
            href="/admin/login"
            className="text-xs text-gray-500 hover:text-[#111315] font-medium transition-colors inline-flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to login</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
