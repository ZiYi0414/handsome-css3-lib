import classNames from 'classnames';
import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

const LoadingWrapStyled = styled.div`
  @keyframes spin1 {
    0% {
      transform: scale(1) rotate(45deg);
      grid-gap: 6px;
    }

    20%,
    25% {
      transform: scale(1.2) rotate(90deg);
      grid-gap: 3px;
    }

    45%,
    50% {
      transform: scale(1) rotate(135deg);
      grid-gap: 6px;
    }

    70%,
    75% {
      transform: scale(1.2) rotate(180deg);
      grid-gap: 3px;
    }

    95%,
    100% {
      transform: scale(1) rotate(225deg);
      grid-gap: 6px;
    }
  }

  display: grid;
  grid-template-columns: 35px 35px;
  grid-template-rows: 35px 35px;
  grid-gap: 6px;
  transform: rotateZ(45deg);
  animation: spin1 2s ease-in infinite;
`;
const LoadingCardStyled = styled.div`
  width: 35px;
  height: 35px;
  background: var(--primary);
`;

interface IProps {
  show: boolean;
  children?: React.ReactNode;
}

export default function LoadingRotate(props: IProps) {
  const { show = true, children } = props;
  const [isShow, setIsShow] = useState<boolean>(true);
  useEffect(() => {
    if (!show) {
      setTimeout(() => {
        setIsShow(false);
      }, 1000);
    }
  }, [show]);
  return (
    <div className="relative">
      {show && (
        <div
          className="w-full h-full flex justify-center items-center absolute"
          style={{ zIndex: '9999' }}
        >
          <div className={classNames(show && 'loading-fade-out')}>
            <LoadingWrapStyled>
              <LoadingCardStyled></LoadingCardStyled>
              <LoadingCardStyled></LoadingCardStyled>
              <LoadingCardStyled></LoadingCardStyled>
              <LoadingCardStyled></LoadingCardStyled>
            </LoadingWrapStyled>
          </div>
        </div>
      )}
      <div className={classNames(show && 'loading-fade-in')}>{children}</div>
    </div>
  );
}
