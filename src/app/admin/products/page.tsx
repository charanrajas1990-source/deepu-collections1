'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Plus, Search, Pencil, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';
import { createClient } from '@/lib/supabase';

interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  is_active: boolean;
  thumbnail: string | null;
}

function StockBadge({ stock }: { stock: number }) {
  if (stock === 0)
    return (
      <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-900/40 text-red-300 border border-red-500/30">
        Out of Stock
      </span>
    );
  if (stock <= 3)
    return (
      <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-900/40 text-yellow-300 border border-yellow-500/30">
        Low: {stock}
      </span>
    );
  return (
    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-900/40 text-green-300 border border-green-500/30">
      {stock} in stock
    </span>
  );
}

function SkeletonRow() {
  return (
    <tr className="border-b border-[#D4AF37]/10 animate-pulse">
      {[...Array(8)].map((_, i) => (
        <td key={i} className="px-4 py-3">
          <div className="h-4 bg-white/10 rounded" />
        </td>
      ))}
    </tr>
  );
}

function ProductsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || '';

  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [categoryList, setCategoryList] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const supabase = createClient();
        const { data } = await supabase
          .from('categories')
          .select('name')
          .eq('is_active', true)
          .order('display_order', { ascending: true });
        if (data && data.length > 0) {
          setCategoryList(data.map((c) => c.name));
        }
      } catch {
        // ignore
      }
    };
    fetchCategories();
  }, []);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('products')
        .select('id, sku, name, category, price, stock, is_active, thumbnail')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
      setFiltered(data || []);
    } catch {
      setProducts([]);
      setFiltered([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(
      products.filter((p) => {
        const matchSearch =
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q);
        const matchCat = !selectedCategory || p.category.toLowerCase() === selectedCategory.toLowerCase();
        return matchSearch && matchCat;
      })
    );
  }, [search, selectedCategory, products]);

  const handleToggleActive = async (product: Product) => {
    try {
      const res = await fetch('/api/admin/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: product.id,
          is_active: !product.is_active,
        }),
      });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || 'Failed to update');

      setProducts((prev) =>
        prev.map((p) => (p.id === product.id ? { ...p, is_active: !p.is_active } : p))
      );
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to update product status.';
      alert(msg);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/products?id=${encodeURIComponent(deleteId)}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || 'Failed to delete');

      setProducts((prev) => prev.filter((p) => p.id !== deleteId));
      setDeleteId(null);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to delete product.';
      alert(msg);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#FAF9F6]">Products</h2>
          <p className="text-[#FAF9F6]/50 text-sm mt-1">
            {products.length} product{products.length !== 1 ? 's' : ''} total
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 px-5 py-2.5 bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#160B1E] font-semibold text-sm rounded-lg transition-colors self-start sm:self-auto"
        >
          <Plus size={16} />
          Add Product
        </Link>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative max-w-sm flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#FAF9F6]/30" />
          <input
            type="text"
            placeholder="Search by name, SKU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-[#1E0F2C] border border-[#D4AF37]/20 rounded-lg text-[#FAF9F6] placeholder-[#FAF9F6]/30 text-sm focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2.5 bg-[#1E0F2C] border border-[#D4AF37]/20 rounded-lg text-[#FAF9F6] text-sm focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
        >
          <option value="">All Categories</option>
          {categoryList.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-[#1E0F2C] border border-[#D4AF37]/20 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#D4AF37]/15">
                {['Image', 'SKU', 'Name', 'Category', 'Price', 'Stock', 'Status', 'Actions'].map(
                  (h) => (
                    <th
                      key={h}
                      className="text-left px-4 py-3 text-[#FAF9F6]/40 text-xs font-medium uppercase tracking-wide"
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D4AF37]/10">
              {loading ? (
                [...Array(5)].map((_, i) => <SkeletonRow key={i} />)
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-16 text-center text-[#FAF9F6]/40 text-sm">
                    {search
                      ? `No products matching "${search}"`
                      : 'No products yet. Add your first product!'}
                  </td>
                </tr>
              ) : (
                filtered.map((product) => (
                  <tr key={product.id} className="hover:bg-white/3 transition-colors">
                    <td className="px-4 py-3">
                      {product.thumbnail ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={product.thumbnail}
                          alt={product.name}
                          className="w-10 h-10 rounded-lg object-cover border border-[#D4AF37]/20"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-[#160B1E] border border-[#D4AF37]/20 flex items-center justify-center text-[#FAF9F6]/20 text-lg">
                          🧣
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-[#D4AF37] font-mono text-xs">{product.sku}</td>
                    <td className="px-4 py-3 text-[#FAF9F6] text-sm font-medium max-w-[160px] truncate">
                      {product.name}
                    </td>
                    <td className="px-4 py-3 text-[#FAF9F6]/60 text-sm">{product.category}</td>
                    <td className="px-4 py-3 text-[#FAF9F6] text-sm font-medium">
                      ₹{product.price.toLocaleString('en-IN')}
                    </td>
                    <td className="px-4 py-3">
                      <StockBadge stock={product.stock} />
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleToggleActive(product)}
                        className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${
                          product.is_active
                            ? 'text-green-400 hover:text-green-300'
                            : 'text-[#FAF9F6]/30 hover:text-[#FAF9F6]/60'
                        }`}
                      >
                        {product.is_active ? (
                          <ToggleRight size={18} />
                        ) : (
                          <ToggleLeft size={18} />
                        )}
                        {product.is_active ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => router.push(`/admin/products/${product.id}`)}
                          className="p-1.5 rounded-lg text-[#FAF9F6]/40 hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors"
                          title="Edit"
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          onClick={() => setDeleteId(product.id)}
                          className="p-1.5 rounded-lg text-[#FAF9F6]/40 hover:text-red-400 hover:bg-red-900/20 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={15} />
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

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center px-4">
          <div className="bg-[#1E0F2C] border border-red-500/30 rounded-xl p-6 max-w-sm w-full shadow-2xl">
            <h3 className="text-[#FAF9F6] font-semibold text-lg mb-2">Delete Product?</h3>
            <p className="text-[#FAF9F6]/60 text-sm mb-6">
              This action cannot be undone. The product will be permanently removed.
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

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-[#FAF9F6]/40 text-center">Loading products...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
