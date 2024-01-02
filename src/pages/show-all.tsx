import Layout from 'layout/Layout';
import Seo from 'Seo';
import styles from '../styles/Type.module.scss';
import useLoaded from 'hooks/useLoaded';
import { Card } from 'content/index';
import { ContentType, HSComponentProps } from 'types/component';
import SideMenu from 'layout/SideMenu';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { getAllComponentsFormGithub } from 'lib/api-github/api-github';
import LoadingRotate from 'content/loading-rotate';

interface IProps {
  posts: HSComponentProps[];
  type: ContentType | 'ALL';
}
export default function Type({ posts, type = 'ALL' }: IProps) {
  const isLoaded = useLoaded();
  const [components, setComponents] = useState<HSComponentProps[]>([]);
  const [loadMore, setLoadMore] = useState(1);
  const [isHaveMore, setIsHaveMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    setIsLoading(true);
    const data = await getAllComponentsFormGithub({
      page: loadMore
    });
    if (data.data?.length < 20) {
      setIsHaveMore(false);
    }
    setComponents(prev => [...prev, ...(data.data ?? [])]);
    setTimeout(() => setIsLoading(false), 1000);
  };

  useEffect(() => {
    getData();
  }, [loadMore]);
  return (
    <Layout>
      <Seo templateTitle="AwA" />
      <div
        className={classNames(isLoaded && 'fade-in-start', styles.type__wrap)}
      >
        <SideMenu activeKey={'ALL'} data-fade="1" />
        <div className={styles.container} data-fade="1">
          <div className={styles.posts__prereview__heading}>
            {type.toUpperCase()}
          </div>
          <div>
            <span className="text-[#d23669]">{type}</span> Open-Source
            components made with HTML and CSS
          </div>
          <LoadingRotate show={isLoading}>
            <section>
              <div className={styles.posts__prereview__content}>
                {components.map((e, index) => (
                  <Card post={e} key={index} />
                ))}
              </div>
            </section>
            {isHaveMore && components.length > 0 && (
              <div className="text-center">
                <button
                  className={classNames(styles.loadmore__btn)}
                  onClick={() => setLoadMore(loadMore + 1)}
                >
                  Gimme More!
                </button>
              </div>
            )}
          </LoadingRotate>
        </div>
      </div>
    </Layout>
  );
}
