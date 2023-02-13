import Link from 'next/link';
import styles from './index.module.scss';
export default function linkGroup() {
  return (
    <nav className="flex items-center mr-10">
      <ul className="flex items-center">
        <li className="mx-4 cursor-pointer">
          <Link href={'/'} className={styles.nav__link} data-name="家 Home">
            家 Home
          </Link>
        </li>
        <li className="mx-4 cursor-pointer">
          <Link href={'/show-all'} className={styles.nav__link} data-name="😍 Show All">
            😍 Show All
          </Link>
        </li>
        <li className="mx-4 cursor-pointer">
          <Link
            href={'/about'}
            className={styles.nav__link}
            data-name="阿这"
          >
            阿这
          </Link>
        </li>
      </ul>
    </nav>
  );
}
