import Layout from 'layout/Layout';
import Seo from 'Seo';
import MDXComponents from '@/components/content/mdx/MDXComponents';
import styles from '@/styles/Slug.module.scss';
import useLoaded from 'hooks/useLoaded';
import { getMDXComponent } from 'mdx-bundler/client';
import { GetStaticPaths, GetStaticProps } from 'next/types';
import { getFileBySlug, getFiles } from 'lib/mdx';
import { ContentType, SlugComponentProps } from 'types/component';
import SideMenu from 'layout/SideMenu';
import { components_data } from 'common/exports_data';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';
import classNames from 'classnames';
import styled from 'styled-components';
import { useRouter } from 'next/router';

interface IProps {
  post: SlugComponentProps;
  type: ContentType;
}
interface DivProps {
  css: string;
}
const DivStyled = styled.div<DivProps>`
  ${props => props.css}
`;
export default function Slug({ post, type }: IProps) {
  const isLoaded = useLoaded();
  const router = useRouter();
  const Component = React.useMemo(
    () => getMDXComponent(post.code),
    [post.code]
  );
  return (
    <Layout>
      <Seo templateTitle="AwA" />
      <div
        className={classNames(isLoaded && 'fade-in-start', styles.slug__wrap)}
      >
        <SideMenu activeKey={type} data-fade="1" />
        <div className="w-full pt-12" data-fade="1">
          <div className="pl-5">
            <button
              className={classNames(styles.loadmore__btn)}
              onClick={() => router.back()}
            >
              ← cd ..
            </button>
          </div>
          <div className={styles.container}>
            <article
              className={classNames(
                post?.theme === 'dark' && styles.card__dark
              )}
            >
              <div className={styles.content__title}>
                {post.made_by} @ {post.title}
              </div>
              <div className={classNames(styles.card__wrap)}>
                <DivStyled css={post.css} style={{ zIndex: 9999 }}>
                  <div
                    id={post.title}
                    className={classNames(
                      post.title,
                      'flex items-center w-full h-full justify-center'
                    )}
                    dangerouslySetInnerHTML={{ __html: post.html }}
                  ></div>
                </DivStyled>
              </div>
            </article>
            <Component
              components={
                {
                  ...MDXComponents
                } as any
              }
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths: (
    | string
    | {
        params: ParsedUrlQuery;
        locale?: string | undefined;
      }
  )[] = [];
  components_data.forEach(p => {
    const fileNames = getFiles(p.index);
    fileNames.forEach(e => {
      paths.push({
        params: {
          type: p.index,
          slug: e.replace('.mdx', '')
        }
      });
    });
  });

  return {
    paths: paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await getFileBySlug(
    params?.type as ContentType,
    params?.slug as string
  );
  return {
    props: { post, type: params?.type }
  };
};
