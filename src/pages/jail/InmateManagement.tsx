import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, Filter, Download, AlertCircle, Calendar,
  MapPin, FileText, ExternalLink, User, Scale
} from 'lucide-react';
import DashboardLayout from '../../layouts/DashboardLayout';

interface Inmate {
  id: string;
  bookingNumber: string;
  lastName: string;
  firstName: string;
  middleName: string;
  suffix?: string;
  dob: string;
  age: number;
  race: string;
  gender: string;
  bookingDate: string;
  bookingTime: string;
  charges: Charge[];
  bond: string;
  bondAmount?: number;
  classification: string;
  housing: string;
  cell: string;
  arrestingAgency: string;
  nextCourtDate?: string;
  courtType?: string;
  status: string;
  flags: string[];
  mugshot?: string;
}

interface Charge {
  statute: string;
  description: string;
  degree: string;
  bond: string;
  bondAmount?: number;
}

const InmateManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedInmate, setSelectedInmate] = useState<Inmate | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Comprehensive inmate roster with realistic data
  const inmates: Inmate[] = [
    {
      id: '2024-089234',
      bookingNumber: 'BK-2024-3847',
      lastName: 'MARTINEZ',
      firstName: 'Carlos',
      middleName: 'Antonio',
      dob: '1989-03-15',
      age: 35,
      race: 'Hispanic',
      gender: 'Male',
      bookingDate: '2024-12-05',
      bookingTime: '14:23',
      charges: [
        { statute: 'O.C.G.A. 16-5-21', description: 'Aggravated Assault', degree: 'Felony', bond: 'No Bond', bondAmount: 0 },
        { statute: 'O.C.G.A. 16-11-131', description: 'Possession of Firearm by Convicted Felon', degree: 'Felony', bond: 'No Bond', bondAmount: 0 }
      ],
      bond: 'No Bond',
      bondAmount: 0,
      classification: 'Maximum Security',
      housing: 'B-Pod',
      cell: 'B-14',
      arrestingAgency: 'Gwinnett County Police',
      nextCourtDate: '2024-12-09',
      courtType: 'Superior Court',
      status: 'Awaiting Classification',
      flags: ['VIOLENT', 'GANG AFFILIATED']
    },
    {
      id: '2024-089233',
      bookingNumber: 'BK-2024-3846',
      lastName: 'JOHNSON',
      firstName: 'Keisha',
      middleName: 'Marie',
      dob: '1994-07-22',
      age: 30,
      race: 'Black',
      gender: 'Female',
      bookingDate: '2024-12-05',
      bookingTime: '13:45',
      charges: [
        { statute: 'O.C.G.A. 40-6-391', description: 'Driving Under the Influence', degree: 'Misdemeanor', bond: 'Cash/Surety', bondAmount: 2500 },
        { statute: 'O.C.G.A. 40-6-390', description: 'Reckless Driving', degree: 'Misdemeanor', bond: 'Cash/Surety', bondAmount: 500 }
      ],
      bond: 'Cash/Surety',
      bondAmount: 2500,
      classification: 'Medium Security',
      housing: 'D-Pod',
      cell: 'D-08',
      arrestingAgency: 'Lawrenceville PD',
      nextCourtDate: '2024-12-12',
      courtType: 'State Court',
      status: 'Classified',
      flags: []
    },
    {
      id: '2024-089187',
      bookingNumber: 'BK-2024-3802',
      lastName: 'THOMPSON',
      firstName: 'Marcus',
      middleName: 'Dwayne',
      dob: '1985-11-08',
      age: 39,
      race: 'Black',
      gender: 'Male',
      bookingDate: '2024-12-02',
      bookingTime: '09:15',
      charges: [
        { statute: 'O.C.G.A. 16-13-30', description: 'Possession with Intent to Distribute - Cocaine', degree: 'Felony', bond: 'Cash/Surety', bondAmount: 50000 },
        { statute: 'O.C.G.A. 16-13-32.2', description: 'Possession of Drug Related Objects', degree: 'Misdemeanor', bond: 'Cash/Surety', bondAmount: 5000 }
      ],
      bond: 'Cash/Surety',
      bondAmount: 50000,
      classification: 'Maximum Security',
      housing: 'B-Pod',
      cell: 'B-22',
      arrestingAgency: 'DEA/GCPD Task Force',
      nextCourtDate: '2024-12-16',
      courtType: 'Superior Court',
      status: 'Classified',
      flags: ['FLIGHT RISK', 'PRIOR FELONY']
    },
    {
      id: '2024-088956',
      bookingNumber: 'BK-2024-3621',
      lastName: 'PATEL',
      firstName: 'Rajesh',
      middleName: 'Kumar',
      dob: '1992-01-30',
      age: 32,
      race: 'Asian',
      gender: 'Male',
      bookingDate: '2024-11-28',
      bookingTime: '16:42',
      charges: [
        { statute: 'O.C.G.A. 16-9-1', description: 'Forgery - 1st Degree', degree: 'Felony', bond: 'Cash/Surety', bondAmount: 15000 },
        { statute: 'O.C.G.A. 16-9-20', description: 'Identity Fraud', degree: 'Felony', bond: 'Cash/Surety', bondAmount: 10000 }
      ],
      bond: 'Cash/Surety',
      bondAmount: 25000,
      classification: 'Medium Security',
      housing: 'C-Pod',
      cell: 'C-45',
      arrestingAgency: 'Gwinnett County Police',
      nextCourtDate: '2024-12-19',
      courtType: 'Superior Court',
      status: 'Classified',
      flags: []
    },
    {
      id: '2024-088745',
      bookingNumber: 'BK-2024-3498',
      lastName: 'WILLIAMS',
      firstName: 'Terrance',
      middleName: 'LaShawn',
      dob: '1997-05-14',
      age: 27,
      race: 'Black',
      gender: 'Male',
      bookingDate: '2024-11-25',
      bookingTime: '12:18',
      charges: [
        { statute: 'O.C.G.A. 16-8-2', description: 'Theft by Taking', degree: 'Felony', bond: 'Cash/Surety', bondAmount: 5000 },
        { statute: 'O.C.G.A. 16-7-21', description: 'Criminal Trespass', degree: 'Misdemeanor', bond: 'Cash/Surety', bondAmount: 1000 }
      ],
      bond: 'Cash/Surety',
      bondAmount: 5000,
      classification: 'Minimum Security',
      housing: 'C2-Pod',
      cell: 'C2-18',
      arrestingAgency: 'Norcross PD',
      nextCourtDate: '2024-12-08',
      courtType: 'State Court',
      status: 'Work Release Approved',
      flags: []
    },
    {
      id: '2024-088654',
      bookingNumber: 'BK-2024-3432',
      lastName: 'ANDERSON',
      firstName: 'Michael',
      middleName: 'James',
      dob: '1988-09-03',
      age: 36,
      race: 'White',
      gender: 'Male',
      bookingDate: '2024-11-24',
      bookingTime: '11:34',
      charges: [
        { statute: 'O.C.G.A. 42-8-38', description: 'Probation Violation - Aggravated Assault', degree: 'N/A', bond: 'No Bond', bondAmount: 0 }
      ],
      bond: 'No Bond',
      bondAmount: 0,
      classification: 'Maximum Security',
      housing: 'B-Pod',
      cell: 'B-31',
      arrestingAgency: 'Gwinnett County Sheriff',
      nextCourtDate: '2024-12-11',
      courtType: 'Superior Court',
      status: 'Classified',
      flags: ['PROBATION VIOLATION', 'PRIOR VIOLENCE']
    },
    {
      id: '2024-088521',
      bookingNumber: 'BK-2024-3376',
      lastName: 'RODRIGUEZ',
      firstName: 'Elena',
      middleName: 'Sofia',
      dob: '1991-12-19',
      age: 32,
      race: 'Hispanic',
      gender: 'Female',
      bookingDate: '2024-11-22',
      bookingTime: '15:27',
      charges: [
        { statute: 'O.C.G.A. 16-13-30', description: 'Possession of Methamphetamine', degree: 'Felony', bond: 'Cash/Surety', bondAmount: 7500 },
        { statute: 'O.C.G.A. 16-12-1', description: 'Endangering a Child - Possession Drugs', degree: 'Felony', bond: 'Cash/Surety', bondAmount: 10000 }
      ],
      bond: 'Cash/Surety',
      bondAmount: 17500,
      classification: 'Medium Security',
      housing: 'D-Pod',
      cell: 'D-23',
      arrestingAgency: 'Gwinnett County Police',
      nextCourtDate: '2024-12-15',
      courtType: 'Superior Court',
      status: 'Classified',
      flags: ['MEDICAL - DETOX PROTOCOL']
    },
    {
      id: '2024-088302',
      bookingNumber: 'BK-2024-3214',
      lastName: 'CHEN',
      firstName: 'Wei',
      middleName: 'Li',
      dob: '1987-04-25',
      age: 37,
      race: 'Asian',
      gender: 'Male',
      bookingDate: '2024-11-19',
      bookingTime: '08:53',
      charges: [
        { statute: 'O.C.G.A. 16-5-23', description: 'Simple Battery - Family Violence', degree: 'Misdemeanor', bond: 'Cash/Surety', bondAmount: 3000 }
      ],
      bond: 'Cash/Surety',
      bondAmount: 3000,
      classification: 'Medium Security',
      housing: 'A-Pod',
      cell: 'A-56',
      arrestingAgency: 'Gwinnett County Police',
      nextCourtDate: '2024-12-10',
      courtType: 'State Court',
      status: 'Protective Custody',
      flags: ['PROTECTIVE CUSTODY']
    },
    {
      id: '2024-087956',
      bookingNumber: 'BK-2024-2987',
      lastName: 'JACKSON',
      firstName: 'Demetrius',
      middleName: 'Tyrone',
      dob: '1983-08-12',
      age: 41,
      race: 'Black',
      gender: 'Male',
      bookingDate: '2024-11-14',
      bookingTime: '22:47',
      charges: [
        { statute: 'O.C.G.A. 16-5-20', description: 'Murder', degree: 'Felony', bond: 'No Bond', bondAmount: 0 }
      ],
      bond: 'No Bond',
      bondAmount: 0,
      classification: 'Administrative Segregation',
      housing: 'B2-Pod',
      cell: 'B2-04',
      arrestingAgency: 'Gwinnett County Police',
      nextCourtDate: '2024-12-20',
      courtType: 'Superior Court',
      status: 'Classified',
      flags: ['CAPITAL OFFENSE', 'KEEP SEPARATE - REF B2-08', '23/7 LOCKDOWN']
    },
    {
      id: '2024-087854',
      bookingNumber: 'BK-2024-2912',
      lastName: 'NGUYEN',
      firstName: 'Thi',
      middleName: 'Mai',
      dob: '1999-02-07',
      age: 25,
      race: 'Asian',
      gender: 'Female',
      bookingDate: '2024-11-13',
      bookingTime: '13:22',
      charges: [
        { statute: 'O.C.G.A. 16-8-41', description: 'Theft by Shoplifting', degree: 'Misdemeanor', bond: 'Cash/Surety', bondAmount: 1000 },
        { statute: 'O.C.G.A. 16-10-24', description: 'Obstruction of Law Enforcement Officer', degree: 'Misdemeanor', bond: 'Cash/Surety', bondAmount: 1500 }
      ],
      bond: 'Cash/Surety',
      bondAmount: 2500,
      classification: 'Minimum Security',
      housing: 'D-Pod',
      cell: 'D-42',
      arrestingAgency: 'Duluth PD',
      nextCourtDate: '2024-12-07',
      courtType: 'State Court',
      status: 'Classified',
      flags: []
    },
    {
      id: '2024-087623',
      bookingNumber: 'BK-2024-2756',
      lastName: 'SMITH',
      firstName: 'Brandon',
      middleName: 'Kyle',
      dob: '1995-06-28',
      age: 29,
      race: 'White',
      gender: 'Male',
      bookingDate: '2024-11-10',
      bookingTime: '19:34',
      charges: [
        { statute: 'O.C.G.A. 16-6-1', description: 'Rape', degree: 'Felony', bond: 'No Bond', bondAmount: 0 },
        { statute: 'O.C.G.A. 16-6-22.2', description: 'Aggravated Sodomy', degree: 'Felony', bond: 'No Bond', bondAmount: 0 }
      ],
      bond: 'No Bond',
      bondAmount: 0,
      classification: 'Protective Custody',
      housing: 'F2-Pod',
      cell: 'F2-12',
      arrestingAgency: 'Gwinnett County Police - SVU',
      nextCourtDate: '2024-12-18',
      courtType: 'Superior Court',
      status: 'Classified',
      flags: ['SEX OFFENSE', 'PROTECTIVE CUSTODY', 'KEEP SEPARATE LIST']
    },
    {
      id: '2024-087401',
      bookingNumber: 'BK-2024-2621',
      lastName: 'BROWN',
      firstName: 'Darius',
      middleName: 'Kenneth',
      dob: '1993-10-15',
      age: 31,
      race: 'Black',
      gender: 'Male',
      bookingDate: '2024-11-08',
      bookingTime: '08:15',
      charges: [
        { statute: 'O.C.G.A. 16-7-1', description: 'Burglary - 1st Degree', degree: 'Felony', bond: 'Cash/Surety', bondAmount: 10000 },
        { statute: 'O.C.G.A. 16-7-22', description: 'Criminal Damage to Property - 1st Degree', degree: 'Felony', bond: 'Cash/Surety', bondAmount: 5000 }
      ],
      bond: 'Cash/Surety',
      bondAmount: 15000,
      classification: 'Medium Security',
      housing: 'A2-Pod',
      cell: 'A2-33',
      arrestingAgency: 'Snellville PD',
      nextCourtDate: '2024-12-14',
      courtType: 'Superior Court',
      status: 'Classified',
      flags: []
    },
    {
      id: '2024-086987',
      bookingNumber: 'BK-2024-2301',
      lastName: 'GARCIA',
      firstName: 'Luis',
      middleName: 'Alberto',
      dob: '1990-03-22',
      age: 34,
      race: 'Hispanic',
      gender: 'Male',
      bookingDate: '2024-11-02',
      bookingTime: '14:56',
      charges: [
        { statute: '8 U.S.C. § 1326', description: 'Illegal Re-Entry After Deportation', degree: 'Federal', bond: 'ICE Hold', bondAmount: 0 }
      ],
      bond: 'ICE Hold',
      bondAmount: 0,
      classification: 'Medium Security',
      housing: 'H2-Pod',
      cell: 'H2-28',
      arrestingAgency: 'ICE/ERO Atlanta',
      status: 'Classified',
      flags: ['ICE DETAINER', 'DO NOT RELEASE']
    },
    {
      id: '2024-086754',
      bookingNumber: 'BK-2024-2156',
      lastName: 'TAYLOR',
      firstName: 'Ashley',
      middleName: 'Nicole',
      dob: '1996-07-11',
      age: 28,
      race: 'White',
      gender: 'Female',
      bookingDate: '2024-10-31',
      bookingTime: '11:28',
      charges: [
        { statute: 'O.C.G.A. 16-13-30', description: 'Possession of Heroin', degree: 'Felony', bond: 'Cash/Surety', bondAmount: 7500 },
        { statute: 'O.C.G.A. 40-5-121', description: 'Driving While License Suspended', degree: 'Misdemeanor', bond: 'Cash/Surety', bondAmount: 1000 }
      ],
      bond: 'Cash/Surety',
      bondAmount: 8500,
      classification: 'Medium Security',
      housing: 'E-Pod',
      cell: 'E-19',
      arrestingAgency: 'Gwinnett County Police',
      nextCourtDate: '2024-12-13',
      courtType: 'State Court',
      status: 'Medical Housing',
      flags: ['MEDICAL - SUBSTANCE ABUSE', 'PREGNANT']
    },
    {
      id: '2024-086512',
      bookingNumber: 'BK-2024-2034',
      lastName: 'WASHINGTON',
      firstName: 'Jamal',
      middleName: 'Andre',
      dob: '2006-09-18',
      age: 18,
      race: 'Black',
      gender: 'Male',
      bookingDate: '2024-10-28',
      bookingTime: '16:45',
      charges: [
        { statute: 'O.C.G.A. 16-11-102', description: 'Possession of Firearm During Commission of Crime', degree: 'Felony', bond: 'Cash/Surety', bondAmount: 20000 },
        { statute: 'O.C.G.A. 16-8-12', description: 'Armed Robbery', degree: 'Felony', bond: 'No Bond', bondAmount: 0 }
      ],
      bond: 'No Bond',
      bondAmount: 0,
      classification: 'Maximum Security',
      housing: 'G-Pod',
      cell: 'G-08',
      arrestingAgency: 'Gwinnett County Police',
      nextCourtDate: '2024-12-21',
      courtType: 'Superior Court',
      status: 'Juvenile Certified as Adult',
      flags: ['JUVENILE CERTIFIED ADULT', 'GANG AFFILIATED', 'VIOLENT']
    },
    {
      id: '2024-085982',
      bookingNumber: 'BK-2024-1687',
      lastName: 'MILLER',
      firstName: 'Robert',
      middleName: 'Eugene',
      suffix: 'Jr.',
      dob: '1979-12-05',
      age: 44,
      race: 'White',
      gender: 'Male',
      bookingDate: '2024-10-22',
      bookingTime: '09:12',
      charges: [
        { statute: '18 U.S.C. § 922(g)', description: 'Felon in Possession of Firearm', degree: 'Federal', bond: 'Federal Hold', bondAmount: 0 },
        { statute: '21 U.S.C. § 841', description: 'Distribution of Controlled Substance', degree: 'Federal', bond: 'Federal Hold', bondAmount: 0 }
      ],
      bond: 'Federal Hold',
      bondAmount: 0,
      classification: 'High Security',
      housing: 'H-Pod',
      cell: 'H-34',
      arrestingAgency: 'FBI/ATF',
      nextCourtDate: '2024-12-17',
      courtType: 'Federal Court',
      status: 'Federal Detainee',
      flags: ['FEDERAL HOLD', 'DO NOT RELEASE', 'U.S. MARSHAL']
    }
  ];

  const filteredInmates = inmates.filter(inmate => {
    const matchesSearch =
      inmate.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inmate.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inmate.id.includes(searchTerm) ||
      inmate.bookingNumber.includes(searchTerm);

    const matchesFilter =
      selectedFilter === 'all' ||
      (selectedFilter === 'max-security' && inmate.classification === 'Maximum Security') ||
      (selectedFilter === 'medical' && inmate.flags.some(f => f.includes('MEDICAL'))) ||
      (selectedFilter === 'protective' && inmate.classification === 'Protective Custody') ||
      (selectedFilter === 'federal' && inmate.flags.some(f => f.includes('FEDERAL'))) ||
      (selectedFilter === 'no-bond' && inmate.bond === 'No Bond');

    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: inmates.length,
    male: inmates.filter(i => i.gender === 'Male').length,
    female: inmates.filter(i => i.gender === 'Female').length,
    noBond: inmates.filter(i => i.bond === 'No Bond').length,
    medical: inmates.filter(i => i.flags.some(f => f.includes('MEDICAL'))).length
  };

  const getClassificationColor = (classification: string) => {
    switch (classification) {
      case 'Maximum Security':
      case 'Administrative Segregation':
        return 'text-red-400';
      case 'Medium Security':
        return 'text-amber-400';
      case 'Minimum Security':
        return 'text-emerald-400';
      case 'Protective Custody':
        return 'text-slate-400';
      default:
        return 'text-slate-400';
    }
  };

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <User className="w-8 h-8 text-amber-500" />
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-white">Inmate Management</h1>
                <p className="text-slate-600 dark:text-slate-400">Current Population: {stats.total} Inmates</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors flex items-center gap-2 text-sm">
                <Download className="w-4 h-4" />
                Export Roster
              </button>
              <button
                onClick={() => navigate('/jail/booking')}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold rounded-lg transition-colors text-sm"
              >
                New Booking
              </button>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-5 gap-4 mb-6">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">Total Inmates</div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">{stats.total}</div>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">Male</div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">{stats.male}</div>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">Female</div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">{stats.female}</div>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">No Bond</div>
            <div className="text-2xl font-bold text-red-400">{stats.noBond}</div>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">Medical</div>
            <div className="text-2xl font-bold text-amber-400">{stats.medical}</div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 text-slate-600 dark:text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by name, inmate ID, or booking number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
              >
                <option value="all">All Inmates</option>
                <option value="max-security">Maximum Security</option>
                <option value="medical">Medical Housing</option>
                <option value="protective">Protective Custody</option>
                <option value="federal">Federal Holds</option>
                <option value="no-bond">No Bond</option>
              </select>
            </div>
          </div>
        </div>

        {/* Inmate Roster Table */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-900 border-b border-slate-700">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase">Inmate ID</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase">DOB/Age</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase">Booking Date</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase">Charges</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase">Bond</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase">Classification</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase">Housing</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {filteredInmates.map((inmate) => (
                  <tr key={inmate.id} className="hover:bg-slate-700/50 transition-colors">
                    <td className="px-4 py-4 text-sm">
                      <div className="text-amber-400 font-mono">{inmate.id}</div>
                      <div className="text-xs text-slate-500">{inmate.bookingNumber}</div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-white font-semibold">
                        {inmate.lastName}, {inmate.firstName} {inmate.middleName[0]}.
                        {inmate.suffix && ` ${inmate.suffix}`}
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-400">{inmate.race} {inmate.gender}</div>
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <div className="text-white">{inmate.dob}</div>
                      <div className="text-xs text-slate-600 dark:text-slate-400">Age: {inmate.age}</div>
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <div className="text-white">{inmate.bookingDate}</div>
                      <div className="text-xs text-slate-600 dark:text-slate-400">{inmate.bookingTime}</div>
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <div className="text-white">{inmate.charges[0].description}</div>
                      {inmate.charges.length > 1 && (
                        <div className="text-xs text-amber-400">+{inmate.charges.length - 1} more</div>
                      )}
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <div className={inmate.bond === 'No Bond' ? 'text-red-400 font-semibold' : 'text-emerald-400'}>
                        {inmate.bond}
                      </div>
                      {inmate.bondAmount && inmate.bondAmount > 0 && (
                        <div className="text-xs text-slate-600 dark:text-slate-400">${inmate.bondAmount.toLocaleString()}</div>
                      )}
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <div className={`font-semibold ${getClassificationColor(inmate.classification)}`}>
                        {inmate.classification}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <div className="text-white font-medium">{inmate.housing}</div>
                      <div className="text-xs text-slate-600 dark:text-slate-400">Cell {inmate.cell}</div>
                    </td>
                    <td className="px-4 py-4">
                      <button
                        onClick={() => {
                          setSelectedInmate(inmate);
                          setShowDetailModal(true);
                        }}
                        className="text-amber-400 hover:text-amber-300 text-sm font-medium flex items-center gap-1"
                      >
                        View
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detail Modal */}
        {showDetailModal && selectedInmate && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 border border-slate-700 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-slate-800 border-b border-slate-700 p-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {selectedInmate.lastName}, {selectedInmate.firstName} {selectedInmate.middleName}
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400">Inmate ID: {selectedInmate.id}</p>
                </div>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="text-slate-600 dark:text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                    <User className="w-5 h-5 text-amber-400" />
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4 bg-slate-900/50 border border-slate-700 rounded-lg p-4">
                    <div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">Date of Birth</div>
                      <div className="text-white font-medium">{selectedInmate.dob} (Age: {selectedInmate.age})</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">Race / Gender</div>
                      <div className="text-white font-medium">{selectedInmate.race} / {selectedInmate.gender}</div>
                    </div>
                  </div>
                </div>

                {/* Booking Information */}
                <div>
                  <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                    Booking Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4 bg-slate-900/50 border border-slate-700 rounded-lg p-4">
                    <div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">Booking Number</div>
                      <div className="text-amber-400 font-mono">{selectedInmate.bookingNumber}</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">Booking Date/Time</div>
                      <div className="text-white font-medium">{selectedInmate.bookingDate} {selectedInmate.bookingTime}</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">Arresting Agency</div>
                      <div className="text-white font-medium">{selectedInmate.arrestingAgency}</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">Status</div>
                      <div className="text-emerald-400 font-medium">{selectedInmate.status}</div>
                    </div>
                  </div>
                </div>

                {/* Charges */}
                <div>
                  <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-red-400" />
                    Charges
                  </h3>
                  <div className="space-y-3">
                    {selectedInmate.charges.map((charge, idx) => (
                      <div key={idx} className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="text-white font-semibold mb-1">{charge.description}</div>
                            <div className="text-sm text-slate-600 dark:text-slate-400">Statute: {charge.statute}</div>
                          </div>
                          <span className={`px-3 py-1 rounded text-sm font-medium ${
                            charge.degree === 'Felony' ? 'bg-red-500/20 text-red-400' :
                            charge.degree === 'Federal' ? 'bg-slate-700/40 text-slate-300' :
                            'bg-amber-500/20 text-amber-400'
                          }`}>
                            {charge.degree}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <div>
                            <span className="text-slate-600 dark:text-slate-400">Bond Type:</span>{' '}
                            <span className={charge.bond === 'No Bond' ? 'text-red-400 font-semibold' : 'text-emerald-400 font-semibold'}>
                              {charge.bond}
                            </span>
                          </div>
                          {charge.bondAmount && charge.bondAmount > 0 && (
                            <div>
                              <span className="text-slate-600 dark:text-slate-400">Amount:</span>{' '}
                              <span className="text-white font-semibold">${charge.bondAmount.toLocaleString()}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Housing & Classification */}
                <div>
                  <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                    Housing & Classification
                  </h3>
                  <div className="grid grid-cols-2 gap-4 bg-slate-900/50 border border-slate-700 rounded-lg p-4">
                    <div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">Classification</div>
                      <div className={`text-lg font-bold ${getClassificationColor(selectedInmate.classification)}`}>
                        {selectedInmate.classification}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">Housing Assignment</div>
                      <div className="text-white font-medium text-lg">{selectedInmate.housing} - Cell {selectedInmate.cell}</div>
                    </div>
                  </div>
                </div>

                {/* Court Information */}
                {selectedInmate.nextCourtDate && (
                  <div>
                    <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                      <Scale className="w-5 h-5 text-amber-400" />
                      Court Information
                    </h3>
                    <div className="grid grid-cols-2 gap-4 bg-slate-900/50 border border-slate-700 rounded-lg p-4">
                      <div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">Next Court Date</div>
                        <div className="text-white font-medium">{selectedInmate.nextCourtDate}</div>
                      </div>
                      <div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">Court Type</div>
                        <div className="text-white font-medium">{selectedInmate.courtType}</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Flags & Alerts */}
                {selectedInmate.flags.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-red-400" />
                      Flags & Alerts
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedInmate.flags.map((flag, idx) => (
                        <span key={idx} className="px-3 py-1 bg-red-500/20 border border-red-500/30 text-red-400 rounded text-sm font-medium">
                          {flag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default InmateManagement;
