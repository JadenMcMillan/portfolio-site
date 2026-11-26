import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Contact from './Contact';
import { apiRequest } from '../services/api';

// Replace the network layer so only the page behaviour is tested
vi.mock('../services/api', () => ({ apiRequest: vi.fn() }));

async function fillForm(user) {
  await user.type(screen.getByLabelText(/first name/i), 'Ada');
  await user.type(screen.getByLabelText(/last name/i), 'Lovelace');
  await user.type(screen.getByLabelText(/contact number/i), '905-555-0100');
  await user.type(screen.getByLabelText(/email/i), 'ada@example.com');
  await user.type(screen.getByLabelText(/message/i), 'Hello from a unit test');
}

describe('Contact page', () => {
  beforeEach(() => {
    vi.mocked(apiRequest).mockReset();
  });

  it('sends the form values to the API, confirms success and clears the form', async () => {
    vi.mocked(apiRequest).mockResolvedValue({});
    const user = userEvent.setup();
    render(<Contact />);

    await fillForm(user);
    await user.click(screen.getByRole('button', { name: /submit message/i }));

    expect(await screen.findByRole('status')).toHaveTextContent('Your message was submitted successfully.');
    expect(apiRequest).toHaveBeenCalledTimes(1);
    const [path, options] = vi.mocked(apiRequest).mock.calls[0];
    expect(path).toBe('/contacts');
    expect(options.method).toBe('POST');
    expect(JSON.parse(options.body)).toEqual({
      firstName: 'Ada',
      lastName: 'Lovelace',
      contactNumber: '905-555-0100',
      email: 'ada@example.com',
      message: 'Hello from a unit test',
    });
    expect(screen.getByLabelText(/first name/i)).toHaveValue('');
    expect(screen.getByLabelText(/message/i)).toHaveValue('');
  });

  it('shows the server error and keeps what the visitor typed', async () => {
    vi.mocked(apiRequest).mockRejectedValue(new Error('Invalid contact data'));
    const user = userEvent.setup();
    render(<Contact />);

    await fillForm(user);
    await user.click(screen.getByRole('button', { name: /submit message/i }));

    expect(await screen.findByRole('alert')).toHaveTextContent('Invalid contact data');
    expect(screen.getByLabelText(/first name/i)).toHaveValue('Ada');
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('does not call the API when required fields are empty', async () => {
    const user = userEvent.setup();
    render(<Contact />);

    await user.click(screen.getByRole('button', { name: /submit message/i }));

    expect(apiRequest).not.toHaveBeenCalled();
  });
});
