import { getAllSiteContent } from '@/lib/content/getContent';
import ContentDashboardClient from './ContentDashboardClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard | Prospera Group Content Manager',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminDashboardPage() {
  const content = await getAllSiteContent();

  return <ContentDashboardClient initialContent={content} />;
}
