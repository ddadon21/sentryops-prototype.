// Searchable index for the SentryOps Command Palette.
// Each entry maps a navigable destination to keywords so semantically
// related terms (e.g. "staffing" → "vacancies", "overtime") surface it.

export interface CommandEntry {
  id: string;
  label: string;
  group: string;
  route: string;
  keywords?: string[];
}

export const commandIndex: CommandEntry[] = [
  // ── Command Center ──────────────────────────────────────────
  { id: 'cmd-dashboard', label: 'Executive Command Center', group: 'Command Center', route: '/command/dashboard', keywords: ['dashboard', 'overview', 'home'] },
  { id: 'cmd-brief', label: 'Executive Briefing', group: 'Command Center', route: '/command/brief', keywords: ['daily brief', 'command brief', 'summary'] },
  { id: 'cmd-warroom', label: 'Command War Room', group: 'Command Center', route: '/command/warroom', keywords: ['situation room', 'live ops'] },
  { id: 'cmd-risk', label: 'Agency Risk Center', group: 'Command Center', route: '/command/risk', keywords: ['decisions', 'risk', 'compliance', 'policies'] },
  { id: 'cmd-alerts', label: 'Command Notifications Center', group: 'Command Center', route: '/command/alerts', keywords: ['alerts', 'notifications'] },
  { id: 'cmd-approvals', label: 'Decision Center', group: 'Command Center', route: '/command/approvals', keywords: ['approvals', 'decisions', 'requests'] },
  { id: 'cmd-calendar', label: 'Operational Timeline', group: 'Command Center', route: '/command/calendar', keywords: ['timeline', 'calendar', 'schedule'] },
  { id: 'cmd-personnel', label: 'Workforce Readiness', group: 'Command Center', route: '/command/personnel', keywords: ['staffing', 'employees', 'vacancies', 'recruiting', 'workforce', 'scheduling', 'shift coverage', 'headcount'] },
  { id: 'cmd-orgchart', label: 'Org Chart', group: 'Command Center', route: '/command/orgchart', keywords: ['divisions', 'units', 'org chart', 'structure', 'employees'] },
  { id: 'cmd-budget', label: 'Budget & Assets', group: 'Command Center', route: '/command/budget', keywords: ['budget', 'assets', 'vehicles', 'finance', 'fy26'] },
  { id: 'cmd-reports', label: 'Performance & Compliance', group: 'Command Center', route: '/command/reports', keywords: ['reports', 'performance', 'compliance'] },
  { id: 'cmd-settings', label: 'Command Settings', group: 'Command Center', route: '/command/settings', keywords: ['settings', 'preferences'] },
  { id: 'cmd-profile', label: 'My Profile', group: 'Command Center', route: '/command/profile', keywords: ['profile', 'account'] },
  { id: 'activity-feed', label: 'Agency Activity Log', group: 'Command Center', route: '/activity', keywords: ['activity', 'log', 'history', 'audit'] },

  // ── Detention Operations ────────────────────────────────────
  { id: 'jail-command', label: 'Detention Command Center', group: 'Detention Operations', route: '/jail/command', keywords: ['detention', 'jail', 'custody command'] },
  { id: 'jail-dashboard', label: 'Jail Dashboard', group: 'Detention Operations', route: '/jail/dashboard', keywords: ['jail', 'detention overview'] },
  { id: 'jail-custody', label: 'Custody Operations', group: 'Detention Operations', route: '/jail/custody', keywords: ['custody', 'detention'] },
  { id: 'jail-inmates', label: 'Inmate Management', group: 'Detention Operations', route: '/jail/inmates', keywords: ['inmates', 'detainees'] },
  { id: 'jail-booking', label: 'Booking & Processing', group: 'Detention Operations', route: '/jail/booking', keywords: ['booking', 'intake', 'processing'] },
  { id: 'jail-incidents', label: 'Incident Reports', group: 'Detention Operations', route: '/jail/incidents', keywords: ['incidents', 'reports', 'jail incidents'] },
  { id: 'jail-medical', label: 'Medical Management', group: 'Detention Operations', route: '/jail/medical', keywords: ['medical', 'health', 'inmate care'] },

  // ── Patrol Operations ────────────────────────────────────────
  { id: 'patrol-cad', label: 'CAD Dispatch', group: 'Patrol Operations', route: '/patrol/cad', keywords: ['dispatch', 'cad', 'field operations'] },
  { id: 'patrol-units', label: 'Unit Management', group: 'Patrol Operations', route: '/patrol/units', keywords: ['units', 'patrol division', 'vehicles', 'officers'] },

  // ── Investigations ───────────────────────────────────────────
  { id: 'inv-cases', label: 'Active Cases Dashboard', group: 'Investigations', route: '/investigations/cases', keywords: ['cases', 'investigations', 'criminal'] },

  // ── Background Investigations ───────────────────────────────
  { id: 'bi-dashboard', label: 'Backgrounds Dashboard', group: 'Background Investigations', route: '/bi/dashboard', keywords: ['background investigations', 'overview'] },
  { id: 'bi-active', label: 'Active Background Cases', group: 'Background Investigations', route: '/bi/active', keywords: ['active cases', 'background checks'] },
  { id: 'bi-cases', label: 'Case Management', group: 'Background Investigations', route: '/bi/cases', keywords: ['cases', 'case management'] },
  { id: 'bi-timeline', label: 'Investigation Timeline', group: 'Background Investigations', route: '/bi/timeline', keywords: ['timeline', 'investigation history'] },
  { id: 'bi-subjects', label: 'Subject Records', group: 'Background Investigations', route: '/bi/subjects', keywords: ['subjects', 'applicants', 'candidates'] },
  { id: 'bi-interviews', label: 'Interview Scheduling', group: 'Background Investigations', route: '/bi/interviews', keywords: ['interviews', 'scheduling'] },
  { id: 'bi-evidence', label: 'Evidence Tracking', group: 'Background Investigations', route: '/bi/evidence', keywords: ['evidence', 'documents'] },
  { id: 'bi-references', label: 'Reference Checks', group: 'Background Investigations', route: '/bi/references', keywords: ['references', 'verification'] },
  { id: 'bi-employment', label: 'Employment Verification', group: 'Background Investigations', route: '/bi/employment', keywords: ['employment', 'verification'] },
  { id: 'bi-criminal', label: 'Criminal History Review', group: 'Background Investigations', route: '/bi/criminal', keywords: ['criminal history', 'background'] },
  { id: 'bi-financial', label: 'Financial Background', group: 'Background Investigations', route: '/bi/financial', keywords: ['financial', 'credit', 'background'] },
  { id: 'bi-social', label: 'Social Media Analysis', group: 'Background Investigations', route: '/bi/social', keywords: ['social media', 'analysis'] },
  { id: 'bi-reports', label: 'Background Investigation Reports', group: 'Background Investigations', route: '/bi/reports', keywords: ['reports', 'background'] },
  { id: 'bi-closure', label: 'Case Closure', group: 'Background Investigations', route: '/bi/closure', keywords: ['closure', 'case completion'] },
  { id: 'bi-calendar', label: 'Background Investigations Calendar', group: 'Background Investigations', route: '/bi/calendar', keywords: ['calendar', 'schedule'] },
  { id: 'bi-settings', label: 'Background Investigations Settings', group: 'Background Investigations', route: '/bi/settings', keywords: ['settings'] },

  // ── Human Resources ──────────────────────────────────────────
  { id: 'hr-dashboard', label: 'HR Dashboard', group: 'Human Resources', route: '/hr/dashboard', keywords: ['hr', 'human resources', 'overview'] },
  { id: 'hr-jobs', label: 'Job Postings', group: 'Human Resources', route: '/hr/jobs', keywords: ['jobs', 'postings', 'recruiting', 'vacancy', 'open positions'] },
  { id: 'hr-applicants', label: 'Applicant Tracking', group: 'Human Resources', route: '/hr/applicants', keywords: ['applicants', 'recruiting', 'candidates'] },
  { id: 'hr-pipeline', label: 'Hiring Pipeline', group: 'Human Resources', route: '/hr/pipeline', keywords: ['hiring', 'pipeline', 'recruiting', 'vacancies', 'vacancy', 'hiring approvals', 'workforce planning', 'staffing shortages'] },
  { id: 'hr-onboarding', label: 'New Hire Onboarding', group: 'Human Resources', route: '/hr/onboarding', keywords: ['onboarding', 'new hire'] },
  { id: 'hr-records', label: 'Employee Records', group: 'Human Resources', route: '/hr/records', keywords: ['employees', 'records', 'personnel files', 'employee profile', 'position history'] },
  { id: 'hr-timeoff', label: 'Time Off Management', group: 'Human Resources', route: '/hr/timeoff', keywords: ['time off', 'leave', 'leave requests', 'pto', 'scheduling'] },
  { id: 'hr-reviews', label: 'Performance Reviews', group: 'Human Resources', route: '/hr/reviews', keywords: ['performance', 'reviews', 'evaluations'] },
  { id: 'hr-training', label: 'Training & Certifications', group: 'Human Resources', route: '/hr/training', keywords: ['training', 'certifications', 'qualifications', 'academy', 'annual compliance', 'required courses', 'expiring credentials'] },
  { id: 'hr-compliance', label: 'Compliance Management', group: 'Human Resources', route: '/hr/compliance', keywords: ['compliance', 'policies', 'internal affairs', 'ia records'] },
  { id: 'hr-calendar', label: 'HR Calendar', group: 'Human Resources', route: '/hr/calendar', keywords: ['calendar', 'schedule'] },
  { id: 'hr-reports', label: 'HR Reports', group: 'Human Resources', route: '/hr/reports', keywords: ['reports', 'hr analytics'] },
  { id: 'hr-settings', label: 'HR Settings', group: 'Human Resources', route: '/hr/settings', keywords: ['settings'] },
];

export interface QuickAction {
  id: string;
  label: string;
  route: string;
}

export const quickActions: QuickAction[] = [
  { id: 'qa-exec-report', label: 'Create Executive Report', route: '/command/reports' },
  { id: 'qa-brief', label: 'Open Command Briefing', route: '/command/brief' },
  { id: 'qa-approval', label: 'Create Approval Request', route: '/command/approvals' },
  { id: 'qa-timeline', label: 'View Agency Timeline', route: '/command/calendar' },
  { id: 'qa-budget', label: 'Open Budget Dashboard', route: '/command/budget' },
  { id: 'qa-personnel', label: 'Open Personnel Module', route: '/command/personnel' },
  { id: 'qa-investigations', label: 'Open Investigations', route: '/investigations/cases' },
  { id: 'qa-summary', label: 'Generate Executive Summary', route: '/command/brief' },
];

export const exampleRecentSearches: string[] = [
  'Executive Briefing',
  'Agency Risk',
  'Budget FY26',
  'Officer Smith',
  'Patrol Division',
  'Performance Report',
];

const RECENT_SEARCHES_KEY = 'sentryops.recentSearches';
const MAX_RECENT = 6;

export function getRecentSearches(): string[] {
  try {
    const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    // ignore malformed storage
  }
  return exampleRecentSearches;
}

export function addRecentSearch(query: string) {
  const trimmed = query.trim();
  if (!trimmed) return;
  const existing = getRecentSearches().filter(q => q.toLowerCase() !== trimmed.toLowerCase());
  const updated = [trimmed, ...existing].slice(0, MAX_RECENT);
  localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
}

// When searching from inside a module (e.g. the HR Module), results from that
// module's group should always rank above agency-wide results, without hiding
// the rest of the platform from the search.
const CONTEXT_BOOST = 1000;

export function searchCommandIndex(query: string, contextGroup?: string): CommandEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const scored = commandIndex
    .map(entry => {
      const label = entry.label.toLowerCase();
      const group = entry.group.toLowerCase();
      const keywords = entry.keywords ?? [];

      let score = 0;
      if (label === q) score = 100;
      else if (label.startsWith(q)) score = 80;
      else if (label.includes(q)) score = 60;
      else if (keywords.some(k => k.toLowerCase() === q)) score = 55;
      else if (keywords.some(k => k.toLowerCase().startsWith(q))) score = 45;
      else if (keywords.some(k => k.toLowerCase().includes(q))) score = 35;
      else if (group.includes(q)) score = 20;

      if (score > 0 && contextGroup && entry.group === contextGroup) {
        score += CONTEXT_BOOST;
      }

      return { entry, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.map(({ entry }) => entry);
}
