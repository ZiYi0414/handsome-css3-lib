import { useEffect, useState } from 'react';
import Layout from 'layout/Layout';
import classNames from 'classnames';
import useLoaded from 'hooks/useLoaded';
import slugStyles from '../styles/Slug.module.scss';
import styles from '../styles/Code.module.scss';
import Seo from 'Seo';
import MonacoEditor from '../components/editor/MonacoEditor';
import styled from 'styled-components';
import { useNotice } from 'notice/Notice.hooks';

interface DivProps {
  css: string;
}

const DivStyled = styled.div<DivProps>`
  ${props => props.css}
`;

const Code = () => {
  const isLoaded = useLoaded();
  const [htmlCode, setHtmlCode] = useState<string>('');
  const [cssCode, setCssCode] = useState<string>('');
  const [Notice] = useNotice();

  useEffect(() => {
    Notice({
      title: <p className="text-2xl font-semibold">🔔 BiBong BiBong</p>,
      content: (
        <>
          <p className="mt-4">
            此功能为
            <small className="mx-2 py-0.5 px-1.5 text-white bg-[#635985]">
              BETA
            </small>
            测试版本.
          </p>
          <p className="mt-4">目前还在开发完善中.</p>
          <p className="mt-4">欢迎提交 Bug 和建议到 issues.</p>
        </>
      ),
      showClose: true
    });
  }, []);

  useEffect(() => {
    const storageCode = localStorage.getItem('creator');
    if (!storageCode) return;
    setHtmlCode(JSON.parse(storageCode)?.htmlCode || '');
    setCssCode(JSON.parse(storageCode)?.cssCode || '');
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        (event.ctrlKey && event.key === 's') ||
        (event.metaKey && event.key === 's')
      ) {
        event.preventDefault();
        localStorage.setItem('creator', JSON.stringify({ htmlCode, cssCode }));
        Notice({
          content: <p className="mt-4">🫡 保存成功</p>,
          duration: 1500,
          position: 'rightBottom'
        });
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [htmlCode, cssCode]);

  // 渲染区域
  const RenderingContainer = () => {
    return (
      <div
        className={classNames(styles.rendering__container)}
        style={{
          color: '#fff'
        }}
      >
        <div
          className={classNames(
            'flex items-center w-full h-full justify-center'
          )}
        >
          <DivStyled
            css={cssCode}
            style={{ zIndex: 9999 }}
            dangerouslySetInnerHTML={{ __html: htmlCode }}
          ></DivStyled>
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <Seo templateTitle="AWA - CREATOR" />
      <div
        className={classNames(
          isLoaded && 'fade-in-start',
          slugStyles.type__wrap,
          slugStyles.container,
          styles.container
        )}
      >
        {RenderingContainer()}

        <div className={classNames(styles.editor__css)} data-fade="1">
          <MonacoEditor
            language="css"
            code={cssCode}
            onCodeChange={c => {
              setCssCode(c || '');
            }}
          />
        </div>
        <div className={classNames(styles.editor__html)}>
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
    </Layout>
  );
};

export default Code;
