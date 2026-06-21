import React, { useState } from 'react';
import {
  ArrowLeft, Mail, Calendar, FileText, CheckCircle,
  Clock, ShieldCheck, Briefcase, X, Send, ChevronRight
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import { hrNavigation, hrProfile, hrNotifications } from '../config/hrConfig';
import { SectionHeader, StagePill } from '../components/dashboard';
import { getApplicant, STAGE_ORDER } from '../data/jobPostings';

function Card({ children, className = '' }) {
  return <div className={`bg-white dark:bg-zinc-900/40 border border-border rounded-xl p-5 ${className}`}>{children}</div>;
}

// Drill-down leaf page: Job Workspace -> Applicant Workspace -> Applicant
// Profile. Full record for one candidate — resume summary, interview
// notes, background/offer status, and actions (schedule, email, advance).
export default function ApplicantProfile() {
  const navigate = useNavigate();
  const { jobId, applicantId } = useParams();
  const base = getApplicant(jobId, applicantId);
  const [notes, setNotes] = useState(base?.notes || []);
  const [stage, setStage] = useState(base?.stage || 'Applied');
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [emailOpen, setEmailOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const addNote = (author, text) => {
    setNotes(prev => [...prev, { date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }), author, text }]);
  };

  if (!base) {
    return (
      <DashboardLayout navigation={hrNavigation} profile={hrProfile} notifications={hrNotifications} settingsRoute="/hr/settings" profileRoute="/hr/profile" activityRoute="/hr/activity" activityModuleFilter="hr">
        <div className="p-5 lg:p-7">
          <p className="text-secondary">Applicant not found.</p>
          <button onClick={() => navigate(`/hr/jobs/${jobId}/applicants`)} className="mt-3 text-amber-600 dark:text-amber-400 text-sm font-medium">← Back to Applicants</button>
        </div>
      </DashboardLayout>
    );
  }

  const { job, ...applicant } = base;
  const currentIndex = STAGE_ORDER.indexOf(stage);
  const canAdvance = currentIndex >= 0 && currentIndex < STAGE_ORDER.length - 1;

  const advanceStage = () => {
    const next = STAGE_ORDER[currentIndex + 1];
    setStage(next);
    addNote('HR Director', `Advanced to ${next}.`);
    showToast(`Moved to ${next}.`);
  };

  return (
    <DashboardLayout navigation={hrNavigation} profile={hrProfile} notifications={hrNotifications} settingsRoute="/hr/settings" profileRoute="/hr/profile" activityRoute="/hr/activity" activityModuleFilter="hr">
      <div className="p-5 lg:p-7 space-y-5 bg-slate-100 dark:bg-transparent min-h-full">

        <div className="flex items-center gap-1.5 text-sm text-secondary flex-wrap">
          <button onClick={() => navigate(`/hr/jobs/${job.id}`)} className="hover:text-primary transition-colors flex items-center gap-1.5">
            <ArrowLeft className="w-4 h-4" /> {job.title}
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <button onClick={() => navigate(`/hr/jobs/${job.id}/applicants`)} className="hover:text-primary transition-colors">Applicants</button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-primary font-medium">{applicant.name}</span>
        </div>

        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-3 flex-wrap mb-1">
              <h1 className="text-2xl lg:text-3xl font-bold text-primary break-words">{applicant.name}</h1>
              <StagePill stage={stage} />
            </div>
            <p className="text-secondary flex items-center flex-wrap gap-1.5 text-sm">
              <span className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5 flex-shrink-0" />Applying for {job.title}</span>
              <span>· Applied {applicant.appliedDate} via {applicant.source}</span>
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <button onClick={() => setScheduleOpen(true)} className="px-3 py-2 bg-white dark:bg-zinc-900/60 border border-border hover:bg-slate-50 dark:hover:bg-zinc-800/60 text-primary text-sm font-bold rounded-lg flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" /> Schedule Interview
            </button>
            <button onClick={() => setEmailOpen(true)} className="px-3 py-2 bg-white dark:bg-zinc-900/60 border border-border hover:bg-slate-50 dark:hover:bg-zinc-800/60 text-primary text-sm font-bold rounded-lg flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" /> Send Email
            </button>
            {canAdvance && (
              <button onClick={advanceStage} className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-white text-sm font-bold rounded-lg whitespace-nowrap">
                Advance to {STAGE_ORDER[currentIndex + 1]}
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <Card className="text-center">
            <p className="text-2xl font-black tabular-nums text-primary">{applicant.aiScore}</p>
            <p className="text-xs text-secondary mt-1">AI Match Score</p>
          </Card>
          <Card className="text-center">
            <p className="text-2xl font-black tabular-nums text-primary break-words">{stage}</p>
            <p className="text-xs text-secondary mt-1">Current Stage</p>
          </Card>
          <Card className="text-center">
            <p className="text-2xl font-black tabular-nums text-primary break-words">{applicant.backgroundStatus || 'Not Started'}</p>
            <p className="text-xs text-secondary mt-1">Background Check</p>
          </Card>
          <Card className="text-center">
            <p className="text-2xl font-black tabular-nums text-primary break-words">{applicant.offerStatus || 'None'}</p>
            <p className="text-xs text-secondary mt-1">Offer Status</p>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

          <Card>
            <SectionHeader icon={FileText} title="Resume Summary" />
            {applicant.qualifications && applicant.qualifications.length > 0 ? (
              <ul className="text-sm text-secondary space-y-1.5">
                {applicant.qualifications.map((q, i) => <li key={i}>• {q}</li>)}
              </ul>
            ) : (
              <p className="text-sm text-secondary">No qualifications on file.</p>
            )}
            <div className="mt-4 pt-4 border-t border-border flex items-center gap-2 text-sm text-secondary">
              <FileText className="w-3.5 h-3.5" />Resume — {applicant.name}.pdf
            </div>
          </Card>

          <Card>
            <SectionHeader icon={ShieldCheck} title="Background & Offer" />
            <div className="space-y-3 text-sm">
              <div className="flex justify-between gap-3"><span className="text-secondary">Background Check</span><span className="text-primary font-medium">{applicant.backgroundStatus || 'Not Started'}</span></div>
              <div className="flex justify-between gap-3"><span className="text-secondary">Offer Status</span><span className="text-primary font-medium">{applicant.offerStatus || 'None'}</span></div>
              <div className="flex justify-between gap-3"><span className="text-secondary">Source</span><span className="text-primary font-medium">{applicant.source}</span></div>
              {applicant.internal !== undefined && (
                <div className="flex justify-between gap-3"><span className="text-secondary">Candidate Type</span><span className="text-primary font-medium">{applicant.internal ? 'Internal Transfer' : 'External'}</span></div>
              )}
            </div>
          </Card>

          <Card className="lg:col-span-2">
            <SectionHeader icon={Clock} title="Activity & Notes" />
            <div className="space-y-3 mb-4">
              {notes.length === 0 && <p className="text-sm text-secondary">No activity recorded yet.</p>}
              {notes.map((n, i) => (
                <div key={i} className="flex gap-3 text-sm">
                  <span className="text-secondary whitespace-nowrap">{n.date}</span>
                  <span className="text-primary"><span className="font-bold">{n.author}:</span> {n.text}</span>
                </div>
              ))}
            </div>
            <AddNoteForm onAdd={(text) => addNote('HR Director', text)} />
          </Card>

        </div>
      </div>

      {scheduleOpen && (
        <ScheduleInterviewModal
          onClose={() => setScheduleOpen(false)}
          onSchedule={(date, panel) => {
            addNote('HR Director', `Interview scheduled for ${date}${panel ? ` with ${panel}` : ''}.`);
            setScheduleOpen(false);
            showToast('Interview scheduled.');
          }}
        />
      )}

      {emailOpen && (
        <EmailModal
          to={applicant.name}
          onClose={() => setEmailOpen(false)}
          onSend={(subject) => {
            addNote('HR Director', `Email sent: "${subject}".`);
            setEmailOpen(false);
            showToast('Email sent.');
          }}
        />
      )}

      {toast && (
        <div className="fixed top-20 right-6 z-50">
          <div className="px-4 py-3 rounded-xl border shadow-2xl flex items-center gap-2 bg-green-500/20 border-green-500/30 text-green-600 dark:text-green-400">
            <CheckCircle className="w-4 h-4" />
            <p className="text-[11px] font-medium">{toast}</p>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

function AddNoteForm({ onAdd }) {
  const [text, setText] = useState('');
  return (
    <div className="flex items-center gap-2 pt-3 border-t border-border">
      <input
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Add a note..."
        className="flex-1 px-3 py-2 bg-slate-50 dark:bg-zinc-950/40 border border-border rounded-lg text-sm text-primary placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500/50"
        onKeyDown={e => { if (e.key === 'Enter' && text.trim()) { onAdd(text.trim()); setText(''); } }}
      />
      <button
        onClick={() => { if (text.trim()) { onAdd(text.trim()); setText(''); } }}
        className="px-3 py-2 bg-amber-500 hover:bg-amber-400 text-white text-sm font-bold rounded-lg whitespace-nowrap"
      >
        Add Note
      </button>
    </div>
  );
}

function ScheduleInterviewModal({ onClose, onSchedule }) {
  const [date, setDate] = useState('');
  const [panel, setPanel] = useState('');
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white dark:bg-zinc-900 border border-border rounded-2xl shadow-2xl w-full max-w-md p-5" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-black text-primary uppercase tracking-wide">Schedule Interview</h3>
          <button onClick={onClose} className="text-secondary hover:text-primary"><X className="w-4 h-4" /></button>
        </div>
        <div className="space-y-3">
          <div>
            <label className="text-xs font-bold text-secondary uppercase tracking-wide">Date & Time</label>
            <input type="datetime-local" value={date} onChange={e => setDate(e.target.value)} className="w-full mt-1 px-3 py-2 bg-slate-50 dark:bg-zinc-950/40 border border-border rounded-lg text-sm text-primary focus:outline-none focus:border-blue-500/50" />
          </div>
          <div>
            <label className="text-xs font-bold text-secondary uppercase tracking-wide">Panel / Interviewer</label>
            <input value={panel} onChange={e => setPanel(e.target.value)} placeholder="e.g. Major R. Davis, HR Director" className="w-full mt-1 px-3 py-2 bg-slate-50 dark:bg-zinc-950/40 border border-border rounded-lg text-sm text-primary placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500/50" />
          </div>
        </div>
        <div className="flex gap-2 mt-5">
          <button onClick={onClose} className="flex-1 px-4 py-2 border border-border rounded-lg text-sm font-bold text-secondary hover:bg-slate-50 dark:hover:bg-zinc-800/60">Cancel</button>
          <button
            onClick={() => onSchedule(date ? new Date(date).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }) : 'TBD', panel)}
            className="flex-1 px-4 py-2 bg-amber-500 hover:bg-amber-400 rounded-lg text-sm font-bold text-white"
          >
            Schedule
          </button>
        </div>
      </div>
    </div>
  );
}

function EmailModal({ to, onClose, onSend }) {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white dark:bg-zinc-900 border border-border rounded-2xl shadow-2xl w-full max-w-lg p-5" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-black text-primary uppercase tracking-wide">Email {to}</h3>
          <button onClick={onClose} className="text-secondary hover:text-primary"><X className="w-4 h-4" /></button>
        </div>
        <div className="space-y-3">
          <div>
            <label className="text-xs font-bold text-secondary uppercase tracking-wide">Subject</label>
            <input value={subject} onChange={e => setSubject(e.target.value)} className="w-full mt-1 px-3 py-2 bg-slate-50 dark:bg-zinc-950/40 border border-border rounded-lg text-sm text-primary focus:outline-none focus:border-blue-500/50" />
          </div>
          <div>
            <label className="text-xs font-bold text-secondary uppercase tracking-wide">Message</label>
            <textarea value={body} onChange={e => setBody(e.target.value)} rows={5} className="w-full mt-1 px-3 py-2 bg-slate-50 dark:bg-zinc-950/40 border border-border rounded-lg text-sm text-primary focus:outline-none focus:border-blue-500/50" />
          </div>
        </div>
        <div className="flex gap-2 mt-5">
          <button onClick={onClose} className="flex-1 px-4 py-2 border border-border rounded-lg text-sm font-bold text-secondary hover:bg-slate-50 dark:hover:bg-zinc-800/60">Cancel</button>
          <button
            onClick={() => onSend(subject || '(no subject)')}
            className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-400 rounded-lg text-sm font-bold text-white flex items-center justify-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" /> Send
          </button>
        </div>
      </div>
    </div>
  );
}
