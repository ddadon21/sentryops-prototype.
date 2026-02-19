import React, { useState } from 'react';
import { Shield, Check, Lock, ArrowRight, Globe, Users, TrendingUp, Menu, X, BarChart3, FileCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function Landing() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-925 to-slate-950">
      {/* Nav */}
      <nav className="border-b border-slate-800/30 bg-slate-950/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-slate-950" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">SentryOps</span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-slate-500 hover:text-slate-300 transition-colors text-sm font-medium">Features</a>
              <a href="#security" className="text-slate-500 hover:text-slate-300 transition-colors text-sm font-medium">Security</a>
              <a href="#compliance" className="text-slate-500 hover:text-slate-300 transition-colors text-sm font-medium">Compliance</a>
              <Link
                to={createPageUrl('SignIn')}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 rounded-lg text-white text-sm font-medium transition-colors flex items-center gap-2"
              >
                <Lock className="w-4 h-4" />
                Sign In
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-3">
              <a href="#features" className="block text-slate-500 hover:text-white transition-colors text-sm">Features</a>
              <a href="#security" className="block text-slate-500 hover:text-white transition-colors text-sm">Security</a>
              <a href="#compliance" className="block text-slate-500 hover:text-white transition-colors text-sm">Compliance</a>
              <Link
                to={createPageUrl('SignIn')}
                className="w-full px-4 py-2 bg-amber-500 hover:bg-amber-600 rounded-lg text-white text-sm font-medium transition-colors flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" />
                Sign In
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Hero */}
      <div className="max-w-6xl mx-auto px-6 pt-20 pb-24">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
            Operational Intelligence Infrastructure<br />for Sheriff Leadership
          </h1>
          <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Centralized command platform integrating personnel, compliance, and operational data for executive decision-making.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto px-8 py-3.5 bg-amber-500 hover:bg-amber-600 rounded-lg text-white font-medium transition-colors flex items-center justify-center gap-2 text-sm">
              Request Demo
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="w-full sm:w-auto px-8 py-3.5 bg-transparent hover:bg-slate-800/30 border border-slate-700/50 rounded-lg text-slate-400 hover:text-slate-300 font-medium transition-colors text-sm">
              View Documentation
            </button>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mb-20 px-4">
          <div className="flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-xs text-slate-500 font-medium tracking-wide uppercase">CJIS Compliant</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-xs text-slate-500 font-medium tracking-wide uppercase">AWS GovCloud</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-xs text-slate-500 font-medium tracking-wide uppercase">SOC 2 Type II</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-xs text-slate-500 font-medium tracking-wide uppercase">FedRAMP Aligned</span>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="relative mb-20">
          <div className="bg-slate-900/40 border border-slate-800/40 rounded-xl p-2">
            <div className="bg-slate-950 rounded-lg aspect-video flex items-center justify-center">
              <div className="text-center">
                <Shield className="w-16 h-16 text-slate-800 mx-auto mb-4" />
                <p className="text-slate-700 text-sm">Executive Command Dashboard Preview</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div id="features" className="max-w-6xl mx-auto px-6 pb-24">
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-3 tracking-tight">Core Capabilities</h2>
        <p className="text-slate-500 text-center mb-14 max-w-xl mx-auto text-sm">
          Integrated operational infrastructure connecting existing agency systems into a unified command environment.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: Users, title: 'Personnel Management', desc: 'Complete staff directory with certifications, training records, and scheduling integrated from existing HR systems.' },
            { icon: Globe, title: 'System Integration', desc: 'Connects NeoGov, PowerDMS, RMS/CAD, and agency databases into a single operational view.' },
            { icon: BarChart3, title: 'Executive Analytics', desc: 'Real-time dashboards with operational KPIs, compliance tracking, and resource utilization metrics.' },
            { icon: TrendingUp, title: 'Compliance Monitoring', desc: 'Automated tracking for POST certifications, ACA accreditation, CJIS audits, and federal requirements.' },
            { icon: Shield, title: 'Enterprise Security', desc: 'CJIS-compliant architecture with role-based access control, full audit trails, and encrypted data handling.' },
            { icon: FileCheck, title: 'Background Investigations', desc: 'Structured applicant tracking with document management, timeline oversight, and adjudication workflows.' }
          ].map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div key={idx} className="bg-slate-900/30 border border-slate-800/30 rounded-lg p-6 hover:border-slate-700/40 transition-colors">
                <Icon className="w-6 h-6 text-slate-500 mb-4" strokeWidth={1.5} />
                <h3 className="text-base font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{feature.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-6xl mx-auto px-6 pb-24">
        <div className="bg-slate-900/30 border border-slate-800/30 rounded-xl p-10 md:p-14 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">Ready to consolidate your operations?</h2>
          <p className="text-slate-500 mb-8 max-w-xl mx-auto text-sm leading-relaxed">
            Schedule a demonstration to see how SentryOps integrates with your existing agency infrastructure.
          </p>
          <button className="px-8 py-3.5 bg-amber-500 hover:bg-amber-600 rounded-lg text-white font-medium transition-colors inline-flex items-center gap-2 text-sm">
            Schedule a Demo
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-800/30 bg-slate-950/60">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-600">
            <p>&copy; 2024 SentryOps. All rights reserved.</p>
            <div className="flex items-center gap-8">
              <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-slate-400 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-slate-400 transition-colors">Security</a>
              <a href="#" className="hover:text-slate-400 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
