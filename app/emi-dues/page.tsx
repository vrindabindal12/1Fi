import React from 'react';
import { Receipt, CheckCircle2 } from 'lucide-react';

export default function EmiDuesPage() {
  return (
    <div className="w-full px-4 pt-6 pb-6">
      <header className="flex justify-between items-center mb-6">
        <div>
          <span className="text-xs font-semibold text-purple-700 uppercase tracking-wider">Repayments</span>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">EMI Dues</h1>
        </div>
        <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm shadow-sm border border-purple-200">
          1Fi
        </div>
      </header>

      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-purple-100 text-purple-700 rounded-2xl">
            <Receipt className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">Upcoming Dues</h2>
            <p className="text-xs text-slate-500">Track active EMI loan installments</p>
          </div>
        </div>

        <div className="bg-purple-50/60 rounded-2xl p-4 border border-purple-100 text-center">
          <div className="flex items-center justify-center gap-2 text-purple-700 font-bold text-sm mb-1">
            <CheckCircle2 className="w-4 h-4" />
            <span>No Active Dues Pending</span>
          </div>
          <p className="text-xs text-slate-500">
            Select products in 1Fi Marketplace to generate zero-cost EMI schedules.
          </p>
        </div>
      </div>

      <div className="bg-slate-100/80 rounded-2xl p-4 text-center border border-slate-200/60">
        <p className="text-xs text-slate-500">
          EMI Dues screen placeholder for Stage 1 application shell.
        </p>
      </div>
    </div>
  );
}
