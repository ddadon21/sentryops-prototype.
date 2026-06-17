import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Home, Users, CheckCircle, DollarSign, TrendingUp,
  AlertCircle, Shield, ChevronLeft, ChevronRight, Menu,
  LogOut, Building2, Radio, Target, FileText, Layers, ChevronDown,
  Search, Bell, Settings, User, Circle, Calendar
} from 'lucide-react';
import { useActivity, type ActivitySeverity } from '../contexts/ActivityContext';

// ── Shared types ──────────────────────────────────────────────

interface NavSubItem {
  id: string;
  label: string;
  route: string;
}

export interface NavItem {
  id: string;
  label: string;
  type?: 'section';
  icon?: React.ComponentType<any>;
  route?: string;
  badge?: string;
  hasSubmenu?: boolean;
  submenu?: NavSubItem[];
}

export interface ProfileConfig {
  name: string;
  role: string;
  email: string;
  initials: string;
}

export interface NotificationItem {
  id: number | string;
  title: string;
  message: string;
  time: string;
  category: 'assignment' | 'approval' | 'reminder' | 'system';
  read?: boolean;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  navigation?: NavItem[];
  profile?: ProfileConfig;
  notifications?: NotificationItem[];
  settingsRoute?: string;
  orgLabel?: string;
}

// ── Default config (Command module) ───────────────────────────

const defaultNavigation: NavItem[] = [
  { id: 'command-overview',   label: 'Executive Command Center', icon: Home,         route: '/command/dashboard' },
  { id: 'executive-briefing', label: 'Executive Briefing',       icon: FileText,     route: '/command/brief' },
  { id: 'war-room',           label: 'Command War Room',         icon: Target,       route: '/command/warroom' },
  { id: 'decision-layer',     label: 'Agency Risk Center',       icon: Layers,       route: '/command/risk' },
  { id: 'activity',           label: 'Agency Activity Feed',     icon: Bell,         route: '/activity' },
  { id: 'alerts',             label: 'Command Notifications Center', icon: AlertCircle,  badge: '7', route: '/command/alerts' },
  { id: 'approvals',          label: 'Decision Center',          icon: CheckCircle,  badge: '8', route: '/command/approvals' },
  { id: 'calendar',           label: 'Operational Timeline',     icon: Calendar,     route: '/command/calendar' },
  { id: 'section-agency',     label: 'Agency Operations',        type: 'section' },
  { id: 'staffing',           label: 'Workforce Readiness',      icon: Users,        hasSubmenu: true, submenu: [
    { id: 'staffing-overview', label: 'Workforce Readiness', route: '/command/personnel' },
    { id: 'org-chart',         label: 'Org Chart',           route: '/command/orgchart' },
  ]},
  { id: 'detention-command',  label: 'Detention Command Center', icon: Shield,       route: '/jail/command' },
  { id: 'custody',            label: 'Custody Operations',       icon: Building2,    route: '/jail/custody' },
  { id: 'field-ops',          label: 'Field Operations',         icon: Radio,        route: '/patrol/cad' },
  { id: 'investigative',      label: 'Investigative Oversight',  icon: Target,       route: '/investigations/cases' },
  { id: 'section-business',   label: 'Business & Compliance',    type: 'section' },
  { id: 'budget',             label: 'Budget & Assets',          icon: DollarSign,   route: '/command/budget' },
  { id: 'reports',            label: 'Performance & Compliance', icon: TrendingUp,   route: '/command/reports' },
];

const defaultProfile: ProfileConfig = {
  name: 'Sheriff Thompson',
  role: 'Administrator',
  email: 'sheriff.thompson@gwinnettcounty.com',
  initials: 'ST'
};

const defaultNotifications: NotificationItem[] = [
  { id: 1, title: 'Fleet Maintenance alert assigned to you', message: '6 vehicles out of service — review required', time: '12 min ago', category: 'assignment' },
  { id: 2, title: 'Budget review submitted for approval', message: 'Q1 2025 Training Budget: $45,000', time: '1 hour ago', category: 'approval' },
  { id: 3, title: 'POST certification expiring in 7 days', message: 'Firearms qualification — schedule renewal', time: '2 hours ago', category: 'reminder' },
  { id: 4, title: 'Training session confirmed', message: 'Defensive tactics refresher — Dec 18 at 0800', time: '3 hours ago', category: 'reminder', read: true },
  { id: 5, title: 'Overtime request awaiting your approval', message: 'Deputy Chen — B-Shift coverage 6 hrs', time: '4 hours ago', category: 'approval' },
  { id: 6, title: 'Leave request approved', message: 'Deputy Marcus Chen — Dec 15-22', time: '5 hours ago', category: 'system', read: true }
];

// ── Helpers: merge live agency activity with any page-supplied static items ──

function formatRelativeTime(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days > 1 ? 's' : ''} ago`;
}

const severityToCategory: Record<ActivitySeverity, NotificationItem['category']> = {
  info: 'system',
  success: 'system',
  warning: 'reminder',
  critical: 'assignment',
};

// ── Component ─────────────────────────────────────────────────

export default function DashboardLayout({
  children,
  navigation = defaultNavigation,
  profile = defaultProfile,
  notifications = defaultNotifications,
  settingsRoute = '/command/settings',
  orgLabel = 'Gwinnett County Sheriff\'s Office'
}: DashboardLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { events, unreadCount, markRead, markAllRead } = useActivity();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebarCollapsed');
    return saved === 'true';
  });
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);
  const [expandedSubmenu, setExpandedSubmenu] = useState<string | null>(null);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', sidebarCollapsed.toString());
  }, [sidebarCollapsed]);

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

  // Merge live, cross-module agency events with any page-supplied static notifications.
  const liveItems: (NotificationItem & { route?: string; isLive: boolean })[] = events
    .slice(0, 15)
    .map(e => ({
      id: e.id,
      title: e.title,
      message: e.message,
      time: formatRelativeTime(e.timestamp),
      category: severityToCategory[e.severity],
      read: e.read,
      route: e.route,
      isLive: true,
    }));
  const staticItems = notifications.map(n => ({ ...n, isLive: false as const }));
  const mergedNotifications = [...liveItems, ...staticItems];
  const totalUnread = unreadCount + staticItems.filter(n => !n.read).length;

  const handleNotificationClick = (item: NotificationItem & { route?: string; isLive?: boolean }) => {
    if (item.isLive) markRead(String(item.id));
    if (item.route) {
      navigate(item.route);
      setNotificationsOpen(false);
    }
  };

  const handleNavigation = (item: NavItem) => {
    if (item.hasSubmenu) {
      setExpandedSubmenu(expandedSubmenu === item.id ? null : item.id);
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

  const isNavActive = (item: NavItem): boolean => {
    if (item.route) return location.pathname === item.route;
    if (item.hasSubmenu && item.submenu) {
      return item.submenu.some(sub => location.pathname === sub.route);
    }
    return false;
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] dark:bg-gradient-to-br dark:from-slate-950 dark:via-[#0d1424] dark:to-slate-950 flex">
      {/* ── Sidebar ──────────────────────────────────────── */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 border-r border-black/[0.06] dark:border-slate-800/30 bg-white dark:bg-slate-900/60 shadow-[var(--shadow-sidebar)] dark:shadow-none flex flex-col transform transition-all lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} ${sidebarCollapsed ? 'w-20' : 'w-64'}`}>
        {/* Logo */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          {!sidebarCollapsed && (
            <div className="flex items-center gap-2">
              <Shield className="w-8 h-8 text-amber-700" />
              <h1 className="text-xl font-bold text-primary">SentryOps</h1>
            </div>
          )}
          {sidebarCollapsed && (
            <Shield className="w-8 h-8 text-amber-700 mx-auto" />
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-lg transition-colors hidden lg:block"
          >
            {sidebarCollapsed ? <ChevronRight className="w-5 h-5 text-muted" /> : <ChevronLeft className="w-5 h-5 text-muted" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {navigation.map(item => {
            // Section label
            if (item.type === 'section') {
              if (sidebarCollapsed) return null;
              return (
                <div key={item.id} className="pt-4 pb-1 px-2">
                  <p className="text-[9.5px] font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest">{item.label}</p>
                </div>
              );
            }

            const Icon = item.icon!;
            const isActive = isNavActive(item);

            return (
              <div key={item.id}>
                <button
                  onClick={() => handleNavigation(item)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
                    isActive
                      ? 'bg-amber-100 dark:bg-slate-700/40 text-primary border-l-4 border-l-amber-500 font-semibold'
                      : 'text-secondary hover:bg-slate-50 dark:hover:bg-slate-800/30 hover:text-slate-900 dark:hover:text-slate-300'
                  } ${sidebarCollapsed ? 'justify-center' : ''}`}
                  title={sidebarCollapsed ? item.label : ''}
                >
                  <Icon className="w-[18px] h-[18px] flex-shrink-0" />
                  {!sidebarCollapsed && (
                    <>
                      <span className="flex-1 text-left text-[13px] font-medium truncate">{item.label}</span>
                      {item.badge && (
                        <span className={`px-1.5 py-0.5 rounded-full text-[11px] ${
                          isActive ? 'bg-slate-300 dark:bg-white/10 text-slate-800 dark:text-white' : 'bg-red-100 dark:bg-red-500/15 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-500/20'
                        }`}>{item.badge}</span>
                      )}
                      {item.hasSubmenu && (
                        <ChevronDown className={`w-4 h-4 transition-transform ${expandedSubmenu === item.id ? 'rotate-180' : ''}`} />
                      )}
                    </>
                  )}
                </button>

                {/* Submenu */}
                {item.hasSubmenu && item.submenu && expandedSubmenu === item.id && !sidebarCollapsed && (
                  <div className="ml-4 mt-1 space-y-0.5">
                    {item.submenu.map(sub => {
                      const isSubActive = location.pathname === sub.route;
                      return (
                        <button
                          key={sub.id}
                          onClick={() => handleSubmenuNavigation(sub.route)}
                          className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-all text-[13px] ${
                            isSubActive ? 'bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400' : 'text-slate-700 dark:text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800/30 hover:text-slate-900 dark:hover:text-slate-300'
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

        {/* Footer */}
        <div className="border-t border-border">
          {!sidebarCollapsed && (
            <div className="px-4 py-3">
              <p className="text-xs text-muted text-center">{orgLabel}</p>
            </div>
          )}
          <div className="p-4">
            <button
              onClick={() => setLogoutConfirmOpen(true)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all text-secondary hover:bg-slate-200 dark:hover:bg-slate-800/30 hover:text-slate-900 dark:hover:text-slate-300 ${sidebarCollapsed ? 'justify-center' : ''}`}
              title={sidebarCollapsed ? 'Sign Out' : ''}
            >
              <LogOut className="w-[18px] h-[18px] flex-shrink-0" />
              {!sidebarCollapsed && (
                <span className="flex-1 text-left text-[13px] font-medium">Sign Out</span>
              )}
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Logout Confirmation ────────────────────────── */}
      {logoutConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setLogoutConfirmOpen(false)}
          />
          <div className="relative bg-white dark:bg-slate-900 border border-border rounded-xl p-6 max-w-sm w-full shadow-2xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800/60 rounded-xl flex items-center justify-center">
                <LogOut className="w-6 h-6 text-muted" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-primary">Sign Out</h3>
                <p className="text-sm text-muted">Are you sure you want to sign out?</p>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setLogoutConfirmOpen(false)}
                className="flex-1 px-4 py-2.5 bg-white dark:bg-slate-800/40 hover:bg-slate-50 dark:hover:bg-slate-800/60 border border-slate-300 dark:border-slate-700/50 rounded-xl text-slate-700 dark:text-white font-medium transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 dark:bg-red-600/80 dark:hover:bg-red-600 rounded-xl text-white font-medium transition-all shadow-sm"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Main Content Area ──────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="border-b border-black/[0.06] dark:border-slate-800/50 backdrop-blur-md bg-[#F8FAFC]/90 dark:bg-slate-900/60 sticky top-0 z-30 shadow-[var(--shadow-nav)] dark:shadow-none">
          <div className="px-4 lg:px-6 py-4 flex items-center justify-between gap-4">
            {/* Left: mobile menu + compact search */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-lg"
              >
                <Menu className="w-5 h-5 text-muted" />
              </button>
              <div className="w-44 relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted" />
                <input
                  type="text"
                  placeholder="Quick search…"
                  className="w-full pl-9 pr-3 py-1.5 bg-white dark:bg-slate-800/40 border border-black/[0.08] dark:border-slate-700/40 rounded-lg text-[12px] text-primary placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-300 dark:focus:border-slate-600 shadow-[0_1px_2px_rgba(0,0,0,0.04)] dark:shadow-none"
                />
              </div>
            </div>

            {/* Right: sync, notifications, profile */}
            <div className="flex items-center gap-2 lg:gap-3">
              {/* Sync indicator */}
              <div className="hidden lg:flex items-center gap-1.5 text-[11px] text-muted">
                <Circle className="w-1.5 h-1.5 fill-emerald-500 text-emerald-500" />
                <span>Sync Healthy</span>
                <span className="text-slate-500 dark:text-slate-600">· 2m ago</span>
              </div>
              <div className="h-6 w-px bg-slate-200 dark:bg-slate-700/30 hidden lg:block"></div>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="notifications-trigger p-2 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-lg relative"
                >
                  <Bell className="w-5 h-5 text-muted" />
                  {totalUnread > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                </button>

                {notificationsOpen && (
                  <div className="notifications-dropdown absolute right-0 top-full mt-2 w-80 bg-surface-raised backdrop-blur-xl border border-border rounded-xl shadow-2xl z-50">
                    <div className="p-4 border-b border-border flex items-center justify-between">
                      <div>
                        <h3 className="text-[13px] font-semibold text-primary">Notifications</h3>
                        <span className="text-xs text-muted">{totalUnread} unread</span>
                      </div>
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllRead}
                          className="text-[11px] font-medium text-amber-600 dark:text-amber-400 hover:underline"
                        >
                          Mark all read
                        </button>
                      )}
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {mergedNotifications.map(notification => (
                        <div
                          key={notification.id}
                          onClick={() => handleNotificationClick(notification)}
                          className="p-4 border-b border-slate-100 dark:border-slate-800/30 hover:bg-slate-50 dark:hover:bg-slate-800/30 cursor-pointer transition-colors"
                        >
                          <div className="flex items-start gap-3">
                            <div className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${
                              notification.read ? 'bg-slate-300 dark:bg-slate-600' : 'bg-slate-500 dark:bg-slate-400'
                            }`}></div>
                            <div className="flex-1 min-w-0">
                              <p className="text-[13px] font-medium text-primary mb-1">{notification.title}</p>
                              <p className="text-xs text-muted mb-2">{notification.message}</p>
                              <p className="text-xs text-muted">{notification.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 border-t border-border">
                      <button
                        onClick={() => { setNotificationsOpen(false); navigate('/activity'); }}
                        className="w-full text-center text-[13px] text-muted hover:text-slate-700 dark:hover:text-slate-300 font-medium"
                      >
                        View All Activity
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="h-8 w-px bg-slate-200 dark:bg-slate-700/50 hidden sm:block"></div>

              {/* Profile */}
              <div className="relative">
                <button
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  className="profile-trigger flex items-center gap-3 p-1.5 pr-3 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-sm">
                    <span className="text-white text-[13px] font-bold">{profile.initials}</span>
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-[13px] font-medium text-primary">{profile.name}</p>
                    <p className="text-[11px] text-muted">{profile.role}</p>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-muted hidden sm:block transition-transform ${profileMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {profileMenuOpen && (
                  <div className="profile-dropdown absolute right-0 top-full mt-2 w-56 bg-surface-raised backdrop-blur-xl border border-border rounded-xl shadow-2xl z-50 py-2">
                    <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700/50">
                      <p className="text-[13px] font-medium text-primary">{profile.name}</p>
                      <p className="text-xs text-muted">{profile.email}</p>
                    </div>
                    <div className="py-1">
                      <button
                        onClick={() => { setProfileMenuOpen(false); navigate('/command/profile'); }}
                        className="w-full flex items-center gap-3 px-4 py-2 text-[13px] text-secondary hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                      >
                        <User className="w-4 h-4" />
                        View Profile
                      </button>
                      <button
                        onClick={() => {
                          setProfileMenuOpen(false);
                          navigate(settingsRoute);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2 text-[13px] text-secondary hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                      >
                        <Settings className="w-4 h-4" />
                        Settings
                      </button>
                    </div>
                    <div className="border-t border-slate-100 dark:border-slate-700/50 py-1">
                      <button
                        onClick={() => {
                          setProfileMenuOpen(false);
                          setLogoutConfirmOpen(true);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2 text-[13px] text-muted hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
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
