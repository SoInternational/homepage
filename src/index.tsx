import 'core-js';
import 'regenerator-runtime/runtime';

import { render } from 'react-dom';
import { css, Style } from 'react-css-in-js';
import Home from './components/templates/Home';
import Hero from './components/organisms/Hero';
import soInternationalFontUrl from './fonts/SoInternational.woff2';
import { rem } from './constants';

history.scrollRestoration = 'manual';
window.onbeforeunload = () => window.scrollTo(0, 0);

render(
  <>
    <Style>
      {css`
        @font-face {
          font-family: 'SoInternational';
          font-style: normal;
          font-weight: 400;
          font-display: swap;
          src: url('${soInternationalFontUrl}') format('woff2');
        }

        html,
        body {
          margin: 0;
          padding: 0;
          font-family: 'Roboto', sans-serif;
          font-size: ${rem}px;
          background-color: white;
        }
      `}
    </Style>
    <Home hero={<Hero />} />
  </>,
  document.getElementById('root'),
);
