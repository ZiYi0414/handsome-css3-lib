import { useState } from 'react';
import Layout from 'layout/Layout';
import classNames from 'classnames';
import useLoaded from 'hooks/useLoaded';
import typeStyles from '../styles/Type.module.scss';
import styles from '../styles/Code.module.scss';
import Seo from 'Seo';
import MonacoEditor from '../components/editor/MonacoEditor';

const Code = () => {
  const isLoaded = useLoaded();
  const [htmlCode, setHtmlCode] = useState<string>('');
  const [cssCode, setCssCode] = useState<string>('');

  // 渲染区域
  const RenderingContainer = () => {
    return (
      <div
        className={classNames(
          styles.rendering__container,
          typeStyles.container
        )}
        style={{
          color: '#fff'
        }}
      >
        RenderingContainer
      </div>
    );
  };

  return (
    <Layout>
      <Seo templateTitle="Code IDE" />

      <div
        className={classNames(
          isLoaded && 'fade-in-start',
          typeStyles.type__wrap,
          typeStyles.container,
          styles.container
        )}
      >
        <div className={styles.left_side} data-fade="1">
          {RenderingContainer()}
          <div className={classNames(styles.editor)}>
            <MonacoEditor
              language="html"
              height="300px"
              code={htmlCode}
              onCodeChange={c => {
                setHtmlCode(c || '');
              }}
            />
          </div>
        </div>

        <div className={classNames(styles.editor)} data-fade="1">
          <MonacoEditor
            language="css"
            code={cssCode}
            onCodeChange={c => {
              setCssCode(c || '');
            }}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Code;
