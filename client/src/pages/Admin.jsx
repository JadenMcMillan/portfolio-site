import React, { useEffect, useState } from 'react';
import { apiRequest } from '../services/api';

const sections = {
  projects: { label: 'Projects', endpoint: '/projects', fields: [{ name: 'title', label: 'Title', type: 'text' }, { name: 'completionDate', label: 'Completion date', type: 'date' }, { name: 'description', label: 'Description', type: 'textarea' }] },
  qualifications: { label: 'Qualifications', endpoint: '/qualifications', fields: [{ name: 'title', label: 'Title', type: 'text' }, { name: 'completionDate', label: 'Completion date', type: 'date' }, { name: 'description', label: 'Description', type: 'textarea' }] },
  contacts: { label: 'Contact submissions', endpoint: '/contacts', fields: [{ name: 'firstName', label: 'First name', type: 'text' }, { name: 'lastName', label: 'Last name', type: 'text' }, { name: 'email', label: 'Email', type: 'email' }, { name: 'contactNumber', label: 'Contact number', type: 'text' }, { name: 'message', label: 'Message', type: 'textarea' }] },
};
const blank = fields => Object.fromEntries(fields.map(field => [field.name, '']));

export default function Admin() {
  const [active, setActive] = useState('projects');
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(blank(sections.projects.fields));
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const section = sections[active];

  async function refresh() {
    setLoading(true); setError('');
    try { setItems(await apiRequest(section.endpoint)); }
    catch (err) { setError(err.message); }
    finally { setLoading(false); }
  }
  useEffect(() => { setForm(blank(section.fields)); setEditingId(null); setMessage(''); refresh(); }, [active]);

  function edit(item) {
    const next = blank(section.fields);
    section.fields.forEach(field => {
      const value = item[field.name];
      next[field.name] = field.type === 'date' && value ? new Date(value).toISOString().slice(0, 10) : (value ?? '');
    });
    setForm(next); setEditingId(item._id); setMessage('');
  }
  async function submit(e) {
    e.preventDefault(); setError(''); setMessage(''); setLoading(true);
    try {
      const path = editingId ? `${section.endpoint}/${editingId}` : section.endpoint;
      await apiRequest(path, { method: editingId ? 'PUT' : 'POST', body: JSON.stringify(form) });
      setForm(blank(section.fields)); setEditingId(null); setMessage(editingId ? 'Record updated.' : 'Record created.');
      setItems(await apiRequest(section.endpoint));
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  }
  async function remove(id) {
    if (!window.confirm('Delete this record? This cannot be undone.')) return;
    setError(''); setMessage('');
    try { await apiRequest(`${section.endpoint}/${id}`, { method: 'DELETE' }); setItems(await apiRequest(section.endpoint)); setMessage('Record deleted.'); }
    catch (err) { setError(err.message); }
  }

  return <main className="container">
    <h1>Administrator Dashboard</h1>
    <p>Manage portfolio content and review contact submissions. These actions require administrator access.</p>
    <div className="admin-tabs" role="tablist" aria-label="Admin sections">
      {Object.entries(sections).map(([key, value]) => <button key={key} type="button" className={active === key ? 'active' : ''} onClick={() => setActive(key)}>{value.label}</button>)}
    </div>
    <section className="admin-panel">
      <h2>{editingId ? `Edit ${section.label}` : `Add ${section.label === 'Contact submissions' ? 'contact record' : `a ${section.label.slice(0, -1)}`}`}</h2>
      {active !== 'contacts' || editingId ? <form onSubmit={submit} className="portfolio-form admin-form">
        {section.fields.map(field => <label key={field.name}>{field.label}{field.type === 'textarea' ? <textarea rows="4" value={form[field.name]} onChange={e => setForm({ ...form, [field.name]: e.target.value })} required /> : <input type={field.type} value={form[field.name]} onChange={e => setForm({ ...form, [field.name]: e.target.value })} required />}</label>)}
        <div className="form-actions"><button disabled={loading} type="submit">{loading ? 'Saving…' : editingId ? 'Save changes' : 'Create record'}</button>{editingId && <button type="button" className="secondary-button" onClick={() => { setEditingId(null); setForm(blank(section.fields)); }}>Cancel edit</button>}</div>
      </form> : <p>Contact forms are submitted by visitors. You can review, edit, or delete them below.</p>}
      {error && <p role="alert" className="form-error">{error}</p>}{message && <p role="status" className="form-success">{message}</p>}
    </section>
    <section className="admin-panel">
      <h2>{section.label} ({items.length})</h2>
      {loading && <p>Loading records…</p>}
      {!loading && items.length === 0 && <p>No records found.</p>}
      <div className="admin-records">{items.map(item => <article className="admin-record" key={item._id}>
        <div><h3>{item.title || `${item.firstName} ${item.lastName}`}</h3><p>{item.description || item.message || item.email}</p>{item.completionDate && <small>{new Date(item.completionDate).toLocaleDateString()}</small>}{item.contactNumber && <small> · {item.contactNumber}</small>}</div>
        <div className="record-actions"><button type="button" onClick={() => edit(item)}>Edit</button><button type="button" className="danger-button" onClick={() => remove(item._id)}>Delete</button></div>
      </article>)}</div>
    </section>
  </main>;
}
