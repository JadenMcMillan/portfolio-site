import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Contact() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    contactNumber: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Captured Values:', formData);
    // Returns user to the Home page after submission
    navigate('/');
  };

  return (
    <div className="container">
      <h1>Contact Me</h1>
      <p style={{ marginBottom: '2.5rem' }}>Have an inquiry or want to work together? Reach out directly or fill out the form.</p>
      
      {/* Responsive layout container: Info on the left, Form on the right */}
      <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap', marginTop: '1rem' }}>
        
        {/* --- Left Column: Contact Information --- */}
        <div style={{ flex: '1', minWidth: '280px' }}>
          <h2 style={{ fontSize: '1.4rem', marginBottom: '1.25rem' }}>Get in Touch</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <strong style={{ display: 'block', fontSize: '0.9rem', color: '#1c67a5', textTransform: 'uppercase' }}>📍 Location</strong>
              <span style={{ fontSize: '1.05rem', color: '#4b5563' }}>Hamilton, ON, Canada</span>
            </div>
            
            <div>
              <strong style={{ display: 'block', fontSize: '0.9rem', color: '#1c67a5', textTransform: 'uppercase' }}>📧 Email Address</strong>
              <a href="mailto:jaden.dev@example.com" style={{ fontSize: '1.05rem', color: '#111827', textDecoration: 'none' }}>
                jaden.mcmillan@gmail.com
              </a>
            </div>
            
            <div>
              <strong style={{ display: 'block', fontSize: '0.9rem', color: '#1c67a5', textTransform: 'uppercase' }}>📞 Phone Number</strong>
              <a href="tel:+19055550123" style={{ fontSize: '1.05rem', color: '#111827', textDecoration: 'none' }}>
                +1 (905) 991-4358
              </a>
            </div>

            <div style={{ marginTop: '1rem', paddingTop: '1.25rem', borderTop: '1px solid #e5e7eb' }}>
              <p style={{ fontSize: '0.95rem', color: '#6b7280', margin: 0 }}>
                * I usually respond within 24-48 hours. Please ensure your contact information is accurate for a prompt reply.
              </p>
            </div>
          </div>
        </div>

        {/* --- Right Column: Interactive Form --- */}
        <div style={{ flex: '1.5', minWidth: '320px', backgroundColor: '#fff', padding: '2rem', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: '1.4rem', marginBottom: '1.25rem' }}>Send a Message</h2>
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '130px' }}>
                <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
              </div>
              <div style={{ flex: 1, minWidth: '130px' }}>
                <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
              </div>
            </div>
            
            <input type="tel" name="contactNumber" placeholder="Contact Number" value={formData.contactNumber} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
            <textarea name="message" placeholder="Your Message" rows="5" value={formData.message} onChange={handleChange} required></textarea>
            
            <button type="submit" style={{ marginTop: '0.5rem', width: '100%' }}>
              Submit Message
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}

export default Contact;
