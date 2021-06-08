import { ReactElement } from 'react';
import { Styled, css } from 'react-css-in-js';
import ParallaxImage from '../atoms/ParallaxImage';
import src from '../../images/william-bout-7cdFZmLlWOM-unsplash.jpg';

export default function Hero(): ReactElement {
  return (
    <ParallaxImage
      src={`linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('${src}')`}
      minHeight={'100vh'}
      scaleHeight={1.5}
    >
      <Styled>
        {css`
          position: absolute;
          height: 100%;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: white;
          text-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);

          .hero-title {
            font-family: SoInternational, cursive;
            font-size: 3rem;
          }
          .hero-subtitle {
            opacity: 0.6;
            font-size: 1.4rem;
          }
        `}
        <div>
          <div className={'hero-title'}>So International</div>
          <div className={'hero-subtitle'}>The adventures of Bhavna &amp; Chris.</div>
        </div>
      </Styled>
    </ParallaxImage>
  );
}
