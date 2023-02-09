import { useEffect, useMemo, useRef } from 'react';

import classnames from 'classnames';
import styles from './star.module.sass';
export default function Star() {
  return (
    <div className={styles.star2__wrap}>
      <div id={styles.stars}></div>
      <div id={styles.stars2}></div>
      <div id={styles.stars3}></div>
    </div>
  );
}
