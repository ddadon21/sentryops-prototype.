import React, { useState } from 'react';
import {
  FileText, MessageCircle, Search, ChevronRight, CheckCircle, X, Send,
  Filter, Download, Eye, Mail, Phone, MapPin, Calendar, FileCheck,
  ClipboardCheck, ChevronDown, ChevronUp, AlertCircle, User, Printer,
  Flag, MessageSquare, Share2, ArrowRight, Star
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import { hrNavigation, hrProfile, hrNotifications } from '../config/hrConfig';

/* ------------------------------------------------------------------ */
/* Shared helpers & presentational components                          */
/* ------------------------------------------------------------------ */

const toneMap = {
  blue: 'bg-blue-500/20 border-blue-500/30 text-blue-400',
  purple: 'bg-purple-500/20 border-purple-500/30 text-purple-400',
  amber: 'bg-amber-500/20 border-amber-500/30 text-amber-700 dark:text-amber-400',
  cyan: 'bg-cyan-500/20 border-cyan-500/30 text-cyan-400',
  green: 'bg-green-500/20 border-green-500/30 text-green-400',
  red: 'bg-red-500/20 border-red-500/30 text-red-400',
  slate: 'bg-slate-500/20 border-slate-500/30 text-slate-400',
};

const avatarTone = {
  blue: 'bg-blue-500/20 text-blue-400',
  purple: 'bg-purple-500/20 text-purple-400',
  amber: 'bg-amber-500/20 text-amber-700 dark:text-amber-400',
  cyan: 'bg-cyan-500/20 text-cyan-400',
  green: 'bg-green-500/20 text-green-400',
  red: 'bg-red-500/20 text-red-400',
  slate: 'bg-slate-500/20 text-slate-400',
};

function scoreTone(score) {
  if (score >= 85) return { text: 'text-green-500 dark:text-green-400', ring: 'border-green-500/40', bg: 'bg-green-500/10' };
  if (score >= 70) return { text: 'text-amber-600 dark:text-amber-400', ring: 'border-amber-500/40', bg: 'bg-amber-500/10' };
  return { text: 'text-red-500 dark:text-red-400', ring: 'border-red-500/40', bg: 'bg-red-500/10' };
}

function barColor(value) {
  if (value >= 85) return 'bg-green-500';
  if (value >= 70) return 'bg-amber-500';
  return 'bg-red-500';
}

function SectionHeader({ children }) {
  return (
    <h4 className="text-sm font-bold text-amber-700 dark:text-amber-500 uppercase tracking-wide mb-3">{children}</h4>
  );
}

function ScoreBadge({ score }) {
  const t = scoreTone(score);
  return (
    <div className={`flex flex-col items-center justify-center rounded-xl border ${t.ring} ${t.bg} px-3 py-1.5 min-w-[60px]`}>
      <span className={`text-lg font-bold leading-none ${t.text}`}>{score}</span>
      <span className="text-[10px] uppercase tracking-wide text-slate-500 mt-0.5">Score</span>
    </div>
  );
}

function ScoreBreakdown({ score, breakdown }) {
  const t = scoreTone(score);
  return (
    <div>
      <SectionHeader>Candidate Score</SectionHeader>
      <div className="bg-white dark:bg-zinc-950/40 rounded-lg p-4 border border-border">
        <div className="flex items-center gap-3 mb-4">
          <div className={`flex items-center justify-center w-14 h-14 rounded-full border-2 ${t.ring} ${t.bg} flex-shrink-0`}>
            <span className={`text-lg font-bold ${t.text}`}>{score}</span>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-primary">Composite Match Score</p>
            <p className="text-xs text-secondary break-words">Experience, education, certifications, background &amp; evaluations</p>
          </div>
        </div>
        <div className="space-y-2.5">
          {breakdown.map(([label, value]) => (
            <div key={label}>
              <div className="flex items-center justify-between text-xs mb-1 gap-2">
                <span className="text-secondary break-words">{label}</span>
                <span className="text-primary font-medium flex-shrink-0">{value}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-slate-200 dark:bg-zinc-800 overflow-hidden">
                <div className={`h-full rounded-full ${barColor(value)}`} style={{ width: `${value}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const PIPELINE = ['Applied', 'Screening', 'Interview', 'Background', 'Medical', 'Offer', 'Hired'];

function HiringTimeline({ current, rejected }) {
  const currentIndex = PIPELINE.indexOf(current);
  return (
    <div>
      <SectionHeader>Hiring Timeline</SectionHeader>
      <div data-swipe-ignore className="overflow-x-auto -mx-1 px-1 pb-1">
        <div className="flex items-start min-w-max">
          {PIPELINE.map((stage, i) => {
            const done = !rejected && i < currentIndex;
            const active = !rejected && i === currentIndex;
            const rejectedHere = rejected && i === currentIndex;
            let circle = 'bg-slate-200 dark:bg-zinc-800 text-slate-500 border-transparent';
            let label = 'text-slate-500';
            if (done) { circle = 'bg-green-500/20 text-green-400 border-green-500/40'; label = 'text-secondary'; }
            if (active) { circle = 'bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/50'; label = 'text-amber-700 dark:text-amber-400 font-semibold'; }
            if (rejectedHere) { circle = 'bg-red-500/20 text-red-400 border-red-500/50'; label = 'text-red-400 font-semibold'; }
            return (
              <React.Fragment key={stage}>
                <div className="flex flex-col items-center gap-1.5 w-[68px] flex-shrink-0">
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${circle}`}>
                    {done ? <CheckCircle className="w-4 h-4" /> : rejectedHere ? <X className="w-4 h-4" /> : <span className="text-xs font-bold">{i + 1}</span>}
                  </div>
                  <span className={`text-[11px] text-center leading-tight ${label}`}>{stage}</span>
                </div>
                {i < PIPELINE.length - 1 && (
                  <div className={`h-0.5 w-6 mt-4 flex-shrink-0 ${i < currentIndex && !rejected ? 'bg-green-500/40' : 'bg-slate-200 dark:bg-zinc-800'}`} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function AssignedTo({ people }) {
  return (
    <div>
      <SectionHeader>Assigned To</SectionHeader>
      <div className="flex flex-wrap gap-3">
        {people.map((p) => (
          <div key={p.role} className="flex items-center gap-2 bg-white dark:bg-zinc-950/40 border border-border rounded-lg px-3 py-2 min-w-0">
            <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center flex-shrink-0">
              <User className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-slate-500 break-words">{p.role}</p>
              <p className="text-sm text-primary font-medium break-words">{p.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Attachments({ files }) {
  return (
    <div>
      <SectionHeader>Attachments</SectionHeader>
      <div className="space-y-2">
        {files.map((f) => (
          <div key={f.name} className="flex items-center justify-between gap-3 bg-white dark:bg-zinc-950/40 border border-border rounded-lg px-3 py-2 flex-wrap">
            <div className="flex items-center gap-2 min-w-0">
              <FileText className="w-4 h-4 text-slate-500 flex-shrink-0" />
              <span className="text-sm text-primary truncate">{f.name}</span>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              {[{ icon: Eye, label: 'View' }, { icon: Download, label: 'Download' }, { icon: Share2, label: 'Share' }].map(({ icon: Icon, label }) => (
                <button key={label} title={label} className="flex items-center gap-1 px-2 py-1 rounded-md text-xs text-secondary hover:bg-slate-100 dark:hover:bg-zinc-800/60 transition-colors">
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{label}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function InternalNotes({ notes }) {
  return (
    <div>
      <SectionHeader>Internal Notes</SectionHeader>
      <div className="space-y-2">
        {notes.map((n, i) => (
          <div key={i} className="bg-white dark:bg-zinc-950/40 border border-border rounded-lg p-3">
            <div className="flex items-center justify-between gap-2 mb-1 flex-wrap">
              <span className="text-sm font-medium text-primary break-words">{n.author}</span>
              <span className="text-xs text-slate-500 flex-shrink-0">{n.date}</span>
            </div>
            <p className="text-sm text-secondary break-words">{n.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function RecentActivity({ items }) {
  return (
    <div>
      <SectionHeader>Recent Activity</SectionHeader>
      <div className="space-y-0">
        {items.map((it, i) => (
          <div key={i} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
              {i < items.length - 1 && <div className="w-px flex-1 bg-border my-1" />}
            </div>
            <div className="pb-3 min-w-0">
              <p className="text-xs text-slate-500">{it.when}</p>
              <p className="text-sm text-secondary break-words">{it.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function NextAction({ action }) {
  if (!action) return null;
  const tone = action.tone || 'amber';
  const box = {
    amber: 'bg-amber-500/10 border-amber-500/40',
    blue: 'bg-blue-500/10 border-blue-500/40',
    red: 'bg-red-500/10 border-red-500/40',
    slate: 'bg-slate-500/10 border-slate-500/40',
  }[tone];
  const accent = {
    amber: 'text-amber-700 dark:text-amber-400',
    blue: 'text-blue-500 dark:text-blue-400',
    red: 'text-red-500 dark:text-red-400',
    slate: 'text-slate-500 dark:text-slate-400',
  }[tone];
  const iconBg = {
    amber: 'bg-amber-500/20 text-amber-700 dark:text-amber-400',
    blue: 'bg-blue-500/20 text-blue-500 dark:text-blue-400',
    red: 'bg-red-500/20 text-red-500 dark:text-red-400',
    slate: 'bg-slate-500/20 text-slate-500 dark:text-slate-400',
  }[tone];
  return (
    <div className={`rounded-xl border ${box} p-4`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${iconBg}`}>
            <ArrowRight className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <p className={`text-[11px] font-bold uppercase tracking-wider ${accent}`}>Next Required Action</p>
            <p className="text-base font-bold text-primary break-words">{action.title}</p>
            {action.due && <p className="text-xs text-secondary break-words mt-0.5">{action.due}</p>}
          </div>
        </div>
        {action.cta && (
          <button className={`flex-shrink-0 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${tone === 'red' ? 'bg-red-500 hover:bg-red-600 text-white' : tone === 'blue' ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-amber-500 hover:bg-amber-600 text-white'}`}>
            {action.cta}
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}

const actionVariant = {
  primary: 'bg-blue-500 hover:bg-blue-600 text-white',
  success: 'bg-green-500 hover:bg-green-600 text-white',
  warning: 'bg-amber-500 hover:bg-amber-600 text-white',
  default: 'bg-white dark:bg-zinc-800/60 hover:bg-slate-100 dark:hover:bg-slate-700/80 text-primary',
};

function ActionButtons({ actions }) {
  return (
    <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
      {actions.map((a, i) => {
        const Icon = a.icon;
        return (
          <button key={i} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${actionVariant[a.variant || 'default']}`}>
            <Icon className="w-4 h-4" />
            {a.label}
          </button>
        );
      })}
    </div>
  );
}

function ContactRow({ contact }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <div className="flex items-center gap-2 text-sm min-w-0">
        <Mail className="w-4 h-4 text-slate-500 flex-shrink-0" />
        <span className="text-secondary break-words">{contact.email}</span>
      </div>
      <div className="flex items-center gap-2 text-sm min-w-0">
        <Phone className="w-4 h-4 text-slate-500 flex-shrink-0" />
        <span className="text-secondary break-words">{contact.phone}</span>
      </div>
      <div className="flex items-center gap-2 text-sm min-w-0">
        <MapPin className="w-4 h-4 text-slate-500 flex-shrink-0" />
        <span className="text-secondary break-words">{contact.location}</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Applicant data — bespoke detail preserved per candidate             */
/* ------------------------------------------------------------------ */

const applicants = [
  {
    id: 'marcus',
    name: 'Marcus Johnson',
    position: 'Deputy Sheriff',
    division: 'Patrol Division',
    ref: '2026-APP-0142',
    status: { label: 'SCREENING', tone: 'purple' },
    flags: [],
    score: 88,
    daysAgo: 113,
    stage: 'screening',
    timelineCurrent: 'Interview',
    contact: { email: 'marcus.johnson@email.com', phone: '(555) 234-5678', location: 'Lawrenceville, GA 30046' },
    breakdown: [['Experience', 90], ['Education', 85], ['POST Certification', 95], ['Certifications', 88], ['Background Pre-Screen', 92], ['Physical Fitness', 90]],
    assignedTo: [{ role: 'HR Specialist', name: 'J. Martinez' }, { role: 'Interview Panel Chair', name: 'Maj. R. Davis' }],
    attachments: [{ name: 'Employment Application.pdf' }, { name: 'Resume (2 pages).pdf' }, { name: 'Cover Letter.pdf' }, { name: 'POST Certificate.pdf' }, { name: 'College Transcript.pdf' }],
    notes: [{ author: 'Lt. K. Williams', date: 'Jan 26, 2026', text: 'Strong patrol background, FTO experience a plus. Confirmed interview attendance. Recommend standard oral board.' }],
    activity: [
      { when: 'Today', text: 'Interview packet prepared for oral board' },
      { when: 'Jan 26, 2026', text: 'Applicant confirmed interview attendance' },
      { when: 'Oct 22, 2024', text: 'Physical fitness test passed' },
    ],
    nextAction: { title: 'Conduct Oral Board Interview', due: 'Due Feb 06, 2026 • 09:30 AM • Conference Room B', tone: 'amber', cta: 'Open Packet' },
    actions: [
      { label: 'View Full Application', icon: Eye, variant: 'primary' },
      { label: 'Email Applicant', icon: Mail },
      { label: 'Print Score Sheet', icon: Printer },
      { label: 'Flag for Review', icon: Flag },
    ],
    detail: (
      <>
        <div>
          <SectionHeader>Qualifications Summary</SectionHeader>
          <div className="bg-white dark:bg-zinc-950/40 rounded-lg p-4 border border-border space-y-3">
            <div>
              <p className="text-xs text-slate-500 mb-1">Experience</p>
              <p className="text-sm text-primary font-medium">5 years law enforcement</p>
              <p className="text-xs text-secondary">Metro Atlanta Police Department (2019-2024) • Patrol Officer, North Precinct</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-slate-500 mb-1">Education</p>
                <p className="text-sm text-primary">Bachelor's Degree - Criminal Justice</p>
                <p className="text-xs text-secondary">Georgia State University (Graduated 2018)</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">POST Certification</p>
                <p className="text-sm text-primary">Georgia POST Basic #48291</p>
                <p className="text-xs text-green-400">Issued: 06/15/2019 • Expires: 06/15/2027 (Current ✓)</p>
              </div>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-1">Additional Certifications</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">Field Training Officer (2022)</span>
                <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">Crisis Intervention (2021)</span>
                <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">Defensive Tactics Instructor (2023)</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <SectionHeader>Screening Status</SectionHeader>
          <div className="bg-white dark:bg-zinc-950/40 rounded-lg p-4 border border-border space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-primary font-medium">Initial Application Review: PASSED (10/15/2024)</p>
                <p className="text-xs text-secondary">Met minimum qualifications: Age 21+ ✓, POST cert ✓, HS/GED ✓</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-primary font-medium">Background Pre-Screen: PASSED (10/18/2024)</p>
                <p className="text-xs text-secondary">GCIC check: No disqualifying convictions ✓ | Driving record: Clean ✓</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-primary font-medium">Physical Fitness Test: PASSED (10/22/2024)</p>
                <p className="text-xs text-secondary">1.5-mi run: 11:45 | Push-ups: 42 | Sit-ups: 48 | 300m: 52s (all PASS)</p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'sarah',
    name: 'Sarah Chen',
    position: 'Background Investigator',
    division: 'HR / Internal Affairs',
    ref: '2026-APP-0087',
    status: { label: 'INTERVIEW COMPLETED', tone: 'amber' },
    flags: [{ label: 'TOP CANDIDATE', tone: 'green' }],
    score: 96,
    daysAgo: 98,
    stage: 'interview',
    timelineCurrent: 'Offer',
    contact: { email: 'sarah.chen@email.com', phone: '(555) 345-6789', location: 'Duluth, GA 30096' },
    breakdown: [['Experience', 98], ['Education', 95], ['POST / Federal', 96], ['Specialized Training', 97], ['Interview', 96], ['Clearance', 99]],
    assignedTo: [{ role: 'HR Director', name: 'L. Bennett' }, { role: 'Command Reviewer', name: 'Sheriff Taylor' }],
    attachments: [{ name: 'Employment Application.pdf' }, { name: 'Resume.pdf' }, { name: "Master's Transcript (Emory).pdf" }, { name: 'POST Certificate.pdf' }, { name: 'FBI Service Record.pdf' }, { name: 'Clearance Verification.pdf' }],
    notes: [
      { author: 'Maj. R. Davis', date: 'Feb 11, 2026', text: 'Exceptional interview — most qualified candidate. FBI investigative experience directly applicable to GCSO backgrounds. Strongly recommend for hire.' },
      { author: 'HR Director', date: 'Feb 11, 2026', text: 'Writing sample excellent. Forwarding panel recommendation to Sheriff for conditional offer approval.' },
    ],
    activity: [
      { when: 'Feb 11, 2026', text: 'Oral board completed — score 144/150 (96%)' },
      { when: 'Feb 11, 2026', text: 'Panel recommendation forwarded to Sheriff' },
      { when: 'Feb 04, 2026', text: 'Writing sample submitted — rated excellent' },
    ],
    nextAction: { title: "Await Sheriff's Approval for Conditional Offer", due: 'Sheriff review meeting Feb 14, 2026', tone: 'amber', cta: 'View Recommendation' },
    actions: [
      { label: 'View Full Application', icon: Eye, variant: 'primary' },
      { label: 'View Score Sheets', icon: FileText },
      { label: 'Prepare Conditional Offer', icon: FileCheck, variant: 'success' },
    ],
    detail: (
      <>
        <div>
          <SectionHeader>Qualifications Summary</SectionHeader>
          <div className="bg-white dark:bg-zinc-950/40 rounded-lg p-4 border border-border space-y-3">
            <div>
              <p className="text-xs text-slate-500 mb-1">Experience</p>
              <p className="text-sm text-primary font-medium">7 years FBI Special Agent</p>
              <p className="text-xs text-secondary">FBI Atlanta Field Office (2017-2024) • Public Corruption Unit</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-slate-500 mb-1">Education</p>
                <p className="text-sm text-primary">Master's Degree - Psychology (Emory 2016)</p>
                <p className="text-xs text-secondary">Bachelor's - Criminal Justice (UGA 2014)</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">POST &amp; Federal Certifications</p>
                <p className="text-sm text-primary">GA POST Basic #41203 (valid through 05/2027)</p>
                <p className="text-xs text-green-400">FBI Academy Graduate (Quantico 2017)</p>
              </div>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-1">Specialized Training</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs">Polygraph Examiner (FBI 2020)</span>
                <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs">Advanced Interrogation (FBI 2019)</span>
                <span className="px-2 py-1 bg-amber-500/20 text-amber-700 dark:text-amber-400 rounded text-xs">TOP SECRET/SCI Clearance (Active)</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <SectionHeader>Interview Results</SectionHeader>
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
              <div>
                <p className="text-sm font-bold text-green-400">ORAL BOARD INTERVIEW COMPLETED</p>
                <p className="text-xs text-secondary">February 11, 2026 • GCSO HQ, Sheriff's Conference Room</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-green-400">144/150</p>
                <p className="text-xs text-green-400">96.0% - HIGHEST SCORE</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm mb-3">
              <div className="bg-white dark:bg-zinc-900/40 rounded p-2 text-center">
                <p className="text-primary font-medium">Major R. Davis</p>
                <p className="text-green-400 font-bold">48/50</p>
              </div>
              <div className="bg-white dark:bg-zinc-900/40 rounded p-2 text-center">
                <p className="text-primary font-medium">HR Director</p>
                <p className="text-green-400 font-bold">49/50</p>
              </div>
              <div className="bg-white dark:bg-zinc-900/40 rounded p-2 text-center">
                <p className="text-primary font-medium">Lt. K. Hayes</p>
                <p className="text-green-400 font-bold">47/50</p>
              </div>
            </div>
            <p className="text-sm text-secondary"><span className="text-primary font-medium">Panel Recommendation:</span> <span className="text-green-400 font-bold">STRONGLY RECOMMEND FOR HIRE</span></p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'robert',
    name: 'Robert Martinez',
    position: 'Deputy Sheriff',
    division: 'Patrol Division',
    ref: '2026-APP-0124',
    status: { label: 'OFFER ACCEPTED', tone: 'green' },
    flags: [],
    score: 91,
    daysAgo: 102,
    stage: 'offer',
    timelineCurrent: 'Hired',
    accent: 'border-green-500/30',
    contact: { email: 'robert.martinez@email.com', phone: '(555) 456-7890', location: 'Jonesboro, GA 30236' },
    breakdown: [['Experience', 88], ['Education', 85], ['POST', 95], ['Interview', 91], ['Background', 93], ['Lateral Transfer', 92]],
    assignedTo: [{ role: 'HR Specialist', name: 'J. Martinez' }, { role: 'Field Training Officer', name: 'Cpl. J. Williams' }],
    attachments: [{ name: 'Hiring File (Full).pdf' }, { name: 'Conditional Offer Letter.pdf' }, { name: 'Background Investigation Report.pdf' }, { name: 'Medical Clearance.pdf' }, { name: 'POST Transfer Verification.pdf' }],
    notes: [{ author: 'Lt. K. Hayes', date: 'Jan 20, 2026', text: 'Background cleared, eligible-for-rehire from Clayton County. Lateral transfer — strong candidate, no concerns.' }],
    activity: [
      { when: 'Feb 01, 2026', text: 'Conditional offer accepted' },
      { when: 'Jan 30, 2026', text: "Sheriff's approval granted" },
      { when: 'Jan 27, 2026', text: 'Psychological evaluation passed' },
    ],
    nextAction: { title: 'Complete Pre-Start Onboarding Documents', due: 'I-9 due Mar 03, 2026 • W-4/G-4 pending', tone: 'blue', cta: 'Open Onboarding' },
    actions: [
      { label: 'View Hiring File', icon: Eye, variant: 'primary' },
      { label: 'Send Document Reminder', icon: Mail },
      { label: 'Onboarding Checklist', icon: ClipboardCheck },
      { label: 'Mark as Hired', icon: CheckCircle, variant: 'success' },
    ],
    detail: (
      <>
        <div>
          <SectionHeader>Hiring Process - Completed</SectionHeader>
          <div className="bg-white dark:bg-zinc-950/40 rounded-lg p-4 border border-border space-y-2">
            {[
              'Application Received: 10/23/2024',
              'Initial Screening: PASSED (10/25/2024)',
              'Physical Fitness: PASSED (10/30/2024)',
              'Oral Board Interview: 136/150 (90.7%) - 11/15/2024',
              'Background Investigation: CLEARED (01/20/2026) - Lt. K. Hayes',
              'Medical Exam: PASSED (01/24/2026)',
              'Psychological Eval: PASSED (01/27/2026)',
              "Sheriff's Approval: APPROVED (01/30/2026)",
            ].map((t) => (
              <div key={t} className="flex items-center gap-3 text-sm">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span className="text-secondary break-words">{t}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span className="text-sm font-bold text-green-400">CONDITIONAL OFFER ACCEPTED</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-secondary">
            <div>
              <p><span className="text-primary font-medium">Salary:</span> $55,200/year (Step 5 - 8 yrs exp)</p>
              <p><span className="text-primary font-medium">Shift:</span> B-Shift (14:00-02:00) Patrol</p>
            </div>
            <div>
              <p><span className="text-primary font-medium">Start Date:</span> March 03, 2026</p>
              <p><span className="text-primary font-medium">Last Day Clayton:</span> 02/14/2026</p>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'david',
    name: 'David Brown',
    position: 'Deputy Sheriff',
    division: 'Patrol Division',
    ref: '2026-APP-0178',
    status: { label: 'BACKGROUND CHECK', tone: 'cyan' },
    flags: [],
    score: 84,
    daysAgo: 67,
    stage: 'background',
    timelineCurrent: 'Background',
    contact: { email: 'david.brown@email.com', phone: '(555) 678-9012', location: 'Buford, GA 30518' },
    breakdown: [['Experience', 86], ['Education', 84], ['POST', 90], ['Background', 82], ['Driving Record', 80], ['References', 85]],
    assignedTo: [{ role: 'Background Investigator', name: 'Cpl. J. Adams' }, { role: 'HR Specialist', name: 'J. Martinez' }],
    attachments: [{ name: 'Employment Application.pdf' }, { name: 'Resume.pdf' }, { name: 'Background Investigation File.pdf' }, { name: 'Driving Record.pdf' }, { name: 'Credit Report.pdf' }],
    notes: [{ author: 'Cpl. J. Adams', date: 'Feb 02, 2026', text: 'Background proceeding well. No disqualifying issues to date. Awaiting final reference (02/05) and polygraph (02/12). Preliminary: likely recommend for hire pending polygraph.' }],
    activity: [
      { when: 'Feb 02, 2026', text: 'Investigator progress note added' },
      { when: 'Jan 25, 2026', text: 'Credit history check completed (score 720)' },
      { when: 'Dec 10, 2024', text: 'Employment verification completed' },
    ],
    nextAction: { title: 'Complete Polygraph Examination', due: 'Scheduled Feb 12, 2026 • final reference Feb 05', tone: 'amber', cta: 'View Background Case' },
    actions: [
      { label: 'View Investigation File', icon: Eye, variant: 'primary' },
      { label: 'Email Investigator', icon: Mail },
      { label: 'Investigation Timeline', icon: Calendar },
    ],
    detail: (
      <div>
        <SectionHeader>Background Investigation Status</SectionHeader>
        <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div>
              <p className="text-sm font-bold text-cyan-400">IN PROGRESS - 67 DAYS</p>
              <p className="text-xs text-secondary">Case #: BI-2024-0178 | Investigator: Cpl. J. Adams (GCSO IA)</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-secondary">Target Completion</p>
              <p className="text-sm text-primary font-medium">Feb 15, 2026</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-950/40 rounded-lg p-4 border border-border space-y-3">
          {[
            ['Initial Interview - COMPLETED (11/25/2024)', 'Applicant cooperative, professional, no concerns.', true],
            ['Criminal History Check - COMPLETED (11/26/2024)', 'GCIC/NCIC: No record ✓ | FBI fingerprint: No arrests ✓', true],
            ['Driving Record - COMPLETED (11/26/2024)', '1 speeding ticket (2021, paid). No DUI/suspensions. Acceptable ✓', true],
            ['Employment Verification - COMPLETED (12/10/2024)', 'Hall County Sheriff: "Reliable, no disciplinary issues, eligible for rehire"', true],
            ['Credit History - COMPLETED (01/25/2026)', 'Score: 720 (Good). No bankruptcies or judgments ✓', true],
          ].map(([title, sub]) => (
            <div key={title} className="flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-primary break-words">{title}</p>
                <p className="text-xs text-secondary break-words">{sub}</p>
              </div>
            </div>
          ))}
          <div className="flex items-start gap-3">
            <div className="w-4 h-4 border-2 border-amber-400 rounded-full flex-shrink-0 mt-0.5 animate-pulse" />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-amber-700 dark:text-amber-400 break-words">Reference Interviews - IN PROGRESS (4 of 5)</p>
              <p className="text-xs text-secondary break-words">Reference #5 (Lt. J. Davis) scheduled 02/05/2026</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-4 h-4 border border-slate-600 rounded-full flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-primary break-words">Polygraph Examination - SCHEDULED</p>
              <p className="text-xs text-secondary break-words">February 12, 2026 • 09:00 AM • Examiner: Sgt. R. Johnson (ret. GBI)</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'lisa',
    name: 'Lisa Williams',
    position: 'Detention Officer',
    division: 'Detention Division',
    ref: '2026-APP-0201',
    status: { label: 'NEW', tone: 'blue' },
    flags: [],
    score: 71,
    daysAgo: 93,
    stage: 'new',
    timelineCurrent: 'Screening',
    contact: { email: 'lisa.williams@email.com', phone: '(555) 567-8901', location: 'Snellville, GA 30039' },
    breakdown: [['Experience', 74], ['Education', 62], ['POST Corrections', 80], ['Certifications', 68], ['Pre-Screen', 70]],
    assignedTo: [{ role: 'HR Specialist', name: 'J. Martinez' }],
    attachments: [{ name: 'Employment Application.pdf' }, { name: 'Resume.pdf' }, { name: 'POST Corrections Certificate.pdf' }],
    notes: [{ author: 'J. Martinez', date: 'Feb 01, 2026', text: 'Solid corrections experience. Application backlogged behind Deputy Sheriff priority hiring. Flagging for screening week of Feb 09.' }],
    activity: [
      { when: 'Feb 01, 2026', text: 'Flagged for screening review' },
      { when: 'Nov 01, 2024', text: 'Application received' },
    ],
    nextAction: { title: 'Complete Initial Screening Review', due: 'Backlogged 93 days • target week of Feb 09, 2026', tone: 'red', cta: 'Start Screening' },
    actions: [
      { label: 'Priority Review', icon: AlertCircle, variant: 'warning' },
      { label: 'View Application', icon: Eye, variant: 'primary' },
      { label: 'Advance to Screening', icon: ChevronRight },
    ],
    detail: (
      <div>
        <SectionHeader>Qualifications Summary</SectionHeader>
        <div className="bg-white dark:bg-zinc-950/40 rounded-lg p-4 border border-border space-y-3">
          <div>
            <p className="text-xs text-slate-500 mb-1">Experience</p>
            <p className="text-sm text-primary font-medium">3 years GA Dept of Corrections</p>
            <p className="text-xs text-secondary">Correctional Officer II, Metro State Prison (2021-2024)</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-slate-500 mb-1">Education</p>
              <p className="text-sm text-primary">High School Diploma (South Gwinnett HS, 2020)</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-1">POST Certification</p>
              <p className="text-sm text-primary">GA POST Basic Corrections #52019</p>
              <p className="text-xs text-green-400">Valid through 08/2029 ✓</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'michael',
    name: 'Michael Davis',
    position: 'Deputy Sheriff',
    division: 'Patrol Division',
    ref: '2026-APP-0156',
    status: { label: 'DISQUALIFIED', tone: 'red' },
    flags: [],
    score: 41,
    daysAgo: 115,
    stage: 'rejected',
    timelineCurrent: 'Screening',
    rejected: true,
    accent: 'border-red-500/30',
    contact: { email: 'michael.davis@email.com', phone: '(555) 789-0123', location: 'Lawrenceville, GA 30043' },
    breakdown: [['Age Requirement', 0], ['Experience', 55], ['Education', 60]],
    assignedTo: [{ role: 'HR Specialist', name: 'J. Martinez' }],
    attachments: [{ name: 'Employment Application.pdf' }, { name: 'Disqualification Notice.pdf' }],
    notes: [{ author: 'J. Martinez', date: 'Oct 31, 2024', text: 'Applicant is 19. Does not meet POST age 21+ minimum for armed patrol deputy. Disqualified per POST standards & GCSO Policy 2.01. Notified via email + certified mail 11/01.' }],
    activity: [
      { when: 'Nov 01, 2024', text: 'Disqualification notice sent' },
      { when: 'Oct 31, 2024', text: 'Disqualified — age requirement' },
    ],
    nextAction: { title: 'No Action Required — Applicant Disqualified', due: 'May reapply after Aug 2027 (age eligibility)', tone: 'slate', cta: null },
    actions: [
      { label: 'View Application', icon: Eye, variant: 'primary' },
      { label: 'View Disqualification Notice', icon: FileText },
    ],
    detail: (
      <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
        <p className="text-sm font-bold text-red-400 mb-2">DISQUALIFICATION REASON</p>
        <p className="text-sm text-secondary break-words">Applicant is 19 years old. Georgia POST requires age 21+ for armed patrol deputy positions. Applicant does not meet minimum age requirement per POST standards and GCSO Policy 2.01.</p>
        <p className="text-xs text-secondary mt-2">Reviewed by: HR Specialist J. Martinez (10/31/2024) • Notification sent 11/01/2024</p>
      </div>
    ),
  },
];

/* ------------------------------------------------------------------ */
/* Applicant card                                                      */
/* ------------------------------------------------------------------ */

function ApplicantCard({ applicant, expanded, onToggle }) {
  const a = applicant;
  return (
    <div className={`bg-white dark:bg-zinc-900/40 border rounded-xl overflow-hidden ${a.accent || 'border-border'}`}>
      <button
        onClick={() => onToggle(a.id)}
        className="w-full p-4 sm:p-5 flex items-center gap-3 sm:gap-4 hover:bg-slate-100 dark:hover:bg-zinc-900/60 transition-colors text-left"
      >
        <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0 ${avatarTone[a.status.tone]}`}>
          <User className="w-6 h-6" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-base sm:text-lg font-bold text-primary break-words">{a.name}</h3>
            <span className={`px-2 py-0.5 border rounded text-[11px] font-bold ${toneMap[a.status.tone]}`}>{a.status.label}</span>
            {a.flags.map((f) => (
              <span key={f.label} className={`px-2 py-0.5 border rounded text-[11px] font-bold inline-flex items-center gap-1 ${toneMap[f.tone]}`}>
                <Star className="w-3 h-3" />{f.label}
              </span>
            ))}
          </div>
          <p className="text-sm text-secondary break-words">{a.position} • {a.division}</p>
          <p className="text-xs text-slate-500 mt-0.5 break-words">Applied {a.daysAgo} days ago • Ref {a.ref}</p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <ScoreBadge score={a.score} />
          {expanded ? <ChevronUp className="w-5 h-5 text-secondary" /> : <ChevronDown className="w-5 h-5 text-secondary" />}
        </div>
      </button>

      {expanded && (
        <div className="px-4 sm:px-5 pb-5 pt-5 space-y-5 border-t border-border">
          <HiringTimeline current={a.timelineCurrent} rejected={a.rejected} />
          <ScoreBreakdown score={a.score} breakdown={a.breakdown} />
          <div>
            <SectionHeader>Contact</SectionHeader>
            <ContactRow contact={a.contact} />
          </div>
          <AssignedTo people={a.assignedTo} />
          {a.detail}
          <Attachments files={a.attachments} />
          <InternalNotes notes={a.notes} />
          <RecentActivity items={a.activity} />
          <NextAction action={a.nextAction} />
          <ActionButtons actions={a.actions} />
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function ApplicantTracking() {
  const navigate = useNavigate();
  const [chatOpen, setChatOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [filterPosition, setFilterPosition] = useState('all');
  const [expandedApplicant, setExpandedApplicant] = useState('marcus');

  const formattedTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true,
  });

  const statusCounts = { all: 77, new: 8, screening: 12, interview: 17, background: 5, offer: 3, rejected: 9 };

  const pipelineTabs = [
    { id: 'all', label: 'All', count: statusCounts.all },
    { id: 'new', label: 'New', count: statusCounts.new },
    { id: 'screening', label: 'Screening', count: statusCounts.screening },
    { id: 'background', label: 'Background', count: statusCounts.background },
    { id: 'interview', label: 'Interview', count: statusCounts.interview },
    { id: 'offer', label: 'Offer', count: statusCounts.offer },
    { id: 'rejected', label: 'Rejected', count: statusCounts.rejected },
  ];

  const toggleApplicant = (id) => setExpandedApplicant(expandedApplicant === id ? null : id);

  const visibleApplicants = activeTab === 'all'
    ? applicants
    : applicants.filter((a) => a.stage === activeTab);

  return (
    <DashboardLayout navigation={hrNavigation} profile={hrProfile} notifications={hrNotifications} settingsRoute="/hr/settings" profileRoute="/hr/profile" activityRoute="/hr/activity" activityModuleFilter="hr">
      <div className="p-4 lg:p-6 min-h-full">
        <div className="max-w-7xl mx-auto">

          {/* Section Title */}
          <div className="mb-6">
            <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-1">Applicant Pipeline</h2>
            <p className="text-secondary break-words">Gwinnett County Sheriff's Office • Recruiting &amp; Applicant Tracking</p>
          </div>

          {/* Pipeline-stage tabs */}
          <div data-swipe-ignore className="mb-6 overflow-x-auto -mx-1 px-1">
            <div className="flex items-center gap-1 min-w-max">
              {pipelineTabs.map((tab, i) => (
                <React.Fragment key={tab.id}>
                  <button
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap border ${
                      activeTab === tab.id
                        ? 'bg-amber-500/15 border-amber-500/40 text-amber-700 dark:text-amber-400'
                        : 'bg-white dark:bg-zinc-900/40 border-border text-secondary hover:text-primary'
                    }`}
                  >
                    {tab.label}
                    <span className={`px-1.5 py-0.5 rounded-full text-[11px] ${
                      activeTab === tab.id ? 'bg-amber-500/20 text-amber-700 dark:text-amber-400' : 'bg-slate-100 dark:bg-zinc-800/60 text-slate-500'
                    }`}>{tab.count}</span>
                  </button>
                  {i < pipelineTabs.length - 1 && <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-600 flex-shrink-0" />}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-6">
            <div className="flex-1 min-w-0 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="text"
                placeholder="Search applicants by name, reference #, position..."
                className="w-full pl-12 pr-4 py-2.5 bg-white dark:bg-zinc-900/40 border border-border rounded-xl text-primary placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
              />
            </div>
            <select
              value={filterPosition}
              onChange={(e) => setFilterPosition(e.target.value)}
              className="px-4 py-2.5 bg-white dark:bg-zinc-900/40 border border-border rounded-xl text-primary text-sm focus:outline-none focus:border-amber-500/50 cursor-pointer"
            >
              <option value="all">All Positions</option>
              <option value="deputy">Deputy Sheriff (23)</option>
              <option value="investigator">Background Investigator (12)</option>
              <option value="detention">Detention Officer (8)</option>
              <option value="admin">Administrative Assistant (4)</option>
            </select>
            <select className="px-4 py-2.5 bg-white dark:bg-zinc-900/40 border border-border rounded-xl text-primary text-sm focus:outline-none focus:border-amber-500/50 cursor-pointer">
              <option>Sort: Candidate Score</option>
              <option>Sort: Application Date</option>
              <option>Sort: Last Name A-Z</option>
              <option>Sort: Pipeline Stage</option>
            </select>
            <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white dark:bg-zinc-900/40 border border-border rounded-xl text-primary text-sm hover:bg-slate-100 dark:hover:bg-zinc-900/60 transition-all">
              <Filter className="w-4 h-4" />
              More Filters
            </button>
          </div>

          {/* Applicant List */}
          <div className="space-y-4">
            {visibleApplicants.map((a) => (
              <ApplicantCard
                key={a.id}
                applicant={a}
                expanded={expandedApplicant === a.id}
                onToggle={toggleApplicant}
              />
            ))}
            {visibleApplicants.length === 0 && (
              <div className="bg-white dark:bg-zinc-900/40 border border-border rounded-xl p-10 text-center">
                <p className="text-secondary">No applicants in this stage.</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-border px-4 sm:px-6 py-3 mt-6 bg-slate-50 dark:bg-zinc-950/30">
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
            <span>System: GCSO-HRIS v4.2 | Last Updated: {formattedTime} EST</span>
            <span>Gwinnett County Sheriff's Office • Human Resources Division</span>
          </div>
        </footer>

        {/* Chat Button */}
        <button
          onClick={() => setChatOpen(!chatOpen)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 z-40"
        >
          {chatOpen ? <X className="w-6 h-6 text-white" /> : <MessageCircle className="w-6 h-6 text-white" />}
        </button>

        {chatOpen && (
          <div className="fixed bottom-24 right-4 sm:right-6 left-4 sm:left-auto w-auto sm:w-96 h-[500px] bg-surface-raised backdrop-blur-xl border border-border rounded-2xl shadow-2xl flex flex-col z-40">
            <div className="p-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-primary">GCSO HR Assistant</h3>
                  <p className="text-xs text-green-400">Online</p>
                </div>
              </div>
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="bg-white dark:bg-zinc-900/60 p-3 rounded-xl">
                    <p className="text-sm text-slate-700 dark:text-slate-200">Hi! I can help you track applicant status, schedule interviews, check background investigation progress, and prepare offer letters. What do you need help with?</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-border">
              <div className="flex items-center gap-2">
                <input type="text" placeholder="Ask about applicants..." className="flex-1 min-w-0 px-4 py-2 bg-white dark:bg-zinc-900/40 border border-border rounded-xl text-primary placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500/50" />
                <button className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Send className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
