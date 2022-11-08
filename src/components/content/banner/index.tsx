import { useMemo } from 'react';

import classnames from 'classnames';
import styles from '../index.module.scss';
export default function Banner() {
  return (
    <div className={classnames(styles.loading)}>
      <p>
        Handsome CSS In Coming.
        <span>Loading..</span>
      </p>
    </div>
  );
}
