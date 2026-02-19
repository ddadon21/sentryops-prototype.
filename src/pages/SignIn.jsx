import React, { useState } from 'react';
import { Shield, Lock, Mail, Eye, EyeOff, ArrowLeft, ChevronDown, Info } from 'lucide-react';
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
      navigate(createPageUrl('CommandDashboard'));
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      {/* Back Button */}
      <Link
        to={createPageUrl('Landing')}
        className="absolute top-6 left-6 flex items-center gap-2 text-slate-500 hover:text-slate-300 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-medium">Back</span>
      </Link>

      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-slate-950" strokeWidth={2.5} />
            </div>
          </div>
          <h1 className="text-xl font-bold text-white mb-1.5 tracking-tight">Sign in to SentryOps</h1>
          <p className="text-slate-500 text-sm">Secure access to command operations</p>
        </div>

        {/* Demo Access Mode */}
        <div className="mb-5 bg-slate-900/40 border border-slate-800/30 rounded-lg p-3.5">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
              <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Demo Access Mode</span>
            </div>
            <div className="relative group">
              <Info className="w-3.5 h-3.5 text-slate-600 cursor-help" />
              <div className="absolute right-0 bottom-full mb-2 w-48 p-2 bg-slate-800 border border-slate-700/50 rounded-lg text-[11px] text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                Simulated environment. No real data or credentials are used.
              </div>
            </div>
          </div>

          {/* Demo Account Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDemoDropdownOpen(!demoDropdownOpen)}
              className="w-full flex items-center justify-between px-3.5 py-2.5 bg-slate-950/50 border border-slate-800/40 rounded-lg text-left hover:border-slate-700/50 transition-colors"
            >
              <div>
                {selectedDemo ? (
                  <>
                    <p className="text-sm font-medium text-white">{selectedDemo.title}</p>
                    <p className="text-[11px] text-slate-600">{selectedDemo.role}</p>
                  </>
                ) : (
                  <>
                    <p className="text-xs text-slate-500">Select access level</p>
                    <p className="text-[11px] text-slate-700">Choose a permission scope</p>
                  </>
                )}
              </div>
              <ChevronDown className={`w-4 h-4 text-slate-600 transition-transform ${demoDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {demoDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1.5 bg-slate-900 border border-slate-800/50 rounded-lg shadow-xl z-50 overflow-hidden">
                {demoAccounts.map((account) => (
                  <button
                    key={account.id}
                    onClick={() => handleDemoSelect(account)}
                    className={`w-full px-3.5 py-2.5 text-left hover:bg-slate-800/40 transition-colors border-b border-slate-800/30 last:border-0 ${
                      selectedDemo?.id === account.id ? 'bg-slate-800/20' : ''
                    }`}
                  >
                    <p className="text-sm font-medium text-white">{account.title}</p>
                    <p className="text-[11px] text-slate-600">{account.role}</p>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Login Form */}
        <div className="bg-slate-900/30 border border-slate-800/30 rounded-xl p-6 sm:p-8">
          <div className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="firstname.lastname@gwinnettcounty.com"
                  className="w-full pl-11 pr-4 py-3 bg-slate-950/60 border border-slate-800/50 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-slate-600 transition-colors text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-11 py-3 bg-slate-950/60 border border-slate-800/50 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-slate-600 transition-colors text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-400 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <button className="text-slate-500 hover:text-slate-400 transition-colors text-xs">
                Forgot password?
              </button>
            </div>

            {/* Sign In Button */}
            <button
              onClick={handleLogin}
              disabled={!email}
              className="w-full py-3 bg-amber-500 hover:bg-amber-600 disabled:bg-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed rounded-lg text-white font-medium transition-colors flex items-center justify-center gap-2 text-sm"
            >
              <Lock className="w-4 h-4" />
              Sign In
            </button>

            {/* Access Logged Notice */}
            <p className="text-center text-[11px] text-slate-600 pt-1">
              Access logged and monitored.
            </p>
          </div>

          {/* MFA Notice */}
          <div className="mt-6 pt-5 border-t border-slate-800/30">
            <div className="flex items-center gap-2 text-[11px] text-slate-600">
              <Shield className="w-3.5 h-3.5" />
              <span>Multi-factor authentication enforced in production environments</span>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-6 text-center space-y-2.5">
          <p className="text-xs text-slate-600">
            Need access? <button className="text-slate-500 hover:text-slate-400 transition-colors">Contact IT Support</button>
          </p>
          <div className="text-[11px] text-slate-700 space-y-0.5">
            <p>Designed to align with CJIS security standards</p>
            <p>Deployment options include GovCloud-compatible environments</p>
          </div>
        </div>
      </div>
    </div>
  );
}
