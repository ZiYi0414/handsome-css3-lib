import Head from 'next/head';
import Image from 'next/image';
import classnames from 'classnames';
import styles from './index.module.scss';

interface IProps {
  isLoaded: boolean;
}

export default function HomeLoading({ isLoaded }: IProps) {
  return (
    <div
      className={classnames(
        styles.loading_content,
        isLoaded && styles.loading_content_fade
      )}
    >
      <div className={styles.spinner_box}>
        <div className={styles.configure_border_1}>
          <div className={styles.configure_core}></div>
        </div>
        <div className={styles.configure_border_2}>
          <div className={styles.configure_core}></div>
        </div>
      </div>
      <div className={styles.cube_wrapper}>
        <div className={styles.cube_folding}>
          <span className={styles.leaf1}></span>
          <span className={styles.leaf2}></span>
          <span className={styles.leaf3}></span>
          <span className={styles.leaf4}></span>
        </div>
      </div>
    </div>
  );
}
