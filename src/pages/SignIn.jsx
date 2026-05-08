import React, { useState, useEffect } from 'react';
import { Shield, Lock, Mail, ChevronRight, Eye, EyeOff, ArrowLeft, AlertCircle, Activity, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { api } from '../api';

const ROLE_ROUTES = {
  command:      '/command/dashboard',
  supervisor:   '/command/dashboard',
  hr:           '/hr/dashboard',
  investigator: '/bi/dashboard',
};

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberDevice, setRememberDevice] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Lock login page to dark mode while mounted without affecting the app theme
  useEffect(() => {
    const html = document.documentElement;
    const hadDark = html.classList.contains('dark');
    html.classList.add('dark');
    return () => {
      if (!hadDark) html.classList.remove('dark');
    };
  }, []);

  const handleLogin = async () => {
    if (!email || !password) return;

    setLoading(true);
    setError(null);

    try {
      const data = await api.post('/auth/login', { email, password });

      localStorage.setItem('sentryops_token', data.token);
      localStorage.setItem('sentryops_user', JSON.stringify(data.user));

      const destination = ROLE_ROUTES[data.user.role] ?? '/command/dashboard';
      navigate(destination);
    } catch (err) {
      if (err.status === 401) {
        setError('invalid');
      } else if (err.status === 403) {
        setError('restricted');
      } else {
        setError('network');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleLogin();
  };

  return (
    <div className="dark min-h-screen bg-gradient-to-br from-slate-950 via-[#0d1424] to-slate-950 flex flex-col items-center justify-center p-6 relative">

      {/* Subtle grid texture overlay */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />

      {/* Top security banner */}
      <div className="absolute top-0 inset-x-0 border-b border-slate-800/60 bg-slate-950/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">
              Restricted System — Authorized Personnel Only
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Activity className="w-3 h-3 text-slate-600" />
            <span className="text-[10px] text-slate-600 uppercase tracking-wide">All access is logged and monitored</span>
          </div>
        </div>
      </div>

      {/* Back link */}
      <Link
        to={createPageUrl('Landing')}
        className="absolute top-12 left-6 flex items-center gap-2 text-slate-500 hover:text-slate-300 transition-colors group mt-2"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
        <span className="text-xs font-medium">Back</span>
      </Link>

      <div className="relative w-full max-w-sm">

        {/* Header */}
        <div className="text-center mb-7">
          <div className="flex items-center justify-center mb-5">
            <div className="w-14 h-14 bg-gradient-to-br from-amber-500/80 to-amber-700/80 rounded-xl flex items-center justify-center shadow-lg shadow-amber-900/30 border border-amber-600/30">
              <Shield className="w-7 h-7 text-white" strokeWidth={2} />
            </div>
          </div>
          <div className="space-y-1">
            <h1 className="text-xl font-bold text-white tracking-tight">SentryOps Command Platform</h1>
            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest">Secure Access Portal</p>
          </div>
        </div>

        {/* Error banner */}
        {error && (
          <div className="mb-4 bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-400">
              {error === 'invalid'    && 'Invalid credentials. Access denied.'}
              {error === 'restricted' && 'Access restricted. Contact your system administrator for authorization.'}
              {error === 'network'    && 'Unable to reach the server. Check your connection and try again.'}
            </p>
          </div>
        )}

        {/* Login Form */}
        <div className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
          <div className="space-y-4">

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5">
                Government Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(null); }}
                  onKeyDown={handleKeyDown}
                  placeholder="firstname.lastname@agency.gov"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-900/60 border border-slate-700/50 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-amber-500/50 focus:bg-slate-900/80 transition-all text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(null); }}
                  onKeyDown={handleKeyDown}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-900/60 border border-slate-700/50 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-amber-500/50 focus:bg-slate-900/80 transition-all text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember device + Forgot password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div
                  onClick={() => setRememberDevice(!rememberDevice)}
                  className={`w-4 h-4 rounded border flex items-center justify-center transition-colors flex-shrink-0 cursor-pointer ${
                    rememberDevice
                      ? 'bg-amber-500/80 border-amber-500/80'
                      : 'bg-slate-900/60 border-slate-700/60 group-hover:border-slate-500/60'
                  }`}
                >
                  {rememberDevice && (
                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors">
                  Remember this device <span className="text-slate-600">(secure)</span>
                </span>
              </label>
              <button
                type="button"
                className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
              >
                Forgot password?
              </button>
            </div>

            {/* Authenticate button */}
            <button
              onClick={handleLogin}
              disabled={!email || !password || loading}
              className="w-full py-2.5 bg-amber-500/90 hover:bg-amber-500 disabled:bg-slate-700/60 disabled:cursor-not-allowed rounded-lg text-white font-semibold transition-all flex items-center justify-center gap-2 text-sm shadow-lg shadow-amber-900/20 hover:shadow-amber-900/30 mt-1"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Authenticating…
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  Authenticate
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          {/* Security footer */}
          <div className="mt-5 pt-4 border-t border-slate-700/40 space-y-2">
            <div className="flex items-center gap-2 text-[11px] text-slate-600">
              <Lock className="w-3 h-3 flex-shrink-0" />
              <span>All access is logged and monitored</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-600">
              <Shield className="w-3 h-3 flex-shrink-0" />
              <span>MFA enforced in production · TLS 1.3 encrypted · CJIS compliant</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-5 text-center space-y-2">
          <p className="text-xs text-slate-600">
            Need access?{' '}
            <button className="text-slate-400 hover:text-white transition-colors">
              Contact IT Support
            </button>
          </p>
          <p className="text-[11px] text-slate-700 uppercase tracking-widest">
            Gwinnett County Sheriff's Office
          </p>
        </div>
      </div>
    </div>
  );
}
