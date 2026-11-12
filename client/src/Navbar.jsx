import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getStoredUser, getToken, signout } from './services/authService';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(getStoredUser);
  const [busy, setBusy] = useState(false);
  useEffect(() => { setUser(getStoredUser()); }, [location.pathname]);
  async function handleSignout() {
    setBusy(true);
    try { await signout(); } finally { setUser(null); setBusy(false); navigate('/login'); }
  }
  const linkStyle = path => ({ color: location.pathname === path ? '#fff' : '#9ca3af', textDecoration: 'none', fontWeight: 600 });
  const buttonStyle = { background: '#f63b3b', color: '#fff', border: 0, borderRadius: 6, padding: '.6rem 1rem', fontWeight: 600, cursor: 'pointer' };
  return <nav className="site-nav">
    <Link to="/" className="brand">Jaden<span>.Dev</span></Link>
    <div className="nav-links">
      <Link to="/" style={linkStyle('/')}>Home</Link><Link to="/about" style={linkStyle('/about')}>About</Link>
      <Link to="/projects" style={linkStyle('/projects')}>Projects</Link><Link to="/education" style={linkStyle('/education')}>Education</Link>
      <Link to="/services" style={linkStyle('/services')}>Services</Link><Link to="/contact" style={linkStyle('/contact')}>Contact</Link>
      {getToken() && user?.isAdmin && <Link to="/admin" style={linkStyle('/admin')}>Admin</Link>}
      {getToken() ? <button style={buttonStyle} onClick={handleSignout} disabled={busy}>{busy ? 'Signing out…' : 'Sign Out'}</button> : <><Link to="/login" style={buttonStyle}>Sign In</Link><Link to="/signup" style={buttonStyle}>Sign Up</Link></>}
    </div>
  </nav>;
}
