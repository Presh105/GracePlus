'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function CategoriesPage() {
  const supabase = createClient();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    const { data } = await supabase.from('categories').select('*').order('name');
    setCategories(data || []);
  }

  function slugify(text) {
    return text.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    const slug = slugify(name);
    if (editingId) {
      await supabase.from('categories').update({ name, slug }).eq('id', editingId);
      setEditingId(null);
    } else {
      await supabase.from('categories').insert({ name, slug });
    }
    setName('');
    fetchCategories();
  }

  async function handleEdit(cat) {
    setName(cat.name);
    setEditingId(cat.id);
  }

  async function handleDelete(id) {
    await supabase.from('categories').delete().eq('id', id);
    fetchCategories();
  }

  return (
    <div>
      <h2 style={{ color: 'var(--color-dark-green)' }}>Category Management</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ padding: '0.5rem', borderRadius: '8px', border: '1px solid #ccc', flex: 1 }}
        />
        <button type="submit" style={btnStyle}>
          {editingId ? 'Update' : 'Create'}
        </button>
        {editingId && (
          <button type="button" onClick={() => { setName(''); setEditingId(null); }} style={{ ...btnStyle, backgroundColor: '#aaa' }}>
            Cancel
          </button>
        )}
      </form>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {categories.map((cat) => (
          <li key={cat.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid #eee' }}>
            <span>{cat.name}</span>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button onClick={() => handleEdit(cat)} style={smallBtn}>Edit</button>
              <button onClick={() => handleDelete(cat.id)} style={{ ...smallBtn, backgroundColor: '#e74c3c' }}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

const btnStyle = {
  padding: '0.5rem 1rem',
  backgroundColor: 'var(--color-dark-green)',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
};

const smallBtn = {
  padding: '0.25rem 0.75rem',
  backgroundColor: 'var(--color-dark-green)',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
};
