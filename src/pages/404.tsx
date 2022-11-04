import * as React from 'react';

import Layout from '@/components/layout/Layout';
import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <Layout>
      <main>
        <section className="flex justify-center items-center flex-col h-[70vh]">
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          <div className="typing-demo">There's nothing here.</div>
          <div className="title-404">你在这里想找到什么呢？宝贝</div>
          <Link href={'/'} className="text-[#d23669]">
            Go Back ( )
          </Link>
        </section>
      </main>
    </Layout>
  );
}
