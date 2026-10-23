import { Link } from 'react-router-dom';

// variant: primary | accent | outline | ghost ; size: sm | md | lg
// Pass `to` to render a router link instead of a <button>.
export default function Button({ variant = 'primary', size = 'md', to, className = '', children, ...rest }) {
  const cls = `btn btn-${variant} ${size === 'sm' ? 'btn-sm' : size === 'lg' ? 'btn-lg' : ''} ${className}`;
  if (to) return <Link to={to} className={cls} {...rest}>{children}</Link>;
  return <button className={cls} {...rest}>{children}</button>;
}
