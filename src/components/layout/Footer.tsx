import { useState } from 'react';
import classNames from 'classnames';
import NextImage from 'image/NextImage';
import styles from './index.module.scss';
import Avator1 from '@/assets/img/ziyi0414.png';
import Avator3 from '@/assets/img/ziyi0414.gif';


export default function Footer() {
  const [avator, setAvator] = useState(Avator3);

  const handleChangeImg = () => {
    const imgArr = [Avator1, Avator3];
    setAvator(imgArr[Math.floor(Math.random() * imgArr.length)]);
  };

  return (
    <footer
      className={classNames(styles.footer, 'my-16 text-center text-[#b3b3b3] ')}
    >
      <section className="flex flex-col items-center">
        <div className={styles.avator}>
          <NextImage
            onClick={handleChangeImg}
            src={avator}
            alt="我"
            width={99}
            height={99}
            draggable={false}
          ></NextImage>
        </div>
        <div>
          <a
            href="https://luyiin.me"
            target="_blank"
            className="pl-1"
            rel="noreferrer"
          >
            「 Luyiin
          </a>
          <a
            href="https://github.com/ZiYi0414/handsome-css3-lib"
            target="_blank"
            className="pl-1"
            rel="noreferrer"
          >
            © HANDSOME-CSS-LIB 」 🌸 {new Date().getFullYear()}
          </a>
        </div>
      </section>
    </footer>
  );
}
