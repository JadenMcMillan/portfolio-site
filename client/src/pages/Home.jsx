import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  // A clean data subset to populate a scannable skills sector
  const coreSkills = [
    { name: 'React.js & Hooks', category: 'Frontend' },
    { name: 'JavaScript', category: 'Language' },
    { name: 'Responsive UI Design', category: 'Design' },
    { name: 'Git & Version Control', category: 'Tools' }
  ];

  return (
    <div className="container" style={{ padding: '4rem 2rem' }}>
      
      {/* --- Section 1: Dynamic Hero Header Section --- */}
      <section style={{ textAlign: 'center', marginBottom: '5rem', padding: '2rem 0' }}>
        <span style={{ color: '#000000', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.9rem', display: 'block', marginBottom: '0.75rem' }}>
          Available for Select Opportunities
        </span>
        <h1 style={{ background: 'linear-gradient(to right, #94e0ab, #154922)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: '3.25rem', marginBottom: '1.25rem', lineHeight: '1.15' }}>
          Crafting Clean Code & <br />
          <span style={{ background: 'linear-gradient(to right, #c76969, #631010)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Functional Digital Experiences
          </span>
        </h1>
        <p style={{ maxWidth: '650px', margin: '0 auto 2.5rem auto', fontSize: '1.2rem', color: '#4b5563' }}>
          Welcome to my Portfolio! I am a Software Engineering Technology student with an interest in developing software. This portfolio showcases my projects, skills, and experiences that highlight my capabilities in the field of software development.
        </p>
        
        {/* Primary Action Row */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    {/* Main required button that directs visitors to the About Page */}
          <Link to="/about">
            <button style={{ backgroundColor: '#2563eb', padding: '0.85rem 2rem' }}>
              Learn More About Me
            </button>
          </Link>
          <Link to="/projects">
            <button style={{ backgroundColor: '#2563eb', padding: '0.85rem 2rem' }}>
              Explore My Projects →
            </button>
          </Link>
          <Link to="/contact">
            <button style={{ backgroundColor: '#fff', color: '#1f2937', border: '1px solid #d1d5db', padding: '0.85rem 2rem' }}
                    onMouseOver={(e) => { e.target.style.backgroundColor = '#f9fafb'; }}
                    onMouseOut={(e) => { e.target.style.backgroundColor = '#fff'; }}>
              Get in Touch
            </button>
          </Link>
        </div>
      </section>

      {/* --- Section 2: Scannable Tech Stack Highlights --- */}
      <section style={{ borderTop: '1px solid #e5e7eb', paddingTop: '4rem', marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '1.5rem', textAlign: 'center', marginBottom: '2.5rem', color: '#376ec2' }}>
          Core Competencies & Technical Ecosystem
        </h2>
        <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
          {coreSkills.map((skill, index) => (
            <div key={index} style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', padding: '1.5rem', borderRadius: '10px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)', textAlign: 'center' }}>
              <span style={{ fontSize: '0.8rem', color: '#6b7280', fontWeight: '600', display: 'block', marginBottom: '0.25rem', textTransform: 'uppercase' }}>
                {skill.category}
              </span>
              <h3 style={{ fontSize: '1.15rem', color: '#1f2937', margin: 0 }}>{skill.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* --- Section 3: Summary Call-To-Action Mission Banner --- */}
      <section style={{ backgroundColor: '#6b3232', color: 'white', borderRadius: '16px', padding: '3rem', textAlign: 'center', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
        <h2 style={{ color: '#ffffff', fontSize: '1.75rem', marginBottom: '1rem' }}>Interested in building a project together?</h2>
        <p style={{ color: '#9ca3af', maxWidth: '550px', margin: '0 auto 2rem auto', fontSize: '1.05rem' }}>
          Whether you need web development, mobile app development, or API integration, let's connect!
        </p>
        <Link to="/about">
          <span style={{ color: '#ffffff', fontWeight: '600', textDecoration: 'none', fontSize: '1.05rem', cursor: 'pointer' }}>
            Read My Professional Biography &rarr;
          </span>
        </Link>
      </section>

    </div>
  );
}

export default Home;
