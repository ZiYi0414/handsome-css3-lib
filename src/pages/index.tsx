import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.scss';
import classnames from 'classnames';

export default function Home() {
  return (
    <div className={classnames(styles.loading)}>
      <p>
        Handsome CSS In Coming.
        <span>Loading..</span>
      </p>
    </div>
  );
}
