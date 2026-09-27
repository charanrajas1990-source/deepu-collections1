'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createClient } from '@/lib/supabase';
import { ArrowLeft, Trash2 } from 'lucide-react';
import ImageUploader from '@/components/admin/ImageUploader';

const CATEGORIES = [
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

const ZARI_TYPES = ['Pure Zari', 'Half-Fine Zari', 'Tested Zari', 'No Zari'];
const WEAVE_TYPES = ['Handloom', 'Powerloom', 'Machine'];

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  sku: z.string().min(2, 'SKU is required'),
  slug: z.string().optional(),
  description: z.string().optional(),
  category: z.string().min(1, 'Category is required'),
  price: z.number().positive('Price must be positive'),
  original_price: z.number().min(0).optional(),
  gst_rate: z.number().min(0),
  fabric: z.string().optional(),
  color: z.string().optional(),
  zari_type: z.string().optional(),
  origin: z.string().optional(),
  weave_type: z.string().optional(),
  weight_grams: z.number().min(0).optional(),
  saree_length_meters: z.number().min(0),
  blouse_piece: z.boolean(),
  stock: z.number().int().min(0),
  is_featured: z.boolean(),
  is_new_arrival: z.boolean(),
  is_best_seller: z.boolean(),
  is_active: z.boolean(),
  thumbnail_url: z.string().optional(),
  care_instructions: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="col-span-full mt-4">
      <h3 className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest border-b border-[#D4AF37]/20 pb-2">
        {title}
      </h3>
    </div>
  );
}

function Field({
  label,
  required,
  error,
  children,
  hint,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-[#FAF9F6]/70">
        {label} {required && <span className="text-[#D4AF37]">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-[#FAF9F6]/30">{hint}</p>}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

const inputCls =
  'w-full px-3 py-2.5 bg-[#160B1E] border border-[#D4AF37]/20 rounded-lg text-[#FAF9F6] text-sm placeholder-[#FAF9F6]/30 focus:outline-none focus:border-[#D4AF37]/50 transition-colors';

const checkboxCls = 'w-4 h-4 accent-[#D4AF37] rounded';

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [toast, setToast] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema) as Resolver<FormValues>,
    defaultValues: {
      gst_rate: 5,
      saree_length_meters: 5.5,
      blouse_piece: false,
      is_featured: false,
      is_new_arrival: false,
      is_best_seller: false,
      is_active: true,
      stock: 0,
    },
  });

  const nameValue = watch('name');

  const loadProduct = useCallback(async () => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (error || !data) {
        setNotFound(true);
        return;
      }

      reset({
        name: data.name || '',
        sku: data.sku || '',
        slug: data.slug || '',
        description: data.description || '',
        category: data.category || '',
        price: data.price || 0,
        original_price: data.original_price || undefined,
        gst_rate: data.gst_rate ?? 5,
        fabric: data.fabric || '',
        color: data.color || '',
        zari_type: data.zari_type || '',
        origin: data.origin || '',
        weave_type: data.weave_type || '',
        weight_grams: data.weight_grams || undefined,
        saree_length_meters: data.saree_length_meters ?? 5.5,
        blouse_piece: data.blouse_piece ?? false,
        stock: data.stock ?? 0,
        is_featured: data.is_featured ?? false,
        is_new_arrival: data.is_new_arrival ?? false,
        is_best_seller: data.is_best_seller ?? false,
        is_active: data.is_active ?? true,
        thumbnail_url: data.thumbnail_url || '',
        care_instructions: data.care_instructions || '',
      });

      setImageUrls(data.images || []);
    } catch {
      setNotFound(true);
    } finally {
      setLoadingProduct(false);
    }
  }, [id, reset]);

  useEffect(() => {
    loadProduct();
  }, [loadProduct]);

  const generateSlug = () => {
    const slug = nameValue
      ?.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    setValue('slug', slug || '');
  };


  const onSubmit = async (values: FormValues) => {
    setSubmitting(true);
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('products')
        .update({ ...values, images: imageUrls })
        .eq('id', id);
      if (error) throw error;
      setToast('Product updated successfully!');
      setTimeout(() => router.push('/admin/products'), 1500);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to update.';
      setToast(`Error: ${message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;
      router.push('/admin/products');
    } catch {
      setToast('Error: Failed to delete product.');
    } finally {
      setDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const handleQuickToggle = async (field: 'is_active' | 'is_featured' | 'is_new_arrival', current: boolean) => {
    try {
      const supabase = createClient();
      await supabase.from('products').update({ [field]: !current }).eq('id', id);
      setValue(field, !current);
      setToast(`${field.replace('is_', '').replace('_', ' ')} updated!`);
      setTimeout(() => setToast(''), 2000);
    } catch {
      setToast('Error: Failed to update.');
    }
  };

  const isActive = watch('is_active');
  const isFeatured = watch('is_featured');
  const isNewArrival = watch('is_new_arrival');

  if (loadingProduct) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <p className="text-[#FAF9F6]/60 text-lg">Product not found.</p>
        <button
          onClick={() => router.push('/admin/products')}
          className="text-[#D4AF37] hover:underline text-sm"
        >
          ← Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl">
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
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/admin/products')}
            className="p-2 rounded-lg text-[#FAF9F6]/50 hover:text-[#FAF9F6] hover:bg-white/5 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-[#FAF9F6]">Edit Product</h2>
            <p className="text-[#FAF9F6]/50 text-sm mt-0.5">Update product information</p>
          </div>
        </div>
      </div>

      {/* Quick Toggles */}
      <div className="flex flex-wrap gap-3">
        {[
          { label: 'Active', field: 'is_active' as const, value: isActive },
          { label: 'Featured', field: 'is_featured' as const, value: isFeatured },
          { label: 'New Arrival', field: 'is_new_arrival' as const, value: isNewArrival },
        ].map(({ label, field, value }) => (
          <button
            key={field}
            type="button"
            onClick={() => handleQuickToggle(field, value ?? false)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
              value
                ? 'bg-[#D4AF37]/15 border-[#D4AF37]/50 text-[#D4AF37]'
                : 'border-[#FAF9F6]/20 text-[#FAF9F6]/40 hover:border-[#FAF9F6]/40'
            }`}
          >
            {value ? '✓' : '○'} {label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-[#1E0F2C] border border-[#D4AF37]/20 rounded-xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <SectionHeader title="Basic Information" />
            <Field label="Product Name" required error={errors.name?.message}>
              <input {...register('name')} className={inputCls} />
            </Field>
            <Field label="SKU" required error={errors.sku?.message}>
              <input {...register('sku')} className={inputCls} />
            </Field>
            <Field label="Slug" hint="Auto-generated from name">
              <div className="flex gap-2">
                <input {...register('slug')} className={inputCls} />
                <button
                  type="button"
                  onClick={generateSlug}
                  className="px-3 py-2.5 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-lg text-[#D4AF37] text-sm hover:bg-[#D4AF37]/20 transition-colors whitespace-nowrap"
                >
                  Generate
                </button>
              </div>
            </Field>
            <Field label="Category" required error={errors.category?.message}>
              <select {...register('category')} className={inputCls}>
                <option value="">Select a category</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </Field>
            <Field label="Description">
              <textarea {...register('description')} rows={3} className={`${inputCls} resize-none`} />
            </Field>

            <SectionHeader title="Pricing" />
            <Field label="Selling Price (₹)" required error={errors.price?.message}>
              <input {...register('price')} type="number" min={0} step={0.01} className={inputCls} />
            </Field>
            <Field label="Original / MRP (₹)">
              <input {...register('original_price')} type="number" min={0} step={0.01} className={inputCls} />
            </Field>
            <Field label="GST Rate (%)">
              <input {...register('gst_rate')} type="number" min={0} max={28} className={inputCls} />
            </Field>

            <SectionHeader title="Fabric Details" />
            <Field label="Fabric">
              <input {...register('fabric')} className={inputCls} />
            </Field>
            <Field label="Color">
              <input {...register('color')} className={inputCls} />
            </Field>
            <Field label="Zari Type">
              <select {...register('zari_type')} className={inputCls}>
                <option value="">Select</option>
                {ZARI_TYPES.map((z) => <option key={z} value={z}>{z}</option>)}
              </select>
            </Field>
            <Field label="Weave Type">
              <select {...register('weave_type')} className={inputCls}>
                <option value="">Select</option>
                {WEAVE_TYPES.map((w) => <option key={w} value={w}>{w}</option>)}
              </select>
            </Field>
            <Field label="Origin">
              <input {...register('origin')} className={inputCls} />
            </Field>

            <SectionHeader title="Specifications" />
            <Field label="Weight (grams)">
              <input {...register('weight_grams')} type="number" min={0} className={inputCls} />
            </Field>
            <Field label="Saree Length (meters)">
              <input {...register('saree_length_meters')} type="number" step={0.1} min={0} className={inputCls} />
            </Field>
            <div className="flex items-center gap-3">
              <input {...register('blouse_piece')} type="checkbox" className={checkboxCls} />
              <label className="text-sm text-[#FAF9F6]/70">Blouse Piece Included</label>
            </div>

            <SectionHeader title="Inventory & Visibility" />
            <Field label="Stock Quantity" required error={errors.stock?.message}>
              <input {...register('stock')} type="number" min={0} className={inputCls} />
            </Field>
            <div className="flex flex-col gap-3">
              <label className="text-sm font-medium text-[#FAF9F6]/70">Flags</label>
              <div className="flex flex-col gap-2">
                {[
                  { name: 'is_featured' as const, label: 'Featured Product' },
                  { name: 'is_new_arrival' as const, label: 'New Arrival' },
                  { name: 'is_best_seller' as const, label: 'Best Seller' },
                  { name: 'is_active' as const, label: 'Active (visible in store)' },
                ].map(({ name, label }) => (
                  <label key={name} className="flex items-center gap-2 cursor-pointer">
                    <input {...register(name)} type="checkbox" className={checkboxCls} />
                    <span className="text-sm text-[#FAF9F6]/60">{label}</span>
                  </label>
                ))}
              </div>
            </div>


            <SectionHeader title="Images" />
            <div className="col-span-full">
              <label className="block text-sm font-medium text-[#FAF9F6]/70 mb-2">
                Product Images
                <span className="text-xs text-[#FAF9F6]/30 font-normal ml-2">
                  First image = cover photo · Hover to set cover or remove
                </span>
              </label>
              <ImageUploader
                images={imageUrls}
                onChange={setImageUrls}
                thumbnail={watch('thumbnail_url')}
                onThumbnailChange={(url) => setValue('thumbnail_url', url)}
              />
            </div>

            <SectionHeader title="Care Instructions" />
            <Field label="Care Instructions">
              <textarea {...register('care_instructions')} rows={3} className={`${inputCls} resize-none`} />
            </Field>
          </div>
        </div>

        <div className="flex items-center justify-between mt-6">
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={submitting}
              className="px-8 py-3 bg-[#D4AF37] hover:bg-[#D4AF37]/90 disabled:opacity-50 text-[#160B1E] font-semibold rounded-lg transition-colors"
            >
              {submitting ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              type="button"
              onClick={() => router.push('/admin/products')}
              className="px-8 py-3 bg-transparent border border-[#D4AF37]/30 text-[#FAF9F6]/70 hover:text-[#FAF9F6] hover:border-[#D4AF37]/60 font-medium rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>

          <button
            type="button"
            onClick={() => setShowDeleteConfirm(true)}
            className="flex items-center gap-2 px-5 py-3 border border-red-500/30 text-red-400 hover:bg-red-900/20 hover:border-red-500/60 font-medium rounded-lg transition-colors text-sm"
          >
            <Trash2 size={15} />
            Delete Product
          </button>
        </div>
      </form>

      {/* Delete Confirm Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center px-4">
          <div className="bg-[#1E0F2C] border border-red-500/30 rounded-xl p-6 max-w-sm w-full shadow-2xl">
            <h3 className="text-[#FAF9F6] font-semibold text-lg mb-2">Delete Product?</h3>
            <p className="text-[#FAF9F6]/60 text-sm mb-6">
              This action cannot be undone. The product will be permanently removed.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
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
