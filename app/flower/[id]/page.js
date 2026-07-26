import { createClient } from '@/lib/supabase/server';
import FlowerSlider from '@/components/FlowerSlider';
import OrderWhatsAppButton from '@/components/OrderWhatsAppButton';
import { notFound } from 'next/navigation';

export default async function FlowerDetailPage({ params }) {
  const supabase = await createClient();
  const { id } = await params;

  const { data: flower } = await supabase
    .from('flowers')
    .select('*, category:category_id(name)')
    .eq('id', id)
    .single();

  if (!flower) notFound();

  const images = [
    flower.seedling_image_url,
    flower.mature_image_url,
    flower.decoration_image_url,
  ].filter(Boolean);

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div style={{ flex: 1 }}>
          <FlowerSlider images={images} />
        </div>
        <div style={{ flex: 1 }}>
          <h1 style={{ color: 'var(--color-dark-green)' }}>{flower.name}</h1>
          <p style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#2d6a4f' }}>
            ₦{Number(flower.price).toLocaleString()}
          </p>
          <p><strong>Category:</strong> {flower.category?.name}</p>
          <p><strong>Available Quantity:</strong> {flower.quantity}</p>
          <p style={{ marginTop: '1rem' }}>{flower.description}</p>
          <div style={{ marginTop: '2rem' }}>
            <OrderWhatsAppButton flower={flower} />
          </div>
        </div>
      </div>
    </div>
  );
  }
