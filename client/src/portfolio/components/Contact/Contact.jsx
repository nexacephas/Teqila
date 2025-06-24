import React, { useEffect, useState } from 'react';
import './Contact.css';
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaCheckCircle,
} from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import toast from 'react-hot-toast';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

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

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
      phone: Yup.string().required('Phone is required'),
      message: Yup.string().required('Message is required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      const formData = new FormData();
      formData.append('access_key', 'b0d63608-782b-495a-a8ab-03c7d80e1c92');
      formData.append('name', values.name);
      formData.append('email', values.email);
      formData.append('phone', values.phone);
      formData.append('message', values.message);

      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();

        if (data.success) {
          toast.success('Message sent!');
          setSuccess(true);
          resetForm();
          setTimeout(() => setSuccess(false), 3000);
        } else {
          toast.error('Error sending message.');
        }
      } catch {
        toast.error('Network error.');
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <h2 className="section-title">Let's Connect</h2>
        <p className="sub-text">Have a project in mind or want to collaborate? Reach out!</p>

        <div className="contact-grid">
          {/* Info Left */}
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
              <a href="https://wa.me/2348123456789" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <i className="fab fa-whatsapp" />
              </a>
              <a href="https://www.instagram.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="https://www.facebook.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FaFacebook />
              </a>
              <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="https://www.linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in" />
              </a>
            </div>

          </div>

          {/* Form Right */}
          <form className="contact-form" onSubmit={formik.handleSubmit}>
            <input type="hidden" name="access_key" value="b0d63608-782b-495a-a8ab-03c7d80e1c92" />

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={formik.touched.name && formik.errors.name ? 'error' : ''}
            />
            {formik.touched.name && formik.errors.name && (
              <span className="error-tooltip">{formik.errors.name}</span>
            )}

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={formik.touched.email && formik.errors.email ? 'error' : ''}
            />
            {formik.touched.email && formik.errors.email && (
              <span className="error-tooltip">{formik.errors.email}</span>
            )}

            <PhoneInput
              international
              defaultCountry="NG"
              name="phone"
              placeholder="Your Phone"
              value={formik.values.phone}
              onChange={(value) => formik.setFieldValue('phone', value)}
              className={`phone-input ${formik.touched.phone && formik.errors.phone ? 'error' : ''}`}
            />
            {formik.touched.phone && formik.errors.phone && (
              <span className="error-tooltip">{formik.errors.phone}</span>
            )}

            <textarea
              name="message"
              rows="5"
              placeholder="Your Message"
              value={formik.values.message}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={formik.touched.message && formik.errors.message ? 'error' : ''}
            />
            {formik.touched.message && formik.errors.message && (
              <span className="error-tooltip">{formik.errors.message}</span>
            )}

            <button type="submit" disabled={loading}>
              {loading ? 'Sending...' : success ? <><FaCheckCircle /> Sent</> : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
