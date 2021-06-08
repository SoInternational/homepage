import { ReactNode, useEffect } from 'react';
import { ReactElement, useState } from 'react';
import { Styled, css } from 'react-css-in-js';
import useWindowScrollTop from '../../hooks/useWindowScroll';

export interface IHomeProps {
  header?: ReactElement;
  hero?: ReactElement;
  footer?: ReactElement;
  children?: ReactNode;
}

export default function Home({ header, hero, footer, children }: IHomeProps): ReactElement {
  const scrollTop = useWindowScrollTop();
  const [visible, setVisible] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const handle = setTimeout(() => setReady(true), 500);
    return () => clearTimeout(handle);
  }, []);

  useEffect(() => {
    if (ready) {
      if (scrollTop.value < 1) {
        setVisible(true);
      } else if (scrollTop.delta > 1) {
        setVisible(false);
      } else if (scrollTop.delta < -1) {
        setVisible(true);
      }
    }
  }, [ready, scrollTop.value, scrollTop.delta]);

  return (
    <Styled>
      {css`
        position: relative;
        min-height: 100vh;
        background-color: white;

        > .home-header {
          position: fixed;
          height: 5rem;
          width: 100%;
          top: ${visible ? 0 : '-5rem'};
          z-index: 1;
          transition: top 0.33s ease;
          background-color: white;
        }

        > .home-content {
          background-color: #f8f8f8;
        }
      `}
      <div>
        {header && <div className={'home-header'}>{header}</div>}
        {hero && <div className={'home-hero'}>{hero}</div>}
        <div className={'home-content'} style={{ height: '100vh' }}>
          {children}
        </div>
        {footer && <div className={'home-footer'}>{footer}</div>}
      </div>
    </Styled>
  );
}
