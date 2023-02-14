import classNames from 'classnames';
import { components_data } from 'common/exports_data';
import Link from 'next/link';
import { ContentType } from 'types/component';
import styles from './index.module.scss';

interface IProps {
  activeKey?: ContentType | 'ALL';
}
export default function SideMenu({ activeKey }: IProps) {
  return (
    <div className={styles.sidemenu__wrap}>
      <div className={styles.sticky__wrap}>
        <Link
          href={`/show-all`}
          className={classNames(
            styles.sidemenu__link,
            activeKey === 'ALL' && styles.sidemenu__link__active
          )}
        >
          全部 All
        </Link>
        {components_data.map(post => (
          <Link
            key={post.index}
            href={`/${post.index}`}
            className={classNames(
              styles.sidemenu__link,
              activeKey === post.index && styles.sidemenu__link__active
            )}
          >
            {post.type}
          </Link>
        ))}
      </div>
    </div>
  );
}
