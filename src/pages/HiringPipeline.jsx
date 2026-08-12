import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import { hrNavigation, hrProfile, hrNotifications } from '../config/hrConfig';

// ── Pipeline by stage ──────────────────────────────────────────
// Every candidate in process sits in exactly one stage, so the in-process
// count, the aging total and the track tabs are all sums of these rows.
//
// `median` is days in stage against that stage's own target — the pair is what
// makes a bottleneck legible. `passRate` is the share advancing from the stage.

const TRACKS = ['Deputy sheriff', 'Detention officer', 'Communications', 'Civilian'];

const stages = [
  {
    stage: 'Application received', note: 'Minimum-qualification screen · automated',
    median: 4, target: 10, aging: 0, passRate: 67, byTrack: [28, 27, 7, 2],
  },
  {
    stage: 'Written examination', note: 'Monthly test date · next Aug 22',
    median: 16, target: 21, aging: 2, passRate: 71, byTrack: [17, 16, 4, 1],
  },
  {
    stage: 'Physical assessment', note: 'POST standard battery · retest permitted once',
    median: 11, target: 14, aging: 1, passRate: 74, byTrack: [12, 11, 3, 1],
  },
  {
    stage: 'Oral board', note: 'Three-member panel · scheduled weekly',
    median: 13, target: 18, aging: 1, passRate: 82, byTrack: [8, 8, 2, 1],
  },
  {
    stage: 'Conditional offer', note: 'Offer letter · 10-day acceptance window',
    median: 6, target: 10, aging: 0, passRate: 89, byTrack: [6, 5, 2, 1],
  },
  {
    stage: 'Background investigation', short: 'Background', flag: 'BOTTLENECK',
    note: 'Four investigators · 47 active against a capacity of 40', noteTone: 'amber',
    median: 63, target: 45, aging: 22, passRate: 66, byTrack: [21, 20, 4, 2],
    detail: 'This is the binding constraint on the entire pipeline. Four investigators carry 47 active cases against a working capacity of 40, and the median has run 63 days against a 45-day target for two consecutive quarters. Twenty-two cases are past target. Every day added here is a day a candidate with a competing offer is unattended: three of the last nine withdrawals occurred during background, all after day 50. A fifth investigator, or contracting the civilian-track cases, is the only lever that moves the pipeline median.',
    withdrawalsHere: '3 of 9 in 90 days',
  },
  {
    stage: 'Polygraph · psych · medical', short: 'Poly · psych · med', flag: 'SLOWING',
    note: 'Contract vendor · scheduling constrained to one day a week', noteTone: 'amber',
    median: 24, target: 21, aging: 4, passRate: 77, byTrack: [6, 8, 1, 1],
    detail: 'A single contract vendor schedules one day a week. The stage runs three days past its target with four candidates aging, but the volume is small enough that a second vendor day clears it without a contract amendment.',
    withdrawalsHere: '1 of 9 in 90 days',
  },
  {
    stage: 'Academy seat assignment', short: 'Academy seat', flag: 'WAITING',
    note: 'Next cohort May 4 · 9 cleared and waiting', noteTone: 'red',
    median: 19, target: 14, aging: 3, passRate: null, byTrack: [5, 4, 0, 0],
    detail: 'Nine candidates have cleared every stage and are waiting on a start date. Five are deputies with seats in the current cohort; four are detention, where no academy is scheduled at all. The agency has already spent the full cost of hire on each of them.',
    withdrawalsHere: '4 of 9 in 90 days',
  },
];

const hire = {
  medianDays: 168,
  target: 150,
  twelveMonthsAgo: 138,
  backgroundNow: 63,
  backgroundThen: 41,
};

// ── Candidate roster ───────────────────────────────────────────
// The applicant record, merged in from Applicant Tracking. Each row opens the
// whole file: score breakdown, stage timeline, qualifications, screening
// checkpoints, assignment, attachments, notes and next action.
//
// `blocker` is what is holding the candidate. A row carrying one is exactly
// what "requires action" means, so the chip count and the filter are the same
// predicate.

const TIMELINE = [
  'Application received', 'Written examination', 'Physical assessment', 'Oral board',
  'Conditional offer', 'Background', 'Poly · psych · med', 'Academy seat',
];

const SCORE_DIMENSIONS = ['Experience', 'Education', 'POST certification', 'Physical fitness', 'Oral board', 'Background pre-screen'];

const candidates = [
  {
    id: 'A-26-1184', name: 'Marcus Johnson', ref: '2026-APP-0142', req: 'Deputy Sheriff', division: 'Patrol Division',
    track: 'Deputy sheriff', source: 'POST job board', stage: 'Background', blocker: 'Investigator load', inStage: 71, decision: 'OVERDUE',
    note: 'Competing offer from Cobb County · decision requested', score: 88,
    breakdown: [90, 85, 95, 90, 88, 92],
    contact: { email: 'm.johnson@example.com', phone: '(555) 234-5678', location: 'Lawrenceville, GA' },
    assigned: [['Background investigator', 'Inv. Halloran'], ['HR specialist', 'J. Martinez']],
    qualifications: '5 years law enforcement · Metro Atlanta PD 2019–2024, patrol · BS Criminal Justice, Georgia State 2018 · POST Basic #48291, current to 06/2027',
    screening: [
      ['Minimum qualifications', 'PASSED', 'Age 21+ · POST cert · HS/GED'],
      ['Physical assessment', 'PASSED', '1.5-mi 11:45 · push-ups 42 · 300m 52s'],
      ['Oral board', 'PASSED', 'Panel score 88 · recommended'],
      ['Background investigation', 'IN PROGRESS', 'Day 71 of a 45-day target'],
    ],
    attachments: ['Employment application', 'Resume', 'POST certificate', 'College transcript', 'Prior-agency file'],
    nextAction: { title: 'Adjudicate background packet', due: 'Overdue by 26 days · investigator load' },
    notes: [{ author: 'Lt. K. Williams', date: 'Aug 4', text: 'Candidate disclosed a competing offer from Cobb with a decision date of Aug 18. Packet is complete apart from the investigator review.' }],
    activity: [['Aug 4', 'Candidate reported competing offer'], ['Jul 12', 'Employment verification returned'], ['May 30', 'Assigned to Inv. Halloran']],
  },
  {
    id: 'A-26-1209', name: 'Denise Okoro', ref: '2026-APP-0187', req: 'Detention Officer', division: 'Detention',
    track: 'Detention officer', source: 'GovernmentJobs', stage: 'Background', blocker: 'Investigator load', inStage: 66, decision: 'OVERDUE',
    note: 'Prior-employer verification outstanding 24 days', score: 81,
    breakdown: [78, 80, 85, 86, 80, 78],
    contact: { email: 'd.okoro@example.com', phone: '(555) 412-9930', location: 'Snellville, GA' },
    assigned: [['Background investigator', 'Inv. Sedgwick'], ['HR specialist', 'J. Martinez']],
    qualifications: '3 years corrections · Fulton County Jail 2022–2025 · AS Criminal Justice, Georgia Piedmont 2022 · Detention certification eligible',
    screening: [
      ['Minimum qualifications', 'PASSED', 'Age 21+ · HS/GED · no disqualifying history'],
      ['Physical assessment', 'PASSED', 'Standard battery'],
      ['Oral board', 'PASSED', 'Panel score 80'],
      ['Background investigation', 'IN PROGRESS', 'Prior-employer verification outstanding 24 days'],
    ],
    attachments: ['Employment application', 'Resume', 'Prior-employer release', 'Reference sheet'],
    nextAction: { title: 'Chase prior-employer verification', due: 'Overdue by 21 days · second request unanswered' },
    notes: [{ author: 'Inv. Sedgwick', date: 'Jul 29', text: 'Second written request sent to Fulton County HR. No response. Recommend supervisor-level contact.' }],
    activity: [['Jul 29', 'Second verification request sent'], ['Jul 8', 'First request sent'], ['Jun 4', 'Assigned to Inv. Sedgwick']],
  },
  {
    id: 'A-26-1156', name: 'Ryan Delacroix', ref: '2026-APP-0119', req: 'Deputy Sheriff', division: 'Patrol Division',
    track: 'Deputy sheriff', source: 'Employee referral', stage: 'Academy seat', blocker: 'No cohort seat', inStage: 54, decision: 'AT RISK',
    note: 'Cleared all stages Jun 18 · waiting on a seat', score: 91,
    breakdown: [88, 92, 95, 94, 90, 90],
    contact: { email: 'r.delacroix@example.com', phone: '(555) 771-2048', location: 'Duluth, GA' },
    assigned: [['Training division', 'Sgt. Ibarra'], ['HR specialist', 'J. Martinez']],
    qualifications: '2 years military police · US Army 2021–2024 · BS Criminology, University of Georgia 2021 · POST Basic eligible',
    screening: [
      ['Minimum qualifications', 'PASSED', 'Age 21+ · degree · no disqualifying history'],
      ['Physical assessment', 'PASSED', 'Top-decile battery'],
      ['Oral board', 'PASSED', 'Panel score 90 · top candidate'],
      ['Background investigation', 'CLEARED', 'Adjudicated Jun 18'],
      ['Academy seat', 'WAITING', '54 days · seat available in 26-C'],
    ],
    attachments: ['Employment application', 'DD-214', 'Degree transcript', 'Background adjudication'],
    nextAction: { title: 'Assign to Deputy Academy 26-C', due: '5 seats open · candidate cleared and eligible' },
    notes: [{ author: 'Sgt. Ibarra', date: 'Aug 1', text: 'Eligible for the seat now open in 26-C. Referral source; the referring deputy has asked twice about a start date.' }],
    activity: [['Jun 18', 'Background adjudicated · cleared'], ['May 2', 'Oral board passed'], ['Apr 14', 'Referred by Dep. Whitaker']],
  },
  {
    id: 'A-26-1163', name: 'Alicia Brennan', ref: '2026-APP-0124', req: 'Detention Officer', division: 'Detention',
    track: 'Detention officer', source: 'GovernmentJobs', stage: 'Academy seat', blocker: 'Cohort unscheduled', inStage: 47, decision: 'AT RISK',
    note: 'Detention academy has no scheduled start', score: 84,
    breakdown: [80, 82, 88, 88, 84, 82],
    contact: { email: 'a.brennan@example.com', phone: '(555) 320-7741', location: 'Norcross, GA' },
    assigned: [['Training division', 'Sgt. Ibarra'], ['HR specialist', 'M. Torres']],
    qualifications: '4 years security supervision · BS Psychology, Kennesaw State 2020 · Detention certification eligible',
    screening: [
      ['Minimum qualifications', 'PASSED', 'Age 21+ · degree'],
      ['Physical assessment', 'PASSED', 'Standard battery'],
      ['Oral board', 'PASSED', 'Panel score 84'],
      ['Background investigation', 'CLEARED', 'Adjudicated Jun 25'],
      ['Academy seat', 'BLOCKED', 'Detention academy unscheduled · no instructor'],
    ],
    attachments: ['Employment application', 'Resume', 'Degree transcript', 'Background adjudication'],
    nextAction: { title: 'Schedule Detention Academy 26-B', due: 'Instructor unassigned · 4 candidates waiting' },
    notes: [{ author: 'M. Torres', date: 'Jul 30', text: 'Candidate has asked twice for a start date. There is none to give until an instructor is assigned.' }],
    activity: [['Jun 25', 'Background adjudicated · cleared'], ['May 20', 'Oral board passed'], ['Apr 2', 'Application received']],
  },
  {
    id: 'A-26-1247', name: 'Victor Salas', ref: '2026-APP-0208', req: 'Deputy Sheriff', division: 'Patrol Division',
    track: 'Deputy sheriff', source: 'Career fair', stage: 'Poly · psych · med', blocker: 'Vendor slot', inStage: 31, decision: '7 DAYS',
    note: 'Scheduled Aug 19 · earliest available vendor slot', score: 79,
    breakdown: [74, 78, 85, 82, 78, 78],
    contact: { email: 'v.salas@example.com', phone: '(555) 908-3312', location: 'Buford, GA' },
    assigned: [['Contract vendor', 'Meridian Assessment'], ['HR specialist', 'M. Torres']],
    qualifications: '1 year corrections · AS Criminal Justice, Gwinnett Tech 2024 · POST Basic eligible',
    screening: [
      ['Minimum qualifications', 'PASSED', 'Age 21+ · HS/GED'],
      ['Physical assessment', 'PASSED', 'Standard battery'],
      ['Oral board', 'PASSED', 'Panel score 78'],
      ['Background investigation', 'CLEARED', 'Adjudicated Jul 22'],
      ['Poly · psych · med', 'SCHEDULED', 'Aug 19 · earliest vendor slot'],
    ],
    attachments: ['Employment application', 'Resume', 'Background adjudication', 'Medical release'],
    nextAction: { title: 'Polygraph and psychological battery', due: 'Aug 19 · vendor schedules one day a week' },
    notes: [{ author: 'M. Torres', date: 'Jul 24', text: 'Earliest vendor slot is Aug 19. A second vendor day would have cleared this three weeks sooner.' }],
    activity: [['Jul 22', 'Background adjudicated · cleared'], ['Jun 30', 'Oral board passed'], ['Jun 9', 'Met at Gwinnett Tech career fair']],
  },
  {
    id: 'A-26-1288', name: 'Priya Raman', ref: '2026-APP-0231', req: '911 Communications Officer', division: 'Communications',
    track: 'Communications', source: 'Indeed', stage: 'Conditional offer', blocker: 'Acceptance window', inStage: 8, decision: '3 DAYS',
    note: 'Offer expires Aug 14 · no response to two contacts', score: 86,
    breakdown: [82, 88, null, 84, 88, 86],
    contact: { email: 'p.raman@example.com', phone: '(555) 664-1187', location: 'Sugar Hill, GA' },
    assigned: [['HR specialist', 'M. Torres'], ['Hiring manager', 'J. Ruiz']],
    qualifications: '6 years call-centre supervision · BA Communications, Georgia State 2018 · no POST requirement for this class',
    screening: [
      ['Minimum qualifications', 'PASSED', 'Typing · multitask battery'],
      ['Oral board', 'PASSED', 'Panel score 88'],
      ['Conditional offer', 'EXTENDED', 'Issued Aug 4 · expires Aug 14'],
    ],
    attachments: ['Employment application', 'Resume', 'Offer letter'],
    nextAction: { title: 'Third contact before the offer lapses', due: 'Expires Aug 14 · no response to two attempts' },
    notes: [{ author: 'J. Ruiz', date: 'Aug 8', text: 'Two calls and one email unanswered. Communications is the unit with the worst vacancy rate; this one is worth a supervisor call.' }],
    activity: [['Aug 8', 'Second contact attempt'], ['Aug 6', 'First contact attempt'], ['Aug 4', 'Conditional offer issued']],
  },
  {
    id: 'A-26-1198', name: 'Grant Whitfield', ref: '2026-APP-0166', req: 'Deputy Sheriff', division: 'Patrol Division',
    track: 'Deputy sheriff', source: 'GovernmentJobs', stage: 'Background', blocker: 'Records request', inStage: 58, decision: '14 DAYS',
    note: 'Out-of-state records request pending since Jul 3', score: 83,
    breakdown: [85, 78, 88, 84, 82, 80],
    contact: { email: 'g.whitfield@example.com', phone: '(555) 227-6690', location: 'Grayson, GA' },
    assigned: [['Background investigator', 'Inv. Brannigan'], ['HR specialist', 'J. Martinez']],
    qualifications: '7 years law enforcement · Charlotte-Mecklenburg PD 2017–2024 · AS Criminal Justice 2016 · POST reciprocity pending',
    screening: [
      ['Minimum qualifications', 'PASSED', 'Age 21+ · prior certification'],
      ['Physical assessment', 'PASSED', 'Standard battery'],
      ['Oral board', 'PASSED', 'Panel score 82'],
      ['Background investigation', 'IN PROGRESS', 'North Carolina records request pending since Jul 3'],
    ],
    attachments: ['Employment application', 'Resume', 'Prior-agency release', 'POST reciprocity form'],
    nextAction: { title: 'Follow up North Carolina records request', due: '36 days outstanding · reciprocity blocked behind it' },
    notes: [{ author: 'Inv. Brannigan', date: 'Aug 2', text: 'Out-of-state request is with the NC agency records unit. POST reciprocity cannot be filed until it returns.' }],
    activity: [['Aug 2', 'Records request followed up'], ['Jul 3', 'Records request submitted'], ['Jun 12', 'Assigned to Inv. Brannigan']],
  },
  {
    id: 'A-26-1221', name: 'Nadia Pruitt', ref: '2026-APP-0179', req: 'Detention Officer', division: 'Detention',
    track: 'Detention officer', source: 'Employee referral', stage: 'Oral board', blocker: 'Panel availability', inStage: 17, decision: '10 DAYS',
    note: 'Board scheduled Aug 20 · panel member on leave', score: 80,
    breakdown: [76, 80, 84, 86, null, 78],
    contact: { email: 'n.pruitt@example.com', phone: '(555) 505-8823', location: 'Lawrenceville, GA' },
    assigned: [['Panel chair', 'Capt. Nguyen'], ['HR specialist', 'M. Torres']],
    qualifications: '2 years detention · Hall County 2023–2025 · HS diploma · detention certification eligible',
    screening: [
      ['Minimum qualifications', 'PASSED', 'Age 21+ · HS/GED'],
      ['Physical assessment', 'PASSED', 'Standard battery'],
      ['Oral board', 'SCHEDULED', 'Aug 20 · one panel member on leave'],
    ],
    attachments: ['Employment application', 'Resume', 'Reference sheet'],
    nextAction: { title: 'Seat a third panel member', due: 'Board Aug 20 · panel is short one member' },
    notes: [{ author: 'M. Torres', date: 'Aug 5', text: 'Board cannot sit with two members. A substitute chair would hold the date.' }],
    activity: [['Aug 5', 'Board scheduled Aug 20'], ['Jul 24', 'Physical assessment passed'], ['Jul 10', 'Referred by Sgt. Pruitt']],
  },
  {
    id: 'A-26-1302', name: 'Elliot Vance', ref: '2026-APP-0244', req: 'Deputy Sheriff', division: 'Patrol Division',
    track: 'Deputy sheriff', source: 'Military transition', stage: 'Background', blocker: null, inStage: 22, decision: 'ON TRACK',
    note: 'SkillBridge candidate · separates Oct 3', score: 87,
    breakdown: [84, 86, 90, 92, 86, 84],
    contact: { email: 'e.vance@example.com', phone: '(555) 118-4402', location: 'Fort Eisenhower, GA' },
    assigned: [['Background investigator', 'Inv. Okoro'], ['HR specialist', 'J. Martinez']],
    qualifications: '6 years military police · US Army, separating Oct 3 · SkillBridge participant · POST Basic eligible',
    screening: [
      ['Minimum qualifications', 'PASSED', 'Age 21+ · service record'],
      ['Physical assessment', 'PASSED', 'Top-quartile battery'],
      ['Oral board', 'PASSED', 'Panel score 86'],
      ['Background investigation', 'IN PROGRESS', 'Day 22 of a 45-day target'],
    ],
    attachments: ['Employment application', 'DD-214 (pending)', 'SkillBridge agreement', 'Service record'],
    nextAction: { title: 'Complete background before separation date', due: 'Separates Oct 3 · on target' },
    notes: [], activity: [['Jul 18', 'Assigned to Inv. Okoro'], ['Jul 2', 'Oral board passed']],
  },
  {
    id: 'A-26-1295', name: 'Kelsey Nash', ref: '2026-APP-0238', req: 'Detention Officer', division: 'Detention',
    track: 'Detention officer', source: 'GovernmentJobs', stage: 'Background', blocker: null, inStage: 19, decision: 'ON TRACK',
    note: 'Packet complete · queued for adjudication', score: 82,
    breakdown: [78, 80, 86, 84, 82, 82],
    contact: { email: 'k.nash@example.com', phone: '(555) 443-9012', location: 'Snellville, GA' },
    assigned: [['Background investigator', 'Inv. Okoro'], ['HR specialist', 'M. Torres']],
    qualifications: '3 years corrections · AS Criminal Justice 2022 · detention certification eligible',
    screening: [
      ['Minimum qualifications', 'PASSED', 'Age 21+ · HS/GED'],
      ['Physical assessment', 'PASSED', 'Standard battery'],
      ['Oral board', 'PASSED', 'Panel score 82'],
      ['Background investigation', 'READY', 'Packet complete · awaiting command review'],
    ],
    attachments: ['Employment application', 'Resume', 'Reference sheet', 'Background packet'],
    nextAction: { title: 'Command review of completed packet', due: 'Ready for adjudication · median 6 days' },
    notes: [], activity: [['Aug 6', 'Packet marked complete'], ['Jul 21', 'Assigned to Inv. Okoro']],
  },
  {
    id: 'A-26-1311', name: 'Tomas Iverson', ref: '2026-APP-0251', req: '911 Communications Officer', division: 'Communications',
    track: 'Communications', source: 'Employee referral', stage: 'Conditional offer', blocker: null, inStage: 4, decision: 'ON TRACK',
    note: 'Offer accepted · start date Aug 25', score: 85,
    breakdown: [80, 84, null, 86, 88, 84],
    contact: { email: 't.iverson@example.com', phone: '(555) 776-2210', location: 'Duluth, GA' },
    assigned: [['HR specialist', 'M. Torres'], ['Hiring manager', 'J. Ruiz']],
    qualifications: '4 years dispatch · Hall County E-911 2021–2025 · no POST requirement for this class',
    screening: [
      ['Minimum qualifications', 'PASSED', 'Typing · multitask battery'],
      ['Oral board', 'PASSED', 'Panel score 88'],
      ['Conditional offer', 'ACCEPTED', 'Start date Aug 25'],
    ],
    attachments: ['Employment application', 'Resume', 'Signed offer letter'],
    nextAction: { title: 'Onboarding packet and in-house academy seat', due: 'Start Aug 25 · six-week in-house academy' },
    notes: [], activity: [['Aug 6', 'Offer accepted'], ['Aug 2', 'Conditional offer issued']],
  },
  {
    id: 'A-26-1276', name: 'Dana Kestrel', ref: '2026-APP-0226', req: 'Deputy Sheriff', division: 'Patrol Division',
    track: 'Deputy sheriff', source: 'POST job board', stage: 'Academy seat', blocker: null, inStage: 11, decision: 'ON TRACK',
    note: 'Lateral transfer · academy waiver under review', score: 89,
    breakdown: [92, 84, 95, 88, 88, 86],
    contact: { email: 'd.kestrel@example.com', phone: '(555) 338-5567', location: 'Sugar Hill, GA' },
    assigned: [['Training division', 'Sgt. Ibarra'], ['HR specialist', 'J. Martinez']],
    qualifications: '9 years law enforcement · DeKalb County PD 2016–2025 · POST Basic current · lateral waiver eligible',
    screening: [
      ['Minimum qualifications', 'PASSED', 'Current POST certification'],
      ['Physical assessment', 'PASSED', 'Standard battery'],
      ['Oral board', 'PASSED', 'Panel score 88'],
      ['Background investigation', 'CLEARED', 'Adjudicated Jul 29'],
      ['Academy seat', 'WAIVER PENDING', 'Lateral waiver under POST review'],
    ],
    attachments: ['Employment application', 'POST certificate', 'Prior-agency file', 'Waiver application'],
    nextAction: { title: 'POST lateral waiver determination', due: 'Waiver would bypass the academy entirely' },
    notes: [], activity: [['Jul 29', 'Background adjudicated · cleared'], ['Jul 1', 'Waiver application filed']],
  },
  {
    id: 'A-26-1318', name: 'Omar Bhatt', ref: '2026-APP-0257', req: 'Detention Officer', division: 'Detention',
    track: 'Detention officer', source: 'Career fair', stage: 'Oral board', blocker: null, inStage: 6, decision: 'ON TRACK',
    note: 'Oral board scheduled Aug 15', score: 77,
    breakdown: [72, 78, 82, 80, null, 76],
    contact: { email: 'o.bhatt@example.com', phone: '(555) 991-3084', location: 'Norcross, GA' },
    assigned: [['Panel chair', 'Capt. Nguyen'], ['HR specialist', 'M. Torres']],
    qualifications: '1 year security · HS diploma · detention certification eligible',
    screening: [
      ['Minimum qualifications', 'PASSED', 'Age 21+ · HS/GED'],
      ['Physical assessment', 'PASSED', 'Standard battery'],
      ['Oral board', 'SCHEDULED', 'Aug 15'],
    ],
    attachments: ['Employment application', 'Resume'],
    nextAction: { title: 'Oral board Aug 15', due: 'Panel confirmed' },
    notes: [], activity: [['Aug 3', 'Board scheduled'], ['Jul 28', 'Physical assessment passed']],
  },
  {
    id: 'A-26-1324', name: 'Reese Boyd', ref: '2026-APP-0262', req: 'Fleet Maintenance Technician', division: 'Support Services',
    track: 'Civilian', source: 'Indeed', stage: 'Conditional offer', blocker: null, inStage: 3, decision: 'ON TRACK',
    note: 'ASE certification verified', score: 84,
    breakdown: [88, 74, null, null, 84, 82],
    contact: { email: 'r.boyd@example.com', phone: '(555) 210-4478', location: 'Buford, GA' },
    assigned: [['Hiring manager', 'S. Boyd'], ['HR specialist', 'M. Torres']],
    qualifications: '11 years fleet maintenance · ASE Master Technician · no POST requirement for this class',
    screening: [
      ['Minimum qualifications', 'PASSED', 'ASE certification verified'],
      ['Oral board', 'PASSED', 'Panel score 84'],
      ['Conditional offer', 'EXTENDED', 'Issued Aug 7'],
    ],
    attachments: ['Employment application', 'ASE certification', 'Offer letter'],
    nextAction: { title: 'Await offer acceptance', due: '10-day acceptance window · expires Aug 17' },
    notes: [], activity: [['Aug 7', 'Conditional offer issued'], ['Aug 1', 'ASE certification verified']],
  },
  {
    id: 'A-26-1330', name: 'Harper Liu', ref: '2026-APP-0268', req: 'Records Technician', division: 'Support Services',
    track: 'Civilian', source: 'GovernmentJobs', stage: 'Background', blocker: null, inStage: 9, decision: 'ON TRACK',
    note: 'Background packet returned Aug 6', score: 80,
    breakdown: [76, 82, null, null, 82, 80],
    contact: { email: 'h.liu@example.com', phone: '(555) 604-9931', location: 'Lawrenceville, GA' },
    assigned: [['Background investigator', 'Inv. Brannigan'], ['HR specialist', 'M. Torres']],
    qualifications: '5 years records administration · BA Public Administration 2019 · CJIS certification eligible',
    screening: [
      ['Minimum qualifications', 'PASSED', 'Records experience · CJIS eligible'],
      ['Oral board', 'PASSED', 'Panel score 82'],
      ['Background investigation', 'IN PROGRESS', 'Civilian-track case · day 9'],
    ],
    attachments: ['Employment application', 'Resume', 'CJIS consent form'],
    nextAction: { title: 'Complete civilian-track background', due: 'Records position is behind the open-records finding' },
    notes: [], activity: [['Aug 6', 'Packet returned'], ['Jul 30', 'Assigned to Inv. Brannigan']],
  },
  {
    id: 'A-26-1341', name: 'Casey Whitaker', ref: '2026-APP-0274', req: 'Deputy Sheriff', division: 'Patrol Division',
    track: 'Deputy sheriff', source: 'GovernmentJobs', stage: 'Written examination', blocker: null, inStage: 12, decision: 'ON TRACK',
    note: 'Written exam Aug 22', score: null,
    breakdown: [null, 80, null, null, null, null],
    contact: { email: 'c.whitaker@example.com', phone: '(555) 872-1140', location: 'Grayson, GA' },
    assigned: [['HR specialist', 'J. Martinez']],
    qualifications: 'No prior law enforcement · BS Sociology 2024 · POST Basic eligible on hire',
    screening: [
      ['Minimum qualifications', 'PASSED', 'Age 21+ · degree'],
      ['Written examination', 'SCHEDULED', 'Aug 22 · monthly test date'],
    ],
    attachments: ['Employment application', 'Degree transcript'],
    nextAction: { title: 'Written examination Aug 22', due: 'Monthly cadence · applied Jul 28' },
    notes: [], activity: [['Jul 28', 'Application received']],
  },
  {
    id: 'A-26-1347', name: 'Jordan Alvarez', ref: '2026-APP-0279', req: 'Detention Officer', division: 'Detention',
    track: 'Detention officer', source: 'Employee referral', stage: 'Physical assessment', blocker: null, inStage: 5, decision: 'ON TRACK',
    note: 'Physical assessment passed Aug 4', score: null,
    breakdown: [null, 76, null, 84, null, null],
    contact: { email: 'j.alvarez@example.com', phone: '(555) 336-7728', location: 'Snellville, GA' },
    assigned: [['HR specialist', 'M. Torres']],
    qualifications: '2 years security · HS diploma · detention certification eligible',
    screening: [
      ['Minimum qualifications', 'PASSED', 'Age 21+ · HS/GED'],
      ['Physical assessment', 'PASSED', 'Standard battery Aug 4'],
    ],
    attachments: ['Employment application', 'Resume'],
    nextAction: { title: 'Schedule oral board', due: 'Panel sits weekly' },
    notes: [], activity: [['Aug 4', 'Physical assessment passed'], ['Jul 22', 'Referred by Sgt. Alvarez']],
  },
  {
    id: 'A-26-1352', name: 'Simone Ferreira', ref: '2026-APP-0283', req: '911 Communications Officer', division: 'Communications',
    track: 'Communications', source: 'Career fair', stage: 'Application received', blocker: null, inStage: 2, decision: 'ON TRACK',
    note: 'Minimum qualifications cleared', score: null,
    breakdown: [null, null, null, null, null, null],
    contact: { email: 's.ferreira@example.com', phone: '(555) 447-0091', location: 'Duluth, GA' },
    assigned: [['HR specialist', 'M. Torres']],
    qualifications: '3 years customer operations · AS Business 2023 · no POST requirement for this class',
    screening: [['Minimum qualifications', 'PASSED', 'Typing · multitask battery']],
    attachments: ['Employment application'],
    nextAction: { title: 'Schedule oral board', due: 'Communications has no academy dependency' },
    notes: [], activity: [['Aug 7', 'Minimum qualifications cleared']],
  },
];

const ROSTER_FILTERS = ['Requires action', 'Background', 'Academy seat', 'Conditional offer', 'All shown'];

// ── Right column ───────────────────────────────────────────────

const CASES_PER_INVESTIGATOR = 10;
const investigators = [
  { name: 'Inv. Halloran',  note: 'Oldest case 71 days · 6 past target',        active: 14 },
  { name: 'Inv. Sedgwick',  note: 'Oldest case 66 days · 6 past target',        active: 13 },
  { name: 'Inv. Brannigan', note: 'Oldest case 52 days · 5 past target',        active: 11 },
  { name: 'Inv. Okoro',     note: 'Returned from leave Jul 28 · 5 past target', active: 9  },
];

// `agency` marks losses that trace to process delay or capacity rather than to
// a candidate failing a standard — the ones that are actually actionable.
const attrition = [
  { reason: 'Accepted competing offer',            note: 'Cobb 5 · Atlanta PD 4 · DeKalb 3 · other 2', count: 14, agency: true  },
  { reason: 'Withdrew during background',          note: 'All after day 50 in stage',                  count: 9,  agency: true  },
  { reason: 'Failed background',                   note: 'Disqualifying history · policy 2.4',         count: 8,  agency: false },
  { reason: 'Failed written or physical',          note: 'Retest available on both',                   count: 11, agency: false },
  { reason: 'Withdrew awaiting academy',           note: 'Cleared all stages, no seat available',      count: 4,  agency: true  },
  { reason: 'Polygraph or psych disqualification', note: 'Contract vendor determination',              count: 6,  agency: false },
  { reason: 'Non-responsive',                      note: 'No contact through two attempts',            count: 7,  agency: false },
];

const cohorts = [
  { cohort: 'Deputy Academy 26-C',    dates: 'May 4 – Sep 12',  seated: 19, capacity: 24, note: '5 seats open · 5 candidates cleared and eligible' },
  { cohort: 'Detention Academy 26-B', dates: 'Unscheduled',     seated: 0,  capacity: 20, note: 'Instructor unassigned · 4 candidates waiting', unscheduled: true },
  { cohort: 'Communications 26-A',    dates: 'Sep 8 – Nov 14',  seated: 6,  capacity: 8,  note: '2 seats open · pipeline supports 2' },
  { cohort: 'Deputy Academy 27-A',    dates: 'Jan 12 – May 22', seated: 0,  capacity: 24, note: 'Opens for assignment Oct 1' },
];

// Rolling median time to hire, oldest month first.
const timeToHire = [
  { month: 'Sep 2025', days: 138 }, { month: 'Oct', days: 141 }, { month: 'Nov', days: 144 },
  { month: 'Dec', days: 147 },      { month: 'Jan', days: 152 }, { month: 'Feb', days: 149 },
  { month: 'Mar', days: 155 },      { month: 'Apr', days: 158 }, { month: 'May', days: 161 },
  { month: 'Jun', days: 163 },      { month: 'Jul', days: 166 }, { month: 'Aug 2026', days: 168 },
];

const intelligence = [
  {
    title: 'Background is the whole problem', tone: 'red',
    body: null, // templated from the trend
    action: 'Fund a fifth background investigator in the FY27 request; contract civilian-track cases now.',
    sources: 'Applicant tracking · background case management · 12-month trend',
  },
  {
    title: 'Nine candidates cleared, no seat', tone: 'red',
    body: null, // templated from the academy stage split
    action: 'Assign a detention academy instructor and set a start date before the next withdrawal.',
    sources: 'Academy schedule · applicant tracking · Training Division',
  },
  {
    title: 'Testing cadence costs eleven days', tone: 'amber',
    body: 'Monthly written exams mean a candidate applying just after a test date waits five weeks. The exam is proctored by existing training staff, so a second monthly date adds no headcount.',
    action: 'Move to twice-monthly written testing beginning September.',
    sources: 'Training Division schedule · stage median analysis',
  },
];

// ── Helpers ────────────────────────────────────────────────────

const pct = (n, d) => (d ? (n / d) * 100 : 0);

const flowOf = (s) => {
  if (s.flag === 'BOTTLENECK') return 'BOTTLENECK';
  if (s.flag === 'WAITING') return 'WAITING';
  return s.median > s.target ? 'SLOWING' : 'WITHIN TARGET';
};
const flowTone = {
  'WITHIN TARGET': 'text-emerald-400',
  SLOWING:         'text-amber-400',
  BOTTLENECK:      'text-red-400',
  WAITING:         'text-amber-400',
};
const flagTone = {
  BOTTLENECK: 'border-red-500/60 text-red-400',
  SLOWING:    'border-amber-500/60 text-amber-400',
  WAITING:    'border-amber-500/60 text-amber-400',
};
const decisionTone = (d) =>
  d === 'OVERDUE' ? 'text-red-400' : d === 'AT RISK' ? 'text-amber-400'
    : d === 'ON TRACK' ? 'text-slate-500' : 'text-amber-400/80';

const dotTone = { emerald: 'bg-emerald-400', amber: 'bg-amber-400', red: 'bg-red-500', slate: 'bg-slate-600' };
const textTone = { emerald: 'text-emerald-400', amber: 'text-amber-400', red: 'text-red-400', slate: 'text-slate-400' };

function SectionLabel({ children, right }) {
  return (
    <div className="flex items-baseline justify-between gap-3 mb-3">
      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">{children}</p>
      {right}
    </div>
  );
}

function Meter({ value, tone = 'bg-slate-600' }) {
  return (
    <span className="block h-1 bg-zinc-800/70 rounded-full">
      <span className={`block h-full rounded-full ${tone}`} style={{ width: `${Math.min(value, 100)}%` }} />
    </span>
  );
}

export default function HiringPipeline() {
  const navigate = useNavigate();
  const [openStage, setOpenStage] = useState('Background investigation');
  const [track, setTrack] = useState('All tracks');
  const [roster, setRoster] = useState('Requires action');
  const [query, setQuery] = useState('');
  const [openRecord, setOpenRecord] = useState('A-26-1184');

  // ── Pipeline roll-up ────────────────────────────────────────
  const withTotals = stages.map((s) => ({
    ...s,
    inStage: s.byTrack.reduce((a, n) => a + n, 0),
    flow: flowOf(s),
  }));
  const inProcess = withTotals.reduce((a, s) => a + s.inStage, 0);
  const agingTotal = withTotals.reduce((a, s) => a + s.aging, 0);
  const tabs = [
    { track: 'All tracks', n: inProcess },
    ...TRACKS.map((t, i) => ({ track: t, n: stages.reduce((a, s) => a + s.byTrack[i], 0) })),
  ];
  const trackIndex = TRACKS.indexOf(track);

  const background = withTotals.find((s) => s.stage === 'Background investigation');
  const academy = withTotals.find((s) => s.stage === 'Academy seat assignment');

  // ── Background load ─────────────────────────────────────────
  const bgActive = investigators.reduce((a, i) => a + i.active, 0);
  const bgCapacity = investigators.length * CASES_PER_INVESTIGATOR;
  const bgOver = investigators.filter((i) => i.active > CASES_PER_INVESTIGATOR).length;

  // ── Attrition ───────────────────────────────────────────────
  const lost = attrition.reduce((a, r) => a + r.count, 0);
  const actionable = attrition.filter((r) => r.agency).reduce((a, r) => a + r.count, 0);

  // ── Cohorts and trend ───────────────────────────────────────
  const unscheduled = cohorts.filter((c) => c.unscheduled).length;
  const trendMax = Math.max(...timeToHire.map((m) => m.days));
  const trendMin = Math.min(...timeToHire.map((m) => m.days));
  const grew = hire.medianDays - hire.twelveMonthsAgo;
  const bgGrew = hire.backgroundNow - hire.backgroundThen;

  const pastDecision = candidates.filter((c) => c.decision === 'OVERDUE').length;
  const atRisk = candidates.filter((c) => c.decision === 'AT RISK').length;

  // Roster: "requires action" is exactly the rows carrying a blocker, so the
  // chip count and the filtered list are the same predicate.
  const inFilter = (c, f) =>
    f === 'All shown' ? true : f === 'Requires action' ? !!c.blocker : c.stage === f;
  const rosterCount = (f) => candidates.filter((c) => inFilter(c, f)).length;
  const q = query.trim().toLowerCase();
  const rosterRows = candidates
    .filter((c) => inFilter(c, roster))
    .filter((c) => !q || `${c.id} ${c.req} ${c.stage} ${c.source} ${c.note}`.toLowerCase().includes(q));

  const cards = intelligence.map((c) => {
    if (c.body) return c;
    if (c.title.startsWith('Background')) {
      return { ...c, body: `Time to hire grew ${grew} days over twelve months. Background investigation grew ${bgGrew} of those days, and the rest is the academy gap. No other stage moved materially.` };
    }
    return {
      ...c,
      body: `${academy.inStage} candidates have passed every stage and are waiting on a cohort. `
        + `${academy.byTrack[1]} of them are detention, where no academy is scheduled at all. `
        + 'The agency has already spent the full cost of hire on each.',
    };
  });

  return (
    <DashboardLayout navigation={hrNavigation} profile={hrProfile} notifications={hrNotifications} settingsRoute="/hr/settings" profileRoute="/hr/profile" activityRoute="/hr/activity" activityModuleFilter="hr">
      <div className="min-h-full bg-[#0A0A0B] px-6 py-8">
        <div className="max-w-[1500px] mx-auto">

          {/* ── Header ─────────────────────────────────────── */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-4">
            <div className="flex items-baseline gap-3 flex-wrap">
              <h1 className="text-[19px] font-bold text-slate-100">Hiring Pipeline</h1>
              <span className="text-[11px] text-slate-500">
                Candidates in process from application to academy seat · applicant tracking · POST records · background case management
              </span>
            </div>
            <div className="flex items-center gap-4 lg:ml-auto flex-wrap">
              <span className="text-[11px] text-amber-400/90">
                {pastDecision} candidates past decision date · background is the binding constraint
              </span>
              <button
                onClick={() => window.print()}
                className="px-3.5 py-2 border border-amber-500/60 rounded-lg text-[11.5px] font-semibold text-amber-400 hover:bg-amber-500/10 transition-colors"
              >
                Pipeline report
              </button>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 xl:grid-cols-2 gap-8">

            {/* ══ Left column ═══════════════════════════════ */}
            <div>
              {/* Headline */}
              <div className="border border-slate-800/80 rounded-xl grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-800/60">
                <div className="px-5 py-4 border-b border-slate-800/60">
                  <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />In process
                  </p>
                  <p className="leading-none">
                    <span className="text-[24px] font-bold text-slate-100">{inProcess}</span>
                    <span className="text-[11.5px] text-slate-400 ml-2">all tracks</span>
                  </p>
                  <p className="text-[10.5px] text-amber-400/90 mt-2">{agingTotal} candidates past stage target</p>
                </div>
                <div className="px-5 py-4 border-b border-slate-800/60">
                  <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />Time to hire
                  </p>
                  <p className="leading-none">
                    <span className="text-[24px] font-bold text-slate-100">{hire.medianDays}</span>
                    <span className="text-[11.5px] text-slate-400 ml-2">days median</span>
                  </p>
                  <p className="text-[10.5px] text-red-400/90 mt-2">target {hire.target} · up {grew} days over 12 months</p>
                </div>
                <div className="px-5 py-4">
                  <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />Background queue
                  </p>
                  <p className="leading-none">
                    <span className="text-[24px] font-bold text-slate-100">{bgActive}</span>
                    <span className="text-[11.5px] text-slate-400 ml-2">of {bgCapacity} capacity</span>
                  </p>
                  <p className="text-[10.5px] text-amber-400/90 mt-2">
                    median {background.median} days against a {background.target}-day target
                  </p>
                </div>
                <div className="px-5 py-4">
                  <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />Lost — 90 days
                  </p>
                  <p className="leading-none">
                    <span className="text-[24px] font-bold text-slate-100">{lost}</span>
                    <span className="text-[11.5px] text-slate-400 ml-2">candidates</span>
                  </p>
                  <p className="text-[10.5px] text-amber-400/90 mt-2">{actionable} to causes the agency controls</p>
                </div>
              </div>

              {/* Pipeline by stage */}
              <div className="mt-7">
                <SectionLabel right={
                  <span className="flex items-center gap-4 flex-wrap">
                    {tabs.map((t) => (
                      <button
                        key={t.track}
                        onClick={() => setTrack(t.track)}
                        className={`text-[11px] transition-colors ${
                          track === t.track ? 'text-slate-100 font-semibold underline underline-offset-4' : 'text-slate-500 hover:text-slate-300'
                        }`}
                      >
                        {t.track} <span className="font-mono text-slate-500">{t.n}</span>
                      </button>
                    ))}
                  </span>
                }>
                  Pipeline by stage
                </SectionLabel>

                <div className="flex items-end gap-3 pb-2 border-b border-slate-800/70 pl-3 text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500">
                  <span className="flex-1 min-w-0">Stage</span>
                  <span className="w-14 text-right flex-shrink-0">In stage</span>
                  <span className="w-14 text-right flex-shrink-0">Median</span>
                  <span className="w-12 text-right flex-shrink-0">Aging</span>
                  <span className="w-[92px] flex-shrink-0">Pass rate</span>
                  <span className="w-28 text-right flex-shrink-0">Flow</span>
                </div>

                <div className="divide-y divide-slate-800/50">
                  {withTotals.map((s, i) => {
                    const isOpen = openStage === s.stage;
                    const count = track === 'All tracks' ? s.inStage : s.byTrack[trackIndex];
                    const over = s.median > s.target;
                    return (
                      <div key={s.stage} className={`border-l-2 ${
                        s.flow === 'BOTTLENECK' ? 'border-red-500/70' : s.flow === 'WITHIN TARGET' ? 'border-transparent' : 'border-amber-500/60'
                      }`}>
                        <button
                          onClick={() => setOpenStage(isOpen ? null : s.stage)}
                          className="w-full flex items-center gap-3 py-3 pl-3 text-left hover:bg-zinc-900/40 transition-colors"
                        >
                          <div className="flex-1 min-w-0">
                            <span className="flex items-center gap-2">
                              <span className="font-mono text-[9px] text-slate-600">{i + 1}</span>
                              <span className="text-[12.5px] font-semibold text-slate-100 truncate">{s.short ?? s.stage}</span>
                              {s.flag && (
                                <span className={`border rounded px-1.5 py-0.5 text-[9px] font-bold tracking-wider flex-shrink-0 ${flagTone[s.flag]}`}>
                                  {s.flag}
                                </span>
                              )}
                            </span>
                            <p className={`text-[10px] truncate mt-0.5 ${
                              s.noteTone === 'red' ? 'text-red-400/90' : s.noteTone === 'amber' ? 'text-amber-400/80' : 'text-slate-500'
                            }`}>{s.note}</p>
                          </div>
                          <span className="w-14 text-right text-[12px] font-mono font-bold text-slate-100 flex-shrink-0">{count}</span>
                          <span className={`w-14 text-right text-[11px] font-mono flex-shrink-0 ${over ? 'text-red-400' : 'text-slate-300'}`}>{s.median}d</span>
                          <span className={`w-12 text-right text-[11px] font-mono flex-shrink-0 ${
                            s.aging === 0 ? 'text-slate-600' : s.aging > 10 ? 'text-red-400' : 'text-amber-400'
                          }`}>
                            {s.aging === 0 ? '—' : s.aging}
                          </span>
                          <span className="w-[92px] flex items-center gap-2 flex-shrink-0">
                            {s.passRate === null ? (
                              <span className="text-[10.5px] font-mono text-slate-600">—</span>
                            ) : (
                              <>
                                <span className="flex-1"><Meter value={s.passRate} tone={s.passRate < 70 ? 'bg-amber-400' : 'bg-slate-600'} /></span>
                                <span className="text-[10.5px] font-mono text-slate-400">{s.passRate}%</span>
                              </>
                            )}
                          </span>
                          <span className={`w-28 text-right text-[10px] font-bold tracking-wider flex-shrink-0 ${flowTone[s.flow]}`}>{s.flow}</span>
                        </button>

                        {isOpen && s.detail && (
                          <div className="px-3 pb-4">
                            <p className="text-[12px] text-slate-300 leading-relaxed">{s.detail}</p>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-3 mt-3.5">
                              <div className="border-l-2 border-slate-600 pl-3">
                                <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500">Active · capacity</p>
                                <p className="text-[11px] text-slate-200 mt-1">{s.inStage} of {s.stage === 'Background investigation' ? bgCapacity : s.inStage}</p>
                              </div>
                              <div className="border-l-2 border-slate-600 pl-3">
                                <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500">Median</p>
                                <p className="text-[11px] text-slate-200 mt-1">{s.median} days · target {s.target}</p>
                              </div>
                              <div className="border-l-2 border-amber-500/70 pl-3">
                                <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-amber-400">Past target</p>
                                <p className="text-[11px] text-slate-200 mt-1">{s.aging} cases</p>
                              </div>
                              <div className="border-l-2 border-red-500/70 pl-3">
                                <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-red-400">Withdrawals here</p>
                                <p className="text-[11px] text-slate-200 mt-1">{s.withdrawalsHere}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2.5 mt-4 flex-wrap">
                              <button
                                onClick={() => navigate('/hr/jobs')}
                                className="px-3 py-1.5 border border-amber-500/60 bg-amber-500/10 rounded text-[11px] font-semibold text-amber-400 hover:bg-amber-500/20 transition-colors"
                              >
                                Review candidates
                              </button>
                              <button className="px-3 py-1.5 border border-slate-700/60 rounded text-[11px] font-semibold text-slate-200 hover:bg-zinc-900/60 transition-colors">Add capacity</button>
                              <button className="px-3 py-1.5 border border-slate-700/60 rounded text-[11px] font-semibold text-slate-200 hover:bg-zinc-900/60 transition-colors">Schedule next event</button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                <p className="text-[10px] text-slate-500 mt-3 leading-relaxed">
                  Pass rate is the share advancing from each stage. Median is days in stage against the stage target. Rows expand
                  to the constraint and the lever available.
                </p>
              </div>

              {/* Pipeline intelligence */}
              <div className="mt-7">
                <SectionLabel right={<span className="text-[10px] text-slate-500">AI-assisted synthesis · 5 sources · confidence 84% · 22m ago</span>}>
                  Pipeline intelligence
                </SectionLabel>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {cards.map((c) => (
                    <div key={c.title} className="border border-slate-800/80 rounded-xl px-4 py-3.5">
                      <p className="flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dotTone[c.tone]}`} />
                        <span className={`text-[12px] font-bold ${textTone[c.tone]}`}>{c.title}</span>
                      </p>
                      <p className="text-[11.5px] text-slate-300 leading-relaxed mt-2">{c.body}</p>
                      <p className="text-[11px] text-slate-100 leading-relaxed mt-2.5">→ {c.action}</p>
                      <p className="text-[10px] text-slate-600 mt-2.5">{c.sources}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ══ Right column ══════════════════════════════ */}
            <div>
              {/* Background investigation load */}
              <SectionLabel right={
                <span className="text-[10px] text-red-400/90">{bgActive} of {bgCapacity} · {bgOver} of {investigators.length} over</span>
              }>
                Background investigation load
              </SectionLabel>
              <div className="divide-y divide-slate-800/50">
                {investigators.map((inv) => {
                  const over = inv.active > CASES_PER_INVESTIGATOR;
                  const heavy = inv.active >= CASES_PER_INVESTIGATOR * 1.3;
                  return (
                    <div key={inv.name} className="flex items-center gap-3 py-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-[12.5px] font-semibold text-slate-100 truncate">{inv.name}</p>
                        <p className={`text-[10.5px] truncate ${over ? 'text-amber-400/80' : 'text-slate-500'}`}>{inv.note}</p>
                      </div>
                      <span className="w-20 flex-shrink-0">
                        <Meter
                          value={pct(inv.active, CASES_PER_INVESTIGATOR * 1.5)}
                          tone={heavy ? 'bg-red-500' : over ? 'bg-amber-400' : 'bg-slate-600'}
                        />
                      </span>
                      <span className={`w-14 text-right text-[11.5px] font-mono flex-shrink-0 ${
                        heavy ? 'text-red-400' : over ? 'text-amber-400' : 'text-slate-400'
                      }`}>
                        {inv.active} / {CASES_PER_INVESTIGATOR}
                      </span>
                    </div>
                  );
                })}
              </div>
              <p className="text-[10px] text-slate-500 mt-2.5 leading-relaxed">
                Capacity is {CASES_PER_INVESTIGATOR} concurrent cases per investigator at the current standard. A fifth position
                would return the median to target within one quarter; contracting the civilian-track cases would recover roughly
                seven cases immediately.
              </p>

              {/* Attrition */}
              <div className="mt-7">
                <SectionLabel right={<span className="text-[10px] text-slate-500">{lost} candidates lost</span>}>
                  Attrition — 90 days
                </SectionLabel>
                <div className="divide-y divide-slate-800/50">
                  {attrition.map((r) => (
                    <div key={r.reason} className="flex items-start gap-2.5 py-3">
                      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5 ${r.agency ? 'bg-red-500' : 'bg-slate-600'}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-[12.5px] font-semibold text-slate-100 truncate">{r.reason}</p>
                        <p className="text-[10.5px] text-slate-500 truncate">{r.note}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-[12.5px] font-mono font-bold text-slate-100">{r.count}</p>
                        <p className={`text-[10px] font-mono ${r.agency ? 'text-amber-400' : 'text-slate-500'}`}>{Math.round(pct(r.count, lost))}%</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-slate-500 mt-2.5 leading-relaxed">
                  {actionable} of {lost} losses trace to process delay or capacity rather than candidate disqualification. Those
                  are the ones the agency can act on.
                </p>
              </div>

              {/* Academy cohorts */}
              <div className="mt-7">
                <SectionLabel right={<span className="text-[10px] text-amber-400/90">{unscheduled} cohort unscheduled</span>}>
                  Academy cohorts
                </SectionLabel>
                <div className="divide-y divide-slate-800/50">
                  {cohorts.map((c) => (
                    <div key={c.cohort} className="py-3">
                      <div className="flex items-baseline gap-2.5">
                        <p className="text-[12.5px] font-semibold text-slate-100">{c.cohort}</p>
                        <span className={`text-[10.5px] ${c.unscheduled ? 'text-amber-400' : 'text-slate-500'}`}>{c.dates}</span>
                        <span className={`ml-auto text-[11.5px] font-mono flex-shrink-0 ${
                          c.unscheduled ? 'text-red-400' : c.seated === c.capacity ? 'text-emerald-400' : 'text-slate-200'
                        }`}>
                          {c.seated} / {c.capacity}
                        </span>
                      </div>
                      <span className="block mt-2">
                        <Meter value={pct(c.seated, c.capacity)} tone={c.unscheduled ? 'bg-red-500' : 'bg-amber-500'} />
                      </span>
                      <p className={`text-[10.5px] mt-1.5 ${c.unscheduled ? 'text-amber-400/90' : 'text-slate-500'}`}>{c.note}</p>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-slate-500 mt-2.5 leading-relaxed">
                  A candidate who clears every stage but misses a cohort waits for the next start date. Two of the last four
                  withdrawals happened in that gap.
                </p>
              </div>

              {/* Time to hire trend */}
              <div className="mt-7">
                <SectionLabel right={<span className="text-[10px] text-slate-500">median {hire.medianDays} days</span>}>
                  Time to hire — 12 months
                </SectionLabel>
                <div className="flex items-end gap-1.5 h-24">
                  {timeToHire.map((m) => {
                    const over = m.days > hire.target;
                    // Scale from a floor below the minimum so month-to-month movement reads.
                    const h = ((m.days - (trendMin - 12)) / (trendMax - (trendMin - 12))) * 100;
                    return (
                      <span
                        key={m.month}
                        title={`${m.month} · ${m.days} days`}
                        className={`flex-1 rounded-t-sm ${over ? 'bg-red-500' : 'bg-slate-600'}`}
                        style={{ height: `${h}%` }}
                      />
                    );
                  })}
                </div>
                <div className="flex items-baseline justify-between mt-1.5">
                  <span className="text-[10px] text-slate-500">{timeToHire[0].month}</span>
                  <span className="text-[10px] text-slate-500">{timeToHire[timeToHire.length - 1].month}</span>
                </div>
                <div className="flex items-center gap-4 mt-2">
                  <span className="flex items-center gap-1.5 text-[10px] text-slate-500">
                    <span className="w-3 h-1 rounded-full bg-red-500" />above {hire.target}-day target
                  </span>
                  <span className="flex items-center gap-1.5 text-[10px] text-slate-500">
                    <span className="w-3 h-1 rounded-full bg-slate-600" />within target
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 mt-2.5 leading-relaxed">
                  Median has moved from {hire.twelveMonthsAgo} to {hire.medianDays} days over twelve months. The increase is
                  almost entirely background investigation, which grew from {hire.backgroundThen} to {hire.backgroundNow} days
                  across the same period.
                </p>
              </div>
            </div>
          </div>

            {/* Candidate roster */}
            <div className="mt-7">
              <SectionLabel right={
                <span className="text-[10px] text-red-400/90">{pastDecision} overdue · {atRisk} at risk</span>
              }>
                Candidate roster
              </SectionLabel>

              <div className="flex items-center gap-3 flex-wrap mb-3">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search identifier, requisition, stage, or source"
                  className="w-72 px-3 py-1.5 bg-zinc-900/60 border border-slate-700/60 rounded-lg text-[11.5px] text-slate-200 placeholder-slate-500 focus:outline-none focus:border-slate-500"
                />
                <span className="flex items-center gap-3 flex-wrap">
                  {ROSTER_FILTERS.map((f) => (
                    <button
                      key={f}
                      onClick={() => setRoster(f)}
                      className={`text-[11px] transition-colors ${
                        roster === f ? 'text-slate-100 font-semibold underline underline-offset-4' : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      {f} <span className="font-mono text-slate-500">{rosterCount(f)}</span>
                    </button>
                  ))}
                </span>
              </div>

              <div className="flex items-end gap-3 pb-2 border-b border-slate-800/70 pl-3 text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500">
                <span className="flex-1 min-w-0">Candidate / requisition</span>
                <span className="w-12 text-right flex-shrink-0">Score</span>
                <span className="w-28 flex-shrink-0">Stage</span>
                <span className="w-28 flex-shrink-0">Blocker</span>
                <span className="w-24 flex-shrink-0">Source</span>
                <span className="w-14 text-right flex-shrink-0">In stage</span>
                <span className="w-[72px] text-right flex-shrink-0">Decision</span>
              </div>
              <div className="divide-y divide-slate-800/50">
                {rosterRows.map((c) => {
                  const isOpen = openRecord === c.id;
                  const stageIndex = TIMELINE.indexOf(c.stage);
                  return (
                    <div key={c.id} className={`border-l-2 ${
                      c.decision === 'OVERDUE' ? 'border-red-500/70' : c.decision === 'AT RISK' ? 'border-amber-500/60' : 'border-transparent'
                    }`}>
                      <button
                        onClick={() => setOpenRecord(isOpen ? null : c.id)}
                        className="w-full flex items-center gap-3 py-3 pl-3 text-left hover:bg-zinc-900/40 transition-colors"
                      >
                        <div className="flex-1 min-w-0">
                          <span className="flex items-baseline gap-2 flex-wrap">
                            <span className="text-[12.5px] font-semibold text-slate-100">{c.name}</span>
                            <span className="text-[10px] font-mono text-slate-500">{c.id}</span>
                            <span className="text-[10.5px] text-slate-500 truncate">{c.req}</span>
                          </span>
                          <p className="text-[10px] text-slate-500 truncate mt-0.5">{c.note}</p>
                        </div>
                        <span className="w-12 text-right text-[11px] font-mono flex-shrink-0">
                          {c.score === null
                            ? <span className="text-slate-600">—</span>
                            : <span className={c.score >= 85 ? 'text-emerald-400' : c.score >= 75 ? 'text-slate-200' : 'text-amber-400'}>{c.score}</span>}
                        </span>
                        <span className="w-28 text-[11px] text-slate-300 flex-shrink-0 truncate">{c.stage}</span>
                        <span className={`w-28 text-[11px] flex-shrink-0 truncate ${c.blocker ? 'text-amber-400' : 'text-slate-600'}`}>
                          {c.blocker ?? '—'}
                        </span>
                        <span className="w-24 text-[10.5px] text-slate-500 flex-shrink-0 truncate">{c.source}</span>
                        <span className={`w-14 text-right text-[11px] font-mono flex-shrink-0 ${c.inStage > 45 ? 'text-red-400' : 'text-slate-400'}`}>{c.inStage}d</span>
                        <span className={`w-[72px] text-right text-[10.5px] font-bold tracking-wider whitespace-nowrap flex-shrink-0 ${decisionTone(c.decision)}`}>{c.decision}</span>
                      </button>

                      {isOpen && (
                        <div className="px-3 pb-5">
                          {/* Stage timeline */}
                          <div className="flex items-center gap-1 mt-1 mb-4">
                            {TIMELINE.map((step, i) => {
                              const done = i < stageIndex;
                              const here = i === stageIndex;
                              return (
                                <span key={step} className="flex-1 min-w-0" title={step}>
                                  <span className={`block h-1 rounded-full ${
                                    here ? (c.blocker ? 'bg-red-500' : 'bg-amber-400') : done ? 'bg-emerald-500/70' : 'bg-zinc-800'
                                  }`} />
                                  <span className={`block text-[8.5px] mt-1 truncate ${
                                    here ? 'text-slate-200 font-semibold' : done ? 'text-slate-500' : 'text-slate-700'
                                  }`}>{step}</span>
                                </span>
                              );
                            })}
                          </div>

                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-4">
                            {/* Identity + score */}
                            <div>
                              <p className="text-[9px] font-bold uppercase tracking-[0.13em] text-slate-500 mb-2">Applicant</p>
                              <p className="text-[11.5px] text-slate-200">{c.name} · {c.ref}</p>
                              <p className="text-[10.5px] text-slate-500 mt-0.5">{c.req} · {c.division}</p>
                              <p className="text-[10.5px] text-slate-500 mt-1.5">{c.contact.email} · {c.contact.phone}</p>
                              <p className="text-[10.5px] text-slate-500">{c.contact.location} · sourced via {c.source}</p>
                            </div>

                            <div>
                              <p className="text-[9px] font-bold uppercase tracking-[0.13em] text-slate-500 mb-2">
                                Assessment {c.score !== null && <span className="text-slate-400 font-mono normal-case tracking-normal">composite {c.score}</span>}
                              </p>
                              <div className="space-y-1">
                                {SCORE_DIMENSIONS.map((d, i) => (
                                  <div key={d} className="flex items-center gap-2">
                                    <span className="w-32 text-[10px] text-slate-500 truncate">{d}</span>
                                    <span className="flex-1">
                                      <Meter value={c.breakdown[i] ?? 0} tone={
                                        c.breakdown[i] === null ? 'bg-zinc-800'
                                          : c.breakdown[i] >= 85 ? 'bg-emerald-500' : c.breakdown[i] >= 75 ? 'bg-slate-500' : 'bg-amber-400'
                                      } />
                                    </span>
                                    <span className="w-8 text-right text-[10px] font-mono text-slate-400">
                                      {c.breakdown[i] ?? '—'}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Screening checkpoints */}
                            <div className="lg:col-span-2">
                              <p className="text-[9px] font-bold uppercase tracking-[0.13em] text-slate-500 mb-2">Screening record</p>
                              <div className="divide-y divide-slate-800/50 border-t border-slate-800/50">
                                {c.screening.map(([step, verdict, detail]) => (
                                  <div key={step} className="flex items-center gap-3 py-1.5">
                                    <span className="w-44 text-[11px] text-slate-200 flex-shrink-0 truncate">{step}</span>
                                    <span className={`w-28 text-[9.5px] font-bold tracking-wider flex-shrink-0 ${
                                      verdict === 'PASSED' || verdict === 'CLEARED' || verdict === 'ACCEPTED' || verdict === 'READY' ? 'text-emerald-400'
                                        : verdict === 'BLOCKED' ? 'text-red-400' : 'text-amber-400'
                                    }`}>{verdict}</span>
                                    <span className="flex-1 min-w-0 text-[10.5px] text-slate-500 truncate">{detail}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Qualifications */}
                            <div className="lg:col-span-2">
                              <p className="text-[9px] font-bold uppercase tracking-[0.13em] text-slate-500 mb-1.5">Qualifications</p>
                              <p className="text-[11px] text-slate-300 leading-relaxed">{c.qualifications}</p>
                            </div>

                            {/* Assignment + attachments */}
                            <div>
                              <p className="text-[9px] font-bold uppercase tracking-[0.13em] text-slate-500 mb-1.5">Assigned</p>
                              {c.assigned.map(([role, who]) => (
                                <p key={role} className="text-[11px] text-slate-300">
                                  <span className="text-slate-500">{role}</span> · {who}
                                </p>
                              ))}
                            </div>
                            <div>
                              <p className="text-[9px] font-bold uppercase tracking-[0.13em] text-slate-500 mb-1.5">
                                Attachments <span className="text-slate-600 font-mono normal-case tracking-normal">{c.attachments.length}</span>
                              </p>
                              <div className="flex flex-wrap gap-1.5">
                                {c.attachments.map((a) => (
                                  <span key={a} className="border border-slate-700/60 rounded px-1.5 py-0.5 text-[9.5px] text-slate-400">{a}</span>
                                ))}
                              </div>
                            </div>

                            {/* Notes + activity */}
                            <div>
                              <p className="text-[9px] font-bold uppercase tracking-[0.13em] text-slate-500 mb-1.5">Notes</p>
                              {c.notes.length === 0
                                ? <p className="text-[10.5px] text-slate-600">No notes recorded.</p>
                                : c.notes.map((n) => (
                                  <div key={n.date}>
                                    <p className="text-[10px] text-slate-500">{n.author} · {n.date}</p>
                                    <p className="text-[11px] text-slate-300 leading-relaxed mt-0.5">{n.text}</p>
                                  </div>
                                ))}
                            </div>
                            <div>
                              <p className="text-[9px] font-bold uppercase tracking-[0.13em] text-slate-500 mb-1.5">Activity</p>
                              {c.activity.map(([when, text]) => (
                                <p key={when + text} className="text-[10.5px] text-slate-500">
                                  <span className="font-mono text-slate-600 mr-1.5">{when}</span>{text}
                                </p>
                              ))}
                            </div>
                          </div>

                          {/* Next action */}
                          <div className={`mt-4 border-l-2 pl-3 ${c.blocker ? 'border-red-500/70' : 'border-slate-600'}`}>
                            <p className={`text-[9px] font-bold uppercase tracking-[0.13em] ${c.blocker ? 'text-red-400' : 'text-slate-500'}`}>Next action</p>
                            <p className="text-[11.5px] text-slate-200 mt-1">{c.nextAction.title}</p>
                            <p className="text-[10.5px] text-slate-500">{c.nextAction.due}</p>
                          </div>

                          <div className="flex items-center gap-2.5 mt-4 flex-wrap">
                            <button className="px-3 py-1.5 border border-amber-500/60 bg-amber-500/10 rounded text-[11px] font-semibold text-amber-400 hover:bg-amber-500/20 transition-colors">Advance stage</button>
                            <button className="px-3 py-1.5 border border-slate-700/60 rounded text-[11px] font-semibold text-slate-200 hover:bg-zinc-900/60 transition-colors">Open full application</button>
                            <button className="px-3 py-1.5 border border-slate-700/60 rounded text-[11px] font-semibold text-slate-200 hover:bg-zinc-900/60 transition-colors">Email applicant</button>
                            <button className="px-3 py-1.5 border border-slate-700/60 rounded text-[11px] font-semibold text-slate-200 hover:bg-zinc-900/60 transition-colors">Add note</button>
                            <span className="ml-auto text-[10px] text-slate-600">Opening a record is logged with actor and timestamp.</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
                {rosterRows.length === 0 && (
                  <p className="py-6 text-[11.5px] text-slate-500 text-center">No candidates match that search in this filter.</p>
                )}
              </div>
              <p className="text-[10px] text-slate-500 mt-3 leading-relaxed">
                Rows open the full applicant record — stage timeline, assessment breakdown, screening history, qualifications,
                assignment, attachments, notes and next action. The roster lists candidates with an open item or activity in the
                last fourteen days; all {inProcess} in process are searchable. Opening a record is logged.
              </p>
            </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
