import classNames from 'classnames';
import styles from '../index.module.scss';
import styled, { StyledComponent } from 'styled-components';
interface ICardProps {
  post: {
    css: string;
    html: string;
    title: string;
    slug?: string;
    made_by: string;
  };
}

interface DivProps {
  css: string
}
const DivStyled = styled.div<DivProps>`
  ${props => props.css}
`;

export default function Card({ post }: ICardProps) {
  return (
    <div>
      <div className={styles.card}>
        <DivStyled css={post.css}>
          <div
            id={post.title}
            className={classNames(post.title)}
            dangerouslySetInnerHTML={{ __html: post.html }}
          ></div>
        </DivStyled>
      </div>
      <div>{post?.title ?? 'nameless'}</div>
    </div>
  );
}
