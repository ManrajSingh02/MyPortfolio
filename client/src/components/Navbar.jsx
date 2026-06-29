import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FiMenu, FiMoon, FiSun, FiX } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext.jsx';

const links = [
  ['Home', '/#home'],
  ['About', '/#about'],
  ['Projects', '/#projects'],
  ['Certificates', '/#certificates'],
  ['Contact', '/#contact'],
  ['Resume', '/resume']
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(height ? (window.scrollY / height) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="site-header">
      <div className="scroll-progress" style={{ width: `${progress}%` }} />
      <nav className="nav-shell">
        <Link className="brand" to="/">Portfolio<span>.</span></Link>
        <div className={open ? 'nav-links open' : 'nav-links'}>
          {links.map(([label, href]) =>
            href.startsWith('/#') ? <a key={label} href={href} onClick={() => setOpen(false)}>{label}</a> : <NavLink key={label} to={href} onClick={() => setOpen(false)}>{label}</NavLink>
          )}
        </div>
        <div className="nav-actions">
          <button className="icon-btn" onClick={toggleTheme} aria-label="Toggle theme" type="button">
            {theme === 'dark' ? <FiSun /> : <FiMoon />}
          </button>
          <button className="icon-btn menu-btn" onClick={() => setOpen((value) => !value)} aria-label="Toggle menu" type="button">
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
