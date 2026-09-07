import React from 'react';
import { ShieldCheck, Bell, HelpCircle } from 'lucide-react';

export default function ProfilePage() {
  return (
    <div className="w-full px-4 pt-6 pb-6">
      <header className="flex justify-between items-center mb-6">
        <div>
          <span className="text-xs font-semibold text-purple-700 uppercase tracking-wider">Account</span>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Profile</h1>
        </div>
        <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm shadow-sm border border-purple-200">
          1Fi
        </div>
      </header>

      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm mb-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 bg-gradient-to-br from-purple-700 to-indigo-900 text-white rounded-2xl flex items-center justify-center font-bold text-lg shadow-md shadow-purple-900/20">
            1F
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">1Fi User</h2>
            <p className="text-xs text-slate-500">KYC Verified Investor</p>
          </div>
        </div>

        <div className="space-y-2">
          {[
            { icon: ShieldCheck, title: 'KYC & Verification', status: 'Verified' },
            { icon: Bell, title: 'Notifications', status: 'On' },
            { icon: HelpCircle, title: 'Support & Help', status: '24/7' },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-50 text-purple-700 rounded-xl">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-slate-800">{item.title}</span>
                </div>
                <span className="text-[11px] font-semibold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full">
                  {item.status}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-slate-100/80 rounded-2xl p-4 text-center border border-slate-200/60">
        <p className="text-xs text-slate-500">
          Profile screen placeholder for Stage 1 application shell.
        </p>
      </div>
    </div>
  );
}
