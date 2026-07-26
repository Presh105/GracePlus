import { createClient } from '@/lib/supabase/server';
import FlowerCard from '@/components/FlowerCard';
import { notFound } from 'next/navigation';

export default async function CategoryPage({ params }) {
  const supabase = await createClient();
  const { slug } = await params;

  // Get category
  const { data: category } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!category) notFound();

  // Get flowers in that category
  const { data: flowers } = await supabase
    .from('flowers')
    .select('*')
    .eq('category_id', category.id)
    .order('name');

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <h1 style={{ color: 'var(--color-dark-green)', marginBottom: '1.5rem' }}>
        {category.name}
      </h1>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {flowers?.map((flower) => (
          <FlowerCard key={flower.id} flower={flower} />
        ))}
      </div>
    </div>
  );
}
