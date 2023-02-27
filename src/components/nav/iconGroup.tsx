import { useTheme } from 'next-themes';
import classNames from 'classnames';
import styles from './index.module.scss';
import UnstyledLink from 'content/link/UnstyledLink';

export default function IconGroup() {
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <div className={styles.iconGroup__wrap}>
      <UnstyledLink href={'https://github.com/ZiYi0414/handsome-css3-lib'}>
        <button className="flex flex-col">
          <div className="flex justify-center items-center">
            <small className="text-[#d23669]">like</small>
            <span className="iconfont icon-github ml-2 !text-[22px]" />
          </div>
          <div className="flex justify-center items-center">
            <span className="iconfont icon-github1 !text-[34px]" />
            <span className="iconfont icon-github1 ml-2 !text-[34px]" />
          </div>
        </button>
      </UnstyledLink>

      <button
        className="ml-4"
        onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      >
        <small>{resolvedTheme === 'dark' ? '辉' : '耀'}</small>
        <span
          className={classNames(
            'iconfont ml-2 !text-[22px]',
            resolvedTheme === 'dark' ? 'icon-moon' : 'icon-sun'
          )}
        />
      </button>
    </div>
  );
}
