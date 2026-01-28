import React, { useState } from 'react';
import {
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Phone,
  Mail,
  User,
  FileText,
  Shield,
  MapPin,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Search,
  Filter,
  Download,
  Plus,
  XCircle,
  AlertCircle,
  Scale,
  BadgeCheck,
  UserCheck,
  ClipboardList,
  PhoneCall,
  MessageSquare,
  BookOpen,
  HelpCircle,
  FileCheck,
  History,
  TrendingUp,
  Award,
  Flag
} from 'lucide-react';

const EmploymentVerification = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [expandedEmployer, setExpandedEmployer] = useState('emp-1');
  const [searchTerm, setSearchTerm] = useState('');

  // Comprehensive employment records with verification details
  const employmentRecords = [
    {
      id: 'emp-1',
      employer: 'Metro City Police Department',
      position: 'Police Officer II',
      department: 'Patrol Division',
      location: 'Metro City, CA',
      startDate: '2019-03-15',
      endDate: 'Present',
      isCurrent: true,
      isSwornLE: true,
      isLateralTransfer: true,
      verificationStatus: 'Verified',
      verificationMethod: 'HR Direct Call + Supervisor Interview',
      verificationDate: '2024-01-18',
      verifiedBy: 'Sgt. Patricia Vance',
      hrContact: {
        name: 'Maria Santos',
        title: 'HR Specialist',
        phone: '(555) 234-5678',
        email: 'msantos@metrocitypd.gov',
        contactDate: '2024-01-18',
        contactMethod: 'Phone Call'
      },
      supervisorContact: {
        name: 'Lt. James Morrison',
        title: 'Watch Commander',
        phone: '(555) 234-5680',
        email: 'jmorrison@metrocitypd.gov',
        contactDate: '2024-01-19',
        contactMethod: 'In-Person Interview'
      },
      salary: {
        starting: '$68,500',
        current: '$82,400',
        rank: 'Step 4'
      },
      performance: {
        rating: 'Meets Standards',
        lastReview: '2023-09-15',
        commendations: 3,
        awards: ['Officer of the Month - June 2022', 'Life Saving Award - 2021']
      },
      disciplinary: {
        hasRecords: true,
        details: 'One written counseling (2020) - Tardiness. No sustained complaints.',
        sustainedComplaints: 0,
        pendingInvestigations: 0
      },
      internalAffairs: {
        required: true,
        status: 'Requested',
        requestDate: '2024-01-18',
        expectedDate: '2024-02-01',
        contactPerson: 'Capt. Robert Chen, IA Division',
        notes: 'Standard lateral transfer IA clearance request submitted'
      },
      reasonForLeaving: 'Seeking advancement opportunity / Lateral transfer',
      eligibleForRehire: 'Yes',
      notes: 'Candidate is currently employed. Lateral transfer requires mandatory IA clearance before conditional offer.',
      timeline: [
        { date: '2024-01-18', action: 'HR verification completed', by: 'Sgt. Vance' },
        { date: '2024-01-18', action: 'IA records request submitted', by: 'Sgt. Vance' },
        { date: '2024-01-19', action: 'Supervisor interview completed', by: 'Sgt. Vance' },
        { date: '2024-01-20', action: 'Awaiting IA clearance response', by: 'System' }
      ]
    },
    {
      id: 'emp-2',
      employer: 'Riverside County Sheriff\'s Office',
      position: 'Deputy Sheriff',
      department: 'Corrections Division',
      location: 'Riverside, CA',
      startDate: '2016-06-01',
      endDate: '2019-03-01',
      isCurrent: false,
      isSwornLE: true,
      isLateralTransfer: false,
      verificationStatus: 'Verified',
      verificationMethod: 'HR Direct Call + Personnel File Review',
      verificationDate: '2024-01-17',
      verifiedBy: 'Sgt. Patricia Vance',
      hrContact: {
        name: 'Thomas Wright',
        title: 'Personnel Records Supervisor',
        phone: '(555) 345-6789',
        email: 'twright@riversidesheriff.gov',
        contactDate: '2024-01-17',
        contactMethod: 'Phone Call'
      },
      supervisorContact: {
        name: 'Sgt. Michael Torres (Retired)',
        title: 'Former Shift Supervisor',
        phone: '(555) 345-6790',
        email: null,
        contactDate: '2024-01-17',
        contactMethod: 'Phone Call'
      },
      salary: {
        starting: '$52,000',
        ending: '$64,800',
        rank: 'Deputy II'
      },
      performance: {
        rating: 'Exceeds Standards',
        lastReview: '2019-01-15',
        commendations: 5,
        awards: ['Deputy of the Quarter - Q3 2018']
      },
      disciplinary: {
        hasRecords: false,
        details: 'No disciplinary actions on file',
        sustainedComplaints: 0,
        pendingInvestigations: 0
      },
      internalAffairs: {
        required: false,
        status: 'Not Required',
        notes: 'Former employer - standard verification only. IA records reviewed as part of personnel file.'
      },
      reasonForLeaving: 'Accepted patrol position at Metro City PD',
      eligibleForRehire: 'Yes - Recommended',
      notes: 'Left in good standing. Former supervisor highly recommends candidate.',
      timeline: [
        { date: '2024-01-17', action: 'HR verification completed', by: 'Sgt. Vance' },
        { date: '2024-01-17', action: 'Personnel file reviewed', by: 'Sgt. Vance' },
        { date: '2024-01-17', action: 'Former supervisor contacted', by: 'Sgt. Vance' }
      ]
    },
    {
      id: 'emp-3',
      employer: 'Valley Security Services',
      position: 'Security Officer',
      department: 'Commercial Properties',
      location: 'Valley Center, CA',
      startDate: '2014-08-15',
      endDate: '2016-05-20',
      isCurrent: false,
      isSwornLE: false,
      isLateralTransfer: false,
      verificationStatus: 'Verified',
      verificationMethod: 'HR Direct Call',
      verificationDate: '2024-01-16',
      verifiedBy: 'Sgt. Patricia Vance',
      hrContact: {
        name: 'Jennifer Lopez',
        title: 'Human Resources Manager',
        phone: '(555) 456-7890',
        email: 'jlopez@valleysecurity.com',
        contactDate: '2024-01-16',
        contactMethod: 'Phone Call'
      },
      supervisorContact: null,
      salary: {
        starting: '$14.50/hr',
        ending: '$17.25/hr',
        rank: 'Senior Officer'
      },
      performance: {
        rating: 'Satisfactory',
        lastReview: '2016-02-01',
        commendations: 1,
        awards: []
      },
      disciplinary: {
        hasRecords: false,
        details: 'No disciplinary actions on file',
        sustainedComplaints: 0,
        pendingInvestigations: 0
      },
      internalAffairs: {
        required: false,
        status: 'Not Applicable',
        notes: 'Non-sworn position'
      },
      reasonForLeaving: 'Accepted position with Sheriff\'s Office',
      eligibleForRehire: 'Yes',
      notes: 'Pre-law enforcement employment. Verified dates and position.',
      timeline: [
        { date: '2024-01-16', action: 'HR verification completed', by: 'Sgt. Vance' }
      ]
    },
    {
      id: 'emp-4',
      employer: 'Quick Mart Inc.',
      position: 'Assistant Manager',
      department: 'Retail Operations',
      location: 'San Diego, CA',
      startDate: '2012-05-01',
      endDate: '2014-08-01',
      isCurrent: false,
      isSwornLE: false,
      isLateralTransfer: false,
      verificationStatus: 'Unable to Verify',
      verificationMethod: 'Multiple Attempts',
      verificationDate: null,
      verifiedBy: 'Sgt. Patricia Vance',
      hrContact: {
        name: 'Unknown',
        title: 'HR Department',
        phone: '(555) 567-8901',
        email: 'hr@quickmart.com',
        contactDate: '2024-01-19',
        contactMethod: 'Phone/Email - No Response'
      },
      supervisorContact: null,
      salary: {
        starting: '$12.00/hr',
        ending: '$14.00/hr',
        rank: 'Assistant Manager'
      },
      performance: {
        rating: 'Unknown',
        lastReview: null,
        commendations: 0,
        awards: []
      },
      disciplinary: {
        hasRecords: null,
        details: 'Unable to verify - company unresponsive',
        sustainedComplaints: null,
        pendingInvestigations: null
      },
      internalAffairs: {
        required: false,
        status: 'Not Applicable',
        notes: 'Non-sworn position'
      },
      reasonForLeaving: 'Career change to security field',
      eligibleForRehire: 'Unknown',
      notes: 'Company HR unresponsive after multiple contact attempts. Candidate provided W-2 and pay stubs as alternative documentation.',
      contactAttempts: [
        { date: '2024-01-15', method: 'Phone', result: 'Voicemail - left message', by: 'Sgt. Vance' },
        { date: '2024-01-16', method: 'Email', result: 'No response', by: 'Sgt. Vance' },
        { date: '2024-01-17', method: 'Phone', result: 'Voicemail - left message', by: 'Sgt. Vance' },
        { date: '2024-01-19', method: 'Phone', result: 'Line disconnected', by: 'Sgt. Vance' }
      ],
      alternativeDocumentation: ['W-2 Form (2013)', 'W-2 Form (2014)', 'Pay stubs (3)'],
      timeline: [
        { date: '2024-01-15', action: 'Initial contact attempt - voicemail', by: 'Sgt. Vance' },
        { date: '2024-01-16', action: 'Email sent to HR', by: 'Sgt. Vance' },
        { date: '2024-01-17', action: 'Second phone attempt - voicemail', by: 'Sgt. Vance' },
        { date: '2024-01-19', action: 'Phone line disconnected - marked unable to verify', by: 'Sgt. Vance' },
        { date: '2024-01-19', action: 'Alternative documentation collected from candidate', by: 'Sgt. Vance' }
      ]
    },
    {
      id: 'emp-5',
      employer: 'Self-Employed',
      position: 'Landscaping Services',
      department: null,
      location: 'San Diego County, CA',
      startDate: '2010-06-01',
      endDate: '2012-04-30',
      isCurrent: false,
      isSwornLE: false,
      isLateralTransfer: false,
      verificationStatus: 'Documented',
      verificationMethod: 'Tax Records + Client References',
      verificationDate: '2024-01-16',
      verifiedBy: 'Sgt. Patricia Vance',
      hrContact: null,
      supervisorContact: null,
      salary: {
        starting: 'Variable',
        ending: 'Variable',
        rank: 'Owner/Operator'
      },
      performance: {
        rating: 'N/A',
        lastReview: null,
        commendations: 0,
        awards: []
      },
      disciplinary: {
        hasRecords: false,
        details: 'N/A - Self-employed',
        sustainedComplaints: null,
        pendingInvestigations: null
      },
      internalAffairs: {
        required: false,
        status: 'Not Applicable',
        notes: 'Non-sworn position'
      },
      reasonForLeaving: 'Pursued retail management opportunity',
      eligibleForRehire: 'N/A',
      notes: 'Self-employment verified through tax records and client references.',
      alternativeDocumentation: ['Tax Return (2010)', 'Tax Return (2011)', 'Business License', 'Client References (2)'],
      timeline: [
        { date: '2024-01-16', action: 'Tax records reviewed', by: 'Sgt. Vance' },
        { date: '2024-01-16', action: 'Client references contacted', by: 'Sgt. Vance' },
        { date: '2024-01-16', action: 'Self-employment documented', by: 'Sgt. Vance' }
      ]
    }
  ];

  // Helper functions for status badges
  const getVerificationStatusBadge = (status) => {
    switch (status) {
      case 'Verified':
        return (
          <span className="px-2.5 py-1 bg-green-500/10 text-green-400 rounded-lg text-xs font-medium flex items-center gap-1.5">
            <CheckCircle2 className="w-3 h-3" />
            Verified
          </span>
        );
      case 'Pending':
        return (
          <span className="px-2.5 py-1 bg-amber-500/10 text-amber-400 rounded-lg text-xs font-medium flex items-center gap-1.5">
            <Clock className="w-3 h-3" />
            Pending
          </span>
        );
      case 'Unable to Verify':
        return (
          <span className="px-2.5 py-1 bg-red-500/10 text-red-400 rounded-lg text-xs font-medium flex items-center gap-1.5">
            <AlertTriangle className="w-3 h-3" />
            Unable to Verify
          </span>
        );
      case 'Documented':
        return (
          <span className="px-2.5 py-1 bg-blue-500/10 text-blue-400 rounded-lg text-xs font-medium flex items-center gap-1.5">
            <FileCheck className="w-3 h-3" />
            Documented
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 bg-zinc-500/10 text-zinc-400 rounded-lg text-xs font-medium">
            {status}
          </span>
        );
    }
  };

  const getIAStatusBadge = (status) => {
    switch (status) {
      case 'Cleared':
        return (
          <span className="px-2.5 py-1 bg-green-500/10 text-green-400 rounded-lg text-xs font-medium flex items-center gap-1.5">
            <Shield className="w-3 h-3" />
            IA Cleared
          </span>
        );
      case 'Requested':
        return (
          <span className="px-2.5 py-1 bg-amber-500/10 text-amber-400 rounded-lg text-xs font-medium flex items-center gap-1.5">
            <Clock className="w-3 h-3" />
            IA Pending
          </span>
        );
      case 'Not Required':
        return (
          <span className="px-2.5 py-1 bg-zinc-500/10 text-zinc-400 rounded-lg text-xs font-medium flex items-center gap-1.5">
            <CheckCircle2 className="w-3 h-3" />
            IA Not Required
          </span>
        );
      case 'Not Applicable':
        return (
          <span className="px-2.5 py-1 bg-zinc-500/10 text-zinc-400 rounded-lg text-xs font-medium">
            N/A
          </span>
        );
      default:
        return null;
    }
  };

  const getEmploymentTypeBadge = (record) => {
    if (record.isLateralTransfer && record.isCurrent) {
      return (
        <span className="px-2.5 py-1 bg-blue-500/10 text-blue-400 rounded-lg text-xs font-medium flex items-center gap-1.5">
          <BadgeCheck className="w-3 h-3" />
          Lateral Transfer
        </span>
      );
    }
    if (record.isSwornLE) {
      return (
        <span className="px-2.5 py-1 bg-amber-500/10 text-amber-400 rounded-lg text-xs font-medium flex items-center gap-1.5">
          <Shield className="w-3 h-3" />
          Sworn LE
        </span>
      );
    }
    return (
      <span className="px-2.5 py-1 bg-zinc-500/10 text-zinc-400 rounded-lg text-xs font-medium">
        Civilian
      </span>
    );
  };

  // Filter records based on active tab
  const filteredRecords = employmentRecords.filter(record => {
    if (activeTab === 'verified') return record.verificationStatus === 'Verified';
    if (activeTab === 'pending') return record.verificationStatus === 'Pending' || record.verificationStatus === 'Unable to Verify';
    if (activeTab === 'sworn') return record.isSwornLE;
    return true;
  });

  // Calculate statistics
  const stats = {
    total: employmentRecords.length,
    verified: employmentRecords.filter(r => r.verificationStatus === 'Verified').length,
    pending: employmentRecords.filter(r => r.verificationStatus === 'Pending').length,
    swornLE: employmentRecords.filter(r => r.isSwornLE).length,
    lateralTransfer: employmentRecords.filter(r => r.isLateralTransfer).length,
    yearsDocumented: 14 // Calculate from actual records
  };

  // Format date helper
  const formatDate = (dateStr) => {
    if (!dateStr || dateStr === 'Present') return dateStr;
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Employment Verification</h1>
          <p className="text-zinc-400 mt-1">Marcus Thompson — Case #2024-0892</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-zinc-800 text-zinc-300 rounded-lg hover:bg-zinc-700 transition-colors">
            <Download className="w-4 h-4" />
            Export Report
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-500 transition-colors">
            <Plus className="w-4 h-4" />
            Add Employer
          </button>
        </div>
      </div>

      {/* POST Requirement Notice */}
      <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-amber-500/20 rounded-lg">
            <Scale className="w-5 h-5 text-amber-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-amber-400 font-medium">POST Employment History Requirement</h3>
            <p className="text-zinc-400 text-sm mt-1">
              California POST requires verification of all employment for the past 10 years.
              Current documentation covers <span className="text-amber-400 font-medium">14 years</span> of
              employment history (2010-Present), exceeding the minimum requirement.
            </p>
            <div className="flex items-center gap-4 mt-3 text-xs">
              <span className="text-zinc-500">POST Reg. 1953(f)(1)</span>
              <span className="text-zinc-600">•</span>
              <span className="text-green-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Requirement Met
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Lateral Transfer Alert - Only shows if applicable */}
      {stats.lateralTransfer > 0 && (
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <BadgeCheck className="w-5 h-5 text-blue-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-blue-400 font-medium flex items-center gap-2">
                Lateral Transfer Candidate
                <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 rounded text-xs">CURRENT SWORN LE</span>
              </h3>
              <p className="text-zinc-400 text-sm mt-1">
                Candidate is currently employed as a sworn law enforcement officer. Lateral transfer
                processing requires <span className="text-blue-400 font-medium">mandatory Internal Affairs clearance</span> from
                current employer before conditional offer can be extended.
              </p>
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span className="text-zinc-400">IA Request Status:</span>
                  <span className="text-amber-400 font-medium">Pending Response</span>
                </div>
                <span className="text-zinc-600">•</span>
                <span className="text-zinc-500 text-sm">Expected: Feb 1, 2024</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Statistics Grid */}
      <div className="grid grid-cols-5 gap-4">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-zinc-800 rounded-lg">
              <Briefcase className="w-5 h-5 text-zinc-400" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-white">{stats.total}</p>
              <p className="text-zinc-500 text-sm">Total Employers</p>
            </div>
          </div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500/10 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-white">{stats.verified}</p>
              <p className="text-zinc-500 text-sm">Verified</p>
            </div>
          </div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/10 rounded-lg">
              <Shield className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-white">{stats.swornLE}</p>
              <p className="text-zinc-500 text-sm">Sworn LE Positions</p>
            </div>
          </div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <BadgeCheck className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-white">{stats.lateralTransfer}</p>
              <p className="text-zinc-500 text-sm">Lateral Transfer</p>
            </div>
          </div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-zinc-800 rounded-lg">
              <Calendar className="w-5 h-5 text-zinc-400" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-white">{stats.yearsDocumented}</p>
              <p className="text-zinc-500 text-sm">Years Documented</p>
            </div>
          </div>
        </div>
      </div>

      {/* Employment Timeline Visualization */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <h3 className="text-white font-medium mb-4 flex items-center gap-2">
          <History className="w-5 h-5 text-amber-400" />
          Employment Timeline
        </h3>
        <div className="relative">
          {/* Timeline bar */}
          <div className="h-8 bg-zinc-800 rounded-lg overflow-hidden flex">
            {employmentRecords.slice().reverse().map((record, index) => {
              const startYear = new Date(record.startDate).getFullYear();
              const endYear = record.endDate === 'Present' ? 2024 : new Date(record.endDate).getFullYear();
              const totalYears = 14; // 2010-2024
              const startOffset = ((startYear - 2010) / totalYears) * 100;
              const width = ((endYear - startYear + 1) / totalYears) * 100;

              return (
                <div
                  key={record.id}
                  className={`h-full relative group cursor-pointer ${
                    record.isSwornLE
                      ? 'bg-amber-500/60 hover:bg-amber-500/80'
                      : 'bg-zinc-600 hover:bg-zinc-500'
                  }`}
                  style={{
                    width: `${width}%`,
                    marginLeft: index === 0 ? `${startOffset}%` : '1px'
                  }}
                  title={`${record.employer} (${startYear}-${endYear === 2024 ? 'Present' : endYear})`}
                >
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-xs text-zinc-400 bg-zinc-800 px-2 py-1 rounded z-10">
                    {record.employer.length > 20 ? record.employer.substring(0, 20) + '...' : record.employer}
                  </div>
                </div>
              );
            })}
          </div>
          {/* Year markers */}
          <div className="flex justify-between mt-2 text-xs text-zinc-500">
            <span>2010</span>
            <span>2012</span>
            <span>2014</span>
            <span>2016</span>
            <span>2018</span>
            <span>2020</span>
            <span>2022</span>
            <span>2024</span>
          </div>
          {/* Legend */}
          <div className="flex items-center gap-4 mt-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-amber-500/60 rounded"></div>
              <span className="text-zinc-400">Sworn Law Enforcement</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-zinc-600 rounded"></div>
              <span className="text-zinc-400">Civilian Employment</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-3 gap-6">
        {/* Employment Records List */}
        <div className="col-span-2 space-y-4">
          {/* Tabs and Search */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {[
                { id: 'all', label: 'All Employers', count: stats.total },
                { id: 'verified', label: 'Verified', count: stats.verified },
                { id: 'pending', label: 'Needs Attention', count: employmentRecords.filter(r => r.verificationStatus === 'Pending' || r.verificationStatus === 'Unable to Verify').length },
                { id: 'sworn', label: 'Sworn LE', count: stats.swornLE }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-amber-500/10 text-amber-400'
                      : 'text-zinc-400 hover:text-zinc-300 hover:bg-zinc-800'
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </div>
            <div className="relative">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search employers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white text-sm placeholder-zinc-500 focus:outline-none focus:border-amber-500/50"
              />
            </div>
          </div>

          {/* Employer Cards */}
          <div className="space-y-4">
            {filteredRecords.map(record => (
              <div
                key={record.id}
                className={`bg-zinc-900 border rounded-xl overflow-hidden ${
                  record.isLateralTransfer
                    ? 'border-blue-500/30'
                    : 'border-zinc-800'
                }`}
              >
                {/* Card Header */}
                <div
                  className="p-4 cursor-pointer"
                  onClick={() => setExpandedEmployer(expandedEmployer === record.id ? null : record.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl ${
                        record.isSwornLE
                          ? 'bg-amber-500/10'
                          : 'bg-zinc-800'
                      }`}>
                        {record.isSwornLE ? (
                          <Shield className="w-6 h-6 text-amber-400" />
                        ) : (
                          <Building2 className="w-6 h-6 text-zinc-400" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-white font-medium">{record.employer}</h3>
                          {record.isCurrent && (
                            <span className="px-2 py-0.5 bg-green-500/10 text-green-400 rounded text-xs">Current</span>
                          )}
                        </div>
                        <p className="text-zinc-400 text-sm mt-0.5">{record.position}</p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-zinc-500">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {record.location}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(record.startDate)} — {record.endDate === 'Present' ? 'Present' : formatDate(record.endDate)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getEmploymentTypeBadge(record)}
                      {getVerificationStatusBadge(record.verificationStatus)}
                      {expandedEmployer === record.id ? (
                        <ChevronUp className="w-5 h-5 text-zinc-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-zinc-500" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Expanded Content */}
                {expandedEmployer === record.id && (
                  <div className="border-t border-zinc-800 p-4 space-y-4">
                    {/* Verification Details */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-zinc-800/50 rounded-lg p-3">
                        <h4 className="text-zinc-400 text-xs font-medium mb-2">VERIFICATION METHOD</h4>
                        <p className="text-white text-sm">{record.verificationMethod}</p>
                        {record.verificationDate && (
                          <p className="text-zinc-500 text-xs mt-1">
                            Verified {formatDate(record.verificationDate)} by {record.verifiedBy}
                          </p>
                        )}
                      </div>
                      {record.internalAffairs.required && (
                        <div className="bg-zinc-800/50 rounded-lg p-3">
                          <h4 className="text-zinc-400 text-xs font-medium mb-2 flex items-center gap-1">
                            <Flag className="w-3 h-3 text-amber-400" />
                            INTERNAL AFFAIRS STATUS
                          </h4>
                          <div className="flex items-center gap-2">
                            {getIAStatusBadge(record.internalAffairs.status)}
                          </div>
                          {record.internalAffairs.expectedDate && (
                            <p className="text-zinc-500 text-xs mt-1">
                              Expected: {formatDate(record.internalAffairs.expectedDate)}
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* HR Contact */}
                    {record.hrContact && (
                      <div className="bg-zinc-800/50 rounded-lg p-3">
                        <h4 className="text-zinc-400 text-xs font-medium mb-2">HR CONTACT</h4>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-white text-sm">{record.hrContact.name}</p>
                            <p className="text-zinc-500 text-xs">{record.hrContact.title}</p>
                          </div>
                          <div className="flex items-center gap-3 text-sm">
                            {record.hrContact.phone && (
                              <span className="text-zinc-400 flex items-center gap-1">
                                <Phone className="w-3 h-3" />
                                {record.hrContact.phone}
                              </span>
                            )}
                            {record.hrContact.email && (
                              <span className="text-zinc-400 flex items-center gap-1">
                                <Mail className="w-3 h-3" />
                                {record.hrContact.email}
                              </span>
                            )}
                          </div>
                        </div>
                        <p className="text-zinc-500 text-xs mt-2">
                          Contacted {formatDate(record.hrContact.contactDate)} via {record.hrContact.contactMethod}
                        </p>
                      </div>
                    )}

                    {/* Supervisor Contact */}
                    {record.supervisorContact && (
                      <div className="bg-zinc-800/50 rounded-lg p-3">
                        <h4 className="text-zinc-400 text-xs font-medium mb-2">SUPERVISOR CONTACT</h4>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-white text-sm">{record.supervisorContact.name}</p>
                            <p className="text-zinc-500 text-xs">{record.supervisorContact.title}</p>
                          </div>
                          <div className="flex items-center gap-3 text-sm">
                            {record.supervisorContact.phone && (
                              <span className="text-zinc-400 flex items-center gap-1">
                                <Phone className="w-3 h-3" />
                                {record.supervisorContact.phone}
                              </span>
                            )}
                          </div>
                        </div>
                        <p className="text-zinc-500 text-xs mt-2">
                          Contacted {formatDate(record.supervisorContact.contactDate)} via {record.supervisorContact.contactMethod}
                        </p>
                      </div>
                    )}

                    {/* Contact Attempts (for Unable to Verify) */}
                    {record.contactAttempts && (
                      <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-3">
                        <h4 className="text-red-400 text-xs font-medium mb-2 flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" />
                          CONTACT ATTEMPTS ({record.contactAttempts.length})
                        </h4>
                        <div className="space-y-2">
                          {record.contactAttempts.map((attempt, index) => (
                            <div key={index} className="flex items-center justify-between text-xs">
                              <span className="text-zinc-400">{formatDate(attempt.date)}</span>
                              <span className="text-zinc-500">{attempt.method}</span>
                              <span className="text-zinc-400">{attempt.result}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Alternative Documentation */}
                    {record.alternativeDocumentation && (
                      <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-3">
                        <h4 className="text-blue-400 text-xs font-medium mb-2 flex items-center gap-1">
                          <FileText className="w-3 h-3" />
                          ALTERNATIVE DOCUMENTATION
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {record.alternativeDocumentation.map((doc, index) => (
                            <span key={index} className="px-2 py-1 bg-blue-500/10 text-blue-300 rounded text-xs">
                              {doc}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Performance & Disciplinary Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      {/* Performance */}
                      <div className="bg-zinc-800/50 rounded-lg p-3">
                        <h4 className="text-zinc-400 text-xs font-medium mb-2 flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          PERFORMANCE
                        </h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-zinc-500 text-xs">Rating:</span>
                            <span className={`text-sm ${
                              record.performance.rating === 'Exceeds Standards'
                                ? 'text-green-400'
                                : record.performance.rating === 'Meets Standards'
                                  ? 'text-zinc-300'
                                  : 'text-zinc-500'
                            }`}>
                              {record.performance.rating}
                            </span>
                          </div>
                          {record.performance.commendations > 0 && (
                            <div className="flex items-center justify-between">
                              <span className="text-zinc-500 text-xs">Commendations:</span>
                              <span className="text-green-400 text-sm">{record.performance.commendations}</span>
                            </div>
                          )}
                          {record.performance.awards && record.performance.awards.length > 0 && (
                            <div className="mt-2 space-y-1">
                              {record.performance.awards.map((award, index) => (
                                <div key={index} className="flex items-center gap-1 text-xs text-amber-400">
                                  <Award className="w-3 h-3" />
                                  {award}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Disciplinary */}
                      <div className="bg-zinc-800/50 rounded-lg p-3">
                        <h4 className="text-zinc-400 text-xs font-medium mb-2 flex items-center gap-1">
                          <ClipboardList className="w-3 h-3" />
                          DISCIPLINARY
                        </h4>
                        {record.disciplinary.hasRecords === false ? (
                          <p className="text-green-400 text-sm flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            No disciplinary records
                          </p>
                        ) : record.disciplinary.hasRecords === true ? (
                          <div className="space-y-2">
                            <p className="text-amber-400 text-sm">{record.disciplinary.details}</p>
                            <div className="flex items-center gap-3 text-xs">
                              <span className="text-zinc-500">
                                Sustained: <span className="text-zinc-400">{record.disciplinary.sustainedComplaints}</span>
                              </span>
                              <span className="text-zinc-500">
                                Pending: <span className="text-zinc-400">{record.disciplinary.pendingInvestigations}</span>
                              </span>
                            </div>
                          </div>
                        ) : (
                          <p className="text-zinc-500 text-sm">Unable to verify</p>
                        )}
                      </div>
                    </div>

                    {/* Salary & Employment End */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-zinc-800/50 rounded-lg p-3">
                        <h4 className="text-zinc-400 text-xs font-medium mb-1">STARTING SALARY</h4>
                        <p className="text-white text-sm">{record.salary.starting}</p>
                      </div>
                      <div className="bg-zinc-800/50 rounded-lg p-3">
                        <h4 className="text-zinc-400 text-xs font-medium mb-1">
                          {record.isCurrent ? 'CURRENT SALARY' : 'ENDING SALARY'}
                        </h4>
                        <p className="text-white text-sm">{record.salary.current || record.salary.ending}</p>
                      </div>
                      <div className="bg-zinc-800/50 rounded-lg p-3">
                        <h4 className="text-zinc-400 text-xs font-medium mb-1">REHIRE ELIGIBLE</h4>
                        <p className={`text-sm ${
                          record.eligibleForRehire === 'Yes' || record.eligibleForRehire === 'Yes - Recommended'
                            ? 'text-green-400'
                            : record.eligibleForRehire === 'No'
                              ? 'text-red-400'
                              : 'text-zinc-400'
                        }`}>
                          {record.eligibleForRehire}
                        </p>
                      </div>
                    </div>

                    {/* Reason for Leaving */}
                    <div className="bg-zinc-800/50 rounded-lg p-3">
                      <h4 className="text-zinc-400 text-xs font-medium mb-1">REASON FOR LEAVING</h4>
                      <p className="text-white text-sm">{record.reasonForLeaving}</p>
                    </div>

                    {/* Verification Timeline */}
                    {record.timeline && record.timeline.length > 0 && (
                      <div className="bg-zinc-800/50 rounded-lg p-3">
                        <h4 className="text-zinc-400 text-xs font-medium mb-3">VERIFICATION TIMELINE</h4>
                        <div className="space-y-2">
                          {record.timeline.map((event, index) => (
                            <div key={index} className="flex items-center gap-3 text-xs">
                              <span className="text-zinc-500 w-24">{formatDate(event.date)}</span>
                              <span className="text-zinc-400 flex-1">{event.action}</span>
                              <span className="text-zinc-500">{event.by}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Notes */}
                    {record.notes && (
                      <div className="bg-zinc-800/50 rounded-lg p-3">
                        <h4 className="text-zinc-400 text-xs font-medium mb-1">INVESTIGATOR NOTES</h4>
                        <p className="text-zinc-300 text-sm">{record.notes}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Internal Affairs Requirement Panel */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
            <h3 className="text-white font-medium mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-amber-400" />
              Internal Affairs Requirements
            </h3>

            <div className="space-y-3">
              {employmentRecords.filter(r => r.internalAffairs.required).map(record => (
                <div key={record.id} className="bg-zinc-800/50 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white text-sm font-medium">
                      {record.employer.length > 25 ? record.employer.substring(0, 25) + '...' : record.employer}
                    </span>
                    {getIAStatusBadge(record.internalAffairs.status)}
                  </div>
                  <p className="text-zinc-500 text-xs mb-2">{record.internalAffairs.notes}</p>
                  {record.internalAffairs.contactPerson && (
                    <p className="text-zinc-400 text-xs">
                      Contact: {record.internalAffairs.contactPerson}
                    </p>
                  )}
                </div>
              ))}

              {employmentRecords.filter(r => r.internalAffairs.required).length === 0 && (
                <p className="text-zinc-500 text-sm">No IA clearances required for this candidate.</p>
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-zinc-800">
              <div className="bg-amber-500/10 rounded-lg p-3">
                <h4 className="text-amber-400 text-xs font-medium mb-1">LATERAL TRANSFER POLICY</h4>
                <p className="text-zinc-400 text-xs">
                  All candidates currently employed as sworn law enforcement officers require
                  mandatory IA clearance from their current employer before a conditional offer
                  may be extended.
                </p>
              </div>
            </div>
          </div>

          {/* Verification Summary */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
            <h3 className="text-white font-medium mb-4 flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-amber-400" />
              Verification Summary
            </h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-zinc-400 text-sm">Employers Verified</span>
                <span className="text-white font-medium">{stats.verified} / {stats.total}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-400 text-sm">POST Requirement</span>
                <span className="text-green-400 text-sm flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Met
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-400 text-sm">IA Clearance</span>
                <span className="text-amber-400 text-sm flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Pending
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-400 text-sm">Discrepancies Found</span>
                <span className="text-green-400 text-sm">None</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-zinc-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-zinc-400 text-sm">Overall Status</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-amber-500/10 rounded-lg">
                <Clock className="w-5 h-5 text-amber-400" />
                <div>
                  <p className="text-amber-400 font-medium text-sm">Awaiting IA Clearance</p>
                  <p className="text-zinc-500 text-xs">Expected Feb 1, 2024</p>
                </div>
              </div>
            </div>
          </div>

          {/* Support & Resources */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
            <h3 className="text-white font-medium mb-4 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-amber-400" />
              Support & Resources
            </h3>

            <div className="space-y-2">
              <a href="#" className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg hover:bg-zinc-800 transition-colors">
                <BookOpen className="w-4 h-4 text-zinc-400" />
                <div>
                  <p className="text-white text-sm">POST Regulations Guide</p>
                  <p className="text-zinc-500 text-xs">Employment verification requirements</p>
                </div>
                <ExternalLink className="w-4 h-4 text-zinc-500 ml-auto" />
              </a>

              <a href="#" className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg hover:bg-zinc-800 transition-colors">
                <FileText className="w-4 h-4 text-zinc-400" />
                <div>
                  <p className="text-white text-sm">IA Request Templates</p>
                  <p className="text-zinc-500 text-xs">Standard clearance request forms</p>
                </div>
                <ExternalLink className="w-4 h-4 text-zinc-500 ml-auto" />
              </a>

              <a href="#" className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg hover:bg-zinc-800 transition-colors">
                <PhoneCall className="w-4 h-4 text-zinc-400" />
                <div>
                  <p className="text-white text-sm">Verification Hotline</p>
                  <p className="text-zinc-500 text-xs">Background Unit support</p>
                </div>
                <ExternalLink className="w-4 h-4 text-zinc-500 ml-auto" />
              </a>

              <a href="#" className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg hover:bg-zinc-800 transition-colors">
                <Scale className="w-4 h-4 text-zinc-400" />
                <div>
                  <p className="text-white text-sm">Lateral Transfer Policy</p>
                  <p className="text-zinc-500 text-xs">Agency transfer procedures</p>
                </div>
                <ExternalLink className="w-4 h-4 text-zinc-500 ml-auto" />
              </a>
            </div>
          </div>

          {/* Audit Trail */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
            <h3 className="text-white font-medium mb-4 flex items-center gap-2">
              <History className="w-5 h-5 text-amber-400" />
              Recent Activity
            </h3>

            <div className="space-y-3">
              {[
                { action: 'IA request submitted', employer: 'Metro City PD', date: '2024-01-18', by: 'Sgt. Vance' },
                { action: 'Supervisor interview completed', employer: 'Metro City PD', date: '2024-01-19', by: 'Sgt. Vance' },
                { action: 'HR verification completed', employer: 'Metro City PD', date: '2024-01-18', by: 'Sgt. Vance' },
                { action: 'Unable to verify - marked', employer: 'Quick Mart Inc.', date: '2024-01-19', by: 'Sgt. Vance' }
              ].map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-1.5"></div>
                  <div className="flex-1">
                    <p className="text-zinc-300 text-sm">{activity.action}</p>
                    <p className="text-zinc-500 text-xs">{activity.employer}</p>
                    <p className="text-zinc-600 text-xs">{activity.date} • {activity.by}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmploymentVerification;
