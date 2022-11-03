import Head from 'next/head';
import { useRouter } from 'next/router';

const defaultMeta = {
  title: 'Luyiin',
  siteName: `Luyiin's Blog`,
  description:
    'Luyiin，comp sci. cv engineer & visual design enthusiast.. 个人网站，博客，funny coder (一个肥宅或艺术家',
  keywords:
    'Luyiin，comp sci. cv engineer & visual design enthusiast.. 个人网站，博客，funny coder (一个肥宅或艺术家',
  /** Without additional '/' on the end */
  url: 'https://luyiin.me',
  type: 'website',
  robots: 'follow, index',
  image: 'https://help-assets.codehub.cn/enterprise/guanwang/favicon.ico'
};

type SeoProps = {
  date?: string;
  templateTitle?: string;
  isBlog?: boolean;
  banner?: string;
} & Partial<typeof defaultMeta>;

export default function Seo(props: SeoProps) {
  const router = useRouter();
  const meta = {
    ...defaultMeta,
    ...props
  };
  meta['title'] = props.templateTitle
    ? `${props.templateTitle} | ${meta.siteName}`
    : meta.title;

  return (
    <Head>
      <title>{meta.title}</title>
      <meta name="robots" content={meta.robots} />
      <meta content={meta.keywords} name="keywords" />
      <meta content={meta.description} name="description" />
      <meta name="image" property="og:image" content={meta.image} />
      <meta property="og:type" content={meta.type} />
      <meta property="og:site_name" content={meta.siteName} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:url" content={`${meta.url}${router.asPath}`} />
      <link rel="canonical" href={`${meta.url}${router.asPath}`} />
      <link key="/favicon/favicon.ico" href="/favicon/favicon.ico" rel="icon" />
      <meta name="theme-color" content="#ffffff" />
    </Head>
  );
}
