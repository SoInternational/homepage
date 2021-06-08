import { useEffect, useState } from 'react';

/**
 * Responsive breakpoint minimum widths in pixels.
 */
export enum ResponsiveBreakpoint {
  /**
   * Less than 384px (~24rem) wide.
   */
  mobile = 0,

  /**
   * At least 384px (~24rem) and less than 768px (~48rem) wide.
   */
  tablet = 384,

  /**
   * At least 768px (~48rem) and less than 1280px (~80rem) wide.
   */
  laptop = 768,

  /**
   * At least 1280px (~80rem) wide.
   */
  desktop = 1280,
}

export default (): ResponsiveBreakpoint => {
  const [breakpoint, setBreakpoint] = useState<ResponsiveBreakpoint>(getBreakpoint());

  useEffect(() => {
    function onResize() {
      setBreakpoint(getBreakpoint());
    }

    window.addEventListener('resize', onResize);

    return () => window.removeEventListener('resize', onResize);
  }, []);

  return breakpoint;
};

const breakpoints = [
  ResponsiveBreakpoint.desktop,
  ResponsiveBreakpoint.laptop,
  ResponsiveBreakpoint.tablet,
  ResponsiveBreakpoint.mobile,
] as const;

function getBreakpoint(): ResponsiveBreakpoint {
  for (const breakpoint of breakpoints) {
    if (window.innerWidth >= breakpoint) {
      return breakpoint;
    }
  }

  return ResponsiveBreakpoint.mobile;
}
