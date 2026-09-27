'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase';
import { Package, ShoppingBag, AlertCircle, IndianRupee, Plus, Eye } from 'lucide-react';

interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  total_amount: number;
  status: string;
  created_at: string;
}

const statusConfig: Record<string, { label: string; className: string }> = {
  placed: { label: 'Placed', className: 'bg-blue-900/40 text-blue-300 border border-blue-500/30' },
  confirmed: { label: 'Confirmed', className: 'bg-yellow-900/40 text-yellow-300 border border-yellow-500/30' },
  shipped: { label: 'Shipped', className: 'bg-purple-900/40 text-purple-300 border border-purple-500/30' },
  delivered: { label: 'Delivered', className: 'bg-green-900/40 text-green-300 border border-green-500/30' },
  cancelled: { label: 'Cancelled', className: 'bg-red-900/40 text-red-300 border border-red-500/30' },
};

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({ totalProducts: 0, activeOrders: 0, outOfStock: 0, totalRevenue: 0 });
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const supabase = createClient();

        const [productsRes, activeOrdersRes, outOfStockRes, revenueRes, recentOrdersRes] = await Promise.all([
          supabase.from('products').select('id', { count: 'exact', head: true }),
          supabase.from('orders').select('id', { count: 'exact', head: true }).in('status', ['placed', 'confirmed', 'shipped']),
          supabase.from('products').select('id', { count: 'exact', head: true }).eq('stock', 0),
          supabase.from('orders').select('total_amount').eq('status', 'delivered'),
          supabase.from('orders').select('id, order_number, customer_name, total_amount, status, created_at').order('created_at', { ascending: false }).limit(5),
        ]);

        const revenue = (revenueRes.data || []).reduce((sum: number, o: { total_amount: number }) => sum + (o.total_amount || 0), 0);

        setStats({
          totalProducts: productsRes.count || 0,
          activeOrders: activeOrdersRes.count || 0,
          outOfStock: outOfStockRes.count || 0,
          totalRevenue: revenue,
        });
        setRecentOrders(recentOrdersRes.data || []);
      } catch {
        // Supabase not configured yet
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const statCards = [
    {
      label: 'Total Products',
      value: loading ? '...' : stats.totalProducts.toString(),
      icon: Package,
      color: 'from-purple-900/40 to-purple-800/20',
      border: 'border-purple-500/30',
      iconColor: 'text-purple-400',
    },
    {
      label: 'Active Orders',
      value: loading ? '...' : stats.activeOrders.toString(),
      icon: ShoppingBag,
      color: 'from-blue-900/40 to-blue-800/20',
      border: 'border-blue-500/30',
      iconColor: 'text-blue-400',
    },
    {
      label: 'Out of Stock',
      value: loading ? '...' : stats.outOfStock.toString(),
      icon: AlertCircle,
      color: 'from-red-900/40 to-red-800/20',
      border: 'border-red-500/30',
      iconColor: 'text-red-400',
    },
    {
      label: 'Total Revenue',
      value: loading ? '...' : `₹${stats.totalRevenue.toLocaleString('en-IN')}`,
      icon: IndianRupee,
      color: 'from-[#D4AF37]/20 to-[#D4AF37]/5',
      border: 'border-[#D4AF37]/30',
      iconColor: 'text-[#D4AF37]',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-[#FAF9F6]">Dashboard</h2>
        <p className="text-[#FAF9F6]/50 text-sm mt-1">
          Welcome back! Here&apos;s what&apos;s happening today.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {statCards.map(({ label, value, icon: Icon, color, border, iconColor }) => (
          <div key={label} className={`bg-gradient-to-br ${color} border ${border} rounded-xl p-6 flex items-start gap-4`}>
            <div className={`p-3 rounded-lg bg-black/20 ${iconColor}`}>
              <Icon size={22} />
            </div>
            <div>
              <p className="text-[#FAF9F6]/50 text-xs font-medium uppercase tracking-wide">{label}</p>
              <p className="text-[#FAF9F6] text-2xl font-bold mt-1">{value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <Link href="/admin/products/new" className="flex items-center gap-2 px-5 py-2.5 bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#160B1E] font-semibold text-sm rounded-lg transition-colors">
          <Plus size={16} />
          Add Product
        </Link>
        <Link href="/admin/orders" className="flex items-center gap-2 px-5 py-2.5 bg-[#1E0F2C] border border-[#D4AF37]/30 hover:border-[#D4AF37]/60 text-[#FAF9F6] font-medium text-sm rounded-lg transition-colors">
          <Eye size={16} className="text-[#D4AF37]" />
          View Orders
        </Link>
      </div>

      <div className="bg-[#1E0F2C] border border-[#D4AF37]/20 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-[#D4AF37]/20 flex items-center justify-between">
          <h3 className="text-[#FAF9F6] font-semibold">Recent Orders</h3>
          <Link href="/admin/orders" className="text-[#D4AF37] text-sm hover:underline">View all →</Link>
        </div>

        {loading ? (
          <div className="p-8 text-center text-[#FAF9F6]/30 text-sm">Loading...</div>
        ) : recentOrders.length === 0 ? (
          <div className="p-12 text-center">
            <ShoppingBag size={32} className="text-[#FAF9F6]/20 mx-auto mb-3" />
            <p className="text-[#FAF9F6]/40 text-sm">No orders yet</p>
            <p className="text-[#FAF9F6]/25 text-xs mt-1">Orders placed by customers will appear here</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#D4AF37]/10">
                  {['Order #', 'Customer', 'Amount', 'Status', 'Date'].map((h) => (
                    <th key={h} className="text-left px-6 py-3 text-[#FAF9F6]/40 text-xs font-medium uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D4AF37]/10">
                {recentOrders.map((order) => {
                  const cfg = statusConfig[order.status] || { label: order.status, className: 'bg-gray-900/40 text-gray-300' };
                  return (
                    <tr key={order.id} className="hover:bg-white/3 transition-colors">
                      <td className="px-6 py-4 text-[#D4AF37] font-mono text-sm font-semibold">{order.order_number}</td>
                      <td className="px-6 py-4 text-[#FAF9F6] text-sm">{order.customer_name}</td>
                      <td className="px-6 py-4 text-[#FAF9F6] text-sm font-medium">₹{order.total_amount?.toLocaleString('en-IN')}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${cfg.className}`}>{cfg.label}</span>
                      </td>
                      <td className="px-6 py-4 text-[#FAF9F6]/50 text-sm">
                        {new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
