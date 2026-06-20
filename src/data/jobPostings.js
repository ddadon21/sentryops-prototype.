// Single source of truth for job postings — consumed by the JobPostings
// executive overview (counts + health only) and the per-job JobWorkspace
// (full detail: pipeline, competitive analysis, salary, recommendations...).
// Health: 'healthy' | 'attention' | 'critical' — drives the dashboard pill.

export const jobPostings = [
  {
    id: 'deputy-sheriff',
    title: 'Deputy Sheriff I/II',
    iconColor: 'blue',
    division: 'Patrol Division',
    hiringAuthority: "Sheriff Keybo Taylor",
    location: 'Lawrenceville, Georgia',
    status: 'Active',
    priority: 'High Priority',
    health: 'attention',
    vacancies: 8,
    applicants: 23,
    views: 156,
    daysOpen: 111,
    primaryAction: { label: 'Schedule Oral Boards', actionKey: 'schedule' },
    topRisks: [
      'Conversion rate 14.7% — below the 20-25% target',
      'Starting pay 12.8% below Gwinnett County Police',
      'Avg time-to-hire 127 days, slower than peer agencies',
    ],

    overview: {
      postedDate: 'October 14, 2024',
      timelineNote: 'CONTINUOUS RECRUITMENT (open until filled)',
      salaryRange: '$48,000 - $63,000 annually',
      salarySteps: ['Step 1 (Entry): $48,000 base', 'Step 5 (3 years): $55,200', 'Step 10 (8+ years): $63,000'],
      shiftDifferential: '+5% for B-Shift and C-Shift',
      classification: 'SWORN LAW ENFORCEMENT DEPUTY',
      workLocation: 'Gwinnett County, GA — HQ: 2900 Commons Dr, Lawrenceville · Patrol zones: Countywide',
      positions: [
        'A-Shift (Day): 3 vacancies - 06:00-18:00',
        'B-Shift (Evening): 2 vacancies - 14:00-02:00',
        'C-Shift (Night): 3 vacancies - 18:00-06:00',
      ],
      qualifications: [
        'Age: 21+ years (Georgia POST requirement)',
        'Education: High school diploma or GED',
        'Certification: Georgia POST Basic Law Enforcement OR academy eligible',
        "Driver's License: Valid GA license, clean record",
        'Background: Must pass POST-compliant investigation',
        'Physical: GCSO fitness test (1.5-mi run, push-ups, sit-ups)',
      ],
      benefits: [
        { label: 'Health Insurance', detail: 'County-provided (employee + family)' },
        { label: 'Retirement', detail: "Georgia Sheriff's Retirement (GSRS)" },
        { label: 'Paid Leave', detail: '15 vacation + 12 sick days' },
        { label: 'Education Incentive', detail: 'Up to $5,000/year tuition' },
      ],
    },

    metrics: [
      { value: 23, label: 'Total Applications', note: '14 POST Certified · 9 Academy Req' },
      { value: 156, label: 'Job Posting Views' },
      { value: '14.7%', label: 'Conversion Rate', tone: 'warning', note: 'Below target (20-25%)' },
      { value: 127, label: 'Avg Days to Hire' },
    ],

    pipeline: [
      { stage: 'Applications', pct: 100, detail: '23 received', color: 'bg-blue-500' },
      { stage: 'Initial Screening', pct: 74, detail: '17 passed · 6 disqualified', color: 'bg-green-500' },
      { stage: 'Oral Board', pct: 53, detail: '9 completed · 8 scheduled (Feb 06)', color: 'bg-amber-500' },
      { stage: 'Background', pct: 39, detail: '5 in progress · 4 cleared · 2 disqualified', color: 'bg-purple-500' },
      { stage: 'Final Offers', pct: 13, detail: '3 extended · 2 accepted · 1 pending', color: 'bg-green-400' },
    ],

    interview: {
      title: 'Oral Board Interviews',
      date: 'February 06, 2026',
      location: 'GCSO Headquarters',
      candidates: '8 candidates scheduled',
    },

    competitiveAlert: { tone: 'critical', title: 'GCSO SALARY CONCERNS — Below market rate', detail: 'GCSO starting pay ($48,000) is 12.8% below Gwinnett County Police ($54,120) - competing for same applicant pool' },
    competitive: [
      { agency: 'Gwinnett County Police Dept', salary: '$54,120 starting', delta: '+12.8% vs GCSO', tone: 'critical' },
      { agency: 'Atlanta Police Dept', salary: '$58,000 starting', delta: '+20.8% vs GCSO + $10K bonus', tone: 'critical' },
      { agency: 'Fulton County Sheriff', salary: '$52,500 starting', delta: '+9.4% vs GCSO + $5K bonus', tone: 'warning' },
      { agency: 'Cobb County Sheriff', salary: '$49,800 starting', delta: '+3.8% vs GCSO', tone: 'warning' },
      { agency: 'DeKalb County Sheriff', salary: '$46,200 starting', delta: '-3.8% vs GCSO', tone: 'success' },
    ],
    salaryAnalysis: {
      range: '$48,000 - $63,000 annually',
      verdict: 'Below market rate vs. comparable metro Atlanta law-enforcement agencies',
      gapPct: '12.8%',
      note: 'Closing the gap with Gwinnett County Police would require raising starting pay to roughly $54,000.',
    },

    recommendations: [
      { tone: 'success', text: 'Proceed with February 06 oral board interviews (8 candidates)' },
      { tone: 'success', text: 'Follow up with J. Wilson on pending offer (deadline 02/05)' },
      { tone: 'warning', text: 'URGENT: Request Sheriff/Command Staff review of deputy starting salary to address 12.8% gap with Gwinnett County PD' },
      { tone: 'warning', text: 'Consider hiring incentives: Sign-on bonus, accelerated take-home vehicle, enhanced shift differential' },
      { tone: 'warning', text: 'Evaluate adding 3rd background investigator to reduce time-to-hire (currently 127 days avg)' },
    ],

    history: [
      { date: 'October 14, 2024', event: 'Posting opened — continuous recruitment' },
      { date: 'January 15, 2026', event: '23rd application received' },
      { date: 'February 06, 2026', event: 'Oral board interviews scheduled (8 candidates)' },
    ],
    budgetImpact: {
      annualCostRange: '$384,000 - $504,000',
      note: '8 vacancies × $48,000-$63,000 starting band, before benefits load.',
    },
  },

  {
    id: 'background-investigator',
    title: 'Background Investigator',
    iconColor: 'purple',
    division: 'HR / Internal Affairs',
    hiringAuthority: 'HR Director',
    location: 'GCSO Headquarters',
    status: 'Active',
    priority: 'High Priority',
    health: 'attention',
    vacancies: 2,
    applicants: 12,
    views: 89,
    daysOpen: 110,
    primaryAction: { label: 'Review Interview Panel', actionKey: 'interview' },
    topRisks: [
      'Posting extended once already — pool still thin for 2 openings',
      '7 of 12 applicants are internal transfers, reducing patrol coverage if hired',
      'Only 1 new external application in the last 2 weeks',
    ],

    overview: {
      postedDate: 'October 15, 2024',
      timelineNote: 'EXTENDED TO: February 28, 2026',
      salaryRange: '$55,000 - $68,000 annually',
      shiftDifferential: null,
      classification: 'Mon-Fri, 08:00-17:00',
      workLocation: 'Internal Affairs Division / HR Dept',
      positions: ['2 vacancies'],
      qualifications: [
        'POST Cert: Georgia POST Basic Law Enforcement - REQUIRED',
        'Experience: 3+ years sworn law enforcement',
        'Skills: Report writing, interview techniques, records research',
        'Clearances: GCIC/NCIC access, CJIS security',
      ],
    },

    metrics: [
      { value: 12, label: 'Total Applications', note: '7 internal · 5 external' },
      { value: 89, label: 'Job Posting Views' },
      { value: '13.5%', label: 'Conversion Rate', tone: 'warning' },
      { value: 110, label: 'Days Open' },
    ],

    applicantBreakdown: {
      internal: [
        'Cpl. M. Johnson - Patrol Division (6 yrs GCSO)',
        'Deputy R. Williams - Criminal Investigations (5 yrs)',
        'Deputy K. Thompson - Patrol Division (4 yrs)',
        'Sgt. L. Martinez - Court Services (8 yrs)',
        'Deputy J. Chen - Patrol Division (3.5 yrs)',
        'Deputy S. Anderson - Detention Center (4 yrs)',
        'Deputy T. Wilson - Training Division (7 yrs)',
      ],
      external: [
        'Deputy K. Davis - DeKalb County Sheriff (5 yrs)',
        'Detective M. Brown - Clayton County Police (6 yrs)',
        'Investigator R. Garcia - Cobb County Sheriff (4 yrs)',
        'Deputy L. Robinson - Forsyth County Sheriff (3.5 yrs)',
        'Sgt. J. Peterson - Barrow County Sheriff (7 yrs)',
      ],
    },

    interview: {
      title: 'Command Interview Panel',
      date: 'February 11, 2026 · 10:00 AM - 3:00 PM',
      location: 'GCSO Headquarters, Sheriff\'s Conference Room',
      panel: 'Major R. Davis (IA Commander), HR Director, Lt. K. Hayes (Sr. Background Investigator)',
      candidates: '9 applicants (all qualified)',
    },

    recommendations: [
      { tone: 'success', text: 'Proceed with February 11 command interview panel (9 qualified candidates)' },
      { tone: 'warning', text: 'Direct recruitment outreach to expand the external applicant pool before next cycle' },
    ],

    history: [
      { date: 'October 15, 2024', event: 'Posting opened' },
      { date: 'January 2026', event: 'Posting extended to February 28, 2026' },
      { date: 'February 11, 2026', event: 'Command interview panel scheduled' },
    ],
    budgetImpact: {
      annualCostRange: '$110,000 - $136,000',
      note: '2 vacancies × $55,000-$68,000 starting band, before benefits load.',
    },
  },

  {
    id: 'detention-officer',
    title: 'Detention Officer',
    iconColor: 'amber',
    division: 'Gwinnett County Detention Center',
    hiringAuthority: 'Detention Division Commander',
    location: '750 Hi Hope Rd',
    status: 'Active',
    priority: null,
    health: 'critical',
    vacancies: 1,
    applicants: 8,
    views: 67,
    daysOpen: 98,
    primaryAction: { label: 'Close & Repost with Incentives', actionKey: 'repost' },
    topRisks: [
      'Only 8 applications in 98 days for 1 vacancy — very poor velocity',
      'Starting pay $42K vs. patrol $48K, competing for the same pool',
      'Gwinnett County Police pays $54K for comparable shift work',
    ],

    overview: {
      postedDate: 'October 27, 2024',
      timelineNote: 'EXTENDED TO: March 31, 2026',
      salaryRange: '$42,000 - $52,000 annually',
      classification: '12-hr rotating shifts (Days/Nights)',
      workLocation: 'Gwinnett County Detention Center',
      positions: ['1 vacancy'],
    },

    metrics: [
      { value: 8, label: 'Total Applications' },
      { value: 67, label: 'Job Posting Views' },
      { value: '11.9%', label: 'Conversion Rate', tone: 'critical' },
      { value: 98, label: 'Days Open' },
    ],

    competitiveAlert: { tone: 'critical', title: 'CRITICAL RECRUITMENT FAILURE', detail: 'Only 8 applications in 98 days for 1 vacancy. Detention positions historically difficult to fill. Lower pay than patrol ($42K vs $48K starting). Competing with Gwinnett County Police ($54K) for the same applicants.' },
    competitive: [
      { agency: 'Fulton County Sheriff', salary: '$45,000 + $3K bonus', delta: '+7.1% vs GCSO', tone: 'critical' },
      { agency: 'Cobb County Sheriff', salary: '$43,500 starting', delta: '+3.6% vs GCSO', tone: 'warning' },
      { agency: 'DeKalb County Sheriff', salary: '$40,000 starting', delta: '-4.8% vs GCSO', tone: 'success' },
    ],
    salaryAnalysis: {
      range: '$42,000 - $52,000 annually',
      verdict: 'Below Fulton/Cobb for comparable detention work',
      gapPct: '7.1%',
      note: 'Raising to $45K-47K would match Fulton/Cobb starting pay.',
    },

    recommendations: [
      { tone: 'critical', text: 'Increase salary to $45K-47K to match Fulton/Cobb' },
      { tone: 'warning', text: 'Consider sign-on bonus ($2,000-3,000) and enhanced shift differential' },
      { tone: 'warning', text: 'Expand recruitment: criminal justice colleges, military veteran outreach' },
    ],

    history: [
      { date: 'October 27, 2024', event: 'Posting opened' },
      { date: 'January 2026', event: 'Posting extended to March 31, 2026' },
    ],
    budgetImpact: {
      annualCostRange: '$42,000 - $52,000',
      note: '1 vacancy × $42,000-$52,000 starting band, before benefits load.',
    },
  },

  {
    id: 'administrative-assistant',
    title: 'Administrative Assistant',
    iconColor: 'red',
    division: 'Administrative Services',
    hiringAuthority: 'HR Director',
    location: 'GCSO Headquarters',
    status: 'Active',
    priority: 'Critically Low',
    health: 'critical',
    vacancies: 1,
    applicants: 4,
    views: 45,
    daysOpen: 94,
    closesIn: 'Closes Feb 11 (9 days)',
    primaryAction: { label: 'Extend Posting Deadline', actionKey: 'extend' },
    topRisks: [
      'Only 4 applications in 94 days — should have 20-30 minimum',
      'Posting closes in 9 days with grossly insufficient applicants',
      'Salary is 9.5-15.6% below comparable county/private-sector roles',
    ],

    overview: {
      postedDate: 'October 31, 2024',
      timelineNote: 'CLOSES: February 11, 2026 (9 DAYS)',
      salaryRange: '$38,000 - $45,000 annually',
      classification: 'CIVILIAN · Mon-Fri, 08:00-17:00',
      workLocation: 'GCSO Headquarters',
      positions: ['1 vacancy'],
    },

    metrics: [
      { value: 4, label: 'Total Applications', tone: 'critical' },
      { value: 45, label: 'Job Posting Views', tone: 'critical' },
      { value: '8.9%', label: 'Conversion Rate', tone: 'critical' },
      { value: 94, label: 'Days Open' },
    ],

    competitiveAlert: { tone: 'critical', title: 'CRITICAL RECRUITMENT FAILURE — IMMEDIATE ACTION NEEDED', detail: 'Only 4 applications in 94 days (should have 20-30 minimum). Extremely low visibility: only 45 views. Posting closes in 9 days with grossly insufficient applicants. Application conversion rate 8.9% (critically low).' },
    rootCause: [
      'Salary not competitive: GCSO pays $38K-45K, but other Gwinnett County departments pay $42K-50K (+10% more)',
      'Private sector gap: Gwinnett County businesses pay $42K-52K (10-16% more than GCSO)',
      'Experience requirement: 2+ years may be too high for $38K starting salary',
      'Low visibility: only 45 views — not using civilian job boards effectively',
    ],
    competitive: [
      { agency: 'Gwinnett County Government (other depts)', salary: '$42,000 - $50,000', delta: 'GCSO pays 9.5-11.1% less', tone: 'critical' },
      { agency: 'Gwinnett County Public Schools', salary: '$40,000 - $48,000', delta: 'GCSO pays 5-6.7% less', tone: 'warning' },
      { agency: 'Private Sector (Gwinnett area)', salary: '$42,000 - $52,000', delta: 'GCSO pays 10.5-15.6% less', tone: 'critical' },
      { agency: "Other Sheriff's Offices", salary: '$37,000 - $48,000', delta: 'GCSO competitive with peers', tone: 'success' },
    ],
    salaryAnalysis: {
      range: '$38,000 - $45,000 annually',
      verdict: 'Below every comparable benchmark except peer Sheriff\'s Offices',
      gapPct: '9.5-15.6%',
      note: 'Raising to $42K-50K would close the gap with county departments and private sector.',
    },

    recommendations: [
      { tone: 'critical', text: 'EXTEND POSTING to March 31, 2026 (need more time)' },
      { tone: 'critical', text: 'INCREASE SALARY to $42,000-50,000 (match county departments)' },
      { tone: 'critical', text: 'REDUCE EXPERIENCE requirement to 1-2 years (from 2+)' },
      { tone: 'warning', text: 'EXPAND MARKETING: Indeed.com, LinkedIn, Gwinnett County Jobs, local colleges' },
      { tone: 'warning', text: 'REQUEST BUDGET APPROVAL from Sheriff Taylor for salary increase' },
    ],
    doNotProceedNote: 'DO NOT proceed with interviews of only 3 candidates — insufficient pool (need 8-12 minimum)',

    history: [
      { date: 'October 31, 2024', event: 'Posting opened' },
      { date: 'February 11, 2026', event: 'Posting set to close — applicant pool still critically low' },
    ],
    budgetImpact: {
      annualCostRange: '$38,000 - $45,000',
      note: '1 vacancy × $38,000-$45,000 starting band, before benefits load.',
    },
  },
];

export function getJobPosting(id) {
  return jobPostings.find(j => j.id === id);
}
