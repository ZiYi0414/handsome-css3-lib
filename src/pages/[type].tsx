import Layout from 'layout/Layout';
import Seo from 'Seo';
import styles from '../styles/Type.module.scss';
import useLoaded from 'hooks/useLoaded';
import { Card } from 'content/index';
import { ContentType, HSComponentProps } from 'types/component';
import SideMenu from 'layout/SideMenu';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { getComponentsFormGithubByType } from 'lib/api-github/api-github';
import { useRouter } from 'next/router';

interface IProps {
  posts: HSComponentProps[];
}
export default function Type({ posts }: IProps) {
  const router = useRouter();
  const type = (router?.query?.type as ContentType) || '';
  const isLoaded = useLoaded();
  const [components, setComponents] = useState<HSComponentProps[]>([]);
  const [loadMore, setLoadMore] = useState(15);

  const renderList = () => {
    const data = components.filter((e, idx) => {
      if (idx < loadMore) {
        return e;
      }
    });
    return data.map((e, index) => <Card post={e} key={index} />);
  };

  const getData = async () => {
    const data = await getComponentsFormGithubByType(type);
    setComponents(data.data ?? []);
  };

  useEffect(() => {
    if (type) getData();
  }, [type]);
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
          {loadMore < components.length && (
            <div className="text-center">
              <button
                className={classNames(styles.loadmore__btn)}
                onClick={() => setLoadMore(loadMore * 2)}
              >
                Gimme More!
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

// export const getStaticPaths: GetStaticPaths = async () => {
//   return {
//     paths: components_data.map(p => ({
//       params: {
//         type: p.index
//       }
//     })),
//     fallback: false
//   };
// };

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   const posts = await getAllFilesFrontmatter(params?.type as ContentType);
//   return {
//     props: { posts, type: params?.type }
//   };
// };

// export const getServerSideProps: GetServerSideProps = async ctx => {
//   console.log(ctx.query);

//   const data = await getComponentsFormGithubByType(
//     ctx?.query?.type as ContentType
//   );

//   try {
//     return {
//       props: { posts: data, type: ctx?.query?.type }
//     };
//   } catch (error) {
//     console.log('types:::' + error);
//     return {
//       props: { posts: data, type: ctx?.query?.type }
//     };
//   }
// };
