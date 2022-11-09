import { useEffect, useMemo, useRef } from 'react';

import classnames from 'classnames';
import styles from '../index.module.scss';
export default function Banner() {
  const starRef = useRef<HTMLDivElement>(null);

  const renderStar = () => {
    const StarCount = 800;
    for (let index = 0; index < StarCount; index++) {
      const star = document.createElement('div');
      star.className = styles.star;
      const s = 0.2 + Math.random() * 1;
      const curR = StarCount + Math.random() * 300;
      star.style.transformOrigin = `0 0 ${curR}px`;
      star.style.transform = `translate3d(0,0,-${curR}px) rotateY(${ Math.random() * 360}deg) rotateX(${Math.random() * -50}deg) scale(${s}, ${s})`;
      starRef.current!.append(star);
    }
  };
  useEffect(() => {
    if (starRef.current) {
      renderStar();
    }
  }, [starRef]);
  return (
    <div className={styles.star__background}>
      <div className={styles.loading}>
        <p>
          Handsome CSS In Coming.
          <span>Loading..</span>
        </p>
      </div>
      <div className={styles.stars} ref={starRef}></div>
    </div>
  );
}
