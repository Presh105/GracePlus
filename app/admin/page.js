'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
    } else {
      router.push('/admin/dashboard');
    }
  };

  return (
    <div className="container" style={{ maxWidth: '400px', margin: '3rem auto', padding: '0 1rem' }}>
      <h1 style={{ textAlign: 'center' }}>Admin Login</h1>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          style={{ fontSize: '1rem' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
          style={{ fontSize: '1rem' }}
        />
        {error && <p style={{ color: 'red', fontSize: '0.9rem' }}>{error}</p>}
        <button
          type="submit"
          style={{
            backgroundColor: 'var(--dark-green)',
            color: 'white',
            padding: '0.85rem',
            borderRadius: '8px',
            border: 'none',
            fontWeight: 'bold',
            fontSize: '1rem',
          }}
        >
          Sign In
        </button>
      </form>
    </div>
  );
  }
