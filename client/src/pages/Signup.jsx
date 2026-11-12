import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../services/authService";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const update = e => setForm({ ...form, [e.target.name]: e.target.value });

  async function handleSubmit(e) {
    e.preventDefault(); setError(""); setSuccess("");
    if (form.password.length < 8) return setError("Password must contain at least 8 characters.");
    if (form.password !== form.confirmPassword) return setError("Passwords do not match.");
    setLoading(true);
    try {
      await signup(form.name.trim(), form.email.trim(), form.password);
      setSuccess("Account created successfully. Redirecting to sign in…");
      setTimeout(() => navigate("/login"), 900);
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  }

  return <main className="container" style={{ maxWidth: 480 }}>
    <h1>Create Account</h1>
    <form onSubmit={handleSubmit} className="portfolio-form">
      <label>Full name<input name="name" value={form.name} onChange={update} required minLength={2} /></label>
      <label>Email<input name="email" type="email" value={form.email} onChange={update} required /></label>
      <label>Password<input name="password" type="password" value={form.password} onChange={update} required minLength={8} autoComplete="new-password" /></label>
      <label>Confirm password<input name="confirmPassword" type="password" value={form.confirmPassword} onChange={update} required autoComplete="new-password" /></label>
      {error && <p role="alert" className="form-error">{error}</p>}
      {success && <p role="status" className="form-success">{success}</p>}
      <button type="submit" disabled={loading}>{loading ? "Creating account…" : "Sign Up"}</button>
    </form>
    <p>Already registered? <Link to="/login">Sign in</Link>.</p>
  </main>;
}
