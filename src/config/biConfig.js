import { LayoutDashboard, FolderOpen, FileText, Clock, UserCheck, Calendar, FileCheck, CheckCircle, TrendingUp, AlertTriangle, DollarSign, Eye, Activity, XCircle } from 'lucide-react';

// ── BI module shared navigation, profile, and notifications ───
// Every BI page imports this to pass to DashboardLayout so the sidebar
// is always consistent.

export const biNavigation = [
  { id: 'bi-dashboard', label: 'Investigations Command Overview', icon: LayoutDashboard, route: '/bi/dashboard' },
  { id: 'active-cases', label: 'Open Investigations', icon: FolderOpen, route: '/bi/active' },
  { id: 'case-management', label: 'Investigation Case Files', icon: FileText, route: '/bi/cases' },
  { id: 'investigation-timeline', label: 'Case Activity & Audit Log', icon: Clock, route: '/bi/timeline' },
  { id: 'subject-records', label: 'Applicant Records', icon: UserCheck, route: '/bi/subjects' },
  { id: 'interview-scheduling', label: 'Interview Coordination', icon: Calendar, route: '/bi/interviews' },
  { id: 'evidence-tracking', label: 'Documentation & Evidence', icon: FileCheck, route: '/bi/evidence' },
  { id: 'reference-checks', label: 'Reference Verification', icon: CheckCircle, route: '/bi/references' },
  { id: 'employment-verification', label: 'Employment Confirmation', icon: TrendingUp, route: '/bi/employment' },
  { id: 'criminal-history', label: 'Criminal Record Adjudication', icon: AlertTriangle, route: '/bi/criminal' },
  { id: 'financial-background', label: 'Financial Risk Review', icon: DollarSign, route: '/bi/financial' },
  { id: 'social-media', label: 'Digital Footprint Review', icon: Eye, route: '/bi/social' },
  { id: 'bi-reports', label: 'Adjudication Reports', icon: Activity, route: '/bi/reports' },
  { id: 'case-closure', label: 'Final Determinations', icon: XCircle, route: '/bi/closure' },
];

export const biProfile = {
  name: 'BI Supervisor',
  role: 'Background Investigations',
  email: 'bi.supervisor@gcso.gov',
  initials: 'BI'
};

export const biNotifications = [
  { id: 1, title: 'Investigation Finalized', message: 'Marcus Johnson — Deputy Sheriff cleared', time: '15 min ago', urgent: false },
  { id: 2, title: 'Criminal Record Flag', message: 'Robert Martinez — requires supervisor adjudication', time: '1 hour ago', urgent: true },
  { id: 3, title: 'Employment Gap Identified', message: 'Lisa Chen — 6-month gap documented', time: '2 hours ago', urgent: true },
  { id: 4, title: 'Reference Interview Due', message: '3 reference calls scheduled today', time: '3 hours ago', urgent: true },
  { id: 5, title: 'Case Deadline Approaching', message: 'Thompson case — 5 days remaining', time: '4 hours ago', urgent: false }
];
