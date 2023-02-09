import { useEffect, useRef } from 'react';
import classnames from 'classnames';
import Layout from 'layout/Layout';
import Seo from 'Seo';
import styles from '../styles/Type.module.scss';
import { useRafFn } from '@/hooks/useRafFn';
import HomeLoading from '@/components/loading';
import useLoaded from 'hooks/useLoaded';
import { Card, Banner } from 'content/index';
import Link from 'next/link';

import { components_data, HandsomeComponent } from '../common/exports_data';
import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType
} from 'next/types';
import { getAllFilesFrontmatter, getFiles } from 'lib/mdx';

import { ContentType, HSComponentProps } from 'types/component';
import SideMenu from 'layout/SideMenu';

interface IProps {
  posts: HSComponentProps[];
  type: ContentType;
}
export default function Type({ posts, type }: IProps) {
  const isLoaded = useLoaded();

  return (
    <Layout>
      <Seo templateTitle="AwA" />
      <HomeLoading isLoaded={isLoaded} />
      <div className={styles.type__wrap}>
        <SideMenu activeKey={type} />
        <div className={styles.container}>
          <div className={styles.posts__prereview__heading}>
            {type.toUpperCase()}
          </div>
          <div>
            Open-Source <span className="text-[#d23669]">{type}</span> made with
            HTML and CSS
          </div>
          <section>
            <div className={styles.posts__prereview__content}>
              {posts.map((e, index) => (
                <Card post={e} key={index} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: components_data.map(p => ({
      params: {
        type: p.index
      }
    })),
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const posts = await getAllFilesFrontmatter(params?.type as ContentType);
  return {
    props: { posts, type: params?.type }
  };
};
