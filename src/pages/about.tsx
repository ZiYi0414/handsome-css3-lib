import * as React from 'react';
import Layout from '@/components/layout/Layout';
import Link from 'next/link';
import Seo from 'Seo';
import useLoaded from 'hooks/useLoaded';
import styles from '@/styles/About.module.scss';
import NextImage from 'image/NextImage';
import Avator from '@/assets/img/ziyi0414.png';
import UnstyledLink from 'content/link/UnstyledLink';
import classNames from 'classnames';

export default function About() {
  const isLoaded = useLoaded();

  return (
    <Layout nofooter={true}>
      <Seo templateTitle="关于 | AwA" />
      <main>
        <section
          className={classNames(
            isLoaded && 'fade-in-start',
            styles.about__wrap,
            'flex justify-center items-center flex-col'
          )}
        >
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          <div data-fade="1">
            <div className={classNames(styles.title, 'typing-demo')}>
              About Handsome-css-lib.
            </div>
            <div className={styles.avator}>
              <NextImage
                src={Avator}
                alt="我"
                width={99}
                height={99}
                draggable={false}
              ></NextImage>
            </div>
            <div className={styles.content}>
              <div>
                网站主旨在于收集网上仅靠{' '}
                <span className="text-[#0071e2] font-bold">CSS</span> 与{' '}
                <span className="text-[#ff5858] font-bold">HTML</span>{' '}
                就可以实现的动效UI。
              </div>
              <div>目的是为了提高开发者的审美和技术。</div>
              <div>
                有兴趣的小伙伴可以通过{' '}
                <UnstyledLink
                  className="text-[#d23669] font-bold"
                  href="https://github.com/ZiYi0414/handsome-css3-lib/issues"
                >
                  issue
                </UnstyledLink>{' '}
                联系我，一起维护这个平台。
              </div>
              <div>
                虽然内容全部完全开源，但尽可能的标注了每个组件的作者名称。
              </div>
              <div>
                如有遗漏和其他版权问题，请及时从{' '}
                <UnstyledLink
                  className="text-[#d23669] font-bold"
                  href="https://github.com/ZiYi0414/handsome-css3-lib/issues"
                >
                  GitHub issue
                </UnstyledLink>{' '}
                联系我进行解决。
              </div>
              <Link href={'/'} className="text-lg mt-4 hover:text-[#d23669]">
                ← Please enjoy it! 😃
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className={classNames('my-16 text-center text-[#b3b3b3] ')}>
        <div>
          <a
            href="https://luyiin.me"
            target="_blank"
            className="pl-1"
            rel="noreferrer"
          >
            「 Luyiin
          </a>
          <a
            href="https://github.com/ZiYi0414/handsome-css3-lib"
            target="_blank"
            className="pl-1"
            rel="noreferrer"
          >
            © HANDSOME-CSS-LIB 」 🌸 {new Date().getFullYear()}
          </a>
        </div>
      </footer>
    </Layout>
  );
}
