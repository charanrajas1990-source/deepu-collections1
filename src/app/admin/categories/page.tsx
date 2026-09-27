'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase';
import { Plus, ChevronUp, ChevronDown, Pencil, Trash2, X, Check } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  slug: string;
  display_order: number;
  is_active: boolean;
}

const DEFAULT_CATEGORIES = [
  'Georgette Sarees',
  'Pattu Sarees',
  'Fancy Sarees',
  'Chinon Sarees',
  'Chiffon Sarees',
  'Matka Crepe Sarees',
  'Digital Sarees',
  'Tussore Sarees',
  'Instagram Trending Sarees',
];

function toSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [adding, setAdding] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  };

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;

      if (!data || data.length === 0) {
        // Seed defaults if empty
        const defaults = DEFAULT_CATEGORIES.map((name, i) => ({
          name,
          slug: toSlug(name),
          display_order: i + 1,
          is_active: true,
        }));
        const { data: inserted } = await supabase
          .from('categories')
          .insert(defaults)
          .select();
        setCategories(inserted || []);
      } else {
        setCategories(data);
      }
    } catch {
      setCategories([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleAdd = async () => {
    if (!newName.trim()) return;
    setAdding(true);
    try {
      const supabase = createClient();
      const maxOrder = Math.max(0, ...categories.map((c) => c.display_order));
      const { data, error } = await supabase
        .from('categories')
        .insert([{ name: newName.trim(), slug: toSlug(newName), display_order: maxOrder + 1, is_active: true }])
        .select()
        .single();
      if (error) throw error;
      setCategories((prev) => [...prev, data]);
      setNewName('');
      setShowAddForm(false);
      showToast('Category added!');
    } catch {
      showToast('Error: Failed to add category.');
    } finally {
      setAdding(false);
    }
  };

  const handleSaveEdit = async (id: string) => {
    if (!editName.trim()) return;
    try {
      const supabase = createClient();
      await supabase
        .from('categories')
        .update({ name: editName.trim(), slug: toSlug(editName) })
        .eq('id', id);
      setCategories((prev) =>
        prev.map((c) =>
          c.id === id ? { ...c, name: editName.trim(), slug: toSlug(editName) } : c
        )
      );
      setEditId(null);
      showToast('Category updated!');
    } catch {
      showToast('Error: Failed to update.');
    }
  };

  const handleToggle = async (cat: Category) => {
    try {
      const supabase = createClient();
      await supabase
        .from('categories')
        .update({ is_active: !cat.is_active })
        .eq('id', cat.id);
      setCategories((prev) =>
        prev.map((c) => (c.id === cat.id ? { ...c, is_active: !c.is_active } : c))
      );
    } catch {
      showToast('Error: Failed to update status.');
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      const supabase = createClient();
      await supabase.from('categories').delete().eq('id', deleteId);
      setCategories((prev) => prev.filter((c) => c.id !== deleteId));
      setDeleteId(null);
      showToast('Category deleted.');
    } catch {
      showToast('Error: Failed to delete.');
    } finally {
      setDeleting(false);
    }
  };

  const handleMove = async (index: number, direction: 'up' | 'down') => {
    const newList = [...categories];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= newList.length) return;

    [newList[index], newList[swapIndex]] = [newList[swapIndex], newList[index]];

    // Reassign display_order
    const updated = newList.map((c, i) => ({ ...c, display_order: i + 1 }));
    setCategories(updated);

    try {
      const supabase = createClient();
      await Promise.all(
        updated.map((c) =>
          supabase.from('categories').update({ display_order: c.display_order }).eq('id', c.id)
        )
      );
    } catch {
      showToast('Error: Failed to reorder.');
    }
  };

  const inputCls =
    'px-3 py-2 bg-[#160B1E] border border-[#D4AF37]/20 rounded-lg text-[#FAF9F6] text-sm placeholder-[#FAF9F6]/30 focus:outline-none focus:border-[#D4AF37]/50 transition-colors';

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-6 right-6 z-50 px-5 py-3 rounded-lg text-sm font-medium shadow-xl ${
            toast.startsWith('Error')
              ? 'bg-red-900 border border-red-500/50 text-red-200'
              : 'bg-green-900 border border-green-500/50 text-green-200'
          }`}
        >
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#FAF9F6]">Categories</h2>
          <p className="text-[#FAF9F6]/50 text-sm mt-1">{categories.length} categories</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#160B1E] font-semibold text-sm rounded-lg transition-colors"
        >
          <Plus size={16} />
          Add Category
        </button>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <div className="bg-[#1E0F2C] border border-[#D4AF37]/30 rounded-xl p-5 flex gap-3 items-end">
          <div className="flex-1">
            <label className="block text-sm text-[#FAF9F6]/60 mb-1.5">Category Name</label>
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="e.g. Designer Sarees"
              className={`${inputCls} w-full`}
              onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
              autoFocus
            />
          </div>
          <button
            onClick={handleAdd}
            disabled={adding || !newName.trim()}
            className="px-5 py-2 bg-[#D4AF37] hover:bg-[#D4AF37]/90 disabled:opacity-50 text-[#160B1E] font-semibold text-sm rounded-lg transition-colors"
          >
            {adding ? 'Adding...' : 'Add'}
          </button>
          <button
            onClick={() => { setShowAddForm(false); setNewName(''); }}
            className="p-2 rounded-lg text-[#FAF9F6]/40 hover:text-[#FAF9F6] hover:bg-white/5 transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      )}

      {/* Table */}
      <div className="bg-[#1E0F2C] border border-[#D4AF37]/20 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#D4AF37]/15">
                {['Order', 'Name', 'Slug', 'Status', 'Actions'].map((h) => (
                  <th
                    key={h}
                    className="text-left px-5 py-3 text-[#FAF9F6]/40 text-xs font-medium uppercase tracking-wide"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D4AF37]/10">
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    {[...Array(5)].map((__, j) => (
                      <td key={j} className="px-5 py-3">
                        <div className="h-4 bg-white/10 rounded" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : categories.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center text-[#FAF9F6]/40 text-sm">
                    No categories found.
                  </td>
                </tr>
              ) : (
                categories.map((cat, index) => (
                  <tr key={cat.id} className="hover:bg-white/3 transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex flex-col gap-0.5">
                        <button
                          onClick={() => handleMove(index, 'up')}
                          disabled={index === 0}
                          className="p-0.5 text-[#FAF9F6]/30 hover:text-[#FAF9F6] disabled:opacity-20 transition-colors"
                        >
                          <ChevronUp size={14} />
                        </button>
                        <span className="text-center text-[#FAF9F6]/40 text-xs font-mono">
                          {cat.display_order}
                        </span>
                        <button
                          onClick={() => handleMove(index, 'down')}
                          disabled={index === categories.length - 1}
                          className="p-0.5 text-[#FAF9F6]/30 hover:text-[#FAF9F6] disabled:opacity-20 transition-colors"
                        >
                          <ChevronDown size={14} />
                        </button>
                      </div>
                    </td>

                    <td className="px-5 py-3">
                      {editId === cat.id ? (
                        <div className="flex items-center gap-2">
                          <input
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className={`${inputCls} py-1.5`}
                            onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit(cat.id)}
                            autoFocus
                          />
                          <button
                            onClick={() => handleSaveEdit(cat.id)}
                            className="p-1.5 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] hover:bg-[#D4AF37]/20 transition-colors"
                          >
                            <Check size={14} />
                          </button>
                          <button
                            onClick={() => setEditId(null)}
                            className="p-1.5 rounded-lg text-[#FAF9F6]/30 hover:text-[#FAF9F6] hover:bg-white/5 transition-colors"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ) : (
                        <Link
                          href={`/admin/products?category=${encodeURIComponent(cat.name)}`}
                          className="text-[#FAF9F6] text-sm font-medium hover:text-[#D4AF37] transition-colors"
                          title="View products in this category"
                        >
                          {cat.name}
                        </Link>
                      )}
                    </td>

                    <td className="px-5 py-3 text-[#FAF9F6]/40 font-mono text-xs">{cat.slug}</td>

                    <td className="px-5 py-3">
                      <button
                        onClick={() => handleToggle(cat)}
                        className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                          cat.is_active
                            ? 'bg-green-900/30 border-green-500/30 text-green-400 hover:bg-green-900/50'
                            : 'bg-[#160B1E] border-[#FAF9F6]/10 text-[#FAF9F6]/30 hover:border-[#FAF9F6]/30'
                        }`}
                      >
                        {cat.is_active ? 'Active' : 'Inactive'}
                      </button>
                    </td>

                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Link
                          href={`/admin/products/new?category=${encodeURIComponent(cat.name)}`}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/20 transition-colors text-xs font-medium"
                          title={`Add product in ${cat.name}`}
                        >
                          <Plus size={11} />
                          Add Product
                        </Link>
                        <button
                          onClick={() => { setEditId(cat.id); setEditName(cat.name); }}
                          className="p-1.5 rounded-lg text-[#FAF9F6]/40 hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors"
                          title="Edit"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => setDeleteId(cat.id)}
                          className="p-1.5 rounded-lg text-[#FAF9F6]/40 hover:text-red-400 hover:bg-red-900/20 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center px-4">
          <div className="bg-[#1E0F2C] border border-red-500/30 rounded-xl p-6 max-w-sm w-full shadow-2xl">
            <h3 className="text-[#FAF9F6] font-semibold text-lg mb-2">Delete Category?</h3>
            <p className="text-[#FAF9F6]/60 text-sm mb-6">
              This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 py-2.5 rounded-lg border border-[#D4AF37]/30 text-[#FAF9F6]/70 text-sm font-medium hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 py-2.5 rounded-lg bg-red-700 hover:bg-red-600 disabled:opacity-50 text-white text-sm font-semibold transition-colors"
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
