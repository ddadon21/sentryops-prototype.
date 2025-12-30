/**
 * Creates a URL path for a given page component name
 * @param pageName - The name of the page component
 * @returns The URL path for the page
 */
export function createPageUrl(pageName: string): string {
  // Map page names to their routes
  const pageRoutes: Record<string, string> = {
    // Auth & Landing
    Landing: '/',
    SignIn: '/signin',

    // Command Module
    CommandDashboard: '/command/dashboard',
    PersonnelOverview: '/command/personnel',
    OrgChart: '/command/orgchart',
    Approvals: '/command/approvals',
    BudgetResources: '/command/budget',
    ReportsAnalytics: '/command/reports',
    CommandAlerts: '/command/alerts',
    Settings: '/command/settings',

    // HR Module
    HRDashboard: '/hr/dashboard',
    ApplicantTracking: '/hr/applicants',
    JobPostings: '/hr/jobs',
    HiringPipeline: '/hr/pipeline',
    NewHireOnboarding: '/hr/onboarding',
    EmployeeRecords: '/hr/records',
    TimeOffManagement: '/hr/timeoff',
    PerformanceReviews: '/hr/reviews',
    TrainingCertifications: '/hr/training',
    ComplianceManagement: '/hr/compliance',
    HRReports: '/hr/reports',
    HRSettings: '/hr/settings',

    // Background Investigations Module
    BIDashboard: '/investigations/dashboard',
    ActiveCases: '/investigations/active',
    CaseManagement: '/investigations/cases',
    InvestigationTimeline: '/investigations/timeline',
    SubjectRecords: '/investigations/subjects',
    InterviewScheduling: '/investigations/interviews',
    EvidenceTracking: '/investigations/evidence',
    ReferenceChecks: '/investigations/references',
    EmploymentVerification: '/investigations/employment',
    CriminalHistoryReview: '/investigations/criminal',
    FinancialBackground: '/investigations/financial',
    SocialMediaAnalysis: '/investigations/social',
    BIReports: '/investigations/reports',
    CaseClosure: '/investigations/closure',

    // Original pages
    Home: '/',
    About: '/about',
    Dashboard: '/dashboard',
  };

  return pageRoutes[pageName] || '/';
}
