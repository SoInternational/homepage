import 'core-js';
import 'regenerator-runtime/runtime';
import { render } from 'react-dom';
import Hero from './components/organisms/Hero';
import { css, Style } from 'react-css-in-js';

render(
  <>
    <Style>
      {css`
        html,
        body {
          margin: 0;
          padding: 0;
          font-family: 'Roboto', sans-serif;
          font-size: 16px;
        }
      `}
    </Style>
    <div>
      <Hero />
      <div style={{ height: '100vh' }} />
    </div>
  </>,
  document.getElementById('root'),
);
