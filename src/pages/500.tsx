import * as React from 'react';

import Layout from '@/components/layout/Layout';
import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <Layout>
      <main>
        <section className="flex justify-center items-center flex-col h-[70vh]">
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          <div className="typing-demo">The server is tired....</div>
          <div className="title-404">服务器好像寄了...</div>
          <Link href={'/'} className="text-[#d23669]">
            Lets Go ( )
          </Link>
        </section>
      </main>
    </Layout>
  );
}
