import type { Metadata } from 'next';
import siteMetadata from '@/app/metadata.json';
import AdminPageContent from '@/components/admin-page-content';

export const metadata: Metadata = siteMetadata['/admin'];

export default function AdminPage() {
  return <AdminPageContent />;
}
