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
          <Link href={'/code'} className={styles.nav__link} data-name="创作">
            创作
            <small className=" py-0.5 px-1.5 text-white bg-[#635985]">
              BETA
            </small>
          </Link>
        </li>
        <li className="mx-4 cursor-pointer">
          <Link href={'/about'} className={styles.nav__link} data-name="关于">
            关于
          </Link>
        </li>
      </ul>
    </nav>
  );
}
