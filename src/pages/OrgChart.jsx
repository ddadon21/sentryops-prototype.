import React, { useState, useRef, useEffect } from 'react';
import { Search, Filter, Download, ZoomIn, ZoomOut, ChevronRight, X, Users, Award, Mail, Phone, Shield, Home, DollarSign, AlertCircle, TrendingUp, CheckCircle, MessageCircle, Sparkles, Send, Maximize2, Minimize2, Move, ChevronDown, ChevronUp, UserPlus, Maximize, MoreVertical, MessageSquare, UserCog, FileText, Calendar, MapPin, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
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
  const chartContainerRef = useRef(null);
  const [touchDistance, setTouchDistance] = useState(0);

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
      retirementEligible: '2030'
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
      retirementEligible: '2028'
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
      certStatus: 'current'
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
      certStatus: 'expiring'
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
      divisionStrength: { current: 400, authorized: 420 }
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
      divisionStrength: { current: 60, authorized: 70 }
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
      divisionStrength: { current: 40, authorized: 50 }
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
      hireDate: '2012-08-22',
      yearsOfService: 12,
      lastTraining: '2024-08-15',
      status: 'On Duty',
      division: 'Patrol',
      reports: 8,
      level: 3,
      parentId: 4,
      divisionStrength: { current: 200, authorized: 220 }
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
      divisionStrength: { current: 100, authorized: 100 }
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
      yearsOfService: 5
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
      yearsOfService: 5
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
      yearsOfService: 3
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
      yearsOfService: 3
    },
    // Vacancy Positions
    {
      id: 'VACANT-001',
      name: 'OPEN POSITION',
      title: 'Deputy Sheriff',
      rank: 'Deputy',
      badge: 'VACANT',
      photo: '?',
      division: 'Patrol',
      reports: 0,
      level: 8,
      parentId: 400,
      status: 'Vacant',
      isVacant: true,
      daysVacant: 45,
      candidatesInPipeline: 3,
      expectedFill: 'Feb 2025'
    },
    {
      id: 'VACANT-002',
      name: 'OPEN POSITION',
      title: 'Deputy Sheriff',
      rank: 'Deputy',
      badge: 'VACANT',
      photo: '?',
      division: 'Detention',
      reports: 0,
      level: 8,
      parentId: 400,
      status: 'Vacant',
      isVacant: true,
      daysVacant: 32,
      candidatesInPipeline: 2,
      expectedFill: 'Jan 2025'
    },
    {
      id: 'VACANT-003',
      name: 'OPEN POSITION',
      title: 'Sergeant',
      rank: 'Sergeant',
      badge: 'VACANT',
      photo: '?',
      division: 'Patrol',
      reports: 0,
      level: 6,
      parentId: 300,
      status: 'Vacant',
      isVacant: true,
      daysVacant: 60,
      candidatesInPipeline: 1,
      expectedFill: 'Mar 2025'
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

  const getStaffingColor = (strength) => {
    if (!strength) return 'slate';
    const percentage = (strength.current / strength.authorized) * 100;
    if (percentage < 80) return 'red';
    if (percentage < 95) return 'amber';
    return 'green';
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
        {/* Bureau Label */}
        {showBureauLabel && !isCollapsed && (
          <div className="mb-4">
            <div className="px-6 py-2 bg-gradient-to-r from-amber-500/20 to-amber-600/20 backdrop-blur-xl border-2 border-amber-500/40 rounded-xl shadow-lg">
              <p className="text-sm font-bold text-amber-400 tracking-wider text-center whitespace-nowrap">
                {bureauLabelText}
              </p>
            </div>
            <div className="w-0.5 h-4 bg-amber-500/40 mx-auto"></div>
          </div>
        )}

        {/* Division Label */}
        {showDivisionLabel && !isCollapsed && (
          <div className="mb-3">
            <div className="px-5 py-1.5 bg-gradient-to-r from-blue-500/20 to-blue-600/20 backdrop-blur-xl border border-blue-500/40 rounded-lg shadow-md">
              <p className="text-xs font-semibold text-blue-400 tracking-wide text-center whitespace-nowrap">
                {divisionLabelText}
              </p>
            </div>
            <div className="w-0.5 h-3 bg-blue-500/40 mx-auto"></div>
          </div>
        )}

        {/* Section Label */}
        {showSectionLabel && !isCollapsed && (
          <div className="mb-2">
            <div className="px-4 py-1 bg-slate-700/40 backdrop-blur-xl border border-slate-600/50 rounded-lg shadow">
              <p className="text-[10px] font-medium text-slate-300 tracking-wide text-center whitespace-nowrap">
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
                ? 'bg-slate-800/20 backdrop-blur-xl border-2 border-dashed border-red-500/40'
                : 'bg-gradient-to-br from-slate-800/50 to-slate-800/30 backdrop-blur-xl border'
            } rounded-xl cursor-pointer transition-all shadow-lg group ${
              isHighlighted || isHovered ? 'border-amber-500/60 scale-105 shadow-xl shadow-amber-500/10 ring-2 ring-amber-500/20' : node.isVacant ? '' : 'border-slate-700/50'
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
                node.status === 'On Leave' ? 'bg-amber-400' : 'bg-slate-400'
              }`} title={node.status} />
            )}

            {/* Cert Alert Badge - Top Left (not for vacancies) */}
            {!node.isVacant && node.certStatus === 'expiring' && (
              <div className="absolute -top-2 -left-2 px-1.5 py-0.5 bg-amber-500 rounded text-[8px] font-bold text-white shadow-lg" title="Certification Expiring Soon">
                CERT
              </div>
            )}
            {!node.isVacant && node.certStatus === 'expired' && (
              <div className="absolute -top-2 -left-2 px-1.5 py-0.5 bg-red-500 rounded text-[8px] font-bold text-white shadow-lg" title="Certification Expired">
                EXP
              </div>
            )}

            {node.divisionStrength && (
              <div className={`absolute -top-2 -right-2 px-2 py-1 rounded-lg text-[9px] font-bold shadow-lg ${
                getStaffingColor(node.divisionStrength) === 'red' ? 'bg-red-500/90 text-white' :
                getStaffingColor(node.divisionStrength) === 'amber' ? 'bg-amber-500/90 text-white' :
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
                      <div className={`text-amber-400 ${size === 'lg' ? 'text-[10px]' : 'text-[9px]'}`}>
                        {node.daysVacant} days vacant
                      </div>
                      <div className={`text-blue-400 ${size === 'lg' ? 'text-[10px]' : 'text-[9px]'}`}>
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
                      <span className={`text-white font-bold ${size === 'lg' ? 'text-sm' : 'text-xs'}`}>{node.photo}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className={`font-bold text-white truncate ${size === 'lg' ? 'text-xs' : 'text-[11px]'}`}>{node.name}</h4>
                      <p className={`text-slate-400 truncate ${size === 'lg' ? 'text-[10px]' : 'text-[9px]'}`}>{node.rank}</p>
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
                                ? 'text-amber-400 fill-amber-400'
                                : 'text-slate-600'
                            }`} />
                          ))}
                          <span className="text-[8px] text-slate-400 ml-0.5">{node.performance.toFixed(1)}</span>
                        </div>
                      )}
                      {node.reports > 0 && (
                        <div className={`flex items-center gap-1 text-slate-400 ${size === 'lg' ? 'text-[10px]' : 'text-[9px]'}`}>
                          <Users className="w-2.5 h-2.5" />
                          <span>{node.reports}</span>
                        </div>
                      )}
                    </>
                  )}
                </>
              )}
            </div>

            <div className="absolute left-full ml-2 top-0 w-64 bg-slate-900/95 border border-slate-700/50 rounded-lg p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 shadow-2xl pointer-events-none">
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <Mail className="w-3 h-3 text-slate-400" />
                  <span className="truncate">{node.email}</span>
                </div>
                {node.phone && (
                  <div className="flex items-center gap-2 text-slate-300">
                    <Phone className="w-3 h-3 text-slate-400" />
                    <span>{node.phone}</span>
                  </div>
                )}
                {node.yearsOfService && (
                  <div className="flex items-center gap-2 text-slate-300">
                    <Award className="w-3 h-3 text-slate-400" />
                    <span>{node.yearsOfService} years</span>
                  </div>
                )}
                <div className={`inline-flex items-center gap-1 px-2 py-1 rounded text-[10px] font-medium ${
                  node.status === 'On Duty' ? 'bg-green-500/20 text-green-400' :
                  'bg-slate-500/20 text-slate-400'
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
              className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-slate-700 hover:bg-slate-600 rounded-full flex items-center justify-center shadow-lg transition-all z-10"
            >
              {isCollapsed ? <ChevronDown className="w-3 h-3 text-white" /> : <ChevronUp className="w-3 h-3 text-white" />}
            </button>
          )}
        </div>

        {hasChildren && !isCollapsed && (
          <>
            <div className="w-0.5 h-12 bg-slate-700"></div>

            <div className="relative">
              {children.length > 1 && (
                <>
                  <div className="absolute left-0 right-0 h-0.5 bg-slate-700" style={{
                    top: '-12px',
                    left: `calc(${100 / children.length / 2}%)`,
                    right: `calc(${100 / children.length / 2}%)`
                  }}></div>
                  {children.map((_, idx) => (
                    <div
                      key={idx}
                      className="absolute w-0.5 h-12 bg-slate-700"
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
    <>
      <div className="p-4 lg:p-6 h-full">
        <div className="h-full flex flex-col">
            <div className="mb-4 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">Organization Chart</h2>
                <p className="text-slate-400">Full department hierarchy with {allOrgData.length} personnel</p>
              </div>

              {/* Only show export button here when not in fullscreen */}
              {!isFullscreen && (
                <div className="flex flex-wrap items-center gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 bg-slate-800/40 border border-slate-700/50 rounded-xl text-slate-300 hover:border-slate-600/50 hover:bg-slate-800/60 transition-all">
                    <Download className="w-4 h-4" />
                    <span className="hidden sm:inline">Export</span>
                  </button>
                </div>
              )}
            </div>

            {/* Organizational Insights Panel */}
            <div className="mb-4 bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-white mb-2">AI Organizational Insights</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {/* Structure Health */}
                    <div className="bg-slate-800/40 rounded-xl p-3 border border-slate-700/50">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 bg-amber-500/20 rounded-lg flex items-center justify-center">
                          <TrendingUp className="w-3 h-3 text-amber-400" />
                        </div>
                        <span className="text-xs font-semibold text-slate-300">Structure Health</span>
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-slate-400">Overall staffing</span>
                          <span className="text-xs font-bold text-amber-400">60%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-700/50 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500 rounded-full" style={{ width: '60%' }}></div>
                        </div>
                        <p className="text-[10px] text-slate-500">30/50 positions filled</p>
                        <p className="text-[10px] text-red-400">⚠️ 5 critical vacancies (Patrol)</p>
                      </div>
                    </div>

                    {/* Leadership Status */}
                    <div className="bg-slate-800/40 rounded-xl p-3 border border-slate-700/50">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 bg-blue-500/20 rounded-lg flex items-center justify-center">
                          <Users className="w-3 h-3 text-blue-400" />
                        </div>
                        <span className="text-xs font-semibold text-slate-300">Leadership</span>
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-slate-400">Executive</span>
                          <span className="text-xs font-bold text-green-400">100%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-slate-400">Command staff</span>
                          <span className="text-xs font-bold text-amber-400">75%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-slate-400">Supervisors</span>
                          <span className="text-xs font-bold text-green-400">80%</span>
                        </div>
                      </div>
                    </div>

                    {/* Key Recommendations */}
                    <div className="bg-slate-800/40 rounded-xl p-3 border border-slate-700/50">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 bg-green-500/20 rounded-lg flex items-center justify-center">
                          <CheckCircle className="w-3 h-3 text-green-400" />
                        </div>
                        <span className="text-xs font-semibold text-slate-300">Recommendations</span>
                      </div>
                      <div className="space-y-1.5">
                        <p className="text-[10px] text-slate-300">• Prioritize 5 Patrol vacancies</p>
                        <p className="text-[10px] text-slate-300">• 3 retirement-eligible (2 years)</p>
                        <p className="text-[10px] text-slate-300">• Succession plans ready ✅</p>
                        <p className="text-[10px] text-blue-400">• Span of control: Healthy</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search by name, badge, or division..."
                  className="w-full pl-12 pr-4 py-2.5 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 transition-all"
                />
              </div>

              <div className="flex gap-2">
                <select value={filterDivision} onChange={(e) => setFilterDivision(e.target.value)} className="px-4 py-2.5 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white text-sm focus:outline-none focus:border-amber-500/50 cursor-pointer">
                  {divisions.map(div => (
                    <option key={div} value={div}>{div === 'all' ? 'All Divisions' : div}</option>
                  ))}
                </select>

                <select value={filterRank} onChange={(e) => setFilterRank(e.target.value)} className="px-4 py-2.5 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white text-sm focus:outline-none focus:border-amber-500/50 cursor-pointer">
                  {ranks.map(rank => (
                    <option key={rank} value={rank}>{rank === 'all' ? 'All Ranks' : rank}</option>
                  ))}
                </select>
              </div>
            </div>

            <div
              ref={chartContainerRef}
              className="flex-1 bg-slate-800/20 border border-slate-700/50 rounded-xl relative touch-none"
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
                <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-700/50 rounded-xl px-3 py-2 shadow-lg">
                  <button onClick={() => setZoomLevel(Math.max(25, zoomLevel - 10))} className="p-1 hover:bg-slate-700/50 rounded transition-colors">
                    <ZoomOut className="w-4 h-4 text-slate-300" />
                  </button>
                  <span className="text-sm text-white font-medium w-14 text-center">{zoomLevel}%</span>
                  <button onClick={() => setZoomLevel(Math.min(200, zoomLevel + 10))} className="p-1 hover:bg-slate-700/50 rounded transition-colors">
                    <ZoomIn className="w-4 h-4 text-slate-300" />
                  </button>
                </div>

                {/* Action Buttons */}
                <button onClick={fitToScreen} className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-900/90 border border-slate-700/50 rounded-xl text-slate-300 hover:border-slate-600/50 hover:bg-slate-800/90 transition-all shadow-lg">
                  <Maximize className="w-4 h-4" />
                  <span className="text-sm">Fit</span>
                </button>

                <button onClick={toggleFullscreen} className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-900/90 border border-slate-700/50 rounded-xl text-slate-300 hover:border-slate-600/50 hover:bg-slate-800/90 transition-all shadow-lg">
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                  <span className="text-sm">{isFullscreen ? 'Exit' : 'Full'}</span>
                </button>
              </div>

              {/* MiniMap */}
              <div className="absolute bottom-4 right-4 w-48 h-32 bg-slate-900/90 border border-slate-700/50 rounded-lg overflow-hidden z-40 hidden lg:block">
                <div className="w-full h-full bg-slate-800/50 flex items-center justify-center">
                  <div className="text-xs text-slate-500">
                    <MapPin className="w-4 h-4 mx-auto mb-1" />
                    <p>MiniMap</p>
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

            <div className="mt-4 flex flex-wrap items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500/20 border border-green-500/30 rounded"></div>
                <span className="text-slate-400">95%+ Staffed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-amber-500/20 border border-amber-500/30 rounded"></div>
                <span className="text-slate-400">80-94% Staffed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500/20 border border-red-500/30 rounded"></div>
                <span className="text-slate-400">&lt;80% Staffed</span>
              </div>
              <div className="flex items-center gap-2">
                <Move className="w-3 h-3 text-slate-400" />
                <span className="text-slate-400">Drag/Pinch • {allOrgData.length}+ Total Personnel</span>
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
          <div className="relative w-full max-w-[480px] bg-slate-900 border-l border-slate-700/50 shadow-2xl overflow-y-auto">
            <div className="sticky top-0 bg-slate-900/95 backdrop-blur-xl border-b border-slate-700/50 p-6 z-10">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <span className="text-white font-medium">{selectedNode.photo}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{selectedNode.name}</h3>
                    <p className="text-sm text-slate-400">{selectedNode.title}</p>
                  </div>
                </div>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="p-2 hover:bg-slate-800/50 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <button className="px-3 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1">
                  <Users className="w-3 h-3" />
                  Profile
                </button>
                <button className="px-3 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 text-blue-400 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1">
                  <Mail className="w-3 h-3" />
                  Message
                </button>
                <button className="px-3 py-2 bg-slate-700/40 hover:bg-slate-700/60 border border-slate-600/50 text-slate-300 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1">
                  <UserPlus className="w-3 h-3" />
                  Reassign
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-800/40 rounded-xl p-4 border border-slate-700/50">
                  <p className="text-xs text-slate-400 mb-1">Badge</p>
                  <p className="text-sm font-medium text-white font-mono">{selectedNode.badge}</p>
                </div>
                {selectedNode.yearsOfService && (
                  <div className="bg-slate-800/40 rounded-xl p-4 border border-slate-700/50">
                    <p className="text-xs text-slate-400 mb-1">Tenure</p>
                    <p className="text-sm font-medium text-white">{selectedNode.yearsOfService} years</p>
                  </div>
                )}
                {selectedNode.division && (
                  <div className="bg-slate-800/40 rounded-xl p-4 border border-slate-700/50 col-span-2">
                    <p className="text-xs text-slate-400 mb-1">Division</p>
                    <p className="text-sm font-medium text-white">{selectedNode.division}</p>
                  </div>
                )}
              </div>

              {selectedNode.email && (
                <div>
                  <h4 className="text-sm font-semibold text-white mb-3">Contact Information</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                      <Mail className="w-4 h-4 text-slate-400" />
                      <span>{selectedNode.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                      <Phone className="w-4 h-4 text-slate-400" />
                      <span>{selectedNode.phone}</span>
                    </div>
                  </div>
                </div>
              )}

              {selectedNode.divisionStrength && (
                <div>
                  <h4 className="text-sm font-semibold text-white mb-3">Staffing Overview</h4>
                  <div className="bg-slate-800/40 rounded-xl p-4 border border-slate-700/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-300">Current Strength</span>
                      <span className="text-lg font-bold text-white">{selectedNode.divisionStrength.current} / {selectedNode.divisionStrength.authorized}</span>
                    </div>
                    <div className="w-full h-2 bg-slate-700/50 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          getStaffingColor(selectedNode.divisionStrength) === 'red' ? 'bg-red-500' :
                          getStaffingColor(selectedNode.divisionStrength) === 'amber' ? 'bg-amber-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${(selectedNode.divisionStrength.current / selectedNode.divisionStrength.authorized) * 100}%` }}
                      />
                    </div>
                    <p className="text-xs text-slate-400 mt-2">
                      {Math.round((selectedNode.divisionStrength.current / selectedNode.divisionStrength.authorized) * 100)}% capacity
                    </p>
                  </div>
                </div>
              )}

              <div>
                <h4 className="text-sm font-semibold text-white mb-3">Team Information</h4>
                <div className="bg-slate-800/40 rounded-xl p-4 border border-slate-700/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-blue-400" />
                      <span className="text-sm text-slate-300">Direct Reports</span>
                    </div>
                    <span className="text-lg font-bold text-white">{selectedNode.reports}</span>
                  </div>
                </div>
              </div>

              {/* Performance Rating */}
              {selectedNode.performance && (
                <div>
                  <h4 className="text-sm font-semibold text-white mb-3">Performance Rating</h4>
                  <div className="bg-slate-800/40 rounded-xl p-4 border border-slate-700/50">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-5 h-5 ${
                            i < Math.floor(selectedNode.performance)
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-slate-600'
                          }`} />
                        ))}
                      </div>
                      <span className="text-2xl font-bold text-white">{selectedNode.performance.toFixed(1)}</span>
                    </div>
                    <p className="text-xs text-slate-400">Excellent performance rating</p>
                  </div>
                </div>
              )}

              {/* Succession Planning */}
              {selectedNode.succession && (
                <div>
                  <h4 className="text-sm font-semibold text-white mb-3">Succession Planning</h4>
                  <div className="bg-slate-800/40 rounded-xl p-4 border border-slate-700/50 space-y-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-sm text-green-400 font-medium">Succession Plan Ready</span>
                    </div>
                    {selectedNode.succession.successor && (
                      <div>
                        <p className="text-xs text-slate-400 mb-1">Identified Successor</p>
                        <p className="text-sm text-white font-medium">{selectedNode.succession.successor}</p>
                      </div>
                    )}
                    {selectedNode.succession.successors && (
                      <div>
                        <p className="text-xs text-slate-400 mb-1">Identified Successors</p>
                        <div className="space-y-1">
                          {selectedNode.succession.successors.map((successor, idx) => (
                            <p key={idx} className="text-sm text-white">• {successor}</p>
                          ))}
                        </div>
                      </div>
                    )}
                    {selectedNode.retirementEligible && (
                      <div>
                        <p className="text-xs text-slate-400 mb-1">Retirement Eligibility</p>
                        <p className="text-sm text-white">{selectedNode.retirementEligible}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Team Performance Metrics */}
              {selectedNode.reports > 0 && !selectedNode.isVacant && (
                <div>
                  <h4 className="text-sm font-semibold text-white mb-3">Team Performance</h4>
                  <div className="bg-slate-800/40 rounded-xl p-4 border border-slate-700/50">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-slate-400 mb-1">Team Size</p>
                        <p className="text-lg font-bold text-white">{selectedNode.reports}</p>
                        <p className="text-[10px] text-slate-500">Direct reports</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 mb-1">Avg Rating</p>
                        <p className="text-lg font-bold text-white">4.5</p>
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-2.5 h-2.5 ${
                              i < 4 ? 'text-amber-400 fill-amber-400' : 'text-slate-600'
                            }`} />
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 mb-1">On Duty</p>
                        <p className="text-lg font-bold text-green-400">{Math.floor(selectedNode.reports * 0.8)}</p>
                        <p className="text-[10px] text-slate-500">Currently active</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 mb-1">Cert Compliance</p>
                        <p className="text-lg font-bold text-green-400">92%</p>
                        <p className="text-[10px] text-slate-500">All current</p>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-700/50 grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-slate-400 mb-1">Commendations</p>
                        <p className="text-sm font-bold text-blue-400">8 this month</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 mb-1">Disciplinary</p>
                        <p className="text-sm font-bold text-green-400">0</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Vacancy Information */}
              {selectedNode.isVacant && (
                <div>
                  <h4 className="text-sm font-semibold text-white mb-3">Vacancy Details</h4>
                  <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/30">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-300">Days Vacant</span>
                        <span className="text-lg font-bold text-red-400">{selectedNode.daysVacant}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-300">Candidates in Pipeline</span>
                        <span className="text-lg font-bold text-blue-400">{selectedNode.candidatesInPipeline}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-300">Expected Fill Date</span>
                        <span className="text-sm font-medium text-white">{selectedNode.expectedFill}</span>
                      </div>
                      <button className="w-full mt-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors">
                        View Applicants
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/20 transition-all z-40 group"
      >
        <MessageCircle className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
      </button>

      {chatOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-xl shadow-2xl flex flex-col z-40">
          <div className="p-4 border-b border-slate-700/50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white">Org Chart AI Assistant</h3>
            </div>
            <button onClick={() => setChatOpen(false)} className="p-1 hover:bg-slate-800/50 rounded-lg transition-colors">
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="bg-slate-800/40 rounded-lg p-3 mb-3">
              <p className="text-sm text-slate-300">Hello! I can help you navigate the org chart, find personnel, analyze department structure, and answer questions about reporting relationships. What would you like to know?</p>
            </div>
          </div>

          <div className="p-4 border-t border-slate-700/50">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Ask about the org structure..."
                className="flex-1 px-4 py-2 bg-slate-800/40 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50"
              />
              <button className="p-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors">
                <Send className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
