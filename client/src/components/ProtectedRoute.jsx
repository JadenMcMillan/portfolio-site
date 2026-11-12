import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getToken, loadProfile, signout } from '../services/authService';

export default function ProtectedRoute({ children, adminOnly = false }) {
  const location = useLocation();
  const [state, setState] = useState({ loading: true, user: null, valid: Boolean(getToken()) });

  useEffect(() => {
    let active = true;
    if (!getToken()) {
      setState({ loading: false, user: null, valid: false });
      return () => { active = false; };
    }
    loadProfile()
      .then(user => { if (active) setState({ loading: false, user, valid: true }); })
      .catch(async () => {
        await signout();
        if (active) setState({ loading: false, user: null, valid: false });
      });
    return () => { active = false; };
  }, []);

  if (state.loading) return <main className="container"><p>Verifying access…</p></main>;
  if (!state.valid) return <Navigate to="/login" replace state={{ from: location }} />;
  if (adminOnly && state.user?.isAdmin !== true) return <Navigate to="/" replace />;
  return children;
}
