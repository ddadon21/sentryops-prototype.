import React, { useMemo, useState } from 'react';
import {
  AlertCircle,
  Bell,
  Building2,
  Calendar,
  CheckCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  Download,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  Radio,
  Settings,
  Shield,
  Target,
  TrendingUp,
  Users,
  X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const buttonStyles = {
  primary: 'px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-lg border border-blue-500 transition-colors',
  secondary: 'px-3 py-2 bg-transparent hover:bg-slate-800 text-slate-200 text-sm font-semibold rounded-lg border border-slate-600 transition-colors',
  destructive: 'px-3 py-2 bg-red-600 hover:bg-red-500 text-white text-sm font-semibold rounded-lg border border-red-500 transition-colors',
  success: 'px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-lg border border-emerald-500 transition-colors'
};

const navigation = [
  { id: 'dashboard', label: 'Executive Dashboard', icon: Home, route: '/command/dashboard' },
  { id: 'detention', label: 'Detention Operations', icon: Building2, route: '/jail/dashboard' },
  { id: 'patrol', label: 'Patrol Operations', icon: Radio, route: '/patrol/cad' },
  { id: 'investigations', label: 'Criminal Investigations', icon: Target, route: '/investigations/cases' },
  { id: 'personnel', label: 'Personnel Overview', icon: Users, route: '/command/personnel' },
  { id: 'org-chart', label: 'Org Chart', icon: LayoutDashboard, route: '/command/orgchart' },
  { id: 'approvals', label: 'Approvals', icon: CheckCircle, badge: '8', route: '/command/approvals' },
  { id: 'budget', label: 'Budget & Assets', icon: DollarSign, route: '/command/budget' },
  { id: 'reports', label: 'Reports & Analytics', icon: TrendingUp, route: '/command/reports' },
  { id: 'alerts', label: 'Command Alerts', icon: AlertCircle, badge: '3', route: '/command/alerts' },
  { id: 'settings', label: 'Settings', icon: Settings, route: '/command/settings' }
];

const monthlyTrend = [
  { month: 'Jan', spent: 3.80, budget: 4.04 },
  { month: 'Feb', spent: 3.75, budget: 4.04 },
  { month: 'Mar', spent: 3.90, budget: 4.04 },
  { month: 'Apr', spent: 3.85, budget: 4.04 },
  { month: 'May', spent: 3.92, budget: 4.04 },
  { month: 'Jun', spent: 3.98, budget: 4.04 },
  { month: 'Jul', spent: 4.10, budget: 4.04 },
  { month: 'Aug', spent: 4.05, budget: 4.04 },
  { month: 'Sep', spent: 3.90, budget: 4.04 },
  { month: 'Oct', spent: 3.98, budget: 4.04 }
];

const initialDecisionCards = [
  {
    id: 'ot',
    title: 'Overtime Overrun Risk',
    status: 'CRITICAL',
    note: 'Patrol overtime is pacing 14% above allocation for remaining period.',
    recommendation: 'Authorize capped overtime blocks + shift rebalance this week.',
    actionLabel: 'Reduce Spending Plan',
    actionType: 'reduce'
  },
  {
    id: 'fleet',
    title: 'Fleet Maintenance Exposure',
    status: 'WARNING',
    note: 'Deferred service orders could increase emergency repair costs next cycle.',
    recommendation: 'Move $120K from training reserve into preventive maintenance.',
    actionLabel: 'Reallocate Budget',
    actionType: 'reallocate'
  },
  {
    id: 'procurement',
    title: 'Procurement Controls Stable',
    status: 'STABLE',
    note: 'Quarterly purchasing controls reduced discretionary spend variance by 3.8%.',
    recommendation: 'Retain controls and refresh forecast assumptions for Q4.',
    actionLabel: 'Adjust Forecast',
    actionType: 'forecast'
  }
];

export default function BudgetResources() {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);
  const [timeRange, setTimeRange] = useState('Year to Date');

  const [decisionCards, setDecisionCards] = useState(initialDecisionCards);
  const [showReduceModal, setShowReduceModal] = useState(false);
  const [showForecastModal, setShowForecastModal] = useState(false);
  const [showVarianceModal, setShowVarianceModal] = useState(false);
  const [reallocateOpen, setReallocateOpen] = useState(false);

  const [planApplied, setPlanApplied] = useState(false);
  const [projectionDelta, setProjectionDelta] = useState(0.35);
  const [forecastAdjustment, setForecastAdjustment] = useState(0.1);

  const totals = {
    totalBudget: 48.5,
    spent: 41.23,
    committed: 3.8,
    available: 3.47,
    percentSpent: 85,
    daysRemaining: 72
  };

  const projectedCurrent = useMemo(() => totals.spent + totals.committed + projectionDelta, [projectionDelta, totals.spent, totals.committed]);
  const projectedWithControls = useMemo(() => totals.spent + totals.committed - Math.max(0.22, forecastAdjustment), [forecastAdjustment, totals.spent, totals.committed]);

  const handleNavigation = (item) => {
    navigate(item.route);
    setSidebarOpen(false);
  };

  const statusTone = (status) => {
    if (status === 'CRITICAL') return 'text-red-400 border-red-500/40 bg-red-500/10';
    if (status === 'WARNING') return 'text-amber-400 border-amber-500/40 bg-amber-500/10';
    return 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10';
  };

  const trendTone = (ratio) => {
    if (ratio > 100) return 'text-red-400';
    if (ratio > 95) return 'text-amber-400';
    return 'text-emerald-400';
  };

  const applyRecommendedPlan = () => {
    setPlanApplied(true);
    setProjectionDelta(-0.18);
    setDecisionCards((cards) => cards.map((card) => (
      card.id === 'ot'
        ? { ...card, status: 'WARNING', note: 'Overtime spend normalized after capped authorization windows.' }
        : card
    )));
  };

  const exportReport = () => {
    const lines = [
      'Budget & Assets Report',
      `Range: ${timeRange}`,
      `Total Budget: $${totals.totalBudget.toFixed(2)}M`,
      `Spent: $${totals.spent.toFixed(2)}M (${totals.percentSpent}%)`,
      `Projected Current Pace: $${projectedCurrent.toFixed(2)}M`,
      `Projected With Controls: $${projectedWithControls.toFixed(2)}M`
    ];
    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'budget-assets-report.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  const runCardAction = (type) => {
    if (type === 'reduce') setShowReduceModal(true);
    if (type === 'reallocate') setReallocateOpen(true);
    if (type === 'forecast') setShowForecastModal(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex">
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 border-r border-slate-800 bg-slate-900 flex flex-col transform transition-all lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} ${sidebarCollapsed ? 'w-20' : 'w-64'}`}>
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          {!sidebarCollapsed && (
            <div className="flex items-center gap-2">
              <Shield className="w-8 h-8 text-blue-500" />
              <h1 className="text-xl font-bold text-white">SentryOps</h1>
            </div>
          )}
          {sidebarCollapsed && <Shield className="w-8 h-8 text-blue-500 mx-auto" />}
          <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="p-2 hover:bg-slate-800 rounded-lg transition-colors hidden lg:block">
            {sidebarCollapsed ? <ChevronRight className="w-5 h-5 text-slate-400" /> : <ChevronLeft className="w-5 h-5 text-slate-400" />}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = window.location.pathname === item.route;
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-slate-800 border border-slate-700 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!sidebarCollapsed && (
                  <>
                    <span className="font-medium text-sm flex-1 text-left">{item.label}</span>
                    {item.badge && <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">{item.badge}</span>}
                  </>
                )}
              </button>
            );
          })}
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <header className="sticky top-0 z-40 bg-slate-950/95 border-b border-slate-800 backdrop-blur-sm">
          <div className="px-4 lg:px-6 py-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
                <Menu className="w-5 h-5" />
              </button>
              <div className="text-sm text-slate-400">Command / Budget & Assets</div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setNotificationsOpen(!notificationsOpen)} className="relative p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <button onClick={() => setLogoutConfirmOpen(true)} className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        <div className="p-4 lg:p-6 space-y-5">
          <section className="border border-slate-800 bg-slate-900 rounded-xl p-4 lg:p-5">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl font-bold text-white">Budget & Assets</h1>
                  <span className="text-xs font-semibold px-2 py-1 rounded-md border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">Fiscal Active</span>
                </div>
                <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
                  <span className="text-slate-400">Total Budget <span className="text-white font-semibold">${totals.totalBudget.toFixed(1)}M</span></span>
                  <span className="text-slate-400">Spent <span className="text-white font-semibold">${totals.spent.toFixed(2)}M ({totals.percentSpent}%)</span></span>
                  <span className="text-slate-400">Available <span className="text-emerald-400 font-semibold">${totals.available.toFixed(2)}M</span></span>
                  <span className="text-slate-400">Days Remaining <span className="text-white font-semibold">{totals.daysRemaining}</span></span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button className={buttonStyles.secondary} onClick={() => setTimeRange(timeRange === 'Year to Date' ? 'Quarter to Date' : 'Year to Date')}>
                  {timeRange} <ChevronDown className="w-4 h-4 inline ml-1" />
                </button>
                <button className={buttonStyles.secondary} onClick={() => setShowVarianceModal(true)}>Variance</button>
                <button className={buttonStyles.secondary} onClick={() => setReallocateOpen(true)}>Reallocate</button>
                <button className={buttonStyles.primary} onClick={exportReport}><Download className="w-4 h-4 inline mr-1" />Export</button>
              </div>
            </div>
          </section>

          <section className="border border-red-500/40 bg-slate-900 rounded-xl p-4 lg:p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <h2 className="text-lg font-semibold text-white">Budget Risk Detected</h2>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded border border-red-500/40 bg-red-500/10 text-red-400">CRITICAL</span>
                </div>
                <p className="text-slate-200 mb-2">Projected overrun: <span className="text-red-400 font-semibold">$420K</span> if current pace continues through fiscal close.</p>
                <ul className="text-sm text-slate-300 space-y-1 list-disc pl-5">
                  <li>Overtime outpacing authorization windows in Patrol and Detention.</li>
                  <li>Emergency vehicle repairs exceeded monthly reserve by $96K.</li>
                  <li>Unplanned evidence storage contract extension impacts Q4 line items.</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <button className={buttonStyles.primary} onClick={() => setShowReduceModal(true)}>Reduce Spending Plan</button>
              <button className={buttonStyles.secondary} onClick={() => setReallocateOpen(true)}>Reallocate Budget</button>
            </div>
          </section>

          {decisionCards.map((card) => (
            <section key={card.id} className="border border-slate-800 bg-slate-900 rounded-xl p-4 lg:p-5 hover:border-slate-700 transition-colors">
              <div className="flex items-start justify-between gap-4 mb-2">
                <h3 className="text-base font-semibold text-white">{card.title}</h3>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded border ${statusTone(card.status)}`}>{card.status}</span>
              </div>
              <p className="text-sm text-slate-300 mb-2">{card.note}</p>
              <p className="text-sm text-slate-200"><span className="text-slate-400">Recommendation:</span> {card.recommendation}</p>
              <div className="mt-3">
                <button className={buttonStyles.primary} onClick={() => runCardAction(card.actionType)}>{card.actionLabel}</button>
              </div>
            </section>
          ))}

          <section className="border border-slate-800 bg-slate-900 rounded-xl p-4 lg:p-5">
            <div className="flex items-center justify-between gap-3 mb-2">
              <h3 className="text-base font-semibold text-white">Budget Forecast</h3>
              {planApplied && <span className="text-[11px] font-semibold px-2 py-0.5 rounded border border-emerald-500/40 bg-emerald-500/10 text-emerald-400">Recommended Plan Active</span>}
            </div>
            <p className="text-sm text-slate-300 mb-3">
              Current trajectory is {projectedCurrent > totals.totalBudget ? <span className="text-red-400 font-semibold">over budget</span> : <span className="text-emerald-400 font-semibold">under budget</span>} at fiscal close.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between border border-slate-800 rounded-lg p-3">
                <span className="text-slate-300">Current pace</span>
                <span className={`${projectedCurrent > totals.totalBudget ? 'text-red-400' : 'text-emerald-400'} font-semibold`}>${projectedCurrent.toFixed(2)}M</span>
              </div>
              <div className="flex items-center justify-between border border-emerald-500/40 bg-emerald-500/5 rounded-lg p-3">
                <span className="text-slate-300">With controls (recommended)</span>
                <span className="text-emerald-400 font-semibold">${projectedWithControls.toFixed(2)}M</span>
              </div>
            </div>
            <div className="mt-3 flex gap-2">
              <button className={buttonStyles.success} onClick={applyRecommendedPlan}>Apply Recommended Plan</button>
              <button className={buttonStyles.secondary} onClick={() => setShowForecastModal(true)}>Adjust Forecast</button>
            </div>
          </section>

          <section className="border border-slate-800 bg-slate-900 rounded-xl p-4 lg:p-5">
            <h3 className="text-base font-semibold text-white mb-3">Fiscal Progress</h3>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden mb-3">
              <div className="h-full bg-slate-500" style={{ width: `${totals.percentSpent}%` }} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
              <div className="border border-slate-800 rounded-lg p-3"><p className="text-slate-400">Spent</p><p className="text-white font-semibold">${totals.spent.toFixed(2)}M</p></div>
              <div className="border border-slate-800 rounded-lg p-3"><p className="text-slate-400">Committed</p><p className="text-amber-400 font-semibold">${totals.committed.toFixed(2)}M</p></div>
              <div className="border border-slate-800 rounded-lg p-3"><p className="text-slate-400">Available</p><p className="text-emerald-400 font-semibold">${totals.available.toFixed(2)}M</p></div>
            </div>
            {projectedCurrent > totals.totalBudget && (
              <p className="text-xs text-red-400 mt-2">Projected overrun marker: +${(projectedCurrent - totals.totalBudget).toFixed(2)}M.</p>
            )}
          </section>

          <section className="border border-slate-800 bg-slate-900 rounded-xl p-4 lg:p-5">
            <h3 className="text-base font-semibold text-white mb-3">Monthly Trend</h3>
            <div className="space-y-2">
              {monthlyTrend.map((item) => {
                const ratio = (item.spent / item.budget) * 100;
                return (
                  <div key={item.month} className="border border-slate-800 rounded-lg px-3 py-2 flex items-center justify-between text-sm">
                    <span className="text-slate-200 w-12">{item.month}</span>
                    <span className="text-slate-300">${item.spent.toFixed(2)}M</span>
                    <span className={`${trendTone(ratio)} font-semibold`}>{ratio.toFixed(1)}%</span>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </main>

      {notificationsOpen && (
        <div className="fixed top-16 right-4 w-80 bg-slate-900 border border-slate-700 rounded-xl p-4 z-50">
          <div className="flex items-center justify-between mb-2"><h4 className="text-white font-semibold">Notifications</h4><button onClick={() => setNotificationsOpen(false)}><X className="w-4 h-4 text-slate-400" /></button></div>
          <div className="space-y-2 text-sm text-slate-300">
            <p className="border border-slate-800 rounded-lg p-2">Budget approval queue updated.</p>
            <p className="border border-slate-800 rounded-lg p-2">Overtime threshold reached in Patrol.</p>
            <p className="border border-slate-800 rounded-lg p-2">Forecast refresh available for Q4.</p>
          </div>
        </div>
      )}

      {logoutConfirmOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-sm bg-slate-900 border border-slate-700 rounded-xl p-4">
            <h4 className="text-white font-semibold mb-2">Sign out?</h4>
            <p className="text-sm text-slate-400 mb-4">You will return to the sign-in page.</p>
            <div className="flex justify-end gap-2">
              <button className={buttonStyles.secondary} onClick={() => setLogoutConfirmOpen(false)}>Cancel</button>
              <button className={buttonStyles.destructive} onClick={() => navigate(createPageUrl('SignIn'))}>Sign Out</button>
            </div>
          </div>
        </div>
      )}

      {showReduceModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-xl p-5">
            <h4 className="text-white font-semibold mb-2">Reduce Spending Plan</h4>
            <p className="text-sm text-slate-300 mb-4">Activate overtime caps and suspend non-critical procurement for 30 days.</p>
            <div className="flex justify-end gap-2">
              <button className={buttonStyles.secondary} onClick={() => setShowReduceModal(false)}>Cancel</button>
              <button className={buttonStyles.success} onClick={() => { setProjectionDelta(0.12); setShowReduceModal(false); }}>Apply Plan</button>
            </div>
          </div>
        </div>
      )}

      {showForecastModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-xl p-5">
            <h4 className="text-white font-semibold mb-3">Adjust Forecast</h4>
            <label className="text-sm text-slate-300 block mb-2">Control impact adjustment (in millions): {forecastAdjustment.toFixed(2)}</label>
            <input
              type="range"
              min="0.05"
              max="0.45"
              step="0.01"
              value={forecastAdjustment}
              onChange={(e) => setForecastAdjustment(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-end gap-2 mt-4">
              <button className={buttonStyles.secondary} onClick={() => setShowForecastModal(false)}>Close</button>
              <button className={buttonStyles.primary} onClick={() => setShowForecastModal(false)}>Save Forecast</button>
            </div>
          </div>
        </div>
      )}

      {showVarianceModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-xl p-5">
            <h4 className="text-white font-semibold mb-2">Variance Summary</h4>
            <ul className="text-sm text-slate-300 space-y-1 list-disc pl-4 mb-4">
              <li>Personnel variance: -$180K driven by overtime usage.</li>
              <li>Fleet variance: -$96K from unscheduled repairs.</li>
              <li>Training variance: +$74K under plan.</li>
            </ul>
            <div className="flex justify-end"><button className={buttonStyles.secondary} onClick={() => setShowVarianceModal(false)}>Close</button></div>
          </div>
        </div>
      )}

      {reallocateOpen && (
        <div className="fixed inset-y-0 right-0 w-full max-w-md bg-slate-900 border-l border-slate-700 z-50 p-5">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-white font-semibold">Reallocate Budget</h4>
            <button onClick={() => setReallocateOpen(false)} className="text-slate-400 hover:text-white"><X className="w-4 h-4" /></button>
          </div>
          <p className="text-sm text-slate-300 mb-3">Move funds from low-risk lines into critical overtime and maintenance needs.</p>
          <div className="space-y-2 text-sm mb-4">
            <div className="border border-slate-800 rounded-lg p-3 text-slate-300">From: Training Reserve <span className="text-white float-right">$120K</span></div>
            <div className="border border-slate-800 rounded-lg p-3 text-slate-300">To: Patrol Overtime <span className="text-white float-right">$80K</span></div>
            <div className="border border-slate-800 rounded-lg p-3 text-slate-300">To: Fleet Maintenance <span className="text-white float-right">$40K</span></div>
          </div>
          <div className="flex gap-2">
            <button className={buttonStyles.secondary} onClick={() => setReallocateOpen(false)}>Cancel</button>
            <button className={buttonStyles.primary} onClick={() => { setProjectionDelta(0.2); setReallocateOpen(false); }}>Confirm Reallocation</button>
          </div>
        </div>
      )}

      {sidebarOpen && <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}
    </div>
  );
}
