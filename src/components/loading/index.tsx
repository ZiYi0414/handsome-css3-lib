import { useEffect, useState } from 'react';
import classnames from 'classnames';
import styles from './index.module.scss';

interface IProps {
  isLoaded: boolean;
}

const HomeLoading: React.FC<IProps> = ({ isLoaded }) => {
  const [isShow, setIsShow] = useState<boolean>(true);
  useEffect(() => {
    if (!isLoaded) {
      setTimeout(() => {
        setIsShow(false);
      }, 4000);
    }
  }, [isLoaded]);
  return (
    <>
      {isShow && (
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
      )}
    </>
  );
};
export default HomeLoading;
