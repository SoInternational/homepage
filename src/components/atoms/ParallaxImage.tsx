import { ReactElement, ReactNode } from 'react';
import { css, Styled } from 'react-css-in-js';

export interface IParallaxImageProps {
  src: string;
  minHeight?: string;
  className?: string;
  children?: ReactNode;
}

export default function ParallaxImage({
  src,
  minHeight = '100vh',
  className,
  children,
}: IParallaxImageProps): ReactElement {
  return (
    <Styled className={className}>
      {css`
        position: relative;
        background-image: ${src};
        background-attachment: fixed;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        min-height: ${minHeight};
      `}
      <div>{children}</div>
    </Styled>
  );
}
