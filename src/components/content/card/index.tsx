import classNames from 'classnames';
import styles from './card.module.scss';
import styled from 'styled-components';
import { HSComponentProps } from 'types/component';
import { CSSProperties, MouseEvent } from 'react';
import { useRouter } from 'next/router';

interface ICardProps {
  post: HSComponentProps;
  style?: CSSProperties;
  showName?: boolean;
}

interface DivProps {
  css: string;
}
const DivStyled = styled.div<DivProps>`
  ${props => props.css}
`;

export default function Card(props: ICardProps) {
  const { post, style = {}, showName = true } = props;
  const componentsPreviewClickList = [
    'buttons',
    'inputs',
    'checkboxes',
    'switches'
  ];
  const router = useRouter();

  const routerGo = (href: string) => {
    router.push(href);
  };
  return (
    <article>
      <div
        className={classNames(
          styles.card__wrap,
          post?.theme === 'dark' && styles.card__dark
        )}
        style={{ ...style }}
        onClick={() => routerGo(`/${post.type}/${post.title}`)}
      >
        <DivStyled
          css={post.css}
          style={{ zIndex: 9999 }}
          onClick={e =>
            componentsPreviewClickList.includes(post.type) &&
            e.stopPropagation()
          }
        >
          <div
            id={post.title}
            className={classNames(
              styles.card__content,
              'flex items-center w-full h-full justify-center'
            )}
            dangerouslySetInnerHTML={{ __html: post.html }}
          ></div>
        </DivStyled>
      </div>
      {showName && (
        <div className={styles.card__name}>@{post?.made_by ?? 'nameless'}</div>
      )}
    </article>
  );
}
