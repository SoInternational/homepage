import { ReactElement, ReactNode } from 'react';
import { css, Styled } from 'react-css-in-js';
import useParallax from '../../hooks/useParallax';

export interface IParallaxImageProps {
  src: string;
  height?: string;
  minHeight?: string;
  scaleHeight?: number;
  width?: string;
  minWidth?: string;
  scaleWidth?: number;
  className?: string;
  children?: ReactNode;
}

export default function ParallaxImage({
  src,
  height,
  minHeight,
  scaleHeight = 1,
  width,
  minWidth,
  scaleWidth = 1,
  className,
  children,
}: IParallaxImageProps): ReactElement {
  const [ref, parallax] = useParallax<HTMLDivElement>();
  console.log(parallax);

  return (
    <Styled className={className}>
      {css`
        position: relative;
        height: ${height};
        min-height: ${minHeight};
        width: ${width};
        min-width: ${minWidth};
        overflow: hidden;

        > .parallax-image__shift {
          position: absolute;
          background-image: ${src};
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
        }

        > .parallax-image__vignette {
          position: absolute;
          height: 100%;
          width: 100%;
          box-shadow: inset 0 0 1000px black;
          pointer-events: none;
        }
      `}
      <div ref={ref}>
        <div
          className={'parallax-image__shift'}
          style={{
            top: `${(scaleHeight - 1) * parallax.y * -100}%`,
            bottom: `${(scaleHeight - 1) * (parallax.y - 1) * 100}%`,
            left: `${(scaleWidth - 1) * parallax.x * -100}%`,
            right: `${(scaleWidth - 1) * (parallax.x - 1) * 100}%`,
          }}
        ></div>
        <div className={'parallax-image__vignette'} />
        {children}
      </div>
    </Styled>
  );
}
