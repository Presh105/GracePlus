import { createClient } from '@/lib/supabase/server';
import CategoryCard from '@/components/CategoryCard';

export default async function HomePage() {
  const supabase = await createClient();
  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('name', { ascending: true });

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <h1 style={{ color: 'var(--color-dark-green)', textAlign: 'center', marginBottom: '2rem' }}>
        Our Plant Categories
      </h1>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {categories?.map((cat) => (
          <CategoryCard key={cat.id} category={cat} />
        ))}
      </div>
    </div>
  );
          }
