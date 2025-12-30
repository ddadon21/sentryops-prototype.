import { useState } from 'react';
import {
  Search, Filter, Target, Sparkles, X, Plus, FileSearch, Users, Scale,
  FlaskConical, BarChart3, TrendingDown, TrendingUp, AlertCircle, Clock,
  CheckCircle, Link2, UserCircle, Calendar, ChevronRight,
  Activity, Shield, Phone, Mail, Eye, FileText, AlertTriangle
} from 'lucide-react';
import DashboardLayout from '../../layouts/DashboardLayout';

interface Case {
  id: string;
  caseNumber: string;
  type: 'Homicide' | 'Robbery' | 'Narcotics' | 'Burglary' | 'Assault' | 'Fraud' | 'Sexual Assault';
  title: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  status: 'Active Investigation' | 'Pending Warrant' | 'Awaiting Lab Results' | 'Court Pending' | 'Closed';
  leadDetective: string;
  badge: string;
  assignedTo: string[];
  openedDate: string;
  daysOpen: number;
  location: string;
  suspects: number;
  evidence: number;
  witnesses: number;
  nextAction: string;
  deadline?: string;
  multiAgency?: boolean;
  notes: string;
}

const ActiveCasesDashboard = () => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [aiInsightsVisible, setAiInsightsVisible] = useState(true);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showConnections, setShowConnections] = useState(false);
  const [showWorkload, setShowWorkload] = useState(false);
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);

  const cases: Case[] = [
    {
      id: 'INV-2024-0847',
      caseNumber: '2024-0847',
      type: 'Homicide',
      title: 'Shooting Death - Pleasant Hill Road',
      priority: 'Critical',
      status: 'Active Investigation',
      leadDetective: 'Det. Rodriguez, Maria',
      badge: 'I-5234',
      assignedTo: ['Det. Rodriguez', 'Det. Williams', 'Det. Chen'],
      openedDate: '2024-11-28',
      daysOpen: 7,
      location: '4200 Pleasant Hill Rd, Duluth',
      suspects: 2,
      evidence: 47,
      witnesses: 8,
      nextAction: 'Ballistics results expected 12/08',
      deadline: '2024-12-15',
      notes: 'Gang-related shooting. 2 suspects identified via surveillance. Witnesses cooperating. Ballistics analysis in progress at GBI lab.'
    },
    {
      id: 'INV-2024-0923',
      caseNumber: '2024-0923',
      type: 'Homicide',
      title: 'Cold Case Review - 2019 Unsolved',
      priority: 'Medium',
      status: 'Active Investigation',
      leadDetective: 'Det. Anderson, Kevin',
      badge: 'I-4892',
      assignedTo: ['Det. Anderson', 'Det. Taylor'],
      openedDate: '2024-10-15',
      daysOpen: 51,
      location: '2800 Lawrenceville Hwy, Lawrenceville',
      suspects: 1,
      evidence: 23,
      witnesses: 4,
      nextAction: 'DNA re-analysis with new technology',
      notes: 'Cold case reopened due to new DNA technology. Original evidence being re-tested. One person of interest identified.'
    },
    {
      id: 'INV-2024-1234',
      caseNumber: '2024-1234',
      type: 'Narcotics',
      title: 'DEA Task Force - Fentanyl Distribution Ring',
      priority: 'Critical',
      status: 'Active Investigation',
      leadDetective: 'Lt. Anderson, James',
      badge: 'I-3456',
      assignedTo: ['Lt. Anderson', 'Det. Martinez', 'Det. Johnson', 'DEA SA Wilson'],
      openedDate: '2024-09-12',
      daysOpen: 84,
      location: 'Multi-County Operation',
      suspects: 8,
      evidence: 156,
      witnesses: 12,
      nextAction: 'Surveillance extension requested - 30 days',
      deadline: '2024-12-20',
      multiAgency: true,
      notes: 'Multi-agency DEA task force. Identified major fentanyl distribution network. 30-day surveillance extension pending command approval. Estimated OT: $12K.'
    },
    {
      id: 'INV-2024-1456',
      caseNumber: '2024-1456',
      type: 'Narcotics',
      title: 'Methamphetamine Lab - Residential',
      priority: 'High',
      status: 'Pending Warrant',
      leadDetective: 'Det. Davis, Robert',
      badge: 'I-2987',
      assignedTo: ['Det. Davis', 'Det. Garcia'],
      openedDate: '2024-11-20',
      daysOpen: 15,
      location: '1500 Block Buford Dr, Buford',
      suspects: 3,
      evidence: 34,
      witnesses: 6,
      nextAction: 'Search warrant hearing 12/06',
      deadline: '2024-12-06',
      notes: 'Suspected meth lab in residential neighborhood. Search warrant drafted. Hearing scheduled for 12/06. HAZMAT on standby.'
    },
    {
      id: 'INV-2024-1567',
      caseNumber: '2024-1567',
      type: 'Robbery',
      title: 'Armed Robbery - Gas Station',
      priority: 'High',
      status: 'Active Investigation',
      leadDetective: 'Det. Wilson, Amanda',
      badge: 'I-4521',
      assignedTo: ['Det. Wilson', 'Det. Brown'],
      openedDate: '2024-12-01',
      daysOpen: 4,
      location: '3400 Lawrenceville Hwy, Tucker',
      suspects: 2,
      evidence: 12,
      witnesses: 3,
      nextAction: 'Surveillance review & suspect identification',
      notes: '2 armed suspects. $2,400 cash taken. Excellent video surveillance. Suspects wore masks but distinctive clothing visible.'
    },
    {
      id: 'INV-2024-1489',
      caseNumber: '2024-1489',
      type: 'Robbery',
      title: 'Pharmacy Robbery Series (3 incidents)',
      priority: 'Critical',
      status: 'Active Investigation',
      leadDetective: 'Det. Patel, Rajesh',
      badge: 'I-3729',
      assignedTo: ['Det. Patel', 'Det. Thompson', 'Det. Clark'],
      openedDate: '2024-11-15',
      daysOpen: 20,
      location: 'Multiple Locations',
      suspects: 2,
      evidence: 28,
      witnesses: 9,
      nextAction: 'Pattern analysis & surveillance of target pharmacies',
      deadline: '2024-12-10',
      notes: '3 pharmacy robberies - same MO. Targeting opioid pain medications. Suspects believed to be same 2 individuals. Surveillance on potential targets.'
    },
    {
      id: 'INV-2024-1678',
      caseNumber: '2024-1678',
      type: 'Sexual Assault',
      title: 'Aggravated Sexual Battery',
      priority: 'Critical',
      status: 'Awaiting Lab Results',
      leadDetective: 'Det. Taylor, Sarah',
      badge: 'I-4167',
      assignedTo: ['Det. Taylor (SVU)', 'Det. Lee (SVU)'],
      openedDate: '2024-11-25',
      daysOpen: 10,
      location: '2100 Block Pleasant Hill Rd, Duluth',
      suspects: 1,
      evidence: 19,
      witnesses: 4,
      nextAction: 'DNA results expected 12/12',
      deadline: '2024-12-12',
      notes: 'Sexual assault case. Suspect known to victim. SANE exam completed. DNA submitted to GBI lab. Warrant ready pending lab confirmation.'
    },
    {
      id: 'INV-2024-1712',
      caseNumber: '2024-1712',
      type: 'Burglary',
      title: 'Commercial Burglary - Electronics Store',
      priority: 'Medium',
      status: 'Active Investigation',
      leadDetective: 'Det. Johnson, Marcus',
      badge: 'I-2845',
      assignedTo: ['Det. Johnson', 'Det. Nguyen'],
      openedDate: '2024-11-30',
      daysOpen: 5,
      location: '5600 Peachtree Pkwy, Norcross',
      suspects: 4,
      evidence: 15,
      witnesses: 2,
      nextAction: 'Pawn shop monitoring for stolen items',
      notes: '$45K in electronics stolen. Cut through roof access. Sophisticated operation. Monitoring pawn shops and online marketplaces.'
    },
    {
      id: 'INV-2024-1823',
      caseNumber: '2024-1823',
      type: 'Fraud',
      title: 'Identity Theft Ring - 47 Victims',
      priority: 'High',
      status: 'Active Investigation',
      leadDetective: 'Det. Chen, Wei',
      badge: 'I-3892',
      assignedTo: ['Det. Chen', 'Det. Garcia', 'FBI SA Martinez'],
      openedDate: '2024-10-22',
      daysOpen: 44,
      location: 'Countywide',
      suspects: 5,
      evidence: 89,
      witnesses: 47,
      nextAction: 'Federal charges being prepared',
      multiAgency: true,
      notes: 'Large-scale identity theft operation. 47 victims identified. $380K in fraudulent charges. Working with FBI. Federal charges pending.'
    },
    {
      id: 'INV-2024-1934',
      caseNumber: '2024-1934',
      type: 'Assault',
      title: 'Aggravated Assault - Domestic Violence',
      priority: 'High',
      status: 'Pending Warrant',
      leadDetective: 'Det. Martinez, Carlos',
      badge: 'I-4678',
      assignedTo: ['Det. Martinez'],
      openedDate: '2024-12-03',
      daysOpen: 2,
      location: '1200 Block Harbins Rd, Dacula',
      suspects: 1,
      evidence: 8,
      witnesses: 3,
      nextAction: 'Warrant execution planned 12/06',
      deadline: '2024-12-06',
      notes: 'Domestic violence - severe injuries. Victim hospitalized. Suspect fled scene. Warrant approved. Execution planned for 12/06 AM.'
    }
  ];

  const filteredCases = cases.filter(c => {
    const matchesType = selectedType === 'all' || c.type === selectedType;
    const matchesPriority = selectedPriority === 'all' || c.priority === selectedPriority;
    const matchesSearch =
      c.caseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.leadDetective.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesPriority && matchesSearch;
  });

  const stats = {
    total: cases.length,
    critical: cases.filter(c => c.priority === 'Critical').length,
    homicide: cases.filter(c => c.type === 'Homicide').length,
    robbery: cases.filter(c => c.type === 'Robbery').length,
    narcotics: cases.filter(c => c.type === 'Narcotics').length,
    multiAgency: cases.filter(c => c.multiAgency).length
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'High': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'Medium': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'Low': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Homicide': return 'text-red-400';
      case 'Sexual Assault': return 'text-purple-400';
      case 'Robbery': return 'text-orange-400';
      case 'Narcotics': return 'text-purple-400';
      case 'Assault': return 'text-amber-400';
      case 'Burglary': return 'text-blue-400';
      case 'Fraud': return 'text-emerald-400';
      default: return 'text-slate-400';
    }
  };

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Target className="w-8 h-8 text-amber-500" />
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-white">Criminal Investigations</h1>
              <p className="text-slate-400">Active Criminal Investigations Dashboard</p>
            </div>
          </div>
        </div>

        {/* AI Insights Banner */}
        {aiInsightsVisible && (
          <div className="mb-6 bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 rounded-xl p-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-purple-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-base font-semibold text-white">AI Insights - Criminal Investigations</h4>
                  <button
                    onClick={() => setAiInsightsVisible(false)}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Critical Section */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-xs font-bold text-red-400 uppercase">Critical</span>
                    </div>
                    <ul className="space-y-2 text-sm text-slate-300">
                      <li className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                        <span>Homicide case (Pleasant Hill Rd) - ballistics results <span className="text-red-400 font-semibold">OVERDUE</span></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Clock className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                        <span>DEA Task Force - surveillance extension needs approval <span className="text-red-400 font-semibold">TODAY</span></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Calendar className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                        <span>Sexual Assault case - DNA results expected tomorrow, prepare warrant</span>
                      </li>
                    </ul>
                  </div>

                  {/* Monitoring Section */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                      <span className="text-xs font-bold text-amber-400 uppercase">Monitoring</span>
                    </div>
                    <ul className="space-y-2 text-sm text-slate-300">
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                        <span>4 cases with deadlines in next 48 hours</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <FileSearch className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                        <span>Cold Case #2024-0923 - New DNA tech identified person of interest</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Link2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                        <span>Pharmacy Robbery Series - Pattern detected (3 incidents, same suspects)</span>
                      </li>
                    </ul>
                  </div>

                  {/* Trends & Patterns Section */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-xs font-bold text-emerald-400 uppercase">Trends & Patterns</span>
                    </div>
                    <ul className="space-y-2 text-sm text-slate-300">
                      <li className="flex items-start gap-2">
                        <TrendingUp className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                        <span>Armed robberies up 15% this month - recommend task force</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Shield className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                        <span>Gang shootings: 2 cases linked (same territory)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Users className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                        <span>Identity theft: 47 victims - working with FBI</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="flex gap-3 mt-4">
                  <button className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 text-purple-300 rounded-lg text-sm font-medium transition-colors">
                    View Recommendations
                  </button>
                  <button
                    onClick={() => setShowConnections(!showConnections)}
                    className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 text-purple-300 rounded-lg text-sm font-medium transition-colors"
                  >
                    Case Connections
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions Bar */}
        <div className="mb-6 grid grid-cols-2 md:grid-cols-6 gap-3">
          <button className="flex items-center justify-center gap-2 px-4 py-3 bg-amber-500 hover:bg-amber-600 text-slate-900 font-medium rounded-lg transition-colors">
            <Plus className="w-4 h-4" />
            <span className="text-sm">New Case</span>
          </button>
          <button className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-medium rounded-lg transition-colors">
            <FileSearch className="w-4 h-4" />
            <span className="text-sm">Search NCIC</span>
          </button>
          <button className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-medium rounded-lg transition-colors">
            <Users className="w-4 h-4" />
            <span className="text-sm">Task Force</span>
          </button>
          <button className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-medium rounded-lg transition-colors">
            <Scale className="w-4 h-4" />
            <span className="text-sm">Warrant</span>
          </button>
          <button className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-medium rounded-lg transition-colors">
            <FlaskConical className="w-4 h-4" />
            <span className="text-sm">Lab Request</span>
          </button>
          <button
            onClick={() => setShowAnalytics(!showAnalytics)}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-medium rounded-lg transition-colors"
          >
            <BarChart3 className="w-4 h-4" />
            <span className="text-sm">Analytics</span>
          </button>
        </div>

        {/* Enhanced Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Total Active Cases - Enhanced */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-sm text-slate-400 mb-1">Total Active Cases</div>
                <div className="text-3xl font-bold text-white">{stats.total}</div>
              </div>
              <div className="flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-emerald-400" />
                <span className="text-emerald-400 font-semibold">-2 from last month</span>
              </div>
            </div>
            <div className="space-y-2 mb-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Homicide:</span>
                <span className="text-red-400 font-medium">{stats.homicide} (1 critical, 1 medium)</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Narcotics:</span>
                <span className="text-purple-400 font-medium">{stats.narcotics} (1 critical, 1 high)</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Robbery:</span>
                <span className="text-orange-400 font-medium">{stats.robbery} (both high)</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Sexual Assault:</span>
                <span className="text-purple-400 font-medium">1 (critical)</span>
              </div>
            </div>
            <div className="pt-3 border-t border-slate-700">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-400">Avg per detective:</span>
                <span className="text-white font-medium">1.4 cases</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Available capacity:</span>
                <span className="text-emerald-400 font-medium">3 detectives under target</span>
              </div>
            </div>
          </div>

          {/* Critical Cases - Enhanced */}
          <div className="bg-slate-800 border border-red-500/30 rounded-lg p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-sm text-slate-400 mb-1">Critical Cases</div>
                <div className="text-3xl font-bold text-red-400">{stats.critical}</div>
              </div>
              <AlertCircle className="w-8 h-8 text-red-400" />
            </div>
            <div className="space-y-2 mb-3">
              <div className="flex items-start gap-2 text-sm">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-1.5"></div>
                <span className="text-slate-300">Homicide - Ballistics due <span className="text-red-400 font-semibold">TODAY</span></span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-1.5"></div>
                <span className="text-slate-300">Narcotics - Warrant hearing in 4 days</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-1.5"></div>
                <span className="text-slate-300">Sexual Assault - DNA results tomorrow</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-1.5"></div>
                <span className="text-slate-300">DEA Task Force - Approval needed EOD</span>
              </div>
            </div>
            <div className="pt-3 border-t border-slate-700">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-400">Avg days open:</span>
                <span className="text-emerald-400 font-medium">9.5 days (target &lt;15)</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Clearance rate:</span>
                <span className="text-emerald-400 font-medium">75% (3 of 4 closed this month)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <div className="text-sm text-slate-400 mb-1">Homicide</div>
            <div className="text-2xl font-bold text-red-400">{stats.homicide}</div>
            <div className="text-xs text-emerald-400 mt-1">100% clearance rate</div>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <div className="text-sm text-slate-400 mb-1">Robbery</div>
            <div className="text-2xl font-bold text-orange-400">{stats.robbery}</div>
            <div className="text-xs text-emerald-400 mt-1">75% clearance rate</div>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <div className="text-sm text-slate-400 mb-1">Narcotics</div>
            <div className="text-2xl font-bold text-purple-400">{stats.narcotics}</div>
            <div className="text-xs text-slate-400 mt-1">Avg 38 days to close</div>
          </div>
          <div className="bg-slate-800 border border-purple-500/30 rounded-lg p-4">
            <div className="text-sm text-slate-400 mb-1">Multi-Agency</div>
            <div className="text-2xl font-bold text-purple-400">{stats.multiAgency}</div>
            <div className="text-xs text-purple-400 mt-1">FBI & DEA collaboration</div>
          </div>
        </div>

        {/* Case Analytics Dashboard - Collapsible */}
        {showAnalytics && (
          <div className="mb-6 bg-slate-800 border border-slate-700 rounded-lg p-5">
            <div className="flex items-center gap-3 mb-4">
              <BarChart3 className="w-6 h-6 text-purple-400" />
              <h3 className="text-lg font-bold text-white">Case Analytics Dashboard</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Clearance Rates */}
              <div>
                <h4 className="text-sm font-bold text-slate-300 mb-3">Clearance Rates (This Year)</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Overall:</span>
                    <span className="text-emerald-400 font-semibold">68% (23 of 34 cases)</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Homicide:</span>
                    <span className="text-emerald-400 font-semibold">100% (4 of 4)</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Robbery:</span>
                    <span className="text-emerald-400 font-semibold">75% (6 of 8)</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Sexual Assault:</span>
                    <span className="text-amber-400 font-semibold">60% (3 of 5)</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Fraud:</span>
                    <span className="text-amber-400 font-semibold">55% (11 of 20)</span>
                  </div>
                </div>
              </div>

              {/* Avg Time to Clearance */}
              <div>
                <h4 className="text-sm font-bold text-slate-300 mb-3">Avg Time to Clearance</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Homicide:</span>
                    <span className="text-white font-medium">45 days</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Robbery:</span>
                    <span className="text-white font-medium">22 days</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Narcotics:</span>
                    <span className="text-white font-medium">38 days</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Sexual Assault:</span>
                    <span className="text-white font-medium">67 days (complex)</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Fraud:</span>
                    <span className="text-white font-medium">52 days</span>
                  </div>
                </div>
              </div>

              {/* Evidence Processing */}
              <div>
                <h4 className="text-sm font-bold text-slate-300 mb-3">Evidence Processing</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Pending lab results:</span>
                    <span className="text-amber-400 font-semibold">6 cases</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Avg lab turnaround:</span>
                    <span className="text-red-400 font-semibold">18 days (target: 14)</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Ballistics backlog:</span>
                    <span className="text-amber-400 font-semibold">2 cases</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">DNA backlog:</span>
                    <span className="text-emerald-400 font-semibold">0 cases</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Fingerprint match rate:</span>
                    <span className="text-emerald-400 font-semibold">42%</span>
                  </div>
                </div>
              </div>
            </div>

            <button className="mt-4 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white font-medium rounded-lg transition-colors text-sm">
              Download Full Report
            </button>
          </div>
        )}

        {/* Case Connections - Collapsible */}
        {showConnections && (
          <div className="mb-6 bg-slate-800 border border-slate-700 rounded-lg p-5">
            <div className="flex items-center gap-3 mb-4">
              <Link2 className="w-6 h-6 text-purple-400" />
              <h3 className="text-lg font-bold text-white">Connected Cases & Patterns</h3>
            </div>

            <div className="space-y-4">
              {/* Pharmacy Robbery Series */}
              <div className="bg-slate-900/50 border border-amber-500/30 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-base font-bold text-amber-400 mb-1">Pharmacy Robbery Series</h4>
                    <p className="text-sm text-slate-400">Case #2024-1489 (20 days open)</p>
                  </div>
                  <span className="px-2 py-1 bg-amber-500/20 text-amber-400 rounded text-xs font-bold">
                    SERIES
                  </span>
                </div>
                <div className="space-y-2 text-sm text-slate-300 mb-3">
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-1.5"></div>
                    <span>3 incidents, same MO</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-1.5"></div>
                    <span>Suspects: Believed to be same 2 individuals</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-1.5"></div>
                    <span>Pattern: Targeting opioid pain medications</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-1.5"></div>
                    <span>Surveillance: Potential targets identified</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-900 font-medium rounded text-xs transition-colors">
                    View Series Details
                  </button>
                  <button className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded text-xs transition-colors">
                    Request Task Force
                  </button>
                </div>
              </div>

              {/* Gang-Related Shootings */}
              <div className="bg-slate-900/50 border border-red-500/30 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-base font-bold text-red-400 mb-1">Gang-Related Shootings</h4>
                    <p className="text-sm text-slate-400">Multiple cases linked</p>
                  </div>
                  <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs font-bold">
                    GANG ACTIVITY
                  </span>
                </div>
                <div className="space-y-2 text-sm text-slate-300 mb-3">
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5"></div>
                    <span>Case #2024-0847 (Homicide - Pleasant Hill Rd)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5"></div>
                    <span>Case #2024-0756 (Aggravated Assault - same gang)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5"></div>
                    <span>Pattern: Territory dispute, escalating violence</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5"></div>
                    <span>Intelligence: Gang unit consulted</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white font-medium rounded text-xs transition-colors">
                    View Gang Intelligence
                  </button>
                  <button className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded text-xs transition-colors">
                    Coordinate with Gang Unit
                  </button>
                </div>
              </div>

              {/* Identity Theft Ring */}
              <div className="bg-slate-900/50 border border-purple-500/30 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-base font-bold text-purple-400 mb-1">Identity Theft Ring</h4>
                    <p className="text-sm text-slate-400">Case #2024-1823 (47 victims)</p>
                  </div>
                  <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs font-bold">
                    MULTI-AGENCY
                  </span>
                </div>
                <div className="space-y-2 text-sm text-slate-300 mb-3">
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-1.5"></div>
                    <span>Large-scale operation</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-1.5"></div>
                    <span>Working with FBI</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-1.5"></div>
                    <span>Federal charges being prepared</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-1.5"></div>
                    <span>$380K in fraudulent charges</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 bg-purple-500 hover:bg-purple-600 text-white font-medium rounded text-xs transition-colors">
                    View Federal Case File
                  </button>
                  <button className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded text-xs transition-colors">
                    Contact FBI Liaison
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Detective Workload View - Collapsible */}
        <div className="mb-6 bg-slate-800 border border-slate-700 rounded-lg p-5">
          <button
            onClick={() => setShowWorkload(!showWorkload)}
            className="w-full flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <UserCircle className="w-5 h-5 text-blue-400" />
              <h3 className="text-lg font-bold text-white">Detective Workload</h3>
            </div>
            <ChevronRight className={`w-5 h-5 text-slate-400 transition-transform ${showWorkload ? 'rotate-90' : ''}`} />
          </button>

          {showWorkload && (
            <div className="mt-4 space-y-3">
              {/* Det. Rodriguez */}
              <div className="bg-slate-900/50 border border-red-500/30 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-base font-bold text-white">Det. Rodriguez, Maria</h4>
                    <p className="text-sm text-slate-400">Badge: I-5234</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-slate-400">Active Cases</div>
                    <div className="text-2xl font-bold text-red-400">3</div>
                    <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs font-bold">AT CAPACITY</span>
                  </div>
                </div>
                <div className="space-y-1 mb-3 text-sm">
                  <div className="flex items-center gap-2 text-slate-300">
                    <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                    Case #2024-0847 - Homicide (Critical) - 7 days
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <div className="w-1.5 h-1.5 bg-orange-400 rounded-full"></div>
                    Case #2024-1567 - Robbery (High) - 4 days
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <div className="w-1.5 h-1.5 bg-amber-400 rounded-full"></div>
                    Case #2024-1712 - Burglary (Medium) - 5 days
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-400">Clearance Rate:</span>
                    <span className="text-emerald-400 font-semibold ml-2">85%</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Avg Time to Close:</span>
                    <span className="text-white font-medium ml-2">28 days</span>
                  </div>
                </div>
                <p className="text-xs text-red-400 mt-2">Recommendation: Do not assign new cases</p>
              </div>

              {/* Det. Anderson */}
              <div className="bg-slate-900/50 border border-amber-500/30 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-base font-bold text-white">Det. Anderson, Kevin/Lt. James</h4>
                    <p className="text-sm text-slate-400">Badge: I-4892 / I-3456</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-slate-400">Active Cases</div>
                    <div className="text-2xl font-bold text-amber-400">2</div>
                    <span className="px-2 py-1 bg-amber-500/20 text-amber-400 rounded text-xs font-bold">MODERATE</span>
                  </div>
                </div>
                <div className="space-y-1 mb-3 text-sm">
                  <div className="flex items-center gap-2 text-slate-300">
                    <div className="w-1.5 h-1.5 bg-amber-400 rounded-full"></div>
                    Case #2024-0923 - Cold Case Homicide (Medium) - 51 days
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                    Case #2024-1234 - DEA Task Force (Critical) - 84 days
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-400">Clearance Rate:</span>
                    <span className="text-emerald-400 font-semibold ml-2">72%</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Specialist:</span>
                    <span className="text-purple-400 font-medium ml-2">Cold cases, multi-agency</span>
                  </div>
                </div>
                <p className="text-xs text-amber-400 mt-2">Can take 1 more case if needed</p>
              </div>

              {/* Det. Wilson */}
              <div className="bg-slate-900/50 border border-emerald-500/30 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-base font-bold text-white">Det. Wilson, Amanda</h4>
                    <p className="text-sm text-slate-400">Badge: I-4521</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-slate-400">Active Cases</div>
                    <div className="text-2xl font-bold text-emerald-400">1</div>
                    <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded text-xs font-bold">AVAILABLE</span>
                  </div>
                </div>
                <div className="space-y-1 mb-3 text-sm">
                  <div className="flex items-center gap-2 text-slate-300">
                    <div className="w-1.5 h-1.5 bg-orange-400 rounded-full"></div>
                    Case #2024-1567 - Armed Robbery (High) - 4 days
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-400">Clearance Rate:</span>
                    <span className="text-emerald-400 font-semibold ml-2">80%</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Specialist:</span>
                    <span className="text-blue-400 font-medium ml-2">Violent crimes</span>
                  </div>
                </div>
                <button className="mt-2 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-slate-900 font-medium rounded text-xs transition-colors">
                  Assign New Case to Det. Wilson
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Filters */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by case number, title, or detective..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Filter className="w-5 h-5 text-slate-400" />
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
            >
              <option value="all">All Types</option>
              <option value="Homicide">Homicide</option>
              <option value="Sexual Assault">Sexual Assault</option>
              <option value="Robbery">Robbery</option>
              <option value="Narcotics">Narcotics</option>
              <option value="Assault">Assault</option>
              <option value="Burglary">Burglary</option>
              <option value="Fraud">Fraud</option>
            </select>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
            >
              <option value="all">All Priorities</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>

        {/* Cases List - Enhanced */}
        <div className="space-y-4">
          {filteredCases.map((c) => (
            <div
              key={c.id}
              className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition-colors cursor-pointer"
              onClick={() => setSelectedCase(c)}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-3 py-1 rounded text-sm font-bold border ${getPriorityColor(c.priority)}`}>
                      {c.priority.toUpperCase()}
                    </span>
                    <span className={`font-bold ${getTypeColor(c.type)}`}>{c.type.toUpperCase()}</span>
                    {c.multiAgency && (
                      <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs font-bold">
                        MULTI-AGENCY
                      </span>
                    )}
                    {c.deadline && new Date(c.deadline) < new Date(Date.now() + 86400000) && (
                      <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs font-bold flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        DEADLINE SOON
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{c.title}</h3>
                  <p className="text-sm text-slate-400">Case #{c.caseNumber}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-slate-400">Days Open</div>
                  <div className={`text-2xl font-bold ${c.daysOpen > 60 ? 'text-red-400' : c.daysOpen > 30 ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {c.daysOpen}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="bg-slate-900/50 border border-slate-700 rounded p-3">
                  <div className="text-xs text-slate-400 mb-1">Lead Detective</div>
                  <div className="text-white font-medium text-sm">{c.leadDetective}</div>
                  <div className="text-xs text-slate-500">Badge: {c.badge}</div>
                </div>
                <div className="bg-slate-900/50 border border-slate-700 rounded p-3">
                  <div className="text-xs text-slate-400 mb-1">Status</div>
                  <div className="text-white font-medium text-sm">{c.status}</div>
                  <div className="text-xs text-slate-500">Opened: {c.openedDate}</div>
                </div>
                <div className="bg-slate-900/50 border border-slate-700 rounded p-3">
                  <div className="text-xs text-slate-400 mb-1">Evidence/Witnesses</div>
                  <div className="text-white font-medium">{c.evidence} items / {c.witnesses} witnesses</div>
                  <div className="text-xs text-slate-500">Suspects: {c.suspects}</div>
                </div>
                <div className="bg-slate-900/50 border border-slate-700 rounded p-3">
                  <div className="text-xs text-slate-400 mb-1">Next Action</div>
                  <div className="text-amber-400 font-medium text-sm">{c.nextAction}</div>
                  {c.deadline && (
                    <div className="text-xs text-red-400">Due: {c.deadline}</div>
                  )}
                </div>
              </div>

              {/* Progress Indicators */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="bg-slate-900/50 border border-slate-700 rounded p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-slate-400">Evidence Collection</span>
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-sm text-emerald-400 font-semibold">100% Complete</div>
                </div>
                <div className="bg-slate-900/50 border border-slate-700 rounded p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-slate-400">Witness Interviews</span>
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-sm text-emerald-400 font-semibold">{c.witnesses}/{c.witnesses} Complete</div>
                </div>
                <div className="bg-slate-900/50 border border-slate-700 rounded p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-slate-400">Lab Analysis</span>
                    {c.status === 'Awaiting Lab Results' ? (
                      <Clock className="w-4 h-4 text-amber-400" />
                    ) : (
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                    )}
                  </div>
                  <div className={`text-sm font-semibold ${c.status === 'Awaiting Lab Results' ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {c.status === 'Awaiting Lab Results' ? 'Pending' : 'Complete'}
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 mb-4">
                <p className="text-sm text-slate-300">{c.notes}</p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                <div className="text-sm text-slate-400">
                  Assigned: {c.assignedTo.join(', ')}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCase(c);
                  }}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-900 font-medium rounded-lg transition-colors text-sm flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  View Full Case File
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Case Detail Modal */}
        {selectedCase && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
            <div className="relative bg-slate-900 border border-slate-700/50 rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setSelectedCase(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`px-3 py-1 rounded text-sm font-bold border ${getPriorityColor(selectedCase.priority)}`}>
                    {selectedCase.priority.toUpperCase()}
                  </span>
                  <span className={`font-bold ${getTypeColor(selectedCase.type)}`}>{selectedCase.type.toUpperCase()}</span>
                  {selectedCase.multiAgency && (
                    <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs font-bold">
                      MULTI-AGENCY
                    </span>
                  )}
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">{selectedCase.title}</h2>
                <p className="text-slate-400">Case #{selectedCase.caseNumber} • {selectedCase.daysOpen} days open</p>
              </div>

              {/* Lead Detective */}
              <div className="mb-6 bg-slate-800 border border-slate-700 rounded-lg p-4">
                <h3 className="text-sm font-bold text-slate-300 mb-3">Lead Detective</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-white font-bold">{selectedCase.leadDetective}</div>
                    <div className="text-sm text-slate-400">Badge: {selectedCase.badge}</div>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white rounded text-xs transition-colors">
                      <Phone className="w-3 h-3" />
                      Call
                    </button>
                    <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white rounded text-xs transition-colors">
                      <Mail className="w-3 h-3" />
                      Email
                    </button>
                  </div>
                </div>
              </div>

              {/* Status & Evidence */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
                  <h3 className="text-sm font-bold text-slate-300 mb-3">Status</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Current Status:</span>
                      <span className="text-white font-medium">{selectedCase.status}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Opened:</span>
                      <span className="text-white font-medium">{selectedCase.openedDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Last Update:</span>
                      <span className="text-white font-medium">2 hours ago</span>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
                  <h3 className="text-sm font-bold text-slate-300 mb-3">Evidence & Witnesses</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Evidence Items:</span>
                      <span className="text-white font-medium">{selectedCase.evidence} collected</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Witnesses:</span>
                      <span className="text-white font-medium">{selectedCase.witnesses} interviewed</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Suspects:</span>
                      <span className="text-white font-medium">{selectedCase.suspects} identified</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Case Timeline */}
              <div className="mb-6 bg-slate-800 border border-slate-700 rounded-lg p-4">
                <h3 className="text-sm font-bold text-slate-300 mb-4">Case Timeline</h3>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      <div className="w-px h-full bg-slate-600 mt-1"></div>
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="text-sm text-white font-medium">Case Opened</div>
                      <div className="text-xs text-slate-400">{selectedCase.openedDate}</div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      <div className="w-px h-full bg-slate-600 mt-1"></div>
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="text-sm text-white font-medium">Scene Processed & Evidence Collected</div>
                      <div className="text-xs text-slate-400">{selectedCase.evidence} items logged</div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      <div className="w-px h-full bg-slate-600 mt-1"></div>
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="text-sm text-white font-medium">Witnesses Interviewed</div>
                      <div className="text-xs text-slate-400">{selectedCase.witnesses} statements obtained</div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                      {selectedCase.status === 'Awaiting Lab Results' ? (
                        <Clock className="w-4 h-4 text-amber-400" />
                      ) : (
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-white font-medium">Next Action: {selectedCase.nextAction}</div>
                      {selectedCase.deadline && (
                        <div className="text-xs text-red-400">Deadline: {selectedCase.deadline}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Assigned Team */}
              <div className="mb-6 bg-slate-800 border border-slate-700 rounded-lg p-4">
                <h3 className="text-sm font-bold text-slate-300 mb-3">Assigned Team</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCase.assignedTo.map((person, idx) => (
                    <span key={idx} className="px-3 py-1.5 bg-slate-700 text-slate-200 rounded-lg text-sm">
                      {person}
                    </span>
                  ))}
                </div>
              </div>

              {/* Case Notes */}
              <div className="mb-6 bg-slate-800 border border-slate-700 rounded-lg p-4">
                <h3 className="text-sm font-bold text-slate-300 mb-3">Case Summary</h3>
                <p className="text-sm text-slate-300">{selectedCase.notes}</p>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                <button className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-900 font-medium rounded-lg transition-colors text-sm flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Update Status
                </button>
                <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg transition-colors text-sm flex items-center gap-2">
                  <Scale className="w-4 h-4" />
                  Request Warrant
                </button>
                <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg transition-colors text-sm flex items-center gap-2">
                  <FlaskConical className="w-4 h-4" />
                  Lab Request
                </button>
                <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg transition-colors text-sm flex items-center gap-2">
                  <Link2 className="w-4 h-4" />
                  Link Cases
                </button>
                <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg transition-colors text-sm flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  Case Notes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ActiveCasesDashboard;
