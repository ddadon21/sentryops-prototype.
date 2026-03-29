import React, { useState } from 'react';
import { User, Mail, Shield, Phone, MapPin, Calendar, Edit3, Save, X, Camera, Award, Clock, CheckCircle } from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';

export default function UserProfile() {
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: 'Sheriff Thompson',
    email: 'sheriff.thompson@gwinnettcounty.com',
    phone: '(770) 513-5100',
    title: 'Sheriff',
    role: 'Administrator',
    department: 'Command',
    location: 'Gwinnett County Sheriff\'s Office',
    badgeNumber: 'S-001',
    startDate: 'January 4, 2021',
  });

  const handleSave = () => {
    setSaved(true);
    setEditing(false);
    setTimeout(() => setSaved(false), 3000);
  };

  const activityLog = [
    { action: 'Approved Emergency Purchase Order — HVAC Repair', time: '2 hours ago', type: 'approval' },
    { action: 'Reviewed Use of Force Report — Deputy Johnson', time: '3 hours ago', type: 'review' },
    { action: 'Signed Daily Command Brief', time: '6 hours ago', type: 'sign' },
    { action: 'Approved Overtime Authorization — B-Shift', time: '1 day ago', type: 'approval' },
    { action: 'Updated Risk Compliance dashboard review', time: '1 day ago', type: 'review' },
  ];

  const stats = [
    { label: 'Approvals This Month', value: '47', icon: CheckCircle, color: 'text-emerald-600' },
    { label: 'Avg Response Time', value: '1.8h', icon: Clock, color: 'text-blue-600' },
    { label: 'Pending Items', value: '8', icon: Shield, color: 'text-amber-600' },
    { label: 'Days in Role', value: '1,546', icon: Award, color: 'text-slate-700' },
  ];

  return (
    <DashboardLayout>
      <div className="p-5 lg:p-8 bg-slate-100 dark:bg-transparent min-h-full">
        <div className="max-w-4xl mx-auto">

          {/* Page Header */}
          <div className="mb-8 pb-6 border-b border-slate-200 dark:border-slate-700/40 flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-slate-900 dark:text-white mb-0.5">My Profile</p>
              <p className="text-base text-slate-500 dark:text-slate-400">Manage your account information and preferences</p>
            </div>
            {saved && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-lg">
                <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">Profile saved</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Left — Avatar + identity */}
            <div className="lg:col-span-1 space-y-6">
              {/* Avatar card */}
              <div className="bg-white dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-sm dark:shadow-none p-6 flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-md">
                    <span className="text-3xl font-bold text-white">ST</span>
                  </div>
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center shadow-md transition-colors">
                    <Camera className="w-4 h-4 text-white" />
                  </button>
                </div>
                <p className="text-lg font-bold text-slate-900 dark:text-white">{form.name}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">{form.title}</p>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-100 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 text-amber-700 dark:text-amber-400 rounded-full text-xs font-semibold">
                  <Shield className="w-3 h-3" />
                  {form.role}
                </span>

                <div className="mt-5 pt-5 border-t border-slate-100 dark:border-slate-700/40 w-full space-y-2 text-left">
                  <div className="flex items-center gap-2.5 text-sm text-slate-700 dark:text-slate-300">
                    <Award className="w-4 h-4 text-slate-500 flex-shrink-0" />
                    <span>Badge #{form.badgeNumber}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-slate-700 dark:text-slate-300">
                    <MapPin className="w-4 h-4 text-slate-500 flex-shrink-0" />
                    <span className="truncate">{form.location}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-slate-700 dark:text-slate-300">
                    <Calendar className="w-4 h-4 text-slate-500 flex-shrink-0" />
                    <span>Since {form.startDate}</span>
                  </div>
                </div>
              </div>

              {/* Stats card */}
              <div className="bg-white dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-sm dark:shadow-none p-5">
                <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4">Activity Stats</h3>
                <div className="space-y-3">
                  {stats.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                      <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <Icon className={`w-4 h-4 ${stat.color}`} />
                          <span className="text-sm text-slate-700 dark:text-slate-300">{stat.label}</span>
                        </div>
                        <span className={`text-sm font-bold ${stat.color}`}>{stat.value}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right — Details + Activity */}
            <div className="lg:col-span-2 space-y-6">
              {/* Account information card */}
              <div className="bg-white dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-sm dark:shadow-none">
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-700/40">
                  <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Account Information</h2>
                  {!editing ? (
                    <button
                      onClick={() => setEditing(true)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-800/40 border border-slate-300 dark:border-slate-700/50 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 rounded-lg text-sm font-medium transition-all"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      Edit Profile
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditing(false)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-800/40 border border-slate-300 dark:border-slate-700/50 text-slate-700 dark:text-slate-300 hover:bg-slate-50 rounded-lg text-sm font-medium transition-all"
                      >
                        <X className="w-3.5 h-3.5" />
                        Cancel
                      </button>
                      <button
                        onClick={handleSave}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white hover:bg-blue-700 rounded-lg text-sm font-medium transition-all shadow-sm"
                      >
                        <Save className="w-3.5 h-3.5" />
                        Save Changes
                      </button>
                    </div>
                  )}
                </div>

                <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[
                    { label: 'Full Name', key: 'name', icon: User },
                    { label: 'Email Address', key: 'email', icon: Mail },
                    { label: 'Phone Number', key: 'phone', icon: Phone },
                    { label: 'Job Title', key: 'title', icon: Shield },
                    { label: 'Department', key: 'department', icon: MapPin },
                    { label: 'Badge Number', key: 'badgeNumber', icon: Award },
                  ].map(field => {
                    const Icon = field.icon;
                    return (
                      <div key={field.key}>
                        <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5">{field.label}</label>
                        {editing ? (
                          <input
                            type="text"
                            value={form[field.key]}
                            onChange={e => setForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                            className="w-full px-3 py-2 bg-white dark:bg-slate-800/40 border border-slate-300 dark:border-slate-700/50 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-400 dark:focus:border-blue-500/50 transition-colors"
                          />
                        ) : (
                          <div className="flex items-center gap-2.5 px-3 py-2 bg-slate-50 dark:bg-slate-800/20 border border-slate-200 dark:border-slate-700/30 rounded-lg">
                            <Icon className="w-4 h-4 text-slate-500 flex-shrink-0" />
                            <span className="text-sm text-slate-900 dark:text-white">{form[field.key]}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recent Activity card */}
              <div className="bg-white dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-sm dark:shadow-none">
                <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700/40">
                  <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Recent Activity</h2>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-700/30">
                  {activityLog.map((entry, i) => (
                    <div key={i} className="flex items-start gap-3 px-6 py-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                      <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                        entry.type === 'approval' ? 'bg-emerald-500' :
                        entry.type === 'review' ? 'bg-blue-500' : 'bg-amber-500'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-slate-900 dark:text-white">{entry.action}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{entry.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}
