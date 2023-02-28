import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript
} from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  // static getAnalyticsTag = () => {
  //   return {
  //     __html: `
  //       var _hmt = _hmt || [];
  //       (function() {
  //         var hm = document.createElement("script");
  //         hm.src = "https://hm.baidu.com/hm.js?76e43b808e1251f0e3d8f05d3f907831";
  //         var s = document.getElementsByTagName("script")[0];
  //         s.parentNode.insertBefore(hm, s);
  //       })();`,
  //   };
  // };

  render() {
    return (
      <Html lang="en">
        <Head>
          {/* <script dangerouslySetInnerHTML={MyDocument.getAnalyticsTag()} /> */}
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Poppins&display=swap"
          ></link>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

<script></script>;
