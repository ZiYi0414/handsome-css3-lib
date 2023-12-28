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

interface IProps {
  posts: HSComponentProps[];
  type: ContentType | 'ALL';
}
export default function Type({ posts, type = 'ALL' }: IProps) {
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
    const data = await getAllComponentsFormGithub();
    setComponents(data.data ?? []);
  };

  useEffect(() => {
    getData();
  }, []);
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
