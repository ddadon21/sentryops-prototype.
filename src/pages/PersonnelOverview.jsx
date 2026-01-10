import React, { useState } from 'react';
import { Search, Filter, Download, Mail, Phone, MapPin, AlertCircle, CheckCircle, Clock, ChevronRight, Bell, Users, Award, Calendar, TrendingUp, TrendingDown, MoreVertical, Eye, X, MessageCircle, Sparkles, Send, Plus, FileText, UserPlus, BarChart3, Link2, UserCircle, Shield, Activity, Star, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function PersonnelOverview() {
  const navigate = useNavigate();
  const [hoveredRow, setHoveredRow] = useState(null);
  const [quickPeekOpen, setQuickPeekOpen] = useState(false);
  const [peekData, setPeekData] = useState(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [aiInsightsVisible, setAiInsightsVisible] = useState(true);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showCertManagement, setShowCertManagement] = useState(false);
  const [showShiftSchedule, setShowShiftSchedule] = useState(false);
  const [showHiringPipeline, setShowHiringPipeline] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [fullProfileOpen, setFullProfileOpen] = useState(false);
  const [fullProfileData, setFullProfileData] = useState(null);

  const personnel = [
    {
      id: 'P-2024-001',
      name: 'John Smith',
      badge: 'D-4521',
      rank: 'Deputy Sheriff',
      division: 'Patrol',
      shift: 'Day Shift',
      status: 'on-duty',
      photo: 'JS',
      certifications: [
        { name: 'P.O.S.T.', status: 'current', expires: '2025-12-15' },
        { name: 'CPR/First Aid', status: 'expiring', expires: '2024-11-01' },
        { name: 'Firearms', status: 'current', expires: '2025-06-30' }
      ],
      tenure: '5 years',
      email: 'j.smith@sheriff.gov',
      phone: '(555) 100-0001',
      supervisor: 'Sgt. Williams',
      performance: 4.2,
      lastCheckIn: '2 hours ago'
    },
    {
      id: 'P-2024-002',
      name: 'Sarah Johnson',
      badge: 'D-4522',
      rank: 'Senior Deputy',
      division: 'Investigations',
      shift: 'Day Shift',
      status: 'on-duty',
      photo: 'SJ',
      certifications: [
        { name: 'P.O.S.T.', status: 'current', expires: '2026-03-20' },
        { name: 'Detective Cert', status: 'current', expires: '2025-09-15' },
        { name: 'Interview & Interrogation', status: 'current', expires: '2025-12-01' },
        { name: 'CPR/First Aid', status: 'expired', expires: '2024-09-15' }
      ],
      tenure: '8 years',
      email: 's.johnson@sheriff.gov',
      phone: '(555) 100-0002',
      supervisor: 'Lt. Martinez',
      performance: 4.7,
      lastCheckIn: '1 hour ago'
    },
    {
      id: 'P-2024-003',
      name: 'Michael Chen',
      badge: 'D-4523',
      rank: 'Deputy Sheriff',
      division: 'Detention',
      shift: 'Night Shift',
      status: 'off-duty',
      photo: 'MC',
      certifications: [
        { name: 'P.O.S.T.', status: 'current', expires: '2025-08-10' },
        { name: 'Corrections Officer', status: 'current', expires: '2025-11-30' },
        { name: 'CPR/First Aid', status: 'current', expires: '2025-05-20' }
      ],
      tenure: '3 years',
      email: 'm.chen@sheriff.gov',
      phone: '(555) 100-0003',
      supervisor: 'Sgt. Davis',
      performance: 4.0,
      lastCheckIn: '8 hours ago'
    },
    {
      id: 'P-2024-004',
      name: 'Emily Rodriguez',
      badge: 'C-1105',
      rank: 'Communications Officer',
      division: 'Dispatch',
      shift: 'Evening Shift',
      status: 'on-duty',
      photo: 'ER',
      certifications: [
        { name: 'NCIC Certified', status: 'current', expires: '2025-10-15' },
        { name: 'EMD Certified', status: 'expiring', expires: '2024-10-25' },
        { name: 'CPR/First Aid', status: 'current', expires: '2025-07-01' }
      ],
      tenure: '2 years',
      email: 'e.rodriguez@sheriff.gov',
      phone: '(555) 100-0004',
      supervisor: 'Shift Supervisor Lee',
      performance: 4.3,
      lastCheckIn: '30 min ago'
    },
    {
      id: 'P-2024-005',
      name: 'David Williams',
      badge: 'S-2201',
      rank: 'Sergeant',
      division: 'Patrol',
      shift: 'Day Shift',
      status: 'on-duty',
      photo: 'DW',
      certifications: [
        { name: 'P.O.S.T.', status: 'current', expires: '2026-01-20' },
        { name: 'Supervisor Cert', status: 'current', expires: '2025-11-10' },
        { name: 'Firearms Instructor', status: 'current', expires: '2025-08-30' },
        { name: 'CPR/First Aid', status: 'current', expires: '2025-04-15' }
      ],
      tenure: '12 years',
      email: 'd.williams@sheriff.gov',
      phone: '(555) 100-0005',
      supervisor: 'Lt. Thompson',
      performance: 4.8,
      lastCheckIn: '45 min ago'
    },
    {
      id: 'P-2024-006',
      name: 'Jennifer Martinez',
      badge: 'D-4524',
      rank: 'Deputy Sheriff',
      division: 'School Resource',
      shift: 'Day Shift',
      status: 'on-leave',
      photo: 'JM',
      certifications: [
        { name: 'P.O.S.T.', status: 'current', expires: '2025-09-25' },
        { name: 'SRO Certification', status: 'current', expires: '2025-12-20' },
        { name: 'CPR/First Aid', status: 'expiring', expires: '2024-10-30' }
      ],
      tenure: '6 years',
      email: 'j.martinez@sheriff.gov',
      phone: '(555) 100-0006',
      supervisor: 'Capt. Anderson',
      performance: 4.5,
      lastCheckIn: '3 days ago'
    },
    {
      id: 'P-2024-007',
      name: 'Robert Taylor',
      badge: 'D-4525',
      rank: 'Deputy Sheriff',
      division: 'Patrol',
      shift: 'Night Shift',
      status: 'on-duty',
      photo: 'RT',
      certifications: [
        { name: 'P.O.S.T.', status: 'current', expires: '2025-11-20' },
        { name: 'CPR/First Aid', status: 'current', expires: '2025-08-15' },
        { name: 'Firearms', status: 'current', expires: '2025-09-10' }
      ],
      tenure: '4 years',
      email: 'r.taylor@sheriff.gov',
      phone: '(555) 100-0007',
      supervisor: 'Sgt. Williams',
      performance: 4.1,
      lastCheckIn: '3 hours ago'
    },
    {
      id: 'P-2024-008',
      name: 'Amanda White',
      badge: 'L-3301',
      rank: 'Lieutenant',
      division: 'Investigations',
      shift: 'Day Shift',
      status: 'on-duty',
      photo: 'AW',
      certifications: [
        { name: 'P.O.S.T.', status: 'current', expires: '2026-05-15' },
        { name: 'Supervisor Cert', status: 'current', expires: '2025-12-01' },
        { name: 'Advanced Investigation', status: 'current', expires: '2025-10-20' },
        { name: 'CPR/First Aid', status: 'current', expires: '2025-06-30' }
      ],
      tenure: '15 years',
      email: 'a.white@sheriff.gov',
      phone: '(555) 100-0008',
      supervisor: 'Captain Reed',
      performance: 4.9,
      lastCheckIn: '20 min ago'
    },
    {
      id: 'P-2024-009',
      name: 'James Brown',
      badge: 'D-4526',
      rank: 'Deputy Sheriff',
      division: 'Detention',
      shift: 'Day Shift',
      status: 'on-duty',
      photo: 'JB',
      certifications: [
        { name: 'P.O.S.T.', status: 'current', expires: '2025-07-10' },
        { name: 'Corrections Officer', status: 'current', expires: '2025-12-15' },
        { name: 'CPR/First Aid', status: 'expiring', expires: '2024-11-05' }
      ],
      tenure: '6 years',
      email: 'j.brown@sheriff.gov',
      phone: '(555) 100-0009',
      supervisor: 'Sgt. Davis',
      performance: 4.4,
      lastCheckIn: '1 hour ago'
    },
    {
      id: 'P-2024-010',
      name: 'Lisa Anderson',
      badge: 'C-1106',
      rank: 'Communications Officer',
      division: 'Dispatch',
      shift: 'Night Shift',
      status: 'off-duty',
      photo: 'LA',
      certifications: [
        { name: 'NCIC Certified', status: 'current', expires: '2025-09-20' },
        { name: 'EMD Certified', status: 'current', expires: '2025-11-10' },
        { name: 'CPR/First Aid', status: 'current', expires: '2025-05-25' }
      ],
      tenure: '3 years',
      email: 'l.anderson@sheriff.gov',
      phone: '(555) 100-0010',
      supervisor: 'Shift Supervisor Lee',
      performance: 4.2,
      lastCheckIn: '6 hours ago'
    },
    {
      id: 'P-2024-011',
      name: 'Kevin Garcia',
      badge: 'D-4527',
      rank: 'Senior Deputy',
      division: 'Patrol',
      shift: 'Evening Shift',
      status: 'on-duty',
      photo: 'KG',
      certifications: [
        { name: 'P.O.S.T.', status: 'current', expires: '2026-02-15' },
        { name: 'Field Training Officer', status: 'current', expires: '2025-10-30' },
        { name: 'Firearms', status: 'current', expires: '2025-08-20' },
        { name: 'CPR/First Aid', status: 'current', expires: '2025-07-15' }
      ],
      tenure: '10 years',
      email: 'k.garcia@sheriff.gov',
      phone: '(555) 100-0011',
      supervisor: 'Sgt. Williams',
      performance: 4.6,
      lastCheckIn: '15 min ago'
    },
    {
      id: 'P-2024-012',
      name: 'Maria Lopez',
      badge: 'D-4528',
      rank: 'Deputy Sheriff',
      division: 'School Resource',
      shift: 'Day Shift',
      status: 'on-duty',
      photo: 'ML',
      certifications: [
        { name: 'P.O.S.T.', status: 'current', expires: '2025-12-30' },
        { name: 'SRO Certification', status: 'current', expires: '2026-01-15' },
        { name: 'Crisis Intervention', status: 'current', expires: '2025-09-05' },
        { name: 'CPR/First Aid', status: 'current', expires: '2025-11-20' }
      ],
      tenure: '7 years',
      email: 'm.lopez@sheriff.gov',
      phone: '(555) 100-0012',
      supervisor: 'Capt. Anderson',
      performance: 4.5,
      lastCheckIn: '40 min ago'
    }
  ];

  const notifications = [
    { id: 1, title: '3 Certifications Expiring Soon', message: 'CPR, Firearms, and P.O.S.T. renewals needed', time: '10 min ago', urgent: true },
    { id: 2, title: 'Budget Approval Required', message: 'Q1 2025 Training Budget: $45,000', time: '1 hour ago', urgent: true },
    { id: 3, title: 'Leave Request Submitted', message: 'Deputy Marcus Chen - Dec 15-22', time: '2 hours ago', urgent: false },
    { id: 4, title: 'Shift Coverage Alert', message: 'Night shift needs 2 additional deputies', time: '3 hours ago', urgent: false },
    { id: 5, title: 'Equipment Request', message: 'IT Department - Body cameras upgrade', time: '5 hours ago', urgent: false }
  ];

  const getCertStatus = (certs) => {
    if (certs.some(c => c.status === 'expired')) return { label: 'Expired', color: 'red', icon: AlertCircle };
    if (certs.some(c => c.status === 'expiring')) return { label: 'Expiring Soon', color: 'amber', icon: Clock };
    return { label: 'Current', color: 'green', icon: CheckCircle };
  };

  const getStatusColor = (status) => {
    const colors = {
      'on-duty': 'bg-green-500/20 border-green-500/30 text-green-400',
      'off-duty': 'bg-slate-500/20 border-slate-500/30 text-slate-400',
      'on-leave': 'bg-amber-500/20 border-amber-500/30 text-amber-400'
    };
    return colors[status] || colors['off-duty'];
  };

  const openQuickPeek = (person) => {
    setPeekData(person);
    setQuickPeekOpen(true);
  };

  const openFullProfile = (person) => {
    setFullProfileData(person);
    setFullProfileOpen(true);
  };

  const stats = {
    total: personnel.length,
    onDuty: personnel.filter(p => p.status === 'on-duty').length,
    expiring: personnel.reduce((acc, p) => acc + p.certifications.filter(c => c.status === 'expiring' || c.status === 'expired').length, 0),
    openPositions: 8
  };

  return (
      <div className="flex flex-col h-full">
      {/* Header */}
        <header className="border-b border-slate-800/50 backdrop-blur-xl bg-slate-900/30 sticky top-0 z-30">
          <div className="px-4 lg:px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="flex items-center gap-2 text-sm">
                  <button
                    onClick={() => navigate(createPageUrl('CommandDashboard'))}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    Dashboard
                  </button>
                  <ChevronRight className="w-4 h-4 text-slate-600" />
                  <span className="text-white">Personnel</span>
                </div>
              </div>
              <div className="flex items-center gap-2 lg:gap-4">
                <div className="relative">
                  <button
                    onClick={() => setNotificationsOpen(!notificationsOpen)}
                    className="p-2 hover:bg-slate-800/50 rounded-lg transition-colors relative"
                  >
                    <Bell className="w-5 h-5 text-slate-400" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  </button>

                  {/* Notifications Dropdown */}
                  {notificationsOpen && (
                    <div className="absolute right-0 top-full mt-2 w-96 bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-xl shadow-2xl z-50">
                      <div className="p-4 border-b border-slate-700/50">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-semibold text-white">Notifications</h3>
                          <span className="px-2 py-0.5 bg-red-500/20 border border-red-500/30 text-red-400 text-xs rounded-full">{notifications.filter(n => n.urgent).length} urgent</span>
                        </div>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.map(notification => (
                          <div key={notification.id} className={`p-4 border-b border-slate-800/30 hover:bg-slate-800/30 cursor-pointer transition-colors ${notification.urgent ? 'bg-amber-500/5' : ''}`}>
                            <div className="flex items-start gap-3">
                              <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${notification.urgent ? 'bg-amber-400' : 'bg-blue-400'}`}></div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white mb-1">{notification.title}</p>
                                <p className="text-xs text-slate-400 mb-2">{notification.message}</p>
                                <p className="text-xs text-slate-500">{notification.time}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="p-3 border-t border-slate-700/50">
                        <button className="w-full text-center text-sm text-amber-400 hover:text-amber-300 font-medium">View All Notifications</button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="h-8 w-px bg-slate-700/50"></div>

                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">ST</span>
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-sm font-medium text-white">Sheriff Thompson</p>
                    <p className="text-xs text-slate-400">Administrator</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="max-w-[1600px] mx-auto">
            <div className="flex flex-col xl:flex-row gap-6">
              {/* Main Content */}
              <div className="flex-1 min-w-0">
                {/* Page Header */}
                <div className="mb-6">
                  <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">Personnel Directory</h2>
                  <p className="text-slate-400">Manage all department personnel and certifications</p>
                </div>

                {/* Enhanced AI Insights */}
                {aiInsightsVisible && (
                  <div className="mb-6 bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 rounded-xl p-5">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-6 h-6 text-purple-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-base font-semibold text-white">AI Sentry Workforce Insights</h4>
                          <button onClick={() => setAiInsightsVisible(false)} className="text-slate-400 hover:text-white transition-colors">
                            <X className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {/* Critical */}
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                              <span className="text-xs font-bold text-red-400 uppercase">Critical</span>
                            </div>
                            <ul className="space-y-2 text-sm text-slate-300">
                              <li className="flex items-start gap-2">
                                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                                <span>3 personnel have certifications expiring within 30 days - <span className="text-red-400 font-semibold">Schedule renewals immediately</span></span>
                              </li>
                              <li className="flex items-start gap-2">
                                <Shield className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                                <span>Patrol division at 85% staffing - Consider reassignment or approve overtime</span>
                              </li>
                            </ul>
                          </div>

                          {/* Monitoring */}
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                              <span className="text-xs font-bold text-amber-400 uppercase">Monitoring</span>
                            </div>
                            <ul className="space-y-2 text-sm text-slate-300">
                              <li className="flex items-start gap-2">
                                <Clock className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                                <span>5 certifications expiring within 60 days total</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <Users className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                                <span>8 open positions (prioritize: 3 Patrol, 2 Detention)</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <Award className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                                <span>Average years of service: 7.2 years (healthy mix)</span>
                              </li>
                            </ul>
                          </div>

                          {/* Operational Status */}
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                              <span className="text-xs font-bold text-emerald-400 uppercase">Operational Status</span>
                            </div>
                            <ul className="space-y-2 text-sm text-slate-300">
                              <li className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                                <span>9 of 12 on duty (75% - good coverage)</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <TrendingDown className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                                <span>Turnover rate: 8% (below industry avg of 12%)</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <Activity className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                                <span>Certification compliance: 83% current</span>
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div className="flex gap-3 mt-4">
                          <button className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 text-purple-300 rounded-lg text-sm font-medium transition-colors">
                            View Recommendations
                          </button>
                          <button onClick={() => setShowCertManagement(!showCertManagement)} className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 text-purple-300 rounded-lg text-sm font-medium transition-colors">
                            Manage Certifications
                          </button>
                          <button onClick={() => setShowHiringPipeline(!showHiringPipeline)} className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 text-purple-300 rounded-lg text-sm font-medium transition-colors">
                            Hiring Pipeline
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Quick Actions Bar */}
                <div className="mb-6 grid grid-cols-2 md:grid-cols-6 gap-3">
                  <button className="flex items-center justify-center gap-2 px-4 py-3 bg-amber-500 hover:bg-amber-600 text-slate-900 font-medium rounded-lg transition-colors">
                    <Plus className="w-4 h-4" />
                    <span className="text-sm">Add Personnel</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-medium rounded-lg transition-colors">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">Schedule Training</span>
                  </button>
                  <button onClick={() => setShowCertManagement(!showCertManagement)} className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-medium rounded-lg transition-colors">
                    <FileText className="w-4 h-4" />
                    <span className="text-sm">Cert Report</span>
                  </button>
                  <button onClick={() => setShowAnalytics(!showAnalytics)} className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-medium rounded-lg transition-colors">
                    <BarChart3 className="w-4 h-4" />
                    <span className="text-sm">Analytics</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-medium rounded-lg transition-colors">
                    <Shield className="w-4 h-4" />
                    <span className="text-sm">Background Check</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-medium rounded-lg transition-colors">
                    <Download className="w-4 h-4" />
                    <span className="text-sm">Import Roster</span>
                  </button>
                </div>

                {/* Toolbar */}
                <div className="mb-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                      type="text"
                      placeholder="Search by name, badge, division, or rank..."
                      className="w-full pl-12 pr-4 py-3 bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 focus:bg-slate-800/60 transition-all"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setFiltersOpen(!filtersOpen)}
                      className="flex items-center gap-2 px-4 py-3 bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-xl text-slate-300 hover:border-slate-600/50 hover:bg-slate-800/60 transition-all"
                    >
                      <Filter className="w-5 h-5" />
                      <span>Filters</span>
                    </button>
                    <button className="flex items-center gap-2 px-4 py-3 bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-xl text-slate-300 hover:border-slate-600/50 hover:bg-slate-800/60 transition-all">
                      <Download className="w-5 h-5" />
                      <span className="hidden sm:inline">Export</span>
                    </button>
                  </div>
                </div>

                {/* Filters Panel */}
                {filtersOpen && (
                  <div className="mb-6 bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-semibold text-white">Filters</h3>
                      <button className="text-xs text-amber-400 hover:text-amber-300">Clear all</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-2">Division</label>
                        <select className="w-full px-3 py-2 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white text-sm focus:outline-none focus:border-amber-500/50">
                          <option>All Divisions</option>
                          <option>Patrol</option>
                          <option>Investigations</option>
                          <option>Detention</option>
                          <option>Dispatch</option>
                          <option>School Resource</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-2">Rank</label>
                        <select className="w-full px-3 py-2 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white text-sm focus:outline-none focus:border-amber-500/50">
                          <option>All Ranks</option>
                          <option>Deputy Sheriff</option>
                          <option>Senior Deputy</option>
                          <option>Sergeant</option>
                          <option>Lieutenant</option>
                          <option>Captain</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-2">Status</label>
                        <select className="w-full px-3 py-2 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white text-sm focus:outline-none focus:border-amber-500/50">
                          <option>All</option>
                          <option>On Duty</option>
                          <option>Off Duty</option>
                          <option>On Leave</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-2">Certifications</label>
                        <select className="w-full px-3 py-2 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white text-sm focus:outline-none focus:border-amber-500/50">
                          <option>All</option>
                          <option>Current</option>
                          <option>Expiring (30 days)</option>
                          <option>Expired</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Staffing Analytics Dashboard - Collapsible */}
                {showAnalytics && (
                  <div className="mb-6 bg-slate-800/40 border border-slate-700/50 rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-4">
                      <BarChart3 className="w-6 h-6 text-purple-400" />
                      <h3 className="text-lg font-bold text-white">Staffing Analytics</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      {/* Coverage by Division */}
                      <div>
                        <h4 className="text-sm font-bold text-slate-300 mb-3">Coverage by Division</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Patrol:</span>
                            <span className="text-amber-400 font-medium">5/8 positions (63%) 🔴</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Investigations:</span>
                            <span className="text-amber-400 font-medium">2/3 positions (67%) 🟡</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Detention:</span>
                            <span className="text-red-400 font-medium">3/5 positions (60%) 🔴</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Dispatch:</span>
                            <span className="text-red-400 font-medium">1/2 positions (50%) 🔴</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-400">School Resource:</span>
                            <span className="text-amber-400 font-medium">1/2 positions (50%) 🔴</span>
                          </div>
                        </div>
                      </div>

                      {/* Experience Distribution */}
                      <div>
                        <h4 className="text-sm font-bold text-slate-300 mb-3">Experience Distribution</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-400">0-2 years:</span>
                            <span className="text-white font-medium">2 personnel (17%)</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-400">3-5 years:</span>
                            <span className="text-white font-medium">4 personnel (33%)</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-400">6-10 years:</span>
                            <span className="text-white font-medium">4 personnel (33%)</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-400">10+ years:</span>
                            <span className="text-white font-medium">2 personnel (17%)</span>
                          </div>
                          <div className="flex justify-between text-sm pt-2 border-t border-slate-700">
                            <span className="text-slate-400">Avg years:</span>
                            <span className="text-emerald-400 font-semibold">7.2 years ✅</span>
                          </div>
                        </div>
                      </div>

                      {/* Certification Compliance */}
                      <div>
                        <h4 className="text-sm font-bold text-slate-300 mb-3">Certification Compliance</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Current:</span>
                            <span className="text-emerald-400 font-semibold">10 personnel (83%)</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Expiring &lt;30 days:</span>
                            <span className="text-amber-400 font-semibold">3 (25%)</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Expiring 30-60 days:</span>
                            <span className="text-amber-400 font-semibold">2 (17%)</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Expired:</span>
                            <span className="text-red-400 font-semibold">2 (17%) 🔴</span>
                          </div>
                          <div className="flex justify-between text-sm pt-2 border-t border-slate-700">
                            <span className="text-slate-400">Target:</span>
                            <span className="text-slate-300 font-medium">95%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Gap:</span>
                            <span className="text-red-400 font-semibold">-12% ⚠️</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Turnover & Hiring */}
                      <div>
                        <h4 className="text-sm font-bold text-slate-300 mb-3">Turnover & Hiring</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Last 12 months:</span>
                            <span className="text-white font-medium">1 resignation</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Turnover rate:</span>
                            <span className="text-emerald-400 font-semibold">8% (vs industry 12%) ✅</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Avg tenure:</span>
                            <span className="text-white font-medium">7.2 years</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Time to hire:</span>
                            <span className="text-emerald-400 font-semibold">45 days (target 60) ✅</span>
                          </div>
                        </div>
                      </div>

                      {/* Shift Coverage */}
                      <div>
                        <h4 className="text-sm font-bold text-slate-300 mb-3">Shift Coverage</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Day Shift:</span>
                            <span className="text-emerald-400 font-semibold">85% staffed ✅</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Night Shift:</span>
                            <span className="text-amber-400 font-semibold">65% staffed ⚠️</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Evening Shift:</span>
                            <span className="text-red-400 font-semibold">60% staffed 🔴</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <button className="mt-4 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white font-medium rounded-lg transition-colors text-sm">
                      Download Full Report
                    </button>
                  </div>
                )}

                {/* Certification Management - Collapsible */}
                {showCertManagement && (
                  <div className="mb-6 bg-slate-800/40 border border-slate-700/50 rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-4">
                      <FileText className="w-6 h-6 text-purple-400" />
                      <h3 className="text-lg font-bold text-white">Certification Management</h3>
                    </div>

                    <div className="space-y-4">
                      {/* Expiring Soon */}
                      <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Clock className="w-5 h-5 text-amber-400" />
                          <h4 className="text-base font-bold text-amber-400">Expiring Soon (Next 30 days): 3</h4>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-300">John Smith - Firearms (Dec 15)</span>
                            <span className="text-red-400 font-semibold">3 days ⚠️</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-300">Jennifer Martinez - TASER (Dec 20)</span>
                            <span className="text-amber-400 font-semibold">8 days</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-300">James Brown - First Aid (Dec 28)</span>
                            <span className="text-amber-400 font-semibold">16 days</span>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <button className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-900 font-medium rounded text-xs transition-colors">
                            Schedule All 3
                          </button>
                          <button className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded text-xs transition-colors">
                            Send Reminders
                          </button>
                        </div>
                      </div>

                      {/* Expired */}
                      <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <AlertCircle className="w-5 h-5 text-red-400" />
                          <h4 className="text-base font-bold text-red-400">Expired: 2 🔴</h4>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-300">Sarah Johnson - CPR/First Aid</span>
                            <span className="text-red-400 font-semibold">Expired Sep 15</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-300">Emily Rodriguez - EMD Certified</span>
                            <span className="text-red-400 font-semibold">Expired Oct 25</span>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <button className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white font-medium rounded text-xs transition-colors">
                            Schedule Immediately
                          </button>
                          <button className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded text-xs transition-colors">
                            Notify Supervisors
                          </button>
                        </div>
                      </div>

                      {/* By Certification Type */}
                      <div>
                        <h4 className="text-sm font-bold text-slate-300 mb-3">By Certification Type</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="bg-slate-900/50 border border-slate-700 rounded p-3">
                            <div className="flex justify-between mb-1">
                              <span className="text-xs text-slate-400">Firearms Qualification</span>
                              <span className="text-emerald-400 text-xs font-semibold">100% ✅</span>
                            </div>
                            <div className="text-xs text-slate-500">Current: 8 • Expiring: 2 • Expired: 0</div>
                          </div>
                          <div className="bg-slate-900/50 border border-slate-700 rounded p-3">
                            <div className="flex justify-between mb-1">
                              <span className="text-xs text-slate-400">TASER Certification</span>
                              <span className="text-emerald-400 text-xs font-semibold">100% ✅</span>
                            </div>
                            <div className="text-xs text-slate-500">Current: 10 • Expiring: 1 • Expired: 0</div>
                          </div>
                          <div className="bg-slate-900/50 border border-slate-700 rounded p-3">
                            <div className="flex justify-between mb-1">
                              <span className="text-xs text-slate-400">CPR/First Aid</span>
                              <span className="text-amber-400 text-xs font-semibold">90% ⚠️</span>
                            </div>
                            <div className="text-xs text-slate-500">Current: 9 • Expiring: 1 • Expired: 1</div>
                          </div>
                          <div className="bg-slate-900/50 border border-slate-700 rounded p-3">
                            <div className="flex justify-between mb-1">
                              <span className="text-xs text-slate-400">P.O.S.T. Certification</span>
                              <span className="text-emerald-400 text-xs font-semibold">100% ✅</span>
                            </div>
                            <div className="text-xs text-slate-500">Current: 12 • Expiring: 0 • Expired: 0</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <button className="mt-4 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white font-medium rounded-lg transition-colors text-sm">
                      Generate Compliance Report
                    </button>
                  </div>
                )}

                {/* Shift Schedule - Collapsible */}
                {showShiftSchedule && (
                  <div className="mb-6 bg-slate-800/40 border border-slate-700/50 rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-4">
                      <Calendar className="w-6 h-6 text-purple-400" />
                      <h3 className="text-lg font-bold text-white">Shift Schedule - December 13, 2024</h3>
                    </div>

                    <div className="space-y-4">
                      {/* Day Shift */}
                      <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
                        <h4 className="text-base font-bold text-emerald-400 mb-3">Day Shift (06:00-14:00) - ✅ Good Coverage</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <div className="text-xs text-slate-400 mb-2">PATROL: 4 deputies</div>
                            <div className="space-y-1 text-sm text-slate-300">
                              <div>• John Smith (D-4521) - Zone 3</div>
                              <div>• Jennifer Martinez (D-4524) - School Resource</div>
                              <div>• Robert Taylor (D-4525) - Zone 1</div>
                              <div>• David Williams (S-2201) - Supervisor</div>
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-slate-400 mb-2">INVESTIGATIONS: 1 detective</div>
                            <div className="space-y-1 text-sm text-slate-300">
                              <div>• Sarah Johnson (D-4522)</div>
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-slate-400 mb-2">DETENTION: 2 officers</div>
                            <div className="space-y-1 text-sm text-slate-300">
                              <div>• Michael Chen (D-4523)</div>
                              <div>• James Brown (D-4526)</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Night Shift */}
                      <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                        <h4 className="text-base font-bold text-amber-400 mb-3">Night Shift (14:00-22:00) - ⚠️ Below Minimum</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <div className="text-xs text-slate-400 mb-2">PATROL: 2 deputies (need 3)</div>
                            <div className="space-y-1 text-sm text-slate-300">
                              <div>• Amanda White (L-3301)</div>
                              <div>• Kevin Garcia (D-4527)</div>
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-slate-400 mb-2">DETENTION: 1 officer</div>
                            <div className="space-y-1 text-sm text-slate-300">
                              <div>• Maria Lopez (D-4528)</div>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <button className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-900 font-medium rounded text-xs transition-colors">
                            Approve Overtime
                          </button>
                          <button className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded text-xs transition-colors">
                            Reassign
                          </button>
                        </div>
                      </div>

                      {/* Off Duty */}
                      <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
                        <h4 className="text-sm font-bold text-slate-300 mb-2">Off Duty / Leave</h4>
                        <div className="space-y-1 text-sm text-slate-300">
                          <div>• Emily Rodriguez (C-1105) - Off Duty</div>
                          <div>• Lisa Anderson (C-1106) - Off Duty (starts at 22:00)</div>
                          <div className="text-amber-400">• Jennifer Martinez (D-4524) - On Leave</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <button className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white font-medium rounded-lg transition-colors text-sm">
                        View Weekly Schedule
                      </button>
                      <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg transition-colors text-sm">
                        Approve Leave
                      </button>
                    </div>
                  </div>
                )}

                {/* Hiring Pipeline - Collapsible */}
                {showHiringPipeline && (
                  <div className="mb-6 bg-slate-800/40 border border-slate-700/50 rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-4">
                      <UserPlus className="w-6 h-6 text-purple-400" />
                      <h3 className="text-lg font-bold text-white">Hiring Pipeline - 8 Open Positions</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      {/* Stage Breakdown */}
                      <div>
                        <h4 className="text-sm font-bold text-slate-300 mb-3">Active Applicants: 12</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Application submitted:</span>
                            <span className="text-white font-medium">5</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Under review:</span>
                            <span className="text-white font-medium">3</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Interview scheduled:</span>
                            <span className="text-amber-400 font-medium">2</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Background check:</span>
                            <span className="text-blue-400 font-medium">4</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Offer extended:</span>
                            <span className="text-emerald-400 font-medium">2</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Start date set:</span>
                            <span className="text-emerald-400 font-semibold">1</span>
                          </div>
                        </div>
                      </div>

                      {/* Open Positions */}
                      <div>
                        <h4 className="text-sm font-bold text-slate-300 mb-3">Open Positions by Division</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Patrol:</span>
                            <span className="text-red-400 font-semibold">3 positions (Critical)</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Detention:</span>
                            <span className="text-amber-400 font-semibold">2 positions (High)</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Investigations:</span>
                            <span className="text-white font-medium">1 position</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Dispatch:</span>
                            <span className="text-white font-medium">1 position</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-400">School Resource:</span>
                            <span className="text-white font-medium">1 position</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {/* Upcoming Interviews */}
                      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                        <h4 className="text-sm font-bold text-blue-400 mb-2">Upcoming Interviews</h4>
                        <div className="space-y-1 text-sm text-slate-300">
                          <div>• Dec 13 - 2 candidates (Patrol positions)</div>
                          <div>• Dec 15 - 1 candidate (Detention)</div>
                        </div>
                      </div>

                      {/* Background Checks */}
                      <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                        <h4 className="text-sm font-bold text-amber-400 mb-2">Background Checks in Progress: 4</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm text-slate-300">
                            <span>Candidate A (Patrol)</span>
                            <span className="text-amber-400">Day 15/30 (50%)</span>
                          </div>
                          <div className="flex justify-between text-sm text-slate-300">
                            <span>Candidate B (Detention)</span>
                            <span className="text-emerald-400">Day 22/30 (73%)</span>
                          </div>
                          <div className="flex justify-between text-sm text-slate-300">
                            <span>Candidate C (Patrol)</span>
                            <span className="text-amber-400">Day 10/30 (33%)</span>
                          </div>
                          <div className="flex justify-between text-sm text-slate-300">
                            <span>Candidate D (Dispatch)</span>
                            <span className="text-blue-400">Day 5/30 (17%)</span>
                          </div>
                        </div>
                      </div>

                      {/* Projected Hires */}
                      <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
                        <h4 className="text-sm font-bold text-emerald-400 mb-2">Projected Hires</h4>
                        <div className="space-y-1 text-sm text-slate-300">
                          <div>• January: 2 hires</div>
                          <div>• February: 3 hires</div>
                          <div>• March: 2 hires</div>
                          <div className="text-emerald-400 font-semibold pt-2 border-t border-emerald-500/30">Timeline to fill all 8 positions: ~90 days</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <button className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white font-medium rounded-lg transition-colors text-sm">
                        View Applicants
                      </button>
                      <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg transition-colors text-sm">
                        Schedule Interviews
                      </button>
                      <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg transition-colors text-sm">
                        Extend Offer
                      </button>
                    </div>
                  </div>
                )}

                {/* Table */}
                <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-xl overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-900/50 border-b border-slate-700/50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Personnel</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Badge</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Division</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Contact</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Supervisor</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Performance</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Last Check-in</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Certifications</th>
                        <th className="px-4 py-3 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {personnel.map((person) => {
                        const certStatus = getCertStatus(person.certifications);
                        const StatusIcon = certStatus.icon;
                        return (
                          <tr
                            key={person.id}
                            onMouseEnter={() => setHoveredRow(person.id)}
                            onMouseLeave={() => setHoveredRow(null)}
                            className={`border-b border-slate-800/30 transition-colors ${hoveredRow === person.id ? 'bg-slate-800/30' : ''}`}
                          >
                            <td className="px-4 py-4">
                              <div
                                onClick={() => openQuickPeek(person)}
                                className="flex items-center gap-3 group cursor-pointer"
                              >
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                  <span className="text-white text-sm font-medium">{person.photo}</span>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-white group-hover:text-amber-400 transition-colors">{person.name}</p>
                                  <p className="text-xs text-slate-400">{person.rank}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-4">
                              <p className="text-sm text-slate-300 font-mono">{person.badge}</p>
                            </td>
                            <td className="px-4 py-4">
                              <p className="text-sm text-slate-300">{person.division}</p>
                              <p className="text-xs text-slate-400">{person.shift}</p>
                            </td>
                            <td className="px-4 py-4">
                              <div className="space-y-1">
                                <a href={`mailto:${person.email}`} className="flex items-center gap-2 text-xs text-blue-400 hover:text-blue-300 transition-colors">
                                  <Mail className="w-3 h-3" />
                                  <span>{person.email}</span>
                                </a>
                                <a href={`tel:${person.phone}`} className="flex items-center gap-2 text-xs text-slate-400 hover:text-slate-300 transition-colors">
                                  <Phone className="w-3 h-3" />
                                  <span>{person.phone}</span>
                                </a>
                              </div>
                            </td>
                            <td className="px-4 py-4">
                              <p className="text-sm text-slate-300">{person.supervisor}</p>
                            </td>
                            <td className="px-4 py-4">
                              <div className="flex items-center gap-2">
                                <Star className={`w-4 h-4 ${person.performance >= 4.5 ? 'text-amber-400' : person.performance >= 4.0 ? 'text-blue-400' : 'text-slate-400'}`} />
                                <span className={`text-sm font-medium ${person.performance >= 4.5 ? 'text-amber-400' : person.performance >= 4.0 ? 'text-blue-400' : 'text-slate-300'}`}>
                                  {person.performance.toFixed(1)}
                                </span>
                              </div>
                            </td>
                            <td className="px-4 py-4">
                              <p className="text-sm text-slate-400">{person.lastCheckIn}</p>
                            </td>
                            <td className="px-4 py-4">
                              <div className={`inline-flex items-center gap-2 px-3 py-1 border rounded-full text-xs font-medium ${getStatusColor(person.status)}`}>
                                <div className="w-2 h-2 rounded-full bg-current"></div>
                                <span className="capitalize">{person.status.replace('-', ' ')}</span>
                              </div>
                            </td>
                            <td className="px-4 py-4">
                              <div className="group/cert relative inline-block">
                                <div className={`flex items-center gap-2 px-3 py-1 border rounded-full text-xs font-medium ${
                                  certStatus.color === 'red' ? 'bg-red-500/20 border-red-500/30 text-red-400' :
                                  certStatus.color === 'amber' ? 'bg-amber-500/20 border-amber-500/30 text-amber-400' :
                                  'bg-green-500/20 border-green-500/30 text-green-400'
                                }`}>
                                  <StatusIcon className="w-3 h-3" />
                                  <span>{certStatus.label}</span>
                                </div>
                                {/* Cert Tooltip */}
                                <div className="absolute left-0 top-full mt-2 w-72 bg-slate-900 border border-slate-700 rounded-lg p-3 opacity-0 invisible group-hover/cert:opacity-100 group-hover/cert:visible transition-all z-50 shadow-xl">
                                  <div className="space-y-2">
                                    {person.certifications.map((cert, idx) => (
                                      <div key={idx} className="flex items-center justify-between text-xs">
                                        <span className="text-slate-300">{cert.name}</span>
                                        <span className={`${
                                          cert.status === 'expired' ? 'text-red-400' :
                                          cert.status === 'expiring' ? 'text-amber-400' : 'text-green-400'
                                        }`}>
                                          {cert.status === 'expired' ? 'Expired' : `Exp: ${cert.expires}`}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => openQuickPeek(person)}
                                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 rounded-lg transition-all"
                                  title="View Profile"
                                >
                                  <Eye className="w-3 h-3" />
                                  <span>View</span>
                                </button>
                                <button
                                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-lg transition-all"
                                  title="Schedule Training"
                                >
                                  <Calendar className="w-3 h-3" />
                                </button>
                                <button
                                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs text-slate-400 hover:text-slate-300 hover:bg-slate-500/10 rounded-lg transition-all"
                                  title="More Actions"
                                >
                                  <MoreVertical className="w-3 h-3" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Right Sidebar - KPIs */}
              <div className="w-full xl:w-72 shrink-0">
                <div className="grid grid-cols-2 xl:grid-cols-1 gap-4">
                  {/* Total Personnel - Enhanced */}
                  <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                        <Users className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-white">{stats.total}</p>
                        <p className="text-xs text-slate-400">Total Personnel</p>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-700/50 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Sworn:</span>
                        <span className="text-white font-medium">10 (83%)</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Civilian:</span>
                        <span className="text-white font-medium">2 (17%)</span>
                      </div>
                      <div className="flex justify-between text-xs pt-2 border-t border-slate-700/50">
                        <span className="text-slate-400">Patrol:</span>
                        <span className="text-white font-medium">5</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Investigations:</span>
                        <span className="text-white font-medium">2</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Detention:</span>
                        <span className="text-white font-medium">3</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Dispatch:</span>
                        <span className="text-white font-medium">2</span>
                      </div>
                      <div className="flex justify-between text-xs pt-2 border-t border-slate-700/50">
                        <span className="text-slate-400">Authorized:</span>
                        <span className="text-amber-400 font-medium">20 (60%)</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-emerald-400 pt-1">
                        <TrendingUp className="w-3 h-3" />
                        <span>+2 vs last year</span>
                      </div>
                    </div>
                  </div>

                  {/* On Duty Now - Enhanced */}
                  <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-white">{stats.onDuty}</p>
                        <p className="text-xs text-slate-400">On Duty Now</p>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-700/50 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Patrol:</span>
                        <span className="text-emerald-400 font-medium">4 on duty</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Investigations:</span>
                        <span className="text-emerald-400 font-medium">2 on duty</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Detention:</span>
                        <span className="text-emerald-400 font-medium">2 on duty</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Dispatch:</span>
                        <span className="text-emerald-400 font-medium">1 on duty</span>
                      </div>
                      <div className="flex justify-between text-xs pt-2 border-t border-slate-700/50">
                        <span className="text-slate-400">Day shift:</span>
                        <span className="text-white font-medium">7</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Night shift:</span>
                        <span className="text-white font-medium">2</span>
                      </div>
                      <div className="flex justify-between text-xs pt-2 border-t border-slate-700/50">
                        <span className="text-slate-400">Off duty:</span>
                        <span className="text-slate-300 font-medium">2</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">On leave:</span>
                        <span className="text-amber-400 font-medium">1</span>
                      </div>
                    </div>
                  </div>

                  {/* Expiring Certs - Enhanced */}
                  <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center">
                        <Clock className="w-5 h-5 text-amber-400" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-white">{stats.expiring}</p>
                        <p className="text-xs text-slate-400">Expiring Certs</p>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-700/50 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Urgent (&lt;7 days):</span>
                        <span className="text-red-400 font-semibold">1</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Next 30 days:</span>
                        <span className="text-amber-400 font-semibold">3</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Expired:</span>
                        <span className="text-red-400 font-semibold">2</span>
                      </div>
                      <div className="flex justify-between text-xs pt-2 border-t border-slate-700/50">
                        <span className="text-slate-400">Compliance rate:</span>
                        <span className="text-amber-400 font-semibold">83%</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Target:</span>
                        <span className="text-slate-300 font-medium">95%</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Gap:</span>
                        <span className="text-red-400 font-semibold">-12%</span>
                      </div>
                      <button onClick={() => setShowCertManagement(true)} className="mt-2 w-full px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 text-amber-400 rounded-lg text-xs font-medium transition-colors">
                        Manage Now
                      </button>
                    </div>
                  </div>

                  {/* Open Positions - Enhanced */}
                  <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center">
                        <AlertCircle className="w-5 h-5 text-red-400" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-white">{stats.openPositions}</p>
                        <p className="text-xs text-slate-400">Open Positions</p>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-700/50 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Patrol:</span>
                        <span className="text-red-400 font-semibold">3 (Critical)</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Detention:</span>
                        <span className="text-amber-400 font-semibold">2 (High)</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Investigations:</span>
                        <span className="text-white font-medium">1</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Dispatch:</span>
                        <span className="text-white font-medium">1</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">School Resource:</span>
                        <span className="text-white font-medium">1</span>
                      </div>
                      <div className="flex justify-between text-xs pt-2 border-t border-slate-700/50">
                        <span className="text-slate-400">In pipeline:</span>
                        <span className="text-blue-400 font-medium">12 applicants</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Avg time to hire:</span>
                        <span className="text-emerald-400 font-medium">45 days</span>
                      </div>
                      <button onClick={() => setShowHiringPipeline(true)} className="mt-2 w-full px-3 py-1.5 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 text-blue-400 rounded-lg text-xs font-medium transition-colors">
                        View Pipeline
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      {/* Quick Peek Drawer */}
      {quickPeekOpen && peekData && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            onClick={() => setQuickPeekOpen(false)}
          />
          <div className="relative w-full max-w-[480px] bg-slate-900 border-l border-slate-700/50 shadow-2xl overflow-y-auto">
            <div className="sticky top-0 bg-slate-900/95 backdrop-blur-xl border-b border-slate-700/50 p-6 z-10">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <span className="text-white font-medium">{peekData.photo}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{peekData.name}</h3>
                    <p className="text-sm text-slate-400">{peekData.rank}</p>
                  </div>
                </div>
                <button
                  onClick={() => setQuickPeekOpen(false)}
                  className="p-2 hover:bg-slate-800/50 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>
              <button onClick={() => { setQuickPeekOpen(false); openFullProfile(peekData); }} className="w-full px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-medium transition-colors">
                Open Full Profile
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Status */}
              <div>
                <div className={`flex items-center gap-2 px-3 py-2 border rounded-xl text-sm font-medium ${getStatusColor(peekData.status)}`}>
                  <div className="w-2 h-2 rounded-full bg-current"></div>
                  <span className="capitalize">{peekData.status.replace('-', ' ')}</span>
                </div>
              </div>

              {/* Key Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-800/40 rounded-xl p-4 border border-slate-700/50">
                  <p className="text-xs text-slate-400 mb-1">Badge</p>
                  <p className="text-sm font-medium text-white font-mono">{peekData.badge}</p>
                </div>
                <div className="bg-slate-800/40 rounded-xl p-4 border border-slate-700/50">
                  <p className="text-xs text-slate-400 mb-1">Division</p>
                  <p className="text-sm font-medium text-white">{peekData.division}</p>
                </div>
                <div className="bg-slate-800/40 rounded-xl p-4 border border-slate-700/50">
                  <p className="text-xs text-slate-400 mb-1">Shift</p>
                  <p className="text-sm font-medium text-white">{peekData.shift}</p>
                </div>
                <div className="bg-slate-800/40 rounded-xl p-4 border border-slate-700/50">
                  <p className="text-xs text-slate-400 mb-1">Tenure</p>
                  <p className="text-sm font-medium text-white">{peekData.tenure}</p>
                </div>
              </div>

              {/* Contact */}
              <div>
                <h4 className="text-sm font-semibold text-white mb-3">Contact</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-slate-300">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <span>{peekData.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-300">
                    <Phone className="w-4 h-4 text-slate-400" />
                    <span>{peekData.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-300">
                    <Users className="w-4 h-4 text-slate-400" />
                    <span>Reports to: {peekData.supervisor}</span>
                  </div>
                </div>
              </div>

              {/* Certifications */}
              <div>
                <h4 className="text-sm font-semibold text-white mb-3">Certifications</h4>
                <div className="space-y-2">
                  {peekData.certifications.map((cert, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-slate-800/40 rounded-lg border border-slate-700/50">
                      <div className="flex items-center gap-3">
                        {cert.status === 'current' ? (
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        ) : cert.status === 'expiring' ? (
                          <Clock className="w-4 h-4 text-amber-400" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-red-400" />
                        )}
                        <div>
                          <p className="text-sm text-white">{cert.name}</p>
                          <p className="text-xs text-slate-400">Expires: {cert.expires}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="pt-4 border-t border-slate-700/50 space-y-3">
                <button className="w-full flex items-center gap-3 px-4 py-3 bg-slate-800/40 hover:bg-slate-800/60 border border-slate-700/50 hover:border-slate-600/50 rounded-xl text-white transition-all">
                  <Mail className="w-5 h-5 text-blue-400" />
                  <span className="text-sm font-medium">Send Message</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 bg-slate-800/40 hover:bg-slate-800/60 border border-slate-700/50 hover:border-slate-600/50 rounded-xl text-white transition-all">
                  <Calendar className="w-5 h-5 text-amber-400" />
                  <span className="text-sm font-medium">View Schedule</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Chat Button */}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 z-40"
      >
        {chatOpen ? <X className="w-6 h-6 text-white" /> : <MessageCircle className="w-6 h-6 text-white" />}
        {!chatOpen && <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-slate-900 animate-pulse"></span>}
      </button>

      {/* AI Chat Panel */}
      {chatOpen && (
        <div className="fixed bottom-24 right-6 w-full max-w-96 h-[500px] bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl flex flex-col z-40 mx-4 sm:mx-0">
          <div className="p-4 border-b border-slate-700/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Personnel AI Assistant</h3>
                <p className="text-xs text-green-400">Online</p>
              </div>
            </div>
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="flex gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <div className="bg-slate-800/60 p-3 rounded-xl">
                  <p className="text-sm text-slate-200">Hi! I can help you find personnel records, analyze certifications, check staffing levels, and answer questions about your team. What would you like to know?</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-slate-700/50">
            <div className="flex items-center gap-2">
              <input type="text" placeholder="Ask about personnel..." className="flex-1 px-4 py-2 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50" />
              <button className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                <Send className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Full Personnel Profile Modal */}
      {fullProfileOpen && fullProfileData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm"
            onClick={() => setFullProfileOpen(false)}
          />
          <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-700/50 rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-slate-900/95 backdrop-blur-xl border-b border-slate-700/50 p-6 z-10">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <span className="text-white text-xl font-bold">{fullProfileData.photo}</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">{fullProfileData.name}</h2>
                    <div className="flex items-center gap-3 text-sm text-slate-400">
                      <span>{fullProfileData.rank}</span>
                      <span>•</span>
                      <span className="font-mono">{fullProfileData.badge}</span>
                      <span>•</span>
                      <span>{fullProfileData.division}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setFullProfileOpen(false)}
                  className="p-2 hover:bg-slate-800/50 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-slate-400" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Main Info */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Status & Quick Info */}
                  <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5">
                    <h3 className="text-lg font-bold text-white mb-4">Status & Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-slate-400 mb-1">Current Status</p>
                        <div className={`inline-flex items-center gap-2 px-3 py-1.5 border rounded-lg text-sm font-medium ${getStatusColor(fullProfileData.status)}`}>
                          <div className="w-2 h-2 rounded-full bg-current"></div>
                          <span className="capitalize">{fullProfileData.status.replace('-', ' ')}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 mb-1">Tenure</p>
                        <p className="text-sm font-medium text-white">{fullProfileData.tenure}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 mb-1">Shift Assignment</p>
                        <p className="text-sm font-medium text-white">{fullProfileData.shift}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 mb-1">Supervisor</p>
                        <p className="text-sm font-medium text-white">{fullProfileData.supervisor}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 mb-1">Last Check-in</p>
                        <p className="text-sm font-medium text-white">{fullProfileData.lastCheckIn}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 mb-1">Performance Rating</p>
                        <div className="flex items-center gap-2">
                          <Star className={`w-5 h-5 ${fullProfileData.performance >= 4.5 ? 'text-amber-400' : fullProfileData.performance >= 4.0 ? 'text-blue-400' : 'text-slate-400'}`} />
                          <span className={`text-lg font-bold ${fullProfileData.performance >= 4.5 ? 'text-amber-400' : fullProfileData.performance >= 4.0 ? 'text-blue-400' : 'text-slate-300'}`}>
                            {fullProfileData.performance.toFixed(1)}
                          </span>
                          <span className="text-xs text-slate-400">/5.0</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Activity Stats */}
                  <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <Activity className="w-5 h-5 text-purple-400" />
                      Activity Statistics (Last 30 Days)
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-slate-900/50 rounded-lg">
                        <p className="text-2xl font-bold text-blue-400">142</p>
                        <p className="text-xs text-slate-400 mt-1">Calls for Service</p>
                      </div>
                      <div className="text-center p-4 bg-slate-900/50 rounded-lg">
                        <p className="text-2xl font-bold text-emerald-400">28</p>
                        <p className="text-xs text-slate-400 mt-1">Reports Written</p>
                      </div>
                      <div className="text-center p-4 bg-slate-900/50 rounded-lg">
                        <p className="text-2xl font-bold text-amber-400">12</p>
                        <p className="text-xs text-slate-400 mt-1">Arrests Made</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="text-center p-4 bg-slate-900/50 rounded-lg">
                        <p className="text-xl font-bold text-purple-400">8.5 hrs</p>
                        <p className="text-xs text-slate-400 mt-1">Avg Response Time</p>
                      </div>
                      <div className="text-center p-4 bg-slate-900/50 rounded-lg">
                        <p className="text-xl font-bold text-indigo-400">97%</p>
                        <p className="text-xs text-slate-400 mt-1">Case Closure Rate</p>
                      </div>
                    </div>
                  </div>

                  {/* Certifications & Training */}
                  <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <Award className="w-5 h-5 text-purple-400" />
                      Certifications & Training History
                    </h3>
                    <div className="space-y-3">
                      {fullProfileData.certifications.map((cert, idx) => (
                        <div key={idx} className={`p-4 rounded-lg border ${
                          cert.status === 'expired' ? 'bg-red-500/10 border-red-500/30' :
                          cert.status === 'expiring' ? 'bg-amber-500/10 border-amber-500/30' :
                          'bg-slate-900/50 border-slate-700/50'
                        }`}>
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3">
                              {cert.status === 'current' ? (
                                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                              ) : cert.status === 'expiring' ? (
                                <Clock className="w-5 h-5 text-amber-400 mt-0.5" />
                              ) : (
                                <AlertCircle className="w-5 h-5 text-red-400 mt-0.5" />
                              )}
                              <div>
                                <p className="text-sm font-semibold text-white">{cert.name}</p>
                                <p className="text-xs text-slate-400 mt-1">Expires: {cert.expires}</p>
                                <p className="text-xs text-slate-500 mt-1">Last renewed: {new Date(cert.expires).getFullYear() - 2}-{new Date(cert.expires).getMonth() + 1}-{new Date(cert.expires).getDate()}</p>
                              </div>
                            </div>
                            <div>
                              {cert.status === 'expired' ? (
                                <span className="px-2 py-1 bg-red-500/20 border border-red-500/30 text-red-400 text-xs rounded">Expired</span>
                              ) : cert.status === 'expiring' ? (
                                <span className="px-2 py-1 bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs rounded">Expiring Soon</span>
                              ) : (
                                <span className="px-2 py-1 bg-green-500/20 border border-green-500/30 text-green-400 text-xs rounded">Current</span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Performance Reviews */}
                  <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <Star className="w-5 h-5 text-purple-400" />
                      Performance Reviews
                    </h3>
                    <div className="space-y-3">
                      <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-700/50">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-white">2024 Annual Review</span>
                          <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-amber-400" />
                            <span className="text-sm font-bold text-amber-400">{fullProfileData.performance.toFixed(1)}/5.0</span>
                          </div>
                        </div>
                        <p className="text-xs text-slate-400">Excellent performance in all areas. Demonstrates leadership and initiative.</p>
                        <p className="text-xs text-slate-500 mt-2">Reviewed by: {fullProfileData.supervisor} • Jan 15, 2024</p>
                      </div>
                      <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-700/50">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-white">2023 Annual Review</span>
                          <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-blue-400" />
                            <span className="text-sm font-bold text-blue-400">{(fullProfileData.performance - 0.2).toFixed(1)}/5.0</span>
                          </div>
                        </div>
                        <p className="text-xs text-slate-400">Strong work ethic and dedication to duty. Continues to improve.</p>
                        <p className="text-xs text-slate-500 mt-2">Reviewed by: {fullProfileData.supervisor} • Jan 12, 2023</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Contact & Equipment */}
                <div className="space-y-6">
                  {/* Contact Information */}
                  <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5">
                    <h3 className="text-lg font-bold text-white mb-4">Contact</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-slate-400 mb-1">Email</p>
                        <a href={`mailto:${fullProfileData.email}`} className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors">
                          <Mail className="w-4 h-4" />
                          <span>{fullProfileData.email}</span>
                        </a>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 mb-1">Phone</p>
                        <a href={`tel:${fullProfileData.phone}`} className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors">
                          <Phone className="w-4 h-4" />
                          <span>{fullProfileData.phone}</span>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Equipment Assignments */}
                  <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-purple-400" />
                      Equipment
                    </h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-slate-900/50 rounded-lg">
                        <p className="text-xs text-slate-400">Vehicle</p>
                        <p className="text-sm font-medium text-white">Unit #{fullProfileData.badge.split('-')[1]}</p>
                        <p className="text-xs text-slate-500 mt-1">2023 Ford Police Interceptor</p>
                      </div>
                      <div className="p-3 bg-slate-900/50 rounded-lg">
                        <p className="text-xs text-slate-400">Radio</p>
                        <p className="text-sm font-medium text-white">Motorola APX 8000</p>
                        <p className="text-xs text-slate-500 mt-1">ID: R-{fullProfileData.id.split('-')[2]}</p>
                      </div>
                      <div className="p-3 bg-slate-900/50 rounded-lg">
                        <p className="text-xs text-slate-400">Body Camera</p>
                        <p className="text-sm font-medium text-white">Axon Body 3</p>
                        <p className="text-xs text-slate-500 mt-1">ID: BC-{fullProfileData.badge.split('-')[1]}</p>
                      </div>
                      <div className="p-3 bg-slate-900/50 rounded-lg">
                        <p className="text-xs text-slate-400">Firearm</p>
                        <p className="text-sm font-medium text-white">Glock 17 Gen5</p>
                        <p className="text-xs text-slate-500 mt-1">Serial: G{fullProfileData.id.split('-')[2]}</p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5">
                    <h3 className="text-lg font-bold text-white mb-4">Actions</h3>
                    <div className="space-y-2">
                      <button className="w-full flex items-center gap-3 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-medium transition-colors">
                        <UserCircle className="w-4 h-4" />
                        <span>Edit Profile</span>
                      </button>
                      <button className="w-full flex items-center gap-3 px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm font-medium transition-colors">
                        <Calendar className="w-4 h-4" />
                        <span>Schedule Training</span>
                      </button>
                      <button className="w-full flex items-center gap-3 px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm font-medium transition-colors">
                        <Briefcase className="w-4 h-4" />
                        <span>Assign to Case</span>
                      </button>
                      <button className="w-full flex items-center gap-3 px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm font-medium transition-colors">
                        <Mail className="w-4 h-4" />
                        <span>Send Message</span>
                      </button>
                      <button className="w-full flex items-center gap-3 px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm font-medium transition-colors">
                        <Download className="w-4 h-4" />
                        <span>Download Full Record</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
  );
}
