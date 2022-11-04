import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.scss';
import classnames from 'classnames';
import HomeLoading from '@/components/loading';
import useLoaded from 'hooks/useLoaded';

export default function Home() {
  const isLoaded = useLoaded();
  return (
    <div>
      <HomeLoading isLoaded={isLoaded}/>
      <div className={classnames(styles.loading)}>
        <p>
          Handsome CSS In Coming.
          <span>Loading..</span>
        </p>
      </div>
    </div>
  );
}
