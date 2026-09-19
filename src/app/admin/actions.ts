'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function loginAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { success: false, error: 'Email and password are required' };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function forgotPasswordAction(formData: FormData) {
  const email = formData.get('email') as string;

  if (!email) {
    return { success: false, error: 'Email is required' };
  }

  const supabase = await createClient();
  
  // Determine site origin for redirect URL
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${siteUrl}/admin/reset-password`,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return {
    success: true,
    message: 'If that email is registered, a password reset link has been sent to your inbox.',
  };
}

export async function resetPasswordAction(formData: FormData) {
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;

  if (!password || password.length < 6) {
    return { success: false, error: 'Password must be at least 6 characters long' };
  }

  if (password !== confirmPassword) {
    return { success: false, error: 'Passwords do not match' };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({
    password,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function logoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/admin/login');
}

export async function saveSectionContentAction(
  sectionId: string,
  sectionCategory: string,
  contentData: Record<string, unknown>
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: 'Unauthorized. Please log in first.' };
  }

  const { error } = await supabase.from('site_content').upsert(
    {
      id: sectionId,
      section: sectionCategory,
      data: contentData,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'id' }
  );

  if (error) {
    return { success: false, error: error.message };
  }

  // Revalidate both public site and dashboard
  revalidatePath('/', 'layout');
  revalidatePath('/admin/dashboard');

  return { success: true };
}
