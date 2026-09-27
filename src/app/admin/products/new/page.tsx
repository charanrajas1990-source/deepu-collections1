'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createClient } from '@/lib/supabase';
import { ArrowLeft } from 'lucide-react';
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
  stock: z.number().int().min(0, 'Stock cannot be negative'),
  is_featured: z.boolean(),
  is_new_arrival: z.boolean(),
  is_best_seller: z.boolean(),
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

export default function NewProductPage() {
  const router = useRouter();
  const [toast, setToast] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>([]);


  const {
    register,
    handleSubmit,
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
      stock: 0,
    },
  });

  const nameValue = watch('name');

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
      const { error } = await supabase.from('products').insert([
        {
          ...values,
          images: imageUrls,
          is_active: true,
        },
      ]);
      if (error) throw error;
      setToast('Product saved successfully!');
      setTimeout(() => {
        router.push('/admin/products');
      }, 1500);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to save product.';
      setToast(`Error: ${message}`);
    } finally {
      setSubmitting(false);
    }
  };

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
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.push('/admin/products')}
          className="p-2 rounded-lg text-[#FAF9F6]/50 hover:text-[#FAF9F6] hover:bg-white/5 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-[#FAF9F6]">Add New Product</h2>
          <p className="text-[#FAF9F6]/50 text-sm mt-0.5">Fill in the details below</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-[#1E0F2C] border border-[#D4AF37]/20 rounded-xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Basic Information */}
            <SectionHeader title="Basic Information" />

            <Field label="Product Name" required error={errors.name?.message}>
              <input
                {...register('name')}
                placeholder="e.g. Kanjivaram Pure Silk Saree"
                className={inputCls}
              />
            </Field>

            <Field label="SKU" required error={errors.sku?.message}>
              <input {...register('sku')} placeholder="e.g. PATTU-001" className={inputCls} />
            </Field>

            <Field label="Slug" hint="Auto-generated from name">
              <div className="flex gap-2">
                <input {...register('slug')} placeholder="product-url-slug" className={inputCls} />
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
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Description" error={errors.description?.message}>
              <textarea
                {...register('description')}
                rows={3}
                placeholder="Product description..."
                className={`${inputCls} resize-none`}
              />
            </Field>

            {/* Pricing */}
            <SectionHeader title="Pricing" />

            <Field label="Selling Price (₹)" required error={errors.price?.message}>
              <input
                {...register('price')}
                type="number"
                min={0}
                step={0.01}
                placeholder="0.00"
                className={inputCls}
              />
            </Field>

            <Field label="Original / MRP (₹)" error={errors.original_price?.message}>
              <input
                {...register('original_price')}
                type="number"
                min={0}
                step={0.01}
                placeholder="0.00"
                className={inputCls}
              />
            </Field>

            <Field label="GST Rate (%)" error={errors.gst_rate?.message}>
              <input
                {...register('gst_rate')}
                type="number"
                min={0}
                max={28}
                className={inputCls}
              />
            </Field>

            {/* Fabric Details */}
            <SectionHeader title="Fabric Details" />

            <Field label="Fabric">
              <input
                {...register('fabric')}
                placeholder="e.g. Pure Silk, Georgette"
                className={inputCls}
              />
            </Field>

            <Field label="Color">
              <input
                {...register('color')}
                placeholder="e.g. Royal Blue, Maroon"
                className={inputCls}
              />
            </Field>

            <Field label="Zari Type">
              <select {...register('zari_type')} className={inputCls}>
                <option value="">Select zari type</option>
                {ZARI_TYPES.map((z) => (
                  <option key={z} value={z}>
                    {z}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Weave Type">
              <select {...register('weave_type')} className={inputCls}>
                <option value="">Select weave type</option>
                {WEAVE_TYPES.map((w) => (
                  <option key={w} value={w}>
                    {w}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Origin / Place">
              <input
                {...register('origin')}
                placeholder="e.g. Kanchipuram, Banarasi"
                className={inputCls}
              />
            </Field>

            {/* Specifications */}
            <SectionHeader title="Specifications" />

            <Field label="Weight (grams)">
              <input
                {...register('weight_grams')}
                type="number"
                min={0}
                placeholder="e.g. 650"
                className={inputCls}
              />
            </Field>

            <Field label="Saree Length (meters)">
              <input
                {...register('saree_length_meters')}
                type="number"
                step={0.1}
                min={0}
                className={inputCls}
              />
            </Field>

            <div className="flex items-center gap-3">
              <input {...register('blouse_piece')} type="checkbox" className={checkboxCls} />
              <label className="text-sm text-[#FAF9F6]/70">Blouse Piece Included</label>
            </div>

            {/* Inventory */}
            <SectionHeader title="Inventory & Visibility" />

            <Field label="Stock Quantity" required error={errors.stock?.message}>
              <input
                {...register('stock')}
                type="number"
                min={0}
                placeholder="0"
                className={inputCls}
              />
            </Field>

            <div className="flex flex-col gap-3">
              <label className="text-sm font-medium text-[#FAF9F6]/70">Flags</label>
              <div className="flex flex-col gap-2">
                {[
                  { name: 'is_featured' as const, label: 'Featured Product' },
                  { name: 'is_new_arrival' as const, label: 'New Arrival' },
                  { name: 'is_best_seller' as const, label: 'Best Seller' },
                ].map(({ name, label }) => (
                  <label key={name} className="flex items-center gap-2 cursor-pointer">
                    <input {...register(name)} type="checkbox" className={checkboxCls} />
                    <span className="text-sm text-[#FAF9F6]/60">{label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Images */}
            <SectionHeader title="Images" />

            <div className="col-span-full">
              <label className="block text-sm font-medium text-[#FAF9F6]/70 mb-2">
                Product Images <span className="text-[#D4AF37]">*</span>
                <span className="text-xs text-[#FAF9F6]/30 font-normal ml-2">
                  First image = cover photo · Drag to reorder
                </span>
              </label>
              <ImageUploader
                images={imageUrls}
                onChange={setImageUrls}
                thumbnail={watch('thumbnail_url')}
                onThumbnailChange={(url) => setValue('thumbnail_url', url)}
              />
            </div>

            {/* Care Instructions */}
            <SectionHeader title="Care Instructions" />

            <Field label="Care Instructions" error={errors.care_instructions?.message}>
              <textarea
                {...register('care_instructions')}
                rows={3}
                placeholder="e.g. Dry clean only. Store in a cool, dry place..."
                className={`${inputCls} resize-none`}
              />
            </Field>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 mt-6">
          <button
            type="submit"
            disabled={submitting}
            className="px-8 py-3 bg-[#D4AF37] hover:bg-[#D4AF37]/90 disabled:opacity-50 text-[#160B1E] font-semibold rounded-lg transition-colors"
          >
            {submitting ? 'Saving...' : 'Save Product'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/admin/products')}
            className="px-8 py-3 bg-transparent border border-[#D4AF37]/30 text-[#FAF9F6]/70 hover:text-[#FAF9F6] hover:border-[#D4AF37]/60 font-medium rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
