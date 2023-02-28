import { useTheme } from 'next-themes';
import styles from '../index.module.scss';
export default function Banner() {
  const { resolvedTheme } = useTheme();

  return (
    <div className={styles.star__background}>
      <div className={styles.container}>
        {resolvedTheme === 'light' ? (
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
        <div className={styles.title}>
          Fall in <span className="text-[#ff5858]">love</span> with
          <span className="text-[#0071e2]"> css</span>
        </div>
        <div className={styles.sub__title}>
          <h2>
            Amazingly <span>handsome Open-Source</span> UI components made with
            HTML and CSS
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
