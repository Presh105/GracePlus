'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav style={{ backgroundColor: 'var(--dark-green)', padding: '1rem 0' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.5rem' }}>
          Grace Plus
        </Link>
        <button
          onClick={() => setOpen(!open)}
          style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.8rem', display: 'block' }}
          className="mobile-menu-toggle"
          aria-label="Toggle menu"
        >
          {open ? '✕' : '☰'}
        </button>
        <ul
          className={`nav-links${open ? ' open' : ''}`}
          style={{
            display: 'flex',
            gap: '1.5rem',
            listStyle: 'none',
            alignItems: 'center',
            margin: 0,
          }}
        >
          <li><Link href="/" style={{ color: 'white' }}>Home</Link></li>
          <li><Link href="/about" style={{ color: 'white' }}>About</Link></li>
          <li><Link href="/contact" style={{ color: 'white' }}>Contact</Link></li>
          <li><Link href="/admin" style={{ color: 'white' }}>Admin</Link></li>
        </ul>
      </div>
      <style jsx>{`
        @media (max-width: 768px) {
          .nav-links {
            display: none;
            flex-direction: column;
            position: absolute;
            top: 60px;
            left: 0;
            right: 0;
            background: var(--dark-green);
            padding: 1rem;
            gap: 1rem;
            z-index: 100;
          }
          .nav-links.open {
            display: flex;
          }
        }
      `}</style>
    </nav>
  );
            }
