import { useMemo, useEffect, useRef } from 'react';
import classnames from 'classnames';
import { useWindowSize } from 'react-use';

import styles from '../index.module.scss';
export default function Star() {
  const size = useWindowSize();
  const el = useRef<HTMLCanvasElement | null>(null);

  const init = async () => {
    const star = el.current!;
    const ctx = star.getContext('2d')!;
    ctx.beginPath();
  };

  useEffect(() => {
    init();
  }, []);

  return <canvas id="star" width={400} height={400} ref={el}></canvas>;
}
