import { Users, Briefcase, UserPlus, TrendingUp, FileCheck, GraduationCap, FileText, Calendar, Award, ClipboardCheck, LayoutDashboard } from 'lucide-react';

// ── HR module shared navigation, profile, and notifications ───
// Every HR page imports this to pass to DashboardLayout so the sidebar
// is always consistent.

export const hrNavigation = [
  { id: 'hr-dashboard', label: 'HR Dashboard', icon: Users, route: '/hr/dashboard' },
  { id: 'job-postings', label: 'Job Postings', icon: Briefcase, route: '/hr/jobs' },
  { id: 'applicant-tracking', label: 'Applicant Tracking', icon: UserPlus, route: '/hr/applicants' },
  { id: 'hiring-pipeline', label: 'Hiring Pipeline', icon: TrendingUp, route: '/hr/pipeline' },
  { id: 'onboarding', label: 'New Hire Onboarding', icon: FileCheck, route: '/hr/onboarding' },
  { id: 'training-certifications', label: 'Training & Certifications', icon: GraduationCap, route: '/hr/training' },
  { id: 'employee-records', label: 'Employee Records', icon: FileText, route: '/hr/records' },
  { id: 'time-off', label: 'Time Off Management', icon: Calendar, route: '/hr/timeoff' },
  { id: 'performance', label: 'Performance Reviews', icon: Award, route: '/hr/reviews' },
  { id: 'compliance', label: 'HR Compliance', icon: ClipboardCheck, route: '/hr/compliance' },
  { id: 'hr-reports', label: 'HR Reports', icon: LayoutDashboard, route: '/hr/reports' },
  { id: 'hr-calendar', label: 'HR Calendar', icon: Calendar, route: '/hr/calendar' },
];

export const hrProfile = {
  name: 'HR Director',
  role: 'Human Resources',
  email: 'hr.director@gcso.gov',
  initials: 'HD'
};

export const hrNotifications = [
  { id: 1, title: 'POST Cert Expiring', message: 'Sgt. Thompson — cert expires in 7 days, training not scheduled', time: '30 min ago', urgent: true },
  { id: 2, title: 'FMLA Deadline Today', message: 'Deputy Chen FMLA designation notice due by 17:00', time: '1 hour ago', urgent: true },
  { id: 3, title: 'New Applicant Submitted', message: 'Deputy Sheriff — 3 new applications received', time: '2 hours ago', urgent: false },
  { id: 4, title: 'Performance Review Due', message: '5 reviews overdue — supervisor follow-up required', time: '3 hours ago', urgent: true },
  { id: 5, title: 'Training Compliance Alert', message: 'Annual mandatory training deadline in 14 days', time: '4 hours ago', urgent: false },
];
