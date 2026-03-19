import { useState } from 'react';
import {
  FileText, Shield, MapPin, Clock,
  Search, Filter, ChevronDown, ChevronUp, Video
} from 'lucide-react';
import DashboardLayout from '../../layouts/DashboardLayout';

interface Incident {
  id: string;
  type: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  date: string;
  time: string;
  location: string;
  pod: string;
  reportedBy: string;
  badge: string;
  inmatesInvolved: string[];
  staffInvolved: string[];
  description: string;
  actionTaken: string;
  status: 'Under Review' | 'Resolved' | 'Investigating' | 'Pending';
  useOfForce: boolean;
  injuriesReported: boolean;
  medicalCalled: boolean;
  videoEvidence: boolean;
  witnessStatements: number;
}

const IncidentReports = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [expandedIncident, setExpandedIncident] = useState<string | null>(null);

  const incidents: Incident[] = [
    {
      id: 'INC-2024-1182',
      type: 'Inmate Altercation',
      severity: 'Medium',
      date: '2024-12-05',
      time: '13:15',
      location: 'A-Pod Dayroom',
      pod: 'A-Pod',
      reportedBy: 'Deputy Chen, Michael',
      badge: 'D-4521',
      inmatesInvolved: ['WASHINGTON, Marcus #2024-087234', 'TAYLOR, DeAndre #2024-086945'],
      staffInvolved: ['Deputy Chen, Michael #D-4521', 'Deputy Rodriguez, Maria #D-3892'],
      description: 'Verbal dispute between inmates escalated to pushing. Deputies immediately intervened and separated parties. Both inmates were compliant once addressed. Dispute was over TV channel selection.',
      actionTaken: 'Both inmates separated and given verbal warnings. Incident documented. No disciplinary action recommended at this time. Inmates returned to general population after cooling off period.',
      status: 'Resolved',
      useOfForce: false,
      injuriesReported: false,
      medicalCalled: false,
      videoEvidence: true,
      witnessStatements: 3
    },
    {
      id: 'INC-2024-1181',
      type: 'Medical Emergency',
      severity: 'High',
      date: '2024-12-05',
      time: '11:42',
      location: 'C-Pod Cell 14',
      pod: 'C-Pod',
      reportedBy: 'Deputy Williams, James',
      badge: 'D-2134',
      inmatesInvolved: ['ANDERSON, Robert #2024-085623'],
      staffInvolved: ['Deputy Williams, James #D-2134', 'Nurse Thompson, Sarah RN', 'EMS Unit 412'],
      description: 'Inmate reported chest pain and shortness of breath during cell check. Medical was immediately notified. Nurse arrived within 3 minutes. BP 165/95, pulse 112. EMS called at 11:45. Patient remained conscious and alert.',
      actionTaken: 'Medical assessment performed. EMS transport to Gwinnett Medical Center Emergency Department. Inmate handcuffed to gurney per protocol. Deputy Martinez assigned to hospital guard duty. Medical hold placed in system.',
      status: 'Resolved',
      useOfForce: false,
      injuriesReported: false,
      medicalCalled: true,
      videoEvidence: true,
      witnessStatements: 2
    },
    {
      id: 'INC-2024-1180',
      type: 'Contraband Found',
      severity: 'Medium',
      date: '2024-12-05',
      time: '10:30',
      location: 'D-Pod Cell 22',
      pod: 'D-Pod',
      reportedBy: 'Deputy Martinez, Carlos',
      badge: 'D-3745',
      inmatesInvolved: ['NGUYEN, Lisa #2024-088234'],
      staffInvolved: ['Deputy Martinez, Carlos #D-3745', 'Sgt. Wilson, David #S-1523'],
      description: 'During routine cell search, cell phone discovered hidden inside hollowed-out book. Device was Samsung Galaxy, active with 45% battery. Investigation revealed device was smuggled in during visitation.',
      actionTaken: 'Contraband seized and logged as evidence. Inmate placed in administrative segregation pending investigation. Disciplinary hearing scheduled for 2024-12-08. Visitor privileges suspended. Criminal charges being considered.',
      status: 'Investigating',
      useOfForce: false,
      injuriesReported: false,
      medicalCalled: false,
      videoEvidence: true,
      witnessStatements: 1
    },
    {
      id: 'INC-2024-1179',
      type: 'Use of Force',
      severity: 'High',
      date: '2024-12-05',
      time: '08:45',
      location: 'B-Pod Corridor',
      pod: 'B-Pod',
      reportedBy: 'Deputy Johnson, Marcus',
      badge: 'D-4167',
      inmatesInvolved: ['MARTINEZ, Carlos #2024-089234'],
      staffInvolved: ['Deputy Johnson, Marcus #D-4167', 'Deputy Davis, Kevin #D-2981', 'Cpl. Anderson, Lisa #C-0845', 'Sgt. Williams, Thomas #S-1234'],
      description: 'Inmate refused direct order to return to cell for count. After three verbal warnings, inmate became combative and took fighting stance. Deputies attempted verbal de-escalation for 2 minutes. Inmate charged at Deputy Johnson. OC spray deployed with no effect. Four deputies applied control holds and took inmate to ground. Inmate continued to resist. Restraint chair utilized for transport to B2-Pod segregation.',
      actionTaken: 'Use of Force Team activated. Inmate placed in restraint chair and moved to administrative segregation B2-Pod Cell 08. Medical evaluation completed - no injuries to inmate or staff. Body camera footage preserved. Use of Force Review Board notified. Administrative review scheduled within 72 hours per policy. Disciplinary charges filed.',
      status: 'Under Review',
      useOfForce: true,
      injuriesReported: false,
      medicalCalled: true,
      videoEvidence: true,
      witnessStatements: 6
    },
    {
      id: 'INC-2024-1178',
      type: 'Property Damage',
      severity: 'Low',
      date: '2024-12-05',
      time: '06:20',
      location: 'E-Pod Cell 8',
      pod: 'E-Pod',
      reportedBy: 'Deputy Taylor, Amanda',
      badge: 'D-3129',
      inmatesInvolved: ['BROWN, Ashley #2024-086754'],
      staffInvolved: ['Deputy Taylor, Amanda #D-3129'],
      description: 'Sink fixture in cell found broken during morning inspection. Inmate reported it broke when she was washing her face. No signs of intentional damage. Fixture appears to have failed due to age/wear.',
      actionTaken: 'Maintenance work order submitted #WO-24-8834. Inmate temporarily moved to E-Pod Cell 12 while repairs completed. Estimated repair time 4-6 hours. No disciplinary action recommended.',
      status: 'Resolved',
      useOfForce: false,
      injuriesReported: false,
      medicalCalled: false,
      videoEvidence: false,
      witnessStatements: 0
    },
    {
      id: 'INC-2024-1177',
      type: 'Inmate Fight',
      severity: 'Critical',
      date: '2024-12-04',
      time: '19:23',
      location: 'A2-Pod Recreation Area',
      pod: 'A2-Pod',
      reportedBy: 'Deputy Wilson, Robert',
      badge: 'D-5123',
      inmatesInvolved: ['JACKSON, Demetrius #2024-087956', 'THOMPSON, Marcus #2024-089187', 'WILLIAMS, Jerome #2024-086234'],
      staffInvolved: ['Deputy Wilson, Robert #D-5123', 'Deputy Clark, Jennifer #D-4892', 'Deputy Brown, Kevin #D-3456', 'Sgt. Martinez, Carlos #S-1678', 'Medical Staff - Nurse Johnson RN', 'Medical Staff - Dr. Patel MD'],
      description: 'Gang-related altercation during recreation time. Three inmates involved in physical fight. Punches thrown, one inmate suffered laceration above left eye, another with possible broken nose. Fight lasted approximately 45 seconds before staff intervention.',
      actionTaken: 'Emergency response activated. OC spray deployed to break up fight. All three inmates secured and restrained. Medical immediately called. Two inmates transported to medical for evaluation and treatment. All three inmates moved to administrative segregation different pods. Gang intelligence unit notified. Criminal assault charges being pursued. Facility lockdown initiated for 2 hours.',
      status: 'Under Review',
      useOfForce: true,
      injuriesReported: true,
      medicalCalled: true,
      videoEvidence: true,
      witnessStatements: 8
    },
    {
      id: 'INC-2024-1176',
      type: 'Suicide Attempt',
      severity: 'Critical',
      date: '2024-12-04',
      time: '14:15',
      location: 'E2-Pod Cell 6',
      pod: 'E2-Pod',
      reportedBy: 'Mental Health Tech Davis',
      badge: 'MH-234',
      inmatesInvolved: ['SMITH, Brandon #2024-087623'],
      staffInvolved: ['MH Tech Davis #MH-234', 'Deputy Anderson #D-2789', 'Nurse Wilson RN', 'Dr. Chen MD', 'Crisis Counselor Martinez LCSW'],
      description: 'During welfare check, inmate found attempting to harm self using torn bedsheet. Immediate intervention by mental health staff. Inmate was conscious and responsive.',
      actionTaken: 'Emergency medical response. Inmate placed on suicide watch protocol - 24/7 one-on-one observation. All items removed from cell except safety smock and blanket. Crisis intervention performed. Psychiatric evaluation completed. Medication adjusted. Family notification made per protocol. Mental health daily assessments scheduled.',
      status: 'Under Review',
      useOfForce: false,
      injuriesReported: true,
      medicalCalled: true,
      videoEvidence: true,
      witnessStatements: 4
    },
    {
      id: 'INC-2024-1175',
      type: 'Staff Assault',
      severity: 'Critical',
      date: '2024-12-04',
      time: '10:05',
      location: 'B2-Pod Cell 4',
      pod: 'B2-Pod',
      reportedBy: 'Deputy Davis, Jennifer',
      badge: 'D-4892',
      inmatesInvolved: ['RODRIGUEZ, Miguel #2024-085892'],
      staffInvolved: ['Deputy Davis, Jennifer #D-4892', 'Deputy Williams #D-2134', 'Deputy Johnson #D-4167', 'Sgt. Anderson #S-0934'],
      description: 'During meal tray pass, inmate threw hot coffee at Deputy Davis, striking her in face and upper torso. Deputy received burns to facial area. Inmate then barricaded himself in cell.',
      actionTaken: 'Emergency response team activated. Deputy Davis immediately removed for medical treatment - transported to Gwinnett Medical ER for evaluation of burns. Crisis negotiation team deployed. After 35 minutes, inmate surrendered peacefully. Full restraints applied. Moved to maximum security isolation. GBI notified. Felony assault on officer charges filed. Deputy Davis treated and released, placed on administrative leave per protocol. Workers comp claim filed.',
      status: 'Investigating',
      useOfForce: true,
      injuriesReported: true,
      medicalCalled: true,
      videoEvidence: true,
      witnessStatements: 12
    }
  ];

  const filteredIncidents = incidents.filter(incident => {
    const matchesSearch =
      incident.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.inmatesInvolved.some(i => i.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesFilter =
      selectedFilter === 'all' ||
      (selectedFilter === 'critical' && incident.severity === 'Critical') ||
      (selectedFilter === 'use-of-force' && incident.useOfForce) ||
      (selectedFilter === 'medical' && incident.medicalCalled) ||
      (selectedFilter === 'under-review' && incident.status === 'Under Review');

    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: incidents.length,
    critical: incidents.filter(i => i.severity === 'Critical').length,
    useOfForce: incidents.filter(i => i.useOfForce).length,
    underReview: incidents.filter(i => i.status === 'Under Review').length
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'High': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'Medium': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'Low': return 'bg-slate-700/40 text-slate-300 border-slate-600/50';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Resolved': return 'bg-emerald-500/20 text-emerald-400';
      case 'Under Review': return 'bg-amber-500/20 text-amber-400';
      case 'Investigating': return 'bg-amber-500/20 text-amber-400';
      case 'Pending': return 'bg-slate-500/20 text-slate-400';
      default: return 'bg-slate-500/20 text-slate-400';
    }
  };

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-amber-500" />
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-white">Incident Reports</h1>
                <p className="text-slate-400">Facility Incident Management & Documentation</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold rounded-lg transition-colors text-sm">
              Create New Report
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <div className="text-sm text-slate-400 mb-1">Total Incidents (7 Days)</div>
            <div className="text-2xl font-bold text-white">{stats.total}</div>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <div className="text-sm text-slate-400 mb-1">Critical</div>
            <div className="text-2xl font-bold text-red-400">{stats.critical}</div>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <div className="text-sm text-slate-400 mb-1">Use of Force</div>
            <div className="text-2xl font-bold text-orange-400">{stats.useOfForce}</div>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <div className="text-sm text-slate-400 mb-1">Under Review</div>
            <div className="text-2xl font-bold text-amber-400">{stats.underReview}</div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search incidents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-slate-400" />
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
              >
                <option value="all">All Incidents</option>
                <option value="critical">Critical Only</option>
                <option value="use-of-force">Use of Force</option>
                <option value="medical">Medical</option>
                <option value="under-review">Under Review</option>
              </select>
            </div>
          </div>
        </div>

        {/* Incidents List */}
        <div className="space-y-4">
          {filteredIncidents.map((incident) => (
            <div key={incident.id} className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-white">{incident.type}</h3>
                      <span className={`px-3 py-1 rounded text-sm font-bold border ${getSeverityColor(incident.severity)}`}>
                        {incident.severity.toUpperCase()}
                      </span>
                      <span className={`px-3 py-1 rounded text-sm font-medium ${getStatusColor(incident.status)}`}>
                        {incident.status}
                      </span>
                      {incident.useOfForce && (
                        <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded text-sm font-bold border border-red-500/30">
                          USE OF FORCE
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-6 text-sm text-slate-400">
                      <div className="flex items-center gap-1">
                        <FileText className="w-4 h-4" />
                        <span>{incident.id}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{incident.date} at {incident.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{incident.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Shield className="w-4 h-4" />
                        <span>Reported by: {incident.reportedBy} #{incident.badge}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setExpandedIncident(expandedIncident === incident.id ? null : incident.id)}
                    className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                  >
                    {expandedIncident === incident.id ? (
                      <ChevronUp className="w-5 h-5 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    )}
                  </button>
                </div>

                {/* Summary Info */}
                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div className="bg-slate-900/50 border border-slate-700 rounded p-3">
                    <div className="text-xs text-slate-400 mb-1">Inmates Involved</div>
                    <div className="text-white font-semibold">{incident.inmatesInvolved.length}</div>
                  </div>
                  <div className="bg-slate-900/50 border border-slate-700 rounded p-3">
                    <div className="text-xs text-slate-400 mb-1">Staff Involved</div>
                    <div className="text-white font-semibold">{incident.staffInvolved.length}</div>
                  </div>
                  <div className="bg-slate-900/50 border border-slate-700 rounded p-3">
                    <div className="text-xs text-slate-400 mb-1">Witness Statements</div>
                    <div className="text-white font-semibold">{incident.witnessStatements}</div>
                  </div>
                  <div className="bg-slate-900/50 border border-slate-700 rounded p-3">
                    <div className="text-xs text-slate-400 mb-1">Evidence</div>
                    <div className="flex gap-2">
                      {incident.videoEvidence && (
                        <div className="flex items-center gap-1 text-slate-400 text-xs">
                          <Video className="w-4 h-4" />
                          <span>Video</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Incident Flags */}
                <div className="flex gap-2 mb-4">
                  {incident.injuriesReported && (
                    <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs font-medium">
                      Injuries Reported
                    </span>
                  )}
                  {incident.medicalCalled && (
                    <span className="px-2 py-1 bg-slate-700/40 text-slate-300 rounded text-xs font-medium">
                      Medical Response
                    </span>
                  )}
                </div>

                {/* Description Preview */}
                <div className="text-slate-300 text-sm">
                  {incident.description.slice(0, 200)}...
                </div>
              </div>

              {/* Expanded Details */}
              {expandedIncident === incident.id && (
                <div className="border-t border-slate-700 p-6 bg-slate-900/30">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-white font-semibold mb-3">Full Description</h4>
                      <p className="text-slate-300 text-sm mb-4">{incident.description}</p>

                      <h4 className="text-white font-semibold mb-3">Inmates Involved</h4>
                      <div className="space-y-1 mb-4">
                        {incident.inmatesInvolved.map((inmate, idx) => (
                          <div key={idx} className="text-sm text-amber-400">• {inmate}</div>
                        ))}
                      </div>

                      <h4 className="text-white font-semibold mb-3">Staff Involved</h4>
                      <div className="space-y-1">
                        {incident.staffInvolved.map((staff, idx) => (
                          <div key={idx} className="text-sm text-slate-300">• {staff}</div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-white font-semibold mb-3">Action Taken</h4>
                      <p className="text-slate-300 text-sm">{incident.actionTaken}</p>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-slate-700">
                    <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors">
                      View Full Report
                    </button>
                    <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors">
                      View Video Evidence
                    </button>
                    {incident.status === 'Under Review' && (
                      <button className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-900 font-medium rounded-lg transition-colors">
                        Update Status
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default IncidentReports;
