'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase';
import { Plus, MessageCircle, X } from 'lucide-react';

type OrderStatus = 'placed' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';

interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  phone: string;
  items_count: number;
  total_amount: number;
  payment_method: string;
  status: OrderStatus;
  created_at: string;
}

const STATUSES: OrderStatus[] = ['placed', 'confirmed', 'shipped', 'delivered', 'cancelled'];

const statusConfig: Record<OrderStatus, { label: string; className: string }> = {
  placed: { label: 'Placed', className: 'bg-blue-900/40 text-blue-300 border border-blue-500/30' },
  confirmed: { label: 'Confirmed', className: 'bg-yellow-900/40 text-yellow-300 border border-yellow-500/30' },
  shipped: { label: 'Shipped', className: 'bg-purple-900/40 text-purple-300 border border-purple-500/30' },
  delivered: { label: 'Delivered', className: 'bg-green-900/40 text-green-300 border border-green-500/30' },
  cancelled: { label: 'Cancelled', className: 'bg-red-900/40 text-red-300 border border-red-500/30' },
};

function AddOrderModal({
  onClose,
  onSaved,
}: {
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState({
    customer_name: '',
    phone: '',
    items_description: '',
    total_amount: '',
    payment_method: 'Cash on Delivery',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.customer_name || !form.phone || !form.total_amount) {
      setError('Please fill in the required fields.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      const supabase = createClient();
      const order_number = `ORD-${Date.now().toString().slice(-6)}`;
      const { error: insertError } = await supabase.from('orders').insert([
        {
          order_number,
          customer_name: form.customer_name,
          phone: form.phone,
          items_description: form.items_description,
          total_amount: parseFloat(form.total_amount),
          payment_method: form.payment_method,
          status: 'placed',
        },
      ]);
      if (insertError) throw insertError;
      onSaved();
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to save order.');
    } finally {
      setSaving(false);
    }
  };

  const inputCls =
    'w-full px-3 py-2.5 bg-[#160B1E] border border-[#D4AF37]/20 rounded-lg text-[#FAF9F6] text-sm placeholder-[#FAF9F6]/30 focus:outline-none focus:border-[#D4AF37]/50 transition-colors';

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center px-4">
      <div className="bg-[#1E0F2C] border border-[#D4AF37]/30 rounded-xl p-6 max-w-md w-full shadow-2xl">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-[#FAF9F6] font-semibold text-lg">Add Manual Order</h3>
          <button
            onClick={onClose}
            className="text-[#FAF9F6]/40 hover:text-[#FAF9F6] transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {error && (
          <div className="mb-4 px-3 py-2 bg-red-900/30 border border-red-500/30 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-[#FAF9F6]/60 mb-1.5">
              Customer Name <span className="text-[#D4AF37]">*</span>
            </label>
            <input
              name="customer_name"
              value={form.customer_name}
              onChange={handleChange}
              placeholder="Full name"
              className={inputCls}
            />
          </div>
          <div>
            <label className="block text-sm text-[#FAF9F6]/60 mb-1.5">
              Phone <span className="text-[#D4AF37]">*</span>
            </label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="10-digit mobile number"
              className={inputCls}
            />
          </div>
          <div>
            <label className="block text-sm text-[#FAF9F6]/60 mb-1.5">Items Description</label>
            <textarea
              name="items_description"
              value={form.items_description}
              onChange={handleChange}
              rows={2}
              placeholder="e.g. 1x Kanjivaram Silk Saree (Red)"
              className={`${inputCls} resize-none`}
            />
          </div>
          <div>
            <label className="block text-sm text-[#FAF9F6]/60 mb-1.5">
              Amount (₹) <span className="text-[#D4AF37]">*</span>
            </label>
            <input
              name="total_amount"
              type="number"
              value={form.total_amount}
              onChange={handleChange}
              placeholder="0.00"
              className={inputCls}
            />
          </div>
          <div>
            <label className="block text-sm text-[#FAF9F6]/60 mb-1.5">Payment Method</label>
            <select name="payment_method" value={form.payment_method} onChange={handleChange} className={inputCls}>
              <option>Cash on Delivery</option>
              <option>UPI</option>
              <option>Bank Transfer</option>
              <option>WhatsApp Pay</option>
            </select>
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-lg border border-[#D4AF37]/30 text-[#FAF9F6]/70 text-sm font-medium hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 py-2.5 rounded-lg bg-[#D4AF37] hover:bg-[#D4AF37]/90 disabled:opacity-50 text-[#160B1E] text-sm font-semibold transition-colors"
            >
              {saving ? 'Saving...' : 'Add Order'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | OrderStatus>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setOrders(data || []);
    } catch {
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    try {
      const supabase = createClient();
      await supabase.from('orders').update({ status: newStatus }).eq('id', orderId);
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
      );
    } catch {
      alert('Failed to update order status.');
    }
  };

  const openWhatsApp = (order: Order) => {
    const msg = encodeURIComponent(
      `Hi ${order.customer_name}, your order #${order.order_number} from Deepu's Collection has been received. We will update you shortly. Thank you!`
    );
    window.open(`https://wa.me/91${order.phone}?text=${msg}`, '_blank');
  };

  const filtered =
    activeTab === 'all' ? orders : orders.filter((o) => o.status === activeTab);

  const tabs: Array<'all' | OrderStatus> = ['all', ...STATUSES];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#FAF9F6]">Orders</h2>
          <p className="text-[#FAF9F6]/50 text-sm mt-1">{orders.length} total orders</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#160B1E] font-semibold text-sm rounded-lg transition-colors self-start sm:self-auto"
        >
          <Plus size={16} />
          Add Order
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-all ${
              activeTab === tab
                ? 'bg-[#D4AF37] text-[#160B1E]'
                : 'bg-[#1E0F2C] border border-[#D4AF37]/20 text-[#FAF9F6]/60 hover:text-[#FAF9F6] hover:border-[#D4AF37]/40'
            }`}
          >
            {tab === 'all' ? `All (${orders.length})` : statusConfig[tab].label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-[#1E0F2C] border border-[#D4AF37]/20 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#D4AF37]/15">
                {[
                  'Order #',
                  'Customer',
                  'Phone',
                  'Items',
                  'Total',
                  'Payment',
                  'Status',
                  'Date',
                  'Actions',
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left px-4 py-3 text-[#FAF9F6]/40 text-xs font-medium uppercase tracking-wide"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D4AF37]/10">
              {loading ? (
                [...Array(4)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    {[...Array(9)].map((__, j) => (
                      <td key={j} className="px-4 py-3">
                        <div className="h-4 bg-white/10 rounded" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-4 py-16 text-center text-[#FAF9F6]/40 text-sm">
                    No orders found.
                  </td>
                </tr>
              ) : (
                filtered.map((order) => {
                  const cfg = statusConfig[order.status];
                  return (
                    <tr key={order.id} className="hover:bg-white/3 transition-colors">
                      <td className="px-4 py-3 text-[#D4AF37] font-mono text-xs font-semibold">
                        {order.order_number}
                      </td>
                      <td className="px-4 py-3 text-[#FAF9F6] text-sm">{order.customer_name}</td>
                      <td className="px-4 py-3 text-[#FAF9F6]/60 text-sm font-mono">
                        {order.phone}
                      </td>
                      <td className="px-4 py-3 text-[#FAF9F6]/60 text-sm text-center">
                        {order.items_count ?? '—'}
                      </td>
                      <td className="px-4 py-3 text-[#FAF9F6] text-sm font-medium">
                        ₹{(order.total_amount || 0).toLocaleString('en-IN')}
                      </td>
                      <td className="px-4 py-3 text-[#FAF9F6]/60 text-xs">
                        {order.payment_method}
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={order.status}
                          onChange={(e) =>
                            handleStatusChange(order.id, e.target.value as OrderStatus)
                          }
                          className={`text-xs font-medium px-2 py-1 rounded-full border-0 outline-none cursor-pointer ${cfg.className} bg-transparent`}
                        >
                          {STATUSES.map((s) => (
                            <option key={s} value={s} className="bg-[#1E0F2C] text-[#FAF9F6]">
                              {statusConfig[s].label}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-3 text-[#FAF9F6]/50 text-xs whitespace-nowrap">
                        {new Date(order.created_at).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => openWhatsApp(order)}
                          title="Send WhatsApp message"
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-900/30 border border-green-500/30 text-green-400 hover:bg-green-900/50 transition-colors text-xs font-medium"
                        >
                          <MessageCircle size={13} />
                          WA
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showAddModal && (
        <AddOrderModal onClose={() => setShowAddModal(false)} onSaved={fetchOrders} />
      )}
    </div>
  );
}
