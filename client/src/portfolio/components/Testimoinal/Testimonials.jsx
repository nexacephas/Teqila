import React, { useEffect } from 'react';
import './Testimonials.css';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { Typewriter } from 'react-simple-typewriter';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Adeola O.",
    rating: 5,
    quote: "Ajoke’s pieces are nothing short of magical. I felt like royalty!",
  },
  {
    name: "Zainab B.",
    rating: 4,
    quote: "The custom dress was perfect for my wedding — elegant and bold!",
  },
  {
    name: "Chidera K.",
    rating: 5,
    quote: "I love how she blends culture and style effortlessly.",
  },
];

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const stars = [];

  for (let i = 0; i < fullStars; i++) stars.push(<FaStar key={i} />);
  if (halfStar) stars.push(<FaStarHalfAlt key="half" />);
  while (stars.length < 5) stars.push(<FaRegStar key={`empty-${stars.length}`} />);

  return <div className="stars">{stars}</div>;
};

const Testimonial = () => {
  useEffect(() => {
    gsap.from('.testimonial-card', {
      scrollTrigger: {
        trigger: '.testimonial-section',
        start: 'top 80%',
      },
      y: 60,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      stagger: 0.2,
    });
  }, []);

  return (
    <section className="testimonial-section" id="testimonials">
      <h2 className="section-title">
        <Typewriter
          words={['What Clients Say', 'Love From Clients', 'Their Experience']}
          loop
          cursor
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={2000}
        />
      </h2>

      <div className="testimonial-grid">
        {testimonials.map((t, i) => (
          <div className="testimonial-card" key={i}>
            <p className="quote">“{t.quote}”</p>
            <StarRating rating={t.rating} />
            <h4 className="client-name">— {t.name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonial;
