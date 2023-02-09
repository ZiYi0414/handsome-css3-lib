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
          <div className={styles.home__title}>
            <h2>
              Amazingly handsome Open-Source UI components made with HTML and
              CSS
            </h2>
            <p>
              Thank you to everyone who contributes to the cause and art of open
              source :)
            </p>
            <div className="flex justify-evenly text-center my-20">
              <div className="text-center">
                <div>
                  <span className="iconfont icon-component1 mr-2"></span>
                  <span>99+</span>
                </div>
                <i>已收集99+的超帅UI组件</i>
              </div>
              <div>
                <div>
                  <span className="iconfont icon-balance mr-2"></span>
                  <span>MIT</span>
                </div>
                <i>完全开源授权 MIT License</i>
              </div>
              <div>
                <div>
                  <span className="iconfont icon-style mr-2"></span>
                  <span>6</span>
                </div>
                <i>6+种类型UI组件</i>
              </div>
            </div>
          </div>
          {components_data.map((component, index) => (
            <section key={component.index} className="mb-16">
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
