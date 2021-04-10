import { useMediaQuery } from 'react-responsive';

interface BreakpointsConfig {
  minWidth?: boolean;
  mobile?: number;
  tablet?: number;
  desktop?: number;
}

/** Allows the use of responive rendering breakpoints using react-responive in the background */
export const useBreakpoints = (configObj?: BreakpointsConfig) => {
  const defaultValues = {
    minWidth: true,
    mobile: 320,
    tablet: 600,
    desktop: 1024,
  };

  const config = {
    ...defaultValues,
    ...configObj,
  };

  const size = {
    mobile: `${config.mobile}px`,
    tablet: `${config.tablet}px`,
    desktop: `${config.desktop}px`,
  };

  const minWidthQueries = {
    mobile: { query: `(min-width: ${size.mobile})` },
    tablet: { query: `(min-width: ${size.tablet})` },
    desktop: { query: `(min-width: ${size.desktop})` },
  };

  const maxWidthQueries = {
    mobile: { query: `(max-width: ${size.mobile})` },
    tablet: { query: `(max-width: ${size.tablet})` },
    desktop: { query: `(max-width: ${size.desktop})` },
  };

  const queries = config.minWidth ? minWidthQueries : maxWidthQueries;

  const isMobile = useMediaQuery(queries.mobile);
  const isTablet = useMediaQuery(queries.tablet);
  const isDesktop = useMediaQuery(queries.desktop);

  return { isMobile, isTablet, isDesktop };
};
