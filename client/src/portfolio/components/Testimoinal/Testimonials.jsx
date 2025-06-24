import React, { useRef, useState, useEffect } from 'react';
import './Testimonials.css';
import {
  FaStar, FaStarHalfAlt, FaRegStar,
  FaPause, FaPlay, FaArrowLeft, FaArrowRight
} from 'react-icons/fa';
import { Typewriter } from 'react-simple-typewriter';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const testimonials = [
  {
    name: "Adeola O.",
    rating: 5,
    quote: "Ajoke’s pieces are nothing short of magical. I felt like royalty!",
    photo: '/assets/client1.png',
  },
  {
    name: "Zainab B.",
    rating: 4.5,
    quote: "The custom dress was perfect for my wedding — elegant and bold!",
    photo: '/assets/client2.png',
  },
  {
    name: "Chidera K.",
    rating: 5,
    quote: "I love how she blends culture and style effortlessly.",
    photo: '/assets/client3.png',
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

const Testimonials = () => {
  const swiperRef = useRef(null);
  const sectionRef = useRef(null);
  const [autoplaying, setAutoplaying] = useState(true);
  const [showArrows, setShowArrows] = useState(false);

  const toggleAutoplay = () => {
    if (!swiperRef.current) return;
    if (autoplaying) {
      swiperRef.current.autoplay.stop();
    } else {
      swiperRef.current.autoplay.start();
    }
    setAutoplaying(!autoplaying);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowArrows(entry.isIntersecting);
      },
      { threshold: 0.4 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section className="testimonial-section" id="testimonials" ref={sectionRef}>
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

      <div className="testimonial-controls">
        <button onClick={toggleAutoplay} className="autoplay-btn">
          {autoplaying ? <FaPause /> : <FaPlay />} {autoplaying ? 'Pause' : 'Play'}
        </button>

        {showArrows && (
          <div className="nav-buttons">
            <button className="swiper-button-prev"><FaArrowLeft /></button>
            <button className="swiper-button-next"><FaArrowRight /></button>
          </div>
        )}
      </div>

      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {testimonials.map((t, i) => (
          <SwiperSlide key={i}>
            <div className="testimonial-card">
              <img src={t.photo} alt={t.name} className="client-photo" />
              <p className="quote">“{t.quote}”</p>
              <StarRating rating={t.rating} />
              <h4 className="client-name">— {t.name}</h4>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Testimonials;
