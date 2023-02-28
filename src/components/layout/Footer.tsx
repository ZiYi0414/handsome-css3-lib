import { useState } from 'react';
import classNames from 'classnames';
import NextImage from 'image/NextImage';
import styles from './index.module.scss';
import Avator from '@/assets/img/ziyi0414.png';

export default function Footer() {
  return (
    <footer
      className={classNames(styles.footer, 'my-16 text-center text-[#b3b3b3] ')}
    >
      <section className="flex flex-col items-center">
        <div className={styles.avator}>
          <NextImage
            src={Avator}
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
