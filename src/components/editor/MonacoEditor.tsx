import MonacoEditorComponent, { Monaco } from '@monaco-editor/react';
import { editor } from 'monaco-editor';
import { FC } from 'react';
import styles from './monacoEditor.module.scss';
import classNames from 'classnames';

interface Props {
  language: 'html' | 'css';
  code: string;
  height?: string;
  onCodeChange: (code: string | undefined) => void;
}

const MonacoEditor: FC<Props> = props => {
  return (
    <>
      <div className={`editor-${props.language}`}>
        <div className={classNames('menu-header', styles.editor__header)}>
          <div className="menu-circle" />
          <div className="menu-title">
            <i>{props.language?.toUpperCase()}</i>
          </div>
        </div>
      </div>
      <MonacoEditorComponent
        width="100%"
        height={props.height || '600px'}
        theme="vs-dark"
        className=" text-base"
        defaultLanguage={props.language}
        value={props.code}
        onChange={props.onCodeChange}
        options={{
          fontSize: 16,
          rulers: []
        }}
      />
    </>
  );
};

export default MonacoEditor;
