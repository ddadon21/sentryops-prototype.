import React, { useState } from 'react';
import {
  Users, FileText, LayoutDashboard, TrendingUp, Bell, MessageCircle,
  Search, ChevronRight, CheckCircle, Shield, Sparkles, X, Send, Menu, ChevronLeft,
  LogOut, UserPlus, Briefcase, Clock, Award, Filter, Eye, Edit, Trash2, Plus,
  MapPin, Calendar, DollarSign, FileCheck, ClipboardCheck, GraduationCap,
  ChevronDown, ChevronUp, AlertTriangle, AlertCircle, Building, Phone, Mail,
  ExternalLink, UserCheck, BadgeCheck, Car, Heart, Scale, Target, ArrowUpRight,
  ArrowDownRight, Copy, Printer, Download
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import DashboardLayout from '../layouts/DashboardLayout';

export default function JobPostings() {
  const navigate = useNavigate();  const [activeTab, setActiveTab] = useState('active');
  const [expandedPostings, setExpandedPostings] = useState({
    deputy: true,
    investigator: false,
    detention: false,
    admin: false
  });

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: '2-digit'
  });
  const formattedTime = currentDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });

  const navigation = [
    { id: 'hr-dashboard', label: 'HR Dashboard', icon: Users, page: 'HRDashboard' },
    { id: 'job-postings', label: 'Job Postings', icon: Briefcase },
    { id: 'applicant-tracking', label: 'Applicant Tracking', icon: UserPlus, page: 'ApplicantTracking' },
    { id: 'hiring-pipeline', label: 'Hiring Pipeline', icon: TrendingUp, page: 'HiringPipeline' },
    { id: 'compliance', label: 'HR Compliance', icon: ClipboardCheck, page: 'ComplianceManagement' },
    { id: 'onboarding', label: 'New Hire Onboarding', icon: FileCheck, page: 'NewHireOnboarding' },
    { id: 'training-certifications', label: 'Training & Certifications', icon: GraduationCap, page: 'TrainingCertifications' },
    { id: 'employee-records', label: 'Employee Records', icon: FileText, page: 'EmployeeRecords' },
    { id: 'time-off', label: 'Time Off Management', icon: Calendar, page: 'TimeOffManagement' },
    { id: 'performance', label: 'Performance Reviews', icon: Award, page: 'PerformanceReviews' },
    { id: 'hr-reports', label: 'HR Reports', icon: LayoutDashboard, page: 'HRReports' }
  ];

  const notifications = [
    { id: 1, title: 'Oral Board Feb 06', message: 'Deputy Sheriff: 8 candidates scheduled for interviews', time: '15 min ago', urgent: true },
    { id: 2, title: 'Admin Posting Closing', message: 'Administrative Assistant closes Feb 11 - only 4 applicants', time: '1 hour ago', urgent: true },
    { id: 3, title: 'New Application', message: 'Background Investigator: 1 new external application', time: '2 hours ago', urgent: false }
  ];

  const togglePosting = (id) => {
    setExpandedPostings(prev => ({ ...prev, [id]: !prev[id] }));
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


const hrNavigation = [
  { id: 'hr-dashboard',            label: 'HR Dashboard',             icon: Users,          route: '/hr/dashboard' },
  { id: 'job-postings',            label: 'Job Postings',             icon: Briefcase,      route: '/hr/jobs' },
  { id: 'applicant-tracking',      label: 'Applicant Tracking',       icon: UserPlus,       route: '/hr/applicants' },
  { id: 'hiring-pipeline',         label: 'Hiring Pipeline',          icon: TrendingUp,     route: '/hr/pipeline' },
  { id: 'onboarding',              label: 'New Hire Onboarding',      icon: FileCheck,      route: '/hr/onboarding' },
  { id: 'training-certifications', label: 'Training & Certifications',icon: GraduationCap,  route: '/hr/training' },
  { id: 'employee-records',        label: 'Employee Records',         icon: FileText,       route: '/hr/records' },
  { id: 'time-off',                label: 'Time Off Management',      icon: Calendar,       route: '/hr/timeoff' },
  { id: 'performance',             label: 'Performance Reviews',      icon: Award,          route: '/hr/reviews' },
  { id: 'compliance',              label: 'HR Compliance',            icon: ClipboardCheck, route: '/hr/compliance' },
  { id: 'hr-reports',              label: 'HR Reports',               icon: LayoutDashboard,route: '/hr/reports' },
  { id: 'hr-calendar',             label: 'HR Calendar',              icon: Calendar,       route: '/hr/calendar' },
];

const hrProfile = {
  name: 'HR Director',
  role: 'Human Resources',
  email: 'hr.director@gcso.gov',
  initials: 'HR',
};

const hrNotifications = [
  { id: 1, title: 'POST Cert Expiring', message: 'Sgt. Thompson — cert expires in 7 days, training not scheduled', time: '30 min ago', urgent: true },
  { id: 2, title: 'FMLA Deadline Today', message: 'Deputy Chen FMLA designation notice due by 17:00', time: '1 hour ago', urgent: true },
  { id: 3, title: 'New Applicant Submitted', message: 'Deputy Sheriff — 3 new applications received', time: '2 hours ago', urgent: false },
];
  return (
    <DashboardLayout navigation={hrNavigation} profile={hrProfile} notifications={hrNotifications} settingsRoute="/hr/settings">
      <div className="p-4 lg:p-6 min-h-full">
          <div className="max-w-7xl mx-auto space-y-6">

            {/* Section Title */}
            <div className="border-b border-border pb-4">
              <h2 className="text-lg font-bold text-primary tracking-wide">ACTIVE JOB POSTINGS - GWINNETT COUNTY SHERIFF'S OFFICE</h2>
            </div>

            {/* Deputy Sheriff I/II Posting */}
            <div className="bg-white dark:bg-slate-800/40 border border-border rounded-xl overflow-hidden">
              <button
                onClick={() => togglePosting('deputy')}
                className="w-full p-5 flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                    <Shield className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="text-lg font-bold text-primary">DEPUTY SHERIFF I/II</h3>
                      <span className="px-2 py-1 bg-green-500/20 border border-green-500/30 rounded text-xs text-green-400 font-bold">ACTIVE</span>
                      <span className="px-2 py-1 bg-red-500/20 border border-red-500/30 rounded text-xs text-red-400 font-bold">HIGH PRIORITY</span>
                    </div>
                    <p className="text-sm text-secondary">Patrol Division • Sheriff Keybo Taylor • Lawrenceville, Georgia</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right hidden md:block">
                    <p className="text-sm text-primary font-medium">23 Applicants • 8 Vacancies</p>
                    <p className="text-xs text-secondary">156 views • 111 days open</p>
                  </div>
                  {expandedPostings.deputy ? <ChevronUp className="w-5 h-5 text-secondary" /> : <ChevronDown className="w-5 h-5 text-secondary" />}
                </div>
              </button>

              {expandedPostings.deputy && (
                <div className="px-5 pb-5 space-y-6 border-t border-border">
                  {/* Posting Details */}
                  <div className="pt-5">
                    <h4 className="text-sm font-bold text-amber-700 uppercase tracking-wide mb-4">Posting Details</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="bg-white dark:bg-slate-900/40 rounded-lg p-4 border border-border">
                        <p className="text-xs text-slate-500 mb-1">Positions Available</p>
                        <p className="text-sm text-primary font-medium">8 vacancies (Patrol Division - all shifts)</p>
                        <div className="mt-2 text-xs text-secondary space-y-1">
                          <p>• A-Shift (Day): 3 vacancies - 06:00-18:00</p>
                          <p>• B-Shift (Evening): 2 vacancies - 14:00-02:00</p>
                          <p>• C-Shift (Night): 3 vacancies - 18:00-06:00</p>
                        </div>
                      </div>
                      <div className="bg-white dark:bg-slate-900/40 rounded-lg p-4 border border-border">
                        <p className="text-xs text-slate-500 mb-1">Posting Timeline</p>
                        <p className="text-sm text-primary font-medium">Posted: October 14, 2024 (111 days)</p>
                        <p className="text-xs text-green-400 mt-1">CONTINUOUS RECRUITMENT (open until filled)</p>
                      </div>
                      <div className="bg-white dark:bg-slate-900/40 rounded-lg p-4 border border-border">
                        <p className="text-xs text-slate-500 mb-1">Work Location</p>
                        <p className="text-sm text-primary font-medium">Gwinnett County, GA</p>
                        <p className="text-xs text-secondary mt-1">HQ: 2900 Commons Dr, Lawrenceville</p>
                        <p className="text-xs text-secondary">Patrol zones: Countywide</p>
                      </div>
                      <div className="bg-white dark:bg-slate-900/40 rounded-lg p-4 border border-border">
                        <p className="text-xs text-slate-500 mb-1">Salary Range</p>
                        <p className="text-sm text-primary font-medium">$48,000 - $63,000 annually</p>
                        <div className="mt-2 text-xs text-secondary space-y-1">
                          <p>• Step 1 (Entry): $48,000 base</p>
                          <p>• Step 5 (3 years): $55,200</p>
                          <p>• Step 10 (8+ years): $63,000</p>
                        </div>
                      </div>
                      <div className="bg-white dark:bg-slate-900/40 rounded-lg p-4 border border-border">
                        <p className="text-xs text-slate-500 mb-1">Shift Differential</p>
                        <p className="text-sm text-primary font-medium">+5% for B-Shift and C-Shift</p>
                        <p className="text-xs text-secondary mt-1">B-Shift: $50,400-66,150</p>
                        <p className="text-xs text-secondary">C-Shift: $50,400-66,150</p>
                      </div>
                      <div className="bg-white dark:bg-slate-900/40 rounded-lg p-4 border border-border">
                        <p className="text-xs text-slate-500 mb-1">Classification</p>
                        <p className="text-sm text-primary font-medium">SWORN LAW ENFORCEMENT DEPUTY</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Car className="w-4 h-4 text-blue-400" />
                          <span className="text-xs text-blue-400">Take-home vehicle after FTO</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Minimum Qualifications */}
                  <div>
                    <h4 className="text-sm font-bold text-amber-700 uppercase tracking-wide mb-4">Minimum Qualifications</h4>
                    <div className="bg-white dark:bg-slate-900/40 rounded-lg p-4 border border-border">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="text-secondary"><span className="text-primary font-medium">Age:</span> 21+ years (Georgia POST requirement)</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="text-secondary"><span className="text-primary font-medium">Education:</span> High school diploma or GED</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="text-secondary"><span className="text-primary font-medium">Certification:</span> Georgia POST Basic Law Enforcement OR academy eligible</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="text-secondary"><span className="text-primary font-medium">Driver's License:</span> Valid GA license, clean record</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="text-secondary"><span className="text-primary font-medium">Background:</span> Must pass POST-compliant investigation</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="text-secondary"><span className="text-primary font-medium">Physical:</span> GCSO fitness test (1.5-mi run, push-ups, sit-ups)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Benefits */}
                  <div>
                    <h4 className="text-sm font-bold text-amber-700 uppercase tracking-wide mb-4">GCSO Benefits Package</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                      <div className="bg-white dark:bg-slate-900/40 rounded-lg p-3 border border-border">
                        <Heart className="w-5 h-5 text-red-400 mb-2" />
                        <p className="text-xs text-primary font-medium">Health Insurance</p>
                        <p className="text-xs text-secondary">County-provided (employee + family)</p>
                      </div>
                      <div className="bg-white dark:bg-slate-900/40 rounded-lg p-3 border border-border">
                        <DollarSign className="w-5 h-5 text-green-400 mb-2" />
                        <p className="text-xs text-primary font-medium">Retirement</p>
                        <p className="text-xs text-secondary">Georgia Sheriff's Retirement (GSRS)</p>
                      </div>
                      <div className="bg-white dark:bg-slate-900/40 rounded-lg p-3 border border-border">
                        <Calendar className="w-5 h-5 text-blue-400 mb-2" />
                        <p className="text-xs text-primary font-medium">Paid Leave</p>
                        <p className="text-xs text-secondary">15 vacation + 12 sick days</p>
                      </div>
                      <div className="bg-white dark:bg-slate-900/40 rounded-lg p-3 border border-border">
                        <GraduationCap className="w-5 h-5 text-purple-400 mb-2" />
                        <p className="text-xs text-primary font-medium">Education Incentive</p>
                        <p className="text-xs text-secondary">Up to $5,000/year tuition</p>
                      </div>
                    </div>
                  </div>

                  {/* Recruitment Metrics */}
                  <div>
                    <h4 className="text-sm font-bold text-amber-700 uppercase tracking-wide mb-4">Recruitment Metrics</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-white dark:bg-slate-900/40 rounded-lg p-4 border border-border text-center">
                        <p className="text-2xl font-bold text-primary">23</p>
                        <p className="text-xs text-secondary">Total Applications</p>
                        <div className="mt-2 text-xs">
                          <span className="text-green-400">14 POST Certified</span>
                          <span className="text-slate-500"> | </span>
                          <span className="text-blue-400">9 Academy Req</span>
                        </div>
                      </div>
                      <div className="bg-white dark:bg-slate-900/40 rounded-lg p-4 border border-border text-center">
                        <p className="text-2xl font-bold text-primary">156</p>
                        <p className="text-xs text-secondary">Job Posting Views</p>
                      </div>
                      <div className="bg-white dark:bg-slate-900/40 rounded-lg p-4 border border-border text-center">
                        <p className="text-2xl font-bold text-amber-700">14.7%</p>
                        <p className="text-xs text-secondary">Conversion Rate</p>
                        <p className="text-xs text-amber-700 mt-1">Below target (20-25%)</p>
                      </div>
                      <div className="bg-white dark:bg-slate-900/40 rounded-lg p-4 border border-border text-center">
                        <p className="text-2xl font-bold text-primary">127</p>
                        <p className="text-xs text-secondary">Avg Days to Hire</p>
                      </div>
                    </div>
                  </div>

                  {/* Applicant Pipeline */}
                  <div>
                    <h4 className="text-sm font-bold text-amber-700 uppercase tracking-wide mb-4">Applicant Pipeline Status</h4>
                    <div className="bg-white dark:bg-slate-900/40 rounded-lg p-4 border border-border space-y-4">
                      {/* Pipeline stages */}
                      <div className="flex items-center gap-4">
                        <div className="w-32 text-xs text-secondary">Applications</div>
                        <div className="flex-1 bg-white dark:bg-slate-700/50 rounded-full h-6 relative overflow-hidden">
                          <div className="absolute inset-y-0 left-0 bg-blue-500 rounded-full" style={{width: '100%'}}></div>
                          <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-primary">23 received</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-32 text-xs text-secondary">Initial Screening</div>
                        <div className="flex-1 bg-white dark:bg-slate-700/50 rounded-full h-6 relative overflow-hidden">
                          <div className="absolute inset-y-0 left-0 bg-green-500 rounded-full" style={{width: '74%'}}></div>
                          <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-primary">17 passed • 6 disqualified</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-32 text-xs text-secondary">Oral Board</div>
                        <div className="flex-1 bg-white dark:bg-slate-700/50 rounded-full h-6 relative overflow-hidden">
                          <div className="absolute inset-y-0 left-0 bg-amber-500 rounded-full" style={{width: '53%'}}></div>
                          <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-primary">9 completed • 8 scheduled (Feb 06)</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-32 text-xs text-secondary">Background</div>
                        <div className="flex-1 bg-white dark:bg-slate-700/50 rounded-full h-6 relative overflow-hidden">
                          <div className="absolute inset-y-0 left-0 bg-purple-500 rounded-full" style={{width: '39%'}}></div>
                          <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-primary">5 in progress • 4 cleared • 2 disqualified</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-32 text-xs text-secondary">Final Offers</div>
                        <div className="flex-1 bg-white dark:bg-slate-700/50 rounded-full h-6 relative overflow-hidden">
                          <div className="absolute inset-y-0 left-0 bg-green-400 rounded-full" style={{width: '13%'}}></div>
                          <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-primary">3 extended • 2 accepted • 1 pending</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Competitive Intelligence */}
                  <div>
                    <h4 className="text-sm font-bold text-amber-700 uppercase tracking-wide mb-4">Competitive Intelligence - Metro Atlanta Agencies</h4>
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="w-5 h-5 text-red-400" />
                        <span className="text-sm font-bold text-red-400">GCSO SALARY CONCERNS - Below market rate</span>
                      </div>
                      <p className="text-xs text-secondary">GCSO starting pay ($48,000) is 12.8% below Gwinnett County Police ($54,120) - competing for same applicant pool</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      <div className="bg-white dark:bg-slate-900/40 rounded-lg p-3 border border-border">
                        <p className="text-xs font-medium text-primary">Gwinnett County Police Dept</p>
                        <p className="text-sm text-red-400 font-bold">$54,120 starting</p>
                        <div className="flex items-center gap-1 text-xs text-red-400 mt-1">
                          <ArrowUpRight className="w-3 h-3" />
                          <span>+12.8% vs GCSO</span>
                        </div>
                      </div>
                      <div className="bg-white dark:bg-slate-900/40 rounded-lg p-3 border border-border">
                        <p className="text-xs font-medium text-primary">Atlanta Police Dept</p>
                        <p className="text-sm text-red-400 font-bold">$58,000 starting</p>
                        <div className="flex items-center gap-1 text-xs text-red-400 mt-1">
                          <ArrowUpRight className="w-3 h-3" />
                          <span>+20.8% vs GCSO + $10K bonus</span>
                        </div>
                      </div>
                      <div className="bg-white dark:bg-slate-900/40 rounded-lg p-3 border border-border">
                        <p className="text-xs font-medium text-primary">Fulton County Sheriff</p>
                        <p className="text-sm text-amber-700 font-bold">$52,500 starting</p>
                        <div className="flex items-center gap-1 text-xs text-amber-700 mt-1">
                          <ArrowUpRight className="w-3 h-3" />
                          <span>+9.4% vs GCSO + $5K bonus</span>
                        </div>
                      </div>
                      <div className="bg-white dark:bg-slate-900/40 rounded-lg p-3 border border-border">
                        <p className="text-xs font-medium text-primary">Cobb County Sheriff</p>
                        <p className="text-sm text-amber-700 font-bold">$49,800 starting</p>
                        <div className="flex items-center gap-1 text-xs text-amber-700 mt-1">
                          <ArrowUpRight className="w-3 h-3" />
                          <span>+3.8% vs GCSO</span>
                        </div>
                      </div>
                      <div className="bg-white dark:bg-slate-900/40 rounded-lg p-3 border border-border">
                        <p className="text-xs font-medium text-primary">DeKalb County Sheriff</p>
                        <p className="text-sm text-green-400 font-bold">$46,200 starting</p>
                        <div className="flex items-center gap-1 text-xs text-green-400 mt-1">
                          <ArrowDownRight className="w-3 h-3" />
                          <span>-3.8% vs GCSO</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recommended Actions */}
                  <div>
                    <h4 className="text-sm font-bold text-amber-700 uppercase tracking-wide mb-4">Recommended Actions</h4>
                    <div className="space-y-2">
                      <div className="flex items-start gap-3 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-secondary">Proceed with February 06 oral board interviews (8 candidates)</span>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-secondary">Follow up with J. Wilson on pending offer (deadline 02/05)</span>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                        <AlertTriangle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-secondary"><span className="font-semibold">URGENT:</span> Request Sheriff/Command Staff review of deputy starting salary to address 12.8% gap with Gwinnett County PD</span>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                        <AlertTriangle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-secondary">Consider hiring incentives: Sign-on bonus, accelerated take-home vehicle, enhanced shift differential</span>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                        <AlertTriangle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-secondary">Evaluate adding 3rd background investigator to reduce time-to-hire (currently 127 days avg)</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-all">
                      <Users className="w-4 h-4" />
                      View All Applications
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-700/60 hover:bg-slate-700/80 text-primary rounded-lg text-sm transition-all">
                      <Edit className="w-4 h-4" />
                      Edit Posting
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-700/60 hover:bg-slate-700/80 text-primary rounded-lg text-sm transition-all">
                      <Calendar className="w-4 h-4" />
                      Schedule Oral Boards
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-700/60 hover:bg-slate-700/80 text-primary rounded-lg text-sm transition-all">
                      <Scale className="w-4 h-4" />
                      Competitive Salary Analysis
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Background Investigator Posting */}
            <div className="bg-white dark:bg-slate-800/40 border border-border rounded-xl overflow-hidden">
              <button
                onClick={() => togglePosting('investigator')}
                className="w-full p-5 flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                    <Search className="w-6 h-6 text-purple-400" />
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="text-lg font-bold text-primary">BACKGROUND INVESTIGATOR</h3>
                      <span className="px-2 py-1 bg-green-500/20 border border-green-500/30 rounded text-xs text-green-400 font-bold">ACTIVE</span>
                      <span className="px-2 py-1 bg-red-500/20 border border-red-500/30 rounded text-xs text-red-400 font-bold">HIGH PRIORITY</span>
                    </div>
                    <p className="text-sm text-secondary">HR / Internal Affairs • GCSO Headquarters</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right hidden md:block">
                    <p className="text-sm text-primary font-medium">12 Applicants • 2 Vacancies</p>
                    <p className="text-xs text-secondary">89 views • 110 days open</p>
                  </div>
                  {expandedPostings.investigator ? <ChevronUp className="w-5 h-5 text-secondary" /> : <ChevronDown className="w-5 h-5 text-secondary" />}
                </div>
              </button>

              {expandedPostings.investigator && (
                <div className="px-5 pb-5 space-y-6 border-t border-border">
                  <div className="pt-5">
                    <h4 className="text-sm font-bold text-amber-700 uppercase tracking-wide mb-4">Posting Details</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="bg-white dark:bg-slate-900/40 rounded-lg p-4 border border-border">
                        <p className="text-xs text-slate-500 mb-1">Positions Available</p>
                        <p className="text-sm text-primary font-medium">2 vacancies</p>
                        <p className="text-xs text-secondary mt-1">Internal Affairs Division / HR Dept</p>
                      </div>
                      <div className="bg-white dark:bg-slate-900/40 rounded-lg p-4 border border-border">
                        <p className="text-xs text-slate-500 mb-1">Posting Timeline</p>
                        <p className="text-sm text-primary font-medium">Posted: October 15, 2024 (110 days)</p>
                        <p className="text-xs text-amber-700 mt-1">EXTENDED TO: February 28, 2026</p>
                      </div>
                      <div className="bg-white dark:bg-slate-900/40 rounded-lg p-4 border border-border">
                        <p className="text-xs text-slate-500 mb-1">Salary Range</p>
                        <p className="text-sm text-primary font-medium">$55,000 - $68,000 annually</p>
                        <p className="text-xs text-secondary mt-1">Mon-Fri, 08:00-17:00</p>
                      </div>
                    </div>
                  </div>

                  {/* Qualifications */}
                  <div>
                    <h4 className="text-sm font-bold text-amber-700 uppercase tracking-wide mb-4">Minimum Qualifications</h4>
                    <div className="bg-white dark:bg-slate-900/40 rounded-lg p-4 border border-border">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="text-secondary"><span className="text-primary font-medium">POST Cert:</span> Georgia POST Basic Law Enforcement - REQUIRED</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="text-secondary"><span className="text-primary font-medium">Experience:</span> 3+ years sworn law enforcement</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="text-secondary"><span className="text-primary font-medium">Skills:</span> Report writing, interview techniques, records research</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="text-secondary"><span className="text-primary font-medium">Clearances:</span> GCIC/NCIC access, CJIS security</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Applicant Breakdown */}
                  <div>
                    <h4 className="text-sm font-bold text-amber-700 uppercase tracking-wide mb-4">Applicant Pool</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white dark:bg-slate-900/40 rounded-lg p-4 border border-border">
                        <p className="text-sm font-medium text-primary mb-3">Internal Applicants (7)</p>
                        <div className="space-y-2 text-xs text-secondary">
                          <p>• Cpl. M. Johnson - Patrol Division (6 yrs GCSO)</p>
                          <p>• Deputy R. Williams - Criminal Investigations (5 yrs)</p>
                          <p>• Deputy K. Thompson - Patrol Division (4 yrs)</p>
                          <p>• Sgt. L. Martinez - Court Services (8 yrs)</p>
                          <p>• Deputy J. Chen - Patrol Division (3.5 yrs)</p>
                          <p>• Deputy S. Anderson - Detention Center (4 yrs)</p>
                          <p>• Deputy T. Wilson - Training Division (7 yrs)</p>
                        </div>
                      </div>
                      <div className="bg-white dark:bg-slate-900/40 rounded-lg p-4 border border-border">
                        <p className="text-sm font-medium text-primary mb-3">External Applicants (5)</p>
                        <div className="space-y-2 text-xs text-secondary">
                          <p>• Deputy K. Davis - DeKalb County Sheriff (5 yrs)</p>
                          <p>• Detective M. Brown - Clayton County Police (6 yrs)</p>
                          <p>• Investigator R. Garcia - Cobb County Sheriff (4 yrs)</p>
                          <p>• Deputy L. Robinson - Forsyth County Sheriff (3.5 yrs)</p>
                          <p>• Sgt. J. Peterson - Barrow County Sheriff (7 yrs)</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Interview Schedule */}
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Calendar className="w-5 h-5 text-blue-400" />
                      <span className="text-sm font-bold text-blue-400">Command Interview Panel Scheduled</span>
                    </div>
                    <div className="text-sm text-secondary space-y-1">
                      <p><span className="text-primary font-medium">Date:</span> February 11, 2026 • 10:00 AM - 15:00 PM</p>
                      <p><span className="text-primary font-medium">Location:</span> GCSO Headquarters, Sheriff's Conference Room</p>
                      <p><span className="text-primary font-medium">Panel:</span> Major R. Davis (IA Commander), HR Director, Lt. K. Hayes (Sr. Background Investigator)</p>
                      <p><span className="text-primary font-medium">Candidates:</span> 9 applicants (all qualified)</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-all">
                      <Users className="w-4 h-4" />
                      View All Applications
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-700/60 hover:bg-slate-700/80 text-primary rounded-lg text-sm transition-all">
                      <FileText className="w-4 h-4" />
                      Interview Materials
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-700/60 hover:bg-slate-700/80 text-primary rounded-lg text-sm transition-all">
                      <Mail className="w-4 h-4" />
                      Direct Recruitment Outreach
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Detention Officer Posting */}
            <div className="bg-white dark:bg-slate-800/40 border border-border rounded-xl overflow-hidden">
              <button
                onClick={() => togglePosting('detention')}
                className="w-full p-5 flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center">
                    <Building className="w-6 h-6 text-amber-700" />
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="text-lg font-bold text-primary">DETENTION OFFICER</h3>
                      <span className="px-2 py-1 bg-green-500/20 border border-green-500/30 rounded text-xs text-green-400 font-bold">ACTIVE</span>
                    </div>
                    <p className="text-sm text-secondary">Gwinnett County Detention Center • 750 Hi Hope Rd</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right hidden md:block">
                    <p className="text-sm text-primary font-medium">8 Applicants • 1 Vacancy</p>
                    <p className="text-xs text-secondary">67 views • 98 days open</p>
                  </div>
                  {expandedPostings.detention ? <ChevronUp className="w-5 h-5 text-secondary" /> : <ChevronDown className="w-5 h-5 text-secondary" />}
                </div>
              </button>

              {expandedPostings.detention && (
                <div className="px-5 pb-5 space-y-6 border-t border-border">
                  <div className="pt-5">
                    <h4 className="text-sm font-bold text-amber-700 uppercase tracking-wide mb-4">Posting Details</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="bg-white dark:bg-slate-900/40 rounded-lg p-4 border border-border">
                        <p className="text-xs text-slate-500 mb-1">Positions Available</p>
                        <p className="text-sm text-primary font-medium">1 vacancy</p>
                        <p className="text-xs text-secondary mt-1">Gwinnett County Detention Center</p>
                      </div>
                      <div className="bg-white dark:bg-slate-900/40 rounded-lg p-4 border border-border">
                        <p className="text-xs text-slate-500 mb-1">Posting Timeline</p>
                        <p className="text-sm text-primary font-medium">Posted: October 27, 2024 (98 days)</p>
                        <p className="text-xs text-amber-700 mt-1">EXTENDED TO: March 31, 2026</p>
                      </div>
                      <div className="bg-white dark:bg-slate-900/40 rounded-lg p-4 border border-border">
                        <p className="text-xs text-slate-500 mb-1">Salary Range</p>
                        <p className="text-sm text-primary font-medium">$42,000 - $52,000 annually</p>
                        <p className="text-xs text-secondary mt-1">12-hr rotating shifts (Days/Nights)</p>
                      </div>
                    </div>
                  </div>

                  {/* Critical Alert */}
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-5 h-5 text-red-400" />
                      <span className="text-sm font-bold text-red-400">CRITICAL RECRUITMENT FAILURE</span>
                    </div>
                    <div className="text-xs text-secondary space-y-1">
                      <p>• Only 8 applications in 98 days for 1 vacancy (very poor)</p>
                      <p>• Detention positions historically difficult to fill</p>
                      <p>• Lower pay than patrol ($42K vs $48K starting)</p>
                      <p>• Competing with Gwinnett County Police ($54K) for same applicants</p>
                    </div>
                  </div>

                  {/* Competitive Analysis */}
                  <div>
                    <h4 className="text-sm font-bold text-amber-700 uppercase tracking-wide mb-4">Competitive Position</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="bg-white dark:bg-slate-900/40 rounded-lg p-3 border border-border">
                        <p className="text-xs font-medium text-primary">Fulton County Sheriff</p>
                        <p className="text-sm text-red-400 font-bold">$45,000 + $3K bonus</p>
                        <div className="flex items-center gap-1 text-xs text-red-400 mt-1">
                          <ArrowUpRight className="w-3 h-3" />
                          <span>+7.1% vs GCSO</span>
                        </div>
                      </div>
                      <div className="bg-white dark:bg-slate-900/40 rounded-lg p-3 border border-border">
                        <p className="text-xs font-medium text-primary">Cobb County Sheriff</p>
                        <p className="text-sm text-amber-700 font-bold">$43,500 starting</p>
                        <div className="flex items-center gap-1 text-xs text-amber-700 mt-1">
                          <ArrowUpRight className="w-3 h-3" />
                          <span>+3.6% vs GCSO</span>
                        </div>
                      </div>
                      <div className="bg-white dark:bg-slate-900/40 rounded-lg p-3 border border-border">
                        <p className="text-xs font-medium text-primary">DeKalb County Sheriff</p>
                        <p className="text-sm text-green-400 font-bold">$40,000 starting</p>
                        <div className="flex items-center gap-1 text-xs text-green-400 mt-1">
                          <ArrowDownRight className="w-3 h-3" />
                          <span>-4.8% vs GCSO</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div>
                    <h4 className="text-sm font-bold text-amber-700 uppercase tracking-wide mb-4">Urgent Recommendations</h4>
                    <div className="space-y-2">
                      <div className="flex items-start gap-3 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                        <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-secondary">Increase salary to $45K-47K to match Fulton/Cobb</span>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                        <AlertTriangle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-secondary">Consider sign-on bonus ($2,000-3,000) and enhanced shift differential</span>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                        <AlertTriangle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-secondary">Expand recruitment: Criminal justice colleges, military veteran outreach</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-all">
                      <Users className="w-4 h-4" />
                      View Applications
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm transition-all">
                      <Edit className="w-4 h-4" />
                      Close & Repost with Incentives
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-700/60 hover:bg-slate-700/80 text-primary rounded-lg text-sm transition-all">
                      <Scale className="w-4 h-4" />
                      Sheriff Compensation Review
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Administrative Assistant Posting */}
            <div className="bg-white dark:bg-slate-800/40 border border-red-500/30 rounded-xl overflow-hidden">
              <button
                onClick={() => togglePosting('admin')}
                className="w-full p-5 flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-red-400" />
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="text-lg font-bold text-primary">ADMINISTRATIVE ASSISTANT</h3>
                      <span className="px-2 py-1 bg-green-500/20 border border-green-500/30 rounded text-xs text-green-400 font-bold">ACTIVE</span>
                      <span className="px-2 py-1 bg-red-500/20 border border-red-500/30 rounded text-xs text-red-400 font-bold animate-pulse">CRITICALLY LOW</span>
                    </div>
                    <p className="text-sm text-secondary">Administrative Services • GCSO Headquarters</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right hidden md:block">
                    <p className="text-sm text-primary font-medium">4 Applicants • 1 Vacancy</p>
                    <p className="text-xs text-red-400 font-medium">Closes Feb 11 (9 days)</p>
                  </div>
                  {expandedPostings.admin ? <ChevronUp className="w-5 h-5 text-secondary" /> : <ChevronDown className="w-5 h-5 text-secondary" />}
                </div>
              </button>

              {expandedPostings.admin && (
                <div className="px-5 pb-5 space-y-6 border-t border-border">
                  <div className="pt-5">
                    <h4 className="text-sm font-bold text-amber-700 uppercase tracking-wide mb-4">Posting Details</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="bg-white dark:bg-slate-900/40 rounded-lg p-4 border border-border">
                        <p className="text-xs text-slate-500 mb-1">Positions Available</p>
                        <p className="text-sm text-primary font-medium">1 vacancy</p>
                        <p className="text-xs text-secondary mt-1">Classification: CIVILIAN</p>
                      </div>
                      <div className="bg-white dark:bg-slate-900/40 rounded-lg p-4 border border-border">
                        <p className="text-xs text-slate-500 mb-1">Posting Timeline</p>
                        <p className="text-sm text-primary font-medium">Posted: October 31, 2024 (94 days)</p>
                        <p className="text-xs text-red-400 font-bold mt-1">CLOSES: February 11, 2026 (9 DAYS)</p>
                      </div>
                      <div className="bg-white dark:bg-slate-900/40 rounded-lg p-4 border border-border">
                        <p className="text-xs text-slate-500 mb-1">Salary Range</p>
                        <p className="text-sm text-primary font-medium">$38,000 - $45,000 annually</p>
                        <p className="text-xs text-secondary mt-1">Mon-Fri, 08:00-17:00</p>
                      </div>
                    </div>
                  </div>

                  {/* Critical Alert */}
                  <div className="bg-red-500/15 border-2 border-red-500/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle className="w-6 h-6 text-red-400" />
                      <span className="text-base font-bold text-red-400">CRITICAL RECRUITMENT FAILURE - IMMEDIATE ACTION NEEDED</span>
                    </div>
                    <div className="text-sm text-secondary space-y-2">
                      <p>• <span className="text-red-400 font-bold">Only 4 applications</span> in 94 days (should have 20-30 minimum)</p>
                      <p>• Extremely low visibility: Only 45 views in 94 days</p>
                      <p>• <span className="text-red-400 font-bold">Posting closes in 9 days</span> with grossly insufficient applicants</p>
                      <p>• Application conversion rate: 8.9% (critically low)</p>
                    </div>
                  </div>

                  {/* Root Cause */}
                  <div>
                    <h4 className="text-sm font-bold text-amber-700 uppercase tracking-wide mb-4">Root Cause Analysis</h4>
                    <div className="bg-white dark:bg-slate-900/40 rounded-lg p-4 border border-border">
                      <div className="space-y-3 text-sm text-secondary">
                        <p><span className="text-primary font-medium">Salary not competitive:</span> GCSO pays $38K-45K, but other Gwinnett County departments pay $42K-50K (+10% more)</p>
                        <p><span className="text-primary font-medium">Private sector gap:</span> Gwinnett County businesses pay $42K-52K (10-16% more than GCSO)</p>
                        <p><span className="text-primary font-medium">Experience requirement:</span> 2+ years may be too high for $38K starting salary</p>
                        <p><span className="text-primary font-medium">Low visibility:</span> Only 45 views - not using civilian job boards effectively</p>
                      </div>
                    </div>
                  </div>

                  {/* Competitive Analysis */}
                  <div>
                    <h4 className="text-sm font-bold text-amber-700 uppercase tracking-wide mb-4">Salary Comparison</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="bg-white dark:bg-slate-900/40 rounded-lg p-3 border border-border">
                        <p className="text-xs font-medium text-primary">Gwinnett County Government (other depts)</p>
                        <p className="text-sm text-red-400 font-bold">$42,000 - $50,000</p>
                        <p className="text-xs text-red-400">GCSO pays 9.5-11.1% LESS</p>
                      </div>
                      <div className="bg-white dark:bg-slate-900/40 rounded-lg p-3 border border-border">
                        <p className="text-xs font-medium text-primary">Gwinnett County Public Schools</p>
                        <p className="text-sm text-amber-700 font-bold">$40,000 - $48,000</p>
                        <p className="text-xs text-amber-700">GCSO pays 5-6.7% less</p>
                      </div>
                      <div className="bg-white dark:bg-slate-900/40 rounded-lg p-3 border border-border">
                        <p className="text-xs font-medium text-primary">Private Sector (Gwinnett area)</p>
                        <p className="text-sm text-red-400 font-bold">$42,000 - $52,000</p>
                        <p className="text-xs text-red-400">GCSO pays 10.5-15.6% less</p>
                      </div>
                      <div className="bg-white dark:bg-slate-900/40 rounded-lg p-3 border border-border">
                        <p className="text-xs font-medium text-primary">Other Sheriff's Offices</p>
                        <p className="text-sm text-green-400 font-bold">$37,000 - $48,000</p>
                        <p className="text-xs text-green-400">GCSO competitive with peers</p>
                      </div>
                    </div>
                  </div>

                  {/* Urgent Actions */}
                  <div>
                    <h4 className="text-sm font-bold text-red-400 uppercase tracking-wide mb-4">URGENT ACTIONS REQUIRED (9 DAYS)</h4>
                    <div className="space-y-2">
                      <div className="flex items-start gap-3 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                        <span className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">1</span>
                        <span className="text-sm text-secondary"><span className="font-bold text-primary">EXTEND POSTING</span> to March 31, 2026 (need more time)</span>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                        <span className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">2</span>
                        <span className="text-sm text-secondary"><span className="font-bold text-primary">INCREASE SALARY</span> to $42,000-50,000 (match county departments)</span>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                        <span className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">3</span>
                        <span className="text-sm text-secondary"><span className="font-bold text-primary">REDUCE EXPERIENCE</span> requirement to 1-2 years (from 2+)</span>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                        <span className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">4</span>
                        <span className="text-sm text-secondary"><span className="font-bold text-primary">EXPAND MARKETING:</span> Indeed.com, LinkedIn, Gwinnett County Jobs, local colleges</span>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                        <span className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">5</span>
                        <span className="text-sm text-secondary"><span className="font-bold text-primary">REQUEST BUDGET APPROVAL</span> from Sheriff Taylor for salary increase</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-amber-700" />
                      <span className="text-sm text-amber-300"><span className="font-bold">DO NOT</span> proceed with interviews of only 3 candidates - insufficient pool (need 8-12 minimum)</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
                    <button className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-all">
                      <Calendar className="w-4 h-4" />
                      EXTEND POSTING DEADLINE
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm transition-all">
                      <DollarSign className="w-4 h-4" />
                      REVISE SALARY RANGE
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-700/60 hover:bg-slate-700/80 text-primary rounded-lg text-sm transition-all">
                      <FileText className="w-4 h-4" />
                      Sheriff Budget Request
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-700/60 hover:bg-slate-700/80 text-primary rounded-lg text-sm transition-all">
                      <Users className="w-4 h-4" />
                      View 4 Applications
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </main>

        {/* System Footer */}
        <footer className="border-t border-border px-6 py-3 bg-slate-50 dark:bg-slate-900/30">
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
            <span>System: GCSO-HRIS v4.2 | Last Updated: {formattedTime} EST</span>
            <span>Gwinnett County Sheriff's Office • Human Resources Division</span>
          </div>
        </footer>
      </div>

      {/* AI Chat Button */}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 z-40"
      >
        {chatOpen ? <X className="w-6 h-6 text-primary" /> : <MessageCircle className="w-6 h-6 text-primary" />}
      </button>

      {chatOpen && (
        <div className="fixed bottom-24 right-6 w-full max-w-96 h-[500px] bg-surface-raised backdrop-blur-xl border border-border rounded-2xl shadow-2xl flex flex-col z-40 mx-4 sm:mx-0">
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-primary">GCSO Recruitment AI</h3>
                <p className="text-xs text-green-400">Online</p>
              </div>
            </div>
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1">
                <div className="bg-white dark:bg-slate-800/60 p-3 rounded-xl">
                  <p className="text-sm text-slate-700 dark:text-slate-200">Hi! I can help analyze recruitment metrics, suggest salary adjustments based on competitive intelligence, draft job descriptions for GCSO positions, and recommend recruitment strategies. What would you like help with?</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-2">
              <input type="text" placeholder="Ask about GCSO recruitment..." className="flex-1 px-4 py-2 bg-white dark:bg-slate-800/40 border border-border rounded-xl text-primary placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500/50" />
              <button className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                <Send className="w-5 h-5 text-primary" />
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </DashboardLayout>
  );
}
