import { useEffect, useState } from 'react';

export interface IScrollState {
  value: number;
  delta: number;
}

export default (): IScrollState => {
  const [state, setState] = useState<IScrollState>({
    value: window.document.documentElement.scrollTop,
    delta: 0,
  });

  useEffect(() => {
    function onScroll() {
      setState((current) => ({
        value: window.document.documentElement.scrollTop,
        delta: window.document.documentElement.scrollTop - current.value,
      }));
    }

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return state;
};
