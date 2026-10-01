import React from 'react';

function Services() {
  const services = [
    { title: '💻 Web Development', desc: 'Building responsive, dynamic, and fast landing pages and complex single-page apps using modern engineering standards.' },
    { title: '📱 Mobile App Development', desc: 'Crafting intuitive cross-platform mobile interfaces matching strict layout guidelines.' },
    { title: '⚙️ API Integration', desc: 'Connecting client-side ecosystems safely to microservices, external libraries, and third-party relational databases.' }
  ];

  return (
    <div className="container">
      <h1>Services I Offer</h1>
      <p>Leveraging modern technical ecosystems to scale engineering products and solutions.</p>
      
      <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', marginTop: '2rem' }}>
        {services.map((service, index) => (
          <div key={index} style={{ padding: '2rem', backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontSize: '1.35rem', color: '#111827', marginBottom: '0.75rem' }}>{service.title}</h3>
            <p style={{ margin: 0, color: '#4b5563', fontSize: '1rem', lineHeight: '1.6' }}>{service.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;
