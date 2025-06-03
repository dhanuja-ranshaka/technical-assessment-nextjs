'use client';

import { useEffect, useState } from 'react';

type Props = {
  onNext: (username: string, secureWord: string) => void;
};

export default function UsernameStep({ onNext }: Props) {
  const [username, setUsername] = useState('');
  const [secureWord, setSecureWord] = useState('');
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(60);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (secureWord && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [secureWord, timer]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimer(60);

    try {
      const res = await fetch('/api/getSecureWord', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      setSecureWord(data.secureWord);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (timer > 0) {
      onNext(username, secureWord);
    } else {
      setError('Secure word expired. Please request again.');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="username-form">
        <label>Username</label>
        <input
          id="username"
          className='input-text'
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit" disabled={loading || !username}>
          {loading ? 'Sending...' : 'Get Secure Word'}
        </button>
        {secureWord && (
          <>
            <div className="secure-word-box">
              <p className="secure-word">
                Secure Word: <strong>{secureWord}</strong>
              </p>
              <p className="expiry-warning">Expires in {timer}s</p>

            </div>
            <button onClick={handleNext} disabled={timer <= 0}>
              Next
            </button>
          </>
        )}
      </form>

    </>
  );
}
