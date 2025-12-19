/**
 * PATH: src/app/(public)/layout.tsx
 * PURPOSE: Layout for public pages with navigation and footer
 */

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navigation />
      <main>{children}</main>
      <Footer />
    </>
  );
}

