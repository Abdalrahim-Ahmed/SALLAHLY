import { useApp } from '../../context/AppContext.jsx';

// Dark variant -> for light backgrounds. Light variant -> for dark backgrounds.
const LOGOS = {
  dark: { svg: '/images/logo/logo-dark.svg', png: '/images/logo/logo-dark.png' },
  light: { svg: '/images/logo/logo-light.svg', png: '/images/logo/logo-light.png' },
};

/**
 * variant="auto"  -> follows the active theme (light theme => dark logo, dark theme => light logo)
 * variant="light" -> always the light logo (use on permanently dark surfaces, e.g. footer / hero)
 * variant="dark"  -> always the dark logo
 */
export default function Logo({ variant = 'auto', className = '', alt }) {
  const { theme, lang } = useApp();
  const key = variant === 'auto' ? (theme === 'dark' ? 'light' : 'dark') : variant;
  const { svg, png } = LOGOS[key] || LOGOS.dark;

  return (
    <img
      src={svg}
      alt={alt ?? (lang === 'ar' ? 'صلحلي' : 'Salla7ly')}
      className={`logo-img ${className}`.trim()}
      width="120"
      height="50"
      decoding="async"
      onError={(e) => {
        // Fall back to the PNG variant once if the SVG is missing
        if (!e.currentTarget.dataset.fallback) {
          e.currentTarget.dataset.fallback = '1';
          e.currentTarget.src = png;
        }
      }}
    />
  );
}
