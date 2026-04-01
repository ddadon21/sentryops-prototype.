import React, { useState } from 'react';
import { FileText, TrendingUp, AlertCircle, AlertTriangle, MessageCircle, DollarSign, CheckCircle, Sparkles, X, Send, Download, ArrowUpRight, ArrowDownRight, TrendingDown, Calendar, Filter, Eye, PieChart, BarChart3, LineChart, Package, Truck, Wrench, ChevronDown, ChevronUp, Info, ArrowUpCircle, RefreshCw, FileSpreadsheet, Mail, Zap, Clock, Users, Building2, Target, Wallet, CircleDollarSign, Receipt, CreditCard, CalendarClock, Bot, CircleAlert, Lightbulb, Percent, ArrowDown, ArrowUp, Briefcase, ShieldAlert, BadgeCheck, BadgeAlert, Activity, Banknote, PiggyBank, Calculator, FileBarChart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import DashboardLayout from '../layouts/DashboardLayout';

export default function BudgetResources() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview'); // overview, divisions, resources, forecast
  const [chatOpen, setChatOpen] = useState(false);
  const [selectedDivision, setSelectedDivision] = useState(null);
  const [timeRange, setTimeRange] = useState('ytd'); // ytd, q4, monthly
  const [expandedCategories, setExpandedCategories] = useState(new Set());
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [monthDetailModal, setMonthDetailModal] = useState(null);
  const [reallocationModal, setReallocationModal] = useState(false);
  const [exportModal, setExportModal] = useState(false);
  const [varianceReportOpen, setVarianceReportOpen] = useState(false);
  const [aiInsightsExpanded, setAiInsightsExpanded] = useState(true);

  // Budget data
  const fiscalYear = {
    year: 'FY 2024',
    totalBudget: 48500000,
    spent: 41225000,
    committed: 3800000,
    available: 3475000,
    percentSpent: 85,
    percentCommitted: 7.8,
    variance: -250000, // negative = over budget
    projectedYearEnd: 48750000
  };

  const divisionBudgets = [
    {
      id: 1,
      name: 'Patrol Division',
      budget: 15200000,
      spent: 12900000,
      committed: 1200000,
      available: 1100000,
      percentSpent: 84.9,
      variance: -150000,
      categories: [
        { name: 'Personnel', budget: 11500000, spent: 9800000, percent: 85.2 },
        { name: 'Vehicles', budget: 2100000, spent: 1800000, percent: 85.7 },
        { name: 'Equipment', budget: 980000, spent: 820000, percent: 83.7 },
        { name: 'Training', budget: 420000, spent: 310000, percent: 73.8 },
        { name: 'Operations', budget: 200000, spent: 170000, percent: 85.0 }
      ]
    },
    {
      id: 2,
      name: 'Detention Division',
      budget: 18500000,
      spent: 15800000,
      committed: 1400000,
      available: 1300000,
      percentSpent: 85.4,
      variance: 100000,
      categories: [
        { name: 'Personnel', budget: 14200000, spent: 12100000, percent: 85.2 },
        { name: 'Inmate Services', budget: 2800000, spent: 2400000, percent: 85.7 },
        { name: 'Facility Maintenance', budget: 980000, spent: 850000, percent: 86.7 },
        { name: 'Medical', budget: 420000, spent: 360000, percent: 85.7 },
        { name: 'Food Services', budget: 100000, spent: 90000, percent: 90.0 }
      ]
    },
    {
      id: 3,
      name: 'Investigations',
      budget: 5200000,
      spent: 4450000,
      committed: 450000,
      available: 300000,
      percentSpent: 85.6,
      variance: -50000,
      categories: [
        { name: 'Personnel', budget: 4100000, spent: 3500000, percent: 85.4 },
        { name: 'Forensics', budget: 680000, spent: 580000, percent: 85.3 },
        { name: 'Equipment', budget: 280000, spent: 240000, percent: 85.7 },
        { name: 'Training', budget: 140000, spent: 130000, percent: 92.9 }
      ]
    },
    {
      id: 4,
      name: 'Administrative Services',
      budget: 4100000,
      spent: 3480000,
      committed: 380000,
      available: 240000,
      percentSpent: 84.9,
      variance: 50000,
      categories: [
        { name: 'Personnel', budget: 2800000, spent: 2380000, percent: 85.0 },
        { name: 'IT Infrastructure', budget: 680000, spent: 580000, percent: 85.3 },
        { name: 'Facilities', budget: 420000, spent: 360000, percent: 85.7 },
        { name: 'Office Supplies', budget: 200000, spent: 160000, percent: 80.0 }
      ]
    },
    {
      id: 5,
      name: 'Training Division',
      budget: 2600000,
      spent: 2100000,
      committed: 280000,
      available: 220000,
      percentSpent: 80.8,
      variance: 150000,
      categories: [
        { name: 'Personnel', budget: 1200000, spent: 980000, percent: 81.7 },
        { name: 'Programs', budget: 850000, spent: 680000, percent: 80.0 },
        { name: 'Certifications', budget: 380000, spent: 310000, percent: 81.6 },
        { name: 'Equipment', budget: 170000, spent: 130000, percent: 76.5 }
      ]
    },
    {
      id: 6,
      name: 'Support Services',
      budget: 2900000,
      spent: 2495000,
      committed: 90000,
      available: 315000,
      percentSpent: 86.0,
      variance: -100000,
      categories: [
        { name: 'Fleet Maintenance', budget: 1400000, spent: 1200000, percent: 85.7 },
        { name: 'Communications', budget: 780000, spent: 670000, percent: 85.9 },
        { name: 'Records Management', budget: 520000, spent: 445000, percent: 85.6 },
        { name: 'Property & Evidence', budget: 200000, spent: 180000, percent: 90.0 }
      ]
    }
  ];

  const resources = {
    vehicles: {
      total: 245,
      patrol: 128,
      investigation: 42,
      administration: 35,
      support: 40,
      maintenance: 18,
      replacement: 25
    },
    facilities: {
      main: 'Gwinnett Justice & Admin Center',
      detention: 'Gwinnett County Detention Center',
      substations: 4,
      trainingFacility: 1,
      totalSqFt: 485000
    },
    equipment: {
      bodyArmor: { total: 520, needsReplacement: 45 },
      firearms: { total: 680, needsReplacement: 28 },
      radios: { total: 550, needsReplacement: 62 },
      computers: { total: 420, needsReplacement: 85 },
      bodyCameras: { total: 380, needsReplacement: 0 }
    }
  };

  const monthlyTrend = [
    { month: 'Jan', spent: 3800000, budget: 4040000, personnel: 3000000, operations: 520000, training: 150000, equipment: 130000 },
    { month: 'Feb', spent: 3750000, budget: 4040000, personnel: 2950000, operations: 510000, training: 140000, equipment: 150000 },
    { month: 'Mar', spent: 3900000, budget: 4040000, personnel: 3050000, operations: 530000, training: 180000, equipment: 140000 },
    { month: 'Apr', spent: 3850000, budget: 4040000, personnel: 3020000, operations: 525000, training: 160000, equipment: 145000 },
    { month: 'May', spent: 3920000, budget: 4040000, personnel: 3080000, operations: 535000, training: 165000, equipment: 140000 },
    { month: 'Jun', spent: 3980000, budget: 4040000, personnel: 3120000, operations: 540000, training: 170000, equipment: 150000 },
    { month: 'Jul', spent: 4100000, budget: 4040000, personnel: 3200000, operations: 650000, training: 150000, equipment: 100000,
      variance: { overtime: 80000, hvac: 45000, vehicles: 35000 } },
    { month: 'Aug', spent: 4050000, budget: 4040000, personnel: 3180000, operations: 560000, training: 160000, equipment: 150000 },
    { month: 'Sep', spent: 3900000, budget: 4040000, personnel: 3060000, operations: 530000, training: 170000, equipment: 140000 },
    { month: 'Oct', spent: 3975000, budget: 4040000, personnel: 3100000, operations: 545000, training: 180000, equipment: 150000 }
  ];

  const toggleCategory = (divisionId) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(divisionId)) {
      newExpanded.delete(divisionId);
    } else {
      newExpanded.add(divisionId);
    }
    setExpandedCategories(newExpanded);
  };

  const getVarianceColor = (variance) => {
    if (variance > 0) return 'text-green-600 dark:text-green-400';
    if (variance < -100000) return 'text-red-600 dark:text-red-400';
    return 'text-amber-600 dark:text-amber-400';
  };

  const getPercentColor = (percent) => {
    if (percent >= 95) return 'red';
    if (percent >= 85) return 'amber';
    return 'green';
  };

  return (
    <DashboardLayout>
      <div className="p-5 lg:p-8">
        <div className="max-w-7xl mx-auto">
            {/* Enhanced Page Header with Fiscal Metrics */}
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white">Budget & Assets</h2>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-green-500/20 border border-green-500/40 rounded-lg">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs font-bold text-green-600 dark:text-green-400">FISCAL ACTIVE</span>
                  </div>
                </div>
                <p className="text-slate-700 dark:text-slate-400 text-sm mb-3">Fiscal oversight and resource management for FY 2024</p>

                {/* Fiscal Metrics At-a-Glance */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <Wallet className="w-4 h-4 text-blue-400" />
                    <span className="text-slate-700 dark:text-slate-400">Total Budget:</span>
                    <span className="font-bold text-blue-400">${(fiscalYear.totalBudget / 1000000).toFixed(1)}M</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                    <CircleDollarSign className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <span className="text-slate-700 dark:text-slate-400">Spent:</span>
                    <span className="font-bold text-amber-600 dark:text-amber-400">${(fiscalYear.spent / 1000000).toFixed(1)}M ({fiscalYear.percentSpent}%)</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <PiggyBank className="w-4 h-4 text-green-600 dark:text-green-400" />
                    <span className="text-slate-700 dark:text-slate-400">Available:</span>
                    <span className="font-bold text-green-600 dark:text-green-400">${(fiscalYear.available / 1000000).toFixed(1)}M</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                    <CalendarClock className="w-4 h-4 text-purple-400" />
                    <span className="text-slate-700 dark:text-slate-400">Days Left:</span>
                    <span className="font-bold text-purple-400">61 days</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="px-4 py-2 bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 rounded-xl text-slate-900 dark:text-white text-sm focus:outline-none focus:border-amber-500/50"
                >
                  <option value="ytd">Year to Date</option>
                  <option value="q4">Q4 2024</option>
                  <option value="monthly">Monthly</option>
                </select>
                <button
                  onClick={() => setVarianceReportOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all"
                >
                  <FileBarChart className="w-4 h-4" />
                  <span className="hidden sm:inline">Variance</span>
                </button>
                <button
                  onClick={() => setReallocationModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span className="hidden sm:inline">Reallocate</span>
                </button>
                <button
                  onClick={() => setExportModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Export</span>
                </button>
              </div>
            </div>

            {/* Enhanced AI Budget Intelligence - 3 Column Grid */}
            <div className="mb-6 bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 rounded-xl p-5">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Bot className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      AI BUDGET INTELLIGENCE
                    </h4>
                    <p className="text-xs text-slate-700 dark:text-slate-400">Real-time fiscal analysis and recommendations</p>
                  </div>
                </div>
                <button
                  onClick={() => setAiInsightsExpanded(!aiInsightsExpanded)}
                  className="px-3 py-1.5 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 text-purple-400 rounded-lg text-xs font-medium transition-all"
                >
                  {aiInsightsExpanded ? 'COLLAPSE' : 'EXPAND'}
                </button>
              </div>

              {aiInsightsExpanded && (
                <div className="space-y-6">
                  {/* 3-Column Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Critical Alerts Column */}
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                        <h5 className="text-sm font-bold text-red-600 dark:text-red-400">CRITICAL ALERTS</h5>
                      </div>
                      <div className="space-y-3 text-sm">
                        <div className="flex items-start gap-2">
                          <ShieldAlert className="w-4 h-4 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                          <p className="text-slate-700 dark:text-slate-300">Currently at <span className="font-bold text-red-600 dark:text-red-400">{fiscalYear.percentSpent}%</span> with <span className="font-bold text-amber-600 dark:text-amber-400">2 months remaining</span></p>
                        </div>
                        <div className="flex items-start gap-2">
                          <TrendingUp className="w-4 h-4 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                          <p className="text-slate-700 dark:text-slate-300">Projected: <span className="font-bold text-red-600 dark:text-red-400">$48.6M (over by $100K)</span></p>
                        </div>
                        <div className="flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                          <p className="text-slate-700 dark:text-slate-300"><span className="font-bold text-red-600 dark:text-red-400">Patrol Division</span> trending <span className="font-bold text-red-600 dark:text-red-400">$150K over</span></p>
                        </div>
                      </div>
                    </div>

                    {/* Recommendations Column */}
                    <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Lightbulb className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                        <h5 className="text-sm font-bold text-amber-600 dark:text-amber-400">RECOMMENDATIONS</h5>
                      </div>
                      <div className="space-y-3 text-sm">
                        <div className="flex items-start gap-2">
                          <RefreshCw className="w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                          <p className="text-slate-700 dark:text-slate-300"><span className="font-bold text-blue-400">Training</span> surplus <span className="font-bold text-green-600 dark:text-green-400">$150K</span> - reallocate to Patrol</p>
                        </div>
                        <div className="flex items-start gap-2">
                          <TrendingDown className="w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                          <p className="text-slate-700 dark:text-slate-300">Reduce discretionary by <span className="font-bold text-amber-600 dark:text-amber-400">15% in Nov-Dec</span></p>
                        </div>
                        <div className="flex items-start gap-2">
                          <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                          <p className="text-slate-700 dark:text-slate-300"><span className="font-bold text-amber-600 dark:text-amber-400">3 pending ($170K)</span> would push to 88.5%</p>
                        </div>
                      </div>
                    </div>

                    {/* Positive Trends Column */}
                    <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <BadgeCheck className="w-4 h-4 text-green-600 dark:text-green-400" />
                        <h5 className="text-sm font-bold text-green-600 dark:text-green-400">POSITIVE TRENDS</h5>
                      </div>
                      <div className="space-y-3 text-sm">
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                          <p className="text-slate-700 dark:text-slate-300">On track within <span className="font-bold text-green-600 dark:text-green-400">2% of budget</span></p>
                        </div>
                        <div className="flex items-start gap-2">
                          <TrendingDown className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                          <p className="text-slate-700 dark:text-slate-300">Q3 spending <span className="font-bold text-green-600 dark:text-green-400">down 5%</span> vs Q2</p>
                        </div>
                        <div className="flex items-start gap-2">
                          <Activity className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                          <p className="text-slate-700 dark:text-slate-300">Overtime <span className="font-bold text-green-600 dark:text-green-400">down 12%</span> vs last year</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Forecast Row */}
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <LineChart className="w-5 h-5 text-blue-400" />
                      <h5 className="text-sm font-bold text-blue-400">FORECAST (If current trends continue)</h5>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-900/30 rounded-lg p-3">
                        <Calendar className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                        <div>
                          <p className="text-xs text-slate-700 dark:text-slate-400">November</p>
                          <p className="font-bold text-amber-600 dark:text-amber-400">$4.1M (99% total)</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-900/30 rounded-lg p-3">
                        <Calendar className="w-4 h-4 text-red-600 dark:text-red-400" />
                        <div>
                          <p className="text-xs text-slate-700 dark:text-slate-400">December</p>
                          <p className="font-bold text-red-600 dark:text-red-400">$3.4M (106% - OVER)</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-900/30 rounded-lg p-3">
                        <Target className="w-4 h-4 text-green-600 dark:text-green-400" />
                        <div>
                          <p className="text-xs text-slate-700 dark:text-slate-400">Recommended Cap</p>
                          <p className="font-bold text-green-600 dark:text-green-400">$7.27M Nov-Dec</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 text-blue-400 rounded-lg text-xs font-medium transition-all">
                      <Eye className="w-3.5 h-3.5" />
                      VIEW DETAILED ANALYSIS
                    </button>
                    <button
                      onClick={() => setActiveTab('forecast')}
                      className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 text-purple-400 rounded-lg text-xs font-medium transition-all"
                    >
                      <LineChart className="w-3.5 h-3.5" />
                      ADJUST FORECAST
                    </button>
                    <button
                      onClick={() => setReallocationModal(true)}
                      className="flex items-center gap-2 px-3 py-1.5 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 text-green-600 dark:text-green-400 rounded-lg text-xs font-medium transition-all"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      REALLOCATION PLANNER
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Enhanced Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {/* Total Budget Card */}
              <div className="bg-white dark:bg-slate-800/40 border border-blue-500/30 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                    <Wallet className="w-5 h-5 text-blue-400" />
                  </div>
                  <span className="text-xs font-medium text-blue-400">TOTAL BUDGET</span>
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white mb-2">${(fiscalYear.totalBudget / 1000000).toFixed(1)}M</p>
                <div className="space-y-1.5 border-t border-slate-200 dark:border-slate-700/50 pt-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-700 dark:text-slate-400">Fiscal Year:</span>
                    <span className="font-medium text-slate-900 dark:text-white">{fiscalYear.year}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-700 dark:text-slate-400">Monthly Avg:</span>
                    <span className="font-medium text-slate-900 dark:text-white">$4.04M</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-700 dark:text-slate-400">Daily Rate:</span>
                    <span className="font-medium text-slate-900 dark:text-white">$133K</span>
                  </div>
                </div>
              </div>

              {/* Spent Card */}
              <div className={`bg-white dark:bg-slate-800/40 border rounded-xl p-5 ${fiscalYear.percentSpent >= 90 ? 'border-red-500/30' : fiscalYear.percentSpent >= 80 ? 'border-amber-500/30' : 'border-green-500/30'}`}>
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${fiscalYear.percentSpent >= 90 ? 'bg-red-500/20' : fiscalYear.percentSpent >= 80 ? 'bg-amber-500/20' : 'bg-green-500/20'}`}>
                    <CircleDollarSign className={`w-5 h-5 ${fiscalYear.percentSpent >= 90 ? 'text-red-600 dark:text-red-400' : fiscalYear.percentSpent >= 80 ? 'text-amber-600 dark:text-amber-400' : 'text-green-600 dark:text-green-400'}`} />
                  </div>
                  <span className={`text-xs font-medium ${fiscalYear.percentSpent >= 90 ? 'text-red-600 dark:text-red-400' : fiscalYear.percentSpent >= 80 ? 'text-amber-600 dark:text-amber-400' : 'text-green-600 dark:text-green-400'}`}>SPENT</span>
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white mb-2">${(fiscalYear.spent / 1000000).toFixed(1)}M</p>
                <div className="mb-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-700 dark:text-slate-400">Budget utilization</span>
                    <span className={`font-bold ${fiscalYear.percentSpent >= 90 ? 'text-red-600 dark:text-red-400' : fiscalYear.percentSpent >= 80 ? 'text-amber-600 dark:text-amber-400' : 'text-green-600 dark:text-green-400'}`}>{fiscalYear.percentSpent}%</span>
                  </div>
                  <div className="w-full h-2 bg-white dark:bg-slate-700/50 rounded-full overflow-hidden">
                    <div className={`h-full ${fiscalYear.percentSpent >= 90 ? 'bg-red-500' : fiscalYear.percentSpent >= 80 ? 'bg-amber-500' : 'bg-green-500'}`} style={{ width: `${fiscalYear.percentSpent}%` }} />
                  </div>
                </div>
                <div className="space-y-1.5 border-t border-slate-200 dark:border-slate-700/50 pt-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-700 dark:text-slate-400">This month:</span>
                    <span className="font-medium text-slate-900 dark:text-white">$3.98M</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-700 dark:text-slate-400">vs Last month:</span>
                    <span className="font-medium text-amber-600 dark:text-amber-400 flex items-center gap-1">
                      <ArrowUp className="w-3 h-3" />+2.1%
                    </span>
                  </div>
                </div>
              </div>

              {/* Committed Card */}
              <div className="bg-white dark:bg-slate-800/40 border border-purple-500/30 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
                    <Receipt className="w-5 h-5 text-purple-400" />
                  </div>
                  <span className="text-xs font-medium text-purple-400">COMMITTED</span>
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white mb-2">${(fiscalYear.committed / 1000000).toFixed(1)}M</p>
                <div className="mb-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-700 dark:text-slate-400">Of total budget</span>
                    <span className="font-bold text-purple-400">{fiscalYear.percentCommitted.toFixed(1)}%</span>
                  </div>
                  <div className="w-full h-2 bg-white dark:bg-slate-700/50 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500" style={{ width: `${fiscalYear.percentCommitted}%` }} />
                  </div>
                </div>
                <div className="space-y-1.5 border-t border-slate-200 dark:border-slate-700/50 pt-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-700 dark:text-slate-400">Pending POs:</span>
                    <span className="font-medium text-slate-900 dark:text-white">23 orders</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-700 dark:text-slate-400">Largest:</span>
                    <span className="font-medium text-slate-900 dark:text-white">$420K (Fleet)</span>
                  </div>
                </div>
              </div>

              {/* Available Card */}
              <div className="bg-white dark:bg-slate-800/40 border border-green-500/30 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                    <PiggyBank className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <span className="text-xs font-medium text-green-600 dark:text-green-400">AVAILABLE</span>
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white mb-2">${(fiscalYear.available / 1000000).toFixed(1)}M</p>
                <div className="mb-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-700 dark:text-slate-400">Remaining budget</span>
                    <span className="font-bold text-green-600 dark:text-green-400">{((fiscalYear.available / fiscalYear.totalBudget) * 100).toFixed(1)}%</span>
                  </div>
                  <div className="w-full h-2 bg-white dark:bg-slate-700/50 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500" style={{ width: `${(fiscalYear.available / fiscalYear.totalBudget) * 100}%` }} />
                  </div>
                </div>
                <div className="space-y-1.5 border-t border-slate-200 dark:border-slate-700/50 pt-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-700 dark:text-slate-400">Days remaining:</span>
                    <span className="font-medium text-slate-900 dark:text-white">61 days</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-700 dark:text-slate-400">Per day budget:</span>
                    <span className="font-medium text-green-600 dark:text-green-400">$57K/day</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="mb-6 flex gap-2 border-b border-slate-200 dark:border-slate-700/50">
              {[
                { id: 'overview', label: 'Overview', icon: PieChart },
                { id: 'divisions', label: 'By Division', icon: BarChart3 },
                { id: 'resources', label: 'Resources', icon: Package },
                { id: 'forecast', label: 'Forecast', icon: LineChart }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all relative ${
                    activeTab === tab.id ? 'text-amber-600 dark:text-amber-400' : 'text-slate-700 dark:text-slate-400 hover:text-slate-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500"></div>
                  )}
                </button>
              ))}
            </div>

            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Enhanced Fiscal Year Progress */}
                <div className="bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-sm dark:shadow-none p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <PieChart className="w-5 h-5 text-blue-400" />
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Fiscal Year Progress (FY 2024)</h3>
                  </div>

                  <div className="space-y-5">
                    {/* Main Progress Bar */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">TOTAL EXPENDITURES:</span>
                        <span className="text-sm font-bold text-slate-900 dark:text-white">${(fiscalYear.spent / 1000000).toFixed(2)}M / ${(fiscalYear.totalBudget / 1000000).toFixed(1)}M ({fiscalYear.percentSpent}%)</span>
                      </div>
                      <div className="w-full h-3 bg-white dark:bg-slate-700/50 rounded-full overflow-hidden">
                        <div className={`h-full transition-all ${
                          getPercentColor(fiscalYear.percentSpent) === 'red' ? 'bg-red-500' :
                          getPercentColor(fiscalYear.percentSpent) === 'amber' ? 'bg-amber-500' : 'bg-green-500'
                        }`} style={{ width: `${fiscalYear.percentSpent}%` }} />
                      </div>
                    </div>

                    {/* Breakdown */}
                    <div className="bg-white dark:bg-slate-900/50 rounded-lg p-4 border border-slate-200 dark:border-slate-700/30">
                      <h4 className="text-xs font-bold text-slate-700 dark:text-slate-400 mb-3">BREAKDOWN:</h4>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <p className="text-xs text-slate-700 dark:text-slate-400 mb-1">Spent (Cash Out)</p>
                          <p className="text-lg font-bold text-amber-600 dark:text-amber-400">${(fiscalYear.spent / 1000000).toFixed(1)}M</p>
                          <p className="text-xs text-slate-500">{fiscalYear.percentSpent}%</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-700 dark:text-slate-400 mb-1">Committed (Approved, Not Paid)</p>
                          <p className="text-lg font-bold text-purple-400">${(fiscalYear.committed / 1000000).toFixed(1)}M</p>
                          <p className="text-xs text-slate-500">{fiscalYear.percentCommitted.toFixed(1)}%</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-700 dark:text-slate-400 mb-1">Available (Unallocated)</p>
                          <p className="text-lg font-bold text-green-600 dark:text-green-400">${(fiscalYear.available / 1000000).toFixed(1)}M</p>
                          <p className="text-xs text-slate-500">{((fiscalYear.available / fiscalYear.totalBudget) * 100).toFixed(1)}%</p>
                        </div>
                      </div>
                    </div>

                    {/* Pending Approvals Impact */}
                    <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                        <h4 className="text-xs font-bold text-amber-600 dark:text-amber-400">IF ALL PENDING APPROVALS APPROVED: +$170K</h4>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div>
                          <span className="text-slate-700 dark:text-slate-400">• New total committed: </span>
                          <span className="font-bold text-slate-900 dark:text-white">$4.0M (8.2%)</span>
                        </div>
                        <div>
                          <span className="text-slate-700 dark:text-slate-400">• New available: </span>
                          <span className="font-bold text-slate-900 dark:text-white">$3.33M (6.9%)</span>
                        </div>
                      </div>
                    </div>

                    {/* Burn Rate */}
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Clock className="w-4 h-4 text-blue-400" />
                        <h4 className="text-xs font-bold text-blue-400">BURN RATE:</h4>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                        <div>
                          <p className="text-slate-700 dark:text-slate-400 mb-0.5">Daily average:</p>
                          <p className="font-bold text-slate-900 dark:text-white">$140K</p>
                        </div>
                        <div>
                          <p className="text-slate-700 dark:text-slate-400 mb-0.5">Monthly average:</p>
                          <p className="font-bold text-slate-900 dark:text-white">$4.1M</p>
                        </div>
                        <div>
                          <p className="text-slate-700 dark:text-slate-400 mb-0.5">Days remaining in FY:</p>
                          <p className="font-bold text-amber-600 dark:text-amber-400">61 days</p>
                        </div>
                        <div>
                          <p className="text-slate-700 dark:text-slate-400 mb-0.5">Projected additional spend:</p>
                          <p className="font-bold text-red-600 dark:text-red-400 flex items-center gap-1">$8.5M <AlertTriangle className="w-3 h-3" /></p>
                        </div>
                      </div>
                    </div>

                    {/* Year-End Forecast */}
                    <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <TrendingUp className="w-4 h-4 text-purple-400" />
                        <h4 className="text-xs font-bold text-purple-400">YEAR-END FORECAST:</h4>
                      </div>
                      <div className="space-y-2 text-xs">
                        <div className="flex items-center justify-between p-2 bg-red-500/10 rounded">
                          <span className="text-slate-700 dark:text-slate-300">• Current pace:</span>
                          <span className="font-bold text-red-600 dark:text-red-400 flex items-center gap-1">$49.73M (103% - OVER BUDGET $1.23M) <AlertCircle className="w-3 h-3" /></span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-amber-500/10 rounded">
                          <span className="text-slate-700 dark:text-slate-300">• Conservative estimate:</span>
                          <span className="font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">$48.9M (101% - OVER $400K) <AlertTriangle className="w-3 h-3" /></span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-green-500/10 rounded">
                          <span className="text-slate-700 dark:text-slate-300">• With cost controls:</span>
                          <span className="font-bold text-green-600 dark:text-green-400 flex items-center gap-1">$48.3M (99.6% - UNDER BUDGET $200K) <CheckCircle className="w-3 h-3" /></span>
                        </div>
                      </div>
                    </div>

                    {/* Comparison to Last Year */}
                    <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700/30 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <RefreshCw className="w-4 h-4 text-slate-700 dark:text-slate-400" />
                        <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">COMPARISON TO LAST YEAR (FY 2023):</h4>
                      </div>
                      <div className="grid grid-cols-3 gap-3 text-xs">
                        <div>
                          <p className="text-slate-700 dark:text-slate-400 mb-1">Same period last year:</p>
                          <p className="font-bold text-slate-900 dark:text-white">$39.8M (82%)</p>
                        </div>
                        <div>
                          <p className="text-slate-700 dark:text-slate-400 mb-1">Current year:</p>
                          <p className="font-bold text-slate-900 dark:text-white">$41.2M (85%)</p>
                        </div>
                        <div>
                          <p className="text-slate-700 dark:text-slate-400 mb-1">YoY increase:</p>
                          <div className="flex items-center gap-1">
                            <ArrowUpCircle className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                            <p className="font-bold text-amber-600 dark:text-amber-400">+3% ↑</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      <button className="px-3 py-1.5 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 text-blue-400 rounded-lg text-xs font-medium transition-all">
                        VIEW DETAILED BREAKDOWN
                      </button>
                      <button
                        onClick={() => setActiveTab('forecast')}
                        className="px-3 py-1.5 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 text-purple-400 rounded-lg text-xs font-medium transition-all"
                      >
                        ADJUST FORECAST
                      </button>
                      <button
                        onClick={() => setVarianceReportOpen(true)}
                        className="px-3 py-1.5 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 text-green-600 dark:text-green-400 rounded-lg text-xs font-medium transition-all"
                      >
                        VARIANCE REPORT
                      </button>
                    </div>
                  </div>
                </div>

                {/* Monthly Trend with Drill-Down */}
                <div className="bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-sm dark:shadow-none p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Monthly Spending Trend</h3>
                    <span className="text-xs text-slate-700 dark:text-slate-400">Click any month for details</span>
                  </div>
                  <div className="space-y-2">
                    {monthlyTrend.map((month, idx) => {
                      const percent = (month.spent / month.budget) * 100;
                      return (
                        <div
                          key={idx}
                          className="cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700/20 rounded-lg p-2 -mx-2 transition-colors"
                          onClick={() => setMonthDetailModal(month)}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-slate-700 dark:text-slate-300">{month.month}</span>
                              {percent > 100 && <AlertCircle className="w-3 h-3 text-red-600 dark:text-red-400" />}
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-sm text-slate-700 dark:text-slate-400">${(month.spent / 1000000).toFixed(2)}M</span>
                              <span className={`text-sm font-bold ${
                                percent > 100 ? 'text-red-600 dark:text-red-400' : percent > 95 ? 'text-amber-600 dark:text-amber-400' : 'text-green-600 dark:text-green-400'
                              }`}>{percent.toFixed(0)}%</span>
                              <Eye className="w-4 h-4 text-slate-500" />
                            </div>
                          </div>
                          <div className="w-full h-2 bg-white dark:bg-slate-700/50 rounded-full overflow-hidden">
                            <div className={`h-full ${
                              percent > 100 ? 'bg-red-500' : percent > 95 ? 'bg-amber-500' : 'bg-green-500'
                            }`} style={{ width: `${Math.min(percent, 100)}%` }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* ENHANCED DIVISIONS TAB */}
            {activeTab === 'divisions' && (
              <div className="space-y-6">
                {divisionBudgets.map(division => {
                  const isExpanded = expandedCategories.has(division.id);
                  const statusColor = division.variance < -100000 ? 'red' : division.variance < 0 ? 'amber' : 'green';
                  const trendIcon = division.variance < 0 ? TrendingUp : division.variance > 50000 ? TrendingDown : ArrowUpCircle;
                  const TrendIcon = trendIcon;

                  return (
                    <div key={division.id} className={`bg-white dark:bg-slate-800/40 border rounded-xl overflow-hidden ${
                      statusColor === 'red' ? 'border-red-500/40' : statusColor === 'amber' ? 'border-amber-500/40' : 'border-slate-700/50'
                    }`}>
                      <div className="p-5">
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{division.name}</h3>

                              {/* Status Badge */}
                              {statusColor === 'red' && (
                                <span className="px-2 py-0.5 bg-red-500/20 border border-red-500/30 rounded text-xs text-red-600 dark:text-red-400 font-bold flex items-center gap-1">
                                  <AlertCircle className="w-3 h-3" />
                                  Over Budget
                                </span>
                              )}
                              {statusColor === 'amber' && (
                                <span className="px-2 py-0.5 bg-amber-500/20 border border-amber-500/30 rounded text-xs text-amber-600 dark:text-amber-400 font-bold">
                                  High Usage
                                </span>
                              )}
                              {statusColor === 'green' && division.variance > 50000 && (
                                <span className="px-2 py-0.5 bg-green-500/20 border border-green-500/30 rounded text-xs text-green-600 dark:text-green-400 font-bold">
                                  Under Budget
                                </span>
                              )}
                            </div>

                            <p className="text-sm text-slate-700 dark:text-slate-400 mb-2">
                              ${(division.spent / 1000000).toFixed(2)}M / ${(division.budget / 1000000).toFixed(1)}M
                              {division.variance !== 0 && (
                                <span className={`ml-2 font-semibold flex items-center gap-1 inline-flex ${getVarianceColor(division.variance)}`}>
                                  <TrendIcon className="w-3 h-3" />
                                  ({division.variance > 0 ? '+' : ''}${(division.variance / 1000).toFixed(0)}K)
                                </span>
                              )}
                            </p>

                            {/* Trend Indicator */}
                            <div className="flex items-center gap-2 text-xs">
                              <span className="text-slate-500">Trend:</span>
                              {division.variance < -100000 && (
                                <span className="text-red-600 dark:text-red-400 font-semibold flex items-center gap-1">
                                  <ArrowUpCircle className="w-3 h-3" />
                                  Trending over (+${Math.abs(division.variance / 1000).toFixed(0)}K projected overage)
                                </span>
                              )}
                              {division.variance >= -100000 && division.variance < 0 && (
                                <span className="text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-1">
                                  <TrendingUp className="w-3 h-3" />
                                  On track
                                </span>
                              )}
                              {division.variance > 50000 && (
                                <span className="text-green-600 dark:text-green-400 font-semibold flex items-center gap-1">
                                  <TrendingDown className="w-3 h-3" />
                                  Under budget (Highest surplus: ${(division.variance / 1000).toFixed(0)}K available)
                                </span>
                              )}
                              {division.variance >= 0 && division.variance <= 50000 && (
                                <span className="text-slate-700 dark:text-slate-400 font-semibold">→ On track</span>
                              )}
                            </div>
                          </div>
                          <button
                            onClick={() => toggleCategory(division.id)}
                            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700/50 rounded-lg transition-colors"
                          >
                            {isExpanded ? <ChevronUp className="w-5 h-5 text-slate-700 dark:text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-700 dark:text-slate-400" />}
                          </button>
                        </div>

                        <div className="mb-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-slate-700 dark:text-slate-300">Budget Utilization</span>
                            <span className={`text-sm font-bold ${
                              getPercentColor(division.percentSpent) === 'red' ? 'text-red-600 dark:text-red-400' :
                              getPercentColor(division.percentSpent) === 'amber' ? 'text-amber-600 dark:text-amber-400' : 'text-green-600 dark:text-green-400'
                            }`}>{division.percentSpent.toFixed(1)}%</span>
                          </div>
                          <div className="w-full h-3 bg-white dark:bg-slate-700/50 rounded-full overflow-hidden">
                            <div className={`h-full ${
                              getPercentColor(division.percentSpent) === 'red' ? 'bg-red-500' :
                              getPercentColor(division.percentSpent) === 'amber' ? 'bg-amber-500' : 'bg-green-500'
                            }`} style={{ width: `${division.percentSpent}%` }} />
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-3 mb-4">
                          <div className="bg-white dark:bg-slate-900/50 rounded-lg p-3">
                            <p className="text-xs text-slate-700 dark:text-slate-400 mb-1">Spent</p>
                            <p className="text-sm font-bold text-amber-600 dark:text-amber-400">${(division.spent / 1000000).toFixed(2)}M</p>
                          </div>
                          <div className="bg-white dark:bg-slate-900/50 rounded-lg p-3">
                            <p className="text-xs text-slate-700 dark:text-slate-400 mb-1">Committed</p>
                            <p className="text-sm font-bold text-purple-400">${(division.committed / 1000000).toFixed(2)}M</p>
                          </div>
                          <div className="bg-white dark:bg-slate-900/50 rounded-lg p-3">
                            <p className="text-xs text-slate-700 dark:text-slate-400 mb-1">Available</p>
                            <p className="text-sm font-bold text-green-600 dark:text-green-400">${(division.available / 1000000).toFixed(2)}M</p>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-2">
                          <button className="px-3 py-1.5 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 text-blue-400 rounded-lg text-xs font-medium transition-all">
                            VIEW DETAILS
                          </button>
                          {division.variance < -50000 && (
                            <button
                              onClick={() => setReallocationModal(true)}
                              className="px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-600 dark:text-red-400 rounded-lg text-xs font-medium transition-all"
                            >
                              REQUEST ADDITIONAL FUNDS
                            </button>
                          )}
                          {division.variance > 50000 && (
                            <button
                              onClick={() => setReallocationModal(true)}
                              className="px-3 py-1.5 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 text-green-600 dark:text-green-400 rounded-lg text-xs font-medium transition-all"
                            >
                              REALLOCATE FROM
                            </button>
                          )}
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="border-t border-slate-200 dark:border-slate-700/50 p-5 bg-slate-50 dark:bg-slate-900/30">
                          <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Budget Categories</h4>
                          <div className="space-y-3">
                            {division.categories.map((cat, idx) => (
                              <div key={idx}>
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-sm text-slate-700 dark:text-slate-300">{cat.name}</span>
                                  <div className="flex items-center gap-3">
                                    <span className="text-sm text-slate-700 dark:text-slate-400">${(cat.spent / 1000000).toFixed(2)}M / ${(cat.budget / 1000000).toFixed(2)}M</span>
                                    <span className={`text-sm font-bold ${
                                      cat.percent >= 95 ? 'text-red-600 dark:text-red-400' : cat.percent >= 85 ? 'text-amber-600 dark:text-amber-400' : 'text-green-600 dark:text-green-400'
                                    }`}>{cat.percent.toFixed(1)}%</span>
                                  </div>
                                </div>
                                <div className="w-full h-2 bg-white dark:bg-slate-700/50 rounded-full overflow-hidden">
                                  <div className={`h-full ${
                                    cat.percent >= 95 ? 'bg-red-500' : cat.percent >= 85 ? 'bg-amber-500' : 'bg-green-500'
                                  }`} style={{ width: `${cat.percent}%` }} />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* ENHANCED RESOURCES TAB */}
            {activeTab === 'resources' && (
              <div className="space-y-6">
                {/* Personnel Breakdown */}
                <div className="bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-sm dark:shadow-none p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                      <Users className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2"><Briefcase className="w-5 h-5 text-blue-400" /> PERSONNEL (Largest expense)</h3>
                      <p className="text-sm text-slate-700 dark:text-slate-400">Annual Budget: $38.5M (79% of total)</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-white dark:bg-slate-900/50 rounded-lg p-4 border border-slate-200 dark:border-slate-700/30">
                      <p className="text-xs text-slate-700 dark:text-slate-400 mb-1">Spent YTD</p>
                      <p className="text-2xl font-bold text-slate-900 dark:text-white">$32.8M</p>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">85% spent</span>
                      </div>
                    </div>
                    <div className="bg-white dark:bg-slate-900/50 rounded-lg p-4 border border-slate-200 dark:border-slate-700/30">
                      <p className="text-xs text-slate-700 dark:text-slate-400 mb-1">Remaining</p>
                      <p className="text-2xl font-bold text-green-600 dark:text-green-400">$5.7M</p>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-xs text-slate-500">15% remaining</span>
                      </div>
                    </div>
                    <div className="bg-amber-500/10 rounded-lg p-4 border border-amber-500/30">
                      <p className="text-xs text-amber-600 dark:text-amber-400 mb-1">Burn Rate</p>
                      <p className="text-2xl font-bold text-slate-900 dark:text-white">$3.3M</p>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-xs text-slate-700 dark:text-slate-400">per month avg</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-white dark:bg-slate-900/50 rounded-lg p-4 border border-slate-200 dark:border-slate-700/30">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-slate-900 dark:text-white">• Salaries:</span>
                        <div className="text-right">
                          <p className="text-sm font-bold text-slate-900 dark:text-white">$28.2M</p>
                          <p className="text-xs text-green-600 dark:text-green-400">87% spent</p>
                        </div>
                      </div>
                      <div className="w-full h-2 bg-white dark:bg-slate-700/50 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500" style={{ width: '87%' }} />
                      </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900/50 rounded-lg p-4 border border-slate-200 dark:border-slate-700/30">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-slate-900 dark:text-white">• Overtime:</span>
                          <span className="px-2 py-0.5 bg-red-500/20 border border-red-500/30 rounded text-xs text-red-600 dark:text-red-400 font-bold">
                            Over Budget
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-slate-900 dark:text-white">$3.2M</p>
                          <p className="text-xs text-red-600 dark:text-red-400">92% spent</p>
                        </div>
                      </div>
                      <div className="w-full h-2 bg-white dark:bg-slate-700/50 rounded-full overflow-hidden">
                        <div className="h-full bg-red-500" style={{ width: '92%' }} />
                      </div>
                      <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-200 dark:border-slate-700/30">
                        <p className="text-xs font-bold text-amber-600 dark:text-amber-400 mb-2">Overtime Analysis:</p>
                        <div className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
                          <div className="flex justify-between">
                            <span>• YTD:</span>
                            <span className="font-medium text-slate-900 dark:text-white">$3.2M</span>
                          </div>
                          <div className="flex justify-between">
                            <span>• Budget:</span>
                            <span className="font-medium text-slate-900 dark:text-white">$3.5M</span>
                          </div>
                          <div className="flex justify-between">
                            <span>• Projected year-end:</span>
                            <span className="font-medium text-red-600 dark:text-red-400 flex items-center gap-1">$3.8M (109% - OVER $300K) <AlertCircle className="w-3 h-3" /></span>
                          </div>
                          <div className="flex justify-between">
                            <span>• Drivers:</span>
                            <span className="font-medium text-slate-700 dark:text-slate-400">Patrol understaffing, court coverage</span>
                          </div>
                        </div>
                        <div className="mt-3 flex gap-2">
                          <button className="px-3 py-1.5 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 text-blue-400 rounded-lg text-xs font-medium transition-all">
                            VIEW OT DETAILS
                          </button>
                          <button className="px-3 py-1.5 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 text-green-600 dark:text-green-400 rounded-lg text-xs font-medium transition-all">
                            OT REDUCTION PLAN
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900/50 rounded-lg p-4 border border-slate-200 dark:border-slate-700/30">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-slate-900 dark:text-white">• Benefits:</span>
                        <div className="text-right">
                          <p className="text-sm font-bold text-slate-900 dark:text-white">$7.1M</p>
                          <p className="text-xs text-green-600 dark:text-green-400">83% spent</p>
                        </div>
                      </div>
                      <div className="w-full h-2 bg-white dark:bg-slate-700/50 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500" style={{ width: '83%' }} />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Vehicles */}
                <div className="bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-sm dark:shadow-none p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                      <Truck className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Fleet Management</h3>
                      <p className="text-sm text-slate-700 dark:text-slate-400">{resources.vehicles.total} total vehicles</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="bg-white dark:bg-slate-900/50 rounded-lg p-4">
                      <p className="text-xs text-slate-700 dark:text-slate-400 mb-1">Patrol</p>
                      <p className="text-2xl font-bold text-slate-900 dark:text-white">{resources.vehicles.patrol}</p>
                    </div>
                    <div className="bg-white dark:bg-slate-900/50 rounded-lg p-4">
                      <p className="text-xs text-slate-700 dark:text-slate-400 mb-1">Investigation</p>
                      <p className="text-2xl font-bold text-slate-900 dark:text-white">{resources.vehicles.investigation}</p>
                    </div>
                    <div className="bg-white dark:bg-slate-900/50 rounded-lg p-4">
                      <p className="text-xs text-slate-700 dark:text-slate-400 mb-1">Support</p>
                      <p className="text-2xl font-bold text-slate-900 dark:text-white">{resources.vehicles.support}</p>
                    </div>
                    <div className="bg-white dark:bg-slate-900/50 rounded-lg p-4">
                      <p className="text-xs text-slate-700 dark:text-slate-400 mb-1">Administration</p>
                      <p className="text-2xl font-bold text-slate-900 dark:text-white">{resources.vehicles.administration}</p>
                    </div>
                    <div className="bg-white dark:bg-slate-900/50 rounded-lg p-4">
                      <p className="text-xs text-slate-700 dark:text-slate-400 mb-1">In Maintenance</p>
                      <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">{resources.vehicles.maintenance}</p>
                    </div>
                    <div className="bg-white dark:bg-slate-900/50 rounded-lg p-4">
                      <p className="text-xs text-slate-700 dark:text-slate-400 mb-1">Needs Replacement</p>
                      <p className="text-2xl font-bold text-red-600 dark:text-red-400">{resources.vehicles.replacement}</p>
                    </div>
                  </div>
                </div>

                {/* Facilities */}
                <div className="bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-sm dark:shadow-none p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Facilities</h3>
                      <p className="text-sm text-slate-700 dark:text-slate-400">{resources.facilities.totalSqFt.toLocaleString()} sq ft total</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-900/50 rounded-lg">
                      <span className="text-sm text-slate-700 dark:text-slate-300">Main Headquarters</span>
                      <span className="text-sm font-medium text-slate-900 dark:text-white">{resources.facilities.main}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-900/50 rounded-lg">
                      <span className="text-sm text-slate-700 dark:text-slate-300">Detention Center</span>
                      <span className="text-sm font-medium text-slate-900 dark:text-white">{resources.facilities.detention}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-900/50 rounded-lg">
                      <span className="text-sm text-slate-700 dark:text-slate-300">Substations</span>
                      <span className="text-sm font-medium text-slate-900 dark:text-white">{resources.facilities.substations} locations</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-900/50 rounded-lg">
                      <span className="text-sm text-slate-700 dark:text-slate-300">Training Facility</span>
                      <span className="text-sm font-medium text-slate-900 dark:text-white">{resources.facilities.trainingFacility} facility</span>
                    </div>
                  </div>
                </div>

                {/* Equipment */}
                <div className="bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-sm dark:shadow-none p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                      <Wrench className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Equipment Inventory</h3>
                      <p className="text-sm text-slate-700 dark:text-slate-400">Critical equipment status</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {Object.entries(resources.equipment).map(([key, value]) => (
                      <div key={key}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-slate-700 dark:text-slate-300 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-slate-700 dark:text-slate-400">Total: {value.total}</span>
                            <span className={`text-sm font-bold ${value.needsReplacement === 0 ? 'text-green-600 dark:text-green-400' : value.needsReplacement > 50 ? 'text-red-600 dark:text-red-400' : 'text-amber-600 dark:text-amber-400'}`}>
                              Replace: {value.needsReplacement}
                            </span>
                          </div>
                        </div>
                        <div className="w-full h-2 bg-white dark:bg-slate-700/50 rounded-full overflow-hidden">
                          <div className={`h-full ${value.needsReplacement === 0 ? 'bg-green-500' : value.needsReplacement > 50 ? 'bg-red-500' : 'bg-amber-500'}`}
                            style={{ width: `${((value.total - value.needsReplacement) / value.total) * 100}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ENHANCED FORECAST TAB */}
            {activeTab === 'forecast' && (
              <div className="space-y-6">
                <div className="bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-sm dark:shadow-none p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <LineChart className="w-5 h-5 text-purple-400" />
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">BUDGET FORECAST</h3>
                  </div>

                  {/* Current Trajectory */}
                  <div className="mb-6 bg-blue-500/10 border border-blue-500/30 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-6">
                      <h4 className="text-sm font-bold text-blue-400">CURRENT TRAJECTORY:</h4>
                      <TrendingUp className="w-5 h-5 text-blue-400" />
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-400 mb-3">Based on current spending patterns</p>
                    <div className="text-sm text-slate-700 dark:text-slate-300 space-y-1 mb-4">
                      <p>• Actual spending (Jan-Oct): <span className="font-bold text-slate-900 dark:text-white">$41.2M</span></p>
                      <p>• Budgeted spending: <span className="font-bold text-slate-900 dark:text-white">$40.4M target</span></p>
                      <p>• Forecasted spending (Nov-Dec): <span className="font-bold text-red-600 dark:text-red-400">$8.5M (projected)</span></p>
                    </div>
                  </div>

                  {/* Three Scenarios */}
                  <div className="space-y-4 mb-6">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">SCENARIOS:</h4>

                    {/* Scenario 1 - Current Pace */}
                    <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                        <h5 className="text-sm font-bold text-red-600 dark:text-red-400">SCENARIO 1: Current Pace (Do Nothing)</h5>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs mb-3">
                        <div>
                          <p className="text-slate-700 dark:text-slate-400 mb-1">Nov spending:</p>
                          <p className="font-bold text-slate-900 dark:text-white">$4.3M</p>
                        </div>
                        <div>
                          <p className="text-slate-700 dark:text-slate-400 mb-1">Dec spending:</p>
                          <p className="font-bold text-slate-900 dark:text-white">$4.2M</p>
                        </div>
                        <div>
                          <p className="text-slate-700 dark:text-slate-400 mb-1">Year-end total:</p>
                          <p className="font-bold text-slate-900 dark:text-white">$49.7M</p>
                        </div>
                        <div>
                          <p className="text-slate-700 dark:text-slate-400 mb-1">vs Budget:</p>
                          <p className="font-bold text-red-600 dark:text-red-400 flex items-center gap-1">$1.2M OVER (103%) <AlertCircle className="w-3 h-3" /></p>
                        </div>
                      </div>
                    </div>

                    {/* Scenario 2 - Cost Controls */}
                    <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                        <h5 className="text-sm font-bold text-green-600 dark:text-green-400 flex items-center gap-2">SCENARIO 2: Cost Controls (15% Reduction) <CheckCircle className="w-4 h-4" /> RECOMMENDED</h5>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs mb-3">
                        <div>
                          <p className="text-slate-700 dark:text-slate-400 mb-1">Nov spending:</p>
                          <p className="font-bold text-slate-900 dark:text-white">$3.7M</p>
                        </div>
                        <div>
                          <p className="text-slate-700 dark:text-slate-400 mb-1">Dec spending:</p>
                          <p className="font-bold text-slate-900 dark:text-white">$3.6M</p>
                        </div>
                        <div>
                          <p className="text-slate-700 dark:text-slate-400 mb-1">Year-end total:</p>
                          <p className="font-bold text-slate-900 dark:text-white">$48.5M</p>
                        </div>
                        <div>
                          <p className="text-slate-700 dark:text-slate-400 mb-1">vs Budget:</p>
                          <p className="font-bold text-green-600 dark:text-green-400 flex items-center gap-1">$0 variance (100%) <CheckCircle className="w-3 h-3" /></p>
                        </div>
                      </div>
                    </div>

                    {/* Scenario 3 - Aggressive Controls */}
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <TrendingDown className="w-5 h-5 text-blue-400" />
                        <h5 className="text-sm font-bold text-blue-400">SCENARIO 3: Aggressive Controls (25% Reduction)</h5>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs mb-3">
                        <div>
                          <p className="text-slate-700 dark:text-slate-400 mb-1">Nov spending:</p>
                          <p className="font-bold text-slate-900 dark:text-white">$3.2M</p>
                        </div>
                        <div>
                          <p className="text-slate-700 dark:text-slate-400 mb-1">Dec spending:</p>
                          <p className="font-bold text-slate-900 dark:text-white">$3.1M</p>
                        </div>
                        <div>
                          <p className="text-slate-700 dark:text-slate-400 mb-1">Year-end total:</p>
                          <p className="font-bold text-slate-900 dark:text-white">$47.5M</p>
                        </div>
                        <div>
                          <p className="text-slate-700 dark:text-slate-400 mb-1">vs Budget:</p>
                          <p className="font-bold text-green-600 dark:text-green-400 flex items-center gap-1">-$1.0M UNDER (98%) <CheckCircle className="w-3 h-3" /></p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recommended Actions for Scenario 2 */}
                  <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <Zap className="w-5 h-5 text-purple-400" />
                      <h5 className="text-sm font-bold text-purple-400">RECOMMENDED ACTIONS (Scenario 2):</h5>
                    </div>
                    <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-1.5 flex-shrink-0"></div>
                        <p>Freeze non-essential purchases</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-1.5 flex-shrink-0"></div>
                        <p>Limit overtime to emergencies only</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-1.5 flex-shrink-0"></div>
                        <p>Defer equipment purchases to next FY</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-1.5 flex-shrink-0"></div>
                        <p>Delay 2 new hires until Jan 2025</p>
                      </div>
                    </div>
                  </div>

                  {/* Reallocation Opportunities */}
                  <div className="mt-6 bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <RefreshCw className="w-5 h-5 text-green-600 dark:text-green-400" />
                      <h5 className="text-sm font-bold text-green-600 dark:text-green-400">REALLOCATION OPPORTUNITIES:</h5>
                    </div>
                    <div className="space-y-3 text-sm">
                      <div className="bg-white dark:bg-slate-900/50 rounded-lg p-3 border border-slate-200 dark:border-slate-700/30">
                        <p className="text-slate-700 dark:text-slate-300 mb-2">• <span className="font-bold text-slate-900 dark:text-white">Training Division</span> surplus: <span className="font-bold text-green-600 dark:text-green-400">$600K</span></p>
                        <div className="pl-4 space-y-1 text-xs text-slate-700 dark:text-slate-400">
                          <p>→ Move $300K to Patrol (cover OT)</p>
                          <p>→ Move $200K to Administration (HVAC emergency)</p>
                          <p>→ Keep $100K buffer</p>
                        </div>
                      </div>
                      <div className="bg-white dark:bg-slate-900/50 rounded-lg p-3 border border-slate-200 dark:border-slate-700/30">
                        <p className="text-slate-700 dark:text-slate-300 mb-2">• <span className="font-bold text-slate-900 dark:text-white">Investigations</span> under budget: <span className="font-bold text-green-600 dark:text-green-400">$200K</span></p>
                        <div className="pl-4 space-y-1 text-xs text-slate-700 dark:text-slate-400">
                          <p>→ Move $150K to Support Services (IT needs)</p>
                          <p>→ Keep $50K buffer</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={() => setReallocationModal(true)}
                        className="px-4 py-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 text-green-600 dark:text-green-400 rounded-lg text-sm font-medium transition-all"
                      >
                        APPLY COST CONTROLS
                      </button>
                      <button
                        onClick={() => setReallocationModal(true)}
                        className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 text-blue-400 rounded-lg text-sm font-medium transition-all"
                      >
                        REQUEST REALLOCATION
                      </button>
                      <button className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 text-purple-400 rounded-lg text-sm font-medium transition-all">
                        DOWNLOAD FORECAST
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

      {/* Month Detail Modal */}
      {monthDetailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMonthDetailModal(null)}
          />
          <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/50 rounded-2xl p-6 max-w-3xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{monthDetailModal.month} 2024 Detailed Breakdown</h3>
                <p className="text-sm text-slate-700 dark:text-slate-400">
                  Total Spent: <span className="font-bold text-slate-900 dark:text-white">${(monthDetailModal.spent / 1000000).toFixed(2)}M</span> ({((monthDetailModal.spent / monthDetailModal.budget) * 100).toFixed(0)}% of monthly target)
                </p>
              </div>
              <button
                onClick={() => setMonthDetailModal(null)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-700 dark:text-slate-400" />
              </button>
            </div>

            {/* Category Breakdown */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">BY CATEGORY:</h4>
              <div className="space-y-6">
                {/* Personnel */}
                <div className="bg-white dark:bg-slate-800/40 rounded-xl p-4 border border-slate-700/50">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-blue-400" />
                      <span className="font-semibold text-slate-900 dark:text-white">Personnel:</span>
                    </div>
                    <span className="text-lg font-bold text-blue-400">${(monthDetailModal.personnel / 1000000).toFixed(2)}M (78%)</span>
                  </div>
                  <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300 pl-7">
                    <div className="flex justify-between">
                      <span>• Salaries:</span>
                      <span className="font-medium text-slate-900 dark:text-white">${((monthDetailModal.personnel * 0.875) / 1000000).toFixed(2)}M</span>
                    </div>
                    <div className="flex justify-between">
                      <span>• Overtime:</span>
                      <span className={`font-medium ${monthDetailModal.variance?.overtime ? 'text-amber-600 dark:text-amber-400' : 'text-slate-900 dark:text-white'}`}>
                        ${((monthDetailModal.personnel * 0.10) / 1000000).toFixed(2)}M
                        {monthDetailModal.variance?.overtime && <span className="text-xs ml-1 inline-flex items-center gap-0.5">(↑ 25% vs prior month <AlertTriangle className="w-3 h-3" />)</span>}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>• Benefits:</span>
                      <span className="font-medium text-slate-900 dark:text-white">${((monthDetailModal.personnel * 0.025) / 1000000).toFixed(2)}M</span>
                    </div>
                  </div>
                </div>

                {/* Operations */}
                <div className="bg-white dark:bg-slate-800/40 rounded-xl p-4 border border-slate-700/50">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Wrench className="w-5 h-5 text-green-600 dark:text-green-400" />
                      <span className="font-semibold text-slate-900 dark:text-white">Operations:</span>
                    </div>
                    <span className="text-lg font-bold text-green-600 dark:text-green-400">${(monthDetailModal.operations / 1000000).toFixed(2)}M (16%)</span>
                  </div>
                  <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300 pl-7">
                    <div className="flex justify-between">
                      <span>• Vehicle fuel:</span>
                      <span className="font-medium text-slate-900 dark:text-white">${((monthDetailModal.operations * 0.35) / 1000000).toFixed(2)}M</span>
                    </div>
                    <div className="flex justify-between">
                      <span>• Equipment maintenance:</span>
                      <span className="font-medium text-slate-900 dark:text-white">${((monthDetailModal.operations * 0.23) / 1000000).toFixed(2)}M</span>
                    </div>
                    <div className="flex justify-between">
                      <span>• Utilities:</span>
                      <span className="font-medium text-slate-900 dark:text-white">${((monthDetailModal.operations * 0.18) / 1000000).toFixed(2)}M</span>
                    </div>
                    <div className="flex justify-between">
                      <span>• Supplies:</span>
                      <span className="font-medium text-slate-900 dark:text-white">${((monthDetailModal.operations * 0.24) / 1000000).toFixed(2)}M</span>
                    </div>
                  </div>
                </div>

                {/* Training */}
                <div className="bg-white dark:bg-slate-800/40 rounded-xl p-4 border border-slate-700/50">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-purple-400" />
                      <span className="font-semibold text-slate-900 dark:text-white">Training:</span>
                    </div>
                    <span className="text-lg font-bold text-purple-400">${(monthDetailModal.training / 1000000).toFixed(2)}M (4%)</span>
                  </div>
                  <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300 pl-7">
                    <div className="flex justify-between">
                      <span>• Firearms recertification:</span>
                      <span className="font-medium text-slate-900 dark:text-white">${((monthDetailModal.training * 0.30) / 1000000).toFixed(2)}M</span>
                    </div>
                    <div className="flex justify-between">
                      <span>• Tactical training:</span>
                      <span className="font-medium text-slate-900 dark:text-white">${((monthDetailModal.training * 0.43) / 1000000).toFixed(2)}M</span>
                    </div>
                    <div className="flex justify-between">
                      <span>• CPR/First Aid:</span>
                      <span className="font-medium text-slate-900 dark:text-white">${((monthDetailModal.training * 0.27) / 1000000).toFixed(2)}M</span>
                    </div>
                  </div>
                </div>

                {/* Equipment/Capital */}
                <div className="bg-white dark:bg-slate-800/40 rounded-xl p-4 border border-slate-700/50">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Package className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                      <span className="font-semibold text-slate-900 dark:text-white">Equipment/Capital:</span>
                    </div>
                    <span className="text-lg font-bold text-amber-600 dark:text-amber-400">${(monthDetailModal.equipment / 1000000).toFixed(2)}M (2%)</span>
                  </div>
                  <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300 pl-7">
                    <div className="flex justify-between">
                      <span>• Body camera repairs:</span>
                      <span className="font-medium text-slate-900 dark:text-white">${((monthDetailModal.equipment * 0.60) / 1000000).toFixed(2)}M</span>
                    </div>
                    <div className="flex justify-between">
                      <span>• Computer upgrades:</span>
                      <span className="font-medium text-slate-900 dark:text-white">${((monthDetailModal.equipment * 0.40) / 1000000).toFixed(2)}M</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Why Over/Under Budget */}
            {monthDetailModal.variance && (
              <div className="mb-6 bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                <h4 className="text-sm font-bold text-red-600 dark:text-red-400 mb-3">WHY OVER BUDGET:</h4>
                <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                  <p>• Overtime spike due to 4th of July coverage (+${(monthDetailModal.variance.overtime / 1000).toFixed(0)}K)</p>
                  <p>• Emergency HVAC repair in jail (+${(monthDetailModal.variance.hvac / 1000).toFixed(0)}K)</p>
                  <p>• Unplanned vehicle repairs (+${(monthDetailModal.variance.vehicles / 1000).toFixed(0)}K)</p>
                </div>
                <div className="mt-4 pt-4 border-t border-red-500/20">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">VARIANCE:</span>
                    <span className="text-lg font-bold text-red-600 dark:text-red-400">+${((monthDetailModal.spent - monthDetailModal.budget) / 1000).toFixed(0)}K over monthly target</span>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <button className="px-4 py-2 bg-blue-500/20 border border-blue-500/30 hover:bg-blue-500/30 text-blue-400 rounded-lg text-sm font-medium transition-all">
                VIEW INVOICE DETAILS
              </button>
              <button className="px-4 py-2 bg-purple-500/20 border border-purple-500/30 hover:bg-purple-500/30 text-purple-400 rounded-lg text-sm font-medium transition-all">
                COMPARE TO PREV MONTH
              </button>
              <button className="px-4 py-2 bg-green-500/20 border border-green-500/30 hover:bg-green-500/30 text-green-600 dark:text-green-400 rounded-lg text-sm font-medium transition-all">
                EXPORT REPORT
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Chat Button */}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 z-40"
      >
        {chatOpen ? <X className="w-6 h-6 text-slate-900 dark:text-white" /> : <MessageCircle className="w-6 h-6 text-slate-900 dark:text-white" />}
      </button>

      {/* AI Chat Panel */}
      {chatOpen && (
        <div className="fixed bottom-24 right-6 w-full max-w-96 h-[500px] bg-white dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200 dark:border-slate-700/50 rounded-2xl shadow-2xl flex flex-col z-40 mx-4 sm:mx-0">
          <div className="p-4 border-b border-slate-200 dark:border-slate-700/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-slate-900 dark:text-white" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Budget AI Assistant</h3>
                <p className="text-xs text-green-600 dark:text-green-400">Online</p>
              </div>
            </div>
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 text-slate-900 dark:text-white" />
              </div>
              <div className="flex-1">
                <div className="bg-white dark:bg-slate-800/60 p-3 rounded-xl">
                  <p className="text-sm text-slate-700 dark:text-slate-200">Hi! I can help you analyze budget trends, forecast spending, identify cost savings, compare divisions, and answer questions about fiscal management. What would you like to know?</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-slate-200 dark:border-slate-700/50">
            <div className="flex items-center gap-2">
              <input type="text" placeholder="Ask about budget..." className="flex-1 px-4 py-2 bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500/50" />
              <button className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                <Send className="w-5 h-5 text-slate-900 dark:text-white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
