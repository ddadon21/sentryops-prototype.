import React, { useState } from 'react';
import { Home, Users, FileText, LayoutDashboard, TrendingUp, AlertCircle, Settings, Bell, MessageCircle, Search, ChevronRight, DollarSign, CheckCircle, Shield, X, Send, Menu, ChevronLeft, LogOut, UserPlus, Briefcase, Clock, Award, Filter, Download, Eye, Calendar, Phone, Mail, MapPin, Star, FileCheck, Upload, CheckCircle2, Circle, AlertTriangle, ClipboardCheck, GraduationCap, ChevronDown, ChevronUp, Car, Radio, Target, Heart, FileWarning, Building, BadgeCheck, Clipboard, UserCheck, Crosshair, Zap, ShieldAlert, BookOpen, ExternalLink, Printer, BarChart3, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function TrainingCertifications() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState('training-certifications');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeStatusFilter, setActiveStatusFilter] = useState('all');
  const [expandedViolation, setExpandedViolation] = useState({ post: true, firearms: true, taser: true });
  const [expandedCategory, setExpandedCategory] = useState({});
  const [supportOpen, setSupportOpen] = useState(false);

  const navigation = [
    { id: 'hr-dashboard', label: 'HR Dashboard', icon: Users, page: 'HRDashboard' },
    { id: 'job-postings', label: 'Job Postings', icon: Briefcase, page: 'JobPostings' },
    { id: 'applicant-tracking', label: 'Applicant Tracking', icon: UserPlus, page: 'ApplicantTracking' },
    { id: 'hiring-pipeline', label: 'Hiring Pipeline', icon: TrendingUp, page: 'HiringPipeline' },
    { id: 'compliance', label: 'HR Compliance', icon: ClipboardCheck, page: 'ComplianceManagement' },
    { id: 'onboarding', label: 'New Hire Onboarding', icon: FileCheck, page: 'NewHireOnboarding' },
    { id: 'training-certifications', label: 'Training & Certifications', icon: GraduationCap },
    { id: 'employee-records', label: 'Employee Records', icon: FileText, page: 'EmployeeRecords' },
    { id: 'time-off', label: 'Time Off Management', icon: Calendar, page: 'TimeOffManagement' },
    { id: 'performance', label: 'Performance Reviews', icon: Award, page: 'PerformanceReviews' },
    { id: 'hr-reports', label: 'HR Reports', icon: LayoutDashboard, page: 'HRReports' },
    { id: 'settings', label: 'Settings', icon: Settings, page: 'HRSettings' }
  ];

  const notifications = [
    { id: 1, title: '15 Firearms Qualifications Overdue', message: 'Annual qualification deadline passed January 31 - Range day scheduled February 12, 2026', time: '30 min ago', urgent: true },
    { id: 2, title: '2 POST Certifications Expired', message: 'Deputies Rodriguez (#2847) and Thompson (#2193) - Removed from sworn duties, renewal scheduled', time: '1 hour ago', urgent: true },
    { id: 3, title: '3 TASER Certifications Expired', message: 'Deputies Anderson, Williams, Rodriguez - TASERs removed, recert class Feb 20', time: '2 hours ago', urgent: true },
    { id: 4, title: '23 Certifications Expiring <60 Days', message: 'Multiple categories - Review expiration dashboard for individual details', time: '3 hours ago', urgent: false },
    { id: 5, title: 'DT Recertification Schedule Posted', message: '34 deputies due for Defensive Tactics recertification Q1 2026', time: '5 hours ago', urgent: false }
  ];

  // Critical Training Compliance Violations Data
  const criticalViolations = {
    expiredPost: {
      count: 2,
      deputies: [
        {
          name: 'Deputy M. Rodriguez',
          badge: '#2847',
          certLevel: 'Basic POST',
          expiredDate: 'January 28, 2026',
          daysExpired: 11,
          status: 'Removed from sworn duties',
          renewalTraining: 'February 10-14, 2026 (GPSTC-Columbus)',
          enrolled: true
        },
        {
          name: 'Sgt. K. Thompson',
          badge: '#2193',
          certLevel: 'Intermediate POST',
          expiredDate: 'January 28, 2026',
          daysExpired: 11,
          status: 'Removed from sworn duties',
          renewalTraining: 'February 10-14, 2026 (GPSTC-Columbus)',
          enrolled: true
        }
      ]
    },
    overdueFirearms: {
      count: 15,
      deadline: 'January 31, 2026',
      daysOverdue: 8,
      graceExpired: 'February 05, 2026',
      divisions: [
        {
          name: 'Patrol Division',
          count: 8,
          officers: [
            { name: 'Deputy J. Martinez', badge: '#2756', lastQual: '01/15/2025' },
            { name: 'Deputy K. Williams', badge: '#2891', lastQual: '12/20/2024' },
            { name: 'Deputy R. Thompson', badge: '#2934', lastQual: '01/08/2025' },
            { name: 'Deputy L. Chen', badge: '#3012', lastQual: '01/10/2025' },
            { name: 'Deputy M. Anderson', badge: '#2678', lastQual: '12/15/2024' },
            { name: 'Deputy S. Davis', badge: '#2845', lastQual: '01/05/2025' },
            { name: 'Deputy T. Wilson', badge: '#2923', lastQual: '01/12/2025' },
            { name: 'Deputy A. Garcia', badge: '#3045', lastQual: '12/28/2024' }
          ]
        },
        {
          name: 'Criminal Investigations',
          count: 4,
          officers: [
            { name: 'Detective R. Thompson', badge: '#2634', lastQual: '01/10/2025' },
            { name: 'Detective K. Martinez', badge: '#2701', lastQual: '12/22/2024' },
            { name: 'Detective S. Johnson', badge: '#2789', lastQual: '01/03/2025' },
            { name: 'Detective L. Brown', badge: '#2812', lastQual: '12/30/2024' }
          ]
        },
        {
          name: 'Court Services',
          count: 2,
          officers: [
            { name: 'Deputy M. Parker', badge: '#2567', lastQual: '01/07/2025' },
            { name: 'Deputy J. Collins', badge: '#2698', lastQual: '12/18/2024' }
          ]
        },
        {
          name: 'Administration',
          count: 1,
          officers: [
            { name: 'Lt. R. Hayes', badge: '#2012', lastQual: '01/04/2025' }
          ]
        }
      ],
      correctiveActions: [
        { action: 'All 15 officers notified of overdue status', date: '02/05/2026', completed: true },
        { action: 'Supervisors notified: Ensure officers attend range day', date: '02/05/2026', completed: true },
        { action: 'Range Day Scheduled: February 12, 2026 08:00-17:00', date: '02/12/2026', completed: true, details: 'Location: GCSO Training Center Firearms Range | Instructors: Sgt. R. Martinez (Lead), Deputy K. Chen (Assistant) | All 15 officers confirmed' },
        { action: 'Range Day Execution - Officers qualify with duty weapon (Glock 17)', date: '02/12/2026', completed: false, details: 'Passing scores (240+/300): Officer cleared for duty | Failing scores (<240/300): Remedial training + requalify within 7 days (Feb 19 make-up)' },
        { action: 'Update Firearms Qualification Database', date: '02/12/2026', completed: false },
        { action: 'File qualification range cards in personnel files', date: '02/12/2026', completed: false },
        { action: 'Notify supervisors of qualification results', date: '02/12/2026', completed: false }
      ]
    },
    expiredTaser: {
      count: 3,
      deputies: [
        {
          name: 'Deputy K. Anderson',
          badge: '#2789',
          division: 'Patrol Division, B-Shift',
          lastCert: 'January 20, 2024',
          expiredDate: 'January 20, 2026',
          daysOverdue: 19,
          taserStatus: 'TASER removed from duty belt 02/08/2026 (discovered during supervisor inspection)',
          recertClass: 'February 20, 2026 (12 days)',
          enrolled: true,
          supervisorAction: null
        },
        {
          name: 'Deputy S. Williams',
          badge: '#2845',
          division: 'Patrol Division, A-Shift',
          lastCert: 'December 10, 2023',
          expiredDate: 'December 10, 2025',
          daysOverdue: 60,
          taserStatus: 'TASER removed from duty belt 01/15/2026',
          recertClass: 'February 20, 2026',
          enrolled: true,
          supervisorAction: 'Sgt. Williams notified of violation, deputy counseled on importance of tracking certification dates'
        },
        {
          name: 'Deputy L. Rodriguez',
          badge: '#2901',
          division: 'Patrol Division, C-Shift',
          lastCert: 'November 5, 2023',
          expiredDate: 'November 5, 2025',
          daysOverdue: 95,
          taserStatus: 'TASER removed from duty belt 12/20/2025',
          recertClass: 'February 20, 2026',
          enrolled: true,
          supervisorAction: 'Lt. Thompson notified, deputy counseled'
        }
      ],
      recertTraining: {
        date: 'February 20, 2026 - 08:00-12:00 (4 hours)',
        location: 'GCSO Training Center',
        instructor: 'Sgt. R. Martinez (TASER Master Instructor)',
        attendees: '3 deputies (Anderson, Williams, Rodriguez) + 2 additional deputies due for recertification in March 2026',
        content: 'TASER X26P operation, safety protocols, use of force policy review, legal updates, hands-on training',
        certification: 'Upon successful completion, deputies cleared to carry TASER for 2-year period (expires February 20, 2028)'
      }
    }
  };

  // Training Categories Data
  const trainingCategories = [
    {
      id: 'post',
      name: 'Georgia POST Certification',
      icon: Shield,
      iconColor: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30',
      authority: 'Georgia Peace Officer Standards and Training Council (POST) - O.C.G.A. Section 35-8-1 et seq.',
      requirement: 'All sworn law enforcement personnel must maintain current Georgia POST certification to perform sworn duties',
      totalPersonnel: 164,
      personnelType: 'sworn deputies',
      stats: {
        certified: 162,
        certifiedPct: '98.8%',
        breakdown: [
          { level: 'Basic POST', count: 110, pct: '67.1%' },
          { level: 'Intermediate POST', count: 40, pct: '24.4%' },
          { level: 'Advanced POST', count: 12, pct: '7.3%' }
        ],
        expired: 2,
        expiredPct: '1.2%',
        expiredDeputies: [
          { name: 'Deputy M. Rodriguez', level: 'Basic POST', expired: '01/28/2026', renewalScheduled: true },
          { name: 'Sgt. K. Thompson', level: 'Intermediate POST', expired: '01/28/2026', renewalScheduled: true }
        ]
      },
      upcoming: {
        within30: {
          count: 3,
          deputies: [
            { name: 'Deputy K. Martinez', badge: '#2934', level: 'Basic POST', expires: '03/08/2026', daysLeft: 28, renewalScheduled: true, renewalDate: '02/25-28/2026' },
            { name: 'Deputy R. Williams', badge: '#2867', level: 'Basic POST', expires: '03/12/2026', daysLeft: 32, renewalScheduled: false },
            { name: 'Deputy S. Anderson', badge: '#2945', level: 'Intermediate POST', expires: '03/15/2026', daysLeft: 35, renewalScheduled: false }
          ]
        },
        within60: { count: 8 },
        within90: { count: 12 }
      }
    },
    {
      id: 'firearms',
      name: 'Firearms Qualification',
      icon: Crosshair,
      iconColor: 'text-red-400',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/30',
      authority: 'GCSO Policy 4.12 - Firearms Qualification Requirements | Georgia POST Firearms Standards',
      requirement: 'All sworn personnel must qualify annually with duty weapon and any additional firearms carried',
      totalPersonnel: 164,
      personnelType: 'sworn deputies',
      stats: {
        certified: 149,
        certifiedPct: '90.9%',
        qualDates: 'January 5-31, 2026',
        avgScore: '278/300 (92.7%)',
        passRate: '97.3% (145 passed first attempt, 4 required remedial training)',
        overdue: 15,
        overduePct: '9.1%',
        overdueNote: 'See Critical Violations above - Range day Feb 12'
      },
      weaponBreakdown: [
        { weapon: 'Primary Duty Weapon (Glock 17 Gen5, 9mm)', qualified: 149, pending: 15 },
        { weapon: 'Backup/Secondary Handgun (various)', qualified: 87 },
        { weapon: 'Patrol Rifle (AR-15/M4 platform)', qualified: 45 },
        { weapon: 'Shotgun (Remington 870)', qualified: 23 }
      ],
      specializedQuals: [
        { type: 'Firearms Instructors', count: 6, status: 'All current through 2026' },
        { type: 'Sniper/Precision Rifle (SWAT)', count: 4, status: 'Annual qual current' },
        { type: 'Submachine Gun - MP5 (SWAT)', count: 12, status: 'Annual qual current' }
      ],
      rangeDays: [
        { date: 'February 12, 2026', purpose: 'Overdue qualifications (15 deputies)', status: 'scheduled' },
        { date: 'February 19, 2026', purpose: 'Remedial/make-up range day (as needed)', status: 'tentative' },
        { date: 'March 15, 2026', purpose: 'New hire qualifications + specialized weapons', status: 'scheduled' },
        { date: 'Quarterly', purpose: 'SWAT qualifications (specialized weapons)', status: 'recurring' },
        { date: 'Monthly', purpose: 'Firearms instructor practice/training', status: 'recurring' }
      ]
    },
    {
      id: 'taser',
      name: 'TASER Certification',
      icon: Zap,
      iconColor: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/30',
      authority: 'Axon TASER Certification Program | GCSO Policy 4.15 - Electronic Control Devices (TASER)',
      requirement: '2-year recertification cycle. Deputies cannot carry TASER without current certification.',
      totalPersonnel: 152,
      personnelType: 'TASER-authorized deputies',
      stats: {
        certified: 149,
        certifiedPct: '98.0%',
        expired: 3,
        expiredPct: '2.0%',
        expiredNote: 'See Critical Violations above - Recert class Feb 20'
      },
      upcoming: {
        within30: { count: 2, note: 'Included in Feb 20 recert class' },
        within60: { count: 5 },
        within90: { count: 8 }
      }
    },
    {
      id: 'defensive-tactics',
      name: 'Defensive Tactics Recertification',
      icon: ShieldAlert,
      iconColor: 'text-orange-400',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/30',
      authority: 'Georgia POST Standards | GCSO Policy 3.14 - Defensive Tactics Training',
      requirement: 'Annual recertification required for all sworn personnel. Includes control tactics, handcuffing, defensive techniques.',
      totalPersonnel: 164,
      personnelType: 'sworn deputies',
      stats: {
        certified: 130,
        certifiedPct: '79.3%',
        dueThisQuarter: 34,
        dueNote: 'Q1 2026 (due by March 31, 2026)',
        sessionsNeeded: '3-4 sessions (8-12 deputies per session)',
        instructor: 'Deputy M. Johnson (Certified DT Instructor)',
        location: 'GCSO Training Center - Defensive Tactics Room'
      },
      scheduledSessions: [
        { date: 'February 18-19, 2026', slots: 12, enrolled: 10, status: 'Open' },
        { date: 'March 3-4, 2026', slots: 12, enrolled: 8, status: 'Open' },
        { date: 'March 17-18, 2026', slots: 12, enrolled: 6, status: 'Open' },
        { date: 'March 24-25, 2026 (Make-up)', slots: 12, enrolled: 0, status: 'Reserved' }
      ]
    },
    {
      id: 'cpr',
      name: 'CPR/First Aid Certification',
      icon: Heart,
      iconColor: 'text-pink-400',
      bgColor: 'bg-pink-500/10',
      borderColor: 'border-pink-500/30',
      authority: 'American Red Cross / American Heart Association | GCSO Policy 5.02 - Emergency Medical Response',
      requirement: 'Required for all sworn personnel and detention staff. 2-year certification cycle.',
      totalPersonnel: 170,
      personnelType: 'sworn + detention staff',
      stats: {
        certified: 156,
        certifiedPct: '91.8%',
        notRequired: 8,
        notRequiredNote: 'Administrative civilian staff (not required)',
        expired: 4,
        expiredPct: '2.4%',
        dueWithin60: 10
      }
    },
    {
      id: 'cjis',
      name: 'CJIS Security Training',
      icon: FileCheck,
      iconColor: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10',
      borderColor: 'border-cyan-500/30',
      authority: 'FBI Criminal Justice Information Services (CJIS) Security Policy v5.9.3 | 28 CFR Part 20',
      requirement: 'Annual training required for all personnel with GCIC/NCIC access. FBI CJIS Security Policy compliance.',
      totalPersonnel: 172,
      personnelType: 'personnel with CJIS access',
      stats: {
        certified: 168,
        certifiedPct: '97.7%',
        overdue: 4,
        overduePct: '2.3%',
        nextAudit: 'FBI CJIS Audit scheduled April 2026'
      }
    }
  ];

  // Mandatory compliance summary
  const mandatoryCompliance = {
    postCert: { label: 'POST Certification', compliant: 162, total: 164, pct: '98.8%', status: 'warning' },
    firearms: { label: 'Firearms Qualification', compliant: 149, total: 164, pct: '90.9%', status: 'critical' },
    taser: { label: 'TASER Certification', compliant: 149, total: 152, pct: '98.0%', status: 'warning' },
    dt: { label: 'Defensive Tactics', compliant: 130, total: 164, pct: '79.3%', status: 'critical' },
    cpr: { label: 'CPR/First Aid', compliant: 156, total: 170, pct: '91.8%', status: 'warning' },
    cjis: { label: 'CJIS Security', compliant: 168, total: 172, pct: '97.7%', status: 'warning' }
  };

  const handleNavigation = (item) => {
    if (item.page) {
      navigate(createPageUrl(item.page));
    } else {
      setActivePage(item.id);
      setSidebarOpen(false);
    }
  };

  const handleLogout = () => {
    navigate(createPageUrl('SignIn'));
  };

  const toggleViolation = (key) => {
    setExpandedViolation(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleCategory = (id) => {
    setExpandedCategory(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex">
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 border-r border-slate-800/50 backdrop-blur-xl bg-slate-900/30 flex flex-col transform transition-all lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} ${sidebarCollapsed ? 'w-20' : 'w-64'}`}>
        <div className="p-4 border-b border-slate-700/50 flex items-center justify-between">
          {!sidebarCollapsed && (
            <div className="flex items-center gap-2">
              <Shield className="w-8 h-8 text-amber-500" />
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">SentryOps</h1>
            </div>
          )}
          {sidebarCollapsed && (
            <Shield className="w-8 h-8 text-amber-500 mx-auto" />
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 hover:bg-slate-800/50 rounded-lg transition-colors hidden lg:block"
          >
            {sidebarCollapsed ? <ChevronRight className="w-5 h-5 text-slate-600 dark:text-slate-400" /> : <ChevronLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {navigation.map(item => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white'
                } ${sidebarCollapsed ? 'justify-center' : ''}`}
                title={sidebarCollapsed ? item.label : ''}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!sidebarCollapsed && (
                  <span className="flex-1 text-left text-sm font-medium truncate">{item.label}</span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="border-t border-slate-700/50">
          {!sidebarCollapsed && (
            <div className="px-4 py-3">
              <p className="text-xs text-slate-500 text-center">Gwinnett County Sheriff's Office</p>
            </div>
          )}

          <div className="p-4">
            <button
              onClick={() => setLogoutConfirmOpen(true)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-slate-600 dark:text-slate-400 hover:bg-slate-800/40 hover:text-slate-700 dark:text-slate-300 ${sidebarCollapsed ? 'justify-center' : ''}`}
              title={sidebarCollapsed ? 'Sign Out' : ''}
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              {!sidebarCollapsed && (
                <span className="flex-1 text-left text-sm font-medium">Sign Out</span>
              )}
            </button>
          </div>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {logoutConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setLogoutConfirmOpen(false)}
          />
          <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/50 rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-slate-800/60 rounded-xl flex items-center justify-center">
                <LogOut className="w-6 h-6 text-slate-600 dark:text-slate-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Sign Out</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Are you sure you want to sign out?</p>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setLogoutConfirmOpen(false)}
                className="flex-1 px-4 py-2.5 bg-slate-800/40 hover:bg-slate-800/60 border border-slate-700/50 rounded-xl text-slate-900 dark:text-white font-medium transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 px-4 py-2.5 bg-slate-700/40 hover:bg-slate-700/60 border border-slate-600/50 rounded-xl text-slate-900 dark:text-white font-medium transition-all"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="border-b border-slate-800/50 backdrop-blur-xl bg-slate-900/30">
          <div className="px-4 lg:px-6 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 hover:bg-slate-800/50 rounded-lg"
              >
                <Menu className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              </button>
              <div className="flex items-center gap-2 text-sm">
                <button
                  onClick={() => navigate(createPageUrl('HRDashboard'))}
                  className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:text-white transition-colors"
                >
                  HR Dashboard
                </button>
                <ChevronRight className="w-4 h-4 text-slate-600" />
                <span className="text-slate-900 dark:text-white">Training & Certifications</span>
              </div>
            </div>
            <div className="flex items-center gap-2 lg:gap-3">
              <button className="flex items-center gap-2 px-3 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-sm font-medium transition-all">
                <Upload className="w-4 h-4" />
                <span className="hidden sm:inline">Upload Certificate</span>
              </button>

              <button className="hidden md:flex items-center gap-2 px-3 py-2 bg-slate-800/40 hover:bg-slate-800/60 border border-slate-700/50 text-slate-700 dark:text-slate-300 rounded-xl text-sm transition-all">
                <Calendar className="w-4 h-4" />
                <span>Schedule Training</span>
              </button>

              <button className="hidden lg:flex items-center gap-2 px-3 py-2 bg-slate-800/40 hover:bg-slate-800/60 border border-slate-700/50 text-slate-700 dark:text-slate-300 rounded-xl text-sm transition-all">
                <Download className="w-4 h-4" />
                <span>Export Report</span>
              </button>

              <div className="relative">
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="p-2 hover:bg-slate-800/50 rounded-lg relative"
                >
                  <Bell className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {notificationsOpen && (
                  <div className="absolute right-0 top-full mt-2 w-96 bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-xl shadow-2xl z-50">
                    <div className="p-4 border-b border-slate-700/50">
                      <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Training Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map(notification => (
                        <div key={notification.id} className={`p-4 border-b border-slate-800/30 hover:bg-slate-100 dark:hover:bg-slate-800/30 cursor-pointer transition-colors ${notification.urgent ? 'bg-amber-500/5' : ''}`}>
                          <div className="flex items-start gap-3">
                            <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${notification.urgent ? 'bg-red-400' : 'bg-blue-400'}`}></div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-slate-900 dark:text-white mb-1">{notification.title}</p>
                              <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">{notification.message}</p>
                              <p className="text-xs text-slate-500">{notification.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="h-8 w-px bg-slate-700/50"></div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-slate-900 dark:text-white text-sm font-bold">HR</span>
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-slate-900 dark:text-white">HR Manager</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Human Resources</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">
            {/* GCSO Header */}
            <div className="mb-6">
              <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mb-2">Training & Certifications Management</h2>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-600 dark:text-slate-400">
                <span>Gwinnett County Sheriff's Office</span>
                <span className="text-slate-600">•</span>
                <span>Lawrenceville, Georgia</span>
                <span className="text-slate-600">•</span>
                <span>Sunday, February 08, 2026 • 1:53 PM EST</span>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 mt-1">
                <span>Sheriff: Keybo Taylor</span>
                <span className="text-slate-600">|</span>
                <span>Training Coordinator: Sgt. R. Martinez (Training Division)</span>
                <span className="text-slate-600">|</span>
                <span>Total Active Personnel: 178 (164 sworn, 14 civilian)</span>
                <span className="text-slate-600">|</span>
                <span>System: GCSO-HRIS v4.2</span>
              </div>
            </div>

            {/* Critical Alerts Banner */}
            <div className="mb-6 space-y-3">
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-red-400 mb-1">15 Firearms Qualifications Overdue (8 days past deadline)</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Annual qualification deadline January 31, 2026 - Grace period expired February 05 - Range day scheduled February 12, 2026</p>
                  </div>
                  <span className="px-2 py-1 bg-red-500/20 border border-red-500/40 text-red-400 rounded-lg text-xs font-bold whitespace-nowrap">CRITICAL</span>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-red-400 mb-1">2 POST Certifications Expired (Deputies Rodriguez, Thompson)</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Both removed from sworn duties - Renewal training scheduled February 10-14, 2026 at GPSTC-Columbus</p>
                  </div>
                  <span className="px-2 py-1 bg-red-500/20 border border-red-500/40 text-red-400 rounded-lg text-xs font-bold whitespace-nowrap">CRITICAL</span>
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-amber-400 mb-1">23 Certifications Expire Within 60 Days - Schedule Renewals Immediately</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">POST (8), TASER (5), CPR/First Aid (10) - Review individual expiration dates below</p>
                  </div>
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-amber-400 mb-1">34 Defensive Tactics Recertifications Due Q1 2026</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Due by March 31, 2026 - 3 training sessions scheduled (Feb 18, Mar 3, Mar 17) - Range time required</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mandatory Training Compliance Summary Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
              {Object.entries(mandatoryCompliance).map(([key, item]) => (
                <div key={key} className={`bg-slate-800/40 border rounded-xl p-4 ${
                  item.status === 'critical' ? 'border-red-500/30' : item.status === 'warning' ? 'border-amber-500/30' : 'border-green-500/30'
                }`}>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-1 truncate">{item.label}</p>
                  <p className={`text-xl font-bold mb-1 ${
                    item.status === 'critical' ? 'text-red-400' : item.status === 'warning' ? 'text-amber-400' : 'text-green-400'
                  }`}>{item.pct}</p>
                  <p className="text-xs text-slate-500">{item.compliant}/{item.total}</p>
                  <div className="mt-2 w-full h-1.5 bg-slate-700/50 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        item.status === 'critical' ? 'bg-red-500' : item.status === 'warning' ? 'bg-amber-500' : 'bg-green-500'
                      }`}
                      style={{ width: item.pct }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* ==================== */}
            {/* CRITICAL VIOLATIONS  */}
            {/* ==================== */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Critical Training Compliance Violations</h3>
                <span className="px-2 py-1 bg-red-500/20 border border-red-500/30 rounded text-xs text-red-400 font-bold">IMMEDIATE ACTION</span>
              </div>

              {/* Expired POST Certifications */}
              <div className="mb-4 bg-slate-800/40 border border-red-500/30 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleViolation('post')}
                  className="w-full px-5 py-4 flex items-center justify-between hover:bg-slate-800/60 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-red-400" />
                    <div className="text-left">
                      <h4 className="text-sm font-semibold text-red-400">Expired POST Certifications - {criticalViolations.expiredPost.count} Deputies</h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">Both removed from sworn duties, renewals in progress</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-red-500/20 border border-red-500/40 rounded text-xs text-red-400 font-bold">EXPIRED</span>
                    {expandedViolation.post ? <ChevronUp className="w-4 h-4 text-slate-600 dark:text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-600 dark:text-slate-400" />}
                  </div>
                </button>

                {expandedViolation.post && (
                  <div className="px-5 pb-5 border-t border-red-500/20">
                    <div className="space-y-3 mt-4">
                      {criticalViolations.expiredPost.deputies.map((deputy, idx) => (
                        <div key={idx} className="bg-red-500/5 border border-red-500/20 rounded-lg p-4">
                          <div className="flex items-start justify-between gap-4 flex-wrap">
                            <div>
                              <p className="text-sm font-medium text-slate-900 dark:text-white">{deputy.name} <span className="text-slate-600 dark:text-slate-400">({deputy.badge})</span></p>
                              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{deputy.certLevel} - Expired {deputy.expiredDate} ({deputy.daysExpired} days)</p>
                            </div>
                            <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs font-medium">{deputy.status}</span>
                          </div>
                          <div className="mt-3 flex items-center gap-2 text-xs">
                            <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                            <span className="text-slate-700 dark:text-slate-300">Renewal Training: {deputy.renewalTraining}</span>
                            {deputy.enrolled && <span className="px-1.5 py-0.5 bg-green-500/20 text-green-400 rounded text-[10px] font-medium">ENROLLED</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <button
                        onClick={() => navigate(createPageUrl('ComplianceManagement'))}
                        className="px-3 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 text-blue-400 rounded-lg text-xs font-medium transition-all flex items-center gap-2"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        View POST Compliance Details in HR Compliance Dashboard
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Overdue Firearms Qualifications */}
              <div className="mb-4 bg-slate-800/40 border border-red-500/30 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleViolation('firearms')}
                  className="w-full px-5 py-4 flex items-center justify-between hover:bg-slate-800/60 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Crosshair className="w-5 h-5 text-red-400" />
                    <div className="text-left">
                      <h4 className="text-sm font-semibold text-red-400">Overdue Firearms Qualifications - {criticalViolations.overdueFirearms.count} Officers ({criticalViolations.overdueFirearms.daysOverdue} Days Overdue)</h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">GCSO Policy 4.12 | Deadline: {criticalViolations.overdueFirearms.deadline} | Grace expired {criticalViolations.overdueFirearms.graceExpired}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-red-500/20 border border-red-500/40 rounded text-xs text-red-400 font-bold">OVERDUE</span>
                    {expandedViolation.firearms ? <ChevronUp className="w-4 h-4 text-slate-600 dark:text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-600 dark:text-slate-400" />}
                  </div>
                </button>

                {expandedViolation.firearms && (
                  <div className="px-5 pb-5 border-t border-red-500/20">
                    {/* Affected Personnel by Division */}
                    <div className="mt-4 space-y-4">
                      {criticalViolations.overdueFirearms.divisions.map((div, idx) => (
                        <div key={idx}>
                          <h5 className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">{div.name} ({div.count}):</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {div.officers.map((officer, oidx) => (
                              <div key={oidx} className="bg-slate-900/40 border border-slate-700/30 rounded-lg px-3 py-2 flex items-center justify-between">
                                <div>
                                  <p className="text-xs font-medium text-slate-900 dark:text-white">{officer.name} <span className="text-slate-500">{officer.badge}</span></p>
                                </div>
                                <p className="text-[10px] text-slate-500">Last qual: {officer.lastQual}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Firearms Qualification Requirements */}
                    <div className="mt-4 bg-slate-900/40 border border-slate-700/30 rounded-lg p-4">
                      <h5 className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">Firearms Qualification Requirements (GCSO Policy 4.12):</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-400">
                        <div><span className="text-slate-500">Course of Fire:</span> Georgia POST Firearms Qualification Course</div>
                        <div><span className="text-slate-500">Minimum Score:</span> 80% (240/300 points)</div>
                        <div><span className="text-slate-500">Weapons:</span> Primary duty weapon (Glock 17 Gen5, 9mm) + any secondary</div>
                        <div><span className="text-slate-500">Frequency:</span> Annual (by January 31 each calendar year)</div>
                      </div>
                    </div>

                    {/* Corrective Action Plan */}
                    <div className="mt-4">
                      <h5 className="text-xs font-semibold text-amber-400 mb-3 flex items-center gap-2">
                        <ClipboardCheck className="w-4 h-4" />
                        Corrective Action Plan
                      </h5>
                      <div className="space-y-2">
                        {criticalViolations.overdueFirearms.correctiveActions.map((action, idx) => (
                          <div key={idx} className="flex items-start gap-3 px-3 py-2 rounded-lg bg-slate-900/30">
                            {action.completed ? (
                              <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                            ) : (
                              <Circle className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
                            )}
                            <div className="flex-1">
                              <p className={`text-xs font-medium ${action.completed ? 'text-green-400' : 'text-slate-900 dark:text-white'}`}>
                                {action.action}
                              </p>
                              {action.details && (
                                <p className="text-[10px] text-slate-500 mt-1">{action.details}</p>
                              )}
                            </div>
                            <span className="text-[10px] text-slate-500">{action.date}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-slate-900/40 border border-slate-700/30 rounded-lg">
                      <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-slate-600 dark:text-slate-400">
                        <div><span className="text-slate-500">Responsible:</span> Training Division (Sgt. Martinez), Division Commanders</div>
                        <div><span className="text-slate-500">Deadline:</span> All qualifications complete by February 19, 2026</div>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <button className="px-3 py-2 bg-slate-700/40 hover:bg-slate-700/60 border border-slate-600/50 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-medium transition-all flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5" />
                        View Range Schedule
                      </button>
                      <button className="px-3 py-2 bg-slate-700/40 hover:bg-slate-700/60 border border-slate-600/50 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-medium transition-all flex items-center gap-2">
                        <Printer className="w-3.5 h-3.5" />
                        Print Attendance Roster
                      </button>
                      <button className="px-3 py-2 bg-slate-700/40 hover:bg-slate-700/60 border border-slate-600/50 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-medium transition-all flex items-center gap-2">
                        <FileText className="w-3.5 h-3.5" />
                        View Firearms Policy 4.12
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Expired TASER Certifications */}
              <div className="mb-4 bg-slate-800/40 border border-red-500/30 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleViolation('taser')}
                  className="w-full px-5 py-4 flex items-center justify-between hover:bg-slate-800/60 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-red-400" />
                    <div className="text-left">
                      <h4 className="text-sm font-semibold text-red-400">Expired TASER Certifications - {criticalViolations.expiredTaser.count} Deputies</h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">GCSO Policy 4.15 | Deputies cannot carry TASER without current certification</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-red-500/20 border border-red-500/40 rounded text-xs text-red-400 font-bold">EXPIRED</span>
                    {expandedViolation.taser ? <ChevronUp className="w-4 h-4 text-slate-600 dark:text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-600 dark:text-slate-400" />}
                  </div>
                </button>

                {expandedViolation.taser && (
                  <div className="px-5 pb-5 border-t border-red-500/20">
                    <div className="space-y-3 mt-4">
                      {criticalViolations.expiredTaser.deputies.map((deputy, idx) => (
                        <div key={idx} className="bg-red-500/5 border border-red-500/20 rounded-lg p-4">
                          <div className="flex items-start justify-between gap-4 flex-wrap mb-2">
                            <div>
                              <p className="text-sm font-medium text-slate-900 dark:text-white">{deputy.name} <span className="text-slate-600 dark:text-slate-400">({deputy.badge})</span></p>
                              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">{deputy.division}</p>
                            </div>
                            <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs font-medium">{deputy.daysOverdue} DAYS OVERDUE</span>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-400 mt-2">
                            <div><span className="text-slate-500">Last Certification:</span> {deputy.lastCert}</div>
                            <div><span className="text-slate-500">Expiration Date:</span> {deputy.expiredDate}</div>
                          </div>
                          <p className="text-xs text-red-400/80 mt-2">{deputy.taserStatus}</p>
                          <div className="mt-2 flex items-center gap-2 text-xs">
                            <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                            <span className="text-slate-700 dark:text-slate-300">Recertification class: {deputy.recertClass}</span>
                            {deputy.enrolled && <span className="px-1.5 py-0.5 bg-green-500/20 text-green-400 rounded text-[10px] font-medium">ENROLLED</span>}
                          </div>
                          {deputy.supervisorAction && (
                            <p className="text-[10px] text-slate-500 mt-1">Supervisor: {deputy.supervisorAction}</p>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Recertification Training Details */}
                    <div className="mt-4 bg-amber-500/5 border border-amber-500/20 rounded-lg p-4">
                      <h5 className="text-xs font-semibold text-amber-400 mb-3">Recertification Training Scheduled:</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-400">
                        <div><span className="text-slate-500">Date:</span> {criticalViolations.expiredTaser.recertTraining.date}</div>
                        <div><span className="text-slate-500">Location:</span> {criticalViolations.expiredTaser.recertTraining.location}</div>
                        <div><span className="text-slate-500">Instructor:</span> {criticalViolations.expiredTaser.recertTraining.instructor}</div>
                        <div><span className="text-slate-500">Attendees:</span> {criticalViolations.expiredTaser.recertTraining.attendees}</div>
                        <div className="col-span-1 md:col-span-2"><span className="text-slate-500">Course Content:</span> {criticalViolations.expiredTaser.recertTraining.content}</div>
                        <div className="col-span-1 md:col-span-2"><span className="text-slate-500">Certification:</span> {criticalViolations.expiredTaser.recertTraining.certification}</div>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-slate-900/40 border border-slate-700/30 rounded-lg text-xs text-slate-600 dark:text-slate-400">
                      <p className="font-medium text-slate-700 dark:text-slate-300 mb-1">Supervisor Accountability:</p>
                      <p>Supervisors responsible for ensuring deputies track certification expiration dates and schedule renewals. Deputy personnel files should include certification tracker with upcoming expiration dates flagged 60-90 days in advance.</p>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <button className="px-3 py-2 bg-slate-700/40 hover:bg-slate-700/60 border border-slate-600/50 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-medium transition-all flex items-center gap-2">
                        <FileText className="w-3.5 h-3.5" />
                        View TASER Policy 4.15
                      </button>
                      <button className="px-3 py-2 bg-slate-700/40 hover:bg-slate-700/60 border border-slate-600/50 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-medium transition-all flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5" />
                        Schedule Recertification
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* ======================== */}
            {/* TRAINING CATEGORIES      */}
            {/* ======================== */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Training & Certification Categories</h3>
              </div>

              {/* Category Filter Tabs */}
              <div className="mb-4 flex flex-wrap gap-2">
                {[
                  { id: 'all', label: 'All Categories' },
                  { id: 'post', label: 'POST Certification' },
                  { id: 'firearms', label: 'Firearms' },
                  { id: 'taser', label: 'TASER' },
                  { id: 'defensive-tactics', label: 'Defensive Tactics' },
                  { id: 'cpr', label: 'CPR/First Aid' },
                  { id: 'cjis', label: 'CJIS Security' }
                ].map(filter => (
                  <button
                    key={filter.id}
                    onClick={() => setActiveCategory(filter.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      activeCategory === filter.id
                        ? 'bg-amber-500 text-white'
                        : 'bg-slate-800/40 border border-slate-700/50 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>

              {/* Category Cards */}
              <div className="space-y-4">
                {trainingCategories
                  .filter(cat => activeCategory === 'all' || cat.id === activeCategory)
                  .map(category => {
                    const CategoryIcon = category.icon;
                    const isExpanded = expandedCategory[category.id];

                    return (
                      <div key={category.id} className={`bg-slate-800/40 border ${category.borderColor} rounded-xl overflow-hidden`}>
                        <button
                          onClick={() => toggleCategory(category.id)}
                          className="w-full px-5 py-4 flex items-center justify-between hover:bg-slate-800/60 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 ${category.bgColor} rounded-xl flex items-center justify-center`}>
                              <CategoryIcon className={`w-5 h-5 ${category.iconColor}`} />
                            </div>
                            <div className="text-left">
                              <h4 className="text-sm font-semibold text-slate-900 dark:text-white">{category.name}</h4>
                              <p className="text-xs text-slate-500 mt-0.5">{category.totalPersonnel} {category.personnelType}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                              <p className={`text-lg font-bold ${
                                category.stats.certifiedPct === '100%' ? 'text-green-400' :
                                parseFloat(category.stats.certifiedPct) >= 95 ? 'text-amber-400' :
                                'text-red-400'
                              }`}>{category.stats.certifiedPct}</p>
                              <p className="text-[10px] text-slate-500">{category.stats.certified}/{category.totalPersonnel} compliant</p>
                            </div>
                            {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-600 dark:text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-600 dark:text-slate-400" />}
                          </div>
                        </button>

                        {isExpanded && (
                          <div className="px-5 pb-5 border-t border-slate-700/30">
                            {/* Authority & Requirement */}
                            <div className="mt-4 p-3 bg-slate-900/40 border border-slate-700/30 rounded-lg">
                              <p className="text-[10px] text-slate-500 mb-1">Regulatory Authority: <span className="text-slate-600 dark:text-slate-400">{category.authority}</span></p>
                              <p className="text-xs text-slate-700 dark:text-slate-300 mt-1">{category.requirement}</p>
                            </div>

                            {/* Certification Status */}
                            <div className="mt-4">
                              <h5 className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-3">Certification Status:</h5>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-3">
                                  <div className="flex items-center gap-2 mb-2">
                                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                                    <span className="text-xs font-medium text-green-400">Currently Certified: {category.stats.certified} ({category.stats.certifiedPct})</span>
                                  </div>

                                  {/* POST-specific breakdown */}
                                  {category.stats.breakdown && (
                                    <div className="space-y-1 ml-6">
                                      {category.stats.breakdown.map((level, idx) => (
                                        <p key={idx} className="text-[10px] text-slate-600 dark:text-slate-400">{level.level}: {level.count} ({level.pct})</p>
                                      ))}
                                    </div>
                                  )}

                                  {/* Firearms-specific stats */}
                                  {category.stats.qualDates && (
                                    <div className="ml-6 space-y-1">
                                      <p className="text-[10px] text-slate-600 dark:text-slate-400">Qualified: {category.stats.qualDates}</p>
                                      <p className="text-[10px] text-slate-600 dark:text-slate-400">Average score: {category.stats.avgScore}</p>
                                      <p className="text-[10px] text-slate-600 dark:text-slate-400">Pass rate: {category.stats.passRate}</p>
                                    </div>
                                  )}

                                  {/* DT-specific stats */}
                                  {category.stats.dueThisQuarter && (
                                    <div className="ml-6 space-y-1">
                                      <p className="text-[10px] text-slate-600 dark:text-slate-400">Due this quarter: {category.stats.dueThisQuarter} deputies ({category.stats.dueNote})</p>
                                      <p className="text-[10px] text-slate-600 dark:text-slate-400">Sessions needed: {category.stats.sessionsNeeded}</p>
                                      <p className="text-[10px] text-slate-600 dark:text-slate-400">Instructor: {category.stats.instructor}</p>
                                    </div>
                                  )}

                                  {/* CJIS-specific */}
                                  {category.stats.nextAudit && (
                                    <p className="text-[10px] text-amber-400 ml-6 mt-1">{category.stats.nextAudit}</p>
                                  )}
                                </div>

                                <div>
                                  {/* Expired/Overdue */}
                                  {(category.stats.expired > 0 || category.stats.overdue > 0) && (
                                    <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-3 mb-3">
                                      <div className="flex items-center gap-2 mb-2">
                                        <AlertTriangle className="w-4 h-4 text-red-400" />
                                        <span className="text-xs font-medium text-red-400">
                                          {category.stats.expired ? `Expired: ${category.stats.expired} (${category.stats.expiredPct})` :
                                           category.stats.overdue ? `Overdue: ${category.stats.overdue} (${category.stats.overduePct})` : ''}
                                        </span>
                                      </div>
                                      {category.stats.expiredDeputies && (
                                        <div className="space-y-1 ml-6">
                                          {category.stats.expiredDeputies.map((dep, idx) => (
                                            <div key={idx} className="flex items-center gap-2">
                                              <p className="text-[10px] text-slate-600 dark:text-slate-400">{dep.name} ({dep.level}) - Expired {dep.expired}</p>
                                              {dep.renewalScheduled && <span className="px-1 py-0.5 bg-green-500/20 text-green-400 rounded text-[10px]">Renewal Scheduled</span>}
                                            </div>
                                          ))}
                                        </div>
                                      )}
                                      {category.stats.overdueNote && (
                                        <p className="text-[10px] text-slate-600 dark:text-slate-400 ml-6">{category.stats.overdueNote}</p>
                                      )}
                                      {category.stats.expiredNote && (
                                        <p className="text-[10px] text-slate-600 dark:text-slate-400 ml-6">{category.stats.expiredNote}</p>
                                      )}
                                    </div>
                                  )}

                                  {/* Not Required */}
                                  {category.stats.notRequired > 0 && (
                                    <div className="bg-slate-700/20 border border-slate-600/30 rounded-lg p-3 mb-3">
                                      <p className="text-xs text-slate-600 dark:text-slate-400">{category.stats.notRequired} {category.stats.notRequiredNote}</p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Upcoming Expirations */}
                            {category.upcoming && (
                              <div className="mt-4">
                                <h5 className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-3">Upcoming Expirations:</h5>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                  <div className="bg-amber-500/5 border border-amber-500/20 rounded-lg p-3">
                                    <div className="flex items-center gap-2 mb-2">
                                      <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                                      <span className="text-xs font-medium text-amber-400">Within 30 days: {category.upcoming.within30.count}</span>
                                    </div>
                                    {category.upcoming.within30.deputies && (
                                      <div className="space-y-2">
                                        {category.upcoming.within30.deputies.map((dep, idx) => (
                                          <div key={idx} className="text-[10px] text-slate-600 dark:text-slate-400">
                                            <p className="text-slate-700 dark:text-slate-300">{dep.name} <span className="text-slate-500">{dep.badge}</span></p>
                                            <p>{dep.level} expires {dep.expires} ({dep.daysLeft} days)</p>
                                            {dep.renewalScheduled ? (
                                              <p className="text-green-400">Renewal scheduled: {dep.renewalDate}</p>
                                            ) : (
                                              <p className="text-amber-400 font-medium">Need to schedule renewal</p>
                                            )}
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                    {category.upcoming.within30.note && (
                                      <p className="text-[10px] text-slate-600 dark:text-slate-400">{category.upcoming.within30.note}</p>
                                    )}
                                  </div>
                                  <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-3">
                                    <div className="flex items-center gap-2">
                                      <Clock className="w-3.5 h-3.5 text-blue-400" />
                                      <span className="text-xs font-medium text-blue-400">31-60 days: {category.upcoming.within60.count}</span>
                                    </div>
                                    <button className="mt-2 text-[10px] text-blue-400 hover:text-blue-300 underline">View Full List</button>
                                  </div>
                                  {category.upcoming.within90 && (
                                    <div className="bg-slate-700/20 border border-slate-600/30 rounded-lg p-3">
                                      <div className="flex items-center gap-2">
                                        <Clock className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
                                        <span className="text-xs font-medium text-slate-600 dark:text-slate-400">61-90 days: {category.upcoming.within90.count}</span>
                                      </div>
                                      <button className="mt-2 text-[10px] text-slate-600 dark:text-slate-400 hover:text-slate-700 dark:text-slate-300 underline">View Full List</button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}

                            {/* Weapon Breakdown (Firearms-specific) */}
                            {category.weaponBreakdown && (
                              <div className="mt-4">
                                <h5 className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-3">Qualification Breakdown by Weapon:</h5>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                  {category.weaponBreakdown.map((weapon, idx) => (
                                    <div key={idx} className="bg-slate-900/40 border border-slate-700/30 rounded-lg px-3 py-2">
                                      <p className="text-xs text-slate-700 dark:text-slate-300">{weapon.weapon}</p>
                                      <div className="flex items-center gap-2 mt-1">
                                        <span className="text-xs text-green-400 font-medium">{weapon.qualified} qualified</span>
                                        {weapon.pending && <span className="text-xs text-red-400">({weapon.pending} pending)</span>}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Specialized Qualifications (Firearms-specific) */}
                            {category.specializedQuals && (
                              <div className="mt-4">
                                <h5 className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-3">Specialized Firearms Qualifications:</h5>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                  {category.specializedQuals.map((spec, idx) => (
                                    <div key={idx} className="bg-slate-900/40 border border-slate-700/30 rounded-lg px-3 py-2">
                                      <p className="text-xs text-slate-700 dark:text-slate-300">{spec.type}</p>
                                      <p className="text-xs text-green-400 mt-1">{spec.count} certified - {spec.status}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Range Days (Firearms-specific) */}
                            {category.rangeDays && (
                              <div className="mt-4">
                                <h5 className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-3">Upcoming Range Days (2026 Schedule):</h5>
                                <div className="space-y-2">
                                  {category.rangeDays.map((day, idx) => (
                                    <div key={idx} className="flex items-center justify-between bg-slate-900/40 border border-slate-700/30 rounded-lg px-3 py-2">
                                      <div className="flex items-center gap-3">
                                        <Calendar className="w-3.5 h-3.5 text-slate-500" />
                                        <span className="text-xs text-slate-900 dark:text-white font-medium">{day.date}</span>
                                        <span className="text-xs text-slate-600 dark:text-slate-400">{day.purpose}</span>
                                      </div>
                                      <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                                        day.status === 'scheduled' ? 'bg-green-500/20 text-green-400' :
                                        day.status === 'tentative' ? 'bg-amber-500/20 text-amber-400' :
                                        'bg-blue-500/20 text-blue-400'
                                      }`}>{day.status}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Scheduled Sessions (DT-specific) */}
                            {category.scheduledSessions && (
                              <div className="mt-4">
                                <h5 className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-3">Scheduled Training Sessions:</h5>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                  {category.scheduledSessions.map((session, idx) => (
                                    <div key={idx} className="bg-slate-900/40 border border-slate-700/30 rounded-lg px-3 py-2">
                                      <div className="flex items-center justify-between">
                                        <p className="text-xs text-slate-900 dark:text-white font-medium">{session.date}</p>
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                                          session.status === 'Open' ? 'bg-green-500/20 text-green-400' : 'bg-amber-500/20 text-amber-400'
                                        }`}>{session.status}</span>
                                      </div>
                                      <p className="text-[10px] text-slate-600 dark:text-slate-400 mt-1">Enrolled: {session.enrolled}/{session.slots} slots</p>
                                      <div className="mt-1 w-full h-1 bg-slate-700/50 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(session.enrolled / session.slots) * 100}%` }} />
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Action Buttons */}
                            <div className="mt-4 flex flex-wrap gap-2">
                              <button className="px-3 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 text-blue-400 rounded-lg text-xs font-medium transition-all flex items-center gap-2">
                                <Eye className="w-3.5 h-3.5" />
                                View All Certifications
                              </button>
                              <button className="px-3 py-2 bg-slate-700/40 hover:bg-slate-700/60 border border-slate-600/50 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-medium transition-all flex items-center gap-2">
                                <Calendar className="w-3.5 h-3.5" />
                                Expiration Calendar
                              </button>
                              <button className="px-3 py-2 bg-slate-700/40 hover:bg-slate-700/60 border border-slate-600/50 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-medium transition-all flex items-center gap-2">
                                <Download className="w-3.5 h-3.5" />
                                Generate Report
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Support & Resources FAB */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setSupportOpen(!supportOpen)}
          className="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110"
        >
          {supportOpen ? <X className="w-6 h-6 text-slate-900 dark:text-white" /> : <HelpCircle className="w-6 h-6 text-slate-900 dark:text-white" />}
        </button>

        {supportOpen && (
          <div className="absolute bottom-16 right-0 w-80 bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-4 border-b border-slate-700/50">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Training Resources & Support</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">GCSO Training Division</p>
            </div>
            <div className="p-4 space-y-3">
              <div className="p-3 bg-slate-800/40 rounded-lg hover:bg-slate-800/60 cursor-pointer transition-colors">
                <p className="text-sm font-medium text-slate-900 dark:text-white">Training Coordinator</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">Sgt. R. Martinez (Training Division)</p>
                <p className="text-xs text-amber-400 mt-1">Ext. 4521</p>
              </div>
              <div className="p-3 bg-slate-800/40 rounded-lg hover:bg-slate-800/60 cursor-pointer transition-colors">
                <p className="text-sm font-medium text-slate-900 dark:text-white">Firearms Instructor</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">Sgt. R. Martinez (Lead), Deputy K. Chen (Asst.)</p>
                <p className="text-xs text-amber-400 mt-1">Range: Ext. 4530</p>
              </div>
              <div className="p-3 bg-slate-800/40 rounded-lg hover:bg-slate-800/60 cursor-pointer transition-colors">
                <p className="text-sm font-medium text-slate-900 dark:text-white">DT Instructor</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">Deputy M. Johnson</p>
                <p className="text-xs text-amber-400 mt-1">Ext. 4525</p>
              </div>
              <div className="p-3 bg-slate-800/40 rounded-lg hover:bg-slate-800/60 cursor-pointer transition-colors">
                <p className="text-sm font-medium text-slate-900 dark:text-white">GA POST Portal</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">Georgia POST Council - Certification Renewal</p>
              </div>
              <div className="p-3 bg-slate-800/40 rounded-lg hover:bg-slate-800/60 cursor-pointer transition-colors">
                <p className="text-sm font-medium text-slate-900 dark:text-white">GCSO Policies</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">Policy 4.12 (Firearms), 4.15 (TASER), 3.14 (DT)</p>
              </div>
              <div className="p-3 bg-slate-800/40 rounded-lg hover:bg-slate-800/60 cursor-pointer transition-colors">
                <p className="text-sm font-medium text-slate-900 dark:text-white">CJIS Security Policy</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">FBI CJIS Security Policy v5.9.3</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
