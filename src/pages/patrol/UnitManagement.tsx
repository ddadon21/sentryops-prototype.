import { useState } from 'react';
import {
  Users, Clock, MapPin, Radio, Search, Filter, Navigation, Car
} from 'lucide-react';
import DashboardLayout from '../../layouts/DashboardLayout';

interface PatrolUnit {
  id: string;
  callSign: string;
  vehicle: string;
  officer: string;
  badge: string;
  partner?: string;
  partnerBadge?: string;
  shift: 'A-Shift' | 'B-Shift' | 'C-Shift';
  zone: string;
  status: 'Available' | 'Dispatched' | 'En Route' | 'On Scene' | 'Out of Service' | 'Meal Break' | 'Administrative';
  currentCall?: string;
  location: string;
  mileage: number;
  fuelLevel: number;
  lastUpdate: string;
  equipment: string[];
}

const UnitManagement = () => {
  const [selectedShift, setSelectedShift] = useState<'all' | 'A-Shift' | 'B-Shift' | 'C-Shift'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const patrolUnits: PatrolUnit[] = [
    {
      id: '247',
      callSign: 'A-247',
      vehicle: 'Ford Explorer - Unit 247',
      officer: 'Deputy Williams, Thomas',
      badge: 'P-4521',
      shift: 'A-Shift',
      zone: 'Zone 2 - Lawrenceville',
      status: 'En Route',
      currentCall: '24-12847 - Domestic Violence',
      location: 'Pleasant Hill Rd @ Lawrenceville Hwy',
      mileage: 47234,
      fuelLevel: 65,
      lastUpdate: '14:34',
      equipment: ['Body Cam', 'Taser', 'Rifle - AR15', 'AED']
    },
    {
      id: '251',
      callSign: 'A-251',
      vehicle: 'Dodge Charger - Unit 251',
      officer: 'Deputy Martinez, Carlos',
      badge: 'P-3892',
      partner: 'Deputy Patel, Rajesh',
      partnerBadge: 'P-5167',
      shift: 'A-Shift',
      zone: 'Zone 2 - Lawrenceville',
      status: 'En Route',
      currentCall: '24-12847 - Domestic Violence',
      location: 'Lawrenceville Hwy @ McDonough',
      mileage: 52891,
      fuelLevel: 45,
      lastUpdate: '14:33',
      equipment: ['Body Cam x2', 'Taser x2', 'Shotgun', 'First Aid']
    },
    {
      id: '239',
      callSign: 'A-239',
      vehicle: 'Ford Explorer - Unit 239',
      officer: 'Deputy Chen, Michael',
      badge: 'P-2987',
      shift: 'A-Shift',
      zone: 'Zone 1 - Duluth',
      status: 'On Scene',
      currentCall: '24-12846 - Suspicious Person',
      location: '2100 Pleasant Hill Rd',
      mileage: 38567,
      fuelLevel: 78,
      lastUpdate: '14:23',
      equipment: ['Body Cam', 'Taser', 'K9 - Max (Narcotics)', 'First Aid']
    },
    {
      id: '243',
      callSign: 'A-243',
      vehicle: 'Ford Explorer - Unit 243',
      officer: 'Deputy Johnson, Kevin',
      badge: 'P-4167',
      shift: 'A-Shift',
      zone: 'Zone 3 - Highway Patrol',
      status: 'On Scene',
      currentCall: '24-12845 - Traffic Accident',
      location: 'I-85 NB @ SR 316',
      mileage: 61234,
      fuelLevel: 52,
      lastUpdate: '14:19',
      equipment: ['Body Cam', 'Taser', 'First Aid', 'Traffic Cones', 'Flares']
    },
    {
      id: '256',
      callSign: 'A-256',
      vehicle: 'Dodge Charger - Unit 256',
      officer: 'Deputy Anderson, Lisa',
      badge: 'P-3456',
      shift: 'A-Shift',
      zone: 'Zone 3 - Highway Patrol',
      status: 'On Scene',
      currentCall: '24-12845 - Traffic Accident',
      location: 'I-85 NB @ SR 316',
      mileage: 44892,
      fuelLevel: 71,
      lastUpdate: '14:20',
      equipment: ['Body Cam', 'Taser', 'First Aid', 'Rifle - AR15']
    },
    {
      id: '241',
      callSign: 'A-241',
      vehicle: 'Ford Expedition - Unit 241',
      officer: 'Deputy Brown, David',
      badge: 'P-2134',
      shift: 'A-Shift',
      zone: 'Zone 2 - Lawrenceville',
      status: 'On Scene',
      currentCall: '24-12844 - Theft Report',
      location: '3355 Sugarloaf Pkwy',
      mileage: 55678,
      fuelLevel: 58,
      lastUpdate: '14:08',
      equipment: ['Body Cam', 'Taser', 'Evidence Collection Kit']
    },
    {
      id: '248',
      callSign: 'A-248',
      vehicle: 'Ford Explorer - Unit 248',
      officer: 'Deputy Davis, Robert',
      badge: 'P-5234',
      shift: 'A-Shift',
      zone: 'Zone 4 - Buford',
      status: 'Dispatched',
      currentCall: '24-12843 - Commercial Alarm',
      location: 'Pleasant Hill Rd @ Mall Blvd',
      mileage: 41567,
      fuelLevel: 82,
      lastUpdate: '14:32',
      equipment: ['Body Cam', 'Taser', 'Rifle - AR15']
    },
    {
      id: '252',
      callSign: 'A-252',
      vehicle: 'Ford Explorer - Unit 252',
      officer: 'Deputy Wilson, Amanda',
      badge: 'P-4892',
      shift: 'A-Shift',
      zone: 'Zone 4 - Norcross',
      status: 'En Route',
      currentCall: '24-12842 - Animal Complaint',
      location: 'Beaver Ruin Rd @ Jimmy Carter',
      mileage: 39234,
      fuelLevel: 67,
      lastUpdate: '14:30',
      equipment: ['Body Cam', 'Taser', 'Animal Control Equipment']
    },
    {
      id: '245',
      callSign: 'A-245',
      vehicle: 'Dodge Charger - Unit 245',
      officer: 'Deputy Taylor, Sarah',
      badge: 'P-3729',
      shift: 'A-Shift',
      zone: 'Zone 1 - Duluth',
      status: 'On Scene',
      currentCall: '24-12841 - Welfare Check',
      location: '2450 Steve Reynolds Blvd',
      mileage: 48923,
      fuelLevel: 43,
      lastUpdate: '14:15',
      equipment: ['Body Cam', 'Taser', 'First Aid', 'AED']
    },
    {
      id: '234',
      callSign: 'A-234',
      vehicle: 'Ford Explorer - Unit 234',
      officer: 'Deputy Rodriguez, Maria',
      badge: 'P-2845',
      shift: 'A-Shift',
      zone: 'Zone 3 - Lawrenceville',
      status: 'Available',
      location: 'Patrol Zone 3 - Lawrenceville',
      mileage: 36789,
      fuelLevel: 91,
      lastUpdate: '14:35',
      equipment: ['Body Cam', 'Taser', 'Rifle - AR15', 'First Aid']
    },
    {
      id: '238',
      callSign: 'A-238',
      vehicle: 'Dodge Charger - Unit 238',
      officer: 'Deputy Clark, Jennifer',
      badge: 'P-4678',
      shift: 'A-Shift',
      zone: 'Zone 1 - Duluth',
      status: 'Available',
      location: 'Patrol Zone 1 - Duluth',
      mileage: 42156,
      fuelLevel: 88,
      lastUpdate: '14:33',
      equipment: ['Body Cam', 'Taser', 'Shotgun']
    },
    {
      id: '249',
      callSign: 'A-249',
      vehicle: 'Ford Explorer - Unit 249',
      officer: 'Deputy Thompson, Eric',
      badge: 'P-3124',
      shift: 'A-Shift',
      zone: 'Zone 4 - Norcross',
      status: 'Available',
      location: 'Patrol Zone 4 - Norcross',
      mileage: 51234,
      fuelLevel: 76,
      lastUpdate: '14:31',
      equipment: ['Body Cam', 'Taser', 'First Aid']
    },
    {
      id: '253',
      callSign: 'A-253',
      vehicle: 'Ford Expedition - Unit 253',
      officer: 'Deputy Garcia, Luis',
      badge: 'P-4923',
      shift: 'A-Shift',
      zone: 'Zone 2 - Lawrenceville',
      status: 'Administrative',
      location: 'HQ - Report Writing',
      mileage: 47891,
      fuelLevel: 34,
      lastUpdate: '14:10',
      equipment: ['Body Cam', 'Taser', 'Evidence Collection Kit']
    },
    {
      id: '257',
      callSign: 'A-257',
      vehicle: 'Dodge Charger - Unit 257',
      officer: 'Deputy Lee, Kevin',
      badge: 'P-3567',
      shift: 'A-Shift',
      zone: 'Zone 1 - Duluth',
      status: 'Out of Service',
      location: 'Detention Center - Prisoner Transport',
      mileage: 39876,
      fuelLevel: 62,
      lastUpdate: '14:00',
      equipment: ['Body Cam', 'Taser', 'Transport Restraints']
    },
    {
      id: '242',
      callSign: 'A-242',
      vehicle: 'Ford Explorer - Unit 242',
      officer: 'Deputy Nguyen, Thi',
      badge: 'P-2678',
      shift: 'A-Shift',
      zone: 'Zone 3 - Lawrenceville',
      status: 'Meal Break',
      location: 'Lawrenceville Hwy @ Riverside Pkwy',
      mileage: 44567,
      fuelLevel: 55,
      lastUpdate: '14:25',
      equipment: ['Body Cam', 'Taser', 'First Aid']
    }
  ];

  const filteredUnits = patrolUnits.filter(unit => {
    const matchesShift = selectedShift === 'all' || unit.shift === selectedShift;
    const matchesSearch =
      unit.callSign.toLowerCase().includes(searchTerm.toLowerCase()) ||
      unit.officer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      unit.zone.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesShift && matchesSearch;
  });

  const stats = {
    total: filteredUnits.length,
    available: filteredUnits.filter(u => u.status === 'Available').length,
    deployed: filteredUnits.filter(u => u.status === 'En Route' || u.status === 'On Scene' || u.status === 'Dispatched').length,
    outOfService: filteredUnits.filter(u => u.status === 'Out of Service' || u.status === 'Administrative' || u.status === 'Meal Break').length
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'Dispatched': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'En Route': return 'bg-amber-500/20 text-amber-700 border-amber-500/30';
      case 'On Scene': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'Meal Break': return 'bg-slate-500/20 text-slate-700 dark:text-slate-400 border-slate-500/30';
      case 'Administrative': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Out of Service': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-slate-500/20 text-slate-700 dark:text-slate-400 border-slate-500/30';
    }
  };

  const getFuelColor = (level: number) => {
    if (level >= 60) return 'text-emerald-400';
    if (level >= 30) return 'text-amber-700';
    return 'text-red-400';
  };

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Car className="w-8 h-8 text-amber-700" />
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white">Patrol Unit Management</h1>
              <p className="text-slate-700 dark:text-slate-400">Real-Time Unit Status & Fleet Management</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
            <div className="text-sm text-slate-700 dark:text-slate-400 mb-1">Total Units ({selectedShift === 'all' ? 'All Shifts' : selectedShift})</div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">{stats.total}</div>
          </div>
          <div className="bg-slate-800 border border-emerald-500/30 rounded-lg p-4">
            <div className="text-sm text-slate-700 dark:text-slate-400 mb-1">Available</div>
            <div className="text-2xl font-bold text-emerald-400">{stats.available}</div>
          </div>
          <div className="bg-slate-800 border border-amber-500/30 rounded-lg p-4">
            <div className="text-sm text-slate-700 dark:text-slate-400 mb-1">Deployed</div>
            <div className="text-2xl font-bold text-amber-700">{stats.deployed}</div>
          </div>
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
            <div className="text-sm text-slate-700 dark:text-slate-400 mb-1">Out of Service</div>
            <div className="text-2xl font-bold text-slate-700 dark:text-slate-400">{stats.outOfService}</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 text-slate-700 dark:text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by call sign, officer, or zone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-slate-700 dark:text-slate-400" />
              <div className="flex gap-2">
                {(['all', 'A-Shift', 'B-Shift', 'C-Shift'] as const).map((shift) => (
                  <button
                    key={shift}
                    onClick={() => setSelectedShift(shift)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedShift === shift
                        ? 'bg-amber-500 text-slate-900'
                        : 'bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    {shift === 'all' ? 'All Shifts' : shift}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Units Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredUnits.map((unit) => (
            <div
              key={unit.id}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-5 hover:border-slate-600 transition-colors"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-xl font-bold text-slate-900 dark:text-white mb-1">{unit.callSign}</div>
                  <div className="text-sm text-slate-700 dark:text-slate-400">{unit.vehicle}</div>
                </div>
                <span className={`px-3 py-1 rounded text-xs font-medium border ${getStatusColor(unit.status)}`}>
                  {unit.status}
                </span>
              </div>

              {/* Officer Info */}
              <div className="bg-white dark:bg-slate-900/50 border border-slate-700 rounded-lg p-3 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-blue-400" />
                  <div className="text-sm text-slate-900 dark:text-white font-medium">{unit.officer}</div>
                </div>
                <div className="text-xs text-slate-700 dark:text-slate-400">Badge: {unit.badge}</div>
                {unit.partner && (
                  <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                    <div className="text-sm text-slate-900 dark:text-white font-medium">{unit.partner}</div>
                    <div className="text-xs text-slate-700 dark:text-slate-400">Badge: {unit.partnerBadge}</div>
                  </div>
                )}
              </div>

              {/* Assignment */}
              <div className="space-y-2 text-sm mb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-purple-400" />
                  <span className="text-slate-700 dark:text-slate-400">Zone:</span>
                  <span className="text-slate-900 dark:text-white font-medium">{unit.zone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-emerald-400" />
                  <span className="text-slate-700 dark:text-slate-400">Location:</span>
                  <span className="text-slate-900 dark:text-white text-xs">{unit.location}</span>
                </div>
                {unit.currentCall && (
                  <div className="flex items-center gap-2">
                    <Radio className="w-4 h-4 text-amber-700" />
                    <span className="text-amber-700 font-medium text-xs">{unit.currentCall}</span>
                  </div>
                )}
              </div>

              {/* Vehicle Stats */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-white dark:bg-slate-900/50 border border-slate-700 rounded p-2">
                  <div className="text-slate-700 dark:text-slate-400 mb-1">Mileage</div>
                  <div className="text-slate-900 dark:text-white font-bold">{unit.mileage.toLocaleString()}</div>
                </div>
                <div className="bg-white dark:bg-slate-900/50 border border-slate-700 rounded p-2">
                  <div className="text-slate-700 dark:text-slate-400 mb-1">Fuel</div>
                  <div className={`font-bold ${getFuelColor(unit.fuelLevel)}`}>{unit.fuelLevel}%</div>
                </div>
              </div>

              {/* Equipment */}
              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                <div className="text-xs text-slate-700 dark:text-slate-400 mb-2">Equipment:</div>
                <div className="flex flex-wrap gap-1">
                  {unit.equipment.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded text-xs"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Last Update */}
              <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>Updated: {unit.lastUpdate}</span>
                </div>
                <span className="text-slate-700">{unit.shift}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UnitManagement;
