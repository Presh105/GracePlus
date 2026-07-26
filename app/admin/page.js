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
    <div style={{ maxWidth: '400px', margin: '4rem auto', padding: '0 1rem' }}>
      <h1 style={{ textAlign: 'center', color: '#1B4332', marginBottom: '2rem' }}>
        Admin Login
      </h1>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '1rem' }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '0.85rem',
              borderRadius: '8px',
              border: '1px solid #ccc',
              fontSize: '1rem',
              boxSizing: 'border-box',
            }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '0.85rem',
              borderRadius: '8px',
              border: '1px solid #ccc',
              fontSize: '1rem',
              boxSizing: 'border-box',
            }}
          />
        </div>
        {error && (
          <p style={{ color: 'red', fontSize: '0.9rem', marginBottom: '1rem' }}>
            {error}
          </p>
        )}
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '0.85rem',
            backgroundColor: '#1B4332',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            fontSize: '1rem',
            cursor: 'pointer',
          }}
        >
          Sign In
        </button>
      </form>
    </div>
  );
  }
