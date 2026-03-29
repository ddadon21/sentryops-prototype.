import React, { useState } from 'react';
import { Users, FileText, LayoutDashboard, TrendingUp, Settings, Bell, Search, ChevronRight, CheckCircle, Shield, X, Menu, ChevronLeft, LogOut, UserPlus, Briefcase, Clock, Award, Download, Calendar, Phone, Mail, FileCheck, BadgeCheck, AlertTriangle, AlertCircle, ClipboardCheck, GraduationCap, ChevronDown, ChevronUp, MapPin, Eye, CheckCircle2, Circle, ExternalLink, Upload, HelpCircle, Crosshair, Zap, Heart, Car, Printer, ShieldAlert, Sparkles, Activity, List, LayoutGrid, TrendingDown, ArrowUpRight, ArrowDownRight, BarChart3, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function EmployeeRecords() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState('employee-records');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCertStatus, setFilterCertStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedIssue, setExpandedIssue] = useState({ martinez: true, chen: true });
  const [supportOpen, setSupportOpen] = useState(false);
  const [viewMode, setViewMode] = useState('card');
  const [aiInsightsVisible, setAiInsightsVisible] = useState(true);

  const navigation = [
    { id: 'hr-dashboard', label: 'HR Dashboard', icon: Users, page: 'HRDashboard' },
    { id: 'job-postings', label: 'Job Postings', icon: Briefcase, page: 'JobPostings' },
    { id: 'applicant-tracking', label: 'Applicant Tracking', icon: UserPlus, page: 'ApplicantTracking' },
    { id: 'hiring-pipeline', label: 'Hiring Pipeline', icon: TrendingUp, page: 'HiringPipeline' },
    { id: 'compliance', label: 'HR Compliance', icon: ClipboardCheck, page: 'ComplianceManagement' },
    { id: 'onboarding', label: 'New Hire Onboarding', icon: FileCheck, page: 'NewHireOnboarding' },
    { id: 'training-certifications', label: 'Training & Certifications', icon: GraduationCap, page: 'TrainingCertifications' },
    { id: 'employee-records', label: 'Employee Records', icon: FileText },
    { id: 'time-off', label: 'Time Off Management', icon: Calendar, page: 'TimeOffManagement' },
    { id: 'performance', label: 'Performance Reviews', icon: Award, page: 'PerformanceReviews' },
    { id: 'hr-reports', label: 'HR Reports', icon: LayoutDashboard, page: 'HRReports' },
    { id: 'settings', label: 'Settings', icon: Settings, page: 'HRSettings' }
  ];

  const notifications = [
    { id: 1, title: 'Expired Firearms Qualification', message: 'Deputy R. Martinez (#D-2362) - 25 days overdue, desk duty assigned, range day Feb 12', time: '30 min ago', urgent: true },
    { id: 2, title: 'CIT Certification Expiring', message: 'Deputy M. Chen (#D-2345) - CIT expires Feb 27 (19 days), recertification NOT scheduled', time: '1 hour ago', urgent: true },
    { id: 3, title: '5 Performance Reviews Scheduled', message: 'Annual evaluations on track - Chen (Feb 15), Williams (Mar 20), Taylor (Mar 5)', time: '3 hours ago', urgent: false },
    { id: 4, title: 'Medical Leave Return', message: 'Officer M. Davis (#DET-0098) - Expected return February 17, 2026', time: '4 hours ago', urgent: false }
  ];

  const [employees] = useState([
    {
      id: 1,
      name: 'Marcus Chen',
      badge: 'D-2345',
      position: 'Deputy Sheriff',
      positionType: 'sworn',
      department: 'Patrol Division',
      shift: 'C-Shift (18:00-06:00)',
      assignment: 'Patrol, Zone 3-Charlie',
      status: 'active',
      dutyStatus: 'Full Duty',
      hireDate: 'March 14, 2018',
      yearsOfService: '7 years, 11 months',
      email: 'marcus.chen@gwinnettsso.gov',
      phone: '(555) 234-5678',
      supervisor: 'Sgt. Anderson (C-Shift Commander)',
      takeHomeVehicle: 'Unit 347 (2023 Ford Explorer)',
      postCert: {
        type: 'Georgia POST Basic Law Enforcement',
        number: '#GA-48729',
        issued: 'June 15, 2018',
        expires: 'June 15, 2026',
        daysRemaining: 128,
        status: 'current'
      },
      certifications: [
        { name: 'Firearms Qualification (Annual - GCSO Policy 4.12)', lastDate: 'January 22, 2026', score: '282/300 (94.0%, PASS)', nextDue: 'January 31, 2027', status: 'current', daysRemaining: 357 },
        { name: 'TASER Certification (Axon X26P - 2-year)', lastDate: 'March 15, 2024', certNumber: 'TASER-2024-3847', expires: 'March 15, 2026', status: 'current', daysRemaining: 35, note: 'Renewal due within 60 days' },
        { name: 'Defensive Tactics (Annual recertification)', lastDate: 'November 10, 2025', nextDue: 'November 30, 2026', status: 'current', daysRemaining: 295 },
        { name: 'Crisis Intervention Training (CIT) - 40 hours', lastDate: 'February 27, 2024', certNumber: 'CIT-2024-1287', expires: 'February 27, 2026', status: 'expiring', daysRemaining: 19, note: 'EXPIRING SOON - Renewal not scheduled', urgent: true }
      ],
      performance: {
        lastEvaluation: 'January 15, 2026',
        evaluator: 'Sgt. Anderson (C-Shift Commander)',
        rating: 'Meets Expectations',
        reviewPeriod: 'January 2025 - January 2026',
        nextDue: 'January 2027',
        onFile: true
      },
      disciplinary: {
        status: 'clean',
        note: 'No disciplinary actions on record'
      },
      personnelSummary: {
        positionChanges: 'None (Deputy Sheriff since hire)',
        commendations: [
          'Excellent Duty Performance, 2022',
          'Community Service Recognition, 2024'
        ],
        specializedTraining: ['CIT', 'Field Training Officer (FTO) 2021']
      },
      certAlert: 'expiring'
    },
    {
      id: 2,
      name: 'Sarah Williams',
      badge: 'D-1987',
      position: 'Sergeant',
      positionType: 'sworn',
      department: 'Patrol Division',
      shift: 'A-Shift (06:00-18:00)',
      assignment: 'Patrol Supervisor, A-Shift',
      status: 'active',
      dutyStatus: 'Full Duty',
      hireDate: 'June 20, 2015',
      yearsOfService: '10 years, 8 months',
      email: 'sarah.williams@gwinnettsso.gov',
      phone: '(555) 345-6789',
      supervisor: 'Lt. R. Davis (Patrol Division Commander)',
      takeHomeVehicle: 'Unit 301 (2024 Ford Explorer, marked)',
      postCert: {
        type: 'Georgia POST Intermediate Law Enforcement',
        number: '#GA-31458',
        issued: 'August 10, 2015',
        expires: 'December 31, 2027',
        daysRemaining: 692,
        status: 'current'
      },
      certifications: [
        { name: 'Firearms Qualification (Annual - GCSO Policy 4.12)', lastDate: 'January 18, 2026', score: '291/300 (97.0%, PASS)', nextDue: 'January 31, 2027', status: 'current', daysRemaining: 357 },
        { name: 'TASER Certification (Axon X26P - 2-year)', lastDate: 'September 15, 2025', certNumber: 'TASER-2025-1928', expires: 'September 15, 2027', status: 'current', daysRemaining: 584 },
        { name: 'Defensive Tactics (Annual recertification)', lastDate: 'October 5, 2025', nextDue: 'October 31, 2026', status: 'current', daysRemaining: 264 },
        { name: 'Supervisor Training (POST-required)', lastDate: 'November 30, 2024', certNumber: 'SUP-2024-0892', expires: 'November 30, 2026', status: 'current', daysRemaining: 295 }
      ],
      performance: {
        lastEvaluation: 'September 20, 2025',
        evaluator: 'Lt. R. Davis (Patrol Division Commander)',
        rating: 'Exceeds Expectations',
        reviewPeriod: 'September 2024 - September 2025',
        nextDue: 'March 20, 2026',
        onFile: true
      },
      disciplinary: {
        status: 'clean',
        note: 'No disciplinary actions on record'
      },
      personnelSummary: {
        positionChanges: 'Promoted to Sergeant: January 2022 (from Deputy Sheriff)',
        commendations: [
          'Supervisor of the Quarter, Q3 2024',
          'Meritorious Service Award, 2023',
          'Unit Citation - DUI Enforcement, 2021'
        ],
        specializedTraining: ['FTO Coordinator', 'Supervisor Development Program', 'SWAT Negotiator (former)']
      },
      certAlert: null
    },
    {
      id: 3,
      name: 'Robert Martinez',
      badge: 'D-2362',
      position: 'Deputy Sheriff',
      positionType: 'sworn',
      department: 'Patrol Division',
      shift: 'B-Shift (14:00-02:00)',
      assignment: 'Patrol, Zone 2-Bravo (TEMP: Desk duty)',
      status: 'active',
      dutyStatus: 'Desk Duty (restricted - no field patrol)',
      dutyRestriction: 'Firearms qualification expired - duty weapon removed, assigned administrative tasks until qualified',
      hireDate: 'January 10, 2020',
      yearsOfService: '6 years, 1 month',
      email: 'robert.martinez@gwinnettsso.gov',
      phone: '(555) 456-7890',
      supervisor: 'Sgt. R. Williams (B-Shift Commander)',
      takeHomeVehicle: 'Unit 322 (2022 Ford Explorer, marked) - PARKED, not authorized for patrol',
      postCert: {
        type: 'Georgia POST Basic Law Enforcement',
        number: '#GA-52891',
        issued: 'March 15, 2020',
        expires: 'January 10, 2028',
        daysRemaining: 702,
        status: 'current'
      },
      certifications: [
        { name: 'Firearms Qualification (Annual - GCSO Policy 4.12)', lastDate: 'January 14, 2025', score: '268/300 (89.3%, PASS)', nextDue: 'January 31, 2026 (PASSED)', status: 'expired', daysOverdue: 8, note: 'EXPIRED - Duty weapon removed, desk duty assigned. Range day Feb 12, 2026', urgent: true },
        { name: 'TASER Certification (Axon X26P - 2-year)', lastDate: 'June 10, 2024', certNumber: 'TASER-2024-5129', expires: 'June 10, 2026', status: 'current', daysRemaining: 122 },
        { name: 'Defensive Tactics (Annual recertification)', lastDate: 'April 15, 2025', nextDue: 'April 30, 2026', status: 'current', daysRemaining: 81 },
        { name: 'CPR/First Aid (2-year)', lastDate: 'July 20, 2024', certNumber: 'CPR-2024-8847', expires: 'July 20, 2026', status: 'current', daysRemaining: 162 }
      ],
      performance: {
        lastEvaluation: 'July 10, 2025',
        evaluator: 'Sgt. R. Williams (B-Shift Commander)',
        rating: 'Meets Expectations',
        reviewPeriod: 'July 2024 - July 2025',
        nextDue: 'January 10, 2026 (overdue - pending firearms resolution)',
        onFile: true
      },
      disciplinary: {
        status: 'pending',
        note: 'Written counseling pending for missing annual firearms qualification deadline (25 days overdue)',
        actions: [
          { type: 'Written Counseling (Pending)', date: 'February 2026', reason: 'Failure to meet annual firearms qualification deadline per GCSO Policy 4.12', status: 'pending' }
        ]
      },
      personnelSummary: {
        positionChanges: 'None (Deputy Sheriff since hire)',
        commendations: [
          'Life-Saving Award, 2023 (narcan administration)'
        ],
        specializedTraining: ['None']
      },
      certAlert: 'expired'
    },
    {
      id: 4,
      name: 'Jennifer Taylor',
      badge: 'ADM-0145',
      position: 'Administrative Specialist',
      positionType: 'civilian',
      department: 'Administrative Services',
      shift: 'Day Shift (08:00-17:00)',
      assignment: 'HR Records Management',
      status: 'active',
      dutyStatus: 'Full Duty',
      hireDate: 'September 5, 2019',
      yearsOfService: '6 years, 5 months',
      email: 'jennifer.taylor@gwinnettsso.gov',
      phone: '(555) 567-8901',
      supervisor: 'HR Director',
      takeHomeVehicle: null,
      postCert: null,
      certifications: [
        { name: 'CJIS Security Training (Annual - FBI requirement)', lastDate: 'September 5, 2025', certNumber: 'CJIS-2025-4521', expires: 'September 5, 2026', status: 'current', daysRemaining: 209 },
        { name: 'Records Management Certification', lastDate: 'November 15, 2024', certNumber: 'RMC-2024-0089', expires: 'November 15, 2026', status: 'current', daysRemaining: 280 }
      ],
      performance: {
        lastEvaluation: 'September 5, 2025',
        evaluator: 'HR Director',
        rating: 'Exceeds Expectations',
        reviewPeriod: 'September 2024 - September 2025',
        nextDue: 'March 5, 2026',
        onFile: true
      },
      disciplinary: {
        status: 'clean',
        note: 'No disciplinary actions on record'
      },
      personnelSummary: {
        positionChanges: 'Promoted from Records Clerk to Administrative Specialist: January 2023',
        commendations: [
          'Employee of the Quarter, Q2 2024'
        ],
        specializedTraining: ['GCIC/NCIC Operator Certification', 'Open Records Act Training']
      },
      certAlert: null
    },
    {
      id: 5,
      name: 'Amanda Garcia',
      badge: 'BI-0032',
      position: 'Background Investigator',
      positionType: 'civilian',
      department: 'Human Resources - Background Investigations',
      shift: 'Day Shift (08:00-17:00)',
      assignment: 'Background Investigations Unit',
      status: 'active',
      dutyStatus: 'Full Duty',
      hireDate: 'November 1, 2021',
      yearsOfService: '4 years, 3 months',
      email: 'amanda.garcia@gwinnettsso.gov',
      phone: '(555) 678-9012',
      supervisor: 'Lt. K. Hayes (BI Unit Commander)',
      takeHomeVehicle: null,
      postCert: null,
      certifications: [
        { name: 'CJIS Security Training (Annual - FBI requirement)', lastDate: 'November 1, 2025', certNumber: 'CJIS-2025-7812', expires: 'November 1, 2026', status: 'current', daysRemaining: 265 },
        { name: 'Interview & Interrogation Techniques', lastDate: 'June 15, 2025', certNumber: 'INT-2025-0341', expires: 'June 15, 2027', status: 'current', daysRemaining: 492 },
        { name: 'Background Investigation Procedures (GCSO)', lastDate: 'December 30, 2024', certNumber: 'BI-2024-0032', expires: 'December 30, 2026', status: 'current', daysRemaining: 325 }
      ],
      performance: {
        lastEvaluation: 'November 1, 2025',
        evaluator: 'Lt. K. Hayes (BI Unit Commander)',
        rating: 'Exceeds Expectations',
        reviewPeriod: 'November 2024 - November 2025',
        nextDue: 'May 1, 2026',
        onFile: true
      },
      disciplinary: {
        status: 'clean',
        note: 'No disciplinary actions on record'
      },
      personnelSummary: {
        positionChanges: 'None (Background Investigator since hire)',
        commendations: [
          'Thoroughness Award - BI Unit, 2024'
        ],
        specializedTraining: ['GCIC/NCIC Operator Certification', 'Social Media Investigations', 'Financial Background Analysis']
      },
      certAlert: null
    },
    {
      id: 6,
      name: 'Michael Davis',
      badge: 'DET-0098',
      position: 'Detention Officer',
      positionType: 'sworn',
      department: 'Detention Center',
      shift: 'B-Shift (18:00-06:00)',
      assignment: 'Detention Housing Unit 3 (currently on leave)',
      status: 'on-leave',
      dutyStatus: 'Medical Leave (FMLA)',
      leaveDetails: {
        type: 'FMLA Medical Leave',
        startDate: 'January 20, 2026',
        anticipatedReturn: 'February 17, 2026',
        reason: 'Knee surgery (work-related injury - incident report #IR-2026-0089)',
        coveringOfficer: 'Officer R. Brown (temporary assignment from B-Shift)',
        returnRequirements: 'Medical clearance from physician, light duty evaluation by supervisor'
      },
      hireDate: 'April 20, 2017',
      yearsOfService: '8 years, 10 months',
      email: 'michael.davis@gwinnettsso.gov',
      phone: '(555) 789-0123',
      supervisor: 'Sgt. L. Williams (Detention B-Shift)',
      takeHomeVehicle: null,
      postCert: {
        type: 'Georgia POST Corrections Certification',
        number: '#GA-COR-28491',
        issued: 'June 15, 2017',
        expires: 'April 20, 2027',
        daysRemaining: 436,
        status: 'current'
      },
      certifications: [
        { name: 'Corrections Certification (POST)', lastDate: 'April 20, 2024', certNumber: 'COR-2024-8901', expires: 'April 20, 2027', status: 'current', daysRemaining: 436 },
        { name: 'CPR/First Aid (2-year)', lastDate: 'August 10, 2024', certNumber: 'CPR-2024-9932', expires: 'August 10, 2026', status: 'current', daysRemaining: 183 },
        { name: 'Crisis Intervention Training (Corrections)', lastDate: 'October 15, 2024', certNumber: 'CIT-COR-2024-0198', expires: 'October 15, 2026', status: 'current', daysRemaining: 249 }
      ],
      performance: {
        lastEvaluation: 'April 20, 2025',
        evaluator: 'Sgt. L. Williams (Detention B-Shift)',
        rating: 'Meets Expectations',
        reviewPeriod: 'April 2024 - April 2025',
        nextDue: 'October 20, 2025 (overdue - deferred due to medical leave)',
        onFile: true
      },
      disciplinary: {
        status: 'clean',
        note: 'No disciplinary actions on record'
      },
      personnelSummary: {
        positionChanges: 'None (Detention Officer since hire)',
        commendations: [
          'Detention Officer of the Year, 2022',
          'Life-Saving Award, 2023 (inmate medical emergency response)'
        ],
        specializedTraining: ['Crisis Intervention Training (Corrections)', 'Defensive Tactics Instructor (Detention)']
      },
      certAlert: null
    }
  ]);

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

  const toggleIssue = (key) => {
    setExpandedIssue(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const getStatusConfig = (status) => {
    const configs = {
      'active': { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30', label: 'ACTIVE' },
      'on-leave': { bg: 'bg-amber-500/20', text: 'text-amber-400', border: 'border-amber-500/30', label: 'ON LEAVE' },
      'suspended': { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30', label: 'SUSPENDED' },
      'separated': { bg: 'bg-slate-500/20', text: 'text-slate-500', border: 'border-slate-500/30', label: 'SEPARATED' }
    };
    return configs[status] || configs.active;
  };

  const getCertStatusConfig = (status) => {
    if (status === 'expired') return { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30', label: 'EXPIRED' };
    if (status === 'expiring') return { bg: 'bg-amber-500/20', text: 'text-amber-400', border: 'border-amber-500/30', label: 'EXPIRING' };
    return { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30', label: 'CURRENT' };
  };

  const filteredEmployees = employees.filter(emp => {
    const deptMatch = filterDepartment === 'all' || emp.department.includes(filterDepartment);
    const statusMatch = filterStatus === 'all' || emp.status === filterStatus;
    const certMatch = filterCertStatus === 'all' ||
      (filterCertStatus === 'expired' && emp.certAlert === 'expired') ||
      (filterCertStatus === 'expiring' && emp.certAlert === 'expiring') ||
      (filterCertStatus === 'compliant' && !emp.certAlert);
    const searchMatch = searchQuery === '' ||
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.badge.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchQuery.toLowerCase());
    return deptMatch && statusMatch && certMatch && searchMatch;
  });

  const personnelStats = {
    total: 178,
    sworn: 164,
    civilian: 14,
    active: 174,
    onLeave: 3,
    suspended: 1,
    showing: filteredEmployees.length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex">
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 border-r border-slate-800/50 backdrop-blur-xl bg-slate-900/30 flex flex-col transform transition-all lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} ${sidebarCollapsed ? 'w-20' : 'w-64'}`}>
        <div className="p-4 border-b border-slate-200 dark:border-slate-700/50 flex items-center justify-between">
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

        <div className="border-t border-slate-200 dark:border-slate-700/50">
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
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {logoutConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setLogoutConfirmOpen(false)} />
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
              <button onClick={() => setLogoutConfirmOpen(false)} className="flex-1 px-4 py-2.5 bg-slate-800/40 hover:bg-slate-800/60 border border-slate-700/50 rounded-xl text-slate-900 dark:text-white font-medium transition-all">Cancel</button>
              <button onClick={handleLogout} className="flex-1 px-4 py-2.5 bg-slate-700/40 hover:bg-slate-700/60 border border-slate-600/50 rounded-xl text-slate-900 dark:text-white font-medium transition-all">Sign Out</button>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="border-b border-slate-200 dark:border-slate-800/50 backdrop-blur-xl bg-slate-900/30">
          <div className="px-4 lg:px-6 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 hover:bg-slate-800/50 rounded-lg">
                <Menu className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              </button>
              <div className="flex items-center gap-2 text-sm">
                <button onClick={() => navigate(createPageUrl('HRDashboard'))} className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:text-white transition-colors">HR Dashboard</button>
                <ChevronRight className="w-4 h-4 text-slate-600" />
                <span className="text-slate-900 dark:text-white">Employee Records</span>
              </div>
            </div>
            <div className="flex items-center gap-2 lg:gap-3">
              <button className="flex items-center gap-2 px-3 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-sm font-medium transition-all">
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export Roster</span>
              </button>
              <button className="hidden md:flex items-center gap-2 px-3 py-2 bg-slate-800/40 hover:bg-slate-800/60 border border-slate-700/50 text-slate-700 dark:text-slate-300 rounded-xl text-sm transition-all">
                <ClipboardCheck className="w-4 h-4" />
                <span>Audit Report</span>
              </button>
              <button onClick={() => navigate(createPageUrl('NewHireOnboarding'))} className="hidden lg:flex items-center gap-2 px-3 py-2 bg-slate-800/40 hover:bg-slate-800/60 border border-slate-700/50 text-slate-700 dark:text-slate-300 rounded-xl text-sm transition-all">
                <UserPlus className="w-4 h-4" />
                <span>Add Employee</span>
              </button>

              <div className="relative">
                <button onClick={() => setNotificationsOpen(!notificationsOpen)} className="p-2 hover:bg-slate-800/50 rounded-lg relative">
                  <Bell className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                {notificationsOpen && (
                  <div className="absolute right-0 top-full mt-2 w-96 bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-xl shadow-2xl z-50">
                    <div className="p-4 border-b border-slate-200 dark:border-slate-700/50">
                      <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Personnel Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map(notification => (
                        <div key={notification.id} className={`p-4 border-b border-slate-200 dark:border-slate-800/30 hover:bg-slate-100 dark:hover:bg-slate-800/30 cursor-pointer transition-colors ${notification.urgent ? 'bg-amber-500/5' : ''}`}>
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
                  <p className="text-sm font-medium text-slate-900 dark:text-white">HR Director</p>
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
              <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mb-2">Personnel Records & Employee Information</h2>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-600 dark:text-slate-400">
                <span>Gwinnett County Sheriff's Office</span>
                <span className="text-slate-600">•</span>
                <span>Lawrenceville, Georgia</span>
                <span className="text-slate-600">•</span>
                <span>Sunday, February 08, 2026 • 5:37 PM EST</span>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 mt-1">
                <span>Sheriff: Keybo Taylor</span>
                <span className="text-slate-600">|</span>
                <span>Records Custodian: HR Specialist J. Martinez</span>
                <span className="text-slate-600">|</span>
                <span>Total Personnel: {personnelStats.total} ({personnelStats.sworn} sworn, {personnelStats.civilian} civilian)</span>
                <span className="text-slate-600">|</span>
                <span>Active: {personnelStats.active} | On Leave: {personnelStats.onLeave} | Suspended: {personnelStats.suspended}</span>
              </div>
            </div>

            {/* Critical Alerts Banner */}
            <div className="mb-6 space-y-3">
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-red-400 mb-1">Deputy R. Martinez (#D-2362): Expired Firearms Qualification - 25 Days Overdue</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Duty weapon removed, desk duty assigned. Range day scheduled February 12, 2026. Written counseling pending.</p>
                  </div>
                  <span className="px-2 py-1 bg-red-500/20 border border-red-500/40 text-red-400 rounded-lg text-xs font-bold whitespace-nowrap">CRITICAL</span>
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-amber-400 mb-1">Deputy M. Chen (#D-2345): CIT Certification Expires in 19 Days - Renewal NOT Scheduled</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">CIT expires Feb 27, next recert class not until Mar 10. Urgent: research external courses or plan coverage gap.</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-blue-400 mb-1">5 Performance Reviews Scheduled - All On Track</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Chen (Feb 15), Williams (Mar 20), Taylor (Mar 5), Garcia (May 1), Davis (deferred - medical leave)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Personnel Summary Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
              <div className="bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-sm dark:shadow-none p-4">
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Total Personnel</p>
                <p className="text-xl font-bold text-slate-900 dark:text-white">{personnelStats.total}</p>
                <p className="text-[10px] text-slate-500">{personnelStats.sworn} sworn / {personnelStats.civilian} civilian</p>
              </div>
              <div className="bg-slate-800/40 border border-green-500/30 rounded-xl p-4">
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Active Duty</p>
                <p className="text-xl font-bold text-green-400">{personnelStats.active}</p>
                <p className="text-[10px] text-slate-500">Full duty personnel</p>
              </div>
              <div className="bg-slate-800/40 border border-amber-500/30 rounded-xl p-4">
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">On Leave</p>
                <p className="text-xl font-bold text-amber-400">{personnelStats.onLeave}</p>
                <p className="text-[10px] text-slate-500">FMLA / Medical / Military</p>
              </div>
              <div className="bg-slate-800/40 border border-red-500/30 rounded-xl p-4">
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Suspended</p>
                <p className="text-xl font-bold text-red-400">{personnelStats.suspended}</p>
                <p className="text-[10px] text-slate-500">Pending investigation</p>
              </div>
              <div className="bg-slate-800/40 border border-red-500/30 rounded-xl p-4">
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Cert Issues</p>
                <p className="text-xl font-bold text-red-400">1</p>
                <p className="text-[10px] text-slate-500">Expired certification</p>
              </div>
              <div className="bg-slate-800/40 border border-amber-500/30 rounded-xl p-4">
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Expiring Soon</p>
                <p className="text-xl font-bold text-amber-400">1</p>
                <p className="text-[10px] text-slate-500">Within 30 days</p>
              </div>
            </div>

            {/* Critical Personnel Issues */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Critical Personnel Issues</h3>
                <span className="px-2 py-1 bg-red-500/20 border border-red-500/30 rounded text-xs text-red-400 font-bold">IMMEDIATE ATTENTION</span>
              </div>

              {/* Martinez - Expired Firearms */}
              <div className="mb-4 bg-slate-800/40 border border-red-500/30 rounded-xl overflow-hidden">
                <button onClick={() => toggleIssue('martinez')} className="w-full px-5 py-4 flex items-center justify-between hover:bg-slate-800/60 transition-colors">
                  <div className="flex items-center gap-3">
                    <Crosshair className="w-5 h-5 text-red-400" />
                    <div className="text-left">
                      <h4 className="text-sm font-semibold text-red-400">Deputy Robert Martinez - Expired Firearms Qualification</h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">Badge #D-2362 | Patrol Division | B-Shift (14:00-02:00) | 25 days overdue</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-red-500/20 border border-red-500/40 rounded text-xs text-red-400 font-bold">EXPIRED</span>
                    {expandedIssue.martinez ? <ChevronUp className="w-4 h-4 text-slate-600 dark:text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-600 dark:text-slate-400" />}
                  </div>
                </button>

                {expandedIssue.martinez && (
                  <div className="px-5 pb-5 border-t border-red-500/20">
                    <div className="mt-4 bg-red-500/5 border border-red-500/20 rounded-lg p-4">
                      <h5 className="text-xs font-semibold text-red-400 mb-3">Compliance Violation:</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-400">
                        <div><span className="text-slate-500">Certification:</span> Annual Firearms Qualification (GCSO Policy 4.12)</div>
                        <div><span className="text-slate-500">Last Qualification:</span> January 14, 2025</div>
                        <div><span className="text-slate-500">Deadline:</span> January 31, 2026 (annual requirement)</div>
                        <div><span className="text-slate-500">Days Overdue:</span> <span className="text-red-400 font-bold">25 DAYS</span> (as of February 08, 2026)</div>
                      </div>
                    </div>

                    <div className="mt-4 bg-amber-500/5 border border-amber-500/20 rounded-lg p-4">
                      <h5 className="text-xs font-semibold text-amber-400 mb-2">Operational Impact:</h5>
                      <p className="text-xs text-slate-600 dark:text-slate-400">Deputy Martinez CANNOT carry firearm without current annual qualification per GCSO Policy 4.12 and Georgia POST standards.</p>
                    </div>

                    <div className="mt-4">
                      <h5 className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-3">Current Status:</h5>
                      <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                        <div className="flex items-start gap-2">
                          <AlertCircle className="w-3.5 h-3.5 text-red-400 mt-0.5 flex-shrink-0" />
                          <span>Duty weapon (Glock 17 #GC2362) removed from duty belt and secured in armory as of 02/06/2026</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <AlertCircle className="w-3.5 h-3.5 text-amber-400 mt-0.5 flex-shrink-0" />
                          <span>Temporarily assigned to desk duties (report review, administrative tasks) - NO field patrol until qualified</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 mt-0.5 flex-shrink-0" />
                          <span>Supervisor: Sgt. R. Williams (B-Shift Commander) - notified 02/06/2026</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <h5 className="text-xs font-semibold text-amber-400 mb-3 flex items-center gap-2">
                        <ClipboardCheck className="w-4 h-4" />
                        Corrective Action Plan
                      </h5>
                      <div className="space-y-2">
                        {[
                          { action: 'Deputy Martinez notified of overdue status', date: '02/06/2026', completed: true },
                          { action: 'Duty weapon removed, secured in armory', date: '02/06/2026', completed: true },
                          { action: 'Temporary desk duty assignment', date: '02/06/2026', completed: true },
                          { action: 'Enrolled in firearms qualification range day', date: '02/12/2026', completed: true, details: 'Time: 08:00-12:00 | Location: GCSO Training Center Range | Instructor: Sgt. R. Martinez' },
                          { action: 'Attend range day and qualify (240+/300 points to pass)', date: '02/12/2026', completed: false },
                          { action: 'If passes: Return to full patrol, duty weapon reissued', date: '02/12/2026', completed: false },
                          { action: 'If fails: Remedial training + requalify Feb 19 make-up', date: '02/19/2026', completed: false },
                          { action: 'Supervisor counseling: Document failure to meet deadline', date: '02/2026', completed: false }
                        ].map((action, idx) => (
                          <div key={idx} className="flex items-start gap-3 px-3 py-2 rounded-lg bg-slate-900/30">
                            {action.completed ? <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" /> : <Circle className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />}
                            <div className="flex-1">
                              <p className={`text-xs font-medium ${action.completed ? 'text-green-400' : 'text-slate-900 dark:text-white'}`}>{action.action}</p>
                              {action.details && <p className="text-[10px] text-slate-500 mt-1">{action.details}</p>}
                            </div>
                            <span className="text-[10px] text-slate-500">{action.date}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 bg-slate-900/40 border border-slate-700/30 rounded-lg p-3">
                      <h5 className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">Disciplinary Action (Pending):</h5>
                      <p className="text-xs text-slate-600 dark:text-slate-400">Written counseling for missing annual qualification deadline (25 days overdue indicates lack of personal responsibility for tracking certification requirements). Documentation in personnel file per GCSO disciplinary policy.</p>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <button className="px-3 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 text-blue-400 rounded-lg text-xs font-medium transition-all flex items-center gap-2">
                        <Eye className="w-3.5 h-3.5" />View Full Personnel Record
                      </button>
                      <button className="px-3 py-2 bg-slate-700/40 hover:bg-slate-700/60 border border-slate-600/50 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-medium transition-all flex items-center gap-2">
                        <Crosshair className="w-3.5 h-3.5" />View Firearms History
                      </button>
                      <button className="px-3 py-2 bg-slate-700/40 hover:bg-slate-700/60 border border-slate-600/50 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-medium transition-all flex items-center gap-2">
                        <FileText className="w-3.5 h-3.5" />Document Counseling
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Chen - CIT Expiring */}
              <div className="mb-4 bg-slate-800/40 border border-amber-500/30 rounded-xl overflow-hidden">
                <button onClick={() => toggleIssue('chen')} className="w-full px-5 py-4 flex items-center justify-between hover:bg-slate-800/60 transition-colors">
                  <div className="flex items-center gap-3">
                    <ShieldAlert className="w-5 h-5 text-amber-400" />
                    <div className="text-left">
                      <h4 className="text-sm font-semibold text-amber-400">Deputy Marcus Chen - CIT Certification Expiring (19 Days)</h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">Badge #D-2345 | Patrol Division | C-Shift (18:00-06:00) | Recertification NOT scheduled</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-amber-500/20 border border-amber-500/40 rounded text-xs text-amber-400 font-bold">EXPIRING</span>
                    {expandedIssue.chen ? <ChevronUp className="w-4 h-4 text-slate-600 dark:text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-600 dark:text-slate-400" />}
                  </div>
                </button>

                {expandedIssue.chen && (
                  <div className="px-5 pb-5 border-t border-amber-500/20">
                    <div className="mt-4 bg-amber-500/5 border border-amber-500/20 rounded-lg p-4">
                      <h5 className="text-xs font-semibold text-amber-400 mb-3">Certification Expiring Soon:</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-400">
                        <div><span className="text-slate-500">Certification:</span> Crisis Intervention Training (CIT) - 40 hours</div>
                        <div><span className="text-slate-500">Initial Certification:</span> February 27, 2024</div>
                        <div><span className="text-slate-500">Certificate Number:</span> CIT-2024-1287</div>
                        <div><span className="text-slate-500">Expiration Date:</span> <span className="text-amber-400 font-bold">February 27, 2026 (19 DAYS)</span></div>
                        <div><span className="text-slate-500">Instructor:</span> Dr. S. Martinez, PsyD (GCSO Training Center)</div>
                        <div><span className="text-slate-500">Certification Cycle:</span> 2-year recertification required</div>
                      </div>
                    </div>

                    <div className="mt-4 bg-blue-500/5 border border-blue-500/20 rounded-lg p-4">
                      <h5 className="text-xs font-semibold text-blue-400 mb-2">Operational Impact:</h5>
                      <div className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
                        <p>CIT certification allows Deputy Chen to serve as primary responder for mental health crisis calls (specialized training in de-escalation, mental health assessment, crisis resources).</p>
                        <p className="mt-2">GCSO maintains roster of 47 CIT-certified deputies (28% of patrol force). If certification lapses, Deputy Chen removed from CIT roster until recertified.</p>
                      </div>
                    </div>

                    <div className="mt-4 bg-red-500/5 border border-red-500/20 rounded-lg p-4">
                      <h5 className="text-xs font-semibold text-red-400 mb-2">Renewal Status: RECERTIFICATION NOT SCHEDULED</h5>
                      <div className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
                        <p>CIT recertification requires 40-hour course (same as initial certification).</p>
                        <p>Next available GCSO CIT recertification class: <span className="text-amber-400">March 10-14, 2026</span> (AFTER expiration date).</p>
                        <p>Previous CIT class: January 13-17, 2026 (MISSED - Deputy Chen was not enrolled).</p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <h5 className="text-xs font-semibold text-amber-400 mb-3">Options:</h5>
                      <div className="space-y-2">
                        <div className="flex items-start gap-3 px-3 py-2 rounded-lg bg-slate-900/30">
                          <span className="text-xs text-amber-400 font-bold mt-0.5">1.</span>
                          <p className="text-xs text-slate-700 dark:text-slate-300">Enroll in external CIT recertification course (check local LE training providers, NAMI Georgia)</p>
                        </div>
                        <div className="flex items-start gap-3 px-3 py-2 rounded-lg bg-slate-900/30">
                          <span className="text-xs text-amber-400 font-bold mt-0.5">2.</span>
                          <p className="text-xs text-slate-700 dark:text-slate-300">Request Sheriff approval for special CIT recert class (requires min. 10 deputies, coordinate with Training Division)</p>
                        </div>
                        <div className="flex items-start gap-3 px-3 py-2 rounded-lg bg-slate-900/30">
                          <span className="text-xs text-amber-400 font-bold mt-0.5">3.</span>
                          <p className="text-xs text-slate-700 dark:text-slate-300">Allow certification to lapse, remove from CIT roster, recertify in March 2026 class (10+ days without CIT coverage on C-Shift)</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <h5 className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-3">Action Required:</h5>
                      <div className="space-y-2">
                        {[
                          { action: 'HR Director contact Deputy Chen: Urgent notice of impending expiration', completed: false },
                          { action: 'Training Division: Research external CIT recert options', completed: false },
                          { action: 'Decision by February 10: Enroll external course OR plan March recertification with coverage gap', completed: false }
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-start gap-3 px-3 py-2 rounded-lg bg-slate-900/30">
                            <Circle className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
                            <p className="text-xs text-slate-900 dark:text-white">{item.action}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <button className="px-3 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 text-blue-400 rounded-lg text-xs font-medium transition-all flex items-center gap-2">
                        <Eye className="w-3.5 h-3.5" />View CIT Certification
                      </button>
                      <button className="px-3 py-2 bg-slate-700/40 hover:bg-slate-700/60 border border-slate-600/50 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-medium transition-all flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5" />Contact Deputy Chen
                      </button>
                      <button className="px-3 py-2 bg-slate-700/40 hover:bg-slate-700/60 border border-slate-600/50 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-medium transition-all flex items-center gap-2">
                        <Search className="w-3.5 h-3.5" />Research External CIT Courses
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* AI Workforce Insights */}
            {aiInsightsVisible && (
              <div className="mb-6 bg-gradient-to-r from-violet-500/10 via-blue-500/10 to-cyan-500/10 border border-violet-500/20 rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-violet-500/20 rounded-lg flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-violet-400" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">AI Workforce Insights</h3>
                      <p className="text-[10px] text-slate-600 dark:text-slate-400">Real-time personnel analytics • Updated {new Date().toLocaleDateString()}</p>
                    </div>
                  </div>
                  <button onClick={() => setAiInsightsVisible(false)} className="p-1.5 hover:bg-slate-800/50 rounded-lg transition-colors">
                    <X className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-slate-900/40 rounded-lg p-3 border border-slate-700/30">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-4 h-4 text-red-400" />
                      <span className="text-xs font-semibold text-red-400">Certification Risk</span>
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-300">2 personnel with certification issues affecting operational readiness. Martinez (firearms expired, desk duty) and Chen (CIT expiring in 19 days, no renewal scheduled).</p>
                    <div className="mt-2 flex items-center gap-1">
                      <ArrowUpRight className="w-3 h-3 text-red-400" />
                      <span className="text-[10px] text-red-400">Immediate action required for both</span>
                    </div>
                  </div>
                  <div className="bg-slate-900/40 rounded-lg p-3 border border-slate-700/30">
                    <div className="flex items-center gap-2 mb-2">
                      <Activity className="w-4 h-4 text-amber-400" />
                      <span className="text-xs font-semibold text-amber-400">Staffing Pressure</span>
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-300">Patrol Division operating at reduced capacity: 1 deputy on desk duty (Martinez), 1 detention officer on FMLA (Davis). B-Shift most impacted with coverage gaps.</p>
                    <div className="mt-2 flex items-center gap-1">
                      <TrendingDown className="w-3 h-3 text-amber-400" />
                      <span className="text-[10px] text-amber-400">2 positions effectively offline</span>
                    </div>
                  </div>
                  <div className="bg-slate-900/40 rounded-lg p-3 border border-slate-700/30">
                    <div className="flex items-center gap-2 mb-2">
                      <BarChart3 className="w-4 h-4 text-green-400" />
                      <span className="text-xs font-semibold text-green-400">Workforce Health</span>
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-300">Overall compliance: 96.6% (172/178 fully compliant). Performance review completion: 100% on file. Average tenure: 6.4 years. 3 commendations in last 12 months.</p>
                    <div className="mt-2 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-green-400" />
                      <span className="text-[10px] text-green-400">Strong institutional health indicators</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {!aiInsightsVisible && (
              <div className="mb-4 flex justify-end">
                <button onClick={() => setAiInsightsVisible(true)} className="flex items-center gap-2 px-3 py-1.5 bg-violet-500/10 hover:bg-violet-500/20 border border-violet-500/20 rounded-lg text-xs text-violet-400 transition-colors">
                  <Sparkles className="w-3.5 h-3.5" />Show AI Insights
                </button>
              </div>
            )}

            {/* Personnel Directory */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Personnel Directory</h3>
                  <span className="text-xs text-slate-500">Showing {filteredEmployees.length} of {personnelStats.total} total employees</span>
                </div>
                <div className="flex items-center gap-1 bg-slate-800/40 border border-slate-700/50 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('card')}
                    className={`p-2 rounded-md transition-all ${viewMode === 'card' ? 'bg-amber-500/20 text-amber-400' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
                    title="Card View"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-amber-500/20 text-amber-400' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
                    title="List View"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Filters */}
              <div className="mb-4 flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name, badge, position, department..."
                    className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 rounded-xl text-slate-900 dark:text-white text-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
                  />
                </div>
                <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-3 py-2.5 bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 rounded-xl text-slate-900 dark:text-white text-sm focus:outline-none focus:border-amber-500/50 cursor-pointer">
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="on-leave">On Leave</option>
                  <option value="suspended">Suspended</option>
                </select>
                <select value={filterDepartment} onChange={(e) => setFilterDepartment(e.target.value)} className="px-3 py-2.5 bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 rounded-xl text-slate-900 dark:text-white text-sm focus:outline-none focus:border-amber-500/50 cursor-pointer">
                  <option value="all">All Divisions</option>
                  <option value="Patrol">Patrol Division</option>
                  <option value="Administrative">Administrative</option>
                  <option value="Human Resources">Human Resources</option>
                  <option value="Detention">Detention Center</option>
                </select>
                <select value={filterCertStatus} onChange={(e) => setFilterCertStatus(e.target.value)} className="px-3 py-2.5 bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 rounded-xl text-slate-900 dark:text-white text-sm focus:outline-none focus:border-amber-500/50 cursor-pointer">
                  <option value="all">All Cert Status</option>
                  <option value="compliant">Compliant</option>
                  <option value="expiring">Expiring</option>
                  <option value="expired">Expired</option>
                </select>
              </div>

              {/* Employee List View */}
              {viewMode === 'list' && (
                <div className="bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 rounded-xl overflow-hidden">
                  <div className="grid grid-cols-[1fr_120px_140px_120px_100px_80px] gap-2 px-5 py-3 bg-slate-800/60 border-b border-slate-200 dark:border-slate-700/50 text-[10px] font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                    <span>Employee</span>
                    <span>Badge</span>
                    <span>Department</span>
                    <span>Status</span>
                    <span>Cert Status</span>
                    <span className="text-right">Action</span>
                  </div>
                  {filteredEmployees.map(employee => {
                    const statusConfig = getStatusConfig(employee.status);
                    return (
                      <div key={employee.id} className={`grid grid-cols-[1fr_120px_140px_120px_100px_80px] gap-2 px-5 py-3 items-center border-b border-slate-200 dark:border-slate-700/30 hover:bg-slate-800/60 transition-colors ${
                        employee.certAlert === 'expired' ? 'bg-red-500/5' : employee.certAlert === 'expiring' ? 'bg-amber-500/5' : ''
                      }`}>
                        <div className="flex items-center gap-3 min-w-0">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            employee.positionType === 'sworn' ? 'bg-blue-500/20' : 'bg-purple-500/20'
                          }`}>
                            {employee.positionType === 'sworn' ? (
                              <Shield className="w-4 h-4 text-blue-400" />
                            ) : (
                              <Users className="w-4 h-4 text-purple-400" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{employee.name}</p>
                            <p className="text-[10px] text-slate-600 dark:text-slate-400 truncate">{employee.position}</p>
                          </div>
                        </div>
                        <span className="text-xs text-slate-700 dark:text-slate-300 font-mono">{employee.badge}</span>
                        <span className="text-xs text-slate-600 dark:text-slate-400 truncate">{employee.department}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border w-fit ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}>
                          {statusConfig.label}
                        </span>
                        <div>
                          {employee.certAlert === 'expired' && (
                            <span className="px-2 py-0.5 bg-red-500/20 border border-red-500/30 rounded text-[10px] text-red-400 font-bold">EXPIRED</span>
                          )}
                          {employee.certAlert === 'expiring' && (
                            <span className="px-2 py-0.5 bg-amber-500/20 border border-amber-500/30 rounded text-[10px] text-amber-400 font-bold">EXPIRING</span>
                          )}
                          {!employee.certAlert && (
                            <span className="px-2 py-0.5 bg-green-500/20 border border-green-500/30 rounded text-[10px] text-green-400">OK</span>
                          )}
                        </div>
                        <div className="text-right">
                          <button
                            onClick={() => setSelectedEmployee(employee)}
                            className="p-1.5 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 text-blue-400 rounded-lg transition-all"
                            title="View Full Record"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Employee Cards */}
              {viewMode === 'card' && <div className="space-y-4">
                {filteredEmployees.map(employee => {
                  const statusConfig = getStatusConfig(employee.status);

                  return (
                    <div key={employee.id} className={`bg-slate-800/40 border rounded-xl overflow-hidden ${
                      employee.certAlert === 'expired' ? 'border-red-500/30' :
                      employee.certAlert === 'expiring' ? 'border-amber-500/30' :
                      'border-slate-700/50'
                    }`}>
                      <div className="p-5">
                        <div className="flex items-start justify-between gap-4 flex-wrap">
                          <div className="flex items-start gap-4 flex-1 min-w-0">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                              employee.positionType === 'sworn' ? 'bg-blue-500/20' : 'bg-purple-500/20'
                            }`}>
                              {employee.positionType === 'sworn' ? (
                                <Shield className="w-6 h-6 text-blue-400" />
                              ) : (
                                <Users className="w-6 h-6 text-purple-400" />
                              )}
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-2 flex-wrap">
                                <h4 className="text-lg font-semibold text-slate-900 dark:text-white">{employee.name}</h4>
                                <span className="px-2 py-0.5 bg-slate-700/50 rounded text-xs text-slate-700 dark:text-slate-300 font-mono">{employee.badge}</span>
                                <span className={`px-2 py-0.5 rounded text-xs font-bold border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}>
                                  {statusConfig.label}
                                </span>
                                {employee.positionType === 'sworn' && (
                                  <span className="px-2 py-0.5 bg-blue-500/20 border border-blue-500/30 rounded text-[10px] text-blue-400">SWORN</span>
                                )}
                                {employee.positionType === 'civilian' && (
                                  <span className="px-2 py-0.5 bg-purple-500/20 border border-purple-500/30 rounded text-[10px] text-purple-400">CIVILIAN</span>
                                )}
                                {employee.certAlert === 'expired' && (
                                  <span className="px-2 py-0.5 bg-red-500/20 border border-red-500/30 rounded text-[10px] text-red-400 font-bold">CERT EXPIRED</span>
                                )}
                                {employee.certAlert === 'expiring' && (
                                  <span className="px-2 py-0.5 bg-amber-500/20 border border-amber-500/30 rounded text-[10px] text-amber-400 font-bold">CERT EXPIRING</span>
                                )}
                              </div>

                              <p className="text-sm text-slate-700 dark:text-slate-300 mb-1">{employee.position} • {employee.department}</p>

                              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600 dark:text-slate-400 mb-2">
                                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{employee.yearsOfService}</span>
                                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{employee.assignment}</span>
                                {employee.shift && <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{employee.shift}</span>}
                              </div>

                              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                                <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{employee.email}</span>
                                <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{employee.phone}</span>
                                <span className="flex items-center gap-1"><Users className="w-3 h-3" />Reports to: {employee.supervisor}</span>
                              </div>

                              {/* Duty Status */}
                              <div className="mt-3">
                                {employee.dutyRestriction ? (
                                  <div className="flex items-start gap-2 text-xs">
                                    <AlertTriangle className="w-3.5 h-3.5 text-red-400 mt-0.5 flex-shrink-0" />
                                    <span className="text-red-400">{employee.dutyStatus}: {employee.dutyRestriction}</span>
                                  </div>
                                ) : employee.status === 'on-leave' && employee.leaveDetails ? (
                                  <div className="flex items-start gap-2 text-xs">
                                    <Clock className="w-3.5 h-3.5 text-amber-400 mt-0.5 flex-shrink-0" />
                                    <span className="text-amber-400">{employee.leaveDetails.type} - Started {employee.leaveDetails.startDate} | Expected return: {employee.leaveDetails.anticipatedReturn}</span>
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-2 text-xs">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                                    <span className="text-green-400">{employee.dutyStatus} - No restrictions</span>
                                  </div>
                                )}
                              </div>

                              {/* POST Cert (sworn only) */}
                              {employee.postCert && (
                                <div className="mt-3 p-2 bg-slate-900/30 rounded-lg">
                                  <div className="flex items-center justify-between text-xs">
                                    <div className="flex items-center gap-2">
                                      <Shield className="w-3.5 h-3.5 text-blue-400" />
                                      <span className="text-slate-700 dark:text-slate-300">{employee.postCert.type} {employee.postCert.number}</span>
                                    </div>
                                    <span className={`${employee.postCert.status === 'current' ? 'text-green-400' : 'text-red-400'}`}>
                                      Expires: {employee.postCert.expires} ({employee.postCert.daysRemaining} days)
                                    </span>
                                  </div>
                                </div>
                              )}

                              {/* Key Certifications */}
                              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
                                {employee.certifications.map((cert, idx) => {
                                  const certConfig = getCertStatusConfig(cert.status);
                                  return (
                                    <div key={idx} className={`px-3 py-2 rounded-lg border ${certConfig.border} ${cert.status === 'expired' ? 'bg-red-500/5' : cert.status === 'expiring' ? 'bg-amber-500/5' : 'bg-slate-900/30'}`}>
                                      <div className="flex items-center justify-between">
                                        <p className="text-[10px] font-medium text-slate-700 dark:text-slate-300 truncate flex-1">{cert.name}</p>
                                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ml-2 ${certConfig.bg} ${certConfig.text}`}>
                                          {certConfig.label}
                                        </span>
                                      </div>
                                      <div className="flex items-center justify-between mt-1">
                                        <p className="text-[10px] text-slate-500">Last: {cert.lastDate}</p>
                                        {cert.daysRemaining !== undefined && (
                                          <p className={`text-[10px] ${cert.daysRemaining <= 30 ? 'text-amber-400' : 'text-slate-500'}`}>{cert.daysRemaining} days</p>
                                        )}
                                        {cert.daysOverdue !== undefined && (
                                          <p className="text-[10px] text-red-400 font-bold">{cert.daysOverdue} days overdue</p>
                                        )}
                                      </div>
                                      {cert.note && <p className={`text-[10px] mt-1 ${cert.urgent ? 'text-amber-400 font-medium' : 'text-slate-500'}`}>{cert.note}</p>}
                                    </div>
                                  );
                                })}
                              </div>

                              {/* Performance & Disciplinary */}
                              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
                                <div className="px-3 py-2 bg-slate-900/30 rounded-lg">
                                  <p className="text-[10px] text-slate-500 mb-1">Last Annual Evaluation</p>
                                  <p className="text-xs text-slate-700 dark:text-slate-300">{employee.performance.lastEvaluation} - {employee.performance.rating}</p>
                                  <p className="text-[10px] text-slate-500 mt-0.5">Evaluator: {employee.performance.evaluator}</p>
                                </div>
                                <div className={`px-3 py-2 rounded-lg ${employee.disciplinary.status === 'clean' ? 'bg-slate-900/30' : 'bg-red-500/5 border border-red-500/20'}`}>
                                  <p className="text-[10px] text-slate-500 mb-1">Disciplinary History</p>
                                  <p className={`text-xs ${employee.disciplinary.status === 'clean' ? 'text-green-400' : 'text-red-400'}`}>
                                    {employee.disciplinary.note}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col gap-2">
                            <button
                              onClick={() => setSelectedEmployee(employee)}
                              className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 text-blue-400 rounded-lg text-sm font-medium transition-all flex items-center gap-2"
                            >
                              <Eye className="w-4 h-4" />
                              Full Record
                            </button>
                            <button className="px-4 py-2 bg-slate-700/40 hover:bg-slate-700/60 border border-slate-600/50 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium transition-all flex items-center gap-2">
                              <Download className="w-4 h-4" />
                              Export
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>}
            </div>
          </div>
        </main>
      </div>

      {/* Employee Detail Modal */}
      {selectedEmployee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedEmployee(null)} />
          <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/50 rounded-2xl p-6 max-w-4xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{selectedEmployee.name}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{selectedEmployee.position} • Badge {selectedEmployee.badge} • {selectedEmployee.department}</p>
                {selectedEmployee.hireDate && <p className="text-xs text-slate-500 mt-1">Hire Date: {selectedEmployee.hireDate} ({selectedEmployee.yearsOfService})</p>}
              </div>
              <button onClick={() => setSelectedEmployee(null)} className="p-2 hover:bg-slate-800/50 rounded-lg transition-colors">
                <X className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Contact & Assignment */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <div className="bg-slate-800/40 rounded-xl p-3 border border-slate-700/50">
                  <p className="text-[10px] text-slate-500 mb-1">Email</p>
                  <p className="text-xs text-slate-700 dark:text-slate-300">{selectedEmployee.email}</p>
                </div>
                <div className="bg-slate-800/40 rounded-xl p-3 border border-slate-700/50">
                  <p className="text-[10px] text-slate-500 mb-1">Phone</p>
                  <p className="text-xs text-slate-700 dark:text-slate-300">{selectedEmployee.phone}</p>
                </div>
                <div className="bg-slate-800/40 rounded-xl p-3 border border-slate-700/50">
                  <p className="text-[10px] text-slate-500 mb-1">Supervisor</p>
                  <p className="text-xs text-slate-700 dark:text-slate-300">{selectedEmployee.supervisor}</p>
                </div>
                <div className="bg-slate-800/40 rounded-xl p-3 border border-slate-700/50">
                  <p className="text-[10px] text-slate-500 mb-1">Duty Status</p>
                  <p className={`text-xs ${selectedEmployee.dutyRestriction ? 'text-red-400' : 'text-green-400'}`}>{selectedEmployee.dutyStatus}</p>
                </div>
                <div className="bg-slate-800/40 rounded-xl p-3 border border-slate-700/50">
                  <p className="text-[10px] text-slate-500 mb-1">Assignment</p>
                  <p className="text-xs text-slate-700 dark:text-slate-300">{selectedEmployee.assignment}</p>
                </div>
                {selectedEmployee.takeHomeVehicle && (
                  <div className="bg-slate-800/40 rounded-xl p-3 border border-slate-700/50">
                    <p className="text-[10px] text-slate-500 mb-1">Vehicle</p>
                    <p className="text-xs text-slate-700 dark:text-slate-300">{selectedEmployee.takeHomeVehicle}</p>
                  </div>
                )}
              </div>

              {/* POST Certification */}
              {selectedEmployee.postCert && (
                <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-blue-400 mb-3 flex items-center gap-2">
                    <Shield className="w-4 h-4" />POST Certification
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                    <div><span className="text-slate-500">Type:</span> <span className="text-slate-700 dark:text-slate-300">{selectedEmployee.postCert.type}</span></div>
                    <div><span className="text-slate-500">Number:</span> <span className="text-slate-700 dark:text-slate-300">{selectedEmployee.postCert.number}</span></div>
                    <div><span className="text-slate-500">Issued:</span> <span className="text-slate-700 dark:text-slate-300">{selectedEmployee.postCert.issued}</span></div>
                    <div><span className="text-slate-500">Expires:</span> <span className="text-green-400">{selectedEmployee.postCert.expires} ({selectedEmployee.postCert.daysRemaining} days)</span></div>
                  </div>
                </div>
              )}

              {/* All Certifications */}
              <div>
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Certifications & Qualifications</h4>
                <div className="space-y-2">
                  {selectedEmployee.certifications.map((cert, idx) => {
                    const certConfig = getCertStatusConfig(cert.status);
                    return (
                      <div key={idx} className={`p-3 rounded-lg border ${certConfig.border} ${cert.status === 'expired' ? 'bg-red-500/5' : cert.status === 'expiring' ? 'bg-amber-500/5' : 'bg-slate-800/30'}`}>
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-xs font-medium text-slate-900 dark:text-white">{cert.name}</p>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${certConfig.bg} ${certConfig.text}`}>{certConfig.label}</span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-[10px] text-slate-600 dark:text-slate-400">
                          <div>Last: {cert.lastDate}</div>
                          {cert.score && <div>Score: {cert.score}</div>}
                          {cert.certNumber && <div>Cert #: {cert.certNumber}</div>}
                          {cert.expires && <div>Expires: {cert.expires}</div>}
                          {cert.nextDue && <div>Next Due: {cert.nextDue}</div>}
                        </div>
                        {cert.note && <p className={`text-[10px] mt-1 ${cert.urgent ? 'text-amber-400 font-medium' : 'text-slate-500'}`}>{cert.note}</p>}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Performance */}
              <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/50">
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Performance Evaluations</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                  <div><span className="text-slate-500">Last Evaluation:</span> <span className="text-slate-700 dark:text-slate-300">{selectedEmployee.performance.lastEvaluation}</span></div>
                  <div><span className="text-slate-500">Evaluator:</span> <span className="text-slate-700 dark:text-slate-300">{selectedEmployee.performance.evaluator}</span></div>
                  <div><span className="text-slate-500">Rating:</span> <span className="text-slate-700 dark:text-slate-300">{selectedEmployee.performance.rating}</span></div>
                  <div><span className="text-slate-500">Review Period:</span> <span className="text-slate-700 dark:text-slate-300">{selectedEmployee.performance.reviewPeriod}</span></div>
                  <div><span className="text-slate-500">Next Due:</span> <span className="text-slate-700 dark:text-slate-300">{selectedEmployee.performance.nextDue}</span></div>
                  <div><span className="text-slate-500">On File:</span> <span className="text-green-400">{selectedEmployee.performance.onFile ? 'Yes' : 'No'}</span></div>
                </div>
              </div>

              {/* Personnel Summary */}
              <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/50">
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Personnel File Summary</h4>
                <div className="space-y-2 text-xs">
                  <div><span className="text-slate-500">Position Changes:</span> <span className="text-slate-700 dark:text-slate-300">{selectedEmployee.personnelSummary.positionChanges}</span></div>
                  {selectedEmployee.personnelSummary.commendations.length > 0 && (
                    <div>
                      <span className="text-slate-500">Commendations:</span>
                      <div className="ml-4 mt-1 space-y-1">
                        {selectedEmployee.personnelSummary.commendations.map((c, i) => (
                          <p key={i} className="text-slate-700 dark:text-slate-300 flex items-center gap-2">
                            <Award className="w-3 h-3 text-amber-400" />{c}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                  <div><span className="text-slate-500">Specialized Training:</span> <span className="text-slate-700 dark:text-slate-300">{selectedEmployee.personnelSummary.specializedTraining.join(', ')}</span></div>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-slate-200 dark:border-slate-700/50">
                <button className="flex-1 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-all text-sm">Print Personnel File</button>
                <button onClick={() => navigate(createPageUrl('PerformanceReviews'))} className="flex-1 px-4 py-3 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 text-green-400 rounded-xl font-medium transition-all text-sm">View Performance</button>
                <button onClick={() => navigate(createPageUrl('TrainingCertifications'))} className="flex-1 px-4 py-3 bg-slate-700/40 hover:bg-slate-700/60 border border-slate-600/50 text-slate-900 dark:text-white rounded-xl font-medium transition-all text-sm">Training History</button>
                <button onClick={() => setSelectedEmployee(null)} className="px-4 py-3 bg-slate-800/40 hover:bg-slate-800/60 border border-slate-700/50 text-slate-700 dark:text-slate-300 rounded-xl font-medium transition-all text-sm">Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

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
            <div className="p-4 border-b border-slate-200 dark:border-slate-700/50">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Personnel Records Support</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">GCSO Human Resources Division</p>
            </div>
            <div className="p-4 space-y-3">
              <div className="p-3 bg-slate-800/40 rounded-lg hover:bg-slate-800/60 cursor-pointer transition-colors">
                <p className="text-sm font-medium text-slate-900 dark:text-white">HR Director</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">Personnel file access, confidential records</p>
                <p className="text-xs text-amber-400 mt-1">Ext. 4500</p>
              </div>
              <div className="p-3 bg-slate-800/40 rounded-lg hover:bg-slate-800/60 cursor-pointer transition-colors">
                <p className="text-sm font-medium text-slate-900 dark:text-white">Records Custodian</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">HR Specialist J. Martinez</p>
                <p className="text-xs text-amber-400 mt-1">Ext. 4505</p>
              </div>
              <div className="p-3 bg-slate-800/40 rounded-lg hover:bg-slate-800/60 cursor-pointer transition-colors">
                <p className="text-sm font-medium text-slate-900 dark:text-white">Training Division</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">Sgt. R. Martinez - Certifications & Training</p>
                <p className="text-xs text-amber-400 mt-1">Ext. 4521</p>
              </div>
              <div className="p-3 bg-slate-800/40 rounded-lg hover:bg-slate-800/60 cursor-pointer transition-colors">
                <p className="text-sm font-medium text-slate-900 dark:text-white">Open Records Requests</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">GA Open Records Act (O.C.G.A. 50-18-70)</p>
              </div>
              <div className="p-3 bg-slate-800/40 rounded-lg hover:bg-slate-800/60 cursor-pointer transition-colors">
                <p className="text-sm font-medium text-slate-900 dark:text-white">GCSO Personnel Policies</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">Personnel file management, retention schedule</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
