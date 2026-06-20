import React, { useState, useRef, useEffect } from 'react';
import { Search, Filter, Download, ZoomIn, ZoomOut, ChevronRight, X, Users, Award, Mail, Phone, Shield, Home, DollarSign, AlertCircle, TrendingUp, CheckCircle, MessageCircle, Sparkles, Send, Maximize2, Minimize2, Move, ChevronDown, ChevronUp, UserPlus, Maximize, MoreVertical, MessageSquare, UserCog, FileText, Calendar, MapPin, Star, Building2, Lightbulb, Printer, Share2, Settings, Eye, Layers, Clock, RefreshCw, ArrowLeft, Expand, AlertTriangle, Activity, Zap, ArrowRight, Briefcase, ShieldCheck, UserCheck, GraduationCap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import DashboardLayout from '../layouts/DashboardLayout';

export default function OrgChart() {
  const navigate = useNavigate();
  const [selectedNode, setSelectedNode] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [chatOpen, setChatOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDivision, setFilterDivision] = useState('all');
  const [filterRank, setFilterRank] = useState('all');
  const [collapsedNodes, setCollapsedNodes] = useState(new Set());
  const [highlightedNode, setHighlightedNode] = useState(null);
  const [viewMode, setViewMode] = useState('hierarchy'); // 'hierarchy' | 'operational'
  const [insightsExpanded, setInsightsExpanded] = useState(false);
  const chartContainerRef = useRef(null);
  const [touchDistance, setTouchDistance] = useState(0);

  // Workflow state
  const [workflowType, setWorkflowType] = useState(null); // 'hiring' | 'certRenewal' | 'succession' | 'actingPromotion' | 'spanReassign'
  const [workflowNode, setWorkflowNode] = useState(null);
  const [workflowStep, setWorkflowStep] = useState(1);
  const [workflowDone, setWorkflowDone] = useState(false);
  const [workflowSel, setWorkflowSel] = useState({});

  // Complete organizational data with full hierarchy
  const orgDataBase = [
    {
      id: 1,
      name: 'Sheriff Thompson',
      title: 'Sheriff',
      rank: 'Sheriff',
      badge: 'SHERIFF',
      photo: 'ST',
      email: 'sheriff@dept.gov',
      phone: '(555) 000-0001',
      hireDate: '2010-01-15',
      yearsOfService: 14,
      lastTraining: '2024-10-01',
      status: 'On Duty',
      division: 'Executive',
      reports: 1,
      level: 0,
      performance: 4.9,
      certStatus: 'current',
      succession: { ready: true, successor: 'Chief Deputy Anderson' },
      retirementEligible: '2030',
      retirementMonths: 48,
      readinessStatus: 'green',
      readinessLabel: 'Command ready'
    },
    {
      id: 2,
      name: 'Chief Deputy Anderson',
      title: 'Chief Deputy',
      rank: 'Chief Deputy',
      badge: 'CD-001',
      photo: 'CA',
      email: 'c.anderson@dept.gov',
      phone: '(555) 000-0002',
      hireDate: '2012-03-20',
      yearsOfService: 12,
      lastTraining: '2024-09-15',
      status: 'On Duty',
      division: 'Executive',
      reports: 2,
      level: 1,
      parentId: 1,
      performance: 4.8,
      certStatus: 'current',
      succession: { ready: true, successors: ['Major Wilson', 'Major Davis'] },
      retirementEligible: '2028',
      retirementMonths: 24,
      promotionCandidates: ['Major Wilson', 'Major Davis'],
      readinessStatus: 'green',
      readinessLabel: 'Succession planned'
    },
    {
      id: 3,
      name: 'Deputy Chief Jones',
      title: 'Deputy Chief - Administrative Bureau',
      rank: 'Deputy Chief',
      badge: 'DC-002',
      photo: 'DJ',
      email: 'd.jones@dept.gov',
      phone: '(555) 000-0003',
      hireDate: '2012-03-20',
      yearsOfService: 12,
      lastTraining: '2024-09-15',
      status: 'On Duty',
      division: 'Administration',
      reports: 3,
      level: 2,
      parentId: 2,
      divisionStrength: { current: 500, authorized: 540 },
      performance: 4.6,
      certStatus: 'current',
      readinessStatus: 'yellow',
      readinessLabel: 'Staffing risk'
    },
    {
      id: 4,
      name: 'Deputy Chief Webster',
      title: 'Deputy Chief - Operations Bureau',
      rank: 'Deputy Chief',
      badge: 'DC-003',
      photo: 'DW',
      email: 'd.webster@dept.gov',
      phone: '(555) 000-0004',
      hireDate: '2011-06-10',
      yearsOfService: 13,
      lastTraining: '2024-08-20',
      status: 'On Duty',
      division: 'Operations',
      reports: 2,
      level: 2,
      parentId: 2,
      divisionStrength: { current: 300, authorized: 320 },
      performance: 4.7,
      certStatus: 'expiring',
      readinessStatus: 'yellow',
      readinessLabel: 'Cert expiring · retirement risk'
    },
    {
      id: 10,
      name: 'Major Wilson',
      title: 'Major - Jail Operations',
      rank: 'Major',
      badge: 'M-1001',
      photo: 'MW',
      email: 'm.wilson@dept.gov',
      phone: '(555) 100-0001',
      hireDate: '2013-09-05',
      yearsOfService: 11,
      lastTraining: '2024-09-10',
      status: 'On Duty',
      division: 'Detention',
      reports: 10,
      level: 3,
      parentId: 3,
      divisionStrength: { current: 46, authorized: 48 },
      performance: 4.6,
      certStatus: 'current',
      readinessStatus: 'green',
      readinessLabel: 'Fully staffed',
      promotionCandidates: ['Capt. Rodriguez', 'Capt. Mitchell']
    },
    {
      id: 11,
      name: 'Major Harris',
      title: 'Major - Support Operations',
      rank: 'Major',
      badge: 'M-1002',
      photo: 'MH',
      email: 'm.harris@dept.gov',
      phone: '(555) 100-0002',
      hireDate: '2014-02-12',
      yearsOfService: 10,
      lastTraining: '2024-08-30',
      status: 'On Duty',
      division: 'Support Services',
      reports: 5,
      level: 3,
      parentId: 3,
      divisionStrength: { current: 60, authorized: 70 },
      readinessStatus: 'yellow',
      readinessLabel: 'Acting supervisor',
      actingFlag: true
    },
    {
      id: 12,
      name: 'Major Parker',
      title: 'Major - Administrative Services',
      rank: 'Major',
      badge: 'M-1003',
      photo: 'MP',
      email: 'm.parker@dept.gov',
      phone: '(555) 100-0003',
      hireDate: '2015-05-15',
      yearsOfService: 9,
      lastTraining: '2024-09-05',
      status: 'On Duty',
      division: 'Administration',
      reports: 4,
      level: 3,
      parentId: 3,
      divisionStrength: { current: 40, authorized: 50 },
      readinessStatus: 'red',
      readinessLabel: 'Leadership vacancy'
    },
    {
      id: 13,
      name: 'Major Davis',
      title: 'Major - Field Operations',
      rank: 'Major',
      badge: 'M-1004',
      photo: 'MD',
      email: 'm.davis@dept.gov',
      phone: '(555) 100-0004',
      hireDate: '1998-03-15',
      yearsOfService: 26,
      lastTraining: '2024-08-15',
      status: 'On Duty',
      division: 'Patrol',
      reports: 8,
      level: 3,
      parentId: 4,
      divisionStrength: { current: 64, authorized: 68 },
      performance: 4.8,
      certStatus: 'current',
      retirementEligible: '2026',
      retirementMonths: 0,
      succession: { ready: true, successor: 'Capt. Rodriguez', backup: 'Capt. Miller' },
      readinessStatus: 'yellow',
      readinessLabel: 'Retirement eligible',
      promotionCandidates: ['Capt. Rodriguez', 'Capt. Miller']
    },
    {
      id: 14,
      name: 'Major Thompson',
      title: 'Major - Court Operations',
      rank: 'Major',
      badge: 'M-1005',
      photo: 'MT',
      email: 'm.thompson@dept.gov',
      phone: '(555) 100-0005',
      hireDate: '2013-03-10',
      yearsOfService: 11,
      lastTraining: '2024-09-20',
      status: 'On Duty',
      division: 'Court Services',
      reports: 6,
      level: 3,
      parentId: 4,
      divisionStrength: { current: 100, authorized: 100 },
      readinessStatus: 'yellow',
      readinessLabel: 'Command vacancy',
      promotionCandidates: ['Lt. Evans']
    },
    {
      id: 100,
      name: 'Capt. Rodriguez',
      title: 'Captain - Shift A Commander',
      rank: 'Captain',
      badge: 'C-2001',
      photo: 'CR',
      division: 'Detention',
      reports: 3,
      level: 4,
      parentId: 10,
      status: 'On Duty',
      email: 'c.rodriguez@dept.gov',
      phone: '(555) 200-0001',
      yearsOfService: 9
    },
    {
      id: 101,
      name: 'Capt. Mitchell',
      title: 'Captain - Shift B Commander',
      rank: 'Captain',
      badge: 'C-2002',
      photo: 'CM',
      division: 'Detention',
      reports: 3,
      level: 4,
      parentId: 10,
      status: 'On Duty',
      email: 'c.mitchell@dept.gov',
      phone: '(555) 200-0002',
      yearsOfService: 8
    },
    {
      id: 102,
      name: 'Capt. Sanders',
      title: 'Captain - Shift C Commander',
      rank: 'Captain',
      badge: 'C-2003',
      photo: 'CS',
      division: 'Detention',
      reports: 3,
      level: 4,
      parentId: 10,
      status: 'On Duty',
      email: 'c.sanders@dept.gov',
      phone: '(555) 200-0003',
      yearsOfService: 8
    },
    {
      id: 103,
      name: 'Capt. Johnson',
      title: 'Captain - Special Investigations',
      rank: 'Captain',
      badge: 'C-2004',
      photo: 'CJ',
      division: 'Investigations',
      reports: 4,
      level: 4,
      parentId: 13,
      status: 'On Duty',
      email: 'c.johnson@dept.gov',
      phone: '(555) 200-0004',
      yearsOfService: 10
    },
    {
      id: 104,
      name: 'Capt. Lee',
      title: 'Captain - Warrants & Compliance',
      rank: 'Captain',
      badge: 'C-2005',
      photo: 'CL',
      division: 'Warrants',
      reports: 3,
      level: 4,
      parentId: 13,
      status: 'On Duty',
      email: 'c.lee@dept.gov',
      phone: '(555) 200-0005',
      yearsOfService: 9
    },
    {
      id: 105,
      name: 'Capt. Foster',
      title: 'Captain - K-9 Unit',
      rank: 'Captain',
      badge: 'C-2006',
      photo: 'CF',
      division: 'K9 Unit',
      reports: 2,
      level: 4,
      parentId: 13,
      status: 'On Duty',
      email: 'c.foster@dept.gov',
      phone: '(555) 200-0006',
      yearsOfService: 8
    },
    {
      id: 200,
      name: 'Lt. Chang',
      title: 'Lieutenant - Shift A',
      rank: 'Lieutenant',
      badge: 'L-3001',
      photo: 'LC',
      division: 'Detention',
      reports: 5,
      level: 5,
      parentId: 100,
      status: 'On Duty',
      email: 'l.chang@dept.gov',
      phone: '(555) 300-0001',
      yearsOfService: 7
    },
    {
      id: 201,
      name: 'Lt. Patel',
      title: 'Lieutenant - Shift B',
      rank: 'Lieutenant',
      badge: 'L-3002',
      photo: 'LP',
      division: 'Detention',
      reports: 5,
      level: 5,
      parentId: 101,
      status: 'On Duty',
      email: 'l.patel@dept.gov',
      phone: '(555) 300-0002',
      yearsOfService: 6
    },
    {
      id: 202,
      name: 'Lt. Hamilton',
      title: 'Lieutenant - Shift C',
      rank: 'Lieutenant',
      badge: 'L-3003',
      photo: 'LH',
      division: 'Detention',
      reports: 5,
      level: 5,
      parentId: 102,
      status: 'On Duty',
      email: 'l.hamilton@dept.gov',
      phone: '(555) 300-0003',
      yearsOfService: 6
    },
    {
      id: 203,
      name: 'Lt. Brown',
      title: 'Lieutenant - Task Force/Narcotics',
      rank: 'Lieutenant',
      badge: 'L-3004',
      photo: 'LB',
      division: 'Investigations',
      reports: 4,
      level: 5,
      parentId: 103,
      status: 'On Duty',
      email: 'l.brown@dept.gov',
      phone: '(555) 300-0004',
      yearsOfService: 7
    },
    {
      id: 204,
      name: 'Lt. Garcia',
      title: 'Lieutenant - Gang Unit/TRACE',
      rank: 'Lieutenant',
      badge: 'L-3005',
      photo: 'LG',
      division: 'Investigations',
      reports: 4,
      level: 5,
      parentId: 103,
      status: 'On Duty',
      email: 'l.garcia@dept.gov',
      phone: '(555) 300-0005',
      yearsOfService: 6
    },
    {
      id: 300,
      name: 'Sgt. Bell',
      title: 'Sergeant - Warrants',
      rank: 'Sergeant',
      badge: 'S-4001',
      photo: 'SB',
      division: 'Warrants',
      reports: 8,
      level: 6,
      parentId: 104,
      status: 'On Duty',
      email: 's.bell@dept.gov',
      phone: '(555) 400-0001',
      yearsOfService: 5
    },
    {
      id: 301,
      name: 'Sgt. Murray',
      title: 'Sergeant - Compliance',
      rank: 'Sergeant',
      badge: 'S-4002',
      photo: 'SM',
      division: 'Warrants',
      reports: 8,
      level: 6,
      parentId: 104,
      status: 'On Duty',
      email: 's.murray@dept.gov',
      phone: '(555) 400-0002',
      yearsOfService: 5
    },
    {
      id: 302,
      name: 'Sgt. Adams',
      title: 'Sergeant - Detention A1',
      rank: 'Sergeant',
      badge: 'S-4003',
      photo: 'SA',
      division: 'Detention',
      reports: 10,
      level: 6,
      parentId: 200,
      status: 'On Duty',
      email: 's.adams@dept.gov',
      phone: '(555) 400-0003',
      yearsOfService: 5,
      spanWarning: 'elevated'
    },
    {
      id: 303,
      name: 'Sgt. Cooper',
      title: 'Sergeant - Detention A2',
      rank: 'Sergeant',
      badge: 'S-4004',
      photo: 'SC',
      division: 'Detention',
      reports: 10,
      level: 6,
      parentId: 200,
      status: 'On Duty',
      email: 's.cooper@dept.gov',
      phone: '(555) 400-0004',
      yearsOfService: 5,
      spanWarning: 'elevated'
    },
    {
      id: 400,
      name: 'Cpl. Johnson',
      title: 'Corporal - Detention',
      rank: 'Corporal',
      badge: 'CPL-5001',
      photo: 'CJ',
      division: 'Detention',
      reports: 12,
      level: 7,
      parentId: 302,
      status: 'On Duty',
      email: 'cpl.johnson@dept.gov',
      phone: '(555) 500-0001',
      yearsOfService: 3,
      spanWarning: 'high',
      spanRecommendation: 'Add corporal role or redistribute personnel'
    },
    {
      id: 401,
      name: 'Cpl. White',
      title: 'Corporal - Detention',
      rank: 'Corporal',
      badge: 'CPL-5002',
      photo: 'CW',
      division: 'Detention',
      reports: 12,
      level: 7,
      parentId: 303,
      status: 'On Duty',
      email: 'cpl.white@dept.gov',
      phone: '(555) 500-0002',
      yearsOfService: 3,
      spanWarning: 'high',
      spanRecommendation: 'Add corporal role or redistribute personnel'
    },
    // Vacancy Positions - 8 total open positions
    {
      id: 'VACANT-001',
      name: 'OPEN POSITION',
      title: 'Deputy Sheriff - Zone 4',
      rank: 'Deputy',
      badge: 'VACANT',
      photo: '?',
      division: 'Patrol',
      reports: 0,
      level: 8,
      parentId: 400,
      status: 'Vacant',
      isVacant: true,
      daysVacant: 62,
      candidatesInPipeline: 4,
      expectedFill: 'Feb 2025',
      interimCoverage: 'OT Coverage'
    },
    {
      id: 'VACANT-002',
      name: 'OPEN POSITION',
      title: 'Deputy Sheriff - Zone 5',
      rank: 'Deputy',
      badge: 'VACANT',
      photo: '?',
      division: 'Patrol',
      reports: 0,
      level: 8,
      parentId: 400,
      status: 'Vacant',
      isVacant: true,
      daysVacant: 41,
      candidatesInPipeline: 3,
      expectedFill: 'Feb 2025',
      interimCoverage: 'Single-officer coverage'
    },
    {
      id: 'VACANT-003',
      name: 'OPEN POSITION',
      title: 'Deputy Sheriff - Zone 7',
      rank: 'Deputy',
      badge: 'VACANT',
      photo: '?',
      division: 'Patrol',
      reports: 0,
      level: 8,
      parentId: 400,
      status: 'Vacant',
      isVacant: true,
      daysVacant: 28,
      candidatesInPipeline: 5,
      expectedFill: 'Mar 2025',
      interimCoverage: 'Zone 6 backup'
    },
    {
      id: 'VACANT-004',
      name: 'OPEN POSITION',
      title: 'Deputy - H2-Pod',
      rank: 'Deputy',
      badge: 'VACANT',
      photo: '?',
      division: 'Detention',
      reports: 0,
      level: 8,
      parentId: 401,
      status: 'Vacant',
      isVacant: true,
      daysVacant: 35,
      candidatesInPipeline: 2,
      expectedFill: 'Feb 2025',
      interimCoverage: 'Cross-trained staff'
    },
    {
      id: 'VACANT-005',
      name: 'OPEN POSITION',
      title: 'Deputy - E-Pod Medical',
      rank: 'Deputy',
      badge: 'VACANT',
      photo: '?',
      division: 'Detention',
      reports: 0,
      level: 8,
      parentId: 401,
      status: 'Vacant',
      isVacant: true,
      daysVacant: 21,
      candidatesInPipeline: 3,
      expectedFill: 'Feb 2025',
      interimCoverage: 'OT Coverage'
    },
    {
      id: 'VACANT-006',
      name: 'OPEN POSITION',
      title: 'Narcotics Detective',
      rank: 'Detective',
      badge: 'VACANT',
      photo: '?',
      division: 'Investigations',
      reports: 0,
      level: 7,
      parentId: 203,
      status: 'Vacant',
      isVacant: true,
      daysVacant: 47,
      candidatesInPipeline: 2,
      expectedFill: 'Mar 2025',
      interimCoverage: 'Task force coverage',
      notes: 'Grant funded position'
    },
    {
      id: 'VACANT-007',
      name: 'OPEN POSITION',
      title: 'Captain - Court Security',
      rank: 'Captain',
      badge: 'VACANT',
      photo: '?',
      division: 'Court Services',
      reports: 0,
      level: 4,
      parentId: 14,
      status: 'Vacant',
      isVacant: true,
      daysVacant: 47,
      candidatesInPipeline: 3,
      expectedFill: 'Mar 2025',
      interimCoverage: 'Capt. Anderson (Patrol)',
      notes: 'Federal court coordination requirements'
    },
    {
      id: 'VACANT-008',
      name: 'OPEN POSITION',
      title: 'School Resource Officer',
      rank: 'Deputy',
      badge: 'VACANT',
      photo: '?',
      division: 'SRO',
      reports: 0,
      level: 8,
      parentId: 400,
      status: 'Vacant',
      isVacant: true,
      daysVacant: 15,
      candidatesInPipeline: 4,
      expectedFill: 'Feb 2025',
      interimCoverage: 'Patrol coverage',
      notes: 'Grayson High School assignment'
    }
  ];

  // Generate additional personnel to reach 800+
  const generateDeputies = () => {
    const deputies = [];
    let deputyId = 500;
    const corporals = orgDataBase.filter(n => n.level === 7);

    corporals.forEach(corporal => {
      for (let i = 0; i < corporal.reports; i++) {
        deputies.push({
          id: deputyId++,
          name: `Deputy ${String.fromCharCode(65 + (deputyId % 26))}${Math.floor(deputyId / 26)}`,
          title: 'Deputy Sheriff',
          rank: 'Deputy',
          badge: `D-${6000 + deputyId}`,
          photo: `D${deputyId % 100}`,
          division: corporal.division,
          reports: 0,
          level: 8,
          parentId: corporal.id,
          status: deputyId % 3 === 0 ? 'Off Duty' : 'On Duty',
          email: `deputy${deputyId}@dept.gov`,
          phone: `(555) 600-${String(deputyId).padStart(4, '0')}`,
          hireDate: `202${Math.floor(Math.random() * 4)}-0${Math.floor(Math.random() * 9) + 1}-${Math.floor(Math.random() * 28) + 1}`,
          yearsOfService: Math.floor(Math.random() * 5) + 1,
          lastTraining: '2024-06-15',
        });
      }
    });
    return deputies;
  };

  const allOrgData = [...orgDataBase, ...generateDeputies()];

  // Vacancy impact simulation data — operational consequences of each leadership position going vacant
  const vacancyImpactData = {
    1: {
      riskLevel: 'critical',
      impacts: [
        'Full executive command authority suspended',
        'Chief Deputy assumes emergency acting authority',
        'County Commissioner notification required within 24h',
        'State certification board must be notified'
      ],
      suggestedAction: 'Activate succession protocol — Chief Deputy Anderson assumes acting authority immediately'
    },
    2: {
      riskLevel: 'critical',
      impacts: [
        'Both bureaus operate without unified oversight',
        'Cross-bureau approval authority gaps emerge',
        'Daily command briefings disrupted',
        'Sheriff must directly oversee both bureaus simultaneously'
      ],
      suggestedAction: 'Designate Major Wilson as Acting Chief Deputy'
    },
    3: {
      riskLevel: 'high',
      impacts: [
        'Administrative Bureau oversight gap for all three divisions',
        'Budget approval chain disrupted — delays expected',
        'HR and support coordination reduced significantly'
      ],
      suggestedAction: 'Major Parker assumes Acting Deputy Chief (Administrative Bureau)'
    },
    4: {
      riskLevel: 'high',
      impacts: [
        'Field and court operations lose unified command',
        'Patrol deployment authority delayed',
        'Major Davis assumes interim oversight (retirement risk compounds)'
      ],
      suggestedAction: 'Major Thompson assumes Acting Deputy Chief (Operations Bureau)'
    },
    10: {
      riskLevel: 'critical',
      impacts: [
        'Jail operations command vacuum — no Major-level oversight',
        'Shift captains elevated without supervising authority',
        'ACA compliance monitoring disrupted',
        'USMS coordination at immediate risk'
      ],
      suggestedAction: 'Capt. Rodriguez assumes Acting Major (Jail Operations)'
    },
    11: {
      riskLevel: 'medium',
      impacts: [
        'Support operations lose Major-level coordination',
        'Inter-division resource sharing disrupted',
        'Grant-funded positions at administrative risk'
      ],
      suggestedAction: 'Senior Captain in Support assumes acting role pending appointment'
    },
    12: {
      riskLevel: 'high',
      impacts: [
        'Administrative Services leadership vacancy deepens',
        'Records and administrative compliance at risk',
        'Existing vacancy in division compounds command gap'
      ],
      suggestedAction: 'Major Parker currently filling — immediate permanent appointment required'
    },
    13: {
      riskLevel: 'high',
      impacts: [
        'Patrol command coverage reduced across all zones',
        'Shift approval authority delayed 4–8 hours',
        'OT authorization backlog expected within 48h',
        'Compliance reporting risk increases'
      ],
      suggestedAction: 'Promote Capt. Rodriguez to Acting Major (Field Operations) — succession plan ready'
    },
    14: {
      riskLevel: 'medium',
      impacts: [
        'Court security oversight gap',
        'Federal court coordination at risk',
        'Existing Captain vacancy makes coverage doubly difficult'
      ],
      suggestedAction: 'Capt. Lee (Warrants) assumes interim court oversight'
    }
  };

  // Bureau-level metrics for the enriched status label blocks
  const bureauMetrics = {
    3: { personnel: 100, authorized: 110, vacancies: 2, certRisk: 3, leadershipLabel: 'Stable' },
    4: { personnel: 170, authorized: 188, vacancies: 6, certRisk: 5, leadershipLabel: 'At Risk' }
  };

  // Bureau and division enriched metrics — powers the click drawer intel panels
  const divisionMetrics = {
    3:  { deployable: 94,  vacancies: 2, certRisk: 3, alert: null,                         action: null },
    4:  { deployable: 157, vacancies: 6, certRisk: 5, alert: 'Cert expiring · retirement risk', action: 'Begin succession planning for Deputy Chief Webster' },
    10: { deployable: 44,  vacancies: 2, certRisk: 2, alert: null,                         action: null },
    11: { deployable: 56,  vacancies: 0, certRisk: 1, alert: 'Acting supervision',          action: null },
    12: { deployable: 36,  vacancies: 2, certRisk: 4, alert: 'Leadership vacancy',          action: 'Permanent appointment required immediately' },
    13: { deployable: 58,  vacancies: 4, certRisk: 3, alert: 'Retirement eligible now',     action: 'Promote Capt. Rodriguez → Acting Major' },
    14: { deployable: 98,  vacancies: 1, certRisk: 1, alert: 'Captain vacancy active',      action: null },
  };

  // Touch handlers
  const handleTouchStart = (e) => {
    if (e.target.closest('.org-node')) return;

    if (e.touches.length === 1) {
      setIsPanning(true);
      setPanStart({
        x: e.touches[0].clientX - panOffset.x,
        y: e.touches[0].clientY - panOffset.y
      });
    } else if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      setTouchDistance(dist);
    }
  };

  const handleTouchMove = (e) => {
    e.preventDefault();

    if (e.touches.length === 1 && isPanning) {
      setPanOffset({
        x: e.touches[0].clientX - panStart.x,
        y: e.touches[0].clientY - panStart.y
      });
    } else if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );

      if (touchDistance > 0) {
        const delta = dist - touchDistance;
        const newZoom = Math.max(25, Math.min(200, zoomLevel + delta * 0.1));
        setZoomLevel(newZoom);
      }
      setTouchDistance(dist);
    }
  };

  const handleTouchEnd = () => {
    setIsPanning(false);
    setTouchDistance(0);
  };

  // Mouse handlers
  const handleMouseDown = (e) => {
    if (e.target.closest('.org-node')) return;
    setIsPanning(true);
    setPanStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = (e) => {
    if (!isPanning) return;
    setPanOffset({
      x: e.clientX - panStart.x,
      y: e.clientY - panStart.y
    });
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  useEffect(() => {
    if (isPanning) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isPanning, panStart]);

  // Fullscreen handlers
  const toggleFullscreen = () => {
    const elem = chartContainerRef.current;
    if (!document.fullscreenElement && !document.webkitFullscreenElement && !document.mozFullScreenElement) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement));
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  const toggleCollapse = (nodeId, e) => {
    e.stopPropagation();
    const newCollapsed = new Set(collapsedNodes);
    if (newCollapsed.has(nodeId)) {
      newCollapsed.delete(nodeId);
    } else {
      newCollapsed.add(nodeId);
    }
    setCollapsedNodes(newCollapsed);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.length > 2) {
      const found = allOrgData.find(node =>
        node.name.toLowerCase().includes(query.toLowerCase()) ||
        node.badge?.toLowerCase().includes(query.toLowerCase()) ||
        node.division?.toLowerCase().includes(query.toLowerCase())
      );
      if (found) {
        setHighlightedNode(found.id);
        setPanOffset({ x: 0, y: 0 });
        setZoomLevel(100);
        setTimeout(() => setHighlightedNode(null), 5000);
      }
    } else {
      setHighlightedNode(null);
    }
  };

  const fitToScreen = () => {
    setPanOffset({ x: 0, y: 0 });
    // Calculate appropriate zoom based on container size
    // For a large org chart, we need to zoom out more
    const containerHeight = chartContainerRef.current?.clientHeight || 800;
    const estimatedChartHeight = 2000; // Approximate height of full org chart
    const calculatedZoom = Math.max(25, Math.min(100, (containerHeight / estimatedChartHeight) * 100));
    setZoomLevel(calculatedZoom);
  };

  const isNodeVisible = (node) => {
    if (filterDivision !== 'all' && node.division !== filterDivision) return false;
    if (filterRank !== 'all' && node.rank !== filterRank) return false;
    return true;
  };

  const openDrawer = (node) => {
    setSelectedNode(node);
    setDrawerOpen(true);
  };

  // Jump to a node on the chart and flash it
  const highlightNode = (nodeId) => {
    if (!nodeId) return;
    setHighlightedNode(nodeId);
    setPanOffset({ x: 0, y: 0 });
    setZoomLevel(100);
    setDrawerOpen(false);
    setTimeout(() => setHighlightedNode(null), 5000);
  };

  const openWorkflow = (type, node = null) => {
    setWorkflowType(type);
    setWorkflowNode(node);
    setWorkflowStep(1);
    setWorkflowDone(false);
    setWorkflowSel({});
  };
  const closeWorkflow = () => {
    setWorkflowType(null);
    setWorkflowNode(null);
    setWorkflowDone(false);
  };

  // Per-person certification records — key leadership personnel
  const personCertifications = {
    1: [
      { name: 'Executive Command Certification', status: 'current', expires: 'Jan 2027' },
      { name: 'Crisis Incident Management', status: 'current', expires: 'Sep 2025' },
      { name: 'Advanced Leadership (PERF)', status: 'current', expires: 'Mar 2026' }
    ],
    2: [
      { name: 'Law Enforcement Leadership', status: 'current', expires: 'Mar 2026' },
      { name: 'Use of Force Instructor', status: 'expiring', expires: 'Feb 2025' },
      { name: 'Crisis Negotiation', status: 'current', expires: 'Nov 2025' }
    ],
    3: [
      { name: 'Administrative Command', status: 'current', expires: 'Jun 2026' },
      { name: 'Budget & Fiscal Management', status: 'current', expires: 'Aug 2025' }
    ],
    4: [
      { name: 'Operations Command', status: 'expiring', expires: 'Feb 2025' },
      { name: 'Tactical Command', status: 'current', expires: 'Oct 2025' },
      { name: 'Firearms Instructor', status: 'expired', expires: 'Nov 2024' }
    ],
    10: [
      { name: 'Jail Administration', status: 'current', expires: 'May 2026' },
      { name: 'ACA Standards Compliance', status: 'current', expires: 'Jul 2025' },
      { name: 'Emergency Response Coordinator', status: 'current', expires: 'Dec 2025' }
    ],
    11: [
      { name: 'Support Operations Management', status: 'current', expires: 'Apr 2026' },
      { name: 'Grant Administration', status: 'current', expires: 'Sep 2025' }
    ],
    12: [
      { name: 'Administrative Services Certification', status: 'current', expires: 'Jun 2026' },
      { name: 'Records Management', status: 'expiring', expires: 'Mar 2025' }
    ],
    13: [
      { name: 'Field Operations Command', status: 'current', expires: 'Aug 2025' },
      { name: 'Patrol Tactics Instructor', status: 'current', expires: 'Dec 2025' },
      { name: 'K-9 Handler Supervisor', status: 'current', expires: 'Jun 2025' }
    ],
    14: [
      { name: 'Court Security Supervisor', status: 'current', expires: 'Jan 2026' },
      { name: 'Federal Court Liaison', status: 'current', expires: 'Mar 2026' }
    ],
  };

  // Command radar alerts — drives the insight panel
  const commandAlerts = [
    { type: 'critical', nodeId: 12, short: 'Admin Services leadership vacancy', full: 'Administrative Services Division has no permanent Major — leadership gap compounding existing vacancies.', workflowType: 'hiring', workflowLabel: 'Hire Request' },
    { type: 'warning',  nodeId: 4,  short: '5 cert expirations pending',        full: 'Deputy Chief Webster cert expiring + 4 officers in Operations Bureau within 60 days.', workflowType: 'certRenewal', workflowLabel: 'Schedule Renewal' },
    { type: 'warning',  nodeId: 11, short: 'Support Ops acting supervision',    full: 'Support Operations Major Harris on acting basis — no permanent appointment made.', workflowType: 'actingPromotion', workflowLabel: 'Promote Permanent' },
    { type: 'insight',  nodeId: 13, short: 'Major Davis eligible for retirement', full: 'Field Operations Major Davis retirement-eligible now. Capt. Rodriguez on succession track.', workflowType: 'succession', workflowLabel: 'View Succession' },
    { type: 'insight',  nodeId: 2,  short: 'Chief Deputy 24mo succession window', full: 'Chief Deputy Anderson retires in 24 months. Succession plan confirmed: Major Wilson / Major Davis.', workflowType: 'succession', workflowLabel: 'View Succession' },
    { type: 'insight',  nodeId: null, short: 'Span of control elevated in Patrol', full: 'Cpl. Johnson managing 12 direct reports — above recommended 8. Corporal role or redistribution needed.', workflowType: 'spanReassign', workflowLabel: 'Reassign' },
  ];

  const getStaffingColor = (strength) => {
    if (!strength) return 'slate';
    const percentage = (strength.current / strength.authorized) * 100;
    if (percentage < 80) return 'red';
    if (percentage < 95) return 'orange';
    return 'green';
  };

  const getStaffingPct = (strength) => {
    if (!strength) return null;
    return Math.round((strength.current / strength.authorized) * 100);
  };

  // Returns Tailwind color classes for readiness status indicators
  const getReadinessColors = (status) => {
    if (status === 'green') return {
      dot: 'bg-emerald-400', text: 'text-emerald-400', border: 'border-l-emerald-500',
      nodeBg: 'from-emerald-900/20 to-slate-800/30',
      zoneBg: 'bg-emerald-900/35', zoneBorder: 'border-emerald-500/45', zoneConnector: 'bg-emerald-500/40'
    };
    if (status === 'red') return {
      dot: 'bg-red-400',     text: 'text-red-400',     border: 'border-l-red-500',
      nodeBg: 'from-red-900/20 to-slate-800/30',
      zoneBg: 'bg-red-900/40', zoneBorder: 'border-red-500/50', zoneConnector: 'bg-red-500/40'
    };
    return {
      dot: 'bg-orange-400',   text: 'text-orange-700',   border: 'border-l-orange-500',
      nodeBg: 'from-orange-900/20 to-slate-800/30',
      zoneBg: 'bg-orange-900/30', zoneBorder: 'border-orange-500/45', zoneConnector: 'bg-orange-500/40'
    };
  };

  // Returns operational heatmap background classes based on staffing %
  const getHeatmapBg = (node) => {
    if (node.readinessStatus) {
      if (node.readinessStatus === 'green') return 'from-emerald-900/25 to-slate-800/30';
      if (node.readinessStatus === 'red')   return 'from-red-900/25 to-slate-800/30';
      return 'from-orange-900/20 to-slate-800/30';
    }
    const pct = getStaffingPct(node.divisionStrength);
    if (pct !== null) {
      if (pct >= 95) return 'from-emerald-900/25 to-slate-800/30';
      if (pct >= 80) return 'from-orange-900/20 to-slate-800/30';
      return 'from-red-900/25 to-slate-800/30';
    }
    return 'from-slate-800/50 to-slate-800/30';
  };

  const renderNodeVertical = (node, size = 'md') => {
    if (!node || !isNodeVisible(node)) return null;

    const sizeClasses = {
      lg: 'w-[220px] p-4',
      md: 'w-[180px] p-3',
      sm: 'w-[140px] p-2',
      xs: 'w-[120px] p-1.5'
    };

    const isHighlighted = highlightedNode === node.id;
    const isHovered = hoveredNode === node.id;
    const children = allOrgData.filter(n => n.parentId === node.id && isNodeVisible(n));
    const hasChildren = children.length > 0;
    const isCollapsed = collapsedNodes.has(node.id);

    // Determine if we need to show a bureau/division label
    let showBureauLabel = false;
    let bureauLabelText = '';
    let showDivisionLabel = false;
    let divisionLabelText = '';

    // Bureau level labels (Deputy Chiefs)
    if (node.level === 2) {
      showBureauLabel = true;
      if (node.division === 'Administration') {
        bureauLabelText = 'ADMINISTRATIVE BUREAU';
      } else if (node.division === 'Operations') {
        bureauLabelText = 'OPERATIONS BUREAU';
      }
    }

    // Division level labels (Majors)
    if (node.level === 3) {
      showDivisionLabel = true;
      if (node.division === 'Detention') {
        divisionLabelText = 'JAIL OPERATIONS DIVISION';
      } else if (node.division === 'Support Services') {
        divisionLabelText = 'SUPPORT OPERATIONS DIVISION';
      } else if (node.division === 'Administration') {
        divisionLabelText = 'ADMINISTRATIVE SERVICES DIVISION';
      } else if (node.division === 'Patrol') {
        divisionLabelText = 'FIELD OPERATIONS DIVISION';
      } else if (node.division === 'Court Services') {
        divisionLabelText = 'COURT OPERATIONS DIVISION';
      }
    }

    // Section level labels (Captains under Field Operations)
    let showSectionLabel = false;
    let sectionLabelText = '';
    if (node.level === 4 && node.parentId === 13) { // Under Major Davis (Field Operations)
      showSectionLabel = true;
      if (node.division === 'Investigations') {
        sectionLabelText = 'Special Investigations Section';
      } else if (node.division === 'Warrants') {
        sectionLabelText = 'Warrants & Compliance Section';
      } else if (node.division === 'K9 Unit') {
        sectionLabelText = 'K-9 Unit';
      }
    }

    // Shift labels (Captains under Jail Operations)
    if (node.level === 4 && node.parentId === 10) { // Under Major Wilson (Jail Operations)
      showSectionLabel = true;
      if (node.badge === 'C-2001') {
        sectionLabelText = 'Shift A';
      } else if (node.badge === 'C-2002') {
        sectionLabelText = 'Shift B';
      } else if (node.badge === 'C-2003') {
        sectionLabelText = 'Shift C';
      }
    }

    return (
      <div key={node.id} className="flex flex-col items-center">
        {/* Bureau Label — rich status block */}
        {showBureauLabel && !isCollapsed && (() => {
          const bm = bureauMetrics[node.id];
          const rc = node.readinessStatus ? getReadinessColors(node.readinessStatus) : null;
          const isOp = viewMode === 'operational' && rc;
          const pct = bm ? Math.round(bm.personnel / bm.authorized * 100) : null;
          return (
            <div className="mb-4">
              <div className={`px-5 py-3 rounded-xl border-2 shadow-lg min-w-[220px] ${
                isOp ? `${rc.zoneBg} ${rc.zoneBorder}` : 'bg-gradient-to-r from-amber-500/20 to-amber-600/20 border-amber-500/40'
              }`}>
                <p className={`text-[11px] font-bold tracking-wider text-center mb-1.5 ${isOp ? rc.text : 'text-amber-700'}`}>
                  {bureauLabelText}
                </p>
                {bm && (
                  <div className="flex items-center justify-center gap-3 text-[10px] flex-wrap">
                    <span className="text-secondary">{bm.personnel} personnel</span>
                    <span className="text-slate-700">·</span>
                    <span className={pct >= 95 ? 'text-emerald-400' : pct >= 80 ? 'text-orange-700' : 'text-red-400'}>
                      {pct}% staffed
                    </span>
                    {bm.vacancies > 0 && <><span className="text-slate-700">·</span><span className="text-red-400">{bm.vacancies} vacant</span></>}
                    {bm.certRisk > 0 && <><span className="text-slate-700">·</span><span className="text-orange-700/80">{bm.certRisk} cert risk</span></>}
                  </div>
                )}
                {bm && (
                  <p className={`text-[10px] text-center mt-1 ${bm.leadershipLabel === 'Stable' ? 'text-emerald-400/70' : 'text-orange-700'}`}>
                    Leadership: {bm.leadershipLabel}
                  </p>
                )}
              </div>
              <div className={`w-0.5 h-4 mx-auto ${isOp ? rc.zoneConnector : 'bg-amber-500/40'}`}></div>
            </div>
          );
        })()}

        {/* Division Label — rich status block */}
        {showDivisionLabel && !isCollapsed && (() => {
          const dm = divisionMetrics[node.id];
          const rc = node.readinessStatus ? getReadinessColors(node.readinessStatus) : null;
          const isOp = viewMode === 'operational' && rc;
          const sColor = getStaffingColor(node.divisionStrength);
          return (
            <div className="mb-3">
              <div className={`px-4 py-2 rounded-lg border shadow-md min-w-[180px] ${
                isOp ? `${rc.zoneBg} ${rc.zoneBorder}` : 'bg-gradient-to-r from-blue-500/15 to-blue-600/15 border-blue-500/35'
              }`}>
                <p className={`text-[10px] font-bold tracking-wide text-center whitespace-nowrap ${isOp ? rc.text : 'text-slate-500'}`}>
                  {divisionLabelText}
                </p>
                {(node.divisionStrength || dm) && (
                  <div className="flex items-center justify-center gap-2 text-[9px] mt-0.5 flex-wrap">
                    {node.divisionStrength && (
                      <span className={sColor === 'green' ? 'text-emerald-400' : sColor === 'orange' ? 'text-orange-700' : 'text-red-400'}>
                        {node.divisionStrength.current}/{node.divisionStrength.authorized}
                      </span>
                    )}
                    {dm?.vacancies > 0 && <><span className="text-slate-700">·</span><span className="text-red-400">{dm.vacancies} vacant</span></>}
                    {dm?.certRisk > 0 && <><span className="text-slate-700">·</span><span className="text-orange-700/80">{dm.certRisk} cert risk</span></>}
                  </div>
                )}
                {dm?.alert && (
                  <p className={`text-[9px] text-center mt-0.5 font-medium ${
                    node.readinessStatus === 'red' ? 'text-red-400' : 'text-orange-700'
                  }`}>⚠ {dm.alert}</p>
                )}
              </div>
              <div className={`w-0.5 h-3 mx-auto ${isOp ? rc.zoneConnector : 'bg-slate-600/40'}`}></div>
            </div>
          );
        })()}

        {/* Section Label */}
        {showSectionLabel && !isCollapsed && (
          <div className="mb-2">
            <div className="px-4 py-1 bg-slate-50 dark:bg-zinc-800/40 backdrop-blur-xl border border-slate-600/50 rounded-lg shadow">
              <p className="text-[10px] font-medium text-secondary tracking-wide text-center whitespace-nowrap">
                {sectionLabelText}
              </p>
            </div>
            <div className="w-0.5 h-2 bg-slate-600/40 mx-auto"></div>
          </div>
        )}

        <div className="relative">
          <div
            className={`org-node relative ${
              node.isVacant
                ? 'bg-slate-50 dark:bg-zinc-900/35 backdrop-blur-xl border-2 border-dashed border-red-500/40'
                : node.actingFlag
                  ? 'bg-gradient-to-br from-orange-900/35 to-slate-800/40 backdrop-blur-xl border-2 border-orange-500/60 shadow-orange-500/20'
                  : viewMode === 'operational'
                    ? `bg-gradient-to-br ${getHeatmapBg(node)} backdrop-blur-xl border border-l-4 ${node.readinessStatus ? getReadinessColors(node.readinessStatus).border : 'border-l-slate-700/50'}`
                    : 'bg-gradient-to-br from-slate-800/50 to-slate-800/30 backdrop-blur-xl border'
            } rounded-xl cursor-pointer transition-all shadow-lg group ${
              isHighlighted || isHovered
                ? 'border-amber-500/60 scale-105 shadow-xl shadow-amber-500/10 ring-2 ring-amber-500/20'
                : node.isVacant ? ''
                : node.actingFlag ? 'ring-1 ring-orange-500/25 shadow-orange-500/15'
                : 'border-slate-700/50'
            } ${sizeClasses[size]}`}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
            onClick={() => openDrawer(node)}
          >
            {/* Status Dot - Top Right (not for vacancies) */}
            {!node.isVacant && (
              <div className={`absolute top-2 right-2 w-2 h-2 rounded-full ${
                node.status === 'On Duty' ? 'bg-green-400' :
                node.status === 'Off Duty' ? 'bg-slate-400' :
                node.status === 'On Leave' ? 'bg-orange-400' : 'bg-slate-400'
              }`} title={node.status} />
            )}

            {/* Acting Flag Badge — glows orange to signal temporary command */}
            {node.actingFlag && (
              <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1 px-2 py-0.5 bg-orange-500 rounded-full text-[8px] font-bold text-white shadow-lg shadow-orange-500/30 whitespace-nowrap" title="Acting Supervisor — temporary assignment">
                <AlertTriangle className="w-2.5 h-2.5" />
                ACTING SUPERVISOR
              </div>
            )}

            {/* Cert Alert Badge - Top Left (not for vacancies) */}
            {!node.isVacant && !node.actingFlag && node.certStatus === 'expiring' && (
              <div className="absolute -top-2 -left-2 px-1.5 py-0.5 bg-orange-500 rounded text-[8px] font-bold text-white shadow-lg" title="Certification Expiring Soon">
                CERT
              </div>
            )}
            {!node.isVacant && !node.actingFlag && node.certStatus === 'expired' && (
              <div className="absolute -top-2 -left-2 px-1.5 py-0.5 bg-red-500 rounded text-[8px] font-bold text-white shadow-lg" title="Certification Expired">
                EXP
              </div>
            )}

            {node.divisionStrength && (
              <div className={`absolute -top-2 -right-2 px-2 py-1 rounded-lg text-[9px] font-bold shadow-lg ${
                getStaffingColor(node.divisionStrength) === 'red' ? 'bg-red-500/90 text-white' :
                getStaffingColor(node.divisionStrength) === 'orange' ? 'bg-orange-500/90 text-white' :
                'bg-green-500/90 text-white'
              }`}>
                {node.divisionStrength.current}/{node.divisionStrength.authorized}
              </div>
            )}

            <div className="space-y-2">
              {node.isVacant ? (
                // Vacancy Card Content
                <>
                  <div className="flex items-center gap-2">
                    <div className={`bg-red-500/20 border border-red-500/30 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      size === 'lg' ? 'w-10 h-10' : size === 'md' ? 'w-8 h-8' : 'w-7 h-7'
                    }`}>
                      <UserPlus className={`text-red-400 ${size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className={`font-bold text-red-400 truncate ${size === 'lg' ? 'text-xs' : 'text-[11px]'}`}>{node.name}</h4>
                      <p className={`text-slate-500 truncate ${size === 'lg' ? 'text-[10px]' : 'text-[9px]'}`}>{node.title}</p>
                    </div>
                  </div>
                  {size !== 'xs' && (
                    <>
                      <div className={`text-slate-500 truncate ${size === 'lg' ? 'text-[10px]' : 'text-[9px]'}`}>{node.division}</div>
                      <div className={`text-orange-700 ${size === 'lg' ? 'text-[10px]' : 'text-[9px]'}`}>
                        {node.daysVacant} days vacant
                      </div>
                      <div className={`text-secondary ${size === 'lg' ? 'text-[10px]' : 'text-[9px]'}`}>
                        {node.candidatesInPipeline} candidate{node.candidatesInPipeline !== 1 ? 's' : ''}
                      </div>
                    </>
                  )}
                </>
              ) : (
                // Regular Personnel Card Content
                <>
                  <div className="flex items-center gap-2">
                    <div className={`bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-md flex-shrink-0 ${
                      size === 'lg' ? 'w-10 h-10' : size === 'md' ? 'w-8 h-8' : 'w-7 h-7'
                    }`}>
                      <span className={`text-primary font-bold ${size === 'lg' ? 'text-sm' : 'text-xs'}`}>{node.photo}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className={`font-bold text-primary truncate ${size === 'lg' ? 'text-xs' : 'text-[11px]'}`}>{node.name}</h4>
                      <p className={`text-secondary truncate ${size === 'lg' ? 'text-[10px]' : 'text-[9px]'}`}>{node.rank}</p>
                    </div>
                  </div>
                  {size !== 'xs' && (
                    <>
                      <div className={`text-slate-500 truncate ${size === 'lg' ? 'text-[10px]' : 'text-[9px]'}`}>{node.division}</div>
                      {/* Performance Stars */}
                      {node.performance && (
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-2 h-2 ${
                              i < Math.floor(node.performance)
                                ? 'text-amber-700 fill-amber-400'
                                : 'text-slate-700'
                            }`} />
                          ))}
                          <span className="text-[8px] text-secondary ml-0.5">{node.performance.toFixed(1)}</span>
                        </div>
                      )}
                      {node.reports > 0 && (
                        <div className={`flex items-center gap-1 text-secondary ${size === 'lg' ? 'text-[10px]' : 'text-[9px]'}`}>
                          <Users className="w-2.5 h-2.5" />
                          <span>{node.reports}</span>
                        </div>
                      )}
                      {/* Readiness status indicator — bureau/division level only */}
                      {node.readinessStatus && (size === 'lg' || size === 'md') && (
                        <div className={`flex items-center gap-1 mt-0.5 ${size === 'lg' ? 'text-[10px]' : 'text-[9px]'}`}>
                          <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${getReadinessColors(node.readinessStatus).dot}`} />
                          <span className={getReadinessColors(node.readinessStatus).text}>{node.readinessLabel}</span>
                        </div>
                      )}
                      {/* Retirement signal — tiered: red <24mo / orange 24-60mo / green >60mo */}
                      {node.retirementMonths !== undefined && size === 'lg' && (
                        <div className={`flex items-center gap-1 mt-1 px-1.5 py-0.5 rounded border text-[9px] font-medium w-fit ${
                          node.retirementMonths === 0
                            ? 'bg-red-500/25 border-red-500/35 text-red-300'
                            : node.retirementMonths < 24
                              ? 'bg-orange-500/20 border-orange-500/30 text-orange-300'
                              : node.retirementMonths <= 60
                                ? 'bg-slate-50 dark:bg-zinc-800/40 border-slate-600/50 text-slate-500'
                                : 'bg-emerald-500/10 border-emerald-500/15 text-emerald-400/70'
                        }`}>
                          <Clock className="w-2.5 h-2.5 flex-shrink-0" />
                          <span>
                            {node.retirementMonths === 0
                              ? `Eligible NOW${node.promotionCandidates?.[0] ? ` · ${node.promotionCandidates[0]} →` : ' · succession required'}`
                              : node.retirementMonths < 24
                                ? `${node.retirementMonths}mo · succession urgent`
                                : `${node.retirementMonths}mo to retirement`
                            }
                          </span>
                        </div>
                      )}
                      {/* Promotion candidates */}
                      {node.promotionCandidates && node.promotionCandidates.length > 0 && size === 'lg' && (
                        <div className="flex items-center gap-1 mt-0.5 text-[9px] text-secondary">
                          <ArrowRight className="w-2 h-2 text-slate-500" />
                          <span className="truncate">{node.promotionCandidates[0]}</span>
                        </div>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
            {/* Span of control warning — bottom banner */}
            {node.spanWarning && (size === 'lg' || size === 'md') && (
              <div className={`-mx-4 -mb-4 mt-2 px-2 py-1 rounded-b-xl flex items-center gap-1.5 text-[9px] font-semibold ${
                node.spanWarning === 'high'
                  ? 'bg-orange-500/25 text-orange-300'
                  : 'bg-orange-500/15 text-orange-700/80'
              }`}>
                <AlertTriangle className="w-2.5 h-2.5 flex-shrink-0" />
                <span>Span: {node.spanWarning === 'high' ? 'HIGH' : 'Elevated'} — {node.reports} direct reports</span>
              </div>
            )}

            <div className="absolute left-full ml-2 top-0 w-64 bg-surface-raised border border-border rounded-lg p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 shadow-2xl pointer-events-none">
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2 text-secondary">
                  <Mail className="w-3 h-3 text-secondary" />
                  <span className="truncate">{node.email}</span>
                </div>
                {node.phone && (
                  <div className="flex items-center gap-2 text-secondary">
                    <Phone className="w-3 h-3 text-secondary" />
                    <span>{node.phone}</span>
                  </div>
                )}
                {node.yearsOfService && (
                  <div className="flex items-center gap-2 text-secondary">
                    <Award className="w-3 h-3 text-secondary" />
                    <span>{node.yearsOfService} years</span>
                  </div>
                )}
                <div className={`inline-flex items-center gap-1 px-2 py-1 rounded text-[10px] font-medium ${
                  node.status === 'On Duty' ? 'bg-green-500/20 text-green-400' :
                  'bg-slate-500/20 text-slate-500'
                }`}>
                  <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
                  {node.status}
                </div>
              </div>
            </div>
          </div>

          {hasChildren && (
            <button
              onClick={(e) => toggleCollapse(node.id, e)}
              className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-slate-600 dark:bg-zinc-800 hover:bg-slate-500 dark:hover:bg-zinc-700 rounded-full flex items-center justify-center shadow-lg transition-all z-10"
            >
              {isCollapsed ? <ChevronDown className="w-3 h-3 text-primary" /> : <ChevronUp className="w-3 h-3 text-primary" />}
            </button>
          )}
        </div>

        {hasChildren && !isCollapsed && (
          <>
            <div className="w-0.5 h-12 bg-slate-300 dark:bg-zinc-800"></div>

            <div className="relative">
              {children.length > 1 && (
                <>
                  <div className="absolute left-0 right-0 h-0.5 bg-slate-300 dark:bg-zinc-800" style={{
                    top: '-12px',
                    left: `calc(${100 / children.length / 2}%)`,
                    right: `calc(${100 / children.length / 2}%)`
                  }}></div>
                  {children.map((_, idx) => (
                    <div
                      key={idx}
                      className="absolute w-0.5 h-12 bg-slate-300 dark:bg-zinc-800"
                      style={{
                        left: `calc(${(idx + 0.5) * (100 / children.length)}%)`,
                        top: '-12px'
                      }}
                    />
                  ))}
                </>
              )}

              <div className="flex gap-4 justify-center">
                {children.map(child => (
                  <div key={child.id}>
                    {renderNodeVertical(
                      child,
                      size === 'lg' ? 'md' : size === 'md' ? 'sm' : 'xs'
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    );
  };

  const sheriff = allOrgData.find(n => n.level === 0);
  const divisions = ['all', ...new Set(allOrgData.filter(n => n.division).map(n => n.division))];
  const ranks = ['all', 'Sheriff', 'Chief Deputy', 'Deputy Chief', 'Major', 'Captain', 'Lieutenant', 'Sergeant', 'Corporal', 'Deputy'];

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6 h-full">
        <div className="h-full flex flex-col max-w-[1400px] mx-auto">
            <div className="mb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div className="min-w-0">
                <h2 className="text-xl font-bold text-primary mb-1">Organization Chart</h2>
                <div className="flex items-center gap-2 text-[11px] text-slate-500 flex-wrap">
                  <span>Full command hierarchy · 170 personnel · 95.5% of 178 authorized</span>
                  <span className="text-slate-700">·</span>
                  <Clock className="w-3 h-3" />
                  <span>Updated 09:32 EST</span>
                  <button
                    className="flex items-center gap-1 text-slate-500 hover:text-secondary transition-colors"
                    title="Refresh org chart data"
                  >
                    <RefreshCw className="w-3 h-3" />
                    Refresh
                  </button>
                </div>
              </div>

              {!isFullscreen && (
                <div className="flex items-center gap-2 flex-wrap">
                  <button className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-100/80 dark:bg-zinc-900/30 border border-border rounded text-[11px] text-secondary hover:text-primary transition-colors" title="Export org chart">
                    <Download className="w-3 h-3" />
                    <span className="hidden sm:inline">Export</span>
                  </button>
                  <button className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-100/80 dark:bg-zinc-900/30 border border-border rounded text-[11px] text-secondary hover:text-primary transition-colors">
                    <Printer className="w-3 h-3" />
                    <span className="hidden sm:inline">Print</span>
                  </button>
                  <button className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-100/80 dark:bg-zinc-900/30 border border-border rounded text-[11px] text-secondary hover:text-primary transition-colors">
                    <Share2 className="w-3 h-3" />
                    <span className="hidden sm:inline">Share</span>
                  </button>
                </div>
              )}
            </div>

            {/* Command Radar Panel — collapsible intelligence bar */}
            <div className="mb-4 bg-surface border border-border rounded-xl overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between px-4 py-2.5 gap-2 sm:gap-3">
                <div className="flex items-center gap-2 flex-wrap min-w-0">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide shrink-0">Command Radar</span>
                  {commandAlerts.map((alert, i) => (
                    <button
                      key={i}
                      onClick={() => { highlightNode(alert.nodeId); setInsightsExpanded(false); }}
                      title={alert.full}
                      className={`px-2 py-0.5 rounded text-[10px] font-medium transition-all border whitespace-nowrap ${
                        alert.type === 'critical'
                          ? 'bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20'
                          : alert.type === 'warning'
                            ? 'bg-orange-500/10 text-orange-700 border-orange-500/20 hover:bg-orange-500/20'
                            : 'bg-slate-100 dark:bg-zinc-800/25 text-secondary border-slate-700/50 hover:bg-slate-100 dark:hover:bg-zinc-800/40'
                      }`}
                    >
                      {alert.type === 'critical' ? '⬤' : alert.type === 'warning' ? '⚠' : '●'} {alert.short}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setInsightsExpanded(!insightsExpanded)}
                  className="shrink-0 flex items-center gap-1 text-[10px] text-slate-700 hover:text-slate-600 dark:text-slate-400 transition-colors pt-0.5"
                >
                  <span className="hidden sm:inline">Details</span>
                  {insightsExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>

              {insightsExpanded && (
              <div className="px-4 pb-3 pt-2.5 border-t border-border space-y-1.5">
                {commandAlerts.map((alert, i) => (
                  <div
                    key={i}
                    className={`w-full flex items-start gap-3 p-2.5 rounded-lg border ${
                      alert.type === 'critical'
                        ? 'bg-red-500/8 border-red-500/20'
                        : alert.type === 'warning'
                          ? 'bg-orange-500/8 border-orange-500/15'
                          : 'bg-slate-100/80 dark:bg-zinc-900/30 border-slate-700/50'
                    }`}
                  >
                    <span className={`text-[9px] font-bold uppercase tracking-wider pt-0.5 shrink-0 w-12 ${
                      alert.type === 'critical' ? 'text-red-400' : alert.type === 'warning' ? 'text-orange-700' : 'text-slate-500'
                    }`}>{alert.type}</span>
                    <button className={`flex-1 min-w-0 text-left text-[11px] leading-snug hover:opacity-80 transition-opacity break-words ${
                      alert.type === 'critical' ? 'text-red-200' : alert.type === 'warning' ? 'text-orange-200' : 'text-slate-500'
                    }`} onClick={() => { highlightNode(alert.nodeId); setInsightsExpanded(false); }}>{alert.full}</button>
                    <div className="flex items-center gap-1.5 shrink-0 ml-1 flex-wrap justify-end">
                      {alert.nodeId && (
                        <button onClick={() => { highlightNode(alert.nodeId); setInsightsExpanded(false); }} className="p-0.5 hover:opacity-70 transition-opacity">
                          <ArrowRight className={`w-3 h-3 ${
                            alert.type === 'critical' ? 'text-red-500' : alert.type === 'warning' ? 'text-orange-700' : 'text-slate-700'
                          }`} />
                        </button>
                      )}
                      {alert.workflowType && (
                        <button
                          onClick={() => { openWorkflow(alert.workflowType, allOrgData.find(n => n.id === alert.nodeId) || null); setInsightsExpanded(false); }}
                          className={`text-[9px] px-2 py-0.5 rounded font-medium transition-colors whitespace-nowrap ${
                            alert.type === 'critical' ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30' :
                            alert.type === 'warning' ? 'bg-orange-500/20 text-orange-700 hover:bg-orange-500/30 border border-orange-500/30' :
                            'bg-amber-500/20 text-amber-700 hover:bg-amber-500/30 border border-amber-500/30'
                          }`}
                        >
                          {alert.workflowLabel}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-0.5 pt-1 border-t border-border">
                  <span className="text-[10px] text-slate-700">Staffing: 95.5% · 8 open positions · Retention 93.8%</span>
                  <span className="text-[10px] text-slate-700">AI-assisted · 3m ago</span>
                </div>
              </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-4">

              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search by name, badge #, rank, or division..."
                  className="w-full pl-9 pr-4 py-2 bg-slate-100/80 dark:bg-zinc-900/30 border border-border rounded text-sm text-primary placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-slate-500/50 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => { setSearchQuery(''); setHighlightedNode(null); }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary hover:text-primary transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="flex gap-2 flex-wrap">
                <div className="relative flex-1 min-w-[140px] sm:flex-initial">
                  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-secondary" />
                  <select value={filterDivision} onChange={(e) => setFilterDivision(e.target.value)} className="w-full pl-8 pr-3 py-2 bg-slate-100/80 dark:bg-zinc-900/30 border border-border rounded text-[11px] text-primary focus:outline-none focus:border-slate-500/50 cursor-pointer">
                    <option value="all">All Divisions (170)</option>
                    <option value="Patrol">Patrol Division (65)</option>
                    <option value="Detention">Detention Division (48)</option>
                    <option value="Investigations">Investigations (24)</option>
                    <option value="Support Services">Support Services (18)</option>
                    <option value="Court Services">Court Security (8)</option>
                    <option value="SRO">School Resource Officers (7)</option>
                  </select>
                </div>

                <div className="relative flex-1 min-w-[140px] sm:flex-initial">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-secondary" />
                  <select value={filterRank} onChange={(e) => setFilterRank(e.target.value)} className="w-full pl-8 pr-3 py-2 bg-slate-100/80 dark:bg-zinc-900/30 border border-border rounded text-[11px] text-primary focus:outline-none focus:border-slate-500/50 cursor-pointer">
                    <option value="all">All Ranks (170)</option>
                    <option value="Sheriff">Sheriff (1)</option>
                    <option value="Chief Deputy">Chief Deputy (1)</option>
                    <option value="Deputy Chief">Deputy Chief (2)</option>
                    <option value="Major">Major (4)</option>
                    <option value="Captain">Captain (11)</option>
                    <option value="Lieutenant">Lieutenant (18)</option>
                    <option value="Sergeant">Sergeant (26)</option>
                    <option value="Corporal">Corporal (12)</option>
                    <option value="Deputy">Deputy Sheriff (95)</option>
                  </select>
                </div>

                {/* Command Layer Toggle */}
                <div className="flex items-center bg-slate-100/80 dark:bg-zinc-900/30 border border-border rounded overflow-hidden shrink-0" title="Switch between hierarchy view and operational risk map">
                  <button
                    onClick={() => setViewMode('hierarchy')}
                    className={`flex items-center gap-1.5 px-2.5 py-2 text-[11px] font-medium transition-all ${
                      viewMode === 'hierarchy'
                        ? 'bg-white dark:bg-zinc-800/60 text-primary'
                        : 'text-secondary hover:text-slate-300'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Hierarchy</span>
                  </button>
                  <div className="w-px h-4 bg-white dark:bg-zinc-800/50" />
                  <button
                    onClick={() => setViewMode('operational')}
                    className={`flex items-center gap-1.5 px-2.5 py-2 text-[11px] font-medium transition-all ${
                      viewMode === 'operational'
                        ? 'bg-amber-500/20 text-amber-700'
                        : 'text-secondary hover:text-slate-300'
                    }`}
                  >
                    <Activity className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Operational</span>
                  </button>
                </div>
              </div>
            </div>

            <div
              ref={chartContainerRef}
              className="flex-1 min-h-[500px] lg:min-h-[650px] bg-slate-50 dark:bg-zinc-900/35 border border-slate-700/50 rounded-xl relative touch-none"
              style={{
                cursor: isPanning ? 'grabbing' : 'grab',
                overflow: 'hidden'
              }}
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Controls - Always visible (including in fullscreen) */}
              <div className="absolute top-4 left-4 z-50 flex flex-col gap-2">
                {/* Zoom Controls */}
                <div className="flex items-center gap-2 bg-white dark:bg-zinc-950/90 border border-border rounded-xl px-3 py-2 shadow-lg">
                  <button onClick={() => setZoomLevel(Math.max(25, zoomLevel - 10))} className="p-1 hover:bg-slate-100 dark:hover:bg-zinc-800/50 rounded transition-colors" title="Zoom out (-)">
                    <ZoomOut className="w-4 h-4 text-secondary" />
                  </button>
                  <span className="text-sm text-primary font-medium w-14 text-center">{zoomLevel}%</span>
                  <button onClick={() => setZoomLevel(Math.min(200, zoomLevel + 10))} className="p-1 hover:bg-slate-100 dark:hover:bg-zinc-800/50 rounded transition-colors" title="Zoom in (+)">
                    <ZoomIn className="w-4 h-4 text-secondary" />
                  </button>
                </div>

                {/* Action Buttons */}
                <button onClick={fitToScreen} className="flex items-center justify-center gap-2 px-4 py-2 bg-white dark:bg-zinc-950/90 border border-border rounded-xl text-secondary hover:border-slate-600/50 hover:bg-slate-800/90 transition-all shadow-lg" title="Fit to Screen">
                  <Maximize className="w-4 h-4" />
                  <span className="text-sm">Fit to Screen</span>
                </button>

                <button onClick={() => setCollapsedNodes(new Set())} className="flex items-center justify-center gap-2 px-4 py-2 bg-white dark:bg-zinc-950/90 border border-border rounded-xl text-secondary hover:border-slate-600/50 hover:bg-slate-800/90 transition-all shadow-lg" title="Expand all nodes">
                  <Expand className="w-4 h-4" />
                  <span className="text-sm">Expand All</span>
                </button>

                <button onClick={toggleFullscreen} className="flex items-center justify-center gap-2 px-4 py-2 bg-white dark:bg-zinc-950/90 border border-border rounded-xl text-secondary hover:border-slate-600/50 hover:bg-slate-800/90 transition-all shadow-lg" title={isFullscreen ? "Exit Full View (Esc)" : "Enter Full View"}>
                  {isFullscreen ? <ArrowLeft className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                  <span className="text-sm">{isFullscreen ? 'Exit Full View' : 'Full View'}</span>
                </button>

                {/* Keyboard Shortcuts Info */}
                <div className="bg-white dark:bg-zinc-950/90 border border-border rounded-xl px-3 py-2 shadow-lg text-[9px] text-secondary hidden lg:block">
                  <p className="text-[10px] text-secondary font-medium mb-1">Keyboard:</p>
                  <p>+/− : Zoom in/out</p>
                  <p>Space + drag : Pan</p>
                  <p>Esc : Exit full view</p>
                  <p>Double-click : Node details</p>
                </div>
              </div>

              {/* MiniMap */}
              <div className="absolute bottom-4 right-4 w-56 bg-white dark:bg-zinc-950/90 border border-border rounded-lg overflow-hidden z-40 hidden lg:block">
                <div className="p-2 border-b border-border flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-secondary">MiniMap</span>
                  <button className="text-secondary hover:text-secondary">
                    <Minimize2 className="w-3 h-3" />
                  </button>
                </div>
                <div className="h-20 bg-white dark:bg-zinc-900/50 flex items-center justify-center border-b border-border">
                  <div className="text-xs text-slate-500 flex flex-col items-center">
                    <MapPin className="w-4 h-4 mb-1" />
                    <p className="text-[9px]">Org Preview</p>
                    <div className="w-16 h-8 border border-red-500/50 mt-1 rounded-sm"></div>
                  </div>
                </div>
                <div className="p-2 space-y-1.5">
                  <div className="flex items-center justify-between text-[9px]">
                    <span className="text-secondary">Current View:</span>
                    <span className="text-secondary">Command Level</span>
                  </div>
                  <div className="flex items-center justify-between text-[9px]">
                    <span className="text-secondary">Visible:</span>
                    <span className="text-secondary">47 of 170 personnel</span>
                  </div>
                  <div className="flex items-center justify-between text-[9px]">
                    <span className="text-secondary">Zoom:</span>
                    <span className="text-secondary">{zoomLevel}%</span>
                  </div>
                  <div className="pt-1.5 border-t border-border space-y-1">
                    <button onClick={() => { setPanOffset({ x: 0, y: 0 }); setZoomLevel(100); }} className="w-full px-2 py-1 bg-slate-50 dark:bg-zinc-800/40 hover:bg-slate-700/60 text-[9px] text-secondary rounded transition-colors text-left">
                      Center on Sheriff
                    </button>
                    <button className="w-full px-2 py-1 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 text-[9px] text-amber-700 rounded transition-colors text-left">
                      Show Vacancies (8)
                    </button>
                  </div>
                </div>
              </div>

              <div
                className="absolute inset-0 flex items-start justify-center pt-12"
                style={{
                  transform: `scale(${zoomLevel / 100}) translate(${panOffset.x}px, ${panOffset.y}px)`,
                  transformOrigin: 'center top',
                  transition: isPanning ? 'none' : 'transform 0.2s ease'
                }}
              >
                {sheriff && renderNodeVertical(sheriff, 'lg')}
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 lg:gap-x-5 text-[11px]">
              {/* Readiness */}
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                <span className="text-secondary">Fully staffed</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                <span className="text-secondary">At risk / acting</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-red-400"></div>
                <span className="text-secondary">Leadership vacancy</span>
              </div>
              <div className="text-slate-700">·</div>
              {/* Heatmap */}
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 bg-emerald-900/40 border border-l-2 border-emerald-500 rounded"></div>
                <span className="text-secondary">95%+ staffed</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 bg-orange-900/30 border border-l-2 border-orange-500 rounded"></div>
                <span className="text-secondary">80–94%</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 bg-red-900/30 border border-l-2 border-red-500 rounded"></div>
                <span className="text-secondary">&lt;80%</span>
              </div>
              <div className="text-slate-700">·</div>
              {/* Special */}
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 border-2 border-dashed border-red-500/40 rounded"></div>
                <span className="text-secondary">Vacant</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="px-1 py-0.5 bg-orange-600 rounded text-[7px] font-bold text-white">ACT</div>
                <span className="text-secondary">Acting supervisor</span>
              </div>
              <div className="flex items-center gap-1.5">
                <AlertTriangle className="w-3 h-3 text-orange-700" />
                <span className="text-secondary">Span of control alert</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3 h-3 text-secondary" />
                <span className="text-secondary">Retirement signal</span>
              </div>
              <div className="text-slate-700">·</div>
              <div className="flex items-center gap-1.5">
                <Move className="w-3 h-3 text-slate-500" />
                <span className="text-slate-500">Drag/Pinch to Navigate · 170 Personnel</span>
              </div>
            </div>
        </div>
      </div>

      {drawerOpen && selectedNode && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="relative w-full max-w-[480px] bg-white dark:bg-zinc-950 border-l border-border shadow-2xl overflow-y-auto">
            <div className="sticky top-0 bg-slate-900/95 backdrop-blur-xl border-b border-border p-6 z-10">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <span className="text-primary font-medium">{selectedNode.photo}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary">{selectedNode.name}</h3>
                    <p className="text-sm text-secondary">{selectedNode.title}</p>
                  </div>
                </div>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-zinc-900/50 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-secondary" />
                </button>
              </div>

              <div className="space-y-2">
                <div className="grid grid-cols-3 gap-2">
                  <button className="px-3 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1">
                    <Users className="w-3 h-3" />
                    Profile
                  </button>
                  <button className="px-3 py-2 bg-slate-50 dark:bg-zinc-800/40 hover:bg-slate-700/60 border border-slate-600/50 text-secondary rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1">
                    <Mail className="w-3 h-3" />
                    Message
                  </button>
                  <button onClick={() => { highlightNode(selectedNode.id); }} className="px-3 py-2 bg-slate-50 dark:bg-zinc-800/40 hover:bg-slate-700/60 border border-slate-600/50 text-secondary rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1">
                    <Eye className="w-3 h-3" />
                    Locate
                  </button>
                </div>
                {/* Contextual workflow action buttons based on node flags */}
                {selectedNode.isVacant && (
                  <button onClick={() => openWorkflow('hiring', selectedNode)} className="w-full px-3 py-2 bg-red-500/15 hover:bg-red-500/25 border border-red-500/30 text-red-400 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1.5">
                    <Briefcase className="w-3 h-3" />
                    Launch Hiring Request
                  </button>
                )}
                {(selectedNode.certStatus === 'expiring' || selectedNode.certStatus === 'expired') && !selectedNode.isVacant && (
                  <button onClick={() => openWorkflow('certRenewal', selectedNode)} className="w-full px-3 py-2 bg-orange-500/15 hover:bg-orange-500/25 border border-orange-500/30 text-orange-700 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1.5">
                    <GraduationCap className="w-3 h-3" />
                    Schedule Certification Renewal
                  </button>
                )}
                {selectedNode.retirementMonths !== undefined && !selectedNode.isVacant && (
                  <button onClick={() => openWorkflow('succession', selectedNode)} className="w-full px-3 py-2 bg-slate-100/80 dark:bg-zinc-800/40 hover:bg-slate-700/60 border border-slate-600/50 text-secondary rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1.5">
                    <TrendingUp className="w-3 h-3" />
                    View Succession Plan
                  </button>
                )}
                {selectedNode.actingFlag && (
                  <button onClick={() => openWorkflow('actingPromotion', selectedNode)} className="w-full px-3 py-2 bg-orange-500/15 hover:bg-orange-500/25 border border-orange-500/30 text-orange-700 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1.5">
                    <UserCheck className="w-3 h-3" />
                    Promote to Permanent Appointment
                  </button>
                )}
                {selectedNode.spanWarning && (
                  <button onClick={() => openWorkflow('spanReassign', selectedNode)} className="w-full px-3 py-2 bg-orange-500/15 hover:bg-orange-500/25 border border-orange-500/30 text-orange-700 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1.5">
                    <Users className="w-3 h-3" />
                    Reassign Supervisory Oversight
                  </button>
                )}
                {selectedNode.promotionCandidates && !selectedNode.isVacant && !selectedNode.actingFlag && !selectedNode.retirementMonths && (
                  <button onClick={() => openWorkflow('actingPromotion', selectedNode)} className="w-full px-3 py-2 bg-slate-100/80 dark:bg-zinc-800/40 hover:bg-slate-700/60 border border-slate-600/50 text-secondary rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1.5">
                    <ArrowRight className="w-3 h-3" />
                    Promote Acting Supervisor
                  </button>
                )}
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-slate-100/80 dark:bg-zinc-900/30 rounded-xl p-4 border border-slate-700/50">
                  <p className="text-xs text-secondary mb-1">Badge</p>
                  <p className="text-sm font-medium text-primary font-mono">{selectedNode.badge}</p>
                </div>
                {selectedNode.yearsOfService && (
                  <div className="bg-slate-100/80 dark:bg-zinc-900/30 rounded-xl p-4 border border-slate-700/50">
                    <p className="text-xs text-secondary mb-1">Tenure</p>
                    <p className="text-sm font-medium text-primary">{selectedNode.yearsOfService} years</p>
                  </div>
                )}
                {selectedNode.division && (
                  <div className="bg-slate-100/80 dark:bg-zinc-900/30 rounded-xl p-4 border border-slate-700/50 col-span-2">
                    <p className="text-xs text-secondary mb-1">Division</p>
                    <p className="text-sm font-medium text-primary">{selectedNode.division}</p>
                  </div>
                )}
              </div>

              {selectedNode.email && (
                <div>
                  <h4 className="text-sm font-semibold text-primary mb-3">Contact Information</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-secondary">
                      <Mail className="w-4 h-4 text-secondary" />
                      <span>{selectedNode.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-secondary">
                      <Phone className="w-4 h-4 text-secondary" />
                      <span>{selectedNode.phone}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Certifications */}
              {personCertifications[selectedNode.id] && (
                <div>
                  <h4 className="text-sm font-semibold text-primary mb-3 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-secondary" />
                    Certifications
                    {personCertifications[selectedNode.id].some(c => c.status !== 'current') && (
                      <span className="text-[10px] px-1.5 py-0.5 bg-orange-500/20 border border-orange-500/30 text-orange-700 rounded font-medium">
                        {personCertifications[selectedNode.id].filter(c => c.status !== 'current').length} at risk
                      </span>
                    )}
                  </h4>
                  <div className="space-y-2">
                    {personCertifications[selectedNode.id].map((cert, idx) => (
                      <div key={idx} className={`flex items-center justify-between p-2.5 rounded-lg border ${
                        cert.status === 'expired' ? 'bg-red-500/10 border-red-500/30' :
                        cert.status === 'expiring' ? 'bg-orange-500/10 border-orange-500/25' :
                        'bg-slate-100/80 dark:bg-zinc-900/30 border-slate-700/50'
                      }`}>
                        <div className="flex-1 min-w-0 mr-2">
                          <p className="text-xs font-medium text-primary truncate">{cert.name}</p>
                          <p className="text-[10px] text-secondary">Expires {cert.expires}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${
                            cert.status === 'expired' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                            cert.status === 'expiring' ? 'bg-orange-500/20 text-orange-700 border-orange-500/30' :
                            'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                          }`}>{cert.status === 'expired' ? 'EXPIRED' : cert.status === 'expiring' ? 'EXPIRING' : 'CURRENT'}</span>
                          {(cert.status === 'expiring' || cert.status === 'expired') && (
                            <button onClick={() => openWorkflow('certRenewal', selectedNode)} className="text-[9px] px-1.5 py-0.5 bg-amber-500 hover:bg-amber-600 text-white rounded font-medium transition-colors">
                              Renew
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedNode.divisionStrength && (
                <div>
                  <h4 className="text-sm font-semibold text-primary mb-3">Staffing Overview</h4>
                  <div className="bg-slate-100/80 dark:bg-zinc-900/30 rounded-xl p-4 border border-slate-700/50 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-secondary">Assigned Strength</span>
                      <span className="text-lg font-bold text-primary">{selectedNode.divisionStrength.current} / {selectedNode.divisionStrength.authorized}</span>
                    </div>
                    <div className="w-full h-2 bg-white dark:bg-zinc-800/50 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          getStaffingColor(selectedNode.divisionStrength) === 'red' ? 'bg-red-500' :
                          getStaffingColor(selectedNode.divisionStrength) === 'orange' ? 'bg-orange-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${Math.min((selectedNode.divisionStrength.current / selectedNode.divisionStrength.authorized) * 100, 100)}%` }}
                      />
                    </div>
                    <p className="text-xs text-secondary">
                      {Math.round((selectedNode.divisionStrength.current / selectedNode.divisionStrength.authorized) * 100)}% of authorized strength
                    </p>
                    {/* Enriched metrics from divisionMetrics */}
                    {divisionMetrics[selectedNode.id] && (
                      <div className="pt-2 border-t border-border grid grid-cols-3 gap-3">
                        <div className="text-center">
                          <p className="text-[11px] text-secondary mb-0.5">Deployable</p>
                          <p className="text-base font-bold text-primary">{divisionMetrics[selectedNode.id].deployable}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-[11px] text-secondary mb-0.5">Vacancies</p>
                          <p className={`text-base font-bold ${divisionMetrics[selectedNode.id].vacancies > 0 ? 'text-red-400' : 'text-primary'}`}>
                            {divisionMetrics[selectedNode.id].vacancies}
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-[11px] text-secondary mb-0.5">Cert Risk</p>
                          <p className={`text-base font-bold ${divisionMetrics[selectedNode.id].certRisk > 2 ? 'text-orange-700' : 'text-slate-500'}`}>
                            {divisionMetrics[selectedNode.id].certRisk}
                          </p>
                        </div>
                      </div>
                    )}
                    {/* Operational risk alert */}
                    {divisionMetrics[selectedNode.id]?.alert && (
                      <div className="pt-2 border-t border-border">
                        <div className="flex items-start gap-2 text-xs">
                          <AlertTriangle className="w-3.5 h-3.5 text-orange-700 mt-0.5 flex-shrink-0" />
                          <span className="text-orange-300">{divisionMetrics[selectedNode.id].alert}</span>
                        </div>
                      </div>
                    )}
                    {/* Recommended action */}
                    {divisionMetrics[selectedNode.id]?.action && (
                      <div className="flex items-start gap-2 text-xs">
                        <ArrowRight className="w-3.5 h-3.5 text-secondary mt-0.5 flex-shrink-0" />
                        <span className="text-emerald-300 font-medium">{divisionMetrics[selectedNode.id].action}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div>
                <h4 className="text-sm font-semibold text-primary mb-3">Team Information</h4>
                <div className="bg-slate-100/80 dark:bg-zinc-900/30 rounded-xl p-4 border border-slate-700/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-secondary" />
                      <span className="text-sm text-secondary">Direct Reports</span>
                    </div>
                    <span className="text-lg font-bold text-primary">{selectedNode.reports}</span>
                  </div>
                </div>
              </div>

              {/* Performance Rating */}
              {selectedNode.performance && (
                <div>
                  <h4 className="text-sm font-semibold text-primary mb-3">Performance Rating</h4>
                  <div className="bg-slate-100/80 dark:bg-zinc-900/30 rounded-xl p-4 border border-slate-700/50">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-5 h-5 ${
                            i < Math.floor(selectedNode.performance)
                              ? 'text-amber-700 fill-amber-400'
                              : 'text-slate-700'
                          }`} />
                        ))}
                      </div>
                      <span className="text-2xl font-bold text-primary">{selectedNode.performance.toFixed(1)}</span>
                    </div>
                    <p className="text-xs text-secondary">Excellent performance rating</p>
                  </div>
                </div>
              )}

              {/* Leadership Pipeline — retirement + promotion candidates */}
              {(selectedNode.retirementMonths !== undefined || selectedNode.promotionCandidates) && (
                <div>
                  <h4 className="text-sm font-semibold text-primary mb-3">Leadership Pipeline</h4>
                  <div className="bg-slate-100/80 dark:bg-zinc-900/30 rounded-xl p-4 border border-slate-700/50 space-y-3">
                    {selectedNode.retirementMonths !== undefined && (
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          selectedNode.retirementMonths === 0 ? 'bg-orange-500/20 border border-orange-500/20' : 'bg-slate-50 dark:bg-zinc-800/40 border border-slate-600/50'
                        }`}>
                          <Clock className={`w-4 h-4 ${selectedNode.retirementMonths === 0 ? 'text-orange-700' : 'text-slate-500'}`} />
                        </div>
                        <div>
                          <p className={`text-sm font-medium ${selectedNode.retirementMonths === 0 ? 'text-orange-700' : 'text-slate-500'}`}>
                            {selectedNode.retirementMonths === 0
                              ? 'Retirement eligible now'
                              : `Retirement eligible in ${selectedNode.retirementMonths} months`
                            }
                          </p>
                          {selectedNode.retirementEligible && (
                            <p className="text-xs text-secondary">Eligible since: {selectedNode.retirementEligible}</p>
                          )}
                        </div>
                      </div>
                    )}
                    {selectedNode.promotionCandidates && selectedNode.promotionCandidates.length > 0 && (
                      <div>
                        <p className="text-xs text-secondary mb-2">Promotion Candidates</p>
                        <div className="space-y-1.5">
                          {selectedNode.promotionCandidates.map((candidate, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm">
                              <ArrowRight className="w-3 h-3 text-emerald-500" />
                              <span className="text-primary">{candidate}</span>
                              {idx === 0 && <span className="text-[10px] px-1.5 py-0.5 bg-slate-50 dark:bg-zinc-800/40 text-secondary rounded border border-slate-600/50">Primary</span>}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {selectedNode.succession && (
                      <div className="pt-2 border-t border-border">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-green-400" />
                          <span className="text-xs text-green-400 font-medium">Succession plan active</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Succession Planning (legacy — shown when no pipeline data but succession exists) */}
              {selectedNode.succession && !selectedNode.promotionCandidates && (
                <div>
                  <h4 className="text-sm font-semibold text-primary mb-3">Succession Planning</h4>
                  <div className="bg-slate-100/80 dark:bg-zinc-900/30 rounded-xl p-4 border border-slate-700/50 space-y-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-sm text-green-400 font-medium">Succession Plan Ready</span>
                    </div>
                    {selectedNode.succession.successor && (
                      <div>
                        <p className="text-xs text-secondary mb-1">Identified Successor</p>
                        <p className="text-sm text-primary font-medium">{selectedNode.succession.successor}</p>
                      </div>
                    )}
                    {selectedNode.succession.successors && (
                      <div>
                        <p className="text-xs text-secondary mb-1">Identified Successors</p>
                        <div className="space-y-1">
                          {selectedNode.succession.successors.map((successor, idx) => (
                            <p key={idx} className="text-sm text-primary">• {successor}</p>
                          ))}
                        </div>
                      </div>
                    )}
                    {selectedNode.retirementEligible && (
                      <div>
                        <p className="text-xs text-secondary mb-1">Retirement Eligibility</p>
                        <p className="text-sm text-primary">{selectedNode.retirementEligible}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Span of Control Warning — show in drawer if flagged */}
              {selectedNode.spanWarning && (
                <div>
                  <h4 className="text-sm font-semibold text-primary mb-3">Span of Control</h4>
                  <div className={`rounded-xl p-4 border space-y-3 ${
                    selectedNode.spanWarning === 'high'
                      ? 'bg-orange-500/10 border-orange-500/30'
                      : 'bg-orange-500/5 border-orange-500/20'
                  }`}>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className={`w-4 h-4 ${selectedNode.spanWarning === 'high' ? 'text-orange-700' : 'text-orange-700/70'}`} />
                      <span className={`text-sm font-medium ${selectedNode.spanWarning === 'high' ? 'text-orange-700' : 'text-orange-700'}`}>
                        {selectedNode.reports} direct reports · Span of control {selectedNode.spanWarning === 'high' ? 'HIGH' : 'ELEVATED'}
                      </span>
                    </div>
                    {selectedNode.spanRecommendation && (
                      <p className="text-xs text-secondary">
                        Recommendation: {selectedNode.spanRecommendation}
                      </p>
                    )}
                    <p className="text-[11px] text-slate-500">
                      Recommended max: 8–10 direct reports for supervisory roles
                    </p>
                  </div>
                </div>
              )}

              {/* Vacancy Impact Simulation — shown for leadership roles */}
              {vacancyImpactData[selectedNode.id] && !selectedNode.isVacant && (
                <div>
                  <h4 className="text-sm font-semibold text-primary mb-3 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-700" />
                    Vacancy Impact Simulation
                  </h4>
                  <div className={`rounded-xl p-4 border space-y-3 ${
                    vacancyImpactData[selectedNode.id].riskLevel === 'critical'
                      ? 'bg-red-500/10 border-red-500/30'
                      : vacancyImpactData[selectedNode.id].riskLevel === 'high'
                        ? 'bg-orange-500/10 border-orange-500/30'
                        : 'bg-slate-100/80 dark:bg-zinc-900/30 border-slate-700/50'
                  }`}>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-secondary">If this position becomes vacant:</p>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                        vacancyImpactData[selectedNode.id].riskLevel === 'critical'
                          ? 'bg-red-500/20 text-red-400 border-red-500/30'
                          : vacancyImpactData[selectedNode.id].riskLevel === 'high'
                            ? 'bg-orange-500/20 text-orange-700 border-orange-500/30'
                            : 'bg-slate-50 dark:bg-zinc-800/40 text-secondary border-slate-600/30'
                      }`}>
                        {vacancyImpactData[selectedNode.id].riskLevel.toUpperCase()} RISK
                      </span>
                    </div>
                    <div className="space-y-1.5">
                      {vacancyImpactData[selectedNode.id].impacts.map((impact, idx) => (
                        <p key={idx} className="text-xs text-secondary flex items-start gap-2">
                          <span className="text-slate-500 mt-0.5">•</span>
                          {impact}
                        </p>
                      ))}
                    </div>
                    <div className="pt-2 border-t border-border space-y-2">
                      <p className="text-xs text-secondary">Suggested action:</p>
                      <p className="text-xs text-emerald-300 font-medium">→ {vacancyImpactData[selectedNode.id].suggestedAction}</p>
                      <button
                        onClick={() => openWorkflow('actingPromotion', selectedNode)}
                        className="w-full px-3 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
                      >
                        <UserCheck className="w-3 h-3" />
                        Execute Succession Action
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Team Performance Metrics */}
              {selectedNode.reports > 0 && !selectedNode.isVacant && (
                <div>
                  <h4 className="text-sm font-semibold text-primary mb-3">Team Performance</h4>
                  <div className="bg-slate-100/80 dark:bg-zinc-900/30 rounded-xl p-4 border border-slate-700/50">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <p className="text-xs text-secondary mb-1">Team Size</p>
                        <p className="text-lg font-bold text-primary">{selectedNode.reports}</p>
                        <p className="text-[10px] text-slate-500">Direct reports</p>
                      </div>
                      <div>
                        <p className="text-xs text-secondary mb-1">Avg Rating</p>
                        <p className="text-lg font-bold text-primary">4.5</p>
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-2.5 h-2.5 ${
                              i < 4 ? 'text-amber-700 fill-amber-400' : 'text-slate-700'
                            }`} />
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-secondary mb-1">On Duty</p>
                        <p className="text-lg font-bold text-green-400">{Math.floor(selectedNode.reports * 0.8)}</p>
                        <p className="text-[10px] text-slate-500">Currently active</p>
                      </div>
                      <div>
                        <p className="text-xs text-secondary mb-1">Cert Compliance</p>
                        <p className="text-lg font-bold text-green-400">92%</p>
                        <p className="text-[10px] text-slate-500">All current</p>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-border grid grid-cols-2 gap-6">
                      <div>
                        <p className="text-xs text-secondary mb-1">Commendations</p>
                        <p className="text-sm font-bold text-primary">8 this month</p>
                      </div>
                      <div>
                        <p className="text-xs text-secondary mb-1">Disciplinary</p>
                        <p className="text-sm font-bold text-green-400">0</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Vacancy Information */}
              {selectedNode.isVacant && (
                <div>
                  <h4 className="text-sm font-semibold text-primary mb-3">Vacancy Details</h4>
                  <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/30">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-secondary">Days Vacant</span>
                        <span className="text-lg font-bold text-red-400">{selectedNode.daysVacant}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-secondary">Candidates in Pipeline</span>
                        <span className="text-lg font-bold text-primary">{selectedNode.candidatesInPipeline}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-secondary">Expected Fill Date</span>
                        <span className="text-sm font-medium text-primary">{selectedNode.expectedFill}</span>
                      </div>
                      <div className="space-y-2 mt-2">
                        <button onClick={() => openWorkflow('hiring', selectedNode)} className="w-full px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1.5">
                          <Briefcase className="w-4 h-4" />
                          Launch Hiring Request
                        </button>
                        <button className="w-full px-4 py-2 bg-slate-50 dark:bg-zinc-800/40 hover:bg-slate-700/60 border border-slate-600/50 text-secondary rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1.5">
                          <Users className="w-4 h-4" />
                          View Applicant Pipeline
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Workflow Modal: Hiring Request ── */}
      {workflowType === 'hiring' && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={closeWorkflow} />
          <div className="relative w-full max-w-lg bg-white dark:bg-zinc-950 border border-border rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-slate-900/95 border-b border-border px-5 py-4 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <Briefcase className="w-4 h-4 text-amber-700" />
                  <h3 className="font-semibold text-primary text-sm">Launch Hiring Request</h3>
                </div>
                <p className="text-[11px] text-secondary">{workflowNode?.title || 'Open Position'} · {workflowNode?.division || '—'}</p>
              </div>
              <button onClick={closeWorkflow} className="p-1.5 hover:bg-slate-800/50 rounded-lg transition-colors"><X className="w-4 h-4 text-secondary" /></button>
            </div>
            {!workflowDone && (
              <div className="flex items-center gap-1 px-5 pt-4 pb-1">
                {[1,2].map(s => (
                  <React.Fragment key={s}>
                    <div className={`w-5 h-5 rounded-full text-[9px] font-bold flex items-center justify-center ${workflowStep >= s ? 'bg-amber-500 text-white' : 'bg-slate-700/40 text-secondary'}`}>{s}</div>
                    {s < 2 && <div className={`flex-1 h-0.5 ${workflowStep > s ? 'bg-amber-500' : 'bg-slate-700/40'}`} />}
                  </React.Fragment>
                ))}
                <span className="ml-3 text-[10px] text-secondary">{workflowStep === 1 ? 'Position Details' : 'Request Configuration'}</span>
              </div>
            )}
            <div className="p-5 space-y-4 max-h-[60vh] overflow-y-auto">
              {!workflowDone && workflowStep === 1 && (
                <>
                  <div className="bg-slate-800/30 border border-border rounded-xl p-4 space-y-2">
                    {[['Position', workflowNode?.title || 'Deputy Sheriff'], ['Division', workflowNode?.division || '—'], ['Days Vacant', workflowNode?.daysVacant ? `${workflowNode.daysVacant} days` : '—'], ['Interim Coverage', workflowNode?.interimCoverage || 'None assigned']].map(([k, v]) => (
                      <div key={k} className="flex justify-between text-xs"><span className="text-secondary">{k}</span><span className={`font-medium ${k === 'Days Vacant' && (workflowNode?.daysVacant || 0) > 30 ? 'text-red-400' : 'text-primary'}`}>{v}</span></div>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-secondary">Request Urgency</p>
                    {['Critical — Fill within 14 days', 'High — Fill within 30 days', 'Standard — Normal hiring timeline'].map((level, i) => (
                      <label key={i} onClick={() => setWorkflowSel(s => ({...s, urgency: i}))} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${workflowSel.urgency === i ? 'bg-amber-500/15 border-amber-500/40' : 'bg-slate-800/20 border-border hover:border-slate-600/50'}`}>
                        <div className={`w-3 h-3 rounded-full border-2 flex-shrink-0 ${workflowSel.urgency === i ? 'border-amber-500 bg-amber-500' : 'border-slate-600'}`} />
                        <span className="text-xs text-primary">{level}</span>
                      </label>
                    ))}
                  </div>
                </>
              )}
              {!workflowDone && workflowStep === 2 && (
                <div className="space-y-3">
                  <div className="px-3 py-2.5 bg-slate-800/30 border border-border rounded-lg text-xs text-primary">
                    Target Fill: {workflowNode?.expectedFill || 'Mar 2025'} (current estimate)
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-secondary">Budget Source</p>
                    {['Approved Operating Budget', 'Supplemental Request Required', 'Grant-Funded Position'].map((src, i) => (
                      <label key={i} onClick={() => setWorkflowSel(s => ({...s, budget: i}))} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${workflowSel.budget === i ? 'bg-amber-500/15 border-amber-500/40' : 'bg-slate-800/20 border-border hover:border-slate-600/50'}`}>
                        <div className={`w-3 h-3 rounded-full border-2 flex-shrink-0 ${workflowSel.budget === i ? 'border-amber-500 bg-amber-500' : 'border-slate-600'}`} />
                        <span className="text-xs text-primary">{src}</span>
                      </label>
                    ))}
                  </div>
                  <label onClick={() => setWorkflowSel(s => ({...s, extendCoverage: !s.extendCoverage}))} className="flex items-center gap-3 p-3 bg-slate-800/20 border border-border rounded-xl cursor-pointer">
                    <div className={`w-4 h-4 rounded border-2 flex-shrink-0 flex items-center justify-center ${workflowSel.extendCoverage ? 'border-amber-500 bg-amber-500' : 'border-slate-600'}`}>
                      {workflowSel.extendCoverage && <CheckCircle className="w-2.5 h-2.5 text-white" />}
                    </div>
                    <span className="text-xs text-primary">Extend current interim coverage arrangement pending fill</span>
                  </label>
                </div>
              )}
              {workflowDone && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-emerald-400">Hiring Request Submitted</p>
                      <p className="text-[11px] text-secondary">REQ-2025-{String(Math.floor(Math.random() * 900) + 100).padStart(3,'0')} · Processing initiated</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {['Request routed to HR Director for approval', 'Budget office notified of funding need', 'Job requisition created in hiring portal', 'Vacancy posted to law enforcement boards', 'Interim coverage arrangement extended', 'Sheriff notified of critical vacancy status'].map((a, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-secondary">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" /><span>{a}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="border-t border-border px-5 py-3 flex items-center justify-between">
              {!workflowDone ? (
                <>
                  <button onClick={workflowStep === 1 ? closeWorkflow : () => setWorkflowStep(s => s - 1)} className="px-3 py-1.5 text-xs text-secondary hover:text-primary transition-colors">{workflowStep === 1 ? 'Cancel' : '← Back'}</button>
                  <button onClick={() => workflowStep < 2 ? setWorkflowStep(s => s + 1) : setWorkflowDone(true)} disabled={workflowStep === 1 && workflowSel.urgency === undefined} className="px-4 py-1.5 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-medium rounded-lg transition-colors">
                    {workflowStep < 2 ? 'Continue →' : 'Submit Request'}
                  </button>
                </>
              ) : (
                <button onClick={closeWorkflow} className="ml-auto px-4 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 text-emerald-400 text-xs font-medium rounded-lg transition-colors">Done</button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Workflow Modal: Certification Renewal ── */}
      {workflowType === 'certRenewal' && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={closeWorkflow} />
          <div className="relative w-full max-w-lg bg-white dark:bg-zinc-950 border border-border rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-slate-900/95 border-b border-border px-5 py-4 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <GraduationCap className="w-4 h-4 text-orange-700" />
                  <h3 className="font-semibold text-primary text-sm">Schedule Certification Renewal</h3>
                </div>
                <p className="text-[11px] text-secondary">{workflowNode?.name || 'Officer'} · {workflowNode?.rank || '—'} · {workflowNode?.division || '—'}</p>
              </div>
              <button onClick={closeWorkflow} className="p-1.5 hover:bg-slate-800/50 rounded-lg transition-colors"><X className="w-4 h-4 text-secondary" /></button>
            </div>
            {!workflowDone && (
              <div className="flex items-center gap-1 px-5 pt-4 pb-1">
                {[1,2].map(s => (
                  <React.Fragment key={s}>
                    <div className={`w-5 h-5 rounded-full text-[9px] font-bold flex items-center justify-center ${workflowStep >= s ? 'bg-orange-500 text-white' : 'bg-slate-700/40 text-secondary'}`}>{s}</div>
                    {s < 2 && <div className={`flex-1 h-0.5 ${workflowStep > s ? 'bg-orange-500' : 'bg-slate-700/40'}`} />}
                  </React.Fragment>
                ))}
                <span className="ml-3 text-[10px] text-secondary">{workflowStep === 1 ? 'Select Certification' : 'Schedule & Provider'}</span>
              </div>
            )}
            <div className="p-5 space-y-4 max-h-[60vh] overflow-y-auto">
              {!workflowDone && workflowStep === 1 && (
                <>
                  <p className="text-xs font-medium text-secondary">Select certification to renew:</p>
                  {(personCertifications[workflowNode?.id] || [
                    { name: workflowNode?.certStatus === 'expired' ? 'Primary Certification (EXPIRED)' : 'Primary Certification (EXPIRING)', status: workflowNode?.certStatus || 'expiring', expires: 'Feb 2025' }
                  ]).map((cert, i) => (
                    <label key={i} onClick={() => setWorkflowSel(s => ({...s, cert: i}))} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                      workflowSel.cert === i ? 'bg-orange-500/15 border-orange-500/40' :
                      cert.status === 'expired' ? 'bg-red-500/8 border-red-500/20 hover:bg-red-500/12' :
                      cert.status === 'expiring' ? 'bg-orange-500/8 border-orange-500/15 hover:bg-orange-500/12' :
                      'bg-slate-800/20 border-border opacity-50 cursor-not-allowed'
                    }`}>
                      <div className={`w-3 h-3 rounded-full border-2 flex-shrink-0 ${workflowSel.cert === i ? 'border-orange-500 bg-orange-500' : 'border-slate-600'}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-primary">{cert.name}</p>
                        <p className="text-[10px] text-secondary">Expires {cert.expires}</p>
                      </div>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${
                        cert.status === 'expired' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                        cert.status === 'expiring' ? 'bg-orange-500/20 text-orange-700 border-orange-500/30' :
                        'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                      }`}>{cert.status.toUpperCase()}</span>
                    </label>
                  ))}
                </>
              )}
              {!workflowDone && workflowStep === 2 && (
                <div className="space-y-3">
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-secondary">Training Format</p>
                    {['In-Person (Recommended)', 'Online / Remote', 'Hybrid'].map((fmt, i) => (
                      <label key={i} onClick={() => setWorkflowSel(s => ({...s, format: i}))} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${workflowSel.format === i ? 'bg-orange-500/15 border-orange-500/40' : 'bg-slate-800/20 border-border hover:border-slate-600/50'}`}>
                        <div className={`w-3 h-3 rounded-full border-2 flex-shrink-0 ${workflowSel.format === i ? 'border-orange-500 bg-orange-500' : 'border-slate-600'}`} />
                        <span className="text-xs text-primary">{fmt}</span>
                      </label>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-secondary">Training Provider</p>
                    {['State Law Enforcement Academy', 'Regional Training Consortium', 'Dept-Approved External Provider'].map((p, i) => (
                      <label key={i} onClick={() => setWorkflowSel(s => ({...s, provider: i}))} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${workflowSel.provider === i ? 'bg-orange-500/15 border-orange-500/40' : 'bg-slate-800/20 border-border hover:border-slate-600/50'}`}>
                        <div className={`w-3 h-3 rounded-full border-2 flex-shrink-0 ${workflowSel.provider === i ? 'border-orange-500 bg-orange-500' : 'border-slate-600'}`} />
                        <span className="text-xs text-primary">{p}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
              {workflowDone && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-emerald-400">Certification Renewal Scheduled</p>
                      <p className="text-[11px] text-secondary">Training calendar updated · Session booked</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {['Training calendar updated with session dates', `${workflowNode?.name || 'Officer'} notified via department email`, 'Supervisor notification sent', 'HR certification record flagged for follow-up', 'Duty restriction lifted upon completion', 'Compliance dashboard updated'].map((a, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-secondary">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" /><span>{a}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="border-t border-border px-5 py-3 flex items-center justify-between">
              {!workflowDone ? (
                <>
                  <button onClick={workflowStep === 1 ? closeWorkflow : () => setWorkflowStep(s => s - 1)} className="px-3 py-1.5 text-xs text-secondary hover:text-primary transition-colors">{workflowStep === 1 ? 'Cancel' : '← Back'}</button>
                  <button onClick={() => workflowStep < 2 ? setWorkflowStep(s => s + 1) : setWorkflowDone(true)} disabled={workflowStep === 1 && workflowSel.cert === undefined} className="px-4 py-1.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-medium rounded-lg transition-colors">
                    {workflowStep < 2 ? 'Continue →' : 'Schedule Renewal'}
                  </button>
                </>
              ) : (
                <button onClick={closeWorkflow} className="ml-auto px-4 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 text-emerald-400 text-xs font-medium rounded-lg transition-colors">Done</button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Workflow Modal: Succession Plan ── */}
      {workflowType === 'succession' && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={closeWorkflow} />
          <div className="relative w-full max-w-lg bg-white dark:bg-zinc-950 border border-border rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-slate-900/95 border-b border-border px-5 py-4 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <TrendingUp className="w-4 h-4 text-amber-700" />
                  <h3 className="font-semibold text-primary text-sm">Succession Plan</h3>
                </div>
                <p className="text-[11px] text-secondary">{workflowNode?.name || '—'} · {workflowNode?.title || '—'}</p>
              </div>
              <button onClick={closeWorkflow} className="p-1.5 hover:bg-slate-800/50 rounded-lg transition-colors"><X className="w-4 h-4 text-secondary" /></button>
            </div>
            <div className="p-5 space-y-4 max-h-[65vh] overflow-y-auto">
              {!workflowDone ? (
                <>
                  {/* Retirement timeline */}
                  <div className={`p-4 rounded-xl border ${workflowNode?.retirementMonths === 0 ? 'bg-red-500/10 border-red-500/30' : 'bg-orange-500/10 border-orange-500/25'}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className={`w-4 h-4 ${workflowNode?.retirementMonths === 0 ? 'text-red-400' : 'text-orange-700'}`} />
                      <span className={`text-sm font-medium ${workflowNode?.retirementMonths === 0 ? 'text-red-400' : 'text-orange-700'}`}>
                        {workflowNode?.retirementMonths === 0 ? 'Retirement-eligible NOW' : `Retirement eligible in ${workflowNode?.retirementMonths} months`}
                      </span>
                    </div>
                    <p className="text-xs text-secondary">Succession window: {workflowNode?.retirementMonths === 0 ? 'Immediate' : 'Active planning required'}. Position: {workflowNode?.title}.</p>
                  </div>

                  {/* Succession candidates */}
                  <div>
                    <p className="text-xs font-medium text-secondary mb-2">Succession Candidates</p>
                    <div className="space-y-2">
                      {(workflowNode?.promotionCandidates || (workflowNode?.succession?.successors) || (workflowNode?.succession?.successor ? [workflowNode.succession.successor] : ['No candidate identified'])).map((candidate, i) => (
                        <div key={i} className={`flex items-center gap-3 p-3 rounded-xl border ${i === 0 ? 'bg-emerald-500/10 border-emerald-500/25' : 'bg-slate-800/20 border-border'}`}>
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${i === 0 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700/40 text-secondary'}`}>
                            {i + 1}
                          </div>
                          <div className="flex-1">
                            <p className="text-xs font-medium text-primary">{candidate}</p>
                            <p className="text-[10px] text-secondary">{i === 0 ? 'Primary successor · Ready for promotion' : 'Backup candidate'}</p>
                          </div>
                          {i === 0 && <span className="text-[9px] px-1.5 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded font-bold">PRIMARY</span>}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Vacancy impact preview */}
                  {vacancyImpactData[workflowNode?.id] && (
                    <div className="p-3 bg-slate-800/30 border border-border rounded-xl">
                      <p className="text-xs font-medium text-secondary mb-2">Vacancy Risk If Not Addressed</p>
                      <div className="space-y-1">
                        {vacancyImpactData[workflowNode.id].impacts.slice(0, 2).map((impact, i) => (
                          <p key={i} className="text-xs text-secondary flex items-start gap-2"><span className="text-slate-500 mt-0.5">•</span>{impact}</p>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="space-y-2 pt-1">
                    <button onClick={() => { openWorkflow('actingPromotion', workflowNode); }} className="w-full px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-2">
                      <UserCheck className="w-4 h-4" />
                      Designate Acting Supervisor Now
                    </button>
                    <button onClick={() => setWorkflowDone(true)} className="w-full px-4 py-2.5 bg-slate-700/40 hover:bg-slate-700/60 border border-slate-600/50 text-secondary rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-2">
                      <FileText className="w-4 h-4" />
                      Begin Formal Promotion Process
                    </button>
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-emerald-400">Succession Action Initiated</p>
                      <p className="text-[11px] text-secondary">Formal promotion process started · HR notified</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {['Succession plan activated in command record', 'HR Director notified to begin promotion review', 'Merit review board scheduling initiated', 'Civil service notification requirements filed', 'Sheriff briefed on transition timeline'].map((a, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-secondary">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" /><span>{a}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {workflowDone && (
              <div className="border-t border-border px-5 py-3 flex justify-end">
                <button onClick={closeWorkflow} className="px-4 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 text-emerald-400 text-xs font-medium rounded-lg transition-colors">Done</button>
              </div>
            )}
            {!workflowDone && (
              <div className="border-t border-border px-5 py-3">
                <button onClick={closeWorkflow} className="text-xs text-secondary hover:text-primary transition-colors">Close</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Workflow Modal: Acting Promotion / Appoint Acting Supervisor ── */}
      {workflowType === 'actingPromotion' && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={closeWorkflow} />
          <div className="relative w-full max-w-lg bg-white dark:bg-zinc-950 border border-border rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-slate-900/95 border-b border-border px-5 py-4 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <UserCheck className="w-4 h-4 text-amber-700" />
                  <h3 className="font-semibold text-primary text-sm">{workflowNode?.actingFlag ? 'Promote to Permanent Appointment' : 'Designate Acting Supervisor'}</h3>
                </div>
                <p className="text-[11px] text-secondary">{workflowNode?.title || workflowNode?.name || '—'} · {workflowNode?.division || '—'}</p>
              </div>
              <button onClick={closeWorkflow} className="p-1.5 hover:bg-slate-800/50 rounded-lg transition-colors"><X className="w-4 h-4 text-secondary" /></button>
            </div>
            {!workflowDone && (
              <div className="flex items-center gap-1 px-5 pt-4 pb-1">
                {[1,2].map(s => (
                  <React.Fragment key={s}>
                    <div className={`w-5 h-5 rounded-full text-[9px] font-bold flex items-center justify-center ${workflowStep >= s ? 'bg-amber-500 text-white' : 'bg-slate-700/40 text-secondary'}`}>{s}</div>
                    {s < 2 && <div className={`flex-1 h-0.5 ${workflowStep > s ? 'bg-amber-500' : 'bg-slate-700/40'}`} />}
                  </React.Fragment>
                ))}
                <span className="ml-3 text-[10px] text-secondary">{workflowStep === 1 ? 'Select Candidate' : 'Appointment Details'}</span>
              </div>
            )}
            <div className="p-5 space-y-4 max-h-[60vh] overflow-y-auto">
              {!workflowDone && workflowStep === 1 && (
                <>
                  <p className="text-xs font-medium text-secondary">Select promotion candidate:</p>
                  <div className="space-y-2">
                    {(workflowNode?.actingFlag
                      ? [workflowNode.name]
                      : (workflowNode?.promotionCandidates || (workflowNode?.succession?.successors) || (workflowNode?.succession?.successor ? [workflowNode.succession.successor] : ['No candidates on file']))
                    ).map((candidate, i) => (
                      <label key={i} onClick={() => setWorkflowSel(s => ({...s, candidate: i, candidateName: candidate}))} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${workflowSel.candidate === i ? 'bg-amber-500/15 border-amber-500/40' : 'bg-slate-800/20 border-border hover:border-slate-600/50'}`}>
                        <div className={`w-3 h-3 rounded-full border-2 flex-shrink-0 ${workflowSel.candidate === i ? 'border-amber-500 bg-amber-500' : 'border-slate-600'}`} />
                        <div className="flex-1">
                          <p className="text-xs font-medium text-primary">{candidate}</p>
                          <p className="text-[10px] text-secondary">{i === 0 ? 'Primary succession candidate' : 'Alternate candidate'}</p>
                        </div>
                        {i === 0 && <span className="text-[9px] px-1.5 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded font-bold">READY</span>}
                      </label>
                    ))}
                  </div>
                </>
              )}
              {!workflowDone && workflowStep === 2 && (
                <div className="space-y-3">
                  <div className="bg-slate-800/30 border border-border rounded-xl p-3 text-xs space-y-1">
                    <div className="flex justify-between"><span className="text-secondary">Candidate</span><span className="text-primary font-medium">{workflowSel.candidateName || 'Selected'}</span></div>
                    <div className="flex justify-between"><span className="text-secondary">Position</span><span className="text-primary">{workflowNode?.title || '—'}</span></div>
                    <div className="flex justify-between"><span className="text-secondary">Effective</span><span className="text-primary">Immediate upon approval</span></div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-secondary">Appointment Type</p>
                    {['Acting — Temporary (90-day)', 'Acting — Extended (pending permanent fill)', 'Permanent Appointment'].map((type, i) => (
                      <label key={i} onClick={() => setWorkflowSel(s => ({...s, apptType: i}))} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${workflowSel.apptType === i ? 'bg-amber-500/15 border-amber-500/40' : 'bg-slate-800/20 border-border hover:border-slate-600/50'}`}>
                        <div className={`w-3 h-3 rounded-full border-2 flex-shrink-0 ${workflowSel.apptType === i ? 'border-amber-500 bg-amber-500' : 'border-slate-600'}`} />
                        <span className="text-xs text-primary">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
              {workflowDone && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-emerald-400">Appointment Recorded</p>
                      <p className="text-[11px] text-secondary">{workflowSel.candidateName || 'Candidate'} · {workflowNode?.title || 'Position'}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {['Command structure updated in system', 'Personnel record amended', 'All shift commanders notified', 'HR processing initiated', 'Union notification sent per CBA', "Sheriff's approval routed for signature", 'Org chart update pending ratification'].map((a, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-secondary">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" /><span>{a}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="border-t border-border px-5 py-3 flex items-center justify-between">
              {!workflowDone ? (
                <>
                  <button onClick={workflowStep === 1 ? closeWorkflow : () => setWorkflowStep(s => s - 1)} className="px-3 py-1.5 text-xs text-secondary hover:text-primary transition-colors">{workflowStep === 1 ? 'Cancel' : '← Back'}</button>
                  <button onClick={() => workflowStep < 2 ? setWorkflowStep(s => s + 1) : setWorkflowDone(true)} disabled={workflowStep === 1 && workflowSel.candidate === undefined} className="px-4 py-1.5 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-medium rounded-lg transition-colors">
                    {workflowStep < 2 ? 'Continue →' : 'Confirm Appointment'}
                  </button>
                </>
              ) : (
                <button onClick={closeWorkflow} className="ml-auto px-4 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 text-emerald-400 text-xs font-medium rounded-lg transition-colors">Done</button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Workflow Modal: Span of Control Redistribution ── */}
      {workflowType === 'spanReassign' && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={closeWorkflow} />
          <div className="relative w-full max-w-lg bg-white dark:bg-zinc-950 border border-border rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-slate-900/95 border-b border-border px-5 py-4 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <Users className="w-4 h-4 text-orange-700" />
                  <h3 className="font-semibold text-primary text-sm">Reassign Supervisory Oversight</h3>
                </div>
                <p className="text-[11px] text-secondary">{workflowNode?.name || 'Supervisor'} · {workflowNode?.reports || '—'} direct reports · Span {workflowNode?.spanWarning?.toUpperCase() || 'ELEVATED'}</p>
              </div>
              <button onClick={closeWorkflow} className="p-1.5 hover:bg-slate-800/50 rounded-lg transition-colors"><X className="w-4 h-4 text-secondary" /></button>
            </div>
            {!workflowDone && (
              <div className="flex items-center gap-1 px-5 pt-4 pb-1">
                {[1,2].map(s => (
                  <React.Fragment key={s}>
                    <div className={`w-5 h-5 rounded-full text-[9px] font-bold flex items-center justify-center ${workflowStep >= s ? 'bg-orange-500 text-white' : 'bg-slate-700/40 text-secondary'}`}>{s}</div>
                    {s < 2 && <div className={`flex-1 h-0.5 ${workflowStep > s ? 'bg-orange-500' : 'bg-slate-700/40'}`} />}
                  </React.Fragment>
                ))}
                <span className="ml-3 text-[10px] text-secondary">{workflowStep === 1 ? 'Resolution Approach' : 'Action Plan'}</span>
              </div>
            )}
            <div className="p-5 space-y-4 max-h-[60vh] overflow-y-auto">
              {!workflowDone && workflowStep === 1 && (
                <>
                  <div className={`p-3 rounded-xl border ${workflowNode?.spanWarning === 'high' ? 'bg-orange-500/10 border-orange-500/30' : 'bg-orange-500/8 border-orange-500/20'}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <AlertTriangle className="w-4 h-4 text-orange-700" />
                      <span className="text-xs font-medium text-orange-700">{workflowNode?.reports || 12} direct reports — recommended max 8–10</span>
                    </div>
                    {workflowNode?.spanRecommendation && <p className="text-xs text-secondary">{workflowNode.spanRecommendation}</p>}
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-secondary">Select resolution approach:</p>
                    {['Create new Corporal / Supervisory role', 'Redistribute to existing supervisor', 'Transfer personnel to adjacent unit'].map((opt, i) => (
                      <label key={i} onClick={() => setWorkflowSel(s => ({...s, approach: i}))} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${workflowSel.approach === i ? 'bg-orange-500/15 border-orange-500/40' : 'bg-slate-800/20 border-border hover:border-slate-600/50'}`}>
                        <div className={`w-3 h-3 rounded-full border-2 flex-shrink-0 ${workflowSel.approach === i ? 'border-orange-500 bg-orange-500' : 'border-slate-600'}`} />
                        <span className="text-xs text-primary">{opt}</span>
                      </label>
                    ))}
                  </div>
                </>
              )}
              {!workflowDone && workflowStep === 2 && (
                <div className="space-y-3">
                  <div className="bg-slate-800/30 border border-border rounded-xl p-3 text-xs space-y-1.5">
                    <p className="font-medium text-primary">
                      {workflowSel.approach === 0 ? 'New Supervisory Role' : workflowSel.approach === 1 ? 'Redistribute Reports' : 'Transfer Personnel'}
                    </p>
                    <p className="text-secondary">
                      {workflowSel.approach === 0 ? 'A new Corporal or Sergeant position will be created and positioned to absorb excess direct reports.' :
                       workflowSel.approach === 1 ? 'Excess reports will be redistributed to a peer supervisor at the same unit level.' :
                       'Personnel will be formally transferred to an adjacent unit where capacity exists.'}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-secondary">Priority</p>
                    {['Urgent — Submit for immediate approval', 'Standard — Next scheduled review cycle', 'Advisory — Flag for command awareness only'].map((p, i) => (
                      <label key={i} onClick={() => setWorkflowSel(s => ({...s, priority: i}))} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${workflowSel.priority === i ? 'bg-orange-500/15 border-orange-500/40' : 'bg-slate-800/20 border-border hover:border-slate-600/50'}`}>
                        <div className={`w-3 h-3 rounded-full border-2 flex-shrink-0 ${workflowSel.priority === i ? 'border-orange-500 bg-orange-500' : 'border-slate-600'}`} />
                        <span className="text-xs text-primary">{p}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
              {workflowDone && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-emerald-400">Span-of-Control Action Submitted</p>
                      <p className="text-[11px] text-secondary">Workforce review initiated · Command briefed</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {['Span-of-control review submitted to Command', 'HR staffing analysis initiated', 'Division Major notified for scheduling review', 'Command briefing scheduled within 7 days', 'Org chart update pending approval', 'Compliance audit flag cleared pending action'].map((a, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-secondary">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" /><span>{a}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="border-t border-border px-5 py-3 flex items-center justify-between">
              {!workflowDone ? (
                <>
                  <button onClick={workflowStep === 1 ? closeWorkflow : () => setWorkflowStep(s => s - 1)} className="px-3 py-1.5 text-xs text-secondary hover:text-primary transition-colors">{workflowStep === 1 ? 'Cancel' : '← Back'}</button>
                  <button onClick={() => workflowStep < 2 ? setWorkflowStep(s => s + 1) : setWorkflowDone(true)} disabled={workflowStep === 1 && workflowSel.approach === undefined} className="px-4 py-1.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-medium rounded-lg transition-colors">
                    {workflowStep < 2 ? 'Continue →' : 'Submit Action'}
                  </button>
                </>
              ) : (
                <button onClick={closeWorkflow} className="ml-auto px-4 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 text-emerald-400 text-xs font-medium rounded-lg transition-colors">Done</button>
              )}
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/20 transition-all z-40 group"
      >
        <MessageCircle className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
      </button>

      {chatOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-surface-raised backdrop-blur-xl border border-border rounded-xl shadow-2xl flex flex-col z-40">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-primary">Org Chart AI Assistant</h3>
            </div>
            <button onClick={() => setChatOpen(false)} className="p-1 hover:bg-slate-100 dark:hover:bg-zinc-900/50 rounded-lg transition-colors">
              <X className="w-5 h-5 text-secondary" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="bg-slate-100/80 dark:bg-zinc-900/30 rounded-lg p-3 mb-3">
              <p className="text-sm text-secondary">Hello! I can help you navigate the org chart, find personnel, analyze department structure, and answer questions about reporting relationships. What would you like to know?</p>
            </div>
          </div>

          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Ask about the org structure..."
                className="flex-1 px-4 py-2 bg-slate-100/80 dark:bg-zinc-900/30 border border-border rounded-lg text-primary placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500/50"
              />
              <button className="p-2 bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 rounded-lg transition-colors">
                <Send className="w-5 h-5 text-primary" />
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
