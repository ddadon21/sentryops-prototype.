import React, { useState } from 'react';
import { Home, Users, FileText, LayoutDashboard, TrendingUp, AlertCircle, Settings, Bell, MessageCircle, Search, ChevronRight, DollarSign, CheckCircle, Shield, X, Send, Menu, ChevronLeft, LogOut, UserPlus, Briefcase, Clock, Award, Filter, Download, Eye, Calendar, Phone, Mail, MapPin, Star, FileCheck, Upload, CheckCircle2, Circle, AlertTriangle, ClipboardCheck, GraduationCap, ChevronDown, ChevronUp, Car, Radio, Target, Heart, FileWarning, Building, BadgeCheck, Clipboard, UserCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function NewHireOnboarding() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState('onboarding');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('active');
  const [selectedNewHire, setSelectedNewHire] = useState(null);
  const [expandedSection, setExpandedSection] = useState({});
  const [filterPositionType, setFilterPositionType] = useState('all');

  const navigation = [
    { id: 'hr-dashboard', label: 'HR Dashboard', icon: Users, page: 'HRDashboard' },
    { id: 'job-postings', label: 'Job Postings', icon: Briefcase, page: 'JobPostings' },
    { id: 'applicant-tracking', label: 'Applicant Tracking', icon: UserPlus, page: 'ApplicantTracking' },
    { id: 'hiring-pipeline', label: 'Hiring Pipeline', icon: TrendingUp, page: 'HiringPipeline' },
    { id: 'compliance', label: 'HR Compliance', icon: ClipboardCheck, page: 'ComplianceManagement' },
    { id: 'onboarding', label: 'New Hire Onboarding', icon: FileCheck },
    { id: 'training-certifications', label: 'Training & Certifications', icon: GraduationCap, page: 'TrainingCertifications' },
    { id: 'employee-records', label: 'Employee Records', icon: FileText, page: 'EmployeeRecords' },
    { id: 'time-off', label: 'Time Off Management', icon: Calendar, page: 'TimeOffManagement' },
    { id: 'performance', label: 'Performance Reviews', icon: Award, page: 'PerformanceReviews' },
    { id: 'hr-reports', label: 'HR Reports', icon: LayoutDashboard, page: 'HRReports' },
    { id: 'hr-calendar', label: 'HR Calendar', icon: Calendar, page: 'HRCalendar' }
  ];

  const notifications = [
    { id: 1, title: 'FTO Evaluation Due Tomorrow', message: 'Deputy C. Lee Week 8 evaluation due 02/07/2026', time: '1 hour ago', urgent: true },
    { id: 2, title: 'Onboarding Not Started', message: 'Emily Johnson - Records Investigator start date approaching', time: '2 hours ago', urgent: true },
    { id: 3, title: 'CJIS Training Scheduled', message: 'Deputy C. Lee scheduled for 02/15/2026', time: '3 hours ago', urgent: false }
  ];

  // Detailed new hire data with law enforcement onboarding requirements
  const [newHires] = useState([
    {
      id: 1,
      name: 'Christopher Lee',
      position: 'Deputy Sheriff',
      positionType: 'sworn',
      department: 'Patrol Division',
      shift: 'A-Shift (06:00-18:00)',
      unitNumber: '3-Alpha-47',
      hireAuthority: "Sheriff's Order #2024-089",
      hireDate: 'October 28, 2024',
      startDate: '2024-11-14',
      startDateDisplay: 'November 14, 2024',
      email: 'christopher.lee@gwinnettsso.gov',
      phone: '(555) 123-4567',
      status: 'in-progress',
      daysEmployed: 84,
      hireClassification: {
        type: 'Lateral Transfer',
        priorAgency: 'Metro Atlanta Police Department',
        priorExperience: '5 years (2019-2024)',
        postCertified: true,
        postCertNumber: 'GA POST Basic #48291',
        postVerifiedDate: '11/01/2024',
        postExpiration: '06/15/2027',
        startingSalary: '$55,200 (Step 5 - 5 years experience)'
      },
      ftoProgram: {
        enrolled: true,
        fto: 'Deputy M. Rodriguez (#2847)',
        ftoExperience: 'A-Shift, 8-year veteran',
        coordinator: 'Sgt. R. Martinez (Training Division)',
        duration: '12 weeks',
        startDate: '11/18/2024',
        endDate: '02/10/2026',
        currentWeek: 8,
        currentPhase: 'Phase 3: Increased Independence',
        phases: [
          { phase: 1, name: 'Observation and Introduction', weeks: '1-3', status: 'completed', rating: 'Satisfactory progress' },
          { phase: 2, name: 'Supervised Performance', weeks: '4-6', status: 'completed', rating: 'Meets expectations, improving report writing' },
          { phase: 3, name: 'Increased Independence', weeks: '7-9', status: 'in-progress', rating: 'Week 8 evaluation pending (due 02/07/2026)' },
          { phase: 4, name: 'Final Evaluation and Solo Prep', weeks: '10-12', status: 'pending', rating: 'Anticipated completion: February 10, 2026' }
        ],
        evaluationsOnFile: 'Weeks 1-7 (all satisfactory)',
        nextEvaluation: 'Week 8 (due 02/07/2026)',
        anticipatedCompletion: 'February 10, 2026',
        anticipatedSoloPatrol: 'February 11, 2026'
      },
      tasks: {
        preEmployment: [
          { id: 'bg', name: 'Background Investigation Clearance', status: 'completed', completedDate: '10/25/2024', details: 'Investigator: Lt. K. Hayes (IA)', result: 'CLEARED - No disqualifying issues', notes: 'Report filed in personnel file' },
          { id: 'medical', name: 'Medical Examination', status: 'completed', completedDate: '10/30/2024', details: 'Physician: Dr. R. Kumar, MD', result: 'Medically cleared for full duty' },
          { id: 'psych', name: 'Psychological Evaluation', status: 'completed', completedDate: '11/01/2024', details: 'Psychologist: Dr. S. Martinez, PsyD', result: 'Psychologically suited for LE duties' },
          { id: 'post', name: 'POST Certification Verification', status: 'completed', completedDate: '11/01/2024', details: 'GA POST Basic Cert #48291', result: 'Expiration: 06/15/2027 (current and valid)', notes: 'Copy on file in personnel records' }
        ],
        firstDay: [
          { id: 'i9', name: 'I-9 Employment Eligibility Verification', status: 'completed', completedDate: '11/14/2024', details: 'Section 1: Employee completed | Section 2: HR verified (GA DL + SSN card)', notes: 'I-9 form filed (retain 3 years after hire or 1 year after termination)' },
          { id: 'w4', name: 'W-4 Federal Tax Withholding', status: 'completed', completedDate: '11/14/2024', details: 'Submitted to payroll' },
          { id: 'g4', name: 'GA G-4 State Tax Withholding', status: 'completed', completedDate: '11/14/2024', details: 'Submitted to payroll' },
          { id: 'oath', name: 'Oath of Office (Sworn Personnel)', status: 'completed', completedDate: '11/14/2024', details: 'Administered by: Sheriff Keybo Taylor', location: 'GCSO Headquarters, Sheriff\'s Office, 08:00 AM', witnesses: 'HR Director, Major R. Davis', notes: 'Deputy Lee authorized to perform law enforcement duties' },
          { id: 'direct-deposit', name: 'Direct Deposit Authorization', status: 'completed', completedDate: '11/14/2024', details: 'Bank: Wells Fargo', notes: 'First paycheck: 11/30/2024 (verified deposited)' },
          { id: 'emergency', name: 'Emergency Contact Information', status: 'completed', completedDate: '11/14/2024', details: 'Contact: Spouse - J. Lee | Phone: (555) 789-0123' }
        ],
        prePatrol: [
          { id: 'uniform', name: 'Uniform Issue', status: 'completed', completedDate: '11/13/2024', details: 'Full patrol uniform (5 sets), body armor (Level IIIA), duty belt, handcuffs (2), OC spray, baton, flashlight, rain gear, winter jacket', notes: 'All equipment signed for and documented' },
          { id: 'weapon', name: 'Duty Weapon Assignment', status: 'completed', completedDate: '11/14/2024', details: 'Glock 17 Gen5, Serial #GC48291 | 50 rounds duty ammo (9mm Federal HST 147gr)', notes: 'Qualification: 11/15/2024 (scored 287/300, PASS) | Weapons card filed' },
          { id: 'taser', name: 'TASER Issue and Certification', status: 'completed', completedDate: '11/15/2024', details: 'TASER X26P, Serial #T-4829 | 4-hour certification course', instructor: 'Sgt. R. Martinez (TASER Instructor)', notes: 'Certification valid through: 11/15/2026' },
          { id: 'dt', name: 'Defensive Tactics Refresher', status: 'completed', completedDate: '11/16/2024', details: '8-hour refresher for lateral transfer', instructor: 'Deputy M. Johnson (DT Instructor)', notes: 'Topics: GCSO control tactics, handcuffing procedures, defensive techniques' },
          { id: 'uof', name: 'Use of Force Policy Training', status: 'completed', completedDate: '11/16/2024', details: 'GCSO Policy 3.12 - Use of Force | 4-hour classroom', notes: 'Case studies, legal standards, GCSO force continuum, reporting requirements | Acknowledgment signed' },
          { id: 'vehicle', name: 'Patrol Vehicle Assignment', status: 'completed', completedDate: '11/17/2024', details: 'Unit 347 (2023 Ford Explorer, marked patrol)', notes: 'Vehicle inspection completed with FTO | Emergency equipment check: Lights, siren, MDT, radio | Take-home eligibility: After FTO completion' },
          { id: 'radio', name: 'Radio Procedures and Call Sign', status: 'completed', completedDate: '11/17/2024', details: 'Call Sign: Unit 3-Alpha-47 (A-Shift patrol) | Motorola APX8000, ID #R-4729', notes: '4-hour Communications training | Radio check completed with dispatch' },
          { id: 'policies', name: 'GCSO Policies and Procedures Training', status: 'completed', completedDate: '11/14-11/18/2024', details: 'Week 1 orientation', topics: ['GCSO organization and chain of command', 'Patrol procedures and shift operations', 'Report writing (GCSO format)', 'Evidence handling and chain of custody', 'Court procedures and testimony', 'Community policing and public relations', 'Disciplinary process and grievance procedures'], notes: 'All policies reviewed and signed' },
          { id: 'fto-assign', name: 'Field Training Officer (FTO) Assignment', status: 'completed', completedDate: '11/18/2024', details: 'FTO: Deputy M. Rodriguez (#2847) - A-Shift, 8-year veteran', notes: 'Program Duration: 12 weeks (11/18/2024 - 02/10/2026) | Coordinator: Sgt. Martinez' }
        ],
        benefits: [
          { id: 'benefits', name: 'Benefits Enrollment', status: 'completed', completedDate: '11/20/2024', details: 'Health: BCBS PPO (Employee + Spouse) | Dental: Delta Dental | Vision: VSP | Life: $50,000 (employer-provided)', notes: 'Retirement: Georgia Sheriff\'s Retirement System (GSRS) - 6% employee contribution | All elections confirmed' },
          { id: 'handbook', name: 'Employee Handbook Acknowledgment', status: 'completed', completedDate: '11/14/2024', details: 'GCSO Employee Handbook (2024 edition)', notes: 'Signed acknowledgment of receipt, review, and agreement to comply' }
        ],
        administrative: [
          { id: 'email', name: 'Email and Computer Account Setup', status: 'completed', completedDate: '11/13/2024', details: 'Email: christopher.lee@gwinnettsso.gov', notes: 'Network access: Active Directory created | Systems: CAD/RMS, MDT access granted' },
          { id: 'badge', name: 'ID Badge and Access Cards', status: 'completed', completedDate: '11/14/2024', details: 'Photo ID Badge: Deputy C. Lee, Badge #3847', notes: 'Building Access: GCSO HQ, Training Center, Detention' },
          { id: 'parking', name: 'Parking Permit', status: 'completed', completedDate: '11/14/2024', details: 'Permit #P-847', notes: 'Employee lot until take-home vehicle after FTO' },
          { id: 'cjis', name: 'CJIS Security Training', status: 'pending', dueDate: '02/15/2026', details: '4-hour FBI CJIS Security Policy training', location: 'GCSO Training Center', instructor: 'Lt. K. Hayes (CJIS Security Officer)', notes: 'REQUIRED for GCIC/NCIC access | Current workaround: FTO runs queries, Deputy Lee observes', actionRequired: 'Complete training by 02/15/2026' },
          { id: 'tour', name: 'Department Tour and Orientation', status: 'completed', completedDate: '11/14/2024', details: 'Tour conducted by: HR Specialist J. Martinez', locations: 'GCSO HQ, Patrol Division, Detention Center, Training Center, Communications/Dispatch, Records Division', notes: 'Met Sheriff Keybo Taylor, Major R. Davis (Patrol Commander), division supervisors' }
        ]
      },
      pendingActions: [
        { action: 'CJIS Security Training', deadline: '02/15/2026', responsible: 'HR Director', status: 'scheduled' },
        { action: 'FTO Week 8 Evaluation', deadline: '02/07/2026', responsible: 'Deputy M. Rodriguez (FTO)', status: 'due-tomorrow' },
        { action: 'FTO Weeks 9-12', deadline: '02/10/2026', responsible: 'FTO Program', status: 'in-progress' }
      ],
      completionSummary: {
        preEmployment: { completed: 4, total: 4 },
        firstDay: { completed: 6, total: 6 },
        prePatrol: { completed: 9, total: 9 },
        benefits: { completed: 2, total: 2 },
        administrative: { completed: 4, total: 5 }
      }
    },
    {
      id: 2,
      name: 'Nicole Brown',
      position: 'Detention Officer',
      positionType: 'sworn',
      department: 'Detention Center',
      shift: 'B-Shift (18:00-06:00)',
      hireAuthority: "Sheriff's Order #2025-012",
      hireDate: 'January 15, 2025',
      startDate: '2025-02-03',
      startDateDisplay: 'February 03, 2025',
      email: 'nicole.brown@gwinnettsso.gov',
      phone: '(555) 234-5678',
      status: 'in-progress',
      daysEmployed: 3,
      hireClassification: {
        type: 'New Hire (POST Certified)',
        priorAgency: 'None - Academy Graduate',
        priorExperience: 'None (recent POST Academy graduate)',
        postCertified: true,
        postCertNumber: 'GA POST Corrections #52918',
        postVerifiedDate: '01/20/2025',
        postExpiration: '01/15/2028',
        startingSalary: '$42,500 (Step 1 - Entry Level)'
      },
      ftoProgram: {
        enrolled: true,
        fto: 'Sgt. L. Williams (#1892)',
        ftoExperience: 'B-Shift, 12-year veteran',
        coordinator: 'Lt. M. Thompson (Detention Training)',
        duration: '8 weeks',
        startDate: '02/03/2025',
        endDate: '03/31/2025',
        currentWeek: 1,
        currentPhase: 'Phase 1: Orientation and Observation',
        phases: [
          { phase: 1, name: 'Orientation and Observation', weeks: '1-2', status: 'in-progress', rating: 'Day 3 - Learning facility layout and procedures' },
          { phase: 2, name: 'Supervised Inmate Contact', weeks: '3-4', status: 'pending', rating: 'Not started' },
          { phase: 3, name: 'Increased Responsibility', weeks: '5-6', status: 'pending', rating: 'Not started' },
          { phase: 4, name: 'Solo Post Assignment Prep', weeks: '7-8', status: 'pending', rating: 'Anticipated completion: March 31, 2025' }
        ],
        evaluationsOnFile: 'None yet (Week 1)',
        nextEvaluation: 'Week 1 (due 02/10/2025)',
        anticipatedCompletion: 'March 31, 2025',
        anticipatedSoloPost: 'April 01, 2025'
      },
      tasks: {
        preEmployment: [
          { id: 'bg', name: 'Background Investigation Clearance', status: 'completed', completedDate: '01/10/2025', details: 'Investigator: Sgt. K. Davis (IA)', result: 'CLEARED - No disqualifying issues' },
          { id: 'medical', name: 'Medical Examination', status: 'completed', completedDate: '01/12/2025', details: 'Physician: Dr. R. Kumar, MD', result: 'Medically cleared for detention duties' },
          { id: 'psych', name: 'Psychological Evaluation', status: 'completed', completedDate: '01/14/2025', details: 'Psychologist: Dr. S. Martinez, PsyD', result: 'Psychologically suited for detention duties' },
          { id: 'post', name: 'POST Corrections Certification Verification', status: 'completed', completedDate: '01/20/2025', details: 'GA POST Corrections Cert #52918', result: 'Expiration: 01/15/2028 (current and valid)' }
        ],
        firstDay: [
          { id: 'i9', name: 'I-9 Employment Eligibility Verification', status: 'completed', completedDate: '02/03/2025', details: 'Section 1 & 2 completed', notes: 'Documents verified: GA DL + Birth Certificate' },
          { id: 'w4', name: 'W-4 Federal Tax Withholding', status: 'completed', completedDate: '02/03/2025', details: 'Submitted to payroll' },
          { id: 'g4', name: 'GA G-4 State Tax Withholding', status: 'completed', completedDate: '02/03/2025', details: 'Submitted to payroll' },
          { id: 'oath', name: 'Oath of Office (Sworn Personnel)', status: 'completed', completedDate: '02/03/2025', details: 'Administered by: Sheriff Keybo Taylor', location: 'GCSO Headquarters, Sheriff\'s Office, 08:00 AM', notes: 'Officer Brown authorized to perform detention duties' },
          { id: 'direct-deposit', name: 'Direct Deposit Authorization', status: 'completed', completedDate: '02/03/2025', details: 'Bank: Bank of America', notes: 'First paycheck: 02/15/2025' },
          { id: 'emergency', name: 'Emergency Contact Information', status: 'completed', completedDate: '02/03/2025', details: 'Contact: Mother - R. Brown | Phone: (555) 345-6789' }
        ],
        prePatrol: [
          { id: 'uniform', name: 'Detention Uniform Issue', status: 'pending', dueDate: '02/07/2025', details: 'Detention uniform (5 sets), body armor, duty belt, handcuffs, OC spray, radio', actionRequired: 'Uniform fitting scheduled 02/07/2025 - SIZE MEASUREMENTS NEEDED' },
          { id: 'uof', name: 'Use of Force Policy Training (Detention)', status: 'completed', completedDate: '02/04/2025', details: 'GCSO Policy 3.12A - Detention Use of Force | 4-hour classroom', notes: 'Acknowledgment signed' },
          { id: 'dt', name: 'Defensive Tactics Training (Detention)', status: 'completed', completedDate: '02/05/2025', details: '8-hour defensive tactics for detention environment', instructor: 'Deputy M. Johnson (DT Instructor)' },
          { id: 'cpr', name: 'CPR/First Aid Certification', status: 'pending', dueDate: '02/10/2025', details: '8-hour certification course', location: 'GCSO Training Center', actionRequired: 'REQUIRED before unsupervised inmate contact' },
          { id: 'radio', name: 'Radio Communication Training', status: 'pending', dueDate: '02/08/2025', details: 'Detention radio procedures and codes', notes: '2-hour training with Communications' },
          { id: 'fto-assign', name: 'FTO Assignment', status: 'completed', completedDate: '02/03/2025', details: 'FTO: Sgt. L. Williams (#1892) - B-Shift, 12-year veteran', notes: 'Program: 8 weeks (02/03/2025 - 03/31/2025)' }
        ],
        benefits: [
          { id: 'benefits', name: 'Benefits Enrollment', status: 'pending', dueDate: '03/03/2025', details: 'Must enroll within 30 days of hire', notes: 'Benefits orientation packet provided 02/03/2025', actionRequired: 'Deadline: 03/03/2025 - Schedule with HR' },
          { id: 'handbook', name: 'Employee Handbook Acknowledgment', status: 'completed', completedDate: '02/03/2025', details: 'GCSO Employee Handbook (2025 edition)', notes: 'Signed acknowledgment received' }
        ],
        administrative: [
          { id: 'email', name: 'Email and Computer Account Setup', status: 'completed', completedDate: '02/02/2025', details: 'Email: nicole.brown@gwinnettsso.gov', notes: 'Network access created' },
          { id: 'badge', name: 'ID Badge and Access Cards', status: 'completed', completedDate: '02/03/2025', details: 'Photo ID Badge: Officer N. Brown', notes: 'Detention Center access only (restricted until FTO Phase 2)' },
          { id: 'cjis', name: 'CJIS Security Training', status: 'pending', dueDate: '02/12/2025', details: '4-hour FBI CJIS Security Policy training', notes: 'REQUIRED before accessing inmate records/GCIC', actionRequired: 'Scheduled for 02/12/2025' },
          { id: 'tour', name: 'Facility Tour and Orientation', status: 'completed', completedDate: '02/03/2025', details: 'Detention Center full tour with FTO', notes: 'Housing units, booking, control room, medical, visitation areas' }
        ]
      },
      pendingActions: [
        { action: 'Detention Uniform Issue', deadline: '02/07/2025', responsible: 'Quartermaster', status: 'due-tomorrow' },
        { action: 'Radio Communication Training', deadline: '02/08/2025', responsible: 'Communications Division', status: 'upcoming' },
        { action: 'CPR/First Aid Certification', deadline: '02/10/2025', responsible: 'Training Division', status: 'upcoming' },
        { action: 'CJIS Security Training', deadline: '02/12/2025', responsible: 'HR/Lt. Hayes', status: 'scheduled' }
      ],
      completionSummary: {
        preEmployment: { completed: 4, total: 4 },
        firstDay: { completed: 6, total: 6 },
        prePatrol: { completed: 3, total: 6 },
        benefits: { completed: 1, total: 2 },
        administrative: { completed: 3, total: 4 }
      }
    },
    {
      id: 3,
      name: 'Emily Johnson',
      position: 'Records Investigator',
      positionType: 'civilian',
      department: 'Human Resources - Background Investigations',
      shift: 'Day Shift (08:00-17:00)',
      hireAuthority: "HR Requisition #2025-BI-003",
      hireDate: 'January 28, 2025',
      startDate: '2025-02-10',
      startDateDisplay: 'February 10, 2025',
      email: 'emily.johnson@gwinnettsso.gov',
      phone: '(555) 345-6789',
      status: 'not-started',
      daysUntilStart: 4,
      hireClassification: {
        type: 'New Hire (Civilian)',
        priorAgency: 'N/A - Corporate background',
        priorExperience: '3 years HR/Background verification (corporate sector)',
        postCertified: false,
        postCertNumber: 'N/A - Civilian position',
        startingSalary: '$45,000 (Civilian Grade 7)'
      },
      ftoProgram: {
        enrolled: false,
        notes: 'Civilian position - 30-day training/shadowing period with senior investigator'
      },
      tasks: {
        preEmployment: [
          { id: 'bg', name: 'Background Investigation Clearance', status: 'completed', completedDate: '01/22/2025', details: 'Investigator: Sgt. K. Davis (IA)', result: 'CLEARED - Position requires GCIC/NCIC access' },
          { id: 'references', name: 'Reference Checks', status: 'completed', completedDate: '01/20/2025', details: '3 professional references verified', result: 'All references positive' }
        ],
        firstDay: [
          { id: 'i9', name: 'I-9 Employment Eligibility Verification', status: 'pending', dueDate: '02/10/2025', details: 'MUST complete on first day (federal requirement)', actionRequired: 'Bring acceptable documents (List A or List B+C)' },
          { id: 'w4', name: 'W-4 Federal Tax Withholding', status: 'pending', dueDate: '02/10/2025', details: 'Complete before first payroll' },
          { id: 'g4', name: 'GA G-4 State Tax Withholding', status: 'pending', dueDate: '02/10/2025', details: 'Complete before first payroll' },
          { id: 'direct-deposit', name: 'Direct Deposit Authorization', status: 'pending', dueDate: '02/10/2025', details: 'Bring voided check or bank letter' },
          { id: 'emergency', name: 'Emergency Contact Information', status: 'pending', dueDate: '02/10/2025', details: 'Required for personnel file' }
        ],
        prePatrol: [], // N/A for civilian
        benefits: [
          { id: 'benefits', name: 'Benefits Enrollment', status: 'pending', dueDate: '03/10/2025', details: 'Must enroll within 30 days of hire', notes: 'Benefits orientation scheduled for first day afternoon' },
          { id: 'handbook', name: 'Employee Handbook Acknowledgment', status: 'pending', dueDate: '02/10/2025', details: 'GCSO Employee Handbook (2025 edition)' }
        ],
        administrative: [
          { id: 'email', name: 'Email and Computer Account Setup', status: 'pending', dueDate: '02/10/2025', details: 'IT to create accounts before start date', actionRequired: 'IT ticket submitted 01/30/2025' },
          { id: 'badge', name: 'ID Badge and Access Cards', status: 'pending', dueDate: '02/10/2025', details: 'Photo to be taken first day', notes: 'HR building access only initially' },
          { id: 'cjis', name: 'CJIS Security Training', status: 'pending', dueDate: '02/17/2025', details: '4-hour FBI CJIS Security Policy training', notes: 'REQUIRED before accessing GCIC/NCIC for background investigations', actionRequired: 'Must complete within first week' },
          { id: 'office', name: 'Office/Workspace Setup', status: 'pending', dueDate: '02/10/2025', details: 'Desk, computer, phone in HR/BI office', notes: 'Facilities notified - workspace being prepared' },
          { id: 'training', name: 'Background Investigation Procedures Training', status: 'pending', dueDate: '02/10-02/21/2025', details: '2-week training with Senior Investigator Lt. K. Hayes', notes: 'Topics: GCSO BI procedures, GCIC/NCIC queries, interview techniques, report writing' }
        ]
      },
      pendingActions: [
        { action: 'Send Onboarding Packet Reminder', deadline: '02/06/2025', responsible: 'HR Director', status: 'overdue' },
        { action: 'Confirm Start Date', deadline: '02/07/2025', responsible: 'HR Director', status: 'upcoming' },
        { action: 'First Day Orientation', deadline: '02/10/2025', responsible: 'HR Specialist', status: 'scheduled' }
      ],
      completionSummary: {
        preEmployment: { completed: 2, total: 2 },
        firstDay: { completed: 0, total: 5 },
        prePatrol: { completed: 0, total: 0 },
        benefits: { completed: 0, total: 2 },
        administrative: { completed: 0, total: 5 }
      },
      alertMessage: 'ONBOARDING NOT STARTED - Start date 02/10/2025 (4 days). HR Director must send reminder and confirm new hire is prepared.'
    },
    {
      id: 4,
      name: 'Daniel Wilson',
      position: 'Deputy Sheriff',
      positionType: 'sworn',
      department: 'Patrol Division',
      shift: 'C-Shift (14:00-02:00)',
      unitNumber: '3-Charlie-22',
      hireAuthority: "Sheriff's Order #2024-076",
      hireDate: 'September 15, 2024',
      startDate: '2024-10-01',
      startDateDisplay: 'October 01, 2024',
      email: 'daniel.wilson@gwinnettsso.gov',
      phone: '(555) 456-7890',
      status: 'completed',
      daysEmployed: 128,
      completedDate: '2024-12-15',
      hireClassification: {
        type: 'Lateral Transfer',
        priorAgency: 'DeKalb County Police Department',
        priorExperience: '7 years (2017-2024)',
        postCertified: true,
        postCertNumber: 'GA POST Basic #41872',
        postVerifiedDate: '09/20/2024',
        postExpiration: '03/15/2026',
        startingSalary: '$58,500 (Step 7 - 7 years experience)'
      },
      ftoProgram: {
        enrolled: true,
        fto: 'Sgt. R. Martinez (#1547)',
        coordinator: 'Sgt. R. Martinez (Training Division)',
        duration: '10 weeks (shortened for 7-year lateral)',
        startDate: '10/07/2024',
        endDate: '12/15/2024',
        currentWeek: 'COMPLETED',
        currentPhase: 'COMPLETED - Solo Patrol Authorized',
        completionDate: '12/15/2024',
        finalRating: 'Exceeds Expectations - Ready for solo patrol',
        notes: 'Deputy Wilson completed FTO program ahead of schedule. Strong performance in all phases. Recommended for take-home vehicle.'
      },
      completionSummary: {
        preEmployment: { completed: 4, total: 4 },
        firstDay: { completed: 6, total: 6 },
        prePatrol: { completed: 9, total: 9 },
        benefits: { completed: 2, total: 2 },
        administrative: { completed: 5, total: 5 }
      },
      personnelActivated: true,
      activationDate: '12/16/2024',
      currentAssignment: 'Solo Patrol - C-Shift, Beat 22',
      takeHomeVehicle: 'Unit 322 (2024 Ford Explorer, marked patrol)'
    }
  ]);

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

  const getStatusConfig = (status) => {
    const configs = {
      'not-started': { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30', label: 'NOT STARTED', icon: AlertTriangle },
      'in-progress': { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/30', label: 'IN PROGRESS', icon: Clock },
      'completed': { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30', label: 'PERSONNEL ACTIVATED', icon: CheckCircle2 }
    };
    return configs[status] || configs['not-started'];
  };

  const getTaskStatusIcon = (status) => {
    if (status === 'completed') return <CheckCircle2 className="w-4 h-4 text-green-400" />;
    if (status === 'pending') return <Circle className="w-4 h-4 text-amber-700" />;
    if (status === 'overdue') return <AlertTriangle className="w-4 h-4 text-red-400" />;
    return <Clock className="w-4 h-4 text-blue-400" />;
  };

  const toggleSection = (hireId, section) => {
    const key = `${hireId}-${section}`;
    setExpandedSection(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const isSectionExpanded = (hireId, section) => {
    return expandedSection[`${hireId}-${section}`];
  };

  const calculateOverallProgress = (hire) => {
    const summary = hire.completionSummary;
    const totalCompleted = Object.values(summary).reduce((acc, s) => acc + s.completed, 0);
    const totalTasks = Object.values(summary).reduce((acc, s) => acc + s.total, 0);
    return totalTasks > 0 ? Math.round((totalCompleted / totalTasks) * 100) : 0;
  };

  const filteredNewHires = newHires.filter(hire => {
    const statusMatch = activeTab === 'all' ? true :
      activeTab === 'active' ? (hire.status === 'in-progress' || hire.status === 'not-started') :
      hire.status === activeTab;

    const positionMatch = filterPositionType === 'all' ? true : hire.positionType === filterPositionType;

    return statusMatch && positionMatch;
  });

  const statusCounts = {
    all: newHires.length,
    active: newHires.filter(h => h.status === 'in-progress' || h.status === 'not-started').length,
    'in-progress': newHires.filter(h => h.status === 'in-progress').length,
    'not-started': newHires.filter(h => h.status === 'not-started').length,
    completed: newHires.filter(h => h.status === 'completed').length
  };

  const positionCounts = {
    all: newHires.length,
    sworn: newHires.filter(h => h.positionType === 'sworn').length,
    civilian: newHires.filter(h => h.positionType === 'civilian').length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex">
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 border-r border-slate-800/50 backdrop-blur-xl bg-slate-50 dark:bg-slate-900/30 flex flex-col transform transition-all lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} ${sidebarCollapsed ? 'w-20' : 'w-64'}`}>
        <div className="p-4 border-b border-border flex items-center justify-between">
          {!sidebarCollapsed && (
            <div className="flex items-center gap-2">
              <Shield className="w-8 h-8 text-amber-700" />
              <h1 className="text-xl font-bold text-primary">SentryOps</h1>
            </div>
          )}
          {sidebarCollapsed && (
            <Shield className="w-8 h-8 text-amber-700 mx-auto" />
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-lg transition-colors hidden lg:block"
          >
            {sidebarCollapsed ? <ChevronRight className="w-5 h-5 text-secondary" /> : <ChevronLeft className="w-5 h-5 text-secondary" />}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {navigation.map(item => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20' : 'text-secondary hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white'
                } ${sidebarCollapsed ? 'justify-center' : ''}`}
                title={sidebarCollapsed ? item.label : ''}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!sidebarCollapsed && (
                  <span className="flex-1 text-left text-sm font-medium truncate">{item.label}</span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="border-t border-border">
          {!sidebarCollapsed && (
            <div className="px-4 py-3">
              <p className="text-xs text-slate-500 text-center">Gwinnett County Sheriff's Office</p>
            </div>
          )}

          <div className="p-4">
            <button
              onClick={() => setLogoutConfirmOpen(true)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-secondary hover:bg-slate-100 dark:hover:bg-slate-800/40 hover:text-secondary ${sidebarCollapsed ? 'justify-center' : ''}`}
              title={sidebarCollapsed ? 'Sign Out' : ''}
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              {!sidebarCollapsed && (
                <span className="flex-1 text-left text-sm font-medium">Sign Out</span>
              )}
            </button>
          </div>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {logoutConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setLogoutConfirmOpen(false)}
          />
          <div className="relative bg-white dark:bg-slate-900 border border-border rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-white dark:bg-slate-800/60 rounded-xl flex items-center justify-center">
                <LogOut className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-primary">Sign Out</h3>
                <p className="text-sm text-secondary">Are you sure you want to sign out?</p>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setLogoutConfirmOpen(false)}
                className="flex-1 px-4 py-2.5 bg-white dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800/60 border border-slate-700/50 rounded-xl text-primary font-medium transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 px-4 py-2.5 bg-slate-50 dark:bg-slate-700/40 hover:bg-slate-700/60 border border-slate-600/50 rounded-xl text-primary font-medium transition-all"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="border-b border-border backdrop-blur-xl bg-slate-50 dark:bg-slate-900/30">
          <div className="px-4 lg:px-6 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-lg"
              >
                <Menu className="w-5 h-5 text-secondary" />
              </button>
              <div className="flex items-center gap-2 text-sm">
                <button
                  onClick={() => navigate(createPageUrl('HRDashboard'))}
                  className="text-secondary hover:text-primary transition-colors"
                >
                  HR Dashboard
                </button>
                <ChevronRight className="w-4 h-4 text-slate-700" />
                <span className="text-primary">New Hire Onboarding</span>
              </div>
            </div>
            <div className="flex items-center gap-2 lg:gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-sm font-medium transition-all">
                <UserPlus className="w-4 h-4" />
                <span className="hidden sm:inline">Add New Hire</span>
              </button>

              <button className="hidden md:flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800/60 border border-slate-700/50 text-secondary rounded-xl text-sm transition-all">
                <Clipboard className="w-4 h-4" />
                <span>Templates</span>
              </button>

              <div className="relative">
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-lg relative"
                >
                  <Bell className="w-5 h-5 text-secondary" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {notificationsOpen && (
                  <div className="absolute right-0 top-full mt-2 w-96 bg-surface-raised backdrop-blur-xl border border-border rounded-xl shadow-2xl z-50">
                    <div className="p-4 border-b border-border">
                      <h3 className="text-sm font-semibold text-primary">Onboarding Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map(notification => (
                        <div key={notification.id} className={`p-4 border-b border-border dark:border-slate-800/30 hover:bg-slate-100 dark:hover:bg-slate-800/30 cursor-pointer transition-colors ${notification.urgent ? 'bg-amber-500/5' : ''}`}>
                          <div className="flex items-start gap-3">
                            <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${notification.urgent ? 'bg-amber-400' : 'bg-blue-400'}`}></div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-primary mb-1">{notification.title}</p>
                              <p className="text-xs text-secondary mb-2">{notification.message}</p>
                              <p className="text-xs text-slate-500">{notification.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="h-8 w-px bg-white dark:bg-slate-700/50"></div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-primary text-sm font-bold">HR</span>
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-primary">HR Director</p>
                  <p className="text-xs text-secondary">Human Resources</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">
            {/* GCSO Header */}
            <div className="mb-6">
              <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-2">New Hire Onboarding & Personnel Activation</h2>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-secondary">
                <span>Gwinnett County Sheriff's Office</span>
                <span className="text-slate-700">•</span>
                <span>Lawrenceville, Georgia</span>
                <span className="text-slate-700">•</span>
                <span>Thursday, February 06, 2026 • 1:21 PM EST</span>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 mt-1">
                <span>Sheriff: Keybo Taylor</span>
                <span className="text-slate-700">|</span>
                <span>Training Division: Sgt. R. Martinez</span>
                <span className="text-slate-700">|</span>
                <span>System: GCSO-HRIS v4.2</span>
              </div>
            </div>

            {/* Critical Alerts Banner */}
            <div className="mb-6 space-y-3">
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-red-400 mb-1">Emily Johnson (Records Investigator): Onboarding NOT STARTED</p>
                    <p className="text-xs text-secondary">Start date 02/10/2025 (4 days) - HR Director must send reminder and confirm new hire is prepared with required documents</p>
                  </div>
                  <button className="px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-400 rounded-lg text-xs font-medium transition-all">
                    Send Reminder
                  </button>
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-amber-700 mb-1">Christopher Lee (Deputy): FTO Week 8 Evaluation Due Tomorrow (02/07/2026)</p>
                    <p className="text-xs text-secondary">FTO Deputy M. Rodriguez must complete and submit Week 8 evaluation to Sgt. Martinez</p>
                  </div>
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-amber-700 mb-1">Nicole Brown (Detention): 4 Pending Tasks with Approaching Deadlines</p>
                    <p className="text-xs text-secondary">Uniform issue (02/07), Radio training (02/08), CPR/First Aid (02/10), CJIS Training (02/12)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-white dark:bg-slate-800/40 border border-border rounded-xl shadow-sm dark:shadow-none p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                    <UserPlus className="w-5 h-5 text-blue-400" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-primary mb-1">{statusCounts.active}</p>
                <p className="text-sm text-secondary">Active New Hires</p>
                <p className="text-xs text-slate-500 mt-1">In onboarding process</p>
              </div>

              <div className="bg-white dark:bg-slate-800/40 border border-border rounded-xl shadow-sm dark:shadow-none p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-primary mb-1">{statusCounts.completed}</p>
                <p className="text-sm text-secondary">Personnel Activated</p>
                <p className="text-xs text-slate-500 mt-1">This month (FTO complete)</p>
              </div>

              <div className="bg-white dark:bg-slate-800/40 border border-border rounded-xl shadow-sm dark:shadow-none p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-amber-700" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-primary mb-1">2</p>
                <p className="text-sm text-secondary">In FTO Program</p>
                <p className="text-xs text-slate-500 mt-1">Sworn personnel training</p>
              </div>

              <div className="bg-white dark:bg-slate-800/40 border border-border rounded-xl shadow-sm dark:shadow-none p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-primary mb-1">{statusCounts['not-started']}</p>
                <p className="text-sm text-secondary">Not Started</p>
                <p className="text-xs text-slate-500 mt-1">Requires immediate action</p>
              </div>
            </div>

            {/* Filters */}
            <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
              <div className="flex gap-2 border-b border-border overflow-x-auto">
                {[
                  { id: 'all', label: 'All New Hires', count: statusCounts.all },
                  { id: 'active', label: 'Active', count: statusCounts.active },
                  { id: 'in-progress', label: 'In Progress', count: statusCounts['in-progress'] },
                  { id: 'not-started', label: 'Not Started', count: statusCounts['not-started'] },
                  { id: 'completed', label: 'Completed', count: statusCounts.completed }
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

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">Position Type:</span>
                <select
                  value={filterPositionType}
                  onChange={(e) => setFilterPositionType(e.target.value)}
                  className="px-3 py-1.5 bg-white dark:bg-slate-800/40 border border-slate-700/50 rounded-lg text-sm text-primary focus:outline-none focus:border-amber-500/50"
                >
                  <option value="all">All Positions ({positionCounts.all})</option>
                  <option value="sworn">Sworn Personnel ({positionCounts.sworn})</option>
                  <option value="civilian">Civilian Personnel ({positionCounts.civilian})</option>
                </select>
              </div>
            </div>

            {/* New Hires List */}
            <div className="space-y-6">
              {filteredNewHires.map(hire => {
                const statusConfig = getStatusConfig(hire.status);
                const StatusIcon = statusConfig.icon;
                const overallProgress = calculateOverallProgress(hire);

                return (
                  <div
                    key={hire.id}
                    className="bg-white dark:bg-slate-800/40 border border-border rounded-xl overflow-hidden"
                  >
                    {/* Header */}
                    <div className="p-5 border-b border-border dark:border-slate-700/30">
                      <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div className="flex items-start gap-4 flex-1 min-w-0">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                            hire.positionType === 'sworn' ? 'bg-blue-500/20' : 'bg-purple-500/20'
                          }`}>
                            {hire.positionType === 'sworn' ? (
                              <Shield className={`w-6 h-6 ${hire.positionType === 'sworn' ? 'text-blue-400' : 'text-purple-400'}`} />
                            ) : (
                              <Users className="w-6 h-6 text-purple-400" />
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2 flex-wrap">
                              <h3 className="text-lg font-semibold text-primary">{hire.name}</h3>
                              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}>
                                {statusConfig.label}
                              </span>
                              {hire.positionType === 'sworn' && (
                                <span className="px-2 py-1 bg-blue-500/20 border border-blue-500/30 rounded text-xs text-blue-400">
                                  SWORN
                                </span>
                              )}
                              {hire.positionType === 'civilian' && (
                                <span className="px-2 py-1 bg-purple-500/20 border border-purple-500/30 rounded text-xs text-purple-400">
                                  CIVILIAN
                                </span>
                              )}
                            </div>

                            <p className="text-sm text-secondary mb-2">{hire.position} • {hire.department}</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 text-xs text-secondary">
                              <div className="flex items-center gap-2">
                                <Mail className="w-3 h-3" />
                                <span className="truncate">{hire.email}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Phone className="w-3 h-3" />
                                <span>{hire.phone}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Calendar className="w-3 h-3" />
                                <span>Start: {hire.startDateDisplay}</span>
                              </div>
                              {hire.shift && (
                                <div className="flex items-center gap-2">
                                  <Clock className="w-3 h-3" />
                                  <span>{hire.shift}</span>
                                </div>
                              )}
                            </div>

                            {hire.hireAuthority && (
                              <div className="mt-2 text-xs text-slate-500">
                                Hire Authority: {hire.hireAuthority} ({hire.hireDate})
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                          <div className="text-right">
                            <p className="text-sm text-secondary">Critical Path Progress</p>
                            <p className="text-2xl font-bold text-primary">{overallProgress}%</p>
                          </div>
                          <div className="w-32 h-2 bg-white dark:bg-slate-700/50 rounded-full overflow-hidden">
                            <div
                              className={`h-full transition-all ${
                                overallProgress === 100 ? 'bg-green-500' :
                                overallProgress >= 75 ? 'bg-blue-500' :
                                overallProgress >= 50 ? 'bg-amber-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${overallProgress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Hire Classification */}
                    {hire.hireClassification && (
                      <div className="px-5 py-3 bg-slate-50 dark:bg-slate-900/30 border-b border-border dark:border-slate-700/30">
                        <div className="flex flex-wrap gap-4 text-xs">
                          <div>
                            <span className="text-slate-500">Classification:</span>
                            <span className="ml-1 text-secondary">{hire.hireClassification.type}</span>
                          </div>
                          {hire.hireClassification.priorAgency && hire.hireClassification.priorAgency !== 'N/A - Corporate background' && hire.hireClassification.priorAgency !== 'None - Academy Graduate' && (
                            <div>
                              <span className="text-slate-500">Prior Agency:</span>
                              <span className="ml-1 text-secondary">{hire.hireClassification.priorAgency}</span>
                            </div>
                          )}
                          {hire.hireClassification.postCertified && (
                            <div>
                              <span className="text-slate-500">POST Cert:</span>
                              <span className="ml-1 text-green-400">{hire.hireClassification.postCertNumber}</span>
                            </div>
                          )}
                          <div>
                            <span className="text-slate-500">Salary:</span>
                            <span className="ml-1 text-secondary">{hire.hireClassification.startingSalary}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* FTO Program Status (for sworn personnel) */}
                    {hire.ftoProgram && hire.ftoProgram.enrolled && (
                      <div className="px-5 py-4 bg-gradient-to-r from-amber-500/5 to-transparent border-b border-border dark:border-slate-700/30">
                        <div className="flex items-center gap-2 mb-3">
                          <GraduationCap className="w-4 h-4 text-amber-700" />
                          <h4 className="text-sm font-semibold text-amber-700">Field Training Officer (FTO) Program</h4>
                          {hire.ftoProgram.currentWeek !== 'COMPLETED' && (
                            <span className="px-2 py-0.5 bg-amber-500/20 border border-amber-500/30 rounded text-xs text-amber-700">
                              Week {hire.ftoProgram.currentWeek} of {hire.ftoProgram.duration.split(' ')[0]}
                            </span>
                          )}
                          {hire.ftoProgram.currentWeek === 'COMPLETED' && (
                            <span className="px-2 py-0.5 bg-green-500/20 border border-green-500/30 rounded text-xs text-green-400">
                              COMPLETED
                            </span>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                          <div>
                            <span className="text-slate-500">FTO:</span>
                            <span className="ml-1 text-secondary">{hire.ftoProgram.fto}</span>
                          </div>
                          <div>
                            <span className="text-slate-500">Current Phase:</span>
                            <span className="ml-1 text-secondary">{hire.ftoProgram.currentPhase}</span>
                          </div>
                          <div>
                            <span className="text-slate-500">{hire.ftoProgram.currentWeek === 'COMPLETED' ? 'Completed:' : 'Anticipated Completion:'}</span>
                            <span className="ml-1 text-secondary">{hire.ftoProgram.completionDate || hire.ftoProgram.anticipatedCompletion}</span>
                          </div>
                        </div>

                        {hire.ftoProgram.phases && (
                          <div className="mt-3 flex gap-2">
                            {hire.ftoProgram.phases.map((phase, idx) => (
                              <div
                                key={idx}
                                className={`flex-1 p-2 rounded-lg text-center ${
                                  phase.status === 'completed' ? 'bg-green-500/20 border border-green-500/30' :
                                  phase.status === 'in-progress' ? 'bg-blue-500/20 border border-blue-500/30' :
                                  'bg-slate-100 dark:bg-slate-700/30 border border-slate-600/30'
                                }`}
                              >
                                <p className={`text-xs font-medium ${
                                  phase.status === 'completed' ? 'text-green-400' :
                                  phase.status === 'in-progress' ? 'text-blue-400' :
                                  'text-slate-500'
                                }`}>
                                  Phase {phase.phase}
                                </p>
                                <p className="text-[10px] text-slate-500 mt-0.5">Weeks {phase.weeks}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Completion Summary */}
                    <div className="px-5 py-4 border-b border-border dark:border-slate-700/30">
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                        {[
                          { key: 'preEmployment', label: 'Pre-Employment', icon: FileCheck },
                          { key: 'firstDay', label: 'First Day', icon: Calendar },
                          { key: 'prePatrol', label: hire.positionType === 'sworn' ? 'Pre-Duty' : 'Training', icon: Target },
                          { key: 'benefits', label: 'Benefits', icon: Heart },
                          { key: 'administrative', label: 'Administrative', icon: Clipboard }
                        ].map(section => {
                          const data = hire.completionSummary[section.key];
                          if (!data || data.total === 0) return null;
                          const SectionIcon = section.icon;
                          const isComplete = data.completed === data.total;

                          return (
                            <button
                              key={section.key}
                              onClick={() => toggleSection(hire.id, section.key)}
                              className={`p-3 rounded-lg border transition-all text-left ${
                                isComplete
                                  ? 'bg-green-500/10 border-green-500/30 hover:bg-green-500/20'
                                  : data.completed > 0
                                    ? 'bg-blue-500/10 border-blue-500/30 hover:bg-blue-500/20'
                                    : 'bg-slate-100 dark:bg-slate-700/30 border-slate-600/30 hover:bg-slate-100 dark:hover:bg-slate-700/50'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-1">
                                <SectionIcon className={`w-4 h-4 ${
                                  isComplete ? 'text-green-400' : data.completed > 0 ? 'text-blue-400' : 'text-slate-500'
                                }`} />
                                {isSectionExpanded(hire.id, section.key) ? (
                                  <ChevronUp className="w-3 h-3 text-slate-500" />
                                ) : (
                                  <ChevronDown className="w-3 h-3 text-slate-500" />
                                )}
                              </div>
                              <p className="text-xs font-medium text-secondary">{section.label}</p>
                              <p className={`text-sm font-bold ${
                                isComplete ? 'text-green-400' : data.completed > 0 ? 'text-blue-400' : 'text-slate-500'
                              }`}>
                                {data.completed}/{data.total}
                              </p>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Expanded Task Sections */}
                    {['preEmployment', 'firstDay', 'prePatrol', 'benefits', 'administrative'].map(sectionKey => {
                      if (!isSectionExpanded(hire.id, sectionKey)) return null;
                      const tasks = hire.tasks?.[sectionKey];
                      if (!tasks || tasks.length === 0) return null;

                      const sectionLabels = {
                        preEmployment: 'Pre-Employment Requirements',
                        firstDay: 'First Day Requirements',
                        prePatrol: hire.positionType === 'sworn' ? 'Pre-Duty Requirements' : 'Training Requirements',
                        benefits: 'Benefits & Payroll',
                        administrative: 'Administrative Tasks'
                      };

                      return (
                        <div key={sectionKey} className="px-5 py-4 bg-slate-50 dark:bg-slate-900/30 border-b border-border dark:border-slate-700/30">
                          <h4 className="text-sm font-semibold text-secondary mb-3">{sectionLabels[sectionKey]}</h4>
                          <div className="space-y-2">
                            {tasks.map(task => (
                              <div
                                key={task.id}
                                className={`p-3 rounded-lg border ${
                                  task.status === 'completed'
                                    ? 'bg-green-500/5 border-green-500/20'
                                    : task.status === 'overdue'
                                      ? 'bg-red-500/5 border-red-500/20'
                                      : 'bg-slate-100/80 dark:bg-slate-800/30 border-border'
                                }`}
                              >
                                <div className="flex items-start gap-3">
                                  {getTaskStatusIcon(task.status)}
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <p className={`text-sm font-medium ${
                                        task.status === 'completed' ? 'text-green-400' : 'text-primary'
                                      }`}>
                                        {task.name}
                                      </p>
                                      {task.status === 'completed' && task.completedDate && (
                                        <span className="text-xs text-green-400/70">
                                          Completed: {task.completedDate}
                                        </span>
                                      )}
                                      {task.status === 'pending' && task.dueDate && (
                                        <span className="text-xs text-amber-700">
                                          Due: {task.dueDate}
                                        </span>
                                      )}
                                    </div>
                                    {task.details && (
                                      <p className="text-xs text-secondary mt-1">{task.details}</p>
                                    )}
                                    {task.result && (
                                      <p className="text-xs text-green-400/80 mt-1">{task.result}</p>
                                    )}
                                    {task.notes && (
                                      <p className="text-xs text-slate-500 mt-1">{task.notes}</p>
                                    )}
                                    {task.actionRequired && (
                                      <p className="text-xs text-amber-700 mt-1 font-medium">Action Required: {task.actionRequired}</p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}

                    {/* Pending Actions */}
                    {hire.pendingActions && hire.pendingActions.length > 0 && hire.status !== 'completed' && (
                      <div className="px-5 py-4 bg-amber-500/5">
                        <h4 className="text-sm font-semibold text-amber-700 mb-3 flex items-center gap-2">
                          <AlertCircle className="w-4 h-4" />
                          Pending Action Items
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                          {hire.pendingActions.map((action, idx) => (
                            <div
                              key={idx}
                              className={`p-3 rounded-lg border ${
                                action.status === 'overdue' ? 'bg-red-500/10 border-red-500/30' :
                                action.status === 'due-tomorrow' ? 'bg-amber-500/10 border-amber-500/30' :
                                'bg-slate-100/80 dark:bg-slate-800/30 border-border'
                              }`}
                            >
                              <p className={`text-sm font-medium ${
                                action.status === 'overdue' ? 'text-red-400' :
                                action.status === 'due-tomorrow' ? 'text-amber-700' :
                                'text-slate-500'
                              }`}>
                                {action.action}
                              </p>
                              <p className="text-xs text-slate-500 mt-1">
                                Deadline: {action.deadline} • {action.responsible}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Completed Personnel - Activation Info */}
                    {hire.status === 'completed' && hire.personnelActivated && (
                      <div className="px-5 py-4 bg-green-500/5">
                        <div className="flex items-center gap-2 mb-3">
                          <BadgeCheck className="w-5 h-5 text-green-400" />
                          <h4 className="text-sm font-semibold text-green-400">Personnel Activated</h4>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                          <div>
                            <span className="text-slate-500">Activation Date:</span>
                            <span className="ml-1 text-secondary">{hire.activationDate}</span>
                          </div>
                          <div>
                            <span className="text-slate-500">Current Assignment:</span>
                            <span className="ml-1 text-secondary">{hire.currentAssignment}</span>
                          </div>
                          {hire.takeHomeVehicle && (
                            <div>
                              <span className="text-slate-500">Take-Home Vehicle:</span>
                              <span className="ml-1 text-secondary">{hire.takeHomeVehicle}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="px-5 py-4 flex flex-wrap gap-2">
                      <button
                        onClick={() => setSelectedNewHire(hire)}
                        className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 text-blue-400 rounded-lg text-sm font-medium transition-all flex items-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        View Full Details
                      </button>
                      {hire.ftoProgram?.enrolled && hire.status === 'in-progress' && (
                        <button className="px-4 py-2 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 text-amber-700 rounded-lg text-sm font-medium transition-all flex items-center gap-2">
                          <GraduationCap className="w-4 h-4" />
                          View FTO Evaluations
                        </button>
                      )}
                      <button className="px-4 py-2 bg-slate-50 dark:bg-slate-700/40 hover:bg-slate-700/60 border border-slate-600/50 text-secondary rounded-lg text-sm font-medium transition-all flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Export Checklist
                      </button>
                      {hire.status !== 'completed' && (
                        <button className="px-4 py-2 bg-slate-50 dark:bg-slate-700/40 hover:bg-slate-700/60 border border-slate-600/50 text-secondary rounded-lg text-sm font-medium transition-all flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          Send Reminder
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>

      {/* Detail Modal */}
      {selectedNewHire && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedNewHire(null)}
          />
          <div className="relative bg-white dark:bg-slate-900 border border-border rounded-2xl p-6 max-w-4xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-primary mb-2">{selectedNewHire.name}</h3>
                <p className="text-sm text-secondary">{selectedNewHire.position} • {selectedNewHire.department}</p>
                {selectedNewHire.hireAuthority && (
                  <p className="text-xs text-slate-500 mt-1">{selectedNewHire.hireAuthority}</p>
                )}
              </div>
              <button
                onClick={() => setSelectedNewHire(null)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-secondary" />
              </button>
            </div>

            {/* Personnel Details */}
            <div className="grid grid-cols-2 gap-6 mb-6 p-4 bg-slate-100/80 dark:bg-slate-800/30 rounded-xl">
              <div>
                <p className="text-xs text-slate-500 mb-1">Email</p>
                <p className="text-sm text-secondary">{selectedNewHire.email}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Phone</p>
                <p className="text-sm text-secondary">{selectedNewHire.phone}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Start Date</p>
                <p className="text-sm text-secondary">{selectedNewHire.startDateDisplay}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Position Type</p>
                <p className="text-sm text-secondary capitalize">{selectedNewHire.positionType}</p>
              </div>
              {selectedNewHire.shift && (
                <div>
                  <p className="text-xs text-slate-500 mb-1">Assigned Shift</p>
                  <p className="text-sm text-secondary">{selectedNewHire.shift}</p>
                </div>
              )}
              {selectedNewHire.unitNumber && (
                <div>
                  <p className="text-xs text-slate-500 mb-1">Unit Number</p>
                  <p className="text-sm text-secondary">{selectedNewHire.unitNumber}</p>
                </div>
              )}
            </div>

            {/* Classification */}
            {selectedNewHire.hireClassification && (
              <div className="mb-6 p-4 bg-slate-100/80 dark:bg-slate-800/30 rounded-xl">
                <h4 className="text-sm font-semibold text-secondary mb-3">Hire Classification</h4>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-500">Type:</span>
                    <span className="ml-1 text-secondary">{selectedNewHire.hireClassification.type}</span>
                  </div>
                  {selectedNewHire.hireClassification.priorExperience && (
                    <div>
                      <span className="text-slate-500">Prior Experience:</span>
                      <span className="ml-1 text-secondary">{selectedNewHire.hireClassification.priorExperience}</span>
                    </div>
                  )}
                  {selectedNewHire.hireClassification.postCertified && (
                    <>
                      <div>
                        <span className="text-slate-500">POST Certification:</span>
                        <span className="ml-1 text-green-400">{selectedNewHire.hireClassification.postCertNumber}</span>
                      </div>
                      <div>
                        <span className="text-slate-500">POST Expiration:</span>
                        <span className="ml-1 text-secondary">{selectedNewHire.hireClassification.postExpiration}</span>
                      </div>
                    </>
                  )}
                  <div className="col-span-2">
                    <span className="text-slate-500">Starting Salary:</span>
                    <span className="ml-1 text-secondary">{selectedNewHire.hireClassification.startingSalary}</span>
                  </div>
                </div>
              </div>
            )}

            {/* FTO Program Details */}
            {selectedNewHire.ftoProgram?.enrolled && (
              <div className="mb-6 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                <h4 className="text-sm font-semibold text-amber-700 mb-3">FTO Program Details</h4>
                <div className="grid grid-cols-2 gap-3 text-xs mb-4">
                  <div>
                    <span className="text-slate-500">FTO:</span>
                    <span className="ml-1 text-secondary">{selectedNewHire.ftoProgram.fto}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Coordinator:</span>
                    <span className="ml-1 text-secondary">{selectedNewHire.ftoProgram.coordinator}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Duration:</span>
                    <span className="ml-1 text-secondary">{selectedNewHire.ftoProgram.duration}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Current Week:</span>
                    <span className="ml-1 text-secondary">{selectedNewHire.ftoProgram.currentWeek}</span>
                  </div>
                </div>

                {selectedNewHire.ftoProgram.phases && (
                  <div className="space-y-2">
                    {selectedNewHire.ftoProgram.phases.map((phase, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded-lg ${
                          phase.status === 'completed' ? 'bg-green-500/10' :
                          phase.status === 'in-progress' ? 'bg-blue-500/10' :
                          'bg-slate-100/80 dark:bg-slate-800/30'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className={`text-sm font-medium ${
                              phase.status === 'completed' ? 'text-green-400' :
                              phase.status === 'in-progress' ? 'text-blue-400' :
                              'text-slate-500'
                            }`}>
                              Phase {phase.phase}: {phase.name}
                            </p>
                            <p className="text-xs text-slate-500">Weeks {phase.weeks}</p>
                          </div>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            phase.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                            phase.status === 'in-progress' ? 'bg-blue-500/20 text-blue-400' :
                            'bg-white dark:bg-slate-700/50 text-slate-500'
                          }`}>
                            {phase.status.toUpperCase().replace('-', ' ')}
                          </span>
                        </div>
                        <p className="text-xs text-secondary mt-1">{phase.rating}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Quick Progress Summary */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-secondary mb-3">Onboarding Progress Summary</h4>
              <div className="grid grid-cols-5 gap-2">
                {Object.entries(selectedNewHire.completionSummary).map(([key, value]) => {
                  if (value.total === 0) return null;
                  const labels = {
                    preEmployment: 'Pre-Emp',
                    firstDay: 'First Day',
                    prePatrol: 'Pre-Duty',
                    benefits: 'Benefits',
                    administrative: 'Admin'
                  };
                  const isComplete = value.completed === value.total;

                  return (
                    <div
                      key={key}
                      className={`p-3 rounded-lg text-center ${
                        isComplete ? 'bg-green-500/20' : value.completed > 0 ? 'bg-blue-500/20' : 'bg-slate-100 dark:bg-slate-700/30'
                      }`}
                    >
                      <p className="text-xs text-secondary">{labels[key]}</p>
                      <p className={`text-lg font-bold ${
                        isComplete ? 'text-green-400' : value.completed > 0 ? 'text-blue-400' : 'text-slate-500'
                      }`}>
                        {value.completed}/{value.total}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-border">
              <button className="flex-1 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-all">
                Print Full Checklist
              </button>
              <button className="flex-1 px-4 py-3 bg-slate-50 dark:bg-slate-700/40 hover:bg-slate-700/60 border border-slate-600/50 text-primary rounded-xl font-medium transition-all">
                View Personnel File
              </button>
              <button
                onClick={() => setSelectedNewHire(null)}
                className="px-4 py-3 bg-white dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800/60 border border-slate-700/50 text-secondary rounded-xl font-medium transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
