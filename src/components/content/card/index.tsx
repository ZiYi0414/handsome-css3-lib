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

const useStyledComponent = (css_string: string) => {
  return styled.div`
    ${css_string}
  `;
};

export default function Card({ post }: ICardProps) {
  const DivStyled = useStyledComponent(post.css);
  return (
    <div>
      <div className={styles.card}>
        <DivStyled>
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
