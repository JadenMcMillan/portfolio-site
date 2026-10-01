import React from 'react';
// 1. Import photo from assets directory
import profilePic from '../assets/Profile.jpg';

function About() {
  return (
    <div className="container">
      <h1>About Me</h1>
      <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap', alignItems: 'center', marginTop: '2rem' }}>
        
        {/* 2. Passes imported variable into the src attribute */}
        <img 
          src={profilePic} 
          alt="Jaden's Profile Picture" 
          style={{ 
            borderRadius: '50%', 
            width: '180px', 
            height: '180px', 
            objectFit: 'cover', 
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' 
          }} 
        />
        
        <div style={{ flex: '1', minWidth: '300px' }}>
          <h2>Software Engineering Technology Student</h2>
          <p>
            My name is Jaden and I am 26. I am currently pursuing an Advanced Diploma in Software Engineering Technology at Centennial College, where I am in my 3rd semester of developing my skills and expanding my knowledge in the field of software development. I am dedicated, adaptable, and passionate about everything from coding and software development, to building modern web applications and designs. 
          </p>
          <p>
            I have a strong interest in emerging technologies and learning everything there is to know about them. My goal is to leverage my skills and knowledge to contribute to innovative projects and make a positive impact in the tech industry.
          </p>
          <p>
            In addition to my academic pursuits, I am constantly seeking opportunities to learn and grow as a developer and to apply my technical skills, gain hands-on experience, and contribute to a professional development team.
          </p>
          <p>
            Thank you for visiting! Please feel free to explore my portfolio as I have included a selection of my projects, skills, and experiences.
          </p>
          <p>
            Please see below for my Resume:
          </p>
          <p style={{ marginTop: '1.5rem' }}>
            📄 <a 
              href="/resume.pdf" 
              target="_blank" 
              rel="noreferrer" 
              download="resume.pdf"
              style={{ color: '#000000', fontWeight: '600', textDecoration: 'none' }}
            >
              Download My Resume (PDF)
            </a>
          </p>
          
        </div>
      </div>
    </div>
  );
}

export default About;
