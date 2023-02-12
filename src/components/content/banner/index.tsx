import { useEffect, useRef } from 'react';

import classnames from 'classnames';
import styles from '../index.module.scss';
import Star from './star';
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
      star.style.transform = `translate3d(0,0,-${curR}px) rotateY(${
        Math.random() * 360
      }deg) rotateX(${Math.random() * -50}deg) scale(${s}, ${s})`;
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
          <span>Handsome-CSS..</span>
          😍Handsome CSS In Coming!!!
        </p>
        <h1 id={styles.master}>
          <div className="mb-4"> 超多漂亮的UI组件 ..</div>
          <div id={styles.scroller}>
            <div className={styles.scroller__item}>“ 并且完全开源 MIT License. ” </div>
            <div className={styles.scroller__item}>“ 来自于互联网各国平面设计师. ” </div>
            <div className={styles.scroller__item}>“ 使用纯HTML + CSS 动画实现. ”</div>
            <div className={styles.scroller__item}>“ 无任何JavaScript的CSS3动画. ”</div>
            <div className={styles.scroller__item}>“ FxxK JS, 纯爷们只用CSS. ”</div>
            <div className={styles.scroller__item}>
              “ 来自于海内外平面设计师. ”
            </div>
            <div className={styles.scroller__item}>“ Copy到你的项目中. ”</div>
            <div className={styles.scroller__item}>“ 帮助你提高审美. ”</div>
            <div className={styles.scroller__item}>“ Funny coder （肥宅或艺术家 ”</div>
            <div className={styles.scroller__item}>“ 并且完全开源 MIT License. ”</div>
          </div>
        </h1>
      </div>
      <Star />
      {/* <div className={styles.stars} ref={starRef}></div> */}
    </div>
  );
}
