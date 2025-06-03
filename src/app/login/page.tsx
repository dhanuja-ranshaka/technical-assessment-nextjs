// app/login/page.tsx
'use client';

import { useState } from 'react';
import UsernameStep from '@/components/UsernameStep';
import PasswordStep from '@/components/PasswordStep';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();
    const [step, setStep] = useState<'username' | 'password'>('username');
    const [username, setUsername] = useState('');
    const [secureWord, setSecureWord] = useState('');

    const handleUsernameSuccess = (uname: string, word: string) => {
        setUsername(uname);
        setSecureWord(word);
        setStep('password');
    };

    return (
        <div>
            {step === 'username' && <UsernameStep onNext={handleUsernameSuccess} />}
            {step === 'password' && <PasswordStep username={username}
                onSuccess={(token) => {
                    router.push(`/mfa?username=${encodeURIComponent(username)}`);
                }}
            />}
        </div>
    );
}
