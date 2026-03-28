import { useState } from 'react';
import {
  Hospital, AlertTriangle, Pill, User, FileText
} from 'lucide-react';
import DashboardLayout from '../../layouts/DashboardLayout';

interface MedicalRecord {
  inmateId: string;
  name: string;
  housing: string;
  dob: string;
  age: number;
  condition: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  type: string;
  medications: string[];
  nextDose?: string;
  lastSeen: string;
  provider: string;
  notes: string;
  status: string;
}

const MedicalManagement = () => {
  const [selectedTab, setSelectedTab] = useState<'critical' | 'medications' | 'sick-call' | 'all'>('critical');

  // Critical medical cases
  const criticalCases: MedicalRecord[] = [
    {
      inmateId: '2024-087623',
      name: 'SMITH, Brandon Kyle',
      housing: 'E2-Pod Cell 6',
      dob: '1995-06-28',
      age: 29,
      condition: 'Suicide Watch - Active Monitoring',
      priority: 'Critical',
      type: 'Mental Health Crisis',
      medications: ['Sertraline 100mg', 'Lorazepam 1mg PRN'],
      lastSeen: '14:00 - Dr. Chen (Psychiatry)',
      provider: 'Dr. Chen, MD - Psychiatry',
      notes: 'Patient on 24/7 one-on-one observation. Crisis intervention completed. Medication regimen adjusted. Daily psychiatric evaluation required. No self-harm items in cell. Safety smock issued. Family notified per protocol.',
      status: 'Active Monitoring'
    },
    {
      inmateId: '2024-085623',
      name: 'ANDERSON, Robert Eugene Jr.',
      housing: 'Gwinnett Medical Center',
      dob: '1979-12-05',
      age: 44,
      condition: 'Cardiac Event - Hospital Hold',
      priority: 'Critical',
      type: 'Medical Emergency',
      medications: ['Aspirin 325mg', 'Nitroglycerin PRN', 'Metoprolol 50mg'],
      lastSeen: '11:42 - EMS Transport',
      provider: 'Gwinnett Medical ER',
      notes: 'Admitted to Gwinnett Medical Center ER for chest pain and elevated BP (165/95). Deputy Martinez assigned to hospital guard. Cardiac workup in progress. Medical hold active - cannot be released without physician clearance. Update expected 18:00.',
      status: 'Hospital Guard'
    },
    {
      inmateId: '2024-086754',
      name: 'TAYLOR, Ashley Nicole',
      housing: 'E-Pod Cell 19',
      dob: '1996-07-11',
      age: 28,
      condition: 'Pregnancy - High Risk',
      priority: 'High',
      type: 'Obstetric Care',
      medications: ['Prenatal Vitamins', 'Iron Supplement', 'Suboxone 8mg (MAT Protocol)'],
      lastSeen: '09:00 - Nurse Wilson, RN',
      provider: 'Nurse Wilson, RN / Dr. Patel, OB-GYN',
      notes: '22 weeks pregnant. High-risk due to substance abuse history. Currently on MAT (Medication-Assisted Treatment) protocol. Weekly OB appointments scheduled. Diet restrictions in place. Bottom bunk assignment. No heavy lifting. Next OB visit: 2024-12-08.',
      status: 'Special Medical Housing'
    },
    {
      inmateId: '2024-088543',
      name: 'RODRIGUEZ, Elena Sofia',
      housing: 'E-Pod Cell 23',
      dob: '1991-12-19',
      age: 32,
      condition: 'Detox Protocol - Methamphetamine',
      priority: 'High',
      type: 'Substance Withdrawal',
      medications: ['Clonidine 0.1mg TID', 'Hydroxyzine 25mg QID PRN', 'Vitamin B Complex'],
      nextDose: '16:00 - Clonidine',
      lastSeen: '12:00 - Nurse Thompson, RN',
      provider: 'Nurse Thompson, RN / Dr. Martinez, MD',
      notes: 'Day 3 of medically supervised detox. Vital signs stable. Anxiety and agitation managed with medications. Sleeping poorly. Increased fluid intake ordered. Daily medical checks required. Psychiatric consult scheduled for 2024-12-06.',
      status: 'Detox Protocol Active'
    }
  ];

  // Medication administration schedule
  const medicationSchedule = [
    {
      time: '06:00',
      inmates: 47,
      status: 'Completed',
      administered: 47,
      refused: 0,
      nurse: 'Nurse Johnson, RN'
    },
    {
      time: '12:00',
      inmates: 52,
      status: 'Completed',
      administered: 51,
      refused: 1,
      nurse: 'Nurse Wilson, RN'
    },
    {
      time: '16:00',
      inmates: 38,
      status: 'In Progress',
      administered: 24,
      refused: 0,
      nurse: 'Nurse Thompson, RN'
    },
    {
      time: '20:00',
      inmates: 45,
      status: 'Pending',
      administered: 0,
      refused: 0,
      nurse: 'Nurse Martinez, RN'
    }
  ];

  // Chronic condition management
  const chronicCases = [
    {
      inmateId: '2024-083456',
      name: 'DAVIS, Robert Lee',
      housing: 'E-Pod Cell 31',
      condition: 'Type 2 Diabetes - Insulin Dependent',
      medications: ['Insulin Lantus 40 units qHS', 'Insulin NovoLog sliding scale', 'Metformin 1000mg BID'],
      nextCheck: '17:00 - Blood Glucose Check',
      lastReading: 'BG: 145 mg/dL (14:00)',
      status: 'Stable'
    },
    {
      inmateId: '2024-081234',
      name: 'WILLIAMS, Marcus Anthony',
      housing: 'E-Pod Cell 28',
      condition: 'Hypertension - Stage 2',
      medications: ['Lisinopril 20mg daily', 'Amlodipine 10mg daily', 'HCTZ 25mg daily'],
      nextCheck: '06:00 - BP Check',
      lastReading: 'BP: 138/88 (12:00)',
      status: 'Improving'
    },
    {
      inmateId: '2024-085678',
      name: 'JOHNSON, Patricia Ann',
      housing: 'E-Pod Cell 15',
      condition: 'Asthma - Moderate Persistent',
      medications: ['Albuterol Inhaler 2 puffs QID', 'Flovent HFA 220mcg BID'],
      nextCheck: 'PRN - As Needed',
      lastReading: 'Peak Flow: 320 L/min (08:00)',
      status: 'Stable'
    },
    {
      inmateId: '2024-084123',
      name: 'MARTINEZ, Jose Luis',
      housing: 'E-Pod Cell 41',
      condition: 'Seizure Disorder',
      medications: ['Keppra 1000mg BID', 'Lamictal 200mg daily'],
      nextCheck: 'Weekly - Blood Level',
      lastReading: 'Last seizure: 2024-11-15',
      status: 'Controlled'
    },
    {
      inmateId: '2024-082945',
      name: 'THOMPSON, Angela Marie',
      housing: 'E-Pod Cell 36',
      condition: 'HIV Positive - Undetectable',
      medications: ['Biktarvy 1 tablet daily'],
      nextCheck: 'Monthly - Viral Load',
      lastReading: 'Viral Load: Undetectable (2024-11-20)',
      status: 'Stable'
    }
  ];

  // Sick call requests
  const sickCallRequests = [
    {
      inmateId: '2024-089156',
      name: 'BROWN, Kenneth',
      housing: 'A-Pod Cell 42',
      complaint: 'Severe toothache - lower right molar',
      submitted: '13:45',
      priority: 'High',
      status: 'Pending Review'
    },
    {
      inmateId: '2024-088745',
      name: 'GARCIA, Maria',
      housing: 'D-Pod Cell 18',
      complaint: 'Migraine headache, nausea',
      submitted: '12:30',
      priority: 'Medium',
      status: 'Scheduled - 15:30'
    },
    {
      inmateId: '2024-087234',
      name: 'WILSON, Tyrone',
      housing: 'C-Pod Cell 56',
      complaint: 'Ankle pain after fall in recreation',
      submitted: '11:15',
      priority: 'Medium',
      status: 'Scheduled - 16:00'
    },
    {
      inmateId: '2024-089012',
      name: 'NGUYEN, Thi',
      housing: 'D-Pod Cell 31',
      complaint: 'Refill request - Birth control',
      submitted: '10:00',
      priority: 'Low',
      status: 'Approved - Pick up 17:00'
    },
    {
      inmateId: '2024-086543',
      name: 'ANDERSON, James',
      housing: 'A2-Pod Cell 29',
      complaint: 'Cold symptoms - cough, congestion',
      submitted: '09:45',
      priority: 'Low',
      status: 'Scheduled - 17:30'
    }
  ];

  // Medical stats
  const medicalStats = {
    totalUnderCare: 89,
    critical: criticalCases.length,
    chronicConditions: chronicCases.length,
    activeMedications: 142,
    sickCallPending: sickCallRequests.length,
    hospitalGuards: 1,
    isolationCells: 3,
    suicideWatch: 4
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'High': return 'text-orange-400 bg-orange-500/20 border-orange-500/30';
      case 'Medium': return 'text-amber-400 bg-amber-500/20 border-amber-500/30';
      case 'Low': return 'text-slate-600 dark:text-slate-400 bg-slate-700/40 border-slate-600/50';
      default: return 'text-slate-600 dark:text-slate-400 bg-slate-500/20 border-slate-500/30';
    }
  };

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Hospital className="w-8 h-8 text-amber-500" />
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white">Medical Management</h1>
              <p className="text-slate-600 dark:text-slate-400">Inmate Health Services & Medical Monitoring</p>
            </div>
          </div>
        </div>
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors">
                Medical Log
              </button>
              <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors">
                Emergency Alert
              </button>
            </div>
          </div>
        </div>

        {/* Medical Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-slate-600 dark:text-slate-400">Total Under Medical Care</div>
              <Hospital className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            </div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">{medicalStats.totalUnderCare}</div>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-slate-600 dark:text-slate-400">Critical Cases</div>
              <AlertTriangle className="w-5 h-5 text-red-400" />
            </div>
            <div className="text-2xl font-bold text-red-400">{medicalStats.critical}</div>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-slate-600 dark:text-slate-400">Active Medications</div>
              <Pill className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            </div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">{medicalStats.activeMedications}</div>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-slate-600 dark:text-slate-400">Sick Call Pending</div>
              <FileText className="w-5 h-5 text-amber-400" />
            </div>
            <div className="text-2xl font-bold text-amber-400">{medicalStats.sickCallPending}</div>
          </div>
        </div>

        {/* Special Medical Alerts */}
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5" />
            <div className="flex-1">
              <h4 className="text-red-400 font-semibold mb-2">Active Medical Alerts</h4>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-white font-medium">Hospital Guards:</span>{' '}
                  <span className="text-red-400">{medicalStats.hospitalGuards} active</span>
                  <div className="text-slate-600 dark:text-slate-400 text-xs mt-1">Anderson, R. - Gwinnett Medical</div>
                </div>
                <div>
                  <span className="text-white font-medium">Suicide Watch:</span>{' '}
                  <span className="text-red-400">{medicalStats.suicideWatch} inmates</span>
                  <div className="text-slate-600 dark:text-slate-400 text-xs mt-1">24/7 one-on-one observation</div>
                </div>
                <div>
                  <span className="text-white font-medium">Isolation Cells:</span>{' '}
                  <span className="text-red-400">{medicalStats.isolationCells} occupied</span>
                  <div className="text-slate-600 dark:text-slate-400 text-xs mt-1">Infectious disease protocol</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setSelectedTab('critical')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              selectedTab === 'critical'
                ? 'bg-amber-500 text-slate-900'
                : 'bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-700'
            }`}
          >
            Critical Cases ({criticalCases.length})
          </button>
          <button
            onClick={() => setSelectedTab('medications')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              selectedTab === 'medications'
                ? 'bg-amber-500 text-slate-900'
                : 'bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-700'
            }`}
          >
            Medication Schedule
          </button>
          <button
            onClick={() => setSelectedTab('sick-call')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              selectedTab === 'sick-call'
                ? 'bg-amber-500 text-slate-900'
                : 'bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-700'
            }`}
          >
            Sick Call Requests ({sickCallRequests.length})
          </button>
          <button
            onClick={() => setSelectedTab('all')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              selectedTab === 'all'
                ? 'bg-amber-500 text-slate-900'
                : 'bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-700'
            }`}
          >
            Chronic Conditions ({chronicCases.length})
          </button>
        </div>

        {/* Critical Cases */}
        {selectedTab === 'critical' && (
          <div className="space-y-4">
            {criticalCases.map((record) => (
              <div key={record.inmateId} className="bg-slate-800 border-2 border-red-500/30 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">{record.name}</h3>
                      <span className={`px-3 py-1 rounded text-sm font-bold border ${getPriorityColor(record.priority)}`}>
                        {record.priority.toUpperCase()}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-slate-600 dark:text-slate-400">Inmate ID:</span>{' '}
                        <span className="text-amber-400 font-mono">{record.inmateId}</span>
                      </div>
                      <div>
                        <span className="text-slate-600 dark:text-slate-400">Housing:</span>{' '}
                        <span className="text-white font-semibold">{record.housing}</span>
                      </div>
                      <div>
                        <span className="text-slate-600 dark:text-slate-400">Age:</span>{' '}
                        <span className="text-white">{record.age} ({record.dob})</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">Status</div>
                    <div className="text-red-400 font-bold">{record.status}</div>
                  </div>
                </div>

                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                    <h4 className="text-white font-semibold">{record.condition}</h4>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 text-sm">{record.notes}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                      <Pill className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                      Current Medications
                    </h4>
                    <div className="space-y-1">
                      {record.medications.map((med, idx) => (
                        <div key={idx} className="text-sm text-slate-700 dark:text-slate-300 bg-slate-900/50 border border-slate-700 rounded p-2">
                          • {med}
                        </div>
                      ))}
                    </div>
                    {record.nextDose && (
                      <div className="mt-2 text-sm text-amber-400">
                        Next dose: {record.nextDose}
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                      <User className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                      Medical Provider
                    </h4>
                    <div className="text-sm text-slate-700 dark:text-slate-300 mb-2">{record.provider}</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">Last seen: {record.lastSeen}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Medication Schedule */}
        {selectedTab === 'medications' && (
          <div className="space-y-4">
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Today's Medication Rounds</h3>
              <div className="space-y-3">
                {medicationSchedule.map((round, idx) => (
                  <div key={idx} className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-4">
                        <div className="text-2xl font-bold text-slate-900 dark:text-white">{round.time}</div>
                        <span className={`px-3 py-1 rounded text-sm font-medium ${
                          round.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-400' :
                          round.status === 'In Progress' ? 'bg-amber-500/20 text-amber-400' :
                          'bg-slate-500/20 text-slate-400'
                        }`}>
                          {round.status}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-slate-600 dark:text-slate-400">Nurse</div>
                        <div className="text-white font-medium">{round.nurse}</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-slate-600 dark:text-slate-400">Total Inmates:</span>{' '}
                        <span className="text-white font-semibold">{round.inmates}</span>
                      </div>
                      <div>
                        <span className="text-slate-600 dark:text-slate-400">Administered:</span>{' '}
                        <span className="text-emerald-400 font-semibold">{round.administered}</span>
                      </div>
                      <div>
                        <span className="text-slate-600 dark:text-slate-400">Refused:</span>{' '}
                        <span className={round.refused > 0 ? 'text-red-400 font-semibold' : 'text-slate-500'}>
                          {round.refused}
                        </span>
                      </div>
                    </div>
                    {round.status === 'In Progress' && (
                      <div className="mt-3">
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div
                            className="bg-amber-500 h-2 rounded-full transition-all"
                            style={{ width: `${(round.administered / round.inmates) * 100}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Sick Call Requests */}
        {selectedTab === 'sick-call' && (
          <div className="space-y-4">
            {sickCallRequests.map((request, idx) => (
              <div key={idx} className="bg-slate-800 border border-slate-700 rounded-lg p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{request.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                      <span>ID: {request.inmateId}</span>
                      <span>Housing: {request.housing}</span>
                      <span>Submitted: {request.submitted}</span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded text-sm font-medium border ${getPriorityColor(request.priority)}`}>
                    {request.priority}
                  </span>
                </div>
                <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 mb-3">
                  <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">Complaint:</div>
                  <div className="text-white">{request.complaint}</div>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded text-sm font-medium ${
                    request.status.includes('Scheduled') ? 'bg-amber-500/20 text-amber-400' :
                    request.status.includes('Approved') ? 'bg-emerald-500/20 text-emerald-400' :
                    'bg-amber-500/20 text-amber-400'
                  }`}>
                    {request.status}
                  </span>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors text-sm">
                      Approve
                    </button>
                    <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors text-sm">
                      Defer
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Chronic Conditions */}
        {selectedTab === 'all' && (
          <div className="space-y-4">
            {chronicCases.map((record, idx) => (
              <div key={idx} className="bg-slate-800 border border-slate-700 rounded-lg p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{record.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                      <span>ID: {record.inmateId}</span>
                      <span>Housing: {record.housing}</span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded text-sm font-medium ${
                    record.status === 'Stable' ? 'bg-emerald-500/20 text-emerald-400' :
                    record.status === 'Improving' ? 'bg-slate-700/40 text-slate-300' :
                    'bg-amber-500/20 text-amber-400'
                  }`}>
                    {record.status}
                  </span>
                </div>
                <div className="bg-slate-800/60 border border-slate-700/50 rounded-lg p-4 mb-3">
                  <h4 className="text-slate-700 dark:text-slate-300 font-semibold mb-2">{record.condition}</h4>
                  <div className="space-y-1">
                    {record.medications.map((med, medIdx) => (
                      <div key={medIdx} className="text-sm text-slate-700 dark:text-slate-300">• {med}</div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <span className="text-slate-600 dark:text-slate-400">Next Check:</span>{' '}
                    <span className="text-white font-medium">{record.nextCheck}</span>
                  </div>
                  <div>
                    <span className="text-slate-600 dark:text-slate-400">Last Reading:</span>{' '}
                    <span className="text-slate-700 dark:text-slate-300 font-medium">{record.lastReading}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default MedicalManagement;
