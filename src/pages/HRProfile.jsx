import React, { useState } from 'react';
import {
  User, Mail, Shield, Phone, MapPin, Calendar, Edit3, Save, X, Camera, Award,
  Clock, CheckCircle, ClipboardList, Lock, Bell, History, Workflow
} from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import { hrNavigation, hrProfile as hrProfileConfig, hrNotifications } from '../config/hrConfig';

export default function HRProfile() {
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState({
    name: hrProfileConfig.name,
    email: hrProfileConfig.email,
    phone: '(770) 513-5180',
    title: 'Director of Human Resources',
    role: hrProfileConfig.role,
    department: 'Human Resources',
    location: 'Gwinnett County Sheriff\'s Office',
    employeeId: 'HR-014',
    startDate: 'March 11, 2018',
  });
  const [form, setForm] = useState(profile);

  const handleEdit = () => {
    setForm(profile);
    setEditing(true);
  };

  const handleCancel = () => setEditing(false);

  const handleSave = () => {
    setProfile(form);
    setSaved(true);
    setEditing(false);
    setTimeout(() => setSaved(false), 3000);
  };

  const responsibilities = [
    'Oversee recruiting, hiring, and onboarding for all sworn and civilian positions',
    'Manage employee records, performance reviews, and promotion processing',
    'Administer leave, time-off, and overtime exception approvals',
    'Maintain training and certification compliance across the agency',
    'Coordinate with Internal Affairs on background investigations and EI alerts',
    'Ensure agency-wide policy acknowledgment and HR compliance reporting',
  ];

  const permissions = [
    { label: 'Employee Records — Full Access', granted: true },
    { label: 'Hiring & Onboarding — Approve', granted: true },
    { label: 'Time Off & Overtime — Approve', granted: true },
    { label: 'Training & Certifications — Manage', granted: true },
    { label: 'Internal Affairs Case Access', granted: true },
    { label: 'Budget & Payroll — Approve', granted: false },
  ];

  const recentActivity = [
    { action: 'Approved overtime exception — Deputy Chen', time: '1 hour ago', type: 'approval' },
    { action: 'Reviewed background investigation — M. Rivera', time: '3 hours ago', type: 'review' },
    { action: 'Approved leave request — Deputy Marcus Chen', time: '5 hours ago', type: 'approval' },
    { action: 'Published job posting — Detention Officer', time: '1 day ago', type: 'sign' },
    { action: 'Promoted Cpl. D. Lewis to Sergeant', time: '2 days ago', type: 'approval' },
  ];

  const recentApprovals = [
    { item: 'New hire approval — Deputy K. Ramirez', status: 'Approved', time: '20 min ago' },
    { item: 'Leave request — Deputy Marcus Chen', status: 'Approved', time: '5 hours ago' },
    { item: 'Overtime exception — B-Shift coverage', status: 'Approved', time: '1 day ago' },
    { item: 'Promotion request — Cpl. D. Lewis', status: 'Approved', time: '2 days ago' },
  ];

  const assignedWorkflows = [
    { name: 'New Hire Onboarding — K. Ramirez', stage: 'Equipment Issue', progress: 75 },
    { name: 'Background Investigation — J. Patel', stage: 'Final Interview', progress: 60 },
    { name: 'IA Case Review — IA-2026-031', stage: 'Preliminary Review', progress: 20 },
  ];

  const auditHistory = [
    { event: 'Edited employee record — Deputy T. Brooks', time: 'Jun 18, 2026 · 14:02' },
    { event: 'Approved policy acknowledgment campaign — UoF Policy v4', time: 'Jun 17, 2026 · 09:41' },
    { event: 'Updated training compliance thresholds', time: 'Jun 15, 2026 · 16:20' },
  ];

  const stats = [
    { label: 'Approvals This Month', value: '32', icon: CheckCircle, color: 'text-emerald-600' },
    { label: 'Avg Response Time', value: '2.4h', icon: Clock, color: 'text-blue-600' },
    { label: 'Open Workflows', value: '3', icon: Workflow, color: 'text-amber-700' },
    { label: 'Years in Role', value: '8', icon: Award, color: 'text-slate-700' },
  ];

  return (
    <DashboardLayout
      navigation={hrNavigation}
      profile={hrProfileConfig}
      notifications={hrNotifications}
      settingsRoute="/hr/settings"
      profileRoute="/hr/profile"
      activityRoute="/hr/activity"
      activityModuleFilter="hr"
    >
      <div className="p-6 lg:p-8 bg-transparent dark:bg-transparent min-h-full">
        <div className="max-w-5xl mx-auto">

          {/* Page Header */}
          <div className="mb-8 pb-6 border-b border-border flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-primary mb-0.5">HR Executive Profile</p>
              <p className="text-base text-muted">Manage your account information and HR preferences</p>
            </div>
            {saved && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-lg">
                <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">Profile saved</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Left column */}
            <div className="lg:col-span-1 space-y-6">
              {/* Avatar / Executive Summary */}
              <div className="bg-surface border border-border rounded-xl shadow-sm dark:shadow-none p-6 flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-md">
                    <span className="text-3xl font-bold text-white">{hrProfileConfig.initials}</span>
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
                    <span>Employee ID {profile.employeeId}</span>
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

              {/* Stats */}
              <div className="bg-surface border border-border rounded-xl shadow-sm dark:shadow-none p-5">
                <h3 className="text-xs font-semibold text-muted uppercase tracking-widest mb-4">Executive Summary</h3>
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

              {/* Permissions */}
              <div className="bg-surface border border-border rounded-xl shadow-sm dark:shadow-none p-5">
                <h3 className="text-xs font-semibold text-muted uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5" /> Permissions
                </h3>
                <div className="space-y-2.5">
                  {permissions.map((p, i) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <span className="text-secondary">{p.label}</span>
                      <span className={`text-xs font-semibold ${p.granted ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`}>
                        {p.granted ? 'Granted' : 'Restricted'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Position / Department / Contact Information */}
              <div className="bg-surface border border-border rounded-xl shadow-sm dark:shadow-none">
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-700/40">
                  <h2 className="text-sm font-semibold text-primary">Position &amp; Contact Information</h2>
                  {!editing ? (
                    <button
                      onClick={handleEdit}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-zinc-900/40 border border-slate-300 dark:border-slate-700/50 text-secondary hover:bg-slate-50 dark:hover:bg-zinc-900/60 rounded-lg text-sm font-medium transition-all"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      Edit Profile
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleCancel}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-zinc-900/40 border border-slate-300 dark:border-slate-700/50 text-secondary hover:bg-slate-50 rounded-lg text-sm font-medium transition-all"
                      >
                        <X className="w-3.5 h-3.5" />
                        Cancel
                      </button>
                      <button
                        onClick={handleSave}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white hover:bg-blue-700 rounded-lg font-semibold text-sm font-medium transition-all shadow-sm"
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
                    { label: 'Employee ID', key: 'employeeId', icon: Award },
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

              {/* Responsibilities */}
              <div className="bg-surface border border-border rounded-xl shadow-sm dark:shadow-none">
                <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700/40">
                  <h2 className="text-sm font-semibold text-primary flex items-center gap-2">
                    <ClipboardList className="w-4 h-4 text-slate-500" /> Responsibilities
                  </h2>
                </div>
                <ul className="p-6 pt-4 space-y-2.5">
                  {responsibilities.map((r, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-secondary">
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recent Activity */}
              <div className="bg-surface border border-border rounded-xl shadow-sm dark:shadow-none">
                <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700/40">
                  <h2 className="text-sm font-semibold text-primary">Recent Activity</h2>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-700/30">
                  {recentActivity.map((entry, i) => (
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

              {/* Recent Approvals */}
              <div className="bg-surface border border-border rounded-xl shadow-sm dark:shadow-none">
                <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700/40">
                  <h2 className="text-sm font-semibold text-primary">Recent Approvals</h2>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-700/30">
                  {recentApprovals.map((a, i) => (
                    <div key={i} className="flex items-center justify-between px-6 py-3.5">
                      <div className="min-w-0">
                        <p className="text-sm text-primary truncate">{a.item}</p>
                        <p className="text-xs text-muted mt-0.5">{a.time}</p>
                      </div>
                      <span className="px-2 py-0.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-full flex-shrink-0">
                        {a.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Assigned Workflows */}
              <div className="bg-surface border border-border rounded-xl shadow-sm dark:shadow-none">
                <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700/40">
                  <h2 className="text-sm font-semibold text-primary flex items-center gap-2">
                    <Workflow className="w-4 h-4 text-slate-500" /> Assigned Workflows
                  </h2>
                </div>
                <div className="p-6 space-y-4">
                  {assignedWorkflows.map((w, i) => (
                    <div key={i}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm text-primary">{w.name}</span>
                        <span className="text-xs text-muted">{w.stage}</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 dark:bg-zinc-800/50 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500 rounded-full" style={{ width: `${w.progress}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Audit History */}
              <div className="bg-surface border border-border rounded-xl shadow-sm dark:shadow-none">
                <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700/40">
                  <h2 className="text-sm font-semibold text-primary flex items-center gap-2">
                    <History className="w-4 h-4 text-slate-500" /> Audit History
                  </h2>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-700/30">
                  {auditHistory.map((entry, i) => (
                    <div key={i} className="flex items-start justify-between px-6 py-3.5">
                      <p className="text-sm text-primary">{entry.event}</p>
                      <p className="text-xs text-muted flex-shrink-0 ml-4">{entry.time}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Security Settings + Notification Preferences */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-surface border border-border rounded-xl shadow-sm dark:shadow-none p-5">
                  <h3 className="text-xs font-semibold text-muted uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Lock className="w-3.5 h-3.5" /> Security Settings
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-secondary">Two-Factor Authentication</span>
                      <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">Enabled</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-secondary">Last Password Change</span>
                      <span className="text-xs text-muted">42 days ago</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-secondary">Active Sessions</span>
                      <span className="text-xs text-muted">1 device</span>
                    </div>
                  </div>
                </div>
                <div className="bg-surface border border-border rounded-xl shadow-sm dark:shadow-none p-5">
                  <h3 className="text-xs font-semibold text-muted uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Bell className="w-3.5 h-3.5" /> Notification Preferences
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-secondary">Approval Requests</span>
                      <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">Email + In-App</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-secondary">Compliance Alerts</span>
                      <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">Email + In-App</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-secondary">Weekly Digest</span>
                      <span className="text-xs text-muted">In-App only</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}
