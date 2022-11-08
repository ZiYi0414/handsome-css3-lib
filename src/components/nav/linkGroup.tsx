import Link from 'next/link';
import styles from './index.module.scss';
export default function linkGroup() {
  return (
    <nav className="flex items-center mr-6">
      <ul className="flex items-center">
        <li className="mx-2 cursor-pointer">
          <Link href={'/'}>Home</Link>
        </li>
        <li className="mx-2 cursor-pointer">
          <Link href={'/about'}>About</Link>
        </li>
      </ul>
    </nav>
  );
}
