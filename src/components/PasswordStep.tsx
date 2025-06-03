'use client';

import { useState } from 'react';

export default function PasswordStep({
  username,
  onSuccess,
}: {
  username: string;
  onSuccess: (token: string) => void;
}) {
  const [password, setPassword] = useState('');
  const [secureWord, setSecureWord] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function hashPassword(password: string) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    return [...new Uint8Array(hashBuffer)]
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const hashedPassword = await hashPassword(password);
      console.log('Hashed Password:', hashedPassword);

      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, secureWord, hashedPassword }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Login failed');
      }

      const data = await res.json();
      onSuccess(data.token);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="password-form">
      <label>Secure Word</label>
      <input
        type="text"
        required
        value={secureWord}
        onChange={e => setSecureWord(e.target.value)}
        placeholder="Enter secure word"
        className="input-text"
      />

      <label>Password</label>
      <input
        type="password"
        required
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Enter your password"
        className="input-text"
      />

      {error && <p className="error">{error}</p>}

      <button
        type="submit"
        disabled={loading}
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
