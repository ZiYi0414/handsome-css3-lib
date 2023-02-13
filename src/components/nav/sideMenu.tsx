import classNames from 'classnames';
import { components_data } from 'common/exports_data';
import Link from 'next/link';
import { ContentType } from 'types/component';
import styles from './index.module.scss';

export default function SideMenu({ show }: { show: boolean }) {
  return (
    <div
      className={classNames(
        !show && styles.sidemenu__wrap__hidden,
        show && styles.sidemenu__wrap
      )}
    >
      <Link href={`/`} className={classNames(styles.sidemenu__link)}>
        家 Go Home
      </Link>
      <Link href={`/about`} className={classNames(styles.sidemenu__link)}>
        关于 About
      </Link>
      <Link href={`/show-all`} className={classNames(styles.sidemenu__link)}>
        全部 All
      </Link>
      {components_data.map(post => (
        <Link
          key={post.index}
          href={`/${post.index}`}
          className={classNames(styles.sidemenu__link)}
        >
          {post.type}
        </Link>
      ))}
    </div>
  );
}
