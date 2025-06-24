import React, { useEffect, useState, useRef } from 'react';
import './Projects.css';
import { FaSearch, FaTimes } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

const projectData = [
  { id: 1, title: 'Modern Ankara', category: 'Runway', img: '/assets/project1.jpg' },
  { id: 2, title: 'Bridal Custom', category: 'Custom', img: '/assets/project2.jpg' },
  { id: 3, title: 'Afro Luxe', category: 'Editorial', img: '/assets/project3.jpg' },
  { id: 4, title: 'Evening Gown', category: 'Custom', img: '/assets/project4.jpg' },
  { id: 5, title: 'Bold Prints', category: 'Runway', img: '/assets/project5.jpg' },
  { id: 6, title: 'Vintage Vibe', category: 'Editorial', img: '/assets/project6.jpg' },
];

const categories = ['All', 'Runway', 'Custom', 'Editorial'];

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const modalRef = useRef();

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  // Escape key & tab trap
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };

    const handleTab = (e) => {
      if (selectedProject && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll('button, [href], [tabindex]:not([tabindex="-1"])');
        const first = focusable[0], last = focusable[focusable.length - 1];

        if (e.key === 'Tab') {
          if (e.shiftKey) {
            if (document.activeElement === first) {
              e.preventDefault(); last.focus();
            }
          } else {
            if (document.activeElement === last) {
              e.preventDefault(); first.focus();
            }
          }
        }
      }
    };

    window.addEventListener('keydown', handleEsc);
    window.addEventListener('keydown', handleTab);
    return () => {
      window.removeEventListener('keydown', handleEsc);
      window.removeEventListener('keydown', handleTab);
    };
  }, [selectedProject]);

  const filtered = selectedCategory === 'All'
    ? projectData
    : projectData.filter(p => p.category === selectedCategory);

  return (
    <section id="projects" className="projects" data-aos="fade-up">
      <h2 className="section-title">My Work</h2>

      <div className="project-filters">
        {categories.map(cat => (
          <button
            key={cat}
            className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="project-grid masonry">
        {filtered.map(project => (
          <div
            className="project-card hover-animate"
            key={project.id}
            data-aos="zoom-in"
            onClick={() => setSelectedProject(project)}
          >
            <img src={project.img} alt={project.title} />
            <div className="overlay">
              <h3>{project.title}</h3>
              <span>{project.category}</span>
              <FaSearch className="icon" />
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedProject && (
        <div className="modal fade-in" onClick={() => setSelectedProject(null)}>
          <div
            className="modal-content"
            onClick={e => e.stopPropagation()}
            ref={modalRef}
            tabIndex={-1}
          >
            <button className="close-btn" onClick={() => setSelectedProject(null)}>
              <FaTimes />
            </button>
            <img src={selectedProject.img} alt={selectedProject.title} />
            <h3>{selectedProject.title}</h3>
            <p>Category: {selectedProject.category}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
