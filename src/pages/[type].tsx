import Layout from 'layout/Layout';
import Seo from 'Seo';
import styles from '../styles/Type.module.scss';
import useLoaded from 'hooks/useLoaded';
import { Card, Banner } from 'content/index';
import Link from 'next/link';
import { components_data, HandsomeComponent } from '../common/exports_data';
import {
  GetStaticPaths,
  GetStaticProps,
} from 'next/types';
import { getAllFilesFrontmatter, getFiles } from 'lib/mdx';
import { ContentType, HSComponentProps } from 'types/component';
import SideMenu from 'layout/SideMenu';
import classNames from 'classnames';

interface IProps {
  posts: HSComponentProps[];
  type: ContentType;
}
export default function Type({ posts, type }: IProps) {
  const isLoaded = useLoaded();

  return (
    <Layout>
      <Seo templateTitle="AwA" />
      <div className={classNames(isLoaded && 'fade-in-start', styles.type__wrap)}>
        <SideMenu activeKey={type} data-fade="1"/>
        <div className={styles.container} data-fade="1">
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
                <Link href={`/${type}/${e.title}`} key={index}>
                  <Card post={e} />
                </Link>
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
