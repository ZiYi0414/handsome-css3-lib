import Layout from 'layout/Layout';
import Seo from 'Seo';
import MDXComponents from '@/components/content/mdx/MDXComponents';
import styles from '@/styles/Slug.module.scss';
import useLoaded from 'hooks/useLoaded';
import { getMDXComponent } from 'mdx-bundler/client';
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next/types';
import { getFileBySlug, getFiles } from 'lib/mdx';
import {
  ContentType,
  HSComponentProps,
  SlugComponentProps
} from 'types/component';
import SideMenu from 'layout/SideMenu';
import { components_data } from 'common/exports_data';
import { ParsedUrlQuery } from 'querystring';
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { getComponentDetailFormGithub } from 'lib/api-github/api-github';

interface IProps {
  info: SlugComponentProps;
}
interface DivProps {
  css: string;
}
const DivStyled = styled.div<DivProps>`
  ${props => props.css}
`;
export default function Slug({}: IProps) {
  const isLoaded = useLoaded();
  const router = useRouter();
  const { type, slug } = router?.query || '';
  const [info, setInfo] = useState<SlugComponentProps>({});
  const Component = React.useMemo(() => {
    return info.code ? getMDXComponent(info.code) : () => <>出错了！</>;
  }, [info.code]);

  useEffect(() => {
    // 获取github上的组件详情
    if (slug) {
      getComponentDetailFormGithub(Number(slug)).then(res => {
        console.log(res);
        setInfo(res.data);
      });
    }
  }, [slug]);
  return (
    <Layout>
      <Seo templateTitle="AwA" />
      <div
        className={classNames(isLoaded && 'fade-in-start', styles.slug__wrap)}
      >
        <SideMenu activeKey={type as ContentType} data-fade="1" />
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
                info?.theme === 'dark' && styles.card__dark
              )}
            >
              <div className={styles.content__title}>
                {info.made_by} @ {info.title}
              </div>
              <div className={classNames(styles.card__wrap)}>
                <DivStyled css={info.css} style={{ zIndex: 9999 }}>
                  <div
                    id={info.title}
                    className={classNames(
                      'flex items-center w-full h-full justify-center'
                    )}
                    dangerouslySetInnerHTML={{ __html: info.html }}
                  ></div>
                </DivStyled>
              </div>
            </article>
            {info && (
              <Component
                components={
                  {
                    ...MDXComponents
                  } as any
                }
              />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

// export const getServerSideProps = async ctx => {
//   const result = await getComponentDetailFormGithub(Number(ctx.query.slug));
//   console.log('----------' + result);
//   if (result.code === 200) return { props: { info: result.data } };
//   else return { notFound: true };
// };
