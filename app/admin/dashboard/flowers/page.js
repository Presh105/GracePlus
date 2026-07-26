'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function FlowersPage() {
  const supabase = createClient();
  const [flowers, setFlowers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: '', category_id: '', description: '', price: '', quantity: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [seedlingFile, setSeedlingFile] = useState(null);
  const [matureFile, setMatureFile] = useState(null);
  const [decorationFile, setDecorationFile] = useState(null);

  useEffect(() => {
    fetchFlowers();
    fetchCategories();
  }, []);

  async function fetchFlowers() {
    const { data } = await supabase.from('flowers').select('*, category:category_id(name)').order('name');
    setFlowers(data || []);
  }

  async function fetchCategories() {
    const { data } = await supabase.from('categories').select('*').order('name');
    setCategories(data || []);
  }

  async function uploadImage(file) {
    if (!file) return null;
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const { data, error } = await supabase.storage
      .from('flowers')
      .upload(fileName, file);
    if (error) throw error;
    const { data: publicUrl } = supabase.storage.from('flowers').getPublicUrl(fileName);
    return publicUrl.publicUrl;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let seedlingUrl = editingId ? flowers.find(f => f.id === editingId)?.seedling_image_url || null : null;
    let matureUrl = editingId ? flowers.find(f => f.id === editingId)?.mature_image_url || null : null;
    let decorationUrl = editingId ? flowers.find(f => f.id === editingId)?.decoration_image_url || null : null;

    if (seedlingFile) seedlingUrl = await uploadImage(seedlingFile);
    if (matureFile) matureUrl = await uploadImage(matureFile);
    if (decorationFile) decorationUrl = await uploadImage(decorationFile);

    const flowerData = {
      name: form.name,
      category_id: form.category_id,
      description: form.description,
      price: parseFloat(form.price),
      quantity: parseInt(form.quantity),
      seedling_image_url: seedlingUrl,
      mature_image_url: matureUrl,
      decoration_image_url: decorationUrl,
    };

    if (editingId) {
      await supabase.from('flowers').update(flowerData).eq('id', editingId);
      setEditingId(null);
    } else {
      await supabase.from('flowers').insert(flowerData);
    }

    setForm({ name: '', category_id: '', description: '', price: '', quantity: '' });
    setSeedlingFile(null);
    setMatureFile(null);
    setDecorationFile(null);
    fetchFlowers();
  }

  function handleEdit(flower) {
    setForm({
      name: flower.name,
      category_id: flower.category_id,
      description: flower.description || '',
      price: flower.price.toString(),
      quantity: flower.quantity.toString(),
    });
    setEditingId(flower.id);
  }

  async function handleDelete(id) {
    await supabase.from('flowers').delete().eq('id', id);
    fetchFlowers();
  }

  return (
    <div>
      <h2 style={{ color: 'var(--color-dark-green)' }}>Flower Management</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '600px' }}>
        <input type="text" placeholder="Flower name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required style={inputStyle} />
        <select value={form.category_id} onChange={e => setForm({...form, category_id: e.target.value})} required style={inputStyle}>
          <option value="">Select category</option>
          {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
        </select>
        <textarea placeholder="Description" value={form.description} onChange={e => setForm({...form, description: e.target.value})} style={inputStyle} />
        <input type="number" step="0.01" placeholder="Price" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required style={inputStyle} />
        <input type="number" placeholder="Quantity" value={form.quantity} onChange={e => setForm({...form, quantity: e.target.value})} required style={inputStyle} />
        <label>Seedling Image: <input type="file" accept="image/*" onChange={e => setSeedlingFile(e.target.files[0])} /></label>
        <label>Mature Plant Image: <input type="file" accept="image/*" onChange={e => setMatureFile(e.target.files[0])} /></label>
        <label>Decoration Image: <input type="file" accept="image/*" onChange={e => setDecorationFile(e.target.files[0])} /></label>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button type="submit" style={btnStyle}>{editingId ? 'Update' : 'Add'}</button>
          {editingId && <button type="button" onClick={() => { setEditingId(null); setForm({ name: '', category_id: '', description: '', price: '', quantity: '' }); }} style={{...btnStyle, backgroundColor:'#aaa'}}>Cancel</button>}
        </div>
      </form>
      <div>
        {flowers.map(flower => (
          <div key={flower.id} style={{ borderBottom: '1px solid #eee', padding: '0.5rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <strong>{flower.name}</strong> - ₦{flower.price} ({flower.category?.name})
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button onClick={() => handleEdit(flower)} style={smallBtn}>Edit</button>
              <button onClick={() => handleDelete(flower.id)} style={{...smallBtn, backgroundColor:'#e74c3c'}}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const inputStyle = { padding: '0.5rem', borderRadius: '8px', border: '1px solid #ccc' };
const btnStyle = { padding: '0.5rem 1rem', backgroundColor: 'var(--color-dark-green)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' };
const smallBtn = { padding: '0.25rem 0.75rem', backgroundColor: 'var(--color-dark-green)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' };
