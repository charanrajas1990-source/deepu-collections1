import Link from 'next/link';
import { Package, ShoppingBag, AlertCircle, IndianRupee, Plus, Eye } from 'lucide-react';

const stats = [
  {
    label: 'Total Products',
    value: '128',
    icon: Package,
    color: 'from-purple-900/40 to-purple-800/20',
    border: 'border-purple-500/30',
    iconColor: 'text-purple-400',
  },
  {
    label: 'Active Orders',
    value: '24',
    icon: ShoppingBag,
    color: 'from-blue-900/40 to-blue-800/20',
    border: 'border-blue-500/30',
    iconColor: 'text-blue-400',
  },
  {
    label: 'Out of Stock',
    value: '9',
    icon: AlertCircle,
    color: 'from-red-900/40 to-red-800/20',
    border: 'border-red-500/30',
    iconColor: 'text-red-400',
  },
  {
    label: 'Total Revenue',
    value: '₹4,82,350',
    icon: IndianRupee,
    color: 'from-[#D4AF37]/20 to-[#D4AF37]/5',
    border: 'border-[#D4AF37]/30',
    iconColor: 'text-[#D4AF37]',
  },
];

const recentOrders = [
  {
    id: 'ORD-0024',
    customer: 'Priya Lakshmi',
    amount: '₹3,499',
    status: 'shipped',
    date: '26 Sep 2026',
  },
  {
    id: 'ORD-0023',
    customer: 'Meera Devi',
    amount: '₹5,200',
    status: 'confirmed',
    date: '25 Sep 2026',
  },
  {
    id: 'ORD-0022',
    customer: 'Ananya Reddy',
    amount: '₹2,850',
    status: 'placed',
    date: '25 Sep 2026',
  },
  {
    id: 'ORD-0021',
    customer: 'Surekha Rao',
    amount: '₹7,100',
    status: 'delivered',
    date: '24 Sep 2026',
  },
  {
    id: 'ORD-0020',
    customer: 'Kavitha Nair',
    amount: '₹1,999',
    status: 'cancelled',
    date: '24 Sep 2026',
  },
];

const statusConfig: Record<string, { label: string; className: string }> = {
  placed: { label: 'Placed', className: 'bg-blue-900/40 text-blue-300 border border-blue-500/30' },
  confirmed: { label: 'Confirmed', className: 'bg-yellow-900/40 text-yellow-300 border border-yellow-500/30' },
  shipped: { label: 'Shipped', className: 'bg-purple-900/40 text-purple-300 border border-purple-500/30' },
  delivered: { label: 'Delivered', className: 'bg-green-900/40 text-green-300 border border-green-500/30' },
  cancelled: { label: 'Cancelled', className: 'bg-red-900/40 text-red-300 border border-red-500/30' },
};

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-[#FAF9F6]">Dashboard</h2>
        <p className="text-[#FAF9F6]/50 text-sm mt-1">
          Welcome back! Here&apos;s what&apos;s happening today.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {stats.map(({ label, value, icon: Icon, color, border, iconColor }) => (
          <div
            key={label}
            className={`bg-gradient-to-br ${color} border ${border} rounded-xl p-6 flex items-start gap-4`}
          >
            <div className={`p-3 rounded-lg bg-black/20 ${iconColor}`}>
              <Icon size={22} />
            </div>
            <div>
              <p className="text-[#FAF9F6]/50 text-xs font-medium uppercase tracking-wide">
                {label}
              </p>
              <p className="text-[#FAF9F6] text-2xl font-bold mt-1">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3">
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 px-5 py-2.5 bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#160B1E] font-semibold text-sm rounded-lg transition-colors"
        >
          <Plus size={16} />
          Add Product
        </Link>
        <Link
          href="/admin/orders"
          className="flex items-center gap-2 px-5 py-2.5 bg-[#1E0F2C] border border-[#D4AF37]/30 hover:border-[#D4AF37]/60 text-[#FAF9F6] font-medium text-sm rounded-lg transition-colors"
        >
          <Eye size={16} className="text-[#D4AF37]" />
          View Orders
        </Link>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-[#1E0F2C] border border-[#D4AF37]/20 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-[#D4AF37]/20 flex items-center justify-between">
          <h3 className="text-[#FAF9F6] font-semibold">Recent Orders</h3>
          <Link
            href="/admin/orders"
            className="text-[#D4AF37] text-sm hover:underline"
          >
            View all →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#D4AF37]/10">
                <th className="text-left px-6 py-3 text-[#FAF9F6]/40 text-xs font-medium uppercase tracking-wide">
                  Order #
                </th>
                <th className="text-left px-6 py-3 text-[#FAF9F6]/40 text-xs font-medium uppercase tracking-wide">
                  Customer
                </th>
                <th className="text-left px-6 py-3 text-[#FAF9F6]/40 text-xs font-medium uppercase tracking-wide">
                  Amount
                </th>
                <th className="text-left px-6 py-3 text-[#FAF9F6]/40 text-xs font-medium uppercase tracking-wide">
                  Status
                </th>
                <th className="text-left px-6 py-3 text-[#FAF9F6]/40 text-xs font-medium uppercase tracking-wide">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D4AF37]/10">
              {recentOrders.map((order) => {
                const cfg = statusConfig[order.status];
                return (
                  <tr key={order.id} className="hover:bg-white/3 transition-colors">
                    <td className="px-6 py-4 text-[#D4AF37] font-mono text-sm font-semibold">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 text-[#FAF9F6] text-sm">{order.customer}</td>
                    <td className="px-6 py-4 text-[#FAF9F6] text-sm font-medium">
                      {order.amount}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${cfg.className}`}>
                        {cfg.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[#FAF9F6]/50 text-sm">{order.date}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
