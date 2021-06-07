import { ReactElement } from 'react';
import { Styled, css } from 'react-css-in-js';
import ParallaxImage from '../atoms/ParallaxImage';
import src from '../../images/hero.jpg';

const overlayStart = 'rgba(0, 0, 0, 0.3)';
const overlayEnd = 'rgba(0, 0, 0, 0.7)';

export default function Hero(): ReactElement {
  return (
    <ParallaxImage src={`linear-gradient(${overlayStart}, ${overlayEnd}), url('${src}')`}>
      <Styled>
        {css`
          position: absolute;
          height: 100%;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);

          .hero-title {
            font-family: 'Rock Salt', cursive;
            color: white;
            font-size: 3rem;
            /* text-shadow: 0 5px 10px black; */
          }
          .hero-subtitle {
            color: #aaa;
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
