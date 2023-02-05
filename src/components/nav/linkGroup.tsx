import Link from 'next/link';
import styles from './index.module.scss';
export default function linkGroup() {
  return (
    <nav className="flex items-center mr-10">
      <ul className="flex items-center">
        <li className="mx-4 cursor-pointer">
          <Link href={'/'} className={styles.nav__link} data-name="Home">
            Home
          </Link>
        </li>
        <li className="mx-4 cursor-pointer">
          <Link
            href={'/about'}
            className={styles.nav__link}
            data-name="About"
          >
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
}
