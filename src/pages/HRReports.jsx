import React, { useState } from 'react';
import { Users, FileText, LayoutDashboard, TrendingUp, Settings, Bell, Search, ChevronRight, CheckCircle, Shield, X, Menu, ChevronLeft, LogOut, UserPlus, Briefcase, Clock, Award, Download, Calendar, FileCheck, AlertTriangle, AlertCircle, ClipboardCheck, GraduationCap, ChevronDown, ChevronUp, Eye, HelpCircle, Printer, Info, BarChart3, FileBarChart, ExternalLink, Filter, Circle, Square } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import DashboardLayout from '../layouts/DashboardLayout';
import { hrNavigation, hrProfile, hrNotifications } from '../config/hrConfig';

export default function HRReports() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState('hr-reports');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);
  const [expandedReports, setExpandedReports] = useState({});
  const [expandedRecent, setExpandedRecent] = useState({});
  const [activeSection, setActiveSection] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedReport, setSelectedReport] = useState(null);

  const navigation = [
    { id: 'hr-dashboard', label: 'HR Dashboard', icon: Users, page: 'HRDashboard' },
    { id: 'job-postings', label: 'Job Postings', icon: Briefcase, page: 'JobPostings' },
    { id: 'applicant-tracking', label: 'Applicant Tracking', icon: UserPlus, page: 'ApplicantTracking' },
    { id: 'hiring-pipeline', label: 'Hiring Pipeline', icon: TrendingUp, page: 'HiringPipeline' },
    { id: 'compliance', label: 'HR Compliance', icon: ClipboardCheck, page: 'ComplianceManagement' },
    { id: 'onboarding', label: 'New Hire Onboarding', icon: FileCheck, page: 'NewHireOnboarding' },
    { id: 'training-certifications', label: 'Training & Certifications', icon: GraduationCap, page: 'TrainingCertifications' },
    { id: 'employee-records', label: 'Employee Records', icon: FileText, page: 'EmployeeRecords' },
    { id: 'time-off', label: 'Time Off Management', icon: Calendar, page: 'TimeOffManagement' },
    { id: 'performance', label: 'Performance Reviews', icon: Award, page: 'PerformanceReviews' },
    { id: 'hr-reports', label: 'HR Reports', icon: LayoutDashboard },
    { id: 'settings', label: 'Settings', icon: Settings, page: 'HRSettings' }
  ];

  const notifications = [
    { id: 1, title: 'Monthly Personnel Brief Due', message: 'February 2026 Personnel Operations Brief due Feb 5 - 2 days remaining', time: '30 min ago', urgent: true },
    { id: 2, title: 'POST Compliance Report Due', message: 'February POST certification report due Feb 15 - generate from Training data', time: '1 hour ago', urgent: true },
    { id: 3, title: 'Q4 2025 FMLA Report Ready', message: 'Quarterly FMLA compliance data compiled - review and generate', time: '3 hours ago', urgent: false },
    { id: 4, title: 'EEO-1 Data Collection', message: '2025 EEO-1 data 85% complete - filing deadline May 31, 2026', time: '1 day ago', urgent: false }
  ];

  // Sheriff's Command Briefing Reports
  const commandReports = [
    {
      id: 'monthly-brief',
      title: 'Monthly Personnel Operations Brief',
      description: 'Comprehensive monthly snapshot of GCSO personnel status for Sheriff Taylor and command staff',
      icon: BarChart3,
      color: 'amber',
      frequency: 'Monthly (5th of each month)',
      recipients: 'Sheriff Taylor, Command Staff (Majors/Lieutenants)',
      lastGenerated: 'January 5, 2026',
      nextDue: 'February 5, 2026 (2 days)',
      nextDueUrgent: true,
      includes: [
        'Authorized vs. Actual Staffing (by division/position)',
        'Active Recruitment Status (vacancies, applicants in pipeline)',
        'Critical Personnel Issues (expired certs, overdue evals, disciplinary)',
        'Leave Management (FMLA cases, extended leave, coverage impacts)',
        'Training Compliance (POST, firearms, mandatory certifications)',
        'Disciplinary Actions Summary (pending investigations, hearings)',
        'Workers\' Compensation Cases (active claims, costs, light duty)',
        'Budget Impact (overtime costs, vacancy savings, recruitment expenses)'
      ],
      actions: ['Generate February 2026 Report', 'View January 2026 Report', 'Configure Template', 'Schedule Auto-Delivery']
    },
    {
      id: 'quarterly-staffing',
      title: 'Quarterly Staffing & Recruitment Analysis',
      description: 'Strategic workforce planning report for Sheriff and County budget office',
      icon: TrendingUp,
      color: 'blue',
      frequency: 'Quarterly (Jan, Apr, Jul, Oct)',
      recipients: 'Sheriff Taylor, Command Staff, County HR, Budget Office',
      lastGenerated: 'October 15, 2025 (Q3 2025)',
      nextDue: 'January 15, 2026 (Q4 2025)',
      nextDueUrgent: false,
      includes: [
        'Staffing Trends (authorized, filled, vacant - 12-month trend)',
        'Recruitment Funnel Analysis (applications → qualified → interviewed → hired)',
        'Time-to-Fill Metrics by position (sworn: 90-130 days, civilian: 30-60 days)',
        'Salary Competitiveness (GCSO vs. Gwinnett PD, Fulton Sheriff, Cobb Sheriff)',
        'Retention Analysis (turnover rate, separation reasons, average tenure)',
        'Diversity Metrics (EEO categories for workforce planning)',
        'Recruitment ROI (cost-per-hire, source effectiveness)',
        'Staffing Projections (retirements, promotions, academy graduations - next 12 months)'
      ],
      actions: ['Generate Q4 2025 Report', 'View Q3 2025 Report', 'Export to County Budget', 'Compare Prior Year']
    },
    {
      id: 'annual-workforce',
      title: 'Annual Workforce Analysis & Budget Justification',
      description: 'Comprehensive annual report for County Commission budget hearings and staffing requests',
      icon: FileBarChart,
      color: 'green',
      frequency: 'Annual (December, for upcoming fiscal year)',
      recipients: 'Sheriff Taylor, County Commission, County Manager, Budget Office',
      lastGenerated: 'December 12, 2025 (FY2026)',
      nextDue: 'December 2026 (FY2027)',
      nextDueUrgent: false,
      includes: [
        'Total Personnel Summary (sworn/civilian, authorized/filled/vacant)',
        'Five-Year Staffing Trend Analysis (2021-2025)',
        'New Position Requests with justification (workload data, crime stats)',
        'Salary & Benefits Cost Analysis (current and projected)',
        'Overtime Analysis (costs, causes, reduction strategies)',
        'Training Budget Utilization (actual vs. budgeted)',
        'Equipment & Vehicle Fleet Personnel Assignments',
        'Recommended Staffing Level Changes (with data justification)'
      ],
      actions: ['View FY2026 Report', 'Download for Commission', 'Export Budget Data']
    }
  ];

  // Regulatory Compliance Reports
  const complianceReports = [
    {
      id: 'post-cert',
      title: 'Georgia POST Certification Compliance Report',
      description: 'Required for Georgia POST Council audits and internal certification tracking',
      icon: Shield,
      color: 'amber',
      regulatory: 'Georgia POST Council (O.C.G.A. § 35-8-1)',
      frequency: 'Monthly (internal), On-Demand (POST audit requests)',
      recipients: 'Sheriff, Training Division, HR Director, POST Council',
      lastGenerated: 'January 15, 2026',
      nextDue: 'February 15, 2026',
      nextDueUrgent: false,
      includes: [
        'All Sworn Personnel (164 deputies) — POST Certification Status',
        'Certification Levels (Basic, Intermediate, Advanced)',
        'Certification Numbers and Expiration Dates',
        'Certifications Expiring (30, 60, 90-day windows)',
        'Expired Certifications — NON-COMPLIANT (requires immediate action)',
        'Annual Training Hours (by deputy, by category)',
        'Firearms Qualification Status (annual requirement — must be 100%)',
        'Specialized Certifications (FTO, K-9, SWAT, CIT, etc.)',
        'Compliance Rate (MUST be 100% for all sworn personnel)'
      ],
      actions: ['Generate Current POST Report', 'Export for POST Audit', 'View Expiration Calendar', 'Compliance Dashboard']
    },
    {
      id: 'eeo1',
      title: 'EEOC EEO-1 Component 1 Report Data',
      description: 'Annual federal filing requirement for equal employment opportunity reporting',
      icon: Users,
      color: 'blue',
      regulatory: 'Equal Employment Opportunity Commission (Title VII, Civil Rights Act of 1964)',
      frequency: 'Annual',
      recipients: 'EEOC (via online portal), Sheriff, County HR',
      lastGenerated: 'May 15, 2025 (2024 data)',
      filingDeadline: 'May 31, 2026 (for 2025 data)',
      dataStatus: '85% complete',
      nextDue: 'May 31, 2026 (filing deadline)',
      nextDueUrgent: false,
      includes: [
        'Employee Demographics (race, ethnicity, gender by EEO categories)',
        'Job Categories (Officials/Administrators, Professionals, Technicians, Protective Service)',
        'Snapshot Date: Pay period October 1 - December 31, 2025',
        'Total Employees: 178 (breakdown by EEO categories and demographics)',
        'Year-over-Year Demographic Changes',
        'Applicant Flow Data (if required)'
      ],
      actions: ['Complete 2025 Data Collection', 'Review EEO-1 Draft', 'EEOC Filing Portal', 'View Prior Year']
    },
    {
      id: 'fmla-tracking',
      title: 'FMLA Case Tracking & Compliance Report',
      description: 'Federal compliance monitoring for Family and Medical Leave Act cases',
      icon: ClipboardCheck,
      color: 'green',
      regulatory: 'U.S. Department of Labor (29 CFR Part 825)',
      frequency: 'Quarterly (internal compliance monitoring)',
      recipients: 'HR Director, Sheriff, County Attorney (if legal issues)',
      lastGenerated: 'October 31, 2025 (Q3 2025)',
      nextDue: 'January 31, 2026 (Q4 2025)',
      nextDueUrgent: true,
      includes: [
        'All FMLA Cases (current calendar year)',
        'Employee Information (name, position, hire date, eligibility verification)',
        'Leave Reason (serious health condition, birth/adoption, military family, family member care)',
        'Leave Type (continuous vs. intermittent)',
        'Leave Dates and Duration',
        'FMLA Entitlement Used (hours used vs. 480-hour annual cap)',
        'Federal Notices Compliance (WH-381, WH-382 sent within timelines)',
        'Medical Certification Status (WH-380 on file)',
        'Return-to-Work Dates and Fitness-for-Duty Certifications',
        'Compliance Issues (late notices, missing certifications)'
      ],
      actions: ['Generate Q4 2025 FMLA Report', 'View Active FMLA Cases', 'DOL Compliance Checklist', 'FMLA Forms Library']
    },
    {
      id: 'cjis-compliance',
      title: 'CJIS Security Compliance Report',
      description: 'FBI Criminal Justice Information Services security policy compliance for database access',
      icon: Shield,
      color: 'red',
      regulatory: 'FBI CJIS Security Policy (28 CFR Part 20)',
      frequency: 'Annual (with monthly internal monitoring)',
      recipients: 'Sheriff, CJIS Terminal Agency Coordinator, IT Security, FBI CJIS',
      lastGenerated: 'November 1, 2025',
      nextDue: 'March 1, 2026 (annual audit preparation)',
      nextDueUrgent: false,
      includes: [
        'All Personnel with CJIS Database Access (GCIC/NCIC)',
        'CJIS Security Awareness Training Status (annual requirement)',
        'Background Check Status (fingerprint-based, required for access)',
        'Security Incident Reports',
        'Access Audit Logs (terminal usage, query patterns)',
        'Compliance Rate (MUST be 100% for all CJIS users)'
      ],
      actions: ['Generate CJIS Compliance Report', 'View Training Status', 'Access Audit Log', 'FBI CJIS Requirements']
    },
    {
      id: 'workers-comp',
      title: 'Workers\' Compensation Claims Report',
      description: 'Injury tracking, claims management, and cost analysis by division',
      icon: AlertTriangle,
      color: 'amber',
      regulatory: 'Georgia Workers\' Compensation Act (O.C.G.A. § 34-9)',
      frequency: 'Quarterly (for command staff), Annual (for County risk management)',
      recipients: 'Sheriff, HR Director, County Risk Management, Insurance Carrier',
      lastGenerated: 'October 15, 2025 (Q3 2025)',
      nextDue: 'January 15, 2026 (Q4 2025)',
      nextDueUrgent: false,
      includes: [
        'Active Claims (by employee, division, injury type)',
        'New Claims Filed (quarter)',
        'Claims Resolved/Closed (quarter)',
        'Light Duty Assignments (current)',
        'Total Costs (medical, lost time, administrative)',
        'Division Comparison (injury rates by assignment)',
        'Trend Analysis (year-over-year claims and costs)',
        'Return-to-Work Program Outcomes'
      ],
      actions: ['Generate Q4 2025 Report', 'View Active Claims', 'Cost Analysis Dashboard', 'Export for Risk Management']
    }
  ];

  // Recently Generated Reports
  const recentReports = [
    {
      id: 1,
      name: 'Q4 Hiring Summary',
      type: 'Hiring',
      typeColor: 'blue',
      generated: 'December 3, 2024 • 3:42 PM',
      generatedBy: 'HR Director',
      fileSize: '2.4 MB (PDF)',
      pages: 24,
      period: 'Q4 2024 (October 1 - December 31, 2024)',
      summary: [
        'Positions Recruited: Deputy Sheriff (8 vacancies), Background Investigator (2), Detention Officer (1), Admin Assistant (1)',
        'Total Applications: 47 received (Deputy: 23, BI: 12, DO: 8, Admin: 4)',
        'Qualified Applicants: 31 passed initial screening',
        'Background Investigations: 5 in progress, 4 completed/cleared',
        'Offers Extended: 3 (Deputy Sheriff positions)',
        'Hires Completed: 1 (Deputy Sarah Mitchell, started 11/14/2024)',
        'Average Time-to-Fill: 127 days (Deputy Sheriff — application to first day)'
      ],
      findings: [
        'Application volume DOWN 18% vs. Q3 2024 (salary competitiveness concern vs. Gwinnett PD)',
        'Background investigation capacity constrained (2 investigators handling all GCSO — bottleneck)',
        'Administrative Assistant recruitment failure (only 4 apps in 94 days — salary not competitive)'
      ],
      recommendations: [
        'Request salary study for Deputy Sheriff (currently 12.8% below Gwinnett PD)',
        'Consider adding 3rd background investigator (temporary or contract)',
        'Revise Admin Assistant salary range to $42K-50K (currently $38K-45K, not competitive)'
      ]
    },
    {
      id: 2,
      name: 'Employee Headcount & Demographics',
      type: 'Employee',
      typeColor: 'green',
      generated: 'December 1, 2024 • 10:15 AM',
      generatedBy: 'HR Specialist J. Martinez',
      fileSize: '1.8 MB (PDF)',
      pages: 18,
      period: 'As of December 1, 2024',
      summary: [
        'Total Personnel: 178 (164 sworn, 14 civilian)',
        'Authorized Strength: 192 (178 sworn, 14 civilian)',
        'Vacancy Rate: 7.3% (14 sworn vacancies, 0 civilian vacancies)',
        'By Division: Patrol (89), Detention (42), CID (18), Admin/Support (29)',
        'Average Tenure: 8.2 years (sworn), 5.7 years (civilian)',
        'Retirement Eligible (within 5 years): 23 employees (12.9% of workforce)'
      ],
      findings: [
        'Sworn vacancy rate of 7.3% exceeds 5% target — recruitment acceleration needed',
        '23 retirement-eligible employees in next 5 years — succession planning critical',
        'Patrol Division understaffed by 6 positions (current minimum staffing occasionally impacted)'
      ],
      recommendations: []
    },
    {
      id: 3,
      name: 'POST Training Compliance — January 2026',
      type: 'Training',
      typeColor: 'cyan',
      generated: 'January 15, 2026 • 2:30 PM',
      generatedBy: 'Training Division (Sgt. R. Martinez)',
      fileSize: '3.1 MB (PDF)',
      pages: 32,
      period: 'As of January 15, 2026',
      summary: [
        'POST Certification Status: 162 of 164 sworn — 98.8% compliant',
        'Non-Compliant: 2 deputies (expired firearms qualification, pending range day)',
        'Expiring Next 30 Days: 4 certifications (2 TASER, 1 CIT, 1 Defensive Tactics)',
        'Expiring Next 60 Days: 7 additional certifications',
        'Annual Firearms Qualification: 160 of 164 current (97.6%)',
        'CJIS Security Training: 174 of 178 current (97.8%)',
        'Annual Use of Force Recertification: 159 of 164 current (97.0%)'
      ],
      findings: [
        'Two deputies with expired firearms must complete range qualification before returning to full duty',
        'CIT certification expiring for Deputy M. Chen — recertification NOT scheduled (critical gap)',
        'CJIS training 4 personnel behind — must complete before next FBI audit'
      ],
      recommendations: []
    },
    {
      id: 4,
      name: 'November PTO & Leave Summary',
      type: 'Time Off',
      typeColor: 'purple',
      generated: 'December 2, 2024 • 9:00 AM',
      generatedBy: 'HR Director',
      fileSize: '1.2 MB (PDF)',
      pages: 12,
      period: 'November 2024',
      summary: [
        'Total Leave Hours Used: 2,847 hours (annual: 1,624h, sick: 812h, FMLA: 264h, other: 147h)',
        'Average Annual Leave Balance: 72 hours (accrual rate: 120-240h/year based on tenure)',
        'Employees at Maximum Accrual Cap: 8 employees (risk of losing accrued leave)',
        'FMLA Cases Active: 2 (Amanda Garcia — continuous, Michael Davis — intermittent)',
        'Shift Coverage Issues: 3 instances below minimum staffing on D-Shift (Nov 5-7)',
        'Holiday Coverage: Thanksgiving adequately staffed across all shifts'
      ],
      findings: [
        '8 employees at accrual cap need to use or lose leave — contact supervisors',
        'D-Shift coverage issues Nov 5-7 caused by concurrent leave requests — policy review needed',
        'FMLA usage tracking current — all federal notice requirements met'
      ],
      recommendations: []
    },
    {
      id: 5,
      name: 'Performance Review Cycle Status',
      type: 'Performance',
      typeColor: 'amber',
      generated: 'January 20, 2026 • 11:45 AM',
      generatedBy: 'HR Director',
      fileSize: '1.5 MB (PDF)',
      pages: 15,
      period: 'Q4 2024 Review Cycle (as of January 20, 2026)',
      summary: [
        'Completion Rate: 89% (6 of 7 Q4 2024 evaluations on track or complete)',
        'Completed: 3 (Jennifer Taylor, Daniel Wilson, Emily Johnson — all ahead of deadline)',
        'In Progress: 3 (Marcus Chen, Sarah Williams, Robert Martinez — supervisor reviews pending)',
        'Overdue: 1 (Michael Davis Q3 2024 — 510+ days overdue — CRITICAL)',
        'Supervisors with Overdue Reviews: Sgt. Anderson (2), Lt. Martinez (1), Major Wilson (1)',
        'Average Completion Time: 22 days (for completed evaluations — well under 30-day policy)'
      ],
      findings: [
        'Michael Davis Q3 2024 evaluation 510+ days overdue — Major Wilson supervisor accountability crisis',
        'Sgt. Anderson has pattern of late evaluations (3 overdue) — requires supervisory intervention',
        'Completed evaluations were all ahead of schedule — indicates capable supervisors when held accountable'
      ],
      recommendations: []
    }
  ];

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

  const toggleReport = (id) => {
    setExpandedReports(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleRecent = (id) => {
    setExpandedRecent(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const getColorClasses = (color) => {
    const colors = {
      amber: { bg: 'bg-amber-500/20', border: 'border-amber-500/30', text: 'text-amber-700', icon: 'text-amber-700' },
      blue: { bg: 'bg-blue-500/20', border: 'border-blue-500/30', text: 'text-blue-400', icon: 'text-blue-400' },
      green: { bg: 'bg-green-500/20', border: 'border-green-500/30', text: 'text-green-400', icon: 'text-green-400' },
      red: { bg: 'bg-red-500/20', border: 'border-red-500/30', text: 'text-red-400', icon: 'text-red-400' },
      cyan: { bg: 'bg-cyan-500/20', border: 'border-cyan-500/30', text: 'text-cyan-400', icon: 'text-cyan-400' },
      purple: { bg: 'bg-purple-500/20', border: 'border-purple-500/30', text: 'text-purple-400', icon: 'text-purple-400' }
    };
    return colors[color] || colors.amber;
  };

  const getTypeColor = (type) => {
    const map = { Hiring: 'blue', Employee: 'green', Training: 'cyan', 'Time Off': 'purple', Performance: 'amber', Compliance: 'red' };
    return map[type] || 'amber';
  };

  const filteredRecent = recentReports.filter(r => {
    if (filterType !== 'all' && r.type !== filterType) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return r.name.toLowerCase().includes(q) || r.type.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <DashboardLayout navigation={hrNavigation} profile={hrProfile} notifications={hrNotifications} settingsRoute="/hr/settings">
      <div className="p-4 lg:p-6 min-h-full">
          <div className="max-w-7xl mx-auto">

            {/* Page Title */}
            <div className="mb-6">
              <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-1">HR Reports & Personnel Analytics</h2>
              <p className="text-secondary text-sm">Gwinnett County Sheriff's Office • Lawrenceville, Georgia</p>
              <p className="text-slate-500 text-xs mt-1">Saturday, February 27, 2026 • 4:13 PM EST</p>
            </div>

            {/* Info Bar */}
            <div className="mb-6 bg-white dark:bg-slate-800/40 border border-border rounded-xl shadow-sm dark:shadow-none p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-secondary">
                <div className="flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-slate-500" />
                  <span>HR Director: <span className="text-secondary">Personnel Admin</span> | Sheriff: <span className="text-secondary">Keybo Taylor</span> | Report Admin: <span className="text-secondary">HR Specialist J. Martinez</span></span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5 text-slate-500" />
                  <span>Total Personnel: <span className="text-secondary">178 (164 sworn, 14 civilian)</span> | Last Report: <span className="text-secondary">Q4 Hiring Summary (Dec 3, 2024)</span></span>
                </div>
              </div>
              <div className="mt-2 text-xs text-slate-500 flex items-center gap-2">
                <Shield className="w-3.5 h-3.5" />
                <span>System: GCSO-HRIS v4.2 | Last Updated: 16:13:47 EST</span>
              </div>
            </div>

            {/* Context Alerts */}
            <div className="mb-6 space-y-2">
              <div className="flex items-start gap-3 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                <AlertTriangle className="w-4 h-4 text-amber-700 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-secondary">Hiring velocity: Time-to-fill <span className="text-amber-700 font-medium">127 days</span> (Deputy Sheriff) — background investigation bottleneck identified</p>
              </div>
              <div className="flex items-start gap-3 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                <AlertTriangle className="w-4 h-4 text-amber-700 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-secondary">Training compliance at <span className="text-amber-700 font-medium">98.8%</span> (POST): 2 deputies with expired firearms, 4 certifications expiring next 30 days</p>
              </div>
              <div className="flex items-start gap-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <Info className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-secondary">PTO average balance: <span className="text-blue-400 font-medium">72 hours</span> — 8 employees at accrual cap (risk of losing leave)</p>
              </div>
              <div className="flex items-start gap-3 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                <AlertTriangle className="w-4 h-4 text-amber-700 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-secondary">Performance reviews: <span className="text-amber-700 font-medium">89% completion</span> — 3 reviews pending supervisor approval, 1 severely overdue (510+ days)</p>
              </div>
            </div>

            {/* Section Navigation */}
            <div className="mb-6 flex gap-2 border-b border-border overflow-x-auto">
              {[
                { id: 'all', label: 'All Reports' },
                { id: 'command', label: 'Command Briefing' },
                { id: 'compliance', label: 'Regulatory Compliance' },
                { id: 'recent', label: 'Recently Generated' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveSection(tab.id)}
                  className={`px-4 py-3 text-sm font-medium transition-all relative whitespace-nowrap ${
                    activeSection === tab.id ? 'text-amber-700' : 'text-secondary hover:text-slate-300'
                  }`}
                >
                  {tab.label}
                  {activeSection === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500"></div>
                  )}
                </button>
              ))}
            </div>

            {/* Sheriff's Command Briefing Reports */}
            {(activeSection === 'all' || activeSection === 'command') && (
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-amber-500/20 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-amber-700" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary">Sheriff's Command Briefing Reports</h3>
                    <p className="text-xs text-secondary">Reports for Sheriff Keybo Taylor and command staff decision-making</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {commandReports.map(report => {
                    const colors = getColorClasses(report.color);
                    const Icon = report.icon;
                    const isExpanded = expandedReports[report.id];

                    return (
                      <div key={report.id} className="bg-white dark:bg-slate-800/40 border border-border rounded-xl overflow-hidden">
                        <button
                          onClick={() => toggleReport(report.id)}
                          className="w-full flex items-start gap-4 p-5 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors text-left"
                        >
                          <div className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                            <Icon className={`w-6 h-6 ${colors.icon}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-1 flex-wrap">
                              <h4 className="text-base font-semibold text-primary">{report.title}</h4>
                              {report.nextDueUrgent && (
                                <span className="px-2 py-0.5 bg-red-500/20 border border-red-500/30 rounded-full text-xs text-red-400 font-medium">DUE SOON</span>
                              )}
                            </div>
                            <p className="text-sm text-secondary mb-2">{report.description}</p>
                            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                              <span>Frequency: <span className="text-secondary">{report.frequency}</span></span>
                              <span>Next Due: <span className={report.nextDueUrgent ? 'text-red-400 font-medium' : 'text-slate-500'}>{report.nextDue}</span></span>
                            </div>
                          </div>
                          {isExpanded ? <ChevronUp className="w-5 h-5 text-secondary mt-1" /> : <ChevronDown className="w-5 h-5 text-secondary mt-1" />}
                        </button>

                        {isExpanded && (
                          <div className="px-5 pb-5 space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div className="bg-white dark:bg-slate-900/40 border border-border rounded-xl p-3">
                                <p className="text-xs text-slate-500 mb-1">Recipients</p>
                                <p className="text-sm text-secondary">{report.recipients}</p>
                              </div>
                              <div className="bg-white dark:bg-slate-900/40 border border-border rounded-xl p-3">
                                <p className="text-xs text-slate-500 mb-1">Last Generated</p>
                                <p className="text-sm text-secondary">{report.lastGenerated}</p>
                              </div>
                            </div>

                            <div className="bg-white dark:bg-slate-900/40 border border-border rounded-xl p-4">
                              <h5 className="text-sm font-semibold text-primary mb-3">Report Includes:</h5>
                              <div className="space-y-1.5">
                                {report.includes.map((item, idx) => (
                                  <div key={idx} className="flex items-start gap-2">
                                    <CheckCircle className="w-3.5 h-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                                    <span className="text-xs text-secondary">{item}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-3">
                              {report.actions.map((action, idx) => (
                                <button
                                  key={idx}
                                  className={`px-4 py-2 rounded-xl font-medium transition-all text-sm flex items-center gap-2 ${
                                    idx === 0
                                      ? 'bg-amber-500 hover:bg-amber-400 text-white'
                                      : 'bg-slate-50 dark:bg-slate-700/40 hover:bg-slate-700/60 border border-slate-600/50 text-primary'
                                  }`}
                                >
                                  {idx === 0 ? <FileBarChart className="w-4 h-4" /> : idx === 1 ? <Eye className="w-4 h-4" /> : <ExternalLink className="w-3.5 h-3.5" />}
                                  {action}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Regulatory Compliance Reports */}
            {(activeSection === 'all' || activeSection === 'compliance') && (
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center">
                    <ClipboardCheck className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary">Regulatory Compliance & Audit Reports</h3>
                    <p className="text-xs text-secondary">Reports required by federal/state law or regulatory agencies</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {complianceReports.map(report => {
                    const colors = getColorClasses(report.color);
                    const Icon = report.icon;
                    const isExpanded = expandedReports[report.id];

                    return (
                      <div key={report.id} className={`bg-white dark:bg-slate-800/40 border ${report.nextDueUrgent ? 'border-amber-500/30' : 'border-slate-700/50'} rounded-xl overflow-hidden`}>
                        <button
                          onClick={() => toggleReport(report.id)}
                          className="w-full flex items-start gap-4 p-5 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors text-left"
                        >
                          <div className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                            <Icon className={`w-6 h-6 ${colors.icon}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-1 flex-wrap">
                              <h4 className="text-base font-semibold text-primary">{report.title}</h4>
                              {report.nextDueUrgent && (
                                <span className="px-2 py-0.5 bg-amber-500/20 border border-amber-500/30 rounded-full text-xs text-amber-700 font-medium">OVERDUE</span>
                              )}
                            </div>
                            <p className="text-sm text-secondary mb-2">{report.description}</p>
                            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                              <span>Authority: <span className="text-secondary">{report.regulatory}</span></span>
                              <span>Frequency: <span className="text-secondary">{report.frequency}</span></span>
                            </div>
                          </div>
                          {isExpanded ? <ChevronUp className="w-5 h-5 text-secondary mt-1" /> : <ChevronDown className="w-5 h-5 text-secondary mt-1" />}
                        </button>

                        {isExpanded && (
                          <div className="px-5 pb-5 space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                              <div className="bg-white dark:bg-slate-900/40 border border-border rounded-xl p-3">
                                <p className="text-xs text-slate-500 mb-1">Recipients</p>
                                <p className="text-sm text-secondary">{report.recipients}</p>
                              </div>
                              <div className="bg-white dark:bg-slate-900/40 border border-border rounded-xl p-3">
                                <p className="text-xs text-slate-500 mb-1">Last Generated</p>
                                <p className="text-sm text-secondary">{report.lastGenerated}</p>
                              </div>
                              <div className={`bg-white dark:bg-slate-900/40 border ${report.nextDueUrgent ? 'border-amber-500/30' : 'border-border'} rounded-xl p-3`}>
                                <p className="text-xs text-slate-500 mb-1">Next Due</p>
                                <p className={`text-sm font-medium ${report.nextDueUrgent ? 'text-amber-700' : 'text-slate-500'}`}>{report.nextDue}</p>
                              </div>
                            </div>

                            {report.dataStatus && (
                              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3">
                                <p className="text-xs text-blue-400 font-medium">Data Collection Status: {report.dataStatus}</p>
                                {report.filingDeadline && <p className="text-xs text-secondary mt-1">Filing Deadline: {report.filingDeadline}</p>}
                              </div>
                            )}

                            <div className="bg-white dark:bg-slate-900/40 border border-border rounded-xl p-4">
                              <h5 className="text-sm font-semibold text-primary mb-3">Report Includes:</h5>
                              <div className="space-y-1.5">
                                {report.includes.map((item, idx) => (
                                  <div key={idx} className="flex items-start gap-2">
                                    <CheckCircle className="w-3.5 h-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                                    <span className="text-xs text-secondary">{item}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-3">
                              {report.actions.map((action, idx) => (
                                <button
                                  key={idx}
                                  className={`px-4 py-2 rounded-xl font-medium transition-all text-sm flex items-center gap-2 ${
                                    idx === 0
                                      ? 'bg-amber-500 hover:bg-amber-400 text-white'
                                      : 'bg-slate-50 dark:bg-slate-700/40 hover:bg-slate-700/60 border border-slate-600/50 text-primary'
                                  }`}
                                >
                                  {idx === 0 ? <FileBarChart className="w-4 h-4" /> : <ExternalLink className="w-3.5 h-3.5" />}
                                  {action}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Recently Generated Reports */}
            {(activeSection === 'all' || activeSection === 'recent') && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white dark:bg-slate-700/50 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-primary">Recently Generated Reports</h3>
                      <p className="text-xs text-secondary">Completed reports available for download and review</p>
                    </div>
                  </div>
                  <button className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-800/40 border border-slate-700/50 rounded-lg text-secondary hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all text-sm">
                    <Download className="w-4 h-4" />
                    Export All
                  </button>
                </div>

                {/* Search & Filter */}
                <div className="mb-4 flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      placeholder="Search reports..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800/40 border border-border rounded-xl text-primary placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-amber-500/50 text-sm"
                    />
                  </div>
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="px-4 py-2.5 bg-white dark:bg-slate-800/40 border border-border rounded-xl text-secondary focus:outline-none focus:border-amber-500/50 text-sm"
                  >
                    <option value="all">All Types</option>
                    <option value="Hiring">Hiring</option>
                    <option value="Employee">Employee</option>
                    <option value="Training">Training</option>
                    <option value="Time Off">Time Off</option>
                    <option value="Performance">Performance</option>
                  </select>
                </div>

                <div className="space-y-6">
                  {filteredRecent.map(report => {
                    const typeColors = getColorClasses(getTypeColor(report.type));
                    const isExpanded = expandedRecent[report.id];

                    return (
                      <div key={report.id} className="bg-white dark:bg-slate-800/40 border border-border rounded-xl overflow-hidden">
                        <div className="p-5">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-4 flex-1">
                              <div className={`w-10 h-10 ${typeColors.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                                <FileText className={`w-5 h-5 ${typeColors.icon}`} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-3 mb-1 flex-wrap">
                                  <h4 className="text-base font-semibold text-primary">{report.name}</h4>
                                  <span className={`px-2 py-0.5 ${typeColors.bg} border ${typeColors.border} rounded-full text-xs ${typeColors.text} font-medium`}>{report.type}</span>
                                </div>
                                <p className="text-xs text-secondary mb-2">Generated: {report.generated} • By: {report.generatedBy}</p>
                                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                                  <span>Period: <span className="text-secondary">{report.period}</span></span>
                                  <span>{report.fileSize} • {report.pages} pages</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => setSelectedReport(report)}
                                className="px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 text-amber-700 rounded-lg text-sm font-medium transition-all"
                              >
                                View
                              </button>
                              <button className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700/50 rounded-lg transition-colors">
                                <Download className="w-4 h-4 text-secondary" />
                              </button>
                              <button
                                onClick={() => toggleRecent(report.id)}
                                className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700/50 rounded-lg transition-colors"
                              >
                                {isExpanded ? <ChevronUp className="w-4 h-4 text-secondary" /> : <ChevronDown className="w-4 h-4 text-secondary" />}
                              </button>
                            </div>
                          </div>
                        </div>

                        {isExpanded && (
                          <div className="px-5 pb-5 border-t border-border dark:border-slate-700/30 pt-4 space-y-4">
                            <div className="bg-white dark:bg-slate-900/40 border border-border rounded-xl p-4">
                              <h5 className="text-sm font-semibold text-primary mb-3">Report Summary</h5>
                              <div className="space-y-1.5">
                                {report.summary.map((item, idx) => (
                                  <div key={idx} className="flex items-start gap-2">
                                    <CheckCircle className="w-3.5 h-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                                    <span className="text-xs text-secondary">{item}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {report.findings && report.findings.length > 0 && (
                              <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
                                <h5 className="text-sm font-semibold text-amber-700 mb-3">Key Findings</h5>
                                <div className="space-y-1.5">
                                  {report.findings.map((item, idx) => (
                                    <div key={idx} className="flex items-start gap-2">
                                      <AlertTriangle className="w-3.5 h-3.5 text-amber-700 mt-0.5 flex-shrink-0" />
                                      <span className="text-xs text-secondary">{item}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {report.recommendations && report.recommendations.length > 0 && (
                              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                                <h5 className="text-sm font-semibold text-blue-400 mb-3">Recommendations</h5>
                                <div className="space-y-1.5">
                                  {report.recommendations.map((item, idx) => (
                                    <div key={idx} className="flex items-start gap-2">
                                      <Info className="w-3.5 h-3.5 text-blue-400 mt-0.5 flex-shrink-0" />
                                      <span className="text-xs text-secondary">{item}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            <div className="flex flex-wrap gap-3">
                              <button
                                onClick={() => setSelectedReport(report)}
                                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 rounded-xl text-white font-medium transition-all text-sm flex items-center gap-2"
                              >
                                <Eye className="w-4 h-4" /> View Full Report
                              </button>
                              <button className="px-4 py-2 bg-slate-50 dark:bg-slate-700/40 hover:bg-slate-700/60 border border-slate-600/50 text-primary rounded-xl font-medium transition-all text-sm flex items-center gap-2">
                                <Download className="w-4 h-4" /> Download PDF
                              </button>
                              <button className="px-4 py-2 bg-slate-50 dark:bg-slate-700/40 hover:bg-slate-700/60 border border-slate-600/50 text-primary rounded-xl font-medium transition-all text-sm flex items-center gap-2">
                                <Printer className="w-4 h-4" /> Print
                              </button>
                              <button className="px-4 py-2 bg-white dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800/60 border border-slate-700/50 text-secondary rounded-xl font-medium transition-all text-sm flex items-center gap-2">
                                <ExternalLink className="w-4 h-4" /> Share with Sheriff
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {filteredRecent.length === 0 && (
                    <div className="text-center py-12">
                      <Search className="w-12 h-12 text-slate-700 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-primary mb-2">No Reports Found</h3>
                      <p className="text-secondary text-sm">Try adjusting your search or filter criteria.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Report Compliance Reference */}
            <div className="bg-white dark:bg-slate-800/40 border border-border rounded-xl shadow-sm dark:shadow-none p-5">
              <h4 className="text-sm font-semibold text-primary mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4 text-secondary" /> GCSO Report Compliance & Retention Requirements
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
                <div className="bg-white dark:bg-slate-900/40 border border-border rounded-lg p-3">
                  <p className="text-xs text-slate-500 mb-1">Personnel Records</p>
                  <p className="text-sm text-primary font-medium">75 years</p>
                  <p className="text-xs text-secondary">GA Records Retention</p>
                </div>
                <div className="bg-white dark:bg-slate-900/40 border border-border rounded-lg p-3">
                  <p className="text-xs text-slate-500 mb-1">POST Certifications</p>
                  <p className="text-sm text-primary font-medium">Permanent</p>
                  <p className="text-xs text-secondary">O.C.G.A. § 35-8-1</p>
                </div>
                <div className="bg-white dark:bg-slate-900/40 border border-border rounded-lg p-3">
                  <p className="text-xs text-slate-500 mb-1">EEO-1 Reports</p>
                  <p className="text-sm text-primary font-medium">3 years</p>
                  <p className="text-xs text-secondary">Title VII, EEOC</p>
                </div>
                <div className="bg-white dark:bg-slate-900/40 border border-border rounded-lg p-3">
                  <p className="text-xs text-slate-500 mb-1">FMLA Records</p>
                  <p className="text-sm text-primary font-medium">3 years</p>
                  <p className="text-xs text-secondary">29 CFR Part 825</p>
                </div>
              </div>
              <div className="text-xs text-slate-500 space-y-1">
                <p>• All HR reports are official GCSO records subject to Georgia Open Records Act (O.C.G.A. § 50-18-70)</p>
                <p>• Reports containing personnel evaluations, medical information, or investigation details are exempt from public disclosure</p>
                <p>• Reports must be generated by authorized HR personnel and approved before distribution</p>
              </div>
            </div>
          </div>

      {/* Support & Resources FAB */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setSupportOpen(!supportOpen)}
          className="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110"
        >
          {supportOpen ? <X className="w-6 h-6 text-primary" /> : <HelpCircle className="w-6 h-6 text-primary" />}
        </button>

        {supportOpen && (
          <div className="absolute bottom-16 right-0 w-80 bg-surface-raised backdrop-blur-xl border border-border rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-4 border-b border-border">
              <h3 className="text-sm font-semibold text-primary">HR Reports Support</h3>
              <p className="text-xs text-secondary mt-1">GCSO Human Resources Division</p>
            </div>
            <div className="p-4 space-y-3">
              <div className="p-3 bg-white dark:bg-slate-800/40 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/60 cursor-pointer transition-colors">
                <p className="text-sm font-medium text-primary">HR Director</p>
                <p className="text-xs text-secondary">Report authorization, confidential data access</p>
                <p className="text-xs text-amber-700 mt-1">Ext. 4500</p>
              </div>
              <div className="p-3 bg-white dark:bg-slate-800/40 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/60 cursor-pointer transition-colors">
                <p className="text-sm font-medium text-primary">Report Administrator</p>
                <p className="text-xs text-secondary">HR Specialist J. Martinez — report generation, data queries</p>
                <p className="text-xs text-amber-700 mt-1">Ext. 4505</p>
              </div>
              <div className="p-3 bg-white dark:bg-slate-800/40 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/60 cursor-pointer transition-colors">
                <p className="text-sm font-medium text-primary">Training Division</p>
                <p className="text-xs text-secondary">POST compliance data, certification reports</p>
                <p className="text-xs text-amber-700 mt-1">Ext. 4521</p>
              </div>
              <div className="p-3 bg-white dark:bg-slate-800/40 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/60 cursor-pointer transition-colors">
                <p className="text-sm font-medium text-primary">County Budget Office</p>
                <p className="text-xs text-secondary">Staffing reports, budget justification data</p>
              </div>
              <div className="p-3 bg-white dark:bg-slate-800/40 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/60 cursor-pointer transition-colors">
                <p className="text-sm font-medium text-primary">Open Records Requests</p>
                <p className="text-xs text-secondary">GA Open Records Act (O.C.G.A. § 50-18-70)</p>
              </div>
            </div>
          </div>
        )}
      </div>
      </div>
    </DashboardLayout>
  );
}
