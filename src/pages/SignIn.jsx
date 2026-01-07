import React, { useState } from 'react';
import { Shield, Lock, Mail, ChevronRight, Eye, EyeOff, ArrowLeft, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [demoDropdownOpen, setDemoDropdownOpen] = useState(false);
  const [selectedDemo, setSelectedDemo] = useState(null);

  const demoAccounts = [
    {
      id: 'command',
      title: 'Command Staff',
      role: 'Sheriff / Chief View',
      email: 'command.staff@gwinnettcounty.com',
      route: 'CommandDashboard'
    },
    {
      id: 'investigations',
      title: 'Investigations Command',
      role: 'Background Investigations Unit',
      email: 'bi.command@gwinnettcounty.com',
      route: 'BackgroundsDashboard'
    },
    {
      id: 'hr',
      title: 'Human Resources',
      role: 'Director View',
      email: 'hr.director@gwinnettcounty.com',
      route: 'HRDashboard'
    }
  ];

  const handleDemoSelect = (account) => {
    setSelectedDemo(account);
    setEmail(account.email);
    setPassword('••••••••••••');
    setDemoDropdownOpen(false);
  };

  const handleLogin = () => {
    if (selectedDemo) {
      navigate(createPageUrl(selectedDemo.route));
    } else if (email) {
      // Default to command dashboard if manually entering credentials
      navigate(createPageUrl('CommandDashboard'));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-6">
      {/* Back Button */}
      <Link
        to={createPageUrl('Landing')}
        className="absolute top-6 left-6 flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-medium">Back to Home</span>
      </Link>

      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-14 h-14 bg-gradient-to-br from-amber-500/90 to-amber-600/90 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20">
              <Shield className="w-7 h-7 text-slate-900" strokeWidth={2.5} />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Sign in to SentryOps</h1>
          <p className="text-slate-400 text-sm">Secure access to centralized command operations</p>
        </div>

        {/* Demo Environment Notice */}
        <div className="mb-6 bg-slate-800/30 border border-slate-700/40 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">Demo Environment</span>
            </div>
            <span className="text-xs text-slate-500">Permissions simulated</span>
          </div>

          {/* Demo Account Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDemoDropdownOpen(!demoDropdownOpen)}
              className="w-full flex items-center justify-between px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl text-left hover:border-slate-600/50 transition-colors"
            >
              <div>
                {selectedDemo ? (
                  <>
                    <p className="text-sm font-medium text-white">{selectedDemo.title}</p>
                    <p className="text-xs text-slate-500">{selectedDemo.role}</p>
                  </>
                ) : (
                  <>
                    <p className="text-sm text-slate-400">Select demo access level</p>
                    <p className="text-xs text-slate-600">Choose a permission scope to view</p>
                  </>
                )}
              </div>
              <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${demoDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {demoDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-xl shadow-2xl z-50 overflow-hidden">
                {demoAccounts.map((account) => (
                  <button
                    key={account.id}
                    onClick={() => handleDemoSelect(account)}
                    className={`w-full px-4 py-3 text-left hover:bg-slate-800/50 transition-colors border-b border-slate-800/50 last:border-0 ${
                      selectedDemo?.id === account.id ? 'bg-slate-800/30' : ''
                    }`}
                  >
                    <p className="text-sm font-medium text-white">{account.title}</p>
                    <p className="text-xs text-slate-500">{account.role}</p>
                  </button>
                ))}
              </div>
            )}
          </div>
          <p className="mt-3 text-xs text-slate-500 text-center">
            Demo environment only. Permissions are simulated and do not represent real users.
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 sm:p-8">
          <div className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="firstname.lastname@gwinnettcounty.com"
                  className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 transition-all text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <button className="text-amber-400/80 hover:text-amber-300 transition-colors text-sm">
                Forgot password?
              </button>
            </div>

            {/* Sign In Button */}
            <button
              onClick={handleLogin}
              disabled={!email}
              className="w-full py-3 bg-amber-500/90 hover:bg-amber-500 disabled:bg-slate-700 disabled:cursor-not-allowed rounded-xl text-white font-medium transition-all flex items-center justify-center gap-2 group shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20"
            >
              <Lock className="w-4 h-4" />
              Sign In
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* MFA Notice */}
          <div className="mt-6 pt-6 border-t border-slate-700/50">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Shield className="w-4 h-4 text-slate-600" />
              <span>Multi-factor authentication enforced in production environments</span>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-6 text-center space-y-3">
          <p className="text-sm text-slate-500">
            Need access? <button className="text-amber-400/80 hover:text-amber-300 transition-colors">Contact IT Support</button>
          </p>
          <div className="text-xs text-slate-600 space-y-1">
            <p>Designed to align with CJIS security standards</p>
            <p>Deployment options include GovCloud-compatible environments</p>
          </div>
        </div>
      </div>
    </div>
  );
}
