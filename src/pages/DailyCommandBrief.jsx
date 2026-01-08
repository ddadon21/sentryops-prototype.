import React from 'react';
import { FileText, Clock, AlertCircle, CheckCircle, Users, Calendar, TrendingUp, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';

export default function DailyCommandBrief() {
  const navigate = useNavigate();

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-white">Daily Command Brief</h1>
            <p className="text-slate-400 mt-1">{currentDate}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/40 border border-slate-700/50 rounded-xl">
              <Clock className="w-4 h-4 text-amber-400" />
              <span className="text-sm text-slate-300">Last updated: 06:00</span>
            </div>
          </div>
        </div>

        {/* Placeholder Content */}
        <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-8">
          <div className="flex flex-col items-center justify-center text-center py-12">
            <div className="w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center mb-4">
              <FileText className="w-8 h-8 text-amber-400" />
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">Daily Command Brief</h2>
            <p className="text-slate-400 max-w-md">
              This page will contain the daily command briefing with key operational updates,
              staffing status, and priority items for command staff review.
            </p>
          </div>

          {/* Placeholder Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            <div className="bg-slate-900/50 border border-slate-700/30 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <AlertCircle className="w-5 h-5 text-red-400" />
                <span className="text-sm font-medium text-slate-300">Critical Alerts</span>
              </div>
              <p className="text-2xl font-bold text-white">--</p>
            </div>
            <div className="bg-slate-900/50 border border-slate-700/30 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <span className="text-sm font-medium text-slate-300">Pending Approvals</span>
              </div>
              <p className="text-2xl font-bold text-white">--</p>
            </div>
            <div className="bg-slate-900/50 border border-slate-700/30 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <Users className="w-5 h-5 text-blue-400" />
                <span className="text-sm font-medium text-slate-300">On Duty Today</span>
              </div>
              <p className="text-2xl font-bold text-white">--</p>
            </div>
            <div className="bg-slate-900/50 border border-slate-700/30 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <Calendar className="w-5 h-5 text-purple-400" />
                <span className="text-sm font-medium text-slate-300">Scheduled Events</span>
              </div>
              <p className="text-2xl font-bold text-white">--</p>
            </div>
          </div>
        </div>

        {/* Additional Placeholder Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-5 h-5 text-amber-400" />
              <h3 className="text-lg font-semibold text-white">Operational Highlights</h3>
            </div>
            <div className="text-slate-500 text-sm">
              Key operational metrics and highlights will be displayed here.
            </div>
          </div>
          <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-5 h-5 text-amber-400" />
              <h3 className="text-lg font-semibold text-white">Priority Items</h3>
            </div>
            <div className="text-slate-500 text-sm">
              Priority items requiring command attention will be listed here.
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
