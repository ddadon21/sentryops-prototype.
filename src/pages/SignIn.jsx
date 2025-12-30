import React, { useState } from 'react';
import { Shield, Lock, Mail, AlertCircle, ChevronRight, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  const roles = [
    { id: 'command', title: 'Command Staff', demo: 'sheriff@dept.gov' },
    { id: 'hr', title: 'HR / Backgrounds', demo: 'hr@dept.gov' },
    { id: 'supervisor', title: 'Unit Supervisor', demo: 'supervisor@dept.gov' },
    { id: 'employee', title: 'Line Staff', demo: 'deputy@dept.gov' }
  ];

  const handleLogin = () => {
    if (!selectedRole) return;

    // Route based on selected role
    if (selectedRole.id === 'command') {
      navigate(createPageUrl('CommandDashboard'));
    } else if (selectedRole.id === 'hr') {
      navigate(createPageUrl('HRDashboard'));
    } else if (selectedRole.id === 'supervisor') {
      navigate(createPageUrl('CommandDashboard')); // Placeholder - supervisor dashboard not built yet
    } else if (selectedRole.id === 'employee') {
      navigate(createPageUrl('CommandDashboard')); // Placeholder - employee dashboard not built yet
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
            <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center">
              <Shield className="w-9 h-9 text-slate-900" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Sign in to SentryOps</h1>
          <p className="text-slate-400">Enter your credentials to access your dashboard</p>
        </div>

        {/* Demo Role Selector */}
        <div className="mb-6 bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
          <div className="flex items-start gap-3 mb-3">
            <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-blue-400 mb-1">Demo Mode</p>
              <p className="text-xs text-slate-400 mb-3">Select a role to pre-fill demo credentials</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {roles.map(role => (
              <button
                key={role.id}
                onClick={() => {
                  setSelectedRole(role);
                  setEmail(role.demo);
                }}
                className={`p-3 rounded-lg text-left transition-all ${
                  selectedRole?.id === role.id
                    ? 'bg-blue-500/20 border-2 border-blue-500/50'
                    : 'bg-slate-800/40 border-2 border-transparent hover:border-slate-600/50'
                }`}
              >
                <p className="text-sm font-medium text-white">{role.title}</p>
                <p className="text-xs text-slate-400 mt-0.5 break-all">{role.demo}</p>
              </button>
            ))}
          </div>
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
                  placeholder="your.email@dept.gov"
                  className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 transition-all"
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

            {/* Remember & Forgot */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-sm">
              <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
                <input type="checkbox" className="rounded border-slate-600" />
                <span>Remember me</span>
              </label>
              <button className="text-amber-400 hover:text-amber-300 transition-colors">
                Forgot password?
              </button>
            </div>

            {/* Sign In Button */}
            <button
              onClick={handleLogin}
              className="w-full py-3 bg-amber-500 hover:bg-amber-600 rounded-xl text-white font-medium transition-all flex items-center justify-center gap-2 group"
            >
              <Lock className="w-5 h-5" />
              Sign In
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* MFA Notice */}
          <div className="mt-6 pt-6 border-t border-slate-700/50">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Shield className="w-4 h-4" />
              <span>Multi-factor authentication required for production</span>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-6 text-center space-y-2">
          <p className="text-sm text-slate-500">
            Don't have an account? <button className="text-amber-400 hover:text-amber-300">Contact IT Support</button>
          </p>
          <p className="text-xs text-slate-600">
            Protected by CJIS-compliant security • Hosted on AWS GovCloud
          </p>
        </div>
      </div>
    </div>
  );
}
