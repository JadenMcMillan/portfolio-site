import React from 'react';
// 1. Import project images from assets directory
import squishImg from '../assets/squish.png';
import memberImg from '../assets/member.png';
import galleryImg from '../assets/gallery.png';

function Projects() {
  // 2. Add imported image variables directly into project objects
  const projectList = [
    { 
      id: 1, 
      title: 'Squish the Bug - Javascript Game', 
      role: 'Student Project', 
      outcome: 'Developed an interactive browser-based game using HTML, CSS, and Javascript.', 
      desc: 'A fully functional game where players click on moving bugs to score points, demonstrating proficiency in DOM manipulation and event handling.',
      image: squishImg,
      link: 'http://studentweb.cencol.ca/jmcmill9/Assignment%205/Assignment5.html'
    },

    { 
      id: 2, 
      title: 'Member Registration Form', 
      role: 'Student Project', 
      outcome: 'Implemented a form that allows users to register and submit their information.', 
      desc: 'A web form that collects user data, validates input, and provides a confirmation message, showcasing skills in form handling and user experience design.',
      image: memberImg,
      link: 'http://studentweb.cencol.ca/jmcmill9/CSWD%20Assignment%204/Assignment4.html'
    },
    
    { 
      id: 3, 
      title: 'Image Gallery', 
      role: 'Student Project', 
      outcome: 'Created a dynamic image gallery that displays images in a grid layout with hover effects.', 
      desc: 'A responsive image gallery that allows users to view and interact with a collection of images using modern web technologies.',
      image: galleryImg,
      link: 'http://studentweb.cencol.ca/jmcmill9/Assignment%206%20-%20Client%20Side%20Web%20Development/index.html'
    }
  ];

  return (
    <div className="container">
      <h1>My Projects</h1>
      <p>A selection of web development projects highlighting design and development skills.</p>
      
      <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', marginTop: '2rem' }}>
        {projectList.map((proj) => (
          <div key={proj.id} style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}>
            
            <img 
              src={proj.image} 
              alt={proj.title} 
              style={{ width: '100%', height: '200px', objectFit: 'cover' }} 
            />
            
            <div style={{ padding: '1.5rem', flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'between' }}>
              <div>
                <h2 style={{ fontSize: '1.4rem', marginBottom: '0.75rem' }}>{proj.title}</h2>
                <p style={{ fontSize: '1rem', marginBottom: '1rem', color: '#4b5563' }}>{proj.desc}</p>
                <div style={{ fontSize: '0.95rem', borderTop: '1px solid #f3f4f6', paddingTop: '1rem', marginBottom: '1.5rem' }}>
                  <p style={{ margin: '0.25rem 0' }}><strong>Role:</strong> {proj.role}</p>
                  <p style={{ margin: '0.25rem 0' }}><strong>Outcome:</strong> {proj.outcome}</p>
                </div>
              </div>

              {/* 2. Render clean button-style external link at the bottom of card */}
              <a 
                href={proj.link} 
                target="_blank" 
                rel="noreferrer" 
                style={{ 
                  display: 'block', 
                  textAlign: 'center',
                  backgroundColor: '#1f2937', 
                  color: 'white', 
                  textDecoration: 'none', 
                  padding: '0.6rem 1rem', 
                  borderRadius: '6px', 
                  fontWeight: '600',
                  fontSize: '0.95rem',
                  transition: 'background-color 0.2s ease',
                  marginTop: 'auto'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#374151'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#1f2937'}
              >
                View Live Project →
              </a>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;