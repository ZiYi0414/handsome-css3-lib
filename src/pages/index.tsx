import { useEffect, useRef } from 'react';
import classnames from 'classnames';
import Layout from 'layout/Layout';
import Seo from 'Seo';
import styles from '../styles/Home.module.scss';
import { useRafFn } from '@/hooks/useRafFn';
import HomeLoading from '@/components/loading';
import useLoaded from 'hooks/useLoaded';
import { Card, Banner } from 'content/index';
import Link from 'next/link';

import { components_data } from '../common/exports_data';

export default function Home() {
  const isLoaded = useLoaded();

  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  return (
    <Layout>
      <Seo templateTitle="AwA" />
      <Banner />
      <HomeLoading isLoaded={isLoaded} />
      <div className={styles.container}>
        {components_data.map((component, index) => (
          <section key={component.index}>
            <Link
              className={styles.posts__prereview__heading}
              href={component.index}
            >
              {component.type}
            </Link>
            <div className={styles.posts__prereview__content}>
              {component.children.map(
                (e, index) => index < 4 && <Card key={index} />
              )}
            </div>
            <Link href="" className={styles.posts__see__all__link}>
              查看全部
            </Link>
          </section>
        ))}
      </div>
    </Layout>
  );
}
