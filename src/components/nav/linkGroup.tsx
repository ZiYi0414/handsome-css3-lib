import Link from 'next/link';
import styles from './index.module.scss';
export default function linkGroup() {
  return (
    <nav className="flex items-center mr-10">
      <ul className="flex items-center">
        <li className="mx-4 cursor-pointer">
          <Link
            href={'/show-all'}
            className={styles.nav__link}
            data-name="😍 Show All"
          >
            😍 Show All
          </Link>
        </li>
        <li className="mx-4 cursor-pointer">
          <Link
            href={'/about'}
            className={styles.nav__link}
            data-name="👋 你好"
          >
            👋 你好
          </Link>
        </li>
      </ul>
    </nav>
  );
}
