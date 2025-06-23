// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Portfolio Pagesimport PortfolioHero from './portfolio/components/Hero';
// import About from './portfolio/pages/About';
// import Projects from './portfolio/pages/Projects';
// import Press from './portfolio/pages/Press';
// import Contact from './portfolio/pages/Contact';
import Navbar from './portfolio/components/Navbar/Navbar';
import './index.css';
import Hero from './portfolio/components/Hero/Hero';
import About from './portfolio/components/About/About';
import Projects from './portfolio/components/Projects/Projects';
import Testimonials from './portfolio/components/Testimoinal/Testimonials';
import Contact from './portfolio/components/Contact/Contact';
import Footer from './portfolio/components/Footer/Footer';
// Brand Pages
// import BrandHero from './brand/pages/Hero';
// import About from './brand/pages/About';
// import Collections from './brand/pages/Collections';
// import Services from './brand/pages/Services';
// import Testimonials from './brand/pages/Testimonials';
// import Contact from './brand/pages/Contact';

function App() {
  return ( 
    <>
      <Navbar/>
      <Hero/> 
      <About/>
      <Projects/>
      <Testimonials/>
      <Contact/>
      <Footer/>
      <Router>
        <Routes>
          {/* Portfolio Routes */}
          {/* <Route path="/portfolio/about" element={<About />} />
          <Route path="/portfolio/projects" element={<Projects />} />
          <Route path="/portfolio/press" element={<Press />} />
          <Route path="/portfolio/contact" element={<Contact />} /> */}

          {/* Brand Routes */}
          {/* <Route path="/brand" element={<BrandHero />} />
          <Route path="/brand/about" element={<About />} />
          <Route path="/brand/collections" element={<Collections />} />
          <Route path="/brand/services" element={<Services />} />
          <Route path="/brand/testimonials" element={<Testimonials />} />
          <Route path="/brand/contact" element={<Contact />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
