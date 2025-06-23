import React, { useState, useEffect } from 'react';
import './Navbar.css';
import {
  FaHome,
  FaUser,
  FaFolderOpen,
  FaEnvelope,
  FaMoon,
  FaSun,
  FaExternalLinkAlt,
} from 'react-icons/fa';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState('home');
  const [darkTheme, setDarkTheme] = useState(true);

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
    document.documentElement.setAttribute('data-theme', darkTheme ? 'light' : 'dark');
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setActive(id);
    setMobileOpen(false);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'contact'];
      let current = active;

      for (let id of sections) {
        const section = document.getElementById(id);
        if (section) {
          const top = section.offsetTop - 100;
          const bottom = top + section.offsetHeight;
          if (window.scrollY >= top && window.scrollY < bottom) {
            current = id;
          }
        }
      }

      if (current !== active) setActive(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [active]);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="logo">Ibidola Ajoke</div>

        {/* Nav Links */}
        <div className={`nav-links ${mobileOpen ? 'mobile-active' : ''}`}>
          <ul>
            <li className={active === 'home' ? 'active' : ''} onClick={() => scrollTo('home')}>
              <FaHome /> Home
            </li>
            <li className={active === 'about' ? 'active' : ''} onClick={() => scrollTo('about')}>
              <FaUser /> About
            </li>
            <li className={active === 'projects' ? 'active' : ''} onClick={() => scrollTo('projects')}>
              <FaFolderOpen /> Projects
            </li>
            <li className={active === 'contact' ? 'active' : ''} onClick={() => scrollTo('contact')}>
              <FaEnvelope /> Contact
            </li>

            {/* Brand Button - Mobile only */}
            <li className="mobile-only">
              <a className="brand-link" href="/brand">
                <FaExternalLinkAlt /> Brand Site
              </a>
            </li>
          </ul>
        </div>

        {/* Right Side Actions */}
        <div className="actions">
          {/* Theme Toggle */}
          <button className="theme-toggle" onClick={toggleTheme}>
            {darkTheme ? <FaSun /> : <FaMoon />}
          </button>

          {/* Brand Button - Desktop only */}
          <a className="brand-link desktop-only" href="/brand">
            <FaExternalLinkAlt /> Brand Site
          </a>

          {/* Hamburger Menu */}
          <div className={`hamburger ${mobileOpen ? 'active' : ''}`} onClick={() => setMobileOpen(!mobileOpen)}>
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
