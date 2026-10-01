import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  // Helper to dynamically style navigation links
  const linkStyle = (path) => ({
    color: location.pathname === path ? '#ffffff' : '#9ca3af',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '1rem',
    transition: 'color 0.2s ease',
  });

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', background: '#111827', color: 'white' }}>
      
      {/* --- Original Branding Logo Element --- */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'white', textDecoration: 'none' }}>
          
          {/* Custom Original Vector Mark */}
          <svg width="36" height="36" viewBox="0 0 100 100" fill="none" xmlns="http://w3.org">
            <path d="M50 5L90 28v44L50 95L10 72V28L50 5z" stroke="#f63b3b" strokeWidth="6" strokeLinejoin="round" />
            <path d="M35 38L20 50L35 62" stroke="#fa6060" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M65 38L80 50L65 62" stroke="#fa6060" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="50" cy="50" r="10" fill="#f63b3b" />
          </svg>
          
          {/* Typography Element with Gradient */}
          <span style={{ fontWeight: '800', fontSize: '1.4rem', letterSpacing: '-0.03em', background: 'linear-gradient(to right, #ffffff, #9ca3af)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Jaden<span style={{ color: '#f63b3b' }}>.Dev</span>
          </span>
          
        </Link>
      </div>

      {/* --- Main Navigation Links matching typography styles --- */}
      <ul style={{ display: 'flex', listStyle: 'none', gap: '1.75rem', margin: 0, padding: 0, alignItems: 'center' }}>
        <li><Link to="/" style={linkStyle('/')}>Home</Link></li>
        <li><Link to="/about" style={linkStyle('/about')}>About</Link></li>
        <li><Link to="/projects" style={linkStyle('/projects')}>Projects</Link></li>
        <li><Link to="/education" style={linkStyle('/education')}>Education</Link></li>
        <li><Link to="/services" style={linkStyle('/services')}>Services</Link></li>
        <li><Link to="/contact" style={linkStyle('/contact')}>Contact</Link></li>
      </ul>

    </nav>
  );
}

export default Navbar;
