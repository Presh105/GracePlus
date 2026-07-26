import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--color-dark-green)', color: 'white', padding: '2rem 0', marginTop: '2rem' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
        <div>
          <h3>Grace Plus</h3>
          <p>Your trusted nursery for flowers & plants.</p>
        </div>
        <div>
          <h4>Quick Links</h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li><Link href="/" style={{ color: 'white' }}>Home</Link></li>
            <li><Link href="/about" style={{ color: 'white' }}>About</Link></li>
            <li><Link href="/contact" style={{ color: 'white' }}>Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <p>Phone: +234 xxx xxxx</p>
          <p>Email: info@graceplus.com</p>
        </div>
      </div>
      <div style={{ textAlign: 'center', marginTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '1rem' }}>
        © {new Date().getFullYear()} Grace Plus. All rights reserved.
      </div>
    </footer>
  );
  }
