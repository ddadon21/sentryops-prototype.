import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Original pages
import About from './pages/About';
import Dashboard from './pages/Dashboard';

// Landing & Auth
import Landing from './pages/Landing';
import SignIn from './pages/SignIn';

// Command Module
import CommandDashboard from './pages/CommandDashboard';
import DailyCommandBrief from './pages/DailyCommandBrief';
import RiskCompliance from './pages/RiskCompliance';
import PersonnelOverview from './pages/PersonnelOverview';
import OrgChart from './pages/OrgChart';
import Approvals from './pages/Approvals';
import BudgetResources from './pages/BudgetResources';
import ReportsAnalytics from './pages/ReportsAnalytics';
import CommandAlerts from './pages/CommandAlerts';
import Settings from './pages/Settings';

// Jail Operations Module
import JailDashboard from './pages/jail/JailDashboard';
import InmateManagement from './pages/jail/InmateManagement';
import BookingProcessing from './pages/jail/BookingProcessing';
import IncidentReports from './pages/jail/IncidentReports';
import MedicalManagement from './pages/jail/MedicalManagement';

// Patrol Operations Module
import CADDispatch from './pages/patrol/CADDispatch';
import UnitManagement from './pages/patrol/UnitManagement';

// Criminal Investigations Module
import ActiveCasesDashboard from './pages/investigations/ActiveCasesDashboard';

// HR Module
import HRDashboard from './pages/HRDashboard';
import ApplicantTracking from './pages/ApplicantTracking';
import JobPostings from './pages/JobPostings';
import HiringPipeline from './pages/HiringPipeline';
import NewHireOnboarding from './pages/NewHireOnboarding';
import EmployeeRecords from './pages/EmployeeRecords';
import TimeOffManagement from './pages/TimeOffManagement';
import PerformanceReviews from './pages/PerformanceReviews';
import TrainingCertifications from './pages/TrainingCertifications';
import ComplianceManagement from './pages/ComplianceManagement';
import HRReports from './pages/HRReports';
import HRSettings from './pages/HRSettings';

// Background Investigations Module
import BackgroundsDashboard from './pages/BackgroundsDashboard';
import ActiveCases from './pages/ActiveCases';
import CaseManagement from './pages/CaseManagement';
import InvestigationTimeline from './pages/InvestigationTimeline';
import SubjectRecords from './pages/SubjectRecords';
import InterviewScheduling from './pages/InterviewScheduling';
import EvidenceTracking from './pages/EvidenceTracking';
import ReferenceChecks from './pages/ReferenceChecks';
import EmploymentVerification from './pages/EmploymentVerification';
import CriminalHistoryReview from './pages/CriminalHistoryReview';
import FinancialBackground from './pages/FinancialBackground';
import SocialMediaAnalysis from './pages/SocialMediaAnalysis';
import BIReports from './pages/BIReports';
import CaseClosure from './pages/CaseClosure';
import BISettings from './pages/BISettings';

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing page as home (standalone, no layout wrapper) */}
        <Route path="/" element={<Landing />} />

        {/* Auth pages (standalone, no layout wrapper) */}
        <Route path="/signin" element={<SignIn />} />

        {/* Command Module with DashboardLayout */}
        <Route path="/command" element={<DashboardLayout />}>
          <Route path="dashboard" element={<CommandDashboard />} />
          <Route path="brief" element={<DailyCommandBrief />} />
          <Route path="risk" element={<RiskCompliance />} />
          <Route path="personnel" element={<PersonnelOverview />} />
          <Route path="orgchart" element={<OrgChart />} />
          <Route path="approvals" element={<Approvals />} />
          <Route path="budget" element={<BudgetResources />} />
          <Route path="reports" element={<ReportsAnalytics />} />
          <Route path="alerts" element={<CommandAlerts />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Jail Operations Module (standalone, no layout wrapper) */}
        <Route path="/jail/dashboard" element={<JailDashboard />} />
        <Route path="/jail/inmates" element={<InmateManagement />} />
        <Route path="/jail/booking" element={<BookingProcessing />} />
        <Route path="/jail/incidents" element={<IncidentReports />} />
        <Route path="/jail/medical" element={<MedicalManagement />} />

        {/* Patrol Operations Module (standalone, no layout wrapper) */}
        <Route path="/patrol/cad" element={<CADDispatch />} />
        <Route path="/patrol/units" element={<UnitManagement />} />

        {/* Criminal Investigations Module (standalone, no layout wrapper) */}
        <Route path="/investigations/cases" element={<ActiveCasesDashboard />} />

        {/* HR Module (standalone, no layout wrapper - each page has its own sidebar) */}
        <Route path="/hr/dashboard" element={<HRDashboard />} />
        <Route path="/hr/jobs" element={<JobPostings />} />
        <Route path="/hr/applicants" element={<ApplicantTracking />} />
        <Route path="/hr/pipeline" element={<HiringPipeline />} />
        <Route path="/hr/onboarding" element={<NewHireOnboarding />} />
        <Route path="/hr/records" element={<EmployeeRecords />} />
        <Route path="/hr/timeoff" element={<TimeOffManagement />} />
        <Route path="/hr/reviews" element={<PerformanceReviews />} />
        <Route path="/hr/training" element={<TrainingCertifications />} />
        <Route path="/hr/compliance" element={<ComplianceManagement />} />
        <Route path="/hr/reports" element={<HRReports />} />
        <Route path="/hr/settings" element={<HRSettings />} />

        {/* Background Investigations Module (standalone, no layout wrapper - each page has its own sidebar) */}
        <Route path="/bi/dashboard" element={<BackgroundsDashboard />} />
        <Route path="/bi/active" element={<ActiveCases />} />
        <Route path="/bi/cases" element={<CaseManagement />} />
        <Route path="/bi/timeline" element={<InvestigationTimeline />} />
        <Route path="/bi/subjects" element={<SubjectRecords />} />
        <Route path="/bi/interviews" element={<InterviewScheduling />} />
        <Route path="/bi/evidence" element={<EvidenceTracking />} />
        <Route path="/bi/references" element={<ReferenceChecks />} />
        <Route path="/bi/employment" element={<EmploymentVerification />} />
        <Route path="/bi/criminal" element={<CriminalHistoryReview />} />
        <Route path="/bi/financial" element={<FinancialBackground />} />
        <Route path="/bi/social" element={<SocialMediaAnalysis />} />
        <Route path="/bi/reports" element={<BIReports />} />
        <Route path="/bi/closure" element={<CaseClosure />} />
        <Route path="/bi/settings" element={<BISettings />} />

        {/* App routes with MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="about" element={<About />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
