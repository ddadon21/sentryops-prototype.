import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';

// Original pages
import About from './pages/About';
import Dashboard from './pages/Dashboard';

// Landing & Auth
import Landing from './pages/Landing';
import SignIn from './pages/SignIn';

// Command Module
import CommandDashboard from './pages/CommandDashboard';
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
import BIDashboard from './pages/BIDashboard';
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

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing page as home (standalone, no layout wrapper) */}
        <Route path="/" element={<Landing />} />

        {/* Auth pages (standalone, no layout wrapper) */}
        <Route path="/signin" element={<SignIn />} />

        {/* Command Dashboard (standalone, no layout wrapper) */}
        <Route path="/command/dashboard" element={<CommandDashboard />} />

        {/* Command Module Pages (standalone, no layout wrapper) */}
        <Route path="/command/personnel" element={<PersonnelOverview />} />
        <Route path="/command/orgchart" element={<OrgChart />} />
        <Route path="/command/approvals" element={<Approvals />} />
        <Route path="/command/budget" element={<BudgetResources />} />
        <Route path="/command/reports" element={<ReportsAnalytics />} />
        <Route path="/command/alerts" element={<CommandAlerts />} />
        <Route path="/command/settings" element={<Settings />} />

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

        {/* App routes with MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="about" element={<About />} />
          <Route path="dashboard" element={<Dashboard />} />

          {/* HR Module */}
          <Route path="hr">
            <Route path="dashboard" element={<HRDashboard />} />
            <Route path="applicants" element={<ApplicantTracking />} />
            <Route path="jobs" element={<JobPostings />} />
            <Route path="pipeline" element={<HiringPipeline />} />
            <Route path="onboarding" element={<NewHireOnboarding />} />
            <Route path="records" element={<EmployeeRecords />} />
            <Route path="timeoff" element={<TimeOffManagement />} />
            <Route path="reviews" element={<PerformanceReviews />} />
            <Route path="training" element={<TrainingCertifications />} />
            <Route path="compliance" element={<ComplianceManagement />} />
            <Route path="reports" element={<HRReports />} />
            <Route path="settings" element={<HRSettings />} />
          </Route>

          {/* Background Investigations Module */}
          <Route path="investigations">
            <Route path="dashboard" element={<BIDashboard />} />
            <Route path="active" element={<ActiveCases />} />
            <Route path="cases" element={<CaseManagement />} />
            <Route path="timeline" element={<InvestigationTimeline />} />
            <Route path="subjects" element={<SubjectRecords />} />
            <Route path="interviews" element={<InterviewScheduling />} />
            <Route path="evidence" element={<EvidenceTracking />} />
            <Route path="references" element={<ReferenceChecks />} />
            <Route path="employment" element={<EmploymentVerification />} />
            <Route path="criminal" element={<CriminalHistoryReview />} />
            <Route path="financial" element={<FinancialBackground />} />
            <Route path="social" element={<SocialMediaAnalysis />} />
            <Route path="reports" element={<BIReports />} />
            <Route path="closure" element={<CaseClosure />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
