import * as React from 'react';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';

export default function Layout({
  children,
  nofooter = false,
  noheader = false
}: {
  children: React.ReactNode;
  nofooter?: boolean;
  noheader?: boolean;
}) {
  return (
    <>
      {!noheader && <Header />}
      <main className="w-full">{children}</main>
      {!nofooter && <Footer />}
    </>
  );
}
