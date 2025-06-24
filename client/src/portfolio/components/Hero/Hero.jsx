import React, { useEffect, useState, useRef } from 'react';
import './Hero.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Typewriter } from 'react-simple-typewriter';
const Hero = () => {
  const videos = [
    './assets/4110390-uhd_3840_2160_30fps.mp4',
    './assets/5743177-uhd_4096_2160_25fps.mp4',
    './assets/6459959-hd_1080_1920_30fps.mp4',
    './assets/7998251-hd_1080_1920_24fps.mp4',
    './assets/5758580-uhd_2160_3840_30fps.mp4',
    './assets/8030194-hd_1080_1920_24fps.mp4',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef(null);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % videos.length);
    }, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, [videos.length]);

  const nextVideo = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  };

  const prevVideo = () => {
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  return (
    <section id="hero" className="hero" data-aos="fade-up">
      <video
        key={currentIndex}
        className="hero-bg-video"
        autoPlay
        muted
        loop
        playsInline
        ref={videoRef}
        src={videos[currentIndex]}
      />
      <div className="hero-overlay" />

      {/* Manual Controls */}
      <button className="nav-btn prev" onClick={prevVideo}>
        <FaChevronLeft />
      </button>
      <button className="nav-btn next" onClick={nextVideo}>
        <FaChevronRight />
      </button>

      <div className="hero-content">
        <div className="text-content">
          <h1 className="designer-name">Ibidola Ajoke Oluwabukunmi</h1>
          <p className="title">Fashion Designer</p>
          <p className="tagline typing">
            <Typewriter
              words={['Blending tradition with bold silhouettes', 'Elevating African elegance', 'Timeless. Fearless. You.']}
              loop
              cursor
              typeSpeed={60}
              deleteSpeed={40}
              delaySpeed={2000}
            />
          </p>
                    <div className="hero-buttons">
            <button onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}>
              View Work <FaArrowRight />
            </button>
            <a href="#contact" className="outline-btn">
              Book Appointment
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
