import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signin } from "../services/authService";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault(); setError(""); setLoading(true);
    try {
      const result = await signin(email.trim(), password);
      navigate(location.state?.from?.pathname || (result.user.isAdmin ? "/admin" : "/"), { replace: true });
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  }

  return <main className="container" style={{ maxWidth: 480 }}>
    <h1>Sign In</h1>
    <p>Sign in to access your account.</p>
    <form onSubmit={handleSubmit} className="portfolio-form">
      <label>Email<input type="email" value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" required /></label>
      <label>Password<input type="password" value={password} onChange={e => setPassword(e.target.value)} autoComplete="current-password" required /></label>
      {error && <p role="alert" className="form-error">{error}</p>}
      <button type="submit" disabled={loading}>{loading ? "Signing in…" : "Sign In"}</button>
    </form>
    <p>Don't have an account? <Link to="/signup">Create one</Link>.</p>
  </main>;
}
