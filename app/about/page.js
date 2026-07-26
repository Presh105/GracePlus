import { createClient } from '@/lib/supabase/server';

export default async function AboutPage() {
  const supabase = await createClient();
  const { data: settings } = await supabase.from('settings').select('*').single();

  return (
    <div className="container" style={{ padding: '2rem 0', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: 'var(--color-dark-green)', marginBottom: '1.5rem' }}>About Grace Plus</h1>
      <p style={{ marginBottom: '1.5rem' }}>{settings?.about_text || ''}</p>
      <h2>Our Mission</h2>
      <p style={{ marginBottom: '1.5rem' }}>{settings?.mission || ''}</p>
      <h2>Our Vision</h2>
      <p style={{ marginBottom: '1.5rem' }}>{settings?.vision || ''}</p>
      <h2>Why Choose Us?</h2>
      <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
        <li>Wide selection of healthy plants</li>
        <li>Expert horticultural advice</li>
        <li>Competitive pricing</li>
        <li>Reliable delivery</li>
      </ul>
    </div>
  );
  }
