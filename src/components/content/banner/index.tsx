import { useTheme } from 'next-themes';
import styles from '../index.module.scss';
export default function Banner() {
  const { theme, setTheme } = useTheme();

  return (
    <div className={styles.star__background}>
      <div className={styles.container}>
        {theme === 'light' ? (
          <div className={styles.area}>
            <ul className={styles.circles}>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
        ) : (
          <div className={styles.background}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}
        <div className={styles.media__title}>{`<AWA UI />`}</div>
        <h1 id={styles.master}>
          <div className={styles.title}>{`<AWA UI />`}</div>
          <div id={styles.scroller}>
            <div className={styles.scroller__item}>
              “ 并且完全开源 MIT License. ”{' '}
            </div>
            <div className={styles.scroller__item}>
              “ 来自于互联网各国平面设计师. ”{' '}
            </div>
            <div className={styles.scroller__item}>
              “ 使用纯HTML + CSS 动画实现. ”
            </div>
            <div className={styles.scroller__item}>
              “ 无任何JavaScript的CSS3动画. ”
            </div>
            <div className={styles.scroller__item}>
              “ FxxK JS, 纯爷们只用CSS. ”
            </div>
            <div className={styles.scroller__item}>
              “ 来自于海内外平面设计师. ”
            </div>
            <div className={styles.scroller__item}>“ Copy到你的项目中. ”</div>
            <div className={styles.scroller__item}>“ 帮助你提高审美. ”</div>
            <div className={styles.scroller__item}>
              “ Funny coder （肥宅或艺术家 ”
            </div>
            <div className={styles.scroller__item}>
              “ 并且完全开源 MIT License. ”
            </div>
          </div>
        </h1>
        <div className={styles.sub__title}>
          <h2>
            Amazingly handsome Open-Source UI components made with HTML and CSS
          </h2>
          <p>
            Thank you to everyone who contributes to the cause and art of open
            source :)
          </p>
        </div>
      </div>
    </div>
  );
}
