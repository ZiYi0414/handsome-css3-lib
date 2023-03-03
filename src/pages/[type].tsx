import Layout from 'layout/Layout';
import Seo from 'Seo';
import styles from '../styles/Type.module.scss';
import useLoaded from 'hooks/useLoaded';
import { Card } from 'content/index';
import { components_data } from '../common/exports_data';
import { GetStaticPaths, GetStaticProps } from 'next/types';
import { getAllFilesFrontmatter } from 'lib/mdx';
import { ContentType, HSComponentProps } from 'types/component';
import SideMenu from 'layout/SideMenu';
import classNames from 'classnames';
import { useCallback, useEffect, useState } from 'react';
import useDebounce from '@/hooks/useDebounce'
import { useTheme } from 'next-themes';

interface IProps {
  posts: HSComponentProps[];
  type: ContentType;
}

const pageSize = 10;

export default function Type({ posts, type }: IProps) {
  const isLoaded = useLoaded();
  const [components, setComponents] = useState<HSComponentProps[]>([]);
  const [pageNum, setPageNum] = useState(0);
  const { resolvedTheme } = useTheme();

  const randomsort = () => {
    return Math.random() > 0.5 ? 1 : -1;
  };

  const renderList = useCallback(() => {
    const data = components.filter((e, idx) => {
      if ((pageNum - 1) * pageSize <= idx && idx < pageNum * pageSize) {
        return e;
      }
    });
    return data.map((e, index) => <Card post={e} key={index} />);
  }, [pageNum]);

  const handlePageNumAdd = useDebounce(() => setPageNum(pageNum => pageNum + 1), 300, [])
  const handlePageNumDecrease = useDebounce(() => setPageNum(pageNum => pageNum - 1), 300, [])

  useEffect(() => {
    setComponents(posts.sort(randomsort));
    setPageNum(1);
  }, [posts]);

  return (
    <Layout>
      <Seo templateTitle="AwA" />
      <div
        className={classNames(isLoaded && 'fade-in-start', styles.type__wrap)}
      >
        <SideMenu activeKey={type} data-fade="1" />
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
              {renderList()}
            </div>
          </section>

          <div className="pagination">
            <button
              className={`button button--left ${
                pageNum > 1 ? 'show' : 'hidden'
              } ${resolvedTheme === 'light' ? 'btn-light' : 'btn-dark'}`}
              onClick={handlePageNumDecrease}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path
                  fill="currentColor"
                  d="M7.828 11H20v2H7.828l5.364 5.364-1.414 1.414L4 12l7.778-7.778 1.414 1.414z"
                ></path>
              </svg>
              Previous page
            </button>

            <button
              className={`button button--right ${
                pageNum === Math.ceil(components.length / pageSize)
                  ? 'hidden'
                  : 'show'
              } ${resolvedTheme === 'light' ? 'btn-light' : 'btn-dark'}`}
              onClick={handlePageNumAdd}
            >
              Next page
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path
                  fill="currentColor"
                  d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                ></path>
              </svg>
            </button>
          </div>
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
