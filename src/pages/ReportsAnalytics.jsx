import React, { useState } from 'react';
import { FileText, TrendingUp, AlertCircle, MessageCircle, DollarSign, CheckCircle, Sparkles, X, Send, Download, Calendar, Filter, BarChart3, PieChart, LineChart, Activity, Clock, ArrowUpRight, ArrowDownRight, Eye, RefreshCw, FileSpreadsheet, Mail, Share2, Plus, Sliders, BookOpen, PlayCircle, PauseCircle, Printer, FileDown, ChevronDown, ChevronUp, TrendingDown, Zap, Info, Star, AlertTriangle, CheckCircle2, Maximize2, Minimize2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import DashboardLayout from '../layouts/DashboardLayout';

export default function ReportsAnalytics() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState('reports');
  const [activeTab, setActiveTab] = useState('overview');
  const [chatOpen, setChatOpen] = useState(false);
  const [timeRange, setTimeRange] = useState('ytd');
  const [selectedReport, setSelectedReport] = useState(null);
  const [reportDetailModal, setReportDetailModal] = useState(null);
  const [exportModal, setExportModal] = useState(false);
  const [scheduleModal, setScheduleModal] = useState(false);
  const [customReportModal, setCustomReportModal] = useState(false);
  const [comparisonModal, setComparisonModal] = useState(false);
  const [aiInsightsExpanded, setAiInsightsExpanded] = useState(true);
  const [expandedMetrics, setExpandedMetrics] = useState(new Set());
  const [selectedComparison, setSelectedComparison] = useState('yoy'); // yoy, mom, qoq
  const [filterCategory, setFilterCategory] = useState('all');

  // Key metrics data
  const keyMetrics = {
    callsForService: {
      total: 145678,
      change: 5.2,
      trend: 'up',
      ytd: 145678,
      lastYear: 138432
    },
    responseTime: {
      average: 8.4,
      change: -12.3,
      trend: 'down',
      target: 8.0,
      unit: 'minutes'
    },
    crimeClearanceRate: {
      rate: 68.5,
      change: 3.8,
      trend: 'up',
      target: 70.0,
      unit: '%'
    },
    arrestsYTD: {
      total: 12456,
      change: -2.1,
      trend: 'down',
      lastYear: 12724
    },
    staffing: {
      current: 164,
      authorized: 178,
      percentage: 92.1,
      change: 1.2
    },
    overtime: {
      hours: 18943,
      cost: 1247850,
      change: -8.5,
      trend: 'down'
    }
  };

  // Division performance data
  const divisionPerformance = [
    {
      name: 'Patrol Division',
      calls: 89234,
      responseTime: 7.8,
      clearanceRate: 45.2,
      staffing: 92,
      efficiency: 88
    },
    {
      name: 'Investigations',
      calls: 5643,
      responseTime: 24.5,
      clearanceRate: 82.3,
      staffing: 95,
      efficiency: 91
    },
    {
      name: 'Detention',
      calls: 0,
      responseTime: 0,
      clearanceRate: 0,
      staffing: 94,
      efficiency: 87,
      inmates: 842,
      capacity: 920
    },
    {
      name: 'Support Services',
      calls: 12456,
      responseTime: 15.2,
      clearanceRate: 68.9,
      staffing: 89,
      efficiency: 85
    }
  ];

  // Monthly trends
  const monthlyTrends = [
    { month: 'Jan', calls: 12345, arrests: 1045, clearance: 66.2 },
    { month: 'Feb', calls: 11892, arrests: 1023, clearance: 67.1 },
    { month: 'Mar', calls: 13124, arrests: 1156, clearance: 68.3 },
    { month: 'Apr', calls: 12876, arrests: 1089, clearance: 67.8 },
    { month: 'May', calls: 13654, arrests: 1198, clearance: 69.1 },
    { month: 'Jun', calls: 14235, arrests: 1267, clearance: 68.9 },
    { month: 'Jul', calls: 15123, arrests: 1342, clearance: 69.5 },
    { month: 'Aug', calls: 14987, arrests: 1298, clearance: 68.7 },
    { month: 'Sep', calls: 13456, arrests: 1187, clearance: 67.9 },
    { month: 'Oct', calls: 12986, arrests: 1102, clearance: 68.5 }
  ];

  // Crime statistics
  const crimeStats = [
    { category: 'Property Crime', incidents: 4523, change: -5.8, arrests: 3102, clearance: 68.6 },
    { category: 'Violent Crime', incidents: 892, change: 2.3, arrests: 745, clearance: 83.5 },
    { category: 'Drug Offenses', incidents: 1876, change: -12.4, arrests: 1654, clearance: 88.2 },
    { category: 'Traffic Violations', incidents: 8934, change: 3.2, arrests: 7823, clearance: 87.6 },
    { category: 'Public Order', incidents: 2134, change: -1.5, arrests: 1678, clearance: 78.6 }
  ];

  // Available reports with enhanced data
  const availableReports = [
    {
      id: 1,
      name: 'Executive Monthly Summary',
      description: 'Comprehensive monthly overview for command staff',
      category: 'Executive',
      lastGenerated: '2024-11-01',
      frequency: 'Monthly',
      icon: FileText,
      scheduled: true,
      recipients: 12,
      views: 342,
      downloads: 89,
      status: 'active',
      nextScheduled: '2024-12-01',
      dataPoints: ['Calls for Service', 'Response Times', 'Crime Clearance', 'Budget Status', 'Personnel'],
      fileSize: '2.4 MB'
    },
    {
      id: 2,
      name: 'Crime Statistics Report',
      description: 'Detailed crime trends and clearance rates',
      category: 'Operations',
      lastGenerated: '2024-11-03',
      frequency: 'Weekly',
      icon: BarChart3,
      scheduled: true,
      recipients: 8,
      views: 156,
      downloads: 45,
      status: 'active',
      nextScheduled: '2024-11-10',
      dataPoints: ['Incident Types', 'Clearance Rates', 'Arrest Data', 'Geographic Analysis'],
      fileSize: '1.8 MB'
    },
    {
      id: 3,
      name: 'Personnel Compliance Report',
      description: 'Certifications, training, and compliance status',
      category: 'HR',
      lastGenerated: '2024-11-02',
      frequency: 'Weekly',
      icon: Users,
      scheduled: true,
      recipients: 6,
      views: 234,
      downloads: 67,
      status: 'active',
      nextScheduled: '2024-11-09',
      dataPoints: ['Certifications', 'Training Hours', 'Expiring Credentials', 'Compliance Score'],
      fileSize: '1.2 MB'
    },
    {
      id: 4,
      name: 'Budget Variance Analysis',
      description: 'YTD spending vs budget by division',
      category: 'Finance',
      lastGenerated: '2024-11-01',
      frequency: 'Monthly',
      icon: DollarSign,
      scheduled: true,
      recipients: 15,
      views: 423,
      downloads: 124,
      status: 'active',
      nextScheduled: '2024-12-01',
      dataPoints: ['Division Budgets', 'Variance Analysis', 'Projections', 'Overtime Costs'],
      fileSize: '3.1 MB'
    },
    {
      id: 5,
      name: 'Use of Force Analysis',
      description: 'Incidents, trends, and policy compliance',
      category: 'Operations',
      lastGenerated: '2024-10-28',
      frequency: 'Quarterly',
      icon: Shield,
      scheduled: true,
      recipients: 10,
      views: 178,
      downloads: 52,
      status: 'active',
      nextScheduled: '2025-01-28',
      dataPoints: ['Incident Count', 'Force Types', 'Injury Rates', 'Officer Involved', 'Policy Compliance'],
      fileSize: '2.7 MB'
    },
    {
      id: 6,
      name: 'Community Engagement Metrics',
      description: 'Public interactions and satisfaction surveys',
      category: 'Community',
      lastGenerated: '2024-10-30',
      frequency: 'Monthly',
      icon: Users,
      scheduled: false,
      recipients: 5,
      views: 89,
      downloads: 23,
      status: 'active',
      nextScheduled: null,
      dataPoints: ['Public Contacts', 'Survey Results', 'Community Events', 'Satisfaction Scores'],
      fileSize: '1.5 MB'
    },
    {
      id: 7,
      name: 'Fleet Maintenance Report',
      description: 'Vehicle status, maintenance costs, replacement needs',
      category: 'Support',
      lastGenerated: '2024-11-02',
      frequency: 'Monthly',
      icon: Activity,
      scheduled: true,
      recipients: 7,
      views: 145,
      downloads: 34,
      status: 'active',
      nextScheduled: '2024-12-02',
      dataPoints: ['Vehicle Condition', 'Maintenance Costs', 'Downtime', 'Replacement Schedule'],
      fileSize: '1.9 MB'
    },
    {
      id: 8,
      name: 'Training Completion Report',
      description: 'Officer training hours and certification status',
      category: 'Training',
      lastGenerated: '2024-11-01',
      frequency: 'Monthly',
      icon: FileText,
      scheduled: true,
      recipients: 9,
      views: 267,
      downloads: 78,
      status: 'active',
      nextScheduled: '2024-12-01',
      dataPoints: ['Training Hours', 'Completion Rates', 'Certifications', 'Course Enrollment'],
      fileSize: '2.2 MB'
    },
    {
      id: 9,
      name: 'Overtime Analysis Report',
      description: 'Detailed overtime tracking and cost analysis by division',
      category: 'Finance',
      lastGenerated: '2024-11-03',
      frequency: 'Bi-Weekly',
      icon: Clock,
      scheduled: true,
      recipients: 11,
      views: 198,
      downloads: 56,
      status: 'active',
      nextScheduled: '2024-11-17',
      dataPoints: ['OT Hours', 'Cost by Division', 'Trends', 'Staff Utilization'],
      fileSize: '1.6 MB'
    },
    {
      id: 10,
      name: 'Detention Facility Report',
      description: 'Inmate population, incidents, and facility operations',
      category: 'Operations',
      lastGenerated: '2024-11-02',
      frequency: 'Weekly',
      icon: Building2,
      scheduled: true,
      recipients: 8,
      views: 187,
      downloads: 42,
      status: 'active',
      nextScheduled: '2024-11-09',
      dataPoints: ['Population', 'Capacity', 'Incidents', 'Medical', 'Classification'],
      fileSize: '2.0 MB'
    }
  ];

  const getChangeColor = (change) => {
    if (change > 0) return 'text-green-400';
    if (change < 0) return 'text-red-400';
    return 'text-slate-400';
  };

  const getChangeIcon = (change) => {
    if (change > 0) return <ArrowUpRight className="w-4 h-4" />;
    if (change < 0) return <ArrowDownRight className="w-4 h-4" />;
    return null;
  };

  const toggleMetricExpand = (metricId) => {
    const newExpanded = new Set(expandedMetrics);
    if (newExpanded.has(metricId)) {
      newExpanded.delete(metricId);
    } else {
      newExpanded.add(metricId);
    }
    setExpandedMetrics(newExpanded);
  };

  const filteredReports = filterCategory === 'all'
    ? availableReports
    : availableReports.filter(r => r.category === filterCategory);

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6">
        <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">Reports & Analytics</h2>
                <p className="text-slate-400">Enterprise-grade insights and performance intelligence</p>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="px-3 py-2 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white text-sm focus:outline-none focus:border-amber-500/50"
                >
                  <option value="ytd">Year to Date</option>
                  <option value="q4">Q4 2024</option>
                  <option value="monthly">This Month</option>
                  <option value="weekly">This Week</option>
                </select>
                <button
                  onClick={() => setComparisonModal(true)}
                  className="hidden md:flex items-center gap-2 px-3 py-2 bg-slate-800/40 border border-slate-700/50 rounded-xl text-slate-300 hover:bg-slate-800/60 transition-all"
                >
                  <BarChart3 className="w-4 h-4" />
                  <span className="text-sm">Compare</span>
                </button>
                <button
                  onClick={() => setCustomReportModal(true)}
                  className="hidden md:flex items-center gap-2 px-3 py-2 bg-purple-500/20 border border-purple-500/30 rounded-xl text-purple-300 hover:bg-purple-500/30 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span className="text-sm">Custom</span>
                </button>
                <button
                  onClick={() => setExportModal(true)}
                  className="flex items-center gap-2 px-3 py-2 bg-amber-500/20 border border-amber-500/30 rounded-xl text-amber-300 hover:bg-amber-500/30 transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline text-sm">Export</span>
                </button>
              </div>
            </div>

            {/* Enhanced AI Insights */}
            <div className="mb-6 bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 rounded-xl overflow-hidden">
              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-6 h-6 text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-base font-semibold text-white mb-2 flex items-center gap-2">
                        AI Analytics Intelligence
                        <span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 text-xs rounded-full">Live</span>
                      </h4>
                      <div className="space-y-2 text-sm text-slate-300">
                        <p>• <span className="font-bold text-green-400">Response times improved 12.3%</span> this month - excellent progress toward 8-minute target</p>
                        <p>• <span className="font-bold text-blue-400">Crime clearance rate</span> at 68.5%, up 3.8% YoY - investigations performing well</p>
                        <p>• <span className="font-bold text-amber-400">Property crime down 5.8%</span> - community policing initiatives showing impact</p>
                        <p>• <span className="font-bold text-purple-400">Overtime costs decreased 8.5%</span> - efficient scheduling reducing budget pressure</p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setAiInsightsExpanded(!aiInsightsExpanded)}
                    className="p-2 hover:bg-purple-500/20 rounded-lg transition-colors flex-shrink-0"
                  >
                    {aiInsightsExpanded ? <ChevronUp className="w-5 h-5 text-purple-400" /> : <ChevronDown className="w-5 h-5 text-purple-400" />}
                  </button>
                </div>

                {aiInsightsExpanded && (
                  <div className="mt-4 pt-4 border-t border-purple-500/20">
                    <h5 className="text-sm font-semibold text-white mb-3">Detailed Analytics</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="bg-slate-900/40 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="w-4 h-4 text-green-400" />
                          <p className="text-xs font-semibold text-green-400">Performance Improvements</p>
                        </div>
                        <ul className="text-xs text-slate-300 space-y-1">
                          <li>• Patrol response time: 7.8 min (↓ 0.6 min)</li>
                          <li>• Case closure rate: 82.3% (↑ 4.1%)</li>
                          <li>• Training completion: 94% (↑ 8%)</li>
                        </ul>
                      </div>
                      <div className="bg-slate-900/40 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertTriangle className="w-4 h-4 text-amber-400" />
                          <p className="text-xs font-semibold text-amber-400">Areas Requiring Attention</p>
                        </div>
                        <ul className="text-xs text-slate-300 space-y-1">
                          <li>• Staffing at 92.1% (14 positions open)</li>
                          <li>• 45 certifications expiring in 30 days</li>
                          <li>• Equipment replacement budget 95% utilized</li>
                        </ul>
                      </div>
                      <div className="bg-slate-900/40 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <DollarSign className="w-4 h-4 text-blue-400" />
                          <p className="text-xs font-semibold text-blue-400">Budget Insights</p>
                        </div>
                        <ul className="text-xs text-slate-300 space-y-1">
                          <li>• YTD spending: 85% of annual budget</li>
                          <li>• Projected to end year at 100.5%</li>
                          <li>• Recommend $250K reallocation</li>
                        </ul>
                      </div>
                      <div className="bg-slate-900/40 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Star className="w-4 h-4 text-purple-400" />
                          <p className="text-xs font-semibold text-purple-400">Recommendations</p>
                        </div>
                        <ul className="text-xs text-slate-300 space-y-1">
                          <li>• Focus hiring on patrol division</li>
                          <li>• Schedule certification training Q1 2025</li>
                          <li>• Review fleet replacement schedule</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Tabs */}
            <div className="mb-6 flex gap-2 border-b border-slate-700/50">
              {[
                { id: 'overview', label: 'Overview', icon: Activity },
                { id: 'operations', label: 'Operations', icon: BarChart3 },
                { id: 'crime', label: 'Crime Stats', icon: Shield },
                { id: 'reports', label: 'Reports Library', icon: FileText }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all relative ${
                    activeTab === tab.id ? 'text-amber-400' : 'text-slate-400 hover:text-slate-300'
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
                {/* Key Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                        <Activity className="w-5 h-5 text-blue-400" />
                      </div>
                      <div className={`flex items-center gap-1 text-sm ${getChangeColor(keyMetrics.callsForService.change)}`}>
                        {getChangeIcon(keyMetrics.callsForService.change)}
                        <span className="font-bold">{Math.abs(keyMetrics.callsForService.change)}%</span>
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-white mb-1">{keyMetrics.callsForService.total.toLocaleString()}</p>
                    <p className="text-sm text-slate-400">Calls for Service (YTD)</p>
                  </div>

                  <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                        <Clock className="w-5 h-5 text-green-400" />
                      </div>
                      <div className={`flex items-center gap-1 text-sm ${getChangeColor(-keyMetrics.responseTime.change)}`}>
                        {getChangeIcon(-keyMetrics.responseTime.change)}
                        <span className="font-bold">{Math.abs(keyMetrics.responseTime.change)}%</span>
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-white mb-1">{keyMetrics.responseTime.average} min</p>
                    <p className="text-sm text-slate-400">Avg Response Time</p>
                    <div className="mt-2 pt-2 border-t border-slate-700/50">
                      <p className="text-xs text-slate-500">Target: {keyMetrics.responseTime.target} min</p>
                    </div>
                  </div>

                  <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-purple-400" />
                      </div>
                      <div className={`flex items-center gap-1 text-sm ${getChangeColor(keyMetrics.crimeClearanceRate.change)}`}>
                        {getChangeIcon(keyMetrics.crimeClearanceRate.change)}
                        <span className="font-bold">{Math.abs(keyMetrics.crimeClearanceRate.change)}%</span>
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-white mb-1">{keyMetrics.crimeClearanceRate.rate}%</p>
                    <p className="text-sm text-slate-400">Crime Clearance Rate</p>
                    <div className="mt-2 pt-2 border-t border-slate-700/50">
                      <p className="text-xs text-slate-500">Target: {keyMetrics.crimeClearanceRate.target}%</p>
                    </div>
                  </div>

                  <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center">
                        <Shield className="w-5 h-5 text-amber-400" />
                      </div>
                      <div className={`flex items-center gap-1 text-sm ${getChangeColor(keyMetrics.arrestsYTD.change)}`}>
                        {getChangeIcon(keyMetrics.arrestsYTD.change)}
                        <span className="font-bold">{Math.abs(keyMetrics.arrestsYTD.change)}%</span>
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-white mb-1">{keyMetrics.arrestsYTD.total.toLocaleString()}</p>
                    <p className="text-sm text-slate-400">Arrests (YTD)</p>
                  </div>

                  <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                        <Users className="w-5 h-5 text-blue-400" />
                      </div>
                      <div className={`flex items-center gap-1 text-sm ${getChangeColor(keyMetrics.staffing.change)}`}>
                        {getChangeIcon(keyMetrics.staffing.change)}
                        <span className="font-bold">{Math.abs(keyMetrics.staffing.change)}%</span>
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-white mb-1">{keyMetrics.staffing.percentage}%</p>
                    <p className="text-sm text-slate-400">Staffing Level</p>
                    <div className="mt-2 pt-2 border-t border-slate-700/50">
                      <p className="text-xs text-slate-500">{keyMetrics.staffing.current} / {keyMetrics.staffing.authorized} authorized</p>
                    </div>
                  </div>

                  <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center">
                        <DollarSign className="w-5 h-5 text-red-400" />
                      </div>
                      <div className={`flex items-center gap-1 text-sm ${getChangeColor(-keyMetrics.overtime.change)}`}>
                        {getChangeIcon(-keyMetrics.overtime.change)}
                        <span className="font-bold">{Math.abs(keyMetrics.overtime.change)}%</span>
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-white mb-1">${(keyMetrics.overtime.cost / 1000000).toFixed(1)}M</p>
                    <p className="text-sm text-slate-400">Overtime Cost (YTD)</p>
                    <div className="mt-2 pt-2 border-t border-slate-700/50">
                      <p className="text-xs text-slate-500">{keyMetrics.overtime.hours.toLocaleString()} hours</p>
                    </div>
                  </div>
                </div>

                {/* Monthly Trend Chart */}
                <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Monthly Trends</h3>
                  <div className="space-y-3">
                    {monthlyTrends.map((month, idx) => (
                      <div key={idx}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-slate-300">{month.month}</span>
                          <div className="flex items-center gap-4 text-sm">
                            <span className="text-slate-400">Calls: {month.calls.toLocaleString()}</span>
                            <span className="text-blue-400">Arrests: {month.arrests}</span>
                            <span className="text-green-400">Clear: {month.clearance}%</span>
                          </div>
                        </div>
                        <div className="w-full h-2 bg-slate-700/50 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-blue-500 to-green-500" style={{ width: `${(month.clearance / 100) * 100}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* OPERATIONS TAB */}
            {activeTab === 'operations' && (
              <div className="space-y-6">
                <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Division Performance</h3>
                  <div className="space-y-4">
                    {divisionPerformance.map((division, idx) => (
                      <div key={idx} className="bg-slate-900/50 rounded-xl p-5">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-base font-semibold text-white">{division.name}</h4>
                          <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                            division.efficiency >= 90 ? 'bg-green-500/20 text-green-400' :
                            division.efficiency >= 85 ? 'bg-amber-500/20 text-amber-400' : 'bg-red-500/20 text-red-400'
                          }`}>
                            {division.efficiency}% Efficiency
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {division.calls > 0 && (
                            <div>
                              <p className="text-xs text-slate-400 mb-1">Calls</p>
                              <p className="text-lg font-bold text-white">{division.calls.toLocaleString()}</p>
                            </div>
                          )}
                          {division.responseTime > 0 && (
                            <div>
                              <p className="text-xs text-slate-400 mb-1">Response Time</p>
                              <p className="text-lg font-bold text-white">{division.responseTime} min</p>
                            </div>
                          )}
                          {division.clearanceRate > 0 && (
                            <div>
                              <p className="text-xs text-slate-400 mb-1">Clearance Rate</p>
                              <p className="text-lg font-bold text-white">{division.clearanceRate}%</p>
                            </div>
                          )}
                          <div>
                            <p className="text-xs text-slate-400 mb-1">Staffing</p>
                            <p className="text-lg font-bold text-white">{division.staffing}%</p>
                          </div>
                          {division.inmates && (
                            <>
                              <div>
                                <p className="text-xs text-slate-400 mb-1">Inmates</p>
                                <p className="text-lg font-bold text-white">{division.inmates}</p>
                              </div>
                              <div>
                                <p className="text-xs text-slate-400 mb-1">Capacity</p>
                                <p className="text-lg font-bold text-white">{division.capacity}</p>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* CRIME STATS TAB */}
            {activeTab === 'crime' && (
              <div className="space-y-6">
                <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-slate-900/50 border-b border-slate-700/50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Category</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Incidents</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">YoY Change</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Arrests</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Clearance Rate</th>
                        </tr>
                      </thead>
                      <tbody>
                        {crimeStats.map((stat, idx) => (
                          <tr key={idx} className="border-b border-slate-800/30 hover:bg-slate-800/30 transition-colors">
                            <td className="px-4 py-4">
                              <p className="text-sm font-medium text-white">{stat.category}</p>
                            </td>
                            <td className="px-4 py-4">
                              <p className="text-sm text-slate-300">{stat.incidents.toLocaleString()}</p>
                            </td>
                            <td className="px-4 py-4">
                              <div className={`flex items-center gap-1 ${getChangeColor(stat.change)}`}>
                                {getChangeIcon(stat.change)}
                                <span className="text-sm font-bold">{Math.abs(stat.change)}%</span>
                              </div>
                            </td>
                            <td className="px-4 py-4">
                              <p className="text-sm text-slate-300">{stat.arrests.toLocaleString()}</p>
                            </td>
                            <td className="px-4 py-4">
                              <div className="flex items-center gap-3">
                                <span className={`text-sm font-bold ${
                                  stat.clearance >= 80 ? 'text-green-400' :
                                  stat.clearance >= 65 ? 'text-amber-400' : 'text-red-400'
                                }`}>{stat.clearance}%</span>
                                <div className="flex-1 h-2 bg-slate-700/50 rounded-full overflow-hidden max-w-[100px]">
                                  <div className={`h-full ${
                                    stat.clearance >= 80 ? 'bg-green-500' :
                                    stat.clearance >= 65 ? 'bg-amber-500' : 'bg-red-500'
                                  }`} style={{ width: `${stat.clearance}%` }} />
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* REPORTS LIBRARY TAB */}
            {activeTab === 'reports' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                      type="text"
                      placeholder="Search reports..."
                      className="w-full pl-12 pr-4 py-2.5 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
                    />
                  </div>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="px-4 py-2.5 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white text-sm focus:outline-none focus:border-amber-500/50 cursor-pointer"
                  >
                    <option value="all">All Categories</option>
                    <option value="Executive">Executive</option>
                    <option value="Operations">Operations</option>
                    <option value="HR">HR</option>
                    <option value="Finance">Finance</option>
                    <option value="Training">Training</option>
                    <option value="Support">Support</option>
                    <option value="Community">Community</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredReports.map(report => {
                    const Icon = report.icon;
                    return (
                      <div key={report.id} className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5 hover:border-slate-600/50 transition-all group">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/30 transition-colors">
                            <Icon className="w-6 h-6 text-blue-400" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-1">
                              <h4 className="text-base font-semibold text-white">{report.name}</h4>
                              <div className="flex items-center gap-1">
                                {report.scheduled && (
                                  <div className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    Auto
                                  </div>
                                )}
                              </div>
                            </div>
                            <p className="text-sm text-slate-400 mb-3">{report.description}</p>
                            <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {report.frequency}
                              </span>
                              <span className="flex items-center gap-1">
                                <Eye className="w-3 h-3" />
                                {report.views} views
                              </span>
                              <span className="flex items-center gap-1">
                                <Download className="w-3 h-3" />
                                {report.downloads}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <button
                                onClick={() => setReportDetailModal(report)}
                                className="flex items-center gap-2 px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-xs font-medium transition-all"
                              >
                                <Eye className="w-3 h-3" />
                                View Details
                              </button>
                              <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-700/40 hover:bg-slate-700/60 border border-slate-600/50 text-white rounded-lg text-xs font-medium transition-all">
                                <Download className="w-3 h-3" />
                                Download
                              </button>
                              <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-700/40 hover:bg-slate-700/60 border border-slate-600/50 text-white rounded-lg text-xs font-medium transition-all">
                                <RefreshCw className="w-3 h-3" />
                                Generate
                              </button>
                              {!report.scheduled && (
                                <button
                                  onClick={() => setScheduleModal(report)}
                                  className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 text-purple-300 rounded-lg text-xs font-medium transition-all"
                                >
                                  <PlayCircle className="w-3 h-3" />
                                  Schedule
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

      {/* AI Chat Button */}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 z-40"
      >
        {chatOpen ? <X className="w-6 h-6 text-white" /> : <MessageCircle className="w-6 h-6 text-white" />}
      </button>

      {chatOpen && (
        <div className="fixed bottom-24 right-6 w-full max-w-96 h-[500px] bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl flex flex-col z-40 mx-4 sm:mx-0">
          <div className="p-4 border-b border-slate-700/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Analytics AI Assistant</h3>
                <p className="text-xs text-green-400">Online</p>
              </div>
            </div>
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <div className="bg-slate-800/60 p-3 rounded-xl">
                  <p className="text-sm text-slate-200">Hi! I can help you analyze trends, generate custom reports, compare metrics, identify patterns, and answer questions about performance data. What would you like to explore?</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-slate-700/50">
            <div className="flex items-center gap-2">
              <input type="text" placeholder="Ask about analytics..." className="flex-1 px-4 py-2 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50" />
              <button className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                <Send className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Report Detail Modal */}
      {reportDetailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setReportDetailModal(null)}
          />
          <div className="relative bg-slate-900 border border-slate-700/50 rounded-2xl p-6 max-w-3xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <reportDetailModal.icon className="w-7 h-7 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-1">{reportDetailModal.name}</h3>
                  <p className="text-sm text-slate-400">{reportDetailModal.description}</p>
                </div>
              </div>
              <button
                onClick={() => setReportDetailModal(null)}
                className="p-2 hover:bg-slate-800/50 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-slate-800/40 rounded-xl p-4">
                <p className="text-xs text-slate-400 mb-1">Category</p>
                <p className="text-sm font-semibold text-white">{reportDetailModal.category}</p>
              </div>
              <div className="bg-slate-800/40 rounded-xl p-4">
                <p className="text-xs text-slate-400 mb-1">Frequency</p>
                <p className="text-sm font-semibold text-white">{reportDetailModal.frequency}</p>
              </div>
              <div className="bg-slate-800/40 rounded-xl p-4">
                <p className="text-xs text-slate-400 mb-1">File Size</p>
                <p className="text-sm font-semibold text-white">{reportDetailModal.fileSize}</p>
              </div>
              <div className="bg-slate-800/40 rounded-xl p-4">
                <p className="text-xs text-slate-400 mb-1">Recipients</p>
                <p className="text-sm font-semibold text-white">{reportDetailModal.recipients} users</p>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-sm font-semibold text-white mb-3">Report Metrics</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-slate-800/40 rounded-xl p-3 flex items-center gap-3">
                  <Eye className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="text-xs text-slate-400">Total Views</p>
                    <p className="text-lg font-bold text-white">{reportDetailModal.views}</p>
                  </div>
                </div>
                <div className="bg-slate-800/40 rounded-xl p-3 flex items-center gap-3">
                  <Download className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="text-xs text-slate-400">Downloads</p>
                    <p className="text-lg font-bold text-white">{reportDetailModal.downloads}</p>
                  </div>
                </div>
                <div className="bg-slate-800/40 rounded-xl p-3 flex items-center gap-3">
                  <Clock className="w-5 h-5 text-amber-400" />
                  <div>
                    <p className="text-xs text-slate-400">Last Generated</p>
                    <p className="text-sm font-semibold text-white">
                      {new Date(reportDetailModal.lastGenerated).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-sm font-semibold text-white mb-3">Data Points Included</h4>
              <div className="flex flex-wrap gap-2">
                {reportDetailModal.dataPoints.map((point, idx) => (
                  <span key={idx} className="px-3 py-1.5 bg-slate-800/40 border border-slate-700/50 rounded-lg text-xs text-slate-300">
                    {point}
                  </span>
                ))}
              </div>
            </div>

            {reportDetailModal.scheduled && reportDetailModal.nextScheduled && (
              <div className="mb-6 bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <h4 className="text-sm font-semibold text-green-400">Scheduled Report</h4>
                </div>
                <p className="text-sm text-slate-300">
                  Next generation scheduled for{' '}
                  <span className="font-bold text-white">
                    {new Date(reportDetailModal.nextScheduled).toLocaleDateString()}
                  </span>
                </p>
              </div>
            )}

            <div className="flex gap-3">
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-medium transition-all">
                <Download className="w-4 h-4" />
                Download Report
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800/40 hover:bg-slate-800/60 border border-slate-700/50 text-white rounded-xl font-medium transition-all">
                <RefreshCw className="w-4 h-4" />
                Regenerate
              </button>
              <button
                onClick={() => {
                  setReportDetailModal(null);
                  setScheduleModal(reportDetailModal);
                }}
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 text-purple-300 rounded-xl font-medium transition-all"
              >
                <Calendar className="w-4 h-4" />
                Schedule
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {exportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setExportModal(false)}
          />
          <div className="relative bg-slate-900 border border-slate-700/50 rounded-2xl p-6 max-w-lg w-full shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Export Analytics Data</h3>
              <button
                onClick={() => setExportModal(false)}
                className="p-2 hover:bg-slate-800/50 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Export Format</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { format: 'PDF', icon: FileText, desc: 'Formatted report' },
                    { format: 'Excel', icon: FileSpreadsheet, desc: 'Data spreadsheet' },
                    { format: 'CSV', icon: FileDown, desc: 'Raw data' },
                    { format: 'JSON', icon: FileDown, desc: 'API format' }
                  ].map((option) => (
                    <button
                      key={option.format}
                      className="flex items-center gap-3 p-3 bg-slate-800/40 border border-slate-700/50 rounded-xl hover:bg-slate-800/60 hover:border-amber-500/50 transition-all group"
                    >
                      <option.icon className="w-5 h-5 text-slate-400 group-hover:text-amber-400" />
                      <div className="text-left">
                        <p className="text-sm font-medium text-white">{option.format}</p>
                        <p className="text-xs text-slate-400">{option.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Time Range</label>
                <select className="w-full px-4 py-2.5 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:border-amber-500/50">
                  <option>Year to Date</option>
                  <option>Last Quarter</option>
                  <option>Last Month</option>
                  <option>Last Week</option>
                  <option>Custom Range...</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Include</label>
                <div className="space-y-2">
                  {['Summary Statistics', 'Detailed Metrics', 'Charts & Graphs', 'Trend Analysis', 'Recommendations'].map((item) => (
                    <label key={item} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-amber-500" />
                      <span className="text-sm text-slate-300">{item}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setExportModal(false)}
                className="flex-1 px-4 py-2.5 bg-slate-800/40 hover:bg-slate-800/60 border border-slate-700/50 rounded-xl text-white font-medium transition-all"
              >
                Cancel
              </button>
              <button className="flex-1 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-medium transition-all flex items-center justify-center gap-2">
                <Download className="w-4 h-4" />
                Export Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Modal */}
      {scheduleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setScheduleModal(false)}
          />
          <div className="relative bg-slate-900 border border-slate-700/50 rounded-2xl p-6 max-w-lg w-full shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Schedule Report</h3>
              <button
                onClick={() => setScheduleModal(false)}
                className="p-2 hover:bg-slate-800/50 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Report Name</label>
                <input
                  type="text"
                  value={scheduleModal.name || ''}
                  readOnly
                  className="w-full px-4 py-2.5 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:border-amber-500/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Frequency</label>
                <select className="w-full px-4 py-2.5 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:border-amber-500/50">
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>Bi-Weekly</option>
                  <option>Monthly</option>
                  <option>Quarterly</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Start Date</label>
                <input
                  type="date"
                  className="w-full px-4 py-2.5 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:border-amber-500/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Recipients (Email)</label>
                <textarea
                  placeholder="Enter email addresses separated by commas..."
                  rows="3"
                  className="w-full px-4 py-2.5 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-amber-500" />
                  <span className="text-sm text-slate-300">Automatically generate and send report</span>
                </label>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setScheduleModal(false)}
                className="flex-1 px-4 py-2.5 bg-slate-800/40 hover:bg-slate-800/60 border border-slate-700/50 rounded-xl text-white font-medium transition-all"
              >
                Cancel
              </button>
              <button className="flex-1 px-4 py-2.5 bg-purple-500 hover:bg-purple-600 text-white rounded-xl font-medium transition-all flex items-center justify-center gap-2">
                <PlayCircle className="w-4 h-4" />
                Activate Schedule
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Report Modal */}
      {customReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setCustomReportModal(false)}
          />
          <div className="relative bg-slate-900 border border-slate-700/50 rounded-2xl p-6 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
                  <Plus className="w-5 h-5 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Custom Report Builder</h3>
              </div>
              <button
                onClick={() => setCustomReportModal(false)}
                className="p-2 hover:bg-slate-800/50 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Report Name</label>
                <input
                  type="text"
                  placeholder="Enter custom report name..."
                  className="w-full px-4 py-2.5 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Data Sources</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Operations', 'Personnel', 'Budget', 'Crime Stats', 'Training', 'Fleet', 'Detention', 'Community'].map((source) => (
                    <label key={source} className="flex items-center gap-2 p-3 bg-slate-800/40 border border-slate-700/50 rounded-lg hover:bg-slate-800/60 cursor-pointer transition-colors">
                      <input type="checkbox" className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-purple-500" />
                      <span className="text-sm text-slate-300">{source}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Metrics to Include</label>
                <div className="space-y-2">
                  {['Trends & Patterns', 'Performance Indicators', 'Cost Analysis', 'Compliance Status', 'Predictive Analytics'].map((metric) => (
                    <label key={metric} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-purple-500" />
                      <span className="text-sm text-slate-300">{metric}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Time Range</label>
                  <select className="w-full px-4 py-2.5 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:border-amber-500/50">
                    <option>Last 30 Days</option>
                    <option>Last Quarter</option>
                    <option>Year to Date</option>
                    <option>Custom...</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Output Format</label>
                  <select className="w-full px-4 py-2.5 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:border-amber-500/50">
                    <option>PDF Report</option>
                    <option>Excel Workbook</option>
                    <option>Dashboard View</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setCustomReportModal(false)}
                className="flex-1 px-4 py-2.5 bg-slate-800/40 hover:bg-slate-800/60 border border-slate-700/50 rounded-xl text-white font-medium transition-all"
              >
                Cancel
              </button>
              <button className="flex-1 px-4 py-2.5 bg-purple-500 hover:bg-purple-600 text-white rounded-xl font-medium transition-all flex items-center justify-center gap-2">
                <Zap className="w-4 h-4" />
                Generate Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Comparison Modal */}
      {comparisonModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setComparisonModal(false)}
          />
          <div className="relative bg-slate-900 border border-slate-700/50 rounded-2xl p-6 max-w-4xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Performance Comparison</h3>
              </div>
              <button
                onClick={() => setComparisonModal(false)}
                className="p-2 hover:bg-slate-800/50 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <div className="mb-6">
              <div className="flex gap-2 mb-4">
                {[
                  { id: 'yoy', label: 'Year over Year' },
                  { id: 'mom', label: 'Month over Month' },
                  { id: 'qoq', label: 'Quarter over Quarter' }
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setSelectedComparison(option.id)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      selectedComparison === option.id
                        ? 'bg-blue-500 text-white'
                        : 'bg-slate-800/40 text-slate-300 hover:bg-slate-800/60'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-800/40 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-slate-400">Calls for Service</p>
                    <TrendingUp className="w-4 h-4 text-green-400" />
                  </div>
                  <p className="text-2xl font-bold text-white mb-1">+5.2%</p>
                  <p className="text-xs text-slate-500">145,678 vs 138,432</p>
                </div>
                <div className="bg-slate-800/40 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-slate-400">Response Time</p>
                    <TrendingDown className="w-4 h-4 text-green-400" />
                  </div>
                  <p className="text-2xl font-bold text-white mb-1">-12.3%</p>
                  <p className="text-xs text-slate-500">8.4 min vs 9.6 min</p>
                </div>
                <div className="bg-slate-800/40 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-slate-400">Clearance Rate</p>
                    <TrendingUp className="w-4 h-4 text-green-400" />
                  </div>
                  <p className="text-2xl font-bold text-white mb-1">+3.8%</p>
                  <p className="text-xs text-slate-500">68.5% vs 66.0%</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/40 rounded-xl p-4">
              <h4 className="text-sm font-semibold text-white mb-3">Division Comparison</h4>
              <div className="space-y-3">
                {[
                  { name: 'Patrol', current: 88, previous: 85, change: 3.5 },
                  { name: 'Investigations', current: 91, previous: 87, change: 4.6 },
                  { name: 'Detention', current: 87, previous: 89, change: -2.2 },
                  { name: 'Support Services', current: 85, previous: 83, change: 2.4 }
                ].map((div) => (
                  <div key={div.name} className="flex items-center gap-4">
                    <div className="w-32">
                      <p className="text-sm text-white font-medium">{div.name}</p>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-slate-700/50 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-blue-500 to-green-500" style={{ width: `${div.current}%` }} />
                        </div>
                        <span className="text-sm font-bold text-white w-12">{div.current}%</span>
                      </div>
                    </div>
                    <div className={`flex items-center gap-1 w-16 ${div.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {div.change >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                      <span className="text-sm font-bold">{Math.abs(div.change)}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setComparisonModal(false)}
                className="flex-1 px-4 py-2.5 bg-slate-800/40 hover:bg-slate-800/60 border border-slate-700/50 rounded-xl text-white font-medium transition-all"
              >
                Close
              </button>
              <button className="flex-1 px-4 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-all flex items-center justify-center gap-2">
                <Download className="w-4 h-4" />
                Export Comparison
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
