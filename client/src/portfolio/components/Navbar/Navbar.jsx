import React, { useState, useEffect } from 'react';
import './Navbar.css';
import {
  FaHome,
  FaUser,
  FaFolderOpen,
  FaCommentDots,
  FaEnvelope,
  FaMoon,
  FaSun,
  FaExternalLinkAlt,
} from 'react-icons/fa';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState('home');
  const [darkTheme, setDarkTheme] = useState(true);

  // Load theme from localStorage on initial render
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    const isDark = storedTheme === 'dark' || !storedTheme;
    setDarkTheme(isDark);
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, []);

  // Persist theme change
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkTheme ? 'dark' : 'light');
    localStorage.setItem('theme', darkTheme ? 'dark' : 'light');
  }, [darkTheme]);

  const toggleTheme = () => {
    setDarkTheme(prev => !prev);
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActive(id);
      setMobileOpen(false);
    }
  };

  // Handle active link on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'testimonials', 'contact'];
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

        {/* Navigation Links */}
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
            <li className={active === 'testimonials' ? 'active' : ''} onClick={() => scrollTo('testimonials')}>
              <FaCommentDots /> Testimonials
            </li>
            <li className={active === 'contact' ? 'active' : ''} onClick={() => scrollTo('contact')}>
              <FaEnvelope /> Contact
            </li>
            {/* Brand Link — Mobile Only */}
            <li className="mobile-only">
              <a className="brand-link" href="/brand">
                <FaExternalLinkAlt /> Brand Site
              </a>
            </li>
          </ul>
        </div>

        {/* Actions: Theme Toggle, Brand Link, Hamburger */}
        <div className="actions">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {darkTheme ? <FaSun /> : <FaMoon />}
          </button>

          <a className="brand-link desktop-only" href="/brand">
            <FaExternalLinkAlt /> Brand Site
          </a>

          <div
            className={`hamburger ${mobileOpen ? 'active' : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setMobileOpen(!mobileOpen)}
          >
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
