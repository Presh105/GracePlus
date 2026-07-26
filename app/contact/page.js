import { createClient } from '@/lib/supabase/server';

export default async function ContactPage() {
  const supabase = await createClient();
  const { data: settings } = await supabase.from('settings').select('*').single();

  return (
    <div className="container" style={{ padding: '2rem 0', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: 'var(--color-dark-green)', marginBottom: '1.5rem' }}>Contact Us</h1>
      <div style={{ marginBottom: '1rem' }}>
        <strong>Business Name:</strong> {settings?.business_name || 'Grace Plus'}
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <strong>Phone:</strong> {settings?.phone || ''}
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <strong>Email:</strong> {settings?.email || ''}
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <strong>Address:</strong> {settings?.address || ''}
      </div>
      <div style={{ marginTop: '2rem', width: '100%', height: '300px', backgroundColor: '#f0f0f0', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        Google Map Placeholder
      </div>
    </div>
  );
          }
