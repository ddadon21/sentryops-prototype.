import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatStatus } from '@/utils/formatStatus';
import {
  Camera, Fingerprint, FileText, Shield, AlertTriangle,
  CheckCircle, Clock, User, MapPin
} from 'lucide-react';
import DashboardLayout from '../../layouts/DashboardLayout';

interface BookingStep {
  id: string;
  name: string;
  status: 'completed' | 'in-progress' | 'pending';
  timestamp?: string;
  officer?: string;
}

const BookingProcessing = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'in-progress' | 'pending' | 'completed'>('in-progress');

  // Current bookings in process
  const inProgressBookings = [
    {
      id: 'BK-2024-3847',
      inmateId: '2024-089234',
      name: 'MARTINEZ, Carlos Antonio',
      arrestTime: '14:23',
      arrestingOfficer: 'Det. Williams, GCPD Badge #4521',
      arrestingAgency: 'Gwinnett County Police',
      transportOfficer: 'Deputy Johnson #D-2145',
      currentStep: 'Medical Screening',
      steps: [
        { id: 'intake', name: 'Intake & Pat Down', status: 'completed', timestamp: '14:35', officer: 'Deputy Chen' },
        { id: 'warrant', name: 'Warrant Check', status: 'completed', timestamp: '14:38', officer: 'System' },
        { id: 'photo', name: 'Photograph & Mugshot', status: 'completed', timestamp: '14:42', officer: 'Deputy Martinez' },
        { id: 'fingerprint', name: 'Fingerprinting', status: 'completed', timestamp: '14:45', officer: 'Deputy Martinez' },
        { id: 'personal', name: 'Personal Property', status: 'completed', timestamp: '14:50', officer: 'Deputy Davis' },
        { id: 'medical', name: 'Medical Screening', status: 'in-progress', timestamp: '14:55', officer: 'Nurse Thompson' },
        { id: 'classification', name: 'Classification', status: 'pending' },
        { id: 'housing', name: 'Housing Assignment', status: 'pending' }
      ] as BookingStep[],
      charges: ['Aggravated Assault', 'Possession Firearm by Felon'],
      alerts: ['VIOLENT OFFENSE', 'GANG AFFILIATED'],
      bond: 'No Bond'
    },
    {
      id: 'BK-2024-3848',
      inmateId: '2024-089235',
      name: 'DAVIS, Jennifer Rose',
      arrestTime: '15:10',
      arrestingOfficer: 'Officer Brown, Lawrenceville PD #3421',
      arrestingAgency: 'Lawrenceville Police',
      transportOfficer: 'Deputy Anderson #D-3267',
      currentStep: 'Fingerprinting',
      steps: [
        { id: 'intake', name: 'Intake & Pat Down', status: 'completed', timestamp: '15:18', officer: 'Deputy Wilson' },
        { id: 'warrant', name: 'Warrant Check', status: 'completed', timestamp: '15:20', officer: 'System' },
        { id: 'photo', name: 'Photograph & Mugshot', status: 'completed', timestamp: '15:25', officer: 'Deputy Martinez' },
        { id: 'fingerprint', name: 'Fingerprinting', status: 'in-progress', timestamp: '15:28', officer: 'Deputy Martinez' },
        { id: 'personal', name: 'Personal Property', status: 'pending' },
        { id: 'medical', name: 'Medical Screening', status: 'pending' },
        { id: 'classification', name: 'Classification', status: 'pending' },
        { id: 'housing', name: 'Housing Assignment', status: 'pending' }
      ] as BookingStep[],
      charges: ['DUI', 'Reckless Driving'],
      alerts: [],
      bond: '$2,500'
    }
  ];

  // Pending intake (waiting in sally port)
  const pendingBookings = [
    {
      id: 'PENDING-001',
      name: 'WILLIAMS, Tyrone K.',
      eta: '16:15',
      arrestingOfficer: 'Det. Rodriguez, GCPD #5234',
      arrestingAgency: 'Gwinnett County Police',
      transportOfficer: 'Deputy Clark #D-4156',
      preliminaryCharges: ['Theft by Taking', 'Obstruction'],
      status: 'In Transit'
    },
    {
      id: 'PENDING-002',
      name: 'BROWN, Ashley N.',
      eta: '16:30',
      arrestingOfficer: 'Officer Smith, Duluth PD #2187',
      arrestingAgency: 'Duluth Police',
      transportOfficer: 'Deputy Taylor #D-2789',
      preliminaryCharges: ['Shoplifting'],
      status: 'En Route'
    }
  ];

  // Recently completed
  const completedBookings = [
    {
      id: 'BK-2024-3846',
      inmateId: '2024-089233',
      name: 'JOHNSON, Keisha Marie',
      completedTime: '14:45',
      totalTime: '32 minutes',
      housing: 'D-Pod, Cell D-08',
      classification: 'Medium Security',
      bond: '$2,500'
    },
    {
      id: 'BK-2024-3845',
      inmateId: '2024-089232',
      name: 'WILLIAMS, Terrance LaShawn',
      completedTime: '13:58',
      totalTime: '28 minutes',
      housing: 'C2-Pod, Cell C2-18',
      classification: 'Minimum Security',
      bond: '$5,000'
    },
    {
      id: 'BK-2024-3844',
      inmateId: '2024-089231',
      name: 'ANDERSON, Michael James',
      completedTime: '13:22',
      totalTime: '41 minutes',
      housing: 'B-Pod, Cell B-31',
      classification: 'Maximum Security',
      bond: 'No Bond - Probation Violation'
    }
  ];

  const getStepIcon = (stepId: string) => {
    switch (stepId) {
      case 'intake': return <Shield className="w-5 h-5" />;
      case 'warrant': return <FileText className="w-5 h-5" />;
      case 'photo': return <Camera className="w-5 h-5" />;
      case 'fingerprint': return <Fingerprint className="w-5 h-5" />;
      case 'personal': return <User className="w-5 h-5" />;
      case 'medical': return <AlertTriangle className="w-5 h-5" />;
      case 'classification': return <Shield className="w-5 h-5" />;
      case 'housing': return <MapPin className="w-5 h-5" />;
      default: return <Clock className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'in-progress': return 'bg-amber-500/20 text-amber-700 border-amber-500/30';
      case 'pending': return 'bg-slate-500/20 text-slate-700 dark:text-slate-400 border-slate-500/30';
      default: return 'bg-slate-500/20 text-slate-700 dark:text-slate-400 border-slate-500/30';
    }
  };

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="w-8 h-8 text-amber-700" />
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white">Booking & Processing</h1>
              <p className="text-slate-700 dark:text-slate-400">Intake Management & Workflow Tracking</p>
            </div>
          </div>
        </div>
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-slate-700 rounded-lg">
                <div className="text-xs text-slate-700 dark:text-slate-400">In Process</div>
                <div className="text-xl font-bold text-amber-700">{inProgressBookings.length}</div>
              </div>
              <div className="px-4 py-2 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-slate-700 rounded-lg">
                <div className="text-xs text-slate-700 dark:text-slate-400">Pending Intake</div>
                <div className="text-xl font-bold text-slate-900 dark:text-white">{pendingBookings.length}</div>
              </div>
              <div className="px-4 py-2 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-slate-700 rounded-lg">
                <div className="text-xs text-slate-700 dark:text-slate-400">Today Total</div>
                <div className="text-xl font-bold text-slate-900 dark:text-white">18</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('in-progress')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'in-progress'
                ? 'bg-amber-500 text-slate-900'
                : 'bg-slate-800 text-slate-700 dark:text-slate-400 hover:bg-slate-700'
            }`}
          >
            In Progress ({inProgressBookings.length})
          </button>
          <button
            onClick={() => setActiveTab('pending')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'pending'
                ? 'bg-amber-500 text-slate-900'
                : 'bg-slate-800 text-slate-700 dark:text-slate-400 hover:bg-slate-700'
            }`}
          >
            Pending Intake ({pendingBookings.length})
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'completed'
                ? 'bg-amber-500 text-slate-900'
                : 'bg-slate-800 text-slate-700 dark:text-slate-400 hover:bg-slate-700'
            }`}
          >
            Completed Today ({completedBookings.length})
          </button>
        </div>

        {/* In Progress Bookings */}
        {activeTab === 'in-progress' && (
          <div className="space-y-6">
            {inProgressBookings.map((booking) => (
              <div key={booking.id} className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{booking.name}</h2>
                      {booking.alerts.length > 0 && (
                        <div className="flex gap-2">
                          {booking.alerts.map((alert, idx) => (
                            <span key={idx} className="px-2 py-1 bg-red-500/20 border border-red-500/30 text-red-400 rounded text-xs font-bold">
                              ⚠ {alert}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-slate-700 dark:text-slate-400">Booking #:</span>{' '}
                        <span className="text-amber-700 font-mono font-semibold">{booking.id}</span>
                      </div>
                      <div>
                        <span className="text-slate-700 dark:text-slate-400">Inmate ID:</span>{' '}
                        <span className="text-slate-900 dark:text-white font-semibold">{booking.inmateId}</span>
                      </div>
                      <div>
                        <span className="text-slate-700 dark:text-slate-400">Arrest Time:</span>{' '}
                        <span className="text-slate-900 dark:text-white">{booking.arrestTime}</span>
                      </div>
                      <div>
                        <span className="text-slate-700 dark:text-slate-400">Current Step:</span>{' '}
                        <span className="text-amber-700 font-semibold">{booking.currentStep}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-slate-700 dark:text-slate-400 mb-1">Bond</div>
                    <div className={`text-lg font-bold ${booking.bond === 'No Bond' ? 'text-red-400' : 'text-emerald-400'}`}>
                      {booking.bond}
                    </div>
                  </div>
                </div>

                {/* Arrest Information */}
                <div className="bg-white dark:bg-zinc-950/50 border border-slate-700 rounded-lg p-4 mb-6">
                  <h3 className="text-slate-900 dark:text-white font-semibold mb-3">Arrest Information</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-slate-700 dark:text-slate-400 mb-1">Arresting Officer</div>
                      <div className="text-slate-900 dark:text-white">{booking.arrestingOfficer}</div>
                    </div>
                    <div>
                      <div className="text-slate-700 dark:text-slate-400 mb-1">Arresting Agency</div>
                      <div className="text-slate-900 dark:text-white">{booking.arrestingAgency}</div>
                    </div>
                    <div>
                      <div className="text-slate-700 dark:text-slate-400 mb-1">Transport Officer</div>
                      <div className="text-slate-900 dark:text-white">{booking.transportOfficer}</div>
                    </div>
                    <div>
                      <div className="text-slate-700 dark:text-slate-400 mb-1">Charges</div>
                      <div className="space-y-1">
                        {booking.charges.map((charge, idx) => (
                          <div key={idx} className="text-red-400">• {charge}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Processing Steps Timeline */}
                <div className="mb-4">
                  <h3 className="text-slate-900 dark:text-white font-semibold mb-4">Processing Timeline</h3>
                  <div className="space-y-3">
                    {booking.steps.map((step, idx) => (
                      <div key={step.id} className="relative">
                        <div className={`flex items-center gap-4 p-4 rounded-lg border ${getStatusColor(step.status)}`}>
                          <div className={`p-2 rounded-lg ${
                            step.status === 'completed' ? 'bg-emerald-500/20' :
                            step.status === 'in-progress' ? 'bg-amber-500/20' :
                            'bg-slate-500/20'
                          }`}>
                            {step.status === 'completed' ? (
                              <CheckCircle className="w-5 h-5 text-emerald-400" />
                            ) : step.status === 'in-progress' ? (
                              <Clock className="w-5 h-5 text-amber-700 animate-pulse" />
                            ) : (
                              getStepIcon(step.id)
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold">{step.name}</div>
                            {step.officer && (
                              <div className="text-sm opacity-80">Officer: {step.officer}</div>
                            )}
                          </div>
                          {step.timestamp && (
                            <div className="text-sm font-mono">{step.timestamp}</div>
                          )}
                          {step.status === 'pending' && (
                            <div className="text-sm opacity-60">Waiting...</div>
                          )}
                        </div>
                        {idx < booking.steps.length - 1 && (
                          <div className={`absolute left-7 top-full w-0.5 h-3 ${
                            step.status === 'completed' ? 'bg-emerald-500/30' : 'bg-slate-600'
                          }`} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                    View Details
                  </button>
                  <button className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-900 font-medium rounded-lg transition-colors">
                    Advance to Next Step
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pending Intake */}
        {activeTab === 'pending' && (
          <div className="space-y-4">
            {pendingBookings.map((booking) => (
              <div key={booking.id} className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">{booking.name}</h3>
                      <span className="px-3 py-1 bg-amber-500/20 border border-amber-500/30 text-amber-700 rounded text-sm font-medium">
                        {formatStatus(booking.status)}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-slate-700 dark:text-slate-400">ETA:</span>{' '}
                        <span className="text-amber-700 font-semibold">{booking.eta}</span>
                      </div>
                      <div>
                        <span className="text-slate-700 dark:text-slate-400">Transport Officer:</span>{' '}
                        <span className="text-slate-900 dark:text-white">{booking.transportOfficer}</span>
                      </div>
                      <div>
                        <span className="text-slate-700 dark:text-slate-400">Arresting Officer:</span>{' '}
                        <span className="text-slate-900 dark:text-white">{booking.arrestingOfficer}</span>
                      </div>
                      <div>
                        <span className="text-slate-700 dark:text-slate-400">Agency:</span>{' '}
                        <span className="text-slate-900 dark:text-white">{booking.arrestingAgency}</span>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="text-slate-700 dark:text-slate-400 text-sm mb-1">Preliminary Charges:</div>
                      <div className="flex gap-2">
                        {booking.preliminaryCharges.map((charge, idx) => (
                          <span key={idx} className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-sm">
                            {charge}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                    Prepare Intake
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Completed Bookings */}
        {activeTab === 'completed' && (
          <div className="space-y-4">
            {completedBookings.map((booking) => (
              <div key={booking.id} className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white dark:bg-zinc-800/60 rounded-lg">
                      <CheckCircle className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{booking.name}</h3>
                      <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
                        <div>
                          <span className="text-slate-700 dark:text-slate-400">Booking #:</span>{' '}
                          <span className="text-amber-700 font-mono">{booking.id}</span>
                        </div>
                        <div>
                          <span className="text-slate-700 dark:text-slate-400">Inmate ID:</span>{' '}
                          <span className="text-slate-900 dark:text-white font-semibold">{booking.inmateId}</span>
                        </div>
                        <div>
                          <span className="text-slate-700 dark:text-slate-400">Completed:</span>{' '}
                          <span className="text-slate-900 dark:text-white">{booking.completedTime}</span>
                        </div>
                        <div>
                          <span className="text-slate-700 dark:text-slate-400">Total Time:</span>{' '}
                          <span className="text-slate-700 dark:text-slate-300 font-semibold">{booking.totalTime}</span>
                        </div>
                        <div>
                          <span className="text-slate-700 dark:text-slate-400">Housing:</span>{' '}
                          <span className="text-slate-900 dark:text-white">{booking.housing}</span>
                        </div>
                        <div>
                          <span className="text-slate-700 dark:text-slate-400">Classification:</span>{' '}
                          <span className="text-slate-900 dark:text-white">{booking.classification}</span>
                        </div>
                        <div className="col-span-2">
                          <span className="text-slate-700 dark:text-slate-400">Bond:</span>{' '}
                          <span className={booking.bond.includes('No Bond') ? 'text-red-400 font-semibold' : 'text-emerald-400 font-semibold'}>
                            {booking.bond}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate('/jail/inmates')}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    View in Roster
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default BookingProcessing;
