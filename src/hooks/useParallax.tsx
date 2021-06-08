import { useEffect } from 'react';
import { useState } from 'react';
import { MutableRefObject, RefObject, useMemo } from 'react';

export interface IParallax {
  x: number;
  y: number;
}

export default <TElement extends HTMLElement>(): [RefObject<TElement>, IParallax] => {
  const [element, setElement] = useState<TElement | null>(null);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const parallax = useMemo(() => ({ x, y }), [x, y]);

  const ref: MutableRefObject<TElement | null> = useMemo(() => {
    let current: TElement | null = null;

    return {
      get current(): TElement | null {
        return current;
      },
      set current(value: TElement | null) {
        setElement((current = value));
      },
    };
  }, []);

  useEffect(() => {
    if (!element) {
      return;
    }

    const el = element;

    function update() {
      const rect = el.getBoundingClientRect();
      setX(Math.max(0, Math.min(1, (rect.width + rect.left) / (rect.width + window.innerWidth))));
      setY(Math.max(0, Math.min(1, (rect.height + rect.top) / (rect.height + window.innerHeight))));
    }

    window.addEventListener('scroll', update);
    window.addEventListener('resize', update);
    update();

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [element]);

  return [ref, parallax];
};
