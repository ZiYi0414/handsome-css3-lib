import classNames from 'classnames';
import * as React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { HiCheckCircle, HiClipboard } from 'react-icons/hi';

export function Pre(props: React.ComponentPropsWithRef<'pre'>) {
  const language = props.className?.includes('language')
    ? props.className.replace('language-', '').replace(' code-highlight', '')
    : null;
  return (
    <div className={classNames(`editor-${language}`, ' relative rounded-md overflow-hidden')}>
      {language && (
        <div className="menu-header">
          <div className="menu-circle"></div>
          <div className="menu-title">
            <i>{language.toUpperCase()}</i>
          </div>
        </div>
      )}
      <pre {...props}>
        {props.children}
        <style jsx>{`
          pre {
            position: relative;
            padding-top: 2.5rem;
          }
        `}</style>
      </pre>
    </div>
  );
}

export default function CustomCode(props: React.ComponentPropsWithRef<'code'>) {
  const textRef = React.useRef<HTMLDivElement>(null);
  const [isCopied, setIsCopied] = React.useState<boolean>(false);

  const language = props.className?.includes('language')
    ? props.className.replace('language-', '').replace(' code-highlight', '')
    : null;

  return (
    <code
      {...props}
      data-code-type={language && 'code-block'}
      className="relative"
    >
      {language ? (
        <div ref={textRef} className="overflow-x-auto">
          {props.children}
        </div>
      ) : (
        <span>{props.children}</span>
      )}
      {language && (
        <CopyToClipboard
          text={textRef?.current?.textContent ?? ''}
          onCopy={() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 1500);
          }}
        >
          <button className=" absolute top-2 right-2 block rounded border border-gray-600 p-2 transition-colors hover:bg-gray-700">
            {isCopied ? (
              <HiCheckCircle className="text-green-400" />
            ) : (
              <HiClipboard />
            )}
          </button>
        </CopyToClipboard>
      )}
    </code>
  );
}
