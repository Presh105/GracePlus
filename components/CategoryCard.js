import Link from 'next/link';

export default function CategoryCard({ category }) {
  return (
    <Link
      href={`/category/${category.slug}`}
      style={{
        display: 'block',
        backgroundColor: 'var(--color-natural)',
        borderRadius: '12px',
        padding: '2rem 1rem',
        textAlign: 'center',
        color: 'var(--color-dark-green)',
        fontWeight: '600',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        transition: 'transform 0.2s ease',
      }}
      className="category-card"
    >
      <span style={{ fontSize: '1.2rem' }}>{category.name}</span>
    </Link>
  );
}
