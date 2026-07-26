import Link from 'next/link';
import Image from 'next/image';

export default function FlowerCard({ flower }) {
  const imageUrl = flower.seedling_image_url || flower.mature_image_url || flower.decoration_image_url || null;

  return (
    <div
      style={{
        backgroundColor: 'var(--color-natural)',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {imageUrl ? (
        <div style={{ position: 'relative', width: '100%', height: '200px' }}>
          <Image
            src={imageUrl}
            alt={flower.name}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, 300px"
          />
        </div>
      ) : (
        <div
          style={{
            width: '100%',
            height: '200px',
            backgroundColor: '#B7E4C7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#1B4332',
            fontWeight: 'bold',
            fontSize: '1.2rem',
          }}
        >
          {flower.name}
        </div>
      )}
      <div style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ color: 'var(--color-dark-green)', marginBottom: '0.5rem' }}>{flower.name}</h3>
        <p style={{ fontWeight: 'bold', color: '#2d6a4f', marginBottom: '1rem' }}>
          ₦{Number(flower.price).toLocaleString()}
        </p>
        <Link
          href={`/flower/${flower.id}`}
          style={{
            marginTop: 'auto',
            display: 'inline-block',
            backgroundColor: 'var(--color-dark-green)',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            textAlign: 'center',
            fontWeight: '600',
          }}
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
