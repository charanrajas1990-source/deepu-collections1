'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase';
import {
  Store,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Shield,
  ExternalLink,
} from 'lucide-react';

const STORE_INFO = {
  name: "Deepu's Collection",
  phone1: '9182319328',
  phone2: '9182745115',
  email: 'deepu4dh@gmail.com',
  address:
    'Kapavaram, Korukonda Mandalam, Near Rajahmundry, East Godavari District, Andhra Pradesh - 533289',
  whatsapp: '919182319328',
};

function InfoCard({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#1E0F2C] border border-[#D4AF37]/20 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-5 border-b border-[#D4AF37]/15 pb-4">
        <div className="p-2 rounded-lg bg-[#D4AF37]/10">
          <Icon size={18} className="text-[#D4AF37]" />
        </div>
        <h3 className="text-[#FAF9F6] font-semibold">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function InfoRow({ label, value, href }: { label: string; value: string; href?: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 py-3 border-b border-[#D4AF37]/10 last:border-0">
      <span className="text-[#FAF9F6]/40 text-sm font-medium min-w-[140px]">{label}</span>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#D4AF37] text-sm hover:underline flex items-center gap-1"
        >
          {value}
          <ExternalLink size={12} />
        </a>
      ) : (
        <span className="text-[#FAF9F6] text-sm">{value}</span>
      )}
    </div>
  );
}

export default function SettingsPage() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwLoading, setPwLoading] = useState(false);
  const [pwMessage, setPwMessage] = useState('');
  const [pwError, setPwError] = useState('');

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwMessage('');
    setPwError('');

    if (newPassword.length < 6) {
      setPwError('New password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPwError('Passwords do not match.');
      return;
    }

    setPwLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      setPwMessage('Password updated successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: unknown) {
      setPwError(err instanceof Error ? err.message : 'Failed to update password.');
    } finally {
      setPwLoading(false);
    }
  };

  const inputCls =
    'w-full px-3 py-2.5 bg-[#160B1E] border border-[#D4AF37]/20 rounded-lg text-[#FAF9F6] text-sm placeholder-[#FAF9F6]/30 focus:outline-none focus:border-[#D4AF37]/50 transition-colors';

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-[#FAF9F6]">Settings</h2>
        <p className="text-[#FAF9F6]/50 text-sm mt-1">
          Store configuration and admin preferences
        </p>
      </div>

      {/* Store Info */}
      <InfoCard title="Store Information" icon={Store}>
        <InfoRow label="Store Name" value={STORE_INFO.name} />
        <InfoRow label="Primary Phone" value={STORE_INFO.phone1} href={`tel:${STORE_INFO.phone1}`} />
        <InfoRow label="Secondary Phone" value={STORE_INFO.phone2} href={`tel:${STORE_INFO.phone2}`} />
        <InfoRow label="Email" value={STORE_INFO.email} href={`mailto:${STORE_INFO.email}`} />
        <InfoRow label="Address" value={STORE_INFO.address} />
        <div className="pt-2">
          <p className="text-[#FAF9F6]/30 text-xs italic">
            Contact your developer to update store information in Phase 2.
          </p>
        </div>
      </InfoCard>

      {/* Contact Channels */}
      <InfoCard title="Contact Channels" icon={Phone}>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-3 border-b border-[#D4AF37]/10">
            <div className="flex items-center gap-3">
              <div className="p-1.5 rounded-lg bg-green-900/30">
                <MessageCircle size={16} className="text-green-400" />
              </div>
              <div>
                <p className="text-[#FAF9F6] text-sm font-medium">WhatsApp Business</p>
                <p className="text-[#FAF9F6]/40 text-xs">+{STORE_INFO.whatsapp}</p>
              </div>
            </div>
            <a
              href={`https://wa.me/${STORE_INFO.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-900/30 border border-green-500/30 text-green-400 text-xs font-medium hover:bg-green-900/50 transition-colors"
            >
              <ExternalLink size={12} />
              Open
            </a>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-[#D4AF37]/10">
            <div className="flex items-center gap-3">
              <div className="p-1.5 rounded-lg bg-blue-900/30">
                <Mail size={16} className="text-blue-400" />
              </div>
              <div>
                <p className="text-[#FAF9F6] text-sm font-medium">Email</p>
                <p className="text-[#FAF9F6]/40 text-xs">{STORE_INFO.email}</p>
              </div>
            </div>
            <a
              href={`mailto:${STORE_INFO.email}`}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-900/30 border border-blue-500/30 text-blue-400 text-xs font-medium hover:bg-blue-900/50 transition-colors"
            >
              <Mail size={12} />
              Compose
            </a>
          </div>

          <div className="flex items-start gap-3 py-3">
            <div className="p-1.5 rounded-lg bg-purple-900/30">
              <MapPin size={16} className="text-purple-400" />
            </div>
            <div>
              <p className="text-[#FAF9F6] text-sm font-medium">Store Address</p>
              <p className="text-[#FAF9F6]/50 text-xs mt-1 leading-relaxed">
                {STORE_INFO.address}
              </p>
            </div>
          </div>
        </div>
      </InfoCard>

      {/* Password Update */}
      <InfoCard title="Change Admin Password" icon={Shield}>
        {pwMessage && (
          <div className="mb-4 px-4 py-3 bg-green-900/30 border border-green-500/30 rounded-lg text-green-300 text-sm">
            {pwMessage}
          </div>
        )}
        {pwError && (
          <div className="mb-4 px-4 py-3 bg-red-900/30 border border-red-500/30 rounded-lg text-red-400 text-sm">
            {pwError}
          </div>
        )}

        <form onSubmit={handlePasswordUpdate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#FAF9F6]/60 mb-1.5">
              Current Password
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••"
              className={inputCls}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#FAF9F6]/60 mb-1.5">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Min. 6 characters"
              className={inputCls}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#FAF9F6]/60 mb-1.5">
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repeat new password"
              className={inputCls}
            />
          </div>
          <button
            type="submit"
            disabled={pwLoading || !newPassword || !confirmPassword}
            className="px-6 py-2.5 bg-[#D4AF37] hover:bg-[#D4AF37]/90 disabled:opacity-50 disabled:cursor-not-allowed text-[#160B1E] font-semibold text-sm rounded-lg transition-colors"
          >
            {pwLoading ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </InfoCard>

      {/* Version info */}
      <div className="text-center pt-2">
        <p className="text-[#FAF9F6]/20 text-xs">
          Deepu&apos;s Collection Admin v1.0 &mdash; Phase 1
        </p>
      </div>
    </div>
  );
}
