import styles from '../styles/Home.module.scss';
import classnames from 'classnames';
import HomeLoading from '@/components/loading';
import useLoaded from 'hooks/useLoaded';
import Layout from 'layout/Layout';
import Seo from 'Seo';

export default function Home() {
  const isLoaded = useLoaded();
  return (
    <div>
      <Layout>
        <Seo templateTitle="AwA" />
        <HomeLoading isLoaded={isLoaded} />
        <div className={classnames(styles.loading)}>
          <p>
            Handsome CSS In Coming.
            <span>Loading..</span>
          </p>
        </div>
      </Layout>
    </div>
  );
}
