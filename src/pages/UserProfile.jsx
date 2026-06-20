import React, { useState } from 'react';
import { User, Mail, Shield, Phone, MapPin, Calendar, Edit3, Save, X, Camera, Award, Clock, CheckCircle } from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';

export default function UserProfile() {
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState({
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
  // Draft copy edited while in editing mode — only committed to `profile` on Save,
  // so Cancel can discard it and the page reverts to the last saved values.
  const [form, setForm] = useState(profile);

  const handleEdit = () => {
    setForm(profile);
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
  };

  const handleSave = () => {
    setProfile(form);
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
    { label: 'Pending Items', value: '8', icon: Shield, color: 'text-amber-700' },
    { label: 'Days in Role', value: '1,546', icon: Award, color: 'text-slate-700' },
  ];

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 bg-transparent dark:bg-transparent min-h-full">
        <div className="max-w-4xl mx-auto">

          {/* Page Header */}
          <div className="mb-8 pb-6 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-3xl font-bold text-primary mb-0.5">My Profile</p>
              <p className="text-base text-muted">Manage your account information and preferences</p>
            </div>
            {saved && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-lg flex-shrink-0">
                <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">Profile saved</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Left — Avatar + identity */}
            <div className="lg:col-span-1 space-y-6">
              {/* Avatar card */}
              <div className="bg-surface border border-border rounded-xl shadow-sm dark:shadow-none p-6 flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-md">
                    <span className="text-3xl font-bold text-white">ST</span>
                  </div>
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center shadow-md transition-colors">
                    <Camera className="w-4 h-4 text-white" />
                  </button>
                </div>
                <p className="text-lg font-bold text-primary">{profile.name}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">{profile.title}</p>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-100 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 text-amber-700 dark:text-amber-400 rounded-full text-xs font-semibold">
                  <Shield className="w-3 h-3" />
                  {profile.role}
                </span>

                <div className="mt-5 pt-5 border-t border-slate-100 dark:border-slate-700/40 w-full space-y-2 text-left">
                  <div className="flex items-center gap-2.5 text-sm text-secondary">
                    <Award className="w-4 h-4 text-slate-500 flex-shrink-0" />
                    <span>Badge #{profile.badgeNumber}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-secondary">
                    <MapPin className="w-4 h-4 text-slate-500 flex-shrink-0" />
                    <span className="truncate">{profile.location}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-secondary">
                    <Calendar className="w-4 h-4 text-slate-500 flex-shrink-0" />
                    <span>Since {profile.startDate}</span>
                  </div>
                </div>
              </div>

              {/* Stats card */}
              <div className="bg-surface border border-border rounded-xl shadow-sm dark:shadow-none p-5">
                <h3 className="text-xs font-semibold text-muted uppercase tracking-widest mb-4">Activity Stats</h3>
                <div className="space-y-3">
                  {stats.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                      <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <Icon className={`w-4 h-4 ${stat.color}`} />
                          <span className="text-sm text-secondary">{stat.label}</span>
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
              <div className="bg-surface border border-border rounded-xl shadow-sm dark:shadow-none">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-4 border-b border-slate-100 dark:border-slate-700/40">
                  <h2 className="text-sm font-semibold text-primary">Account Information</h2>
                  {!editing ? (
                    <button
                      onClick={handleEdit}
                      className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-white dark:bg-zinc-900/40 border border-slate-300 dark:border-slate-700/50 text-secondary hover:bg-slate-50 dark:hover:bg-zinc-900/60 rounded-lg text-sm font-medium transition-all"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      Edit Profile
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleCancel}
                        className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-1.5 bg-white dark:bg-zinc-900/40 border border-slate-300 dark:border-slate-700/50 text-secondary hover:bg-slate-50 rounded-lg text-sm font-medium transition-all"
                      >
                        <X className="w-3.5 h-3.5" />
                        Cancel
                      </button>
                      <button
                        onClick={handleSave}
                        className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white hover:bg-blue-700 rounded-lg font-semibold text-sm font-medium transition-all shadow-sm"
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
                        <label className="block text-xs font-semibold text-muted uppercase tracking-wide mb-1.5">{field.label}</label>
                        {editing ? (
                          <input
                            type="text"
                            value={form[field.key]}
                            onChange={e => setForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                            className="w-full px-3 py-2 bg-white dark:bg-zinc-900/40 border border-slate-300 dark:border-slate-700/50 rounded-lg text-sm text-primary focus:outline-none focus:border-blue-400 dark:focus:border-blue-500/50 transition-colors"
                          />
                        ) : (
                          <div className="flex items-center gap-2.5 px-3 py-2 bg-slate-50 dark:bg-zinc-900/20 border border-border rounded-lg min-w-0">
                            <Icon className="w-4 h-4 text-slate-500 flex-shrink-0" />
                            <span className="text-sm text-primary truncate" title={profile[field.key]}>{profile[field.key]}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recent Activity card */}
              <div className="bg-surface border border-border rounded-xl shadow-sm dark:shadow-none">
                <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700/40">
                  <h2 className="text-sm font-semibold text-primary">Recent Activity</h2>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-700/30">
                  {activityLog.map((entry, i) => (
                    <div key={i} className="flex items-start gap-3 px-6 py-3.5 hover:bg-slate-50 dark:hover:bg-zinc-900/20 transition-colors">
                      <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                        entry.type === 'approval' ? 'bg-emerald-500' :
                        entry.type === 'review' ? 'bg-blue-500' : 'bg-amber-500'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-primary">{entry.action}</p>
                        <p className="text-xs text-muted mt-0.5">{entry.time}</p>
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
