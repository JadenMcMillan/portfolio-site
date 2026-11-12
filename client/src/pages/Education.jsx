import React, { useEffect, useState } from 'react';
import { apiRequest } from '../services/api';

export default function Education() {
  const [qualifications, setQualifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => { apiRequest('/qualifications').then(setQualifications).catch(err => setError(err.message)).finally(() => setLoading(false)); }, []);
  return <main className="container">
    <h1>Education &amp; Qualifications</h1><p>Academic credentials and qualifications stored in the portfolio database.</p>
    {loading && <p>Loading qualifications…</p>}{error && <p role="alert" className="form-error">{error}</p>}
    {!loading && !error && qualifications.length === 0 && <p>No qualifications have been added yet.</p>}
    <div className="data-grid">{qualifications.map(item => <article className="data-card" key={item._id}><h2>{item.title}</h2><p>{item.description}</p><small>Completed: {new Date(item.completionDate).toLocaleDateString()}</small></article>)}</div>
  </main>;
}
