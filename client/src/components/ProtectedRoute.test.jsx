import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import ProtectedRoute from './ProtectedRoute';
import { getToken, loadProfile } from '../services/authService';

vi.mock('../services/authService', () => ({
  getToken: vi.fn(),
  loadProfile: vi.fn(),
  signout: vi.fn(),
}));

function renderAdminRoute() {
  render(
    <MemoryRouter initialEntries={['/admin']}>
      <Routes>
        <Route path="/" element={<p>Home page</p>} />
        <Route path="/login" element={<p>Login page</p>} />
        <Route path="/admin" element={<ProtectedRoute adminOnly><p>Secret dashboard</p></ProtectedRoute>} />
      </Routes>
    </MemoryRouter>,
  );
}

describe('ProtectedRoute', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('redirects a signed-out visitor to the login page', async () => {
    vi.mocked(getToken).mockReturnValue(null);
    renderAdminRoute();

    expect(await screen.findByText('Login page')).toBeInTheDocument();
    expect(screen.queryByText('Secret dashboard')).not.toBeInTheDocument();
    expect(loadProfile).not.toHaveBeenCalled();
  });

  it('redirects a signed-in non-administrator to the home page', async () => {
    vi.mocked(getToken).mockReturnValue('user-token');
    vi.mocked(loadProfile).mockResolvedValue({ isAdmin: false });
    renderAdminRoute();

    expect(await screen.findByText('Home page')).toBeInTheDocument();
    expect(screen.queryByText('Secret dashboard')).not.toBeInTheDocument();
  });

  it('shows the dashboard to an administrator', async () => {
    vi.mocked(getToken).mockReturnValue('admin-token');
    vi.mocked(loadProfile).mockResolvedValue({ isAdmin: true });
    renderAdminRoute();

    expect(await screen.findByText('Secret dashboard')).toBeInTheDocument();
  });
});
