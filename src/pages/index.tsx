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

import { components_data, HandsomeComponent } from '../common/exports_data';
import { GetStaticProps, InferGetStaticPropsType } from 'next/types';
import { getAllFilesFrontmatter } from 'lib/mdx';

interface IProps {
  components_data: HandsomeComponent[];
}
export default function Home({ components_data }: IProps) {
  const isLoaded = useLoaded();

  return (
    <Layout>
      <Seo templateTitle="AwA" />
      <Banner />
      <HomeLoading isLoaded={isLoaded} />
      <div className={styles.home__wrap}>
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
                  (e, index) => index < 4 && <Card post={e} key={index} />
                )}
              </div>
              <Link
                href={component.index}
                className={styles.posts__see__all__link}
              >
                查看全部
              </Link>
            </section>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  components_data.map(async e => {
    e.children = await getAllFilesFrontmatter(e.index);
  });
  return {
    props: { components_data }
  };
};
