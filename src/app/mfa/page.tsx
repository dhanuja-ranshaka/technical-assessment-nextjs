'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function MfaPage() {
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const res = await fetch('/api/verifyMfa', {
            method: 'POST',
            body: JSON.stringify({ username: 'john', code }),
        });

        if (res.ok) {
            router.push('/dashboard');
        } else {
            const data = await res.json();
            setError(data.error);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>Enter 6-digit MFA Code</label>
            <input
                type="text"
                pattern="\d{6}"
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="123456"
                className='input-text'
                required
            />
            {error && <p className="error">{error}</p>}
            <button
                type="submit"
            >
                Verify
            </button>
        </form>
    );
}
