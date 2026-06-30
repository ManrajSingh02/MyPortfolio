import { Link } from 'react-router-dom';
import { cx } from '../../utils/format.js';

const Button = ({ children, to, href, icon: Icon, variant = 'primary', className = '', ...props }) => {
  const classes = cx('btn', `btn-${variant}`, className);
  const content = (
    <>
      {Icon && <Icon />}
      <span>{children}</span>
    </>
  );

  if (to) return <Link className={classes} to={to} {...props}>{content}</Link>;
  if (href) return <a className={classes} href={href} {...props}>{content}</a>;
  return <button className={classes} type="button" {...props}>{content}</button>;
};

export default Button;
