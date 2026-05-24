const STATUS_MAP = {
  pending_review:    'Pending Review',
  in_progress:       'In Progress',
  initial_review:    'Initial Review',
  not_started:       'Not Started',
  completed:         'Completed',
  complete:          'Completed',
  on_track:          'On Track',
  at_risk:           'At Risk',
  below_target:      'Below Target',
  in_route:          'En Route',
  on_scene:          'On Scene',
  dispatched:        'Dispatched',
  available:         'Available',
  out_of_service:    'Out of Service',
  booking:           'Booking',
  released:          'Released',
  active:            'Active',
  resolved:          'Resolved',
  escalated:         'Escalated',
  acknowledged:      'Acknowledged',
  open:              'Open',
  closed:            'Closed',
  submitted:         'Initial Review',
  under_review:      'Under Review',
  on_hold:           'On Hold',
  pending_signature: 'Pending Signature',
  pending:           'Pending',
  blocked:           'Blocked',
  cancelled:         'Cancelled',
  scheduled:         'Scheduled',
  in_custody:        'In Custody',
  transferred:       'Transferred',
  medical_hold:      'Medical Hold',
  court_hold:        'Court Hold',
  work_release:      'Work Release',
};

export const formatStatus = (raw) => {
  if (!raw) return '—';
  return (
    STATUS_MAP[String(raw).toLowerCase()] ||
    String(raw).replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
  );
};
