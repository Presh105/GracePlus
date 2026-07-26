import Link from 'next/link';
import Image from 'next/image';

export default function FlowerCard({ flower }) {
  const imageUrl = flower.seedling_image_url || flower.mature_image_url || flower.decoration_image_url || null;

  return (
    <div className="flower-card" style={{ display: 'flex', flexDirection: 'column' }}>
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
        <div style={{
          width: '100%',
          height: '200px',
          backgroundColor: 'var(--color-light-green)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--color-dark-green)',
          fontWeight: 'bold',
          fontSize: '1.1rem',
        }}>
          {flower.name}
        </div>
      )}
      <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <h3>{flower.name}</h3>
        <p style={{ fontWeight: 'bold', color: '#2d6a4f' }}>
          ₦{Number(flower.price).toLocaleString()}
        </p>
        <Link href={`/flower/${flower.id}`} className="view-details-btn">
          View Details
        </Link>
      </div>
    </div>
  );
}
