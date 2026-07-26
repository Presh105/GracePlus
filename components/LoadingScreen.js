'use client';
import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'var(--color-dark-green)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      animation: 'fadeOut 0.5s ease 2s forwards',
      color: 'white',
    }}>
      <div style={{ fontSize: '4rem', animation: 'bounce 1s infinite alternate' }}>
        🧑‍🌾🌸
      </div>
      <h1 style={{
        marginTop: '1rem',
        fontFamily: 'serif',
        fontSize: '2rem',
        opacity: 0,
        animation: 'fadeIn 1s ease 0.5s forwards',
      }}>
        Sir Kingsley
      </h1>
      <p style={{ marginTop: '0.5rem', opacity: 0, animation: 'fadeIn 1s ease 1s forwards' }}>
        Welcome to Grace Plus
      </p>
      <style jsx>{`
        @keyframes bounce {
          from { transform: translateY(0); }
          to { transform: translateY(-10px); }
        }
        @keyframes fadeIn {
          to { opacity: 1; }
        }
        @keyframes fadeOut {
          to { opacity: 0; visibility: hidden; }
        }
      `}</style>
    </div>
  );
  }
