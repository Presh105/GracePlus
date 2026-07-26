import Link from 'next/link';
import LogoutButton from '@/components/LogoutButton';

export default function DashboardLayout({ children }) {
  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
        <Link href="/admin/dashboard" style={linkStyle}>Dashboard</Link>
        <Link href="/admin/dashboard/categories" style={linkStyle}>Categories</Link>
        <Link href="/admin/dashboard/flowers" style={linkStyle}>Flowers</Link>
        <Link href="/admin/dashboard/settings" style={linkStyle}>Settings</Link>
        <LogoutButton />
      </div>
      {children}
    </div>
  );
}

const linkStyle = {
  padding: '0.5rem 1rem',
  backgroundColor: 'var(--color-light-green)',
  color: 'var(--color-dark-green)',
  borderRadius: '8px',
  fontWeight: '600',
  textDecoration: 'none',
};
