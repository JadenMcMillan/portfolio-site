import React, { useState } from 'react';
import { apiRequest } from '../services/api';

export default function Contact() {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', contactNumber: '', email: '', message: '' });
  const [status, setStatus] = useState({ loading: false, error: '', success: '' });
  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  async function handleSubmit(e) {
    e.preventDefault(); setStatus({ loading: true, error: '', success: '' });
    try {
      await apiRequest('/contacts', { method: 'POST', body: JSON.stringify(formData) });
      setStatus({ loading: false, error: '', success: 'Your message was submitted successfully.' });
      setFormData({ firstName: '', lastName: '', contactNumber: '', email: '', message: '' });
    } catch (error) { setStatus({ loading: false, error: error.message, success: '' }); }
  }

  return <div className="container">
    <h1>Contact Me</h1>
    <p style={{ marginBottom: '2rem' }}>Have an inquiry or want to work together? Send me a message.</p>
    <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
      <section style={{ flex: 1, minWidth: 260 }}>
        <h2>Get in Touch</h2>
        <p><strong>Location</strong><br />Hamilton, ON, Canada</p>
        <p><strong>Email</strong><br /><a href="mailto:jaden.mcmillan@gmail.com">jaden.mcmillan@gmail.com</a></p>
        <p><strong>Phone</strong><br /><a href="tel:+19059914358">+1 (905) 991-4358</a></p>
      </section>
      <section style={{ flex: 1.5, minWidth: 300 }}>
        <h2>Send a Message</h2>
        <form onSubmit={handleSubmit} className="portfolio-form">
          <div className="form-row">
            <label>First name<input name="firstName" value={formData.firstName} onChange={handleChange} required /></label>
            <label>Last name<input name="lastName" value={formData.lastName} onChange={handleChange} required /></label>
          </div>
          <label>Contact number<input name="contactNumber" type="tel" value={formData.contactNumber} onChange={handleChange} /></label>
          <label>Email<input name="email" type="email" value={formData.email} onChange={handleChange} required /></label>
          <label>Message<textarea name="message" rows="5" value={formData.message} onChange={handleChange} required minLength={5} /></label>
          {status.error && <p role="alert" className="form-error">{status.error}</p>}
          {status.success && <p role="status" className="form-success">{status.success}</p>}
          <button type="submit" disabled={status.loading}>{status.loading ? 'Sending…' : 'Submit Message'}</button>
        </form>
      </section>
    </div>
  </div>;
}
