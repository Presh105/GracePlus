'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function SettingsPage() {
  const supabase = createClient();
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    const { data } = await supabase.from('settings').select('*').single();
    setSettings(data);
    setLoading(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updates = {
      business_name: formData.get('business_name'),
      whatsapp_number: formData.get('whatsapp_number'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      address: formData.get('address'),
      about_text: formData.get('about_text'),
      mission: formData.get('mission'),
      vision: formData.get('vision'),
    };
    await supabase.from('settings').update(updates).eq('id', 1);
    fetchSettings();
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2 style={{ color: 'var(--color-dark-green)' }}>Settings</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '600px' }}>
        <label>Business Name: <input name="business_name" defaultValue={settings?.business_name} style={inputStyle} /></label>
        <label>WhatsApp Number: <input name="whatsapp_number" defaultValue={settings?.whatsapp_number} style={inputStyle} /></label>
        <label>Email: <input name="email" type="email" defaultValue={settings?.email} style={inputStyle} /></label>
        <label>Phone: <input name="phone" defaultValue={settings?.phone} style={inputStyle} /></label>
        <label>Address: <textarea name="address" defaultValue={settings?.address} style={inputStyle} /></label>
        <label>About Text: <textarea name="about_text" defaultValue={settings?.about_text} style={inputStyle} /></label>
        <label>Mission: <textarea name="mission" defaultValue={settings?.mission} style={inputStyle} /></label>
        <label>Vision: <textarea name="vision" defaultValue={settings?.vision} style={inputStyle} /></label>
        <button type="submit" style={btnStyle}>Save Settings</button>
      </form>
    </div>
  );
}

const inputStyle = { padding: '0.5rem', borderRadius: '8px', border: '1px solid #ccc', width: '100%' };
const btnStyle = { padding: '0.5rem 1rem', backgroundColor: 'var(--color-dark-green)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' };
