import React from 'react';
import { ShieldCheck, AlertTriangle, FileCheck, Scale, ClipboardCheck, TrendingUp, Calendar, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
export default function RiskCompliance() {
  const navigate = useNavigate();

  return (
      <div className="p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-white">Risk & Compliance</h1>
            <p className="text-slate-400 mt-1">Agency-wide risk management and compliance monitoring</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-amber-500/90 hover:bg-amber-500 text-white rounded-xl transition-colors">
              <FileCheck className="w-4 h-4" />
              <span className="text-sm font-medium">Generate Report</span>
            </button>
          </div>
        </div>

        {/* Placeholder Content */}
        <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-8">
          <div className="flex flex-col items-center justify-center text-center py-12">
            <div className="w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center mb-4">
              <ShieldCheck className="w-8 h-8 text-amber-400" />
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">Risk & Compliance Dashboard</h2>
            <p className="text-slate-400 max-w-md">
              This page will provide comprehensive risk assessment, compliance tracking,
              and regulatory oversight for all agency operations.
            </p>
          </div>

          {/* Placeholder Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            <div className="bg-slate-900/50 border border-slate-700/30 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
                <span className="text-sm font-medium text-slate-300">Open Risk Items</span>
              </div>
              <p className="text-2xl font-bold text-white">--</p>
            </div>
            <div className="bg-slate-900/50 border border-slate-700/30 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span className="text-sm font-medium text-slate-300">Compliance Rate</span>
              </div>
              <p className="text-2xl font-bold text-white">--%</p>
            </div>
            <div className="bg-slate-900/50 border border-slate-700/30 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <ClipboardCheck className="w-5 h-5 text-blue-400" />
                <span className="text-sm font-medium text-slate-300">Audits This Year</span>
              </div>
              <p className="text-2xl font-bold text-white">--</p>
            </div>
            <div className="bg-slate-900/50 border border-slate-700/30 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <Calendar className="w-5 h-5 text-purple-400" />
                <span className="text-sm font-medium text-slate-300">Next Review</span>
              </div>
              <p className="text-2xl font-bold text-white">--</p>
            </div>
          </div>
        </div>

        {/* Additional Placeholder Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Scale className="w-5 h-5 text-amber-400" />
              <h3 className="text-lg font-semibold text-white">Regulatory Compliance</h3>
            </div>
            <div className="text-slate-500 text-sm">
              CJIS, ACA, PREA, and other regulatory compliance status will be tracked here.
            </div>
          </div>
          <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-5 h-5 text-amber-400" />
              <h3 className="text-lg font-semibold text-white">Risk Trends</h3>
            </div>
            <div className="text-slate-500 text-sm">
              Historical risk trends and mitigation progress will be displayed here.
            </div>
          </div>
        </div>

        {/* Policy Compliance Section */}
        <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <FileCheck className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-semibold text-white">Policy Compliance Status</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-900/30 border border-slate-700/30 rounded-xl p-4">
              <p className="text-sm text-slate-400 mb-1">Use of Force Policies</p>
              <p className="text-lg font-semibold text-emerald-400">--% Compliant</p>
            </div>
            <div className="bg-slate-900/30 border border-slate-700/30 rounded-xl p-4">
              <p className="text-sm text-slate-400 mb-1">Training Requirements</p>
              <p className="text-lg font-semibold text-emerald-400">--% Compliant</p>
            </div>
            <div className="bg-slate-900/30 border border-slate-700/30 rounded-xl p-4">
              <p className="text-sm text-slate-400 mb-1">Equipment Certifications</p>
              <p className="text-lg font-semibold text-amber-400">--% Compliant</p>
            </div>
          </div>
        </div>
      </div>
  );
}
