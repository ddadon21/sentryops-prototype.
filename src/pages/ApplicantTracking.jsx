import React, { useState } from 'react';
import {
  Users, FileText, LayoutDashboard, TrendingUp, Bell, MessageCircle,
  Search, ChevronRight, CheckCircle, Shield, X, Send, Menu, ChevronLeft,
  LogOut, UserPlus, Briefcase, Clock, Award, Filter, Download, Eye, Mail,
  Phone, MapPin, Calendar, FileCheck, ClipboardCheck, GraduationCap,
  ChevronDown, ChevronUp, AlertTriangle, AlertCircle, Building, User,
  ExternalLink, Printer, Flag, MessageSquare, Car, BadgeCheck
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import DashboardLayout from '../layouts/DashboardLayout';

export default function ApplicantTracking() {
  const navigate = useNavigate();  const [activeTab, setActiveTab] = useState('all');
  const [filterPosition, setFilterPosition] = useState('all');
  const [expandedApplicant, setExpandedApplicant] = useState('marcus');

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
    { id: 'job-postings', label: 'Job Postings', icon: Briefcase, page: 'JobPostings' },
    { id: 'applicant-tracking', label: 'Applicant Tracking', icon: UserPlus },
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
    { id: 1, title: '8 Oral Boards Scheduled', message: 'Deputy Sheriff interviews Feb 06, 2026 - review files', time: '15 min ago', urgent: true },
    { id: 2, title: 'Offer Deadline', message: 'J. Wilson acceptance deadline Feb 05 - follow up required', time: '1 hour ago', urgent: true },
    { id: 3, title: 'Background Complete', message: 'R. Martinez background cleared - ready for medical', time: '2 hours ago', urgent: false }
  ];

  const statusCounts = {
    all: 77,
    new: 8,
    screening: 12,
    interview: 17,
    background: 5,
    offer: 3,
    rejected: 9
  };

  const toggleApplicant = (id) => {
    setExpandedApplicant(expandedApplicant === id ? null : id);
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
          <div className="max-w-7xl mx-auto">

            {/* Section Title */}
            <div className="border-b border-border pb-4 mb-6">
              <h2 className="text-lg font-bold text-primary tracking-wide">APPLICANT PIPELINE - GWINNETT COUNTY SHERIFF'S OFFICE</h2>
            </div>

            {/* Status Tabs */}
            <div className="mb-6 flex gap-2 border-b border-border overflow-x-auto">
              {[
                { id: 'all', label: 'All Applicants', count: statusCounts.all },
                { id: 'new', label: 'New', count: statusCounts.new },
                { id: 'screening', label: 'Screening', count: statusCounts.screening },
                { id: 'interview', label: 'Interview', count: statusCounts.interview },
                { id: 'background', label: 'Background Check', count: statusCounts.background },
                { id: 'offer', label: 'Offer', count: statusCounts.offer },
                { id: 'rejected', label: 'Rejected', count: statusCounts.rejected }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all relative whitespace-nowrap ${
                    activeTab === tab.id ? 'text-amber-700' : 'text-secondary hover:text-slate-300'
                  }`}
                >
                  {tab.label}
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    activeTab === tab.id ? 'bg-amber-500/20 text-amber-700' : 'bg-white dark:bg-slate-700/50 text-slate-500'
                  }`}>{tab.count}</span>
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500"></div>
                  )}
                </button>
              ))}
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search applicants by name, reference #, position..."
                  className="w-full pl-12 pr-4 py-2.5 bg-white dark:bg-slate-800/40 border border-border rounded-xl text-primary placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
                />
              </div>
              <select
                value={filterPosition}
                onChange={(e) => setFilterPosition(e.target.value)}
                className="px-4 py-2.5 bg-white dark:bg-slate-800/40 border border-border rounded-xl text-primary text-sm focus:outline-none focus:border-amber-500/50 cursor-pointer"
              >
                <option value="all">All Positions</option>
                <option value="deputy">Deputy Sheriff (23)</option>
                <option value="investigator">Background Investigator (12)</option>
                <option value="detention">Detention Officer (8)</option>
                <option value="admin">Administrative Assistant (4)</option>
              </select>
              <select className="px-4 py-2.5 bg-white dark:bg-slate-800/40 border border-border rounded-xl text-primary text-sm focus:outline-none focus:border-amber-500/50 cursor-pointer">
                <option>Sort: Application Date</option>
                <option>Sort: Last Name A-Z</option>
                <option>Sort: Position</option>
                <option>Sort: Pipeline Stage</option>
              </select>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800/40 border border-border rounded-xl text-primary text-sm hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all">
                <Filter className="w-4 h-4" />
                More Filters
              </button>
            </div>

            {/* Applicant List */}
            <div className="space-y-6">

              {/* Marcus Johnson - Screening Stage */}
              <div className="bg-white dark:bg-slate-800/40 border border-border rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleApplicant('marcus')}
                  className="w-full p-5 flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-purple-400" />
                    </div>
                    <div className="text-left">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="text-lg font-bold text-primary">MARCUS JOHNSON</h3>
                        <span className="px-2 py-1 bg-purple-500/20 border border-purple-500/30 rounded text-xs text-purple-400 font-bold">SCREENING</span>
                      </div>
                      <p className="text-sm text-secondary">Deputy Sheriff (Patrol Division) • Ref: 2026-APP-0142</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right hidden md:block">
                      <p className="text-sm text-primary font-medium">Applied: Oct 12, 2024</p>
                      <p className="text-xs text-amber-700">Interview Scheduled: Feb 06</p>
                    </div>
                    {expandedApplicant === 'marcus' ? <ChevronUp className="w-5 h-5 text-secondary" /> : <ChevronDown className="w-5 h-5 text-secondary" />}
                  </div>
                </button>

                {expandedApplicant === 'marcus' && (
                  <div className="px-5 pb-5 space-y-5 border-t border-border">
                    {/* Contact Info */}
                    <div className="pt-5 grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-4 h-4 text-slate-500" />
                        <span className="text-secondary">marcus.johnson@email.com</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-4 h-4 text-slate-500" />
                        <span className="text-secondary">(555) 234-5678</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-slate-500" />
                        <span className="text-secondary">Lawrenceville, GA 30046</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-slate-500" />
                        <span className="text-secondary">Applied: Oct 12, 2024 (113 days)</span>
                      </div>
                    </div>

                    {/* Qualifications */}
                    <div>
                      <h4 className="text-sm font-bold text-amber-700 uppercase tracking-wide mb-3">Qualifications Summary</h4>
                      <div className="bg-white dark:bg-slate-900/40 rounded-lg p-4 border border-border space-y-3">
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Experience</p>
                          <p className="text-sm text-primary font-medium">5 years law enforcement</p>
                          <p className="text-xs text-secondary">Metro Atlanta Police Department (2019-2024) • Patrol Officer, North Precinct</p>
                          <p className="text-xs text-secondary">Reason for leaving: Seeking career advancement with GCSO</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-slate-500 mb-1">Education</p>
                            <p className="text-sm text-primary">Bachelor's Degree - Criminal Justice</p>
                            <p className="text-xs text-secondary">Georgia State University (Graduated 2018)</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 mb-1">POST Certification</p>
                            <p className="text-sm text-primary">Georgia POST Basic #48291</p>
                            <p className="text-xs text-green-400">Issued: 06/15/2019 • Expires: 06/15/2027 (Current ✓)</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Additional Certifications</p>
                          <div className="flex flex-wrap gap-2">
                            <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">Field Training Officer (2022)</span>
                            <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">Crisis Intervention (2021)</span>
                            <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">Defensive Tactics Instructor (2023)</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Documents */}
                    <div>
                      <h4 className="text-sm font-bold text-amber-700 uppercase tracking-wide mb-3">Documents Submitted</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-secondary">Employment Application</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-secondary">Resume (2 pages)</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-secondary">Cover Letter</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-secondary">POST Certificate</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-secondary">College Transcript</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <div className="w-4 h-4 border border-slate-600 rounded-full"></div>
                          <span>References (3 listed, not contacted)</span>
                        </div>
                      </div>
                    </div>

                    {/* Screening Status */}
                    <div>
                      <h4 className="text-sm font-bold text-amber-700 uppercase tracking-wide mb-3">Screening Status</h4>
                      <div className="bg-white dark:bg-slate-900/40 rounded-lg p-4 border border-border space-y-3">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm text-primary font-medium">Initial Application Review: PASSED (10/15/2024)</p>
                            <p className="text-xs text-secondary">Reviewed by: HR Specialist J. Martinez</p>
                            <p className="text-xs text-secondary">Met minimum qualifications: Age 21+ ✓, POST cert ✓, HS/GED ✓</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm text-primary font-medium">Background Pre-Screen: PASSED (10/18/2024)</p>
                            <p className="text-xs text-secondary">GCIC check: No disqualifying convictions ✓</p>
                            <p className="text-xs text-secondary">Driving record: Clean ✓ | Employment: Verified current employment ✓</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm text-primary font-medium">Physical Fitness Test: PASSED (10/22/2024)</p>
                            <p className="text-xs text-secondary">Location: GCSO Training Center (Cooper Standards)</p>
                            <p className="text-xs text-secondary">1.5-mi run: 11:45 (PASS) | Push-ups: 42 (PASS) | Sit-ups: 48 (PASS) | 300m: 52s (PASS)</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Next Steps */}
                    <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Calendar className="w-5 h-5 text-amber-700" />
                        <span className="text-sm font-bold text-amber-700">ORAL BOARD INTERVIEW SCHEDULED</span>
                      </div>
                      <div className="text-sm text-secondary space-y-1">
                        <p><span className="text-primary font-medium">Date:</span> February 06, 2026 • 09:30 AM (30-minute slot)</p>
                        <p><span className="text-primary font-medium">Location:</span> GCSO Headquarters, 2900 Commons Dr, Conference Room B</p>
                        <p><span className="text-primary font-medium">Panel:</span> Major R. Davis (Chair), Lt. K. Williams, Lt. M. Thompson</p>
                        <p><span className="text-primary font-medium">Format:</span> Structured interview (30 questions, scenario-based, writing sample)</p>
                        <p><span className="text-green-400">✓ Applicant Confirmed Attendance: 01/26/2026</span></p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
                      <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-all">
                        <Eye className="w-4 h-4" />
                        View Full Application
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-700/60 hover:bg-slate-700/80 text-primary rounded-lg text-sm transition-all">
                        <Mail className="w-4 h-4" />
                        Email Applicant
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-700/60 hover:bg-slate-700/80 text-primary rounded-lg text-sm transition-all">
                        <Printer className="w-4 h-4" />
                        Print Interview Score Sheet
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-700/60 hover:bg-slate-700/80 text-primary rounded-lg text-sm transition-all">
                        <Flag className="w-4 h-4" />
                        Flag for Review
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Sarah Chen - Interview Stage */}
              <div className="bg-white dark:bg-slate-800/40 border border-border rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleApplicant('sarah')}
                  className="w-full p-5 flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-amber-700" />
                    </div>
                    <div className="text-left">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="text-lg font-bold text-primary">SARAH CHEN</h3>
                        <span className="px-2 py-1 bg-amber-500/20 border border-amber-500/30 rounded text-xs text-amber-700 font-bold">INTERVIEW COMPLETED</span>
                        <span className="px-2 py-1 bg-green-500/20 border border-green-500/30 rounded text-xs text-green-400 font-bold">TOP CANDIDATE</span>
                      </div>
                      <p className="text-sm text-secondary">Background Investigator (HR/IA) • Ref: 2026-APP-0087</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right hidden md:block">
                      <p className="text-sm text-primary font-medium">Interview Score: 144/150 (96%)</p>
                      <p className="text-xs text-green-400">Ranked #1 - Awaiting Sheriff Approval</p>
                    </div>
                    {expandedApplicant === 'sarah' ? <ChevronUp className="w-5 h-5 text-secondary" /> : <ChevronDown className="w-5 h-5 text-secondary" />}
                  </div>
                </button>

                {expandedApplicant === 'sarah' && (
                  <div className="px-5 pb-5 space-y-5 border-t border-border">
                    {/* Contact Info */}
                    <div className="pt-5 grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-4 h-4 text-slate-500" />
                        <span className="text-secondary">sarah.chen@email.com</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-4 h-4 text-slate-500" />
                        <span className="text-secondary">(555) 345-6789</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-slate-500" />
                        <span className="text-secondary">Duluth, GA 30096</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-slate-500" />
                        <span className="text-secondary">Applied: Oct 27, 2024 (98 days)</span>
                      </div>
                    </div>

                    {/* Qualifications */}
                    <div>
                      <h4 className="text-sm font-bold text-amber-700 uppercase tracking-wide mb-3">Qualifications Summary</h4>
                      <div className="bg-white dark:bg-slate-900/40 rounded-lg p-4 border border-border space-y-3">
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Experience</p>
                          <p className="text-sm text-primary font-medium">7 years FBI Special Agent</p>
                          <p className="text-xs text-secondary">FBI Atlanta Field Office (2017-2024) • Public Corruption Unit</p>
                          <p className="text-xs text-secondary">Reason: Seeking work-life balance, local LE closer to family</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-slate-500 mb-1">Education</p>
                            <p className="text-sm text-primary">Master's Degree - Psychology (Emory 2016)</p>
                            <p className="text-xs text-secondary">Bachelor's - Criminal Justice (UGA 2014)</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 mb-1">POST & Federal Certifications</p>
                            <p className="text-sm text-primary">GA POST Basic #41203 (valid through 05/2027)</p>
                            <p className="text-xs text-green-400">FBI Academy Graduate (Quantico 2017)</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Specialized Training</p>
                          <div className="flex flex-wrap gap-2">
                            <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs">Polygraph Examiner (FBI 2020)</span>
                            <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs">Advanced Interrogation (FBI 2019)</span>
                            <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs">Background Investigations (FBI 2018)</span>
                            <span className="px-2 py-1 bg-amber-500/20 text-amber-700 rounded text-xs">TOP SECRET/SCI Clearance (Active)</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Interview Results */}
                    <div>
                      <h4 className="text-sm font-bold text-amber-700 uppercase tracking-wide mb-3">Interview Results</h4>
                      <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-6">
                          <div>
                            <p className="text-sm font-bold text-green-400">ORAL BOARD INTERVIEW COMPLETED</p>
                            <p className="text-xs text-secondary">February 11, 2026 • GCSO HQ, Sheriff's Conference Room</p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-green-400">144/150</p>
                            <p className="text-xs text-green-400">96.0% - HIGHEST SCORE</p>
                          </div>
                        </div>
                        <div className="space-y-2 mb-4">
                          <p className="text-xs text-secondary">Panel Scoring (50 pts each, 150 max):</p>
                          <div className="grid grid-cols-3 gap-2 text-sm">
                            <div className="bg-white dark:bg-slate-800/40 rounded p-2 text-center">
                              <p className="text-primary font-medium">Major R. Davis</p>
                              <p className="text-green-400 font-bold">48/50</p>
                            </div>
                            <div className="bg-white dark:bg-slate-800/40 rounded p-2 text-center">
                              <p className="text-primary font-medium">HR Director</p>
                              <p className="text-green-400 font-bold">49/50</p>
                            </div>
                            <div className="bg-white dark:bg-slate-800/40 rounded p-2 text-center">
                              <p className="text-primary font-medium">Lt. K. Hayes</p>
                              <p className="text-green-400 font-bold">47/50</p>
                            </div>
                          </div>
                        </div>
                        <div className="text-sm text-secondary space-y-1">
                          <p><span className="text-primary font-medium">Panel Comments:</span></p>
                          <p className="text-xs italic">"Exceptional interview - most qualified candidate for this position"</p>
                          <p className="text-xs italic">"FBI investigative experience directly applicable to GCSO backgrounds"</p>
                          <p><span className="text-primary font-medium">Writing Sample:</span> <span className="text-green-400">EXCELLENT</span></p>
                          <p><span className="text-primary font-medium">Panel Recommendation:</span> <span className="text-green-400 font-bold">STRONGLY RECOMMEND FOR HIRE</span></p>
                        </div>
                      </div>
                    </div>

                    {/* Next Steps */}
                    <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="w-5 h-5 text-amber-700" />
                        <span className="text-sm font-bold text-amber-700">AWAITING SHERIFF'S APPROVAL FOR CONDITIONAL OFFER</span>
                      </div>
                      <div className="text-sm text-secondary space-y-1">
                        <p>• Interview panel recommendation forwarded to Sheriff Taylor: 02/11/2026</p>
                        <p>• Sheriff review meeting: <span className="text-primary font-medium">February 14, 2026</span></p>
                        <p>• If approved: Conditional offer pending GCSO background, medical, psychological</p>
                        <p>• Anticipated salary: <span className="text-green-400">$65,000-68,000</span> (top of range for exceptional qualifications)</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
                      <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-all">
                        <Eye className="w-4 h-4" />
                        View Full Application
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-700/60 hover:bg-slate-700/80 text-primary rounded-lg text-sm transition-all">
                        <FileText className="w-4 h-4" />
                        View Interview Score Sheets
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm transition-all">
                        <FileCheck className="w-4 h-4" />
                        Prepare Conditional Offer
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Robert Martinez - Offer Stage */}
              <div className="bg-white dark:bg-slate-800/40 border border-green-500/30 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleApplicant('robert')}
                  className="w-full p-5 flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-green-400" />
                    </div>
                    <div className="text-left">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="text-lg font-bold text-primary">ROBERT MARTINEZ</h3>
                        <span className="px-2 py-1 bg-green-500/20 border border-green-500/30 rounded text-xs text-green-400 font-bold">OFFER ACCEPTED</span>
                      </div>
                      <p className="text-sm text-secondary">Deputy Sheriff (Patrol Division) • Ref: 2026-APP-0124</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right hidden md:block">
                      <p className="text-sm text-green-400 font-medium">Start Date: March 03, 2026</p>
                      <p className="text-xs text-secondary">Lateral from Clayton County Sheriff</p>
                    </div>
                    {expandedApplicant === 'robert' ? <ChevronUp className="w-5 h-5 text-secondary" /> : <ChevronDown className="w-5 h-5 text-secondary" />}
                  </div>
                </button>

                {expandedApplicant === 'robert' && (
                  <div className="px-5 pb-5 space-y-5 border-t border-border">
                    {/* Hiring Process Completed */}
                    <div className="pt-5">
                      <h4 className="text-sm font-bold text-amber-700 uppercase tracking-wide mb-3">Hiring Process - COMPLETED</h4>
                      <div className="bg-white dark:bg-slate-900/40 rounded-lg p-4 border border-border space-y-2">
                        <div className="flex items-center gap-3 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-secondary">Application Received: 10/23/2024</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-secondary">Initial Screening: PASSED (10/25/2024)</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-secondary">Physical Fitness: PASSED (10/30/2024)</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-secondary">Oral Board Interview: 136/150 (90.7%) - 11/15/2024</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-secondary">Background Investigation: CLEARED (01/20/2026) - Lt. K. Hayes</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-secondary">Medical Exam: PASSED (01/24/2026)</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-secondary">Psychological Eval: PASSED (01/27/2026)</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-secondary">Sheriff's Approval: APPROVED (01/30/2026)</span>
                        </div>
                      </div>
                    </div>

                    {/* Offer Details */}
                    <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span className="text-sm font-bold text-green-400">CONDITIONAL OFFER ACCEPTED</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-secondary">
                        <div>
                          <p><span className="text-primary font-medium">Offer Extended:</span> February 01, 2026</p>
                          <p><span className="text-primary font-medium">Salary:</span> $55,200/year (Step 5 - 8 yrs exp)</p>
                          <p><span className="text-primary font-medium">Shift:</span> B-Shift (14:00-02:00) Patrol</p>
                        </div>
                        <div>
                          <p><span className="text-primary font-medium">Start Date:</span> March 03, 2026</p>
                          <p><span className="text-primary font-medium">Notice Period:</span> Submitted to Clayton County 02/01</p>
                          <p><span className="text-primary font-medium">Last Day Clayton:</span> 02/14/2026</p>
                        </div>
                      </div>
                    </div>

                    {/* Onboarding Status */}
                    <div>
                      <h4 className="text-sm font-bold text-amber-700 uppercase tracking-wide mb-3">Pre-Start Onboarding Status</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-4 h-4 border border-amber-500 rounded-full"></div>
                          <span className="text-secondary">I-9 Form - Due: 03/03/2026</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-4 h-4 border border-slate-600 rounded-full"></div>
                          <span className="text-secondary">W-4/G-4 Tax Forms - Pending</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-secondary">POST Cert Transfer - VERIFIED</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-secondary">Oath of Office - Scheduled 03/03 08:00 AM</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-secondary">Uniform/Equipment - Pickup 02/28</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-secondary">Duty Weapon - Glock 17 #GC48291</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-secondary">FTO Assigned - Cpl. J. Williams (B-Shift)</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-secondary">Patrol Vehicle - Unit 391 (2023 Tahoe)</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
                      <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-all">
                        <Eye className="w-4 h-4" />
                        View Full Hiring File
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-700/60 hover:bg-slate-700/80 text-primary rounded-lg text-sm transition-all">
                        <Mail className="w-4 h-4" />
                        Send Document Reminder
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-700/60 hover:bg-slate-700/80 text-primary rounded-lg text-sm transition-all">
                        <ClipboardCheck className="w-4 h-4" />
                        Onboarding Checklist
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm transition-all">
                        <CheckCircle className="w-4 h-4" />
                        Mark as Hired
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* David Brown - Background Check Stage */}
              <div className="bg-white dark:bg-slate-800/40 border border-border rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleApplicant('david')}
                  className="w-full p-5 flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div className="text-left">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="text-lg font-bold text-primary">DAVID BROWN</h3>
                        <span className="px-2 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded text-xs text-cyan-400 font-bold">BACKGROUND CHECK</span>
                      </div>
                      <p className="text-sm text-secondary">Deputy Sheriff (Patrol Division) • Ref: 2026-APP-0178</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right hidden md:block">
                      <p className="text-sm text-primary font-medium">67 days in progress</p>
                      <p className="text-xs text-cyan-400">Investigator: Cpl. J. Adams</p>
                    </div>
                    {expandedApplicant === 'david' ? <ChevronUp className="w-5 h-5 text-secondary" /> : <ChevronDown className="w-5 h-5 text-secondary" />}
                  </div>
                </button>

                {expandedApplicant === 'david' && (
                  <div className="px-5 pb-5 space-y-5 border-t border-border">
                    {/* Contact & Qualifications */}
                    <div className="pt-5 grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-4 h-4 text-slate-500" />
                        <span className="text-secondary">david.brown@email.com</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-4 h-4 text-slate-500" />
                        <span className="text-secondary">(555) 678-9012</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-slate-500" />
                        <span className="text-secondary">Buford, GA 30518</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <BadgeCheck className="w-4 h-4 text-slate-500" />
                        <span className="text-secondary">6 yrs Hall County Sheriff</span>
                      </div>
                    </div>

                    {/* Background Investigation Status */}
                    <div>
                      <h4 className="text-sm font-bold text-amber-700 uppercase tracking-wide mb-3">Background Investigation Status</h4>
                      <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4 mb-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <p className="text-sm font-bold text-cyan-400">IN PROGRESS - 67 DAYS</p>
                            <p className="text-xs text-secondary">Case #: BI-2024-0178 | Investigator: Cpl. J. Adams (GCSO IA)</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-secondary">Target Completion</p>
                            <p className="text-sm text-primary font-medium">Feb 15, 2026</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white dark:bg-slate-900/40 rounded-lg p-4 border border-border space-y-3">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-sm text-primary">Initial Interview - COMPLETED (11/25/2024)</p>
                            <p className="text-xs text-secondary">2 hours at GCSO HQ. Notes: "Applicant cooperative, professional, no concerns."</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-sm text-primary">Criminal History Check - COMPLETED (11/26/2024)</p>
                            <p className="text-xs text-secondary">GCIC/NCIC: No record ✓ | FBI fingerprint: No arrests ✓ | Court records: Clear ✓</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-sm text-primary">Driving Record - COMPLETED (11/26/2024)</p>
                            <p className="text-xs text-secondary">1 speeding ticket (2021, 15 mph over, paid). No DUI/suspensions. Acceptable ✓</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-sm text-primary">Employment Verification - COMPLETED (12/10/2024)</p>
                            <p className="text-xs text-secondary">Hall County Sheriff: "Good deputy, reliable, no disciplinary issues, eligible for rehire"</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-sm text-primary">Education/Residence Verification - COMPLETED</p>
                            <p className="text-xs text-secondary">UNG Bachelor's CJ (2017) verified ✓ | Current address verified ✓</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-sm text-primary">Credit History - COMPLETED (01/25/2026)</p>
                            <p className="text-xs text-secondary">Score: 720 (Good). No bankruptcies, collections, or judgments ✓</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-4 h-4 border-2 border-amber-400 rounded-full flex-shrink-0 mt-0.5 animate-pulse"></div>
                          <div className="flex-1">
                            <p className="text-sm text-amber-700">Reference Interviews - IN PROGRESS (4 of 5)</p>
                            <p className="text-xs text-secondary">Reference #5 (Lt. J. Davis) scheduled 02/05/2026 - Lt. returning from vacation</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-4 h-4 border border-slate-600 rounded-full flex-shrink-0 mt-0.5"></div>
                          <div className="flex-1">
                            <p className="text-sm text-primary">Polygraph Examination - SCHEDULED</p>
                            <p className="text-xs text-secondary">February 12, 2026 • 09:00 AM • Examiner: Sgt. R. Johnson (ret. GBI)</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Investigator Notes */}
                    <div className="bg-white dark:bg-slate-900/40 rounded-lg p-4 border border-border">
                      <p className="text-xs text-slate-500 mb-2">INVESTIGATOR NOTES (Cpl. Adams - 02/02/2026):</p>
                      <p className="text-sm text-secondary italic">"Background investigation proceeding well. No disqualifying issues to date. Strong recommendations from Hall County. Awaiting final reference (02/05) and polygraph (02/12). Preliminary assessment: Likely to recommend for hire pending successful polygraph."</p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
                      <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-all">
                        <Eye className="w-4 h-4" />
                        View Investigation File
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-700/60 hover:bg-slate-700/80 text-primary rounded-lg text-sm transition-all">
                        <Mail className="w-4 h-4" />
                        Email Investigator
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-700/60 hover:bg-slate-700/80 text-primary rounded-lg text-sm transition-all">
                        <Calendar className="w-4 h-4" />
                        Investigation Timeline
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Lisa Williams - New Stage */}
              <div className="bg-white dark:bg-slate-800/40 border border-border rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleApplicant('lisa')}
                  className="w-full p-5 flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-blue-400" />
                    </div>
                    <div className="text-left">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="text-lg font-bold text-primary">LISA WILLIAMS</h3>
                        <span className="px-2 py-1 bg-blue-500/20 border border-blue-500/30 rounded text-xs text-blue-400 font-bold">NEW</span>
                      </div>
                      <p className="text-sm text-secondary">Detention Officer • Ref: 2026-APP-0201</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right hidden md:block">
                      <p className="text-sm text-primary font-medium">Applied: Nov 01, 2024</p>
                      <p className="text-xs text-amber-700">Pending Initial Screening</p>
                    </div>
                    {expandedApplicant === 'lisa' ? <ChevronUp className="w-5 h-5 text-secondary" /> : <ChevronDown className="w-5 h-5 text-secondary" />}
                  </div>
                </button>

                {expandedApplicant === 'lisa' && (
                  <div className="px-5 pb-5 space-y-5 border-t border-border">
                    <div className="pt-5">
                      <div className="bg-white dark:bg-slate-900/40 rounded-lg p-4 border border-border space-y-3">
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Experience</p>
                          <p className="text-sm text-primary font-medium">3 years GA Dept of Corrections</p>
                          <p className="text-xs text-secondary">Correctional Officer II, Metro State Prison (2021-2024)</p>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <p className="text-xs text-slate-500 mb-1">Education</p>
                            <p className="text-sm text-primary">High School Diploma (South Gwinnett HS, 2020)</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 mb-1">POST Certification</p>
                            <p className="text-sm text-primary">GA POST Basic Corrections #52019</p>
                            <p className="text-xs text-green-400">Valid through 08/2029 ✓</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="w-5 h-5 text-amber-700" />
                        <span className="text-sm font-bold text-amber-700">PENDING INITIAL SCREENING REVIEW</span>
                      </div>
                      <div className="text-sm text-secondary space-y-1">
                        <p>• Application received 93 days ago - awaiting HR review</p>
                        <p>• Assigned to: HR Specialist J. Martinez</p>
                        <p>• Status: Backlog due to Deputy Sheriff hiring priority</p>
                        <p>• Expected review: Week of February 09, 2026</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
                      <button className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-medium transition-all">
                        <AlertCircle className="w-4 h-4" />
                        Priority Review
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm transition-all">
                        <Eye className="w-4 h-4" />
                        View Application
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-700/60 hover:bg-slate-700/80 text-primary rounded-lg text-sm transition-all">
                        <ChevronRight className="w-4 h-4" />
                        Advance to Screening
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Michael Davis - Rejected */}
              <div className="bg-white dark:bg-slate-800/40 border border-red-500/30 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleApplicant('michael')}
                  className="w-full p-5 flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-red-400" />
                    </div>
                    <div className="text-left">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="text-lg font-bold text-primary">MICHAEL DAVIS</h3>
                        <span className="px-2 py-1 bg-red-500/20 border border-red-500/30 rounded text-xs text-red-400 font-bold">DISQUALIFIED</span>
                      </div>
                      <p className="text-sm text-secondary">Deputy Sheriff • Ref: 2026-APP-0156</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right hidden md:block">
                      <p className="text-sm text-red-400 font-medium">Did not meet POST requirements</p>
                      <p className="text-xs text-secondary">Disqualified: 10/31/2024</p>
                    </div>
                    {expandedApplicant === 'michael' ? <ChevronUp className="w-5 h-5 text-secondary" /> : <ChevronDown className="w-5 h-5 text-secondary" />}
                  </div>
                </button>

                {expandedApplicant === 'michael' && (
                  <div className="px-5 pb-5 space-y-4 border-t border-border">
                    <div className="pt-5">
                      <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                        <p className="text-sm font-bold text-red-400 mb-2">DISQUALIFICATION REASON:</p>
                        <p className="text-sm text-secondary">Applicant is 19 years old. Georgia POST requires age 21+ for armed patrol deputy positions. Applicant does not meet minimum age requirement per POST standards and GCSO Policy 2.01.</p>
                        <p className="text-xs text-secondary mt-2">Reviewed by: HR Specialist J. Martinez (10/31/2024)</p>
                        <p className="text-xs text-secondary">Notification sent: 11/01/2024 via email and certified mail</p>
                      </div>
                    </div>
                    <div className="text-xs text-slate-500">
                      <p>Note: Applicant may reapply after reaching age 21 (estimated eligibility: August 2027)</p>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>

        {/* Footer */}
        <footer className="border-t border-border px-6 py-3 bg-slate-50 dark:bg-slate-900/30">
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
            <span>System: GCSO-HRIS v4.2 | Last Updated: {formattedTime} EST</span>
            <span>Gwinnett County Sheriff's Office • Human Resources Division</span>
          </div>
        </footer>

      {/* Chat Button */}
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
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-primary">GCSO HR Assistant</h3>
                <p className="text-xs text-green-400">Online</p>
              </div>
            </div>
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <MessageSquare className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1">
                <div className="bg-white dark:bg-slate-800/60 p-3 rounded-xl">
                  <p className="text-sm text-slate-700 dark:text-slate-200">Hi! I can help you track applicant status, schedule interviews, check background investigation progress, and prepare offer letters. What do you need help with?</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-2">
              <input type="text" placeholder="Ask about applicants..." className="flex-1 px-4 py-2 bg-white dark:bg-slate-800/40 border border-border rounded-xl text-primary placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500/50" />
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
