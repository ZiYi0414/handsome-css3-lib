import dynamic from 'next/dynamic';
import Layout from 'layout/Layout';
import Seo from 'Seo';
import styles from '../styles/Home.module.scss';
import HomeLoading from '@/components/loading';
import useLoaded from 'hooks/useLoaded';
import ScrollShow from '@/components/content/scroll-show';
import { components_data, HandsomeComponent } from '../common/exports_data';
import { GetStaticProps } from 'next/types';
import { getAllFilesFrontmatter } from 'lib/mdx';
import classNames from 'classnames';
const Banner = dynamic(import('content/banner'), { ssr: false });

interface IProps {
  components_data: HandsomeComponent[];
}
export default function Home({ components_data }: IProps) {
  const isLoaded = useLoaded();

  return (
    <Layout>
      <Seo templateTitle="AwA" />
      <HomeLoading isLoaded={isLoaded} />
      <div className={styles.home__wrap}>
        <Banner />
        <ScrollShow components_data={components_data} />
        <div className={styles.container}>
          <div className={styles.home__title}>
            <div
              className={classNames(
                styles.home__subtitle,
                'flex justify-evenly text-center my-20'
              )}
            >
              <div className="text-center">
                <div>
                  <span className="iconfont icon-component1 mr-2"></span>
                  <span>99+</span>
                </div>
                <i>已收集 99+ 的超帅 UI 组件</i>
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
                <i>6+ 种类型 UI 组件</i>
              </div>
            </div>
          </div>
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
