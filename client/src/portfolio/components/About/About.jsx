import React, { useEffect } from 'react';
import './About.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaDownload } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useEffect(() => {
    // Animations
    gsap.from('.about-left', {
      scrollTrigger: { trigger: '.about-left', start: 'top 85%' },
      x: -60,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
    });

    gsap.from('.about-right', {
      scrollTrigger: { trigger: '.about-right', start: 'top 85%' },
      x: 60,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
    });

    // Stat counter
    const numbers = document.querySelectorAll('.stat-number');
    numbers.forEach((el) => {
      const target = +el.getAttribute('data-count');
      gsap.fromTo(
        el,
        { innerText: 0 },
        {
          innerText: target,
          duration: 2,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            once: true,
          },
          snap: { innerText: 1 },
          onUpdate: () => {
            el.innerText = Math.floor(el.innerText);
          },
        }
      );
    });
  }, []);

  return (
    <section id="about" className="about">
      <div className="about-container">
        <div className="about-left">
          <h2 className="section-title">About Me</h2>
          <p>
            I’m <strong>Ibidola Ajoke Oluwabukunmi</strong>, a fashion designer blending African heritage with modern silhouettes.
          </p>
          <p>
            From tailoring to styling and runway looks, I craft garments that empower and inspire. Fashion is my language of elegance and emotion.
          </p>

          <a href="/client/public/assets/Nexa_Cephas_Resume_2025.pdf" className="resume-btn" download>
            <FaDownload /> Download Resume
          </a>

          <div className="about-stats">
            <div className="stat">
              <h3 className="stat-number" data-count="5">0</h3>
              <p>Years Experience</p>
            </div>
            <div className="stat">
              <h3 className="stat-number" data-count="80">0</h3>
              <p>Custom Projects</p>
            </div>
            <div className="stat">
              <h3 className="stat-number" data-count="15">0</h3>
              <p>Runway Appearances</p>
            </div>
          </div>

          <blockquote className="designer-quote">
            “Elegance isn’t what you wear — it’s what you evoke.”
          </blockquote>
        </div>

        <div className="about-right">
          <div className="image-box">
            <img src="/assets/designer.jpg" alt="Designer" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
