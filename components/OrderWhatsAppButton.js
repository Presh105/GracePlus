import { createClient } from '@/lib/supabase/server';

export default async function OrderWhatsAppButton({ flower }) {
  const supabase = await createClient();
  const { data: settings } = await supabase.from('settings').select('*').single();
  const phone = settings?.whatsapp_number || '';
  const message = `Hello Grace Plus,\nI am interested in purchasing this flower.\nFlower: ${flower.name}\nPrice: ₦${Number(flower.price).toLocaleString()}\nPlease provide more information.\nThank you.`;

  const whatsappUrl = `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'inline-block',
        backgroundColor: '#25D366',
        color: 'white',
        padding: '0.75rem 2rem',
        borderRadius: '8px',
        fontWeight: 'bold',
        textAlign: 'center',
      }}
    >
      Order on WhatsApp
    </a>
  );
}
