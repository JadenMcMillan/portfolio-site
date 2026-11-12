import React, { useEffect, useState } from 'react';
import { apiRequest } from '../services/api';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => { apiRequest('/projects').then(setProjects).catch(err => setError(err.message)).finally(() => setLoading(false)); }, []);
  return <main className="container">
    <h1>My Projects</h1><p>A selection of projects stored in the portfolio database.</p>
    {loading && <p>Loading projects…</p>}{error && <p role="alert" className="form-error">{error}</p>}
    {!loading && !error && projects.length === 0 && <p>No projects have been added yet.</p>}
    <div className="data-grid">{projects.map(project => <article className="data-card" key={project._id}><h2>{project.title}</h2><p>{project.description}</p><small>Completed: {new Date(project.completionDate).toLocaleDateString()}</small></article>)}</div>
  </main>;
}
