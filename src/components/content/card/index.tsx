import classNames from 'classnames';
import styles from '../index.module.scss';
import styled, { StyledComponent } from 'styled-components';
import { HSComponentProps } from 'types/component';
import Link from 'next/link';
interface ICardProps {
  post: HSComponentProps;
}

interface DivProps {
  css: string;
}
const DivStyled = styled.div<DivProps>`
  ${props => props.css}
`;

export default function Card({ post }: ICardProps) {
  return (
    <article>
      <Link href={`/buttons/${post.title}`}>
        <div
          className={classNames(
            styles.card__wrap,
            post?.theme === 'dark' && styles.card__dark
          )}
        >
          <DivStyled css={post.css}>
            <div
              id={post.title}
              className={classNames(
                post.title,
                'flex items-center w-full h-full justify-center'
              )}
              dangerouslySetInnerHTML={{ __html: post.html }}
            ></div>
          </DivStyled>
        </div>
      </Link>
      <div className={styles.card__name}>@{post?.title ?? 'nameless'}</div>
    </article>
  );
}
