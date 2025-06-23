import React, { useEffect } from 'react';
import './Contact.css';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  useEffect(() => {
    gsap.from('.contact-container', {
      scrollTrigger: {
        trigger: '.contact-section',
        start: 'top 80%',
      },
      y: 80,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
    });
  }, []);

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <h2 className="section-title">Let's Connect</h2>
        <p className="sub-text">Have a project in mind or want to collaborate? Reach out!</p>

        <div className="contact-grid">
          {/* Left Info */}
          <div className="contact-info">
            <div className="info-item">
              <FaEnvelope className="icon" />
              <p>ajoke.fashion@gmail.com</p>
            </div>
            <div className="info-item">
              <FaPhoneAlt className="icon" />
              <p>+234 812 345 6789</p>
            </div>
            <div className="info-item">
              <FaMapMarkerAlt className="icon" />
              <p>Lagos, Nigeria</p>
            </div>

            <div className="socials">
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaFacebook /></a>
              <a href="#"><FaTwitter /></a>
            </div>
          </div>

          {/* Right Form */}
          <form className="contact-form">
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea rows="5" placeholder="Your Message" required />
            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
