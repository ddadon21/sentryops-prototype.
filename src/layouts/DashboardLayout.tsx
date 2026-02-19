import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Home, Users, CheckCircle, DollarSign, TrendingUp,
  AlertCircle, Shield, ChevronLeft, ChevronRight, Menu,
  LogOut, Building2, Radio, Target, FileText, ShieldCheck, ChevronDown,
  Search, Bell, Settings, User
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebarCollapsed');
    return saved === 'true';
  });
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);
  const [staffingExpanded, setStaffingExpanded] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  // Persist sidebar collapsed state
  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', sidebarCollapsed.toString());
  }, [sidebarCollapsed]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.notifications-dropdown') && !target.closest('.notifications-trigger')) {
        setNotificationsOpen(false);
      }
      if (!target.closest('.profile-dropdown') && !target.closest('.profile-trigger')) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const navigation = [
    { id: 'command-overview', label: 'Command Overview', icon: Home, route: '/command/dashboard' },
    { id: 'daily-brief', label: 'Daily Command Brief', icon: FileText, route: '/command/brief' },
    { id: 'alerts', label: 'Command Alerts', icon: AlertCircle, badge: '3', route: '/command/alerts' },
    { id: 'approvals', label: 'Command Approvals', icon: CheckCircle, badge: '8', route: '/command/approvals' },
    { id: 'risk-compliance', label: 'Risk & Compliance', icon: ShieldCheck, route: '/command/risk' },
    { id: 'staffing', label: 'Staffing & Readiness', icon: Users, hasSubmenu: true },
    { id: 'custody', label: 'Custody Operations', icon: Building2, route: '/jail/dashboard' },
    { id: 'field-ops', label: 'Field Operations (Overview)', icon: Radio, route: '/patrol/cad' },
    { id: 'investigative', label: 'Investigative Oversight', icon: Target, route: '/investigations/cases' },
    { id: 'budget', label: 'Budget & Assets', icon: DollarSign, route: '/command/budget' },
    { id: 'reports', label: 'Reports & Compliance', icon: TrendingUp, route: '/command/reports' }
  ];

  const staffingSubmenu = [
    { id: 'staffing-overview', label: 'Staffing Overview', route: '/command/personnel' },
    { id: 'org-chart', label: 'Org Chart', route: '/command/orgchart' }
  ];

  const notifications = [
    { id: 1, title: 'Critical Incident - Detention', message: 'Use of force incident in B-Pod. Deputy Johnson. Review required.', time: '15 min ago', urgent: true },
    { id: 2, title: 'Facility Alert - HVAC Failure', message: 'H2-Pod temperature 84°F. Emergency repair needed.', time: '32 min ago', urgent: true },
    { id: 3, title: 'Staffing Emergency - B-Shift', message: '3 deputies out. Below minimum staffing.', time: '1 hour ago', urgent: true },
    { id: 4, title: 'Budget Approval Required', message: 'Q1 2025 Training Budget: $45,000', time: '2 hours ago', urgent: false },
    { id: 5, title: 'Leave Request Submitted', message: 'Deputy Marcus Chen - Dec 15-22', time: '3 hours ago', urgent: false }
  ];

  const handleNavigation = (item: typeof navigation[0]) => {
    if (item.hasSubmenu) {
      setStaffingExpanded(!staffingExpanded);
    } else if (item.route) {
      navigate(item.route);
      setSidebarOpen(false);
    }
  };

  const handleSubmenuNavigation = (route: string) => {
    navigate(route);
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    navigate('/signin');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex">
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 border-r border-slate-800/50 backdrop-blur-xl bg-slate-900/30 flex flex-col transform transition-all lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} ${sidebarCollapsed ? 'w-20' : 'w-64'}`}>
        <div className="p-4 border-b border-slate-700/50 flex items-center justify-between">
          {!sidebarCollapsed && (
            <div className="flex items-center gap-2">
              <Shield className="w-8 h-8 text-amber-500" />
              <h1 className="text-xl font-bold text-white">SentryOps</h1>
            </div>
          )}
          {sidebarCollapsed && (
            <Shield className="w-8 h-8 text-amber-500 mx-auto" />
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 hover:bg-slate-800/50 rounded-lg transition-colors hidden lg:block"
          >
            {sidebarCollapsed ? <ChevronRight className="w-5 h-5 text-slate-400" /> : <ChevronLeft className="w-5 h-5 text-slate-400" />}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {navigation.map(item => {
            const Icon = item.icon;
            const isActive = window.location.pathname === item.route;
            const isStaffingActive = item.id === 'staffing' &&
              (window.location.pathname === '/command/personnel' || window.location.pathname === '/command/orgchart');

            return (
              <div key={item.id}>
                <button
                  onClick={() => handleNavigation(item)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive || isStaffingActive ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                  } ${sidebarCollapsed ? 'justify-center' : ''}`}
                  title={sidebarCollapsed ? item.label : ''}
                >
                  <Icon className="w-[18px] h-[18px] flex-shrink-0" />
                  {!sidebarCollapsed && (
                    <>
                      <span className="flex-1 text-left text-sm font-medium truncate">{item.label}</span>
                      {item.badge && <span className={`px-2 py-0.5 rounded-full text-xs ${isActive ? 'bg-white/20' : 'bg-red-500 text-white'}`}>{item.badge}</span>}
                      {item.hasSubmenu && (
                        <ChevronDown className={`w-4 h-4 transition-transform ${staffingExpanded ? 'rotate-180' : ''}`} />
                      )}
                    </>
                  )}
                </button>

                {/* Staffing Submenu */}
                {item.hasSubmenu && staffingExpanded && !sidebarCollapsed && (
                  <div className="ml-4 mt-1 space-y-1">
                    {staffingSubmenu.map(sub => {
                      const isSubActive = window.location.pathname === sub.route;
                      return (
                        <button
                          key={sub.id}
                          onClick={() => handleSubmenuNavigation(sub.route)}
                          className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-all text-sm ${
                            isSubActive ? 'bg-amber-500/20 text-amber-400' : 'text-slate-500 hover:bg-slate-800/30 hover:text-slate-300'
                          }`}
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
                          <span>{sub.label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="border-t border-slate-700/50">
          {!sidebarCollapsed && (
            <div className="px-4 py-3">
              <p className="text-xs text-slate-500 text-center">Gwinnett County Sheriff's Office</p>
            </div>
          )}

          <div className="p-4">
            <button
              onClick={() => setLogoutConfirmOpen(true)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-slate-400 hover:bg-slate-800/40 hover:text-slate-300 ${sidebarCollapsed ? 'justify-center' : ''}`}
              title={sidebarCollapsed ? 'Sign Out' : ''}
            >
              <LogOut className="w-[18px] h-[18px] flex-shrink-0" />
              {!sidebarCollapsed && (
                <span className="flex-1 text-left text-sm font-medium">Sign Out</span>
              )}
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Logout Confirmation Modal */}
      {logoutConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setLogoutConfirmOpen(false)}
          />
          <div className="relative bg-slate-900 border border-slate-700/50 rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-slate-800/60 rounded-xl flex items-center justify-center">
                <LogOut className="w-6 h-6 text-slate-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Sign Out</h3>
                <p className="text-sm text-slate-400">Are you sure you want to sign out?</p>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setLogoutConfirmOpen(false)}
                className="flex-1 px-4 py-2.5 bg-slate-800/40 hover:bg-slate-800/60 border border-slate-700/50 rounded-xl text-white font-medium transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 px-4 py-2.5 bg-slate-700/40 hover:bg-slate-700/60 border border-slate-600/50 rounded-xl text-white font-medium transition-all"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Command Bar */}
        <header className="border-b border-slate-800/50 backdrop-blur-xl bg-slate-900/30 sticky top-0 z-30">
          <div className="px-4 lg:px-6 py-4 flex items-center justify-between gap-4">
            {/* Mobile menu button and Search */}
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 hover:bg-slate-800/50 rounded-lg"
              >
                <Menu className="w-5 h-5 text-slate-400" />
              </button>
              <div className="flex-1 max-w-lg relative hidden sm:block">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-1.5 bg-slate-800/30 border border-slate-700/30 rounded-lg text-sm text-white placeholder-slate-600 focus:outline-none focus:border-slate-600/50"
                />
              </div>
            </div>

            {/* Right side - Notifications and Profile */}
            <div className="flex items-center gap-2 lg:gap-3">
              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="notifications-trigger p-2 hover:bg-slate-800/50 rounded-lg relative"
                >
                  <Bell className="w-5 h-5 text-slate-400" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {notificationsOpen && (
                  <div className="notifications-dropdown absolute right-0 top-full mt-2 w-96 bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-xl shadow-2xl z-50">
                    <div className="p-4 border-b border-slate-700/50">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-white">Notifications</h3>
                        <span className="px-2 py-0.5 bg-red-500/20 border border-red-500/30 text-red-400 text-xs rounded-full">
                          {notifications.filter(n => n.urgent).length} urgent
                        </span>
                      </div>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map(notification => (
                        <div
                          key={notification.id}
                          className={`p-4 border-b border-slate-800/30 hover:bg-slate-800/30 cursor-pointer transition-colors ${
                            notification.urgent ? 'bg-amber-500/5' : ''
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                              notification.urgent ? 'bg-amber-400' : 'bg-blue-400'
                            }`}></div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-white mb-1">{notification.title}</p>
                              <p className="text-xs text-slate-400 mb-2">{notification.message}</p>
                              <p className="text-xs text-slate-500">{notification.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 border-t border-slate-700/50">
                      <button className="w-full text-center text-sm text-amber-400 hover:text-amber-300 font-medium">
                        View All Notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="h-8 w-px bg-slate-700/50 hidden sm:block"></div>

              {/* Profile Menu */}
              <div className="relative">
                <button
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  className="profile-trigger flex items-center gap-2 hover:bg-slate-800/50 rounded-lg p-1.5 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">ST</span>
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium text-white">Sheriff Thompson</p>
                    <p className="text-xs text-slate-400">Administrator</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-400 hidden sm:block" />
                </button>

                {profileMenuOpen && (
                  <div className="profile-dropdown absolute right-0 top-full mt-2 w-56 bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-xl shadow-2xl z-50">
                    <div className="p-3 border-b border-slate-700/50">
                      <p className="text-sm font-medium text-white">Sheriff Thompson</p>
                      <p className="text-xs text-slate-400">sheriff.thompson@gwinnettcounty.com</p>
                      <span className="inline-block mt-2 px-2 py-0.5 bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs rounded-full">
                        Administrator
                      </span>
                    </div>
                    <div className="p-2">
                      <button
                        onClick={() => {
                          setProfileMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800/50 hover:text-white transition-colors text-sm"
                      >
                        <User className="w-4 h-4" />
                        <span>My Profile</span>
                      </button>
                      <button
                        onClick={() => {
                          setProfileMenuOpen(false);
                          navigate('/command/settings');
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800/50 hover:text-white transition-colors text-sm"
                      >
                        <Settings className="w-4 h-4" />
                        <span>Settings</span>
                        <span className="ml-auto px-1.5 py-0.5 bg-slate-700/50 text-slate-400 text-xs rounded">Admin</span>
                      </button>
                    </div>
                    <div className="p-2 border-t border-slate-700/50">
                      <button
                        onClick={() => {
                          setProfileMenuOpen(false);
                          setLogoutConfirmOpen(true);
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:bg-slate-800/50 hover:text-red-400 transition-colors text-sm"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
