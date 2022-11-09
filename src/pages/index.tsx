import { useEffect, useRef } from 'react';
import classnames from 'classnames';
import Layout from 'layout/Layout';
import Seo from 'Seo';
import styles from '../styles/Home.module.scss';
import { useRafFn } from '@/hooks/useRafFn';
import HomeLoading from '@/components/loading';
import useLoaded from 'hooks/useLoaded';
import { Card, Banner } from 'content/index';

export default function Home() {
  const isLoaded = useLoaded();

  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  return (
    <Layout>
      <Seo templateTitle="AwA" />
      <Banner />
      <HomeLoading isLoaded={isLoaded} />
      <section>
        <div className={styles.container}>
          <div className="flex flex-wrap justify-center ">
            {data.map((e, index) => (
              <Card key={index} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
