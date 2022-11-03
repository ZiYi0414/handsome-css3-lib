import * as React from 'react';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="mx-8 mb:mx-4">{children}</div>
    </>
  );
}
