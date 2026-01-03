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
import BackgroundsDashboard from './pages/BackgroundsDashboard';
import ActiveCases from './pages/ActiveCases';
import CaseManagement from './pages/CaseManagement';

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
