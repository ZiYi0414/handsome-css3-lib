import React, { useEffect } from 'react';
import styles from '../styles/Home.module.scss';

export default function Star() {
  const addStar = () => {
    let s = document.createElement('div');
    s.className = styles.star;
    s.style.setProperty('--size', Math.random() * 10 + 3 + 'vmin');
    s.style.left = Math.floor(Math.random() * 100) + '%';
    s.style.top = Math.floor(Math.random() * 100) + '%';
    s.onanimationend = function () {
      s.remove();
    };
    document.body.appendChild(s);
  };
  useEffect(() => {
    setInterval(addStar, 100);
  }, []);
  return <div>starEffect</div>;
}
