import React from 'react';
import './Footer.css';
import {
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaArrowUp,
} from 'react-icons/fa';

const Footer = () => {
  const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};


  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Top Section */}
        <div className="footer-top">
          <h2 className="footer-logo">Ibidola Ajoke</h2>

          <ul className="footer-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>

          <div className="footer-socials">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="newsletter fade-in">
          <h3>Subscribe to Our Newsletter</h3>
          <p>Get the latest updates, collection drops and style tips in your inbox.</p>

          <form
            className="newsletter-form"
            method="POST"
            action="https://api.web3forms.com/submit"
          >
            <input type="hidden" name="access_key" value="b0d63608-782b-495a-a8ab-03c7d80e1c92" />
            <input type="email" name="email" placeholder="Your Email Address" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>

        {/* Bottom */}
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Ibidola Ajoke. All rights reserved.</p>
          <button onClick={scrollToTop} className="scroll-top">
  <FaArrowUp />
</button>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
