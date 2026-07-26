'use client';
import { useState } from 'react';
import Image from 'next/image';

export default function FlowerSlider({ images }) {
  const [current, setCurrent] = useState(0);
  if (!images.length) return <p>No images available.</p>;

  const prev = () => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'relative', width: '100%', height: '400px', borderRadius: '12px', overflow: 'hidden' }}>
        <Image
          src={images[current]}
          alt="Flower image"
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, 500px"
        />
      </div>
      {images.length > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1rem' }}>
          <button
            onClick={prev}
            style={{
              backgroundColor: 'var(--color-dark-green)',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '6px',
            }}
          >
            Previous
          </button>
          <button
            onClick={next}
            style={{
              backgroundColor: 'var(--color-dark-green)',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '6px',
            }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
  }
