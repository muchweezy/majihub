


// ============================================================
//  MAJI HUB — SYSTEM CONSTANTS
//  Nairobi City Water & Sewerage Company (NCWSC)
//  All dropdown options, lookup tables, and static reference data
// ============================================================

// ─────────────────────────────────────────────────────────────
// DEPARTMENTS
// ─────────────────────────────────────────────────────────────

export const DEPARTMENTS = [
    'Central',
    'Dagoretti',
    'Informal Settlement',
    'Kasarani',
    'Langata',
    'Lower Embakasi',
    'Roysambu',
    'Upper Embakasi',
    'Westlands',
];

export const DEPARTMENT_OPTIONS = DEPARTMENTS.map((dept) => ({
    value: dept,
    label: dept,
}));

// ─────────────────────────────────────────────────────────────
// ZONES  (distribution zones within each department)
// ─────────────────────────────────────────────────────────────

export const ZONES = [
    // Central
    'CBD',
    'Upper Hill',
    'Kilimani',
    'Hurlingham',
    'South C',
    'South B',
    // Dagoretti
    'Dagoretti Corner',
    'Kawangware',
    'Riruta',
    'Satellite',
    'Uthiru',
    // Informal Settlement
    'Kibera',
    'Mathare',
    'Mukuru Kwa Njenga',
    'Mukuru Kwa Reuben',
    'Korogocho',
    'Kangemi',
    // Kasarani
    'Kasarani',
    'Mirema',
    'Seasons',
    'Lumumba',
    'Garden Estate',
    'Mwiki',
    // Langata
    'Karen',
    'Langata',
    'Hardy',
    'Bomas',
    'Ongata Rongai',
    // Lower Embakasi
    'Embakasi East',
    'Pipeline',
    'Utawala',
    'Mihango',
    'Kware',
    // Roysambu
    'Roysambu',
    'Kahawa West',
    'Kahawa',
    'Githurai',
    'Zimmerman',
    // Upper Embakasi
    'Donholm',
    'Komarock',
    'Umoja',
    'Ruai',
    'Njiru',
    // Westlands
    'Westlands',
    'Parklands',
    'Lavington',
    'Highridge',
    'Kitisuru',
    'Spring Valley',
];

export const ZONE_OPTIONS = ZONES.map((zone) => ({
    value: zone,
    label: zone,
}));

// Zones grouped by Department for cascading dropdowns
export const ZONES_BY_DEPARTMENT: Record<string, string[]> = {
    'Central': ['CBD', 'Upper Hill', 'Kilimani', 'Hurlingham', 'South C', 'South B'],
    'Dagoretti': ['Dagoretti Corner', 'Kawangware', 'Riruta', 'Satellite', 'Uthiru'],
    'Informal Settlement': ['Kibera', 'Mathare', 'Mukuru Kwa Njenga', 'Mukuru Kwa Reuben', 'Korogocho', 'Kangemi'],
    'Kasarani': ['Kasarani', 'Mirema', 'Seasons', 'Lumumba', 'Garden Estate', 'Mwiki'],
    'Langata': ['Karen', 'Langata', 'Hardy', 'Bomas', 'Ongata Rongai'],
    'Lower Embakasi': ['Embakasi East', 'Pipeline', 'Utawala', 'Mihango', 'Kware'],
    'Roysambu': ['Roysambu', 'Kahawa West', 'Kahawa', 'Githurai', 'Zimmerman'],
    'Upper Embakasi': ['Donholm', 'Komarock', 'Umoja', 'Ruai', 'Njiru'],
    'Westlands': ['Westlands', 'Parklands', 'Lavington', 'Highridge', 'Kitisuru', 'Spring Valley'],
};

// ─────────────────────────────────────────────────────────────
// SERVICE MODULES
// ─────────────────────────────────────────────────────────────

export const SERVICE_MODULES = [
    'Billing Management',
    'Customer Support',
    'Fault / Leak Reporting',
    'Meter Data Management',
    'Analytics & Reporting',
    'Service Request Management',
    'User Account Management',
    'Revenue Protection',
    'Sewerage Management',
    'Field Operations',
];

export const SERVICE_MODULE_OPTIONS = SERVICE_MODULES.map((mod) => ({
    value: mod,
    label: mod,
}));

// ─────────────────────────────────────────────────────────────
// ACCOUNT TYPES
// ─────────────────────────────────────────────────────────────

export const ACCOUNT_TYPES = [
    'Domestic',
    'Commercial',
    'Industrial',
    'Government',
    'Bulk / Kiosk',
    'Institution',
    'Informal Settlement',
];

export const ACCOUNT_TYPE_OPTIONS = ACCOUNT_TYPES.map((type) => ({
    value: type.toLowerCase().replace(/ \/ /g, '_').replace(/\s/g, '_'),
    label: type,
}));

// ─────────────────────────────────────────────────────────────
// TARIFF TIERS  (NCWSC progressive tariff structure)
// ─────────────────────────────────────────────────────────────

export const TARIFF_TIERS = [
    'Tier 1 (0–6 m³)',
    'Tier 2 (7–20 m³)',
    'Tier 3 (21–50 m³)',
    'Tier 4 (Above 50 m³)',
];

export const TARIFF_TIER_OPTIONS = TARIFF_TIERS.map((tier, i) => ({
    value: `tier${i + 1}`,
    label: tier,
}));

// Tariff rates (KES per m³) — current schedule
export const TARIFF_RATES: Record<string, { waterKES: number; sewerageKES: number; label: string }> = {
    tier1: { waterKES: 55,  sewerageKES: 28,  label: 'Tier 1 (0–6 m³)' },
    tier2: { waterKES: 89,  sewerageKES: 45,  label: 'Tier 2 (7–20 m³)' },
    tier3: { waterKES: 108, sewerageKES: 55,  label: 'Tier 3 (21–50 m³)' },
    tier4: { waterKES: 130, sewerageKES: 66,  label: 'Tier 4 (Above 50 m³)' },
};

// ─────────────────────────────────────────────────────────────
// USER ROLES
// ─────────────────────────────────────────────────────────────

export const USER_ROLES = [
    'Customer',
    'Customer Service',
    'Billing Staff',
    'Field Technician',
    'Meter Reader',
    'Revenue Inspector',
    'Manager',
    'Administrator',
    'Super Admin',
];

export const USER_ROLE_OPTIONS = USER_ROLES.map((role) => ({
    value: role.toLowerCase().replace(/\s/g, '_'),
    label: role,
}));

// ─────────────────────────────────────────────────────────────
// SERVICE REQUEST STATUSES
// ─────────────────────────────────────────────────────────────

export const REQUEST_STATUSES = [
    'Submitted',
    'Pending Review',
    'Approved',
    'In Progress',
    'On Hold',
    'Completed',
    'Rejected',
    'Cancelled',
];

export const REQUEST_STATUS_OPTIONS = REQUEST_STATUSES.map((status) => ({
    value: status.toLowerCase().replace(/\s/g, '_'),
    label: status,
}));

// Status badge colour mapping (Tailwind / CSS class hints)
export const REQUEST_STATUS_COLORS: Record<string, string> = {
    submitted:      '#0088ff',
    pending_review: '#ffaa00',
    approved:       '#00c896',
    in_progress:    '#00d4ff',
    on_hold:        '#8855ff',
    completed:      '#00ff88',
    rejected:       '#ff2255',
    cancelled:      '#666e80',
};

// ─────────────────────────────────────────────────────────────
// WORK ORDER STATUSES
// ─────────────────────────────────────────────────────────────

export const WORK_ORDER_STATUSES = [
    'Unassigned',
    'Assigned',
    'Dispatched',
    'In Progress',
    'Completed',
    'Escalated',
    'Cancelled',
];

export const WORK_ORDER_STATUS_OPTIONS = WORK_ORDER_STATUSES.map((status) => ({
    value: status.toLowerCase().replace(/\s/g, '_'),
    label: status,
}));

// ─────────────────────────────────────────────────────────────
// WORK ORDER TYPES
// ─────────────────────────────────────────────────────────────

export const WORK_ORDER_TYPES = [
    'New Connection',
    'Reconnection',
    'Disconnection',
    'Meter Replacement',
    'Meter Reading',
    'Pipe Repair',
    'Leak Fix',
    'Sewer Connection',
    'Site Inspection',
    'Routine Maintenance',
    'Revenue Protection',
];

export const WORK_ORDER_TYPE_OPTIONS = WORK_ORDER_TYPES.map((type) => ({
    value: type.toLowerCase().replace(/\s/g, '_'),
    label: type,
}));

// ─────────────────────────────────────────────────────────────
// FAULT TYPES
// ─────────────────────────────────────────────────────────────

export const FAULT_TYPES = [
    'Pipe Burst',
    'Underground Leak',
    'Low Water Pressure',
    'No Water Supply',
    'Meter Fault',
    'Water Quality / Contamination',
    'Sewer Overflow',
    'Sewer Blockage',
    'Illegal Connection',
    'Meter Tampering',
    'Meter Bypass',
];

export const FAULT_TYPE_OPTIONS = FAULT_TYPES.map((fault) => ({
    value: fault.toLowerCase().replace(/\s\//g, '').replace(/\s/g, '_'),
    label: fault,
}));

// ─────────────────────────────────────────────────────────────
// FAULT SEVERITY LEVELS
// ─────────────────────────────────────────────────────────────

export const FAULT_SEVERITIES = [
    'Minor',
    'Moderate',
    'Major',
    'Critical',
];

export const FAULT_SEVERITY_OPTIONS = FAULT_SEVERITIES.map((sev) => ({
    value: sev.toLowerCase(),
    label: sev,
}));

export const FAULT_SEVERITY_COLORS: Record<string, string> = {
    minor:    '#00c896',
    moderate: '#ffaa00',
    major:    '#ff6600',
    critical: '#ff2255',
};

// ─────────────────────────────────────────────────────────────
// PRIORITY LEVELS
// ─────────────────────────────────────────────────────────────

export const PRIORITY_LEVELS = [
    'Low',
    'Medium',
    'High',
    'Critical',
];

export const PRIORITY_OPTIONS = PRIORITY_LEVELS.map((p) => ({
    value: p.toLowerCase(),
    label: p,
}));

export const PRIORITY_COLORS: Record<string, string> = {
    low:      '#00c896',
    medium:   '#ffaa00',
    high:     '#ff6600',
    critical: '#ff2255',
};

// ─────────────────────────────────────────────────────────────
// BILL STATUSES
// ─────────────────────────────────────────────────────────────

export const BILL_STATUSES = [
    'Draft',
    'Issued',
    'Partial',
    'Paid',
    'Overdue',
    'Disputed',
    'Waived',
];

export const BILL_STATUS_OPTIONS = BILL_STATUSES.map((status) => ({
    value: status.toLowerCase(),
    label: status,
}));

export const BILL_STATUS_COLORS: Record<string, string> = {
    draft:    '#666e80',
    issued:   '#0088ff',
    partial:  '#ffaa00',
    paid:     '#00ff88',
    overdue:  '#ff2255',
    disputed: '#8855ff',
    waived:   '#00c8e8',
};

// ─────────────────────────────────────────────────────────────
// PAYMENT METHODS
// ─────────────────────────────────────────────────────────────

export const PAYMENT_METHODS = [
    'M-Pesa',
    'Airtel Money',
    'Debit / Credit Card',
    'Bank Transfer',
    'Cash (Counter)',
    'USSD',
    'Direct Debit',
];

export const PAYMENT_METHOD_OPTIONS = PAYMENT_METHODS.map((method) => ({
    value: method.toLowerCase().replace(/ \/ /g, '_').replace(/\s/g, '_').replace(/[()]/g, ''),
    label: method,
}));

export const PAYMENT_METHOD_ICONS: Record<string, string> = {
    mpesa:              '📱',
    airtel_money:       '📲',
    debit_credit_card:  '💳',
    bank_transfer:      '🏦',
    cash_counter:       '💵',
    ussd:               '📞',
    direct_debit:       '🔄',
};

// ─────────────────────────────────────────────────────────────
// PAYMENT STATUSES
// ─────────────────────────────────────────────────────────────

export const PAYMENT_STATUSES = [
    'Pending',
    'Processing',
    'Success',
    'Failed',
    'Reversed',
    'Refunded',
];

export const PAYMENT_STATUS_OPTIONS = PAYMENT_STATUSES.map((status) => ({
    value: status.toLowerCase(),
    label: status,
}));

// ─────────────────────────────────────────────────────────────
// METER TYPES
// ─────────────────────────────────────────────────────────────

export const METER_TYPES = [
    'Mechanical',
    'Digital',
    'Smart AMR',
    'Ultrasonic',
    'Prepaid',
];

export const METER_TYPE_OPTIONS = METER_TYPES.map((type) => ({
    value: type.toLowerCase().replace(/\s/g, '_'),
    label: type,
}));

// ─────────────────────────────────────────────────────────────
// METER STATUSES
// ─────────────────────────────────────────────────────────────

export const METER_STATUSES = [
    'Active',
    'Faulty',
    'Tampered',
    'Removed',
    'Replaced',
    'Pending Installation',
];

export const METER_STATUS_OPTIONS = METER_STATUSES.map((status) => ({
    value: status.toLowerCase().replace(/\s/g, '_'),
    label: status,
}));

// ─────────────────────────────────────────────────────────────
// METER READING METHODS
// ─────────────────────────────────────────────────────────────

export const METER_READING_METHODS = [
    'Manual (Field Reader)',
    'AMR (Automatic)',
    'Customer Self-Submit',
    'Estimated',
];

export const METER_READING_METHOD_OPTIONS = METER_READING_METHODS.map((method) => ({
    value: method.toLowerCase().replace(/ *\(.*?\)/g, '').trim().replace(/\s/g, '_'),
    label: method,
}));

// ─────────────────────────────────────────────────────────────
// CUSTOMER STATUSES
// ─────────────────────────────────────────────────────────────

export const CUSTOMER_STATUSES = [
    'Active',
    'Suspended',
    'Disconnected',
    'Pending Activation',
    'Archived',
    'Deceased',
];

export const CUSTOMER_STATUS_OPTIONS = CUSTOMER_STATUSES.map((status) => ({
    value: status.toLowerCase().replace(/\s/g, '_'),
    label: status,
}));

export const CUSTOMER_STATUS_COLORS: Record<string, string> = {
    active:             '#00ff88',
    suspended:          '#ffaa00',
    disconnected:       '#ff2255',
    pending_activation: '#0088ff',
    archived:           '#666e80',
    deceased:           '#444c5c',
};

// ─────────────────────────────────────────────────────────────
// SERVICE STATUSES
// ─────────────────────────────────────────────────────────────

export const SERVICE_STATUSES = [
    'Active',
    'Inactive',
    'Beta',
    'Deprecated',
    'Scheduled Maintenance',
];

export const SERVICE_STATUS_OPTIONS = SERVICE_STATUSES.map((status) => ({
    value: status.toLowerCase().replace(/\s/g, '_'),
    label: status,
}));

// ─────────────────────────────────────────────────────────────
// NOTIFICATION CHANNELS
// ─────────────────────────────────────────────────────────────

export const NOTIFICATION_CHANNELS = [
    'SMS',
    'Email',
    'Push Notification',
    'WhatsApp',
    'IVR Call',
];

export const NOTIFICATION_CHANNEL_OPTIONS = NOTIFICATION_CHANNELS.map((channel) => ({
    value: channel.toLowerCase().replace(/\s/g, '_'),
    label: channel,
}));

// ─────────────────────────────────────────────────────────────
// CONSUMPTION ALERT TYPES
// ─────────────────────────────────────────────────────────────

export const CONSUMPTION_ALERT_TYPES = [
    'High Consumption',
    'Suspected Leak',
    'Zero Consumption',
    'Unusual Pattern',
    'Threshold Exceeded',
    'Night Flow Anomaly',
    'Meter Stall',
];

export const CONSUMPTION_ALERT_TYPE_OPTIONS = CONSUMPTION_ALERT_TYPES.map((type) => ({
    value: type.toLowerCase().replace(/\s/g, '_'),
    label: type,
}));

// ─────────────────────────────────────────────────────────────
// DOCUMENT TYPES  (for uploads on requests/work orders)
// ─────────────────────────────────────────────────────────────

export const DOCUMENT_TYPES = [
    'National ID',
    'Passport',
    'KRA PIN Certificate',
    'Title Deed',
    'Sale Agreement',
    'Certificate of Incorporation',
    'Building Plan',
    'County Approval Letter',
    'Building Completion Certificate',
    'Gazette Notice',
    'Tenancy Agreement',
    'Letter of Administration',
    'Meter Photo',
    'Site Plan',
    'Payment Receipt',
    'Other',
];

export const DOCUMENT_TYPE_OPTIONS = DOCUMENT_TYPES.map((doc) => ({
    value: doc.toLowerCase().replace(/\//g, '').replace(/\s/g, '_'),
    label: doc,
}));

// ─────────────────────────────────────────────────────────────
// PIPE SIZES  (for engineering / work orders)
// ─────────────────────────────────────────────────────────────

export const PIPE_SIZES_MM = [
    '15mm',
    '20mm',
    '25mm',
    '32mm',
    '40mm',
    '50mm',
    '63mm',
    '75mm',
    '90mm',
    '110mm',
    '160mm',
    '200mm',
    '250mm',
    '315mm',
    '400mm',
    '500mm',
    '630mm',
];

export const PIPE_SIZE_OPTIONS = PIPE_SIZES_MM.map((size) => ({
    value: size,
    label: size,
}));

// ─────────────────────────────────────────────────────────────
// PIPE MATERIALS
// ─────────────────────────────────────────────────────────────

export const PIPE_MATERIALS = [
    'HDPE',
    'uPVC',
    'Cast Iron',
    'Ductile Iron',
    'GI (Galvanised Iron)',
    'MDPE',
    'PPR',
    'Copper',
    'AC (Asbestos Cement)',
];

export const PIPE_MATERIAL_OPTIONS = PIPE_MATERIALS.map((mat) => ({
    value: mat.toLowerCase().replace(/[()]/g, '').replace(/\s/g, '_'),
    label: mat,
}));

// ─────────────────────────────────────────────────────────────
// LANGUAGE OPTIONS
// ─────────────────────────────────────────────────────────────

export const LANGUAGES = [
    'English',
    'Kiswahili',
];

export const LANGUAGE_OPTIONS = LANGUAGES.map((lang) => ({
    value: lang === 'English' ? 'en' : 'sw',
    label: lang,
}));

// ─────────────────────────────────────────────────────────────
// REPORT PERIODS  (for analytics / statement requests)
// ─────────────────────────────────────────────────────────────

export const REPORT_PERIODS = [
    'Today',
    'Yesterday',
    'This Week',
    'Last Week',
    'This Month',
    'Last Month',
    'Last 3 Months',
    'Last 6 Months',
    'This Year',
    'Last Year',
    'Custom Range',
];

export const REPORT_PERIOD_OPTIONS = REPORT_PERIODS.map((period) => ({
    value: period.toLowerCase().replace(/\s/g, '_'),
    label: period,
}));

// ─────────────────────────────────────────────────────────────
// BILLING CYCLES
// ─────────────────────────────────────────────────────────────

export const BILLING_CYCLES = [
    'Monthly',
    'Bi-Monthly',
    'Quarterly',
];

export const BILLING_CYCLE_OPTIONS = BILLING_CYCLES.map((cycle) => ({
    value: cycle.toLowerCase().replace(/-/g, '_'),
    label: cycle,
}));

// ─────────────────────────────────────────────────────────────
// SLA HOURS  (standard SLA values for UI pickers)
// ─────────────────────────────────────────────────────────────

export const SLA_HOURS = [1, 2, 4, 8, 12, 24, 48, 72, 96, 120, 168];

export const SLA_HOUR_OPTIONS = SLA_HOURS.map((h) => ({
    value: h,
    label: h < 24 ? `${h} hour${h === 1 ? '' : 's'}` : `${h / 24} day${h / 24 === 1 ? '' : 's'}`,
}));

// ─────────────────────────────────────────────────────────────
// SYSTEM-WIDE STATUS  (for general service / system health)
// ─────────────────────────────────────────────────────────────

export const SYSTEM_HEALTH_STATUSES = [
    'Operational',
    'Degraded Performance',
    'Partial Outage',
    'Major Outage',
    'Maintenance',
];

export const SYSTEM_HEALTH_STATUS_OPTIONS = SYSTEM_HEALTH_STATUSES.map((s) => ({
    value: s.toLowerCase().replace(/\s/g, '_'),
    label: s,
}));

export const SYSTEM_HEALTH_COLORS: Record<string, string> = {
    operational:          '#00ff88',
    degraded_performance: '#ffaa00',
    partial_outage:       '#ff6600',
    major_outage:         '#ff2255',
    maintenance:          '#8855ff',
};

// ─────────────────────────────────────────────────────────────
// NCWSC INTERNAL DIVISIONS  (org structure)
// ─────────────────────────────────────────────────────────────

export const NCWSC_DIVISIONS = [
    'Managing Director Office',
    'Finance & Accounts',
    'Revenue & Collections',
    'Customer Service & Billing',
    'Engineering & New Connections',
    'Network Operations & Maintenance',
    'Metering & Revenue Protection',
    'Sewerage & Wastewater',
    'Quality Assurance & Environment',
    'Information Technology',
    'Human Resources & Administration',
    'Commercial & Bulk Supply',
    'Legal & Compliance',
    'Internal Audit',
    'Communications & Public Relations',
];

export const NCWSC_DIVISION_OPTIONS = NCWSC_DIVISIONS.map((div) => ({
    value: div.toLowerCase().replace(/ & /g, '_').replace(/\s/g, '_'),
    label: div,
}));

// ─────────────────────────────────────────────────────────────
// CUSTOMER SATISFACTION RATINGS
// ─────────────────────────────────────────────────────────────

export const SATISFACTION_RATINGS = [
    { value: 1, label: '1 — Very Dissatisfied', emoji: '😠' },
    { value: 2, label: '2 — Dissatisfied',      emoji: '😞' },
    { value: 3, label: '3 — Neutral',            emoji: '😐' },
    { value: 4, label: '4 — Satisfied',          emoji: '😊' },
    { value: 5, label: '5 — Very Satisfied',     emoji: '😄' },
];

// ─────────────────────────────────────────────────────────────
// PAYBILL & PAYMENT CONSTANTS
// ─────────────────────────────────────────────────────────────

export const MPESA_PAYBILL_NUMBER   = '247247';
export const MPESA_ACCOUNT_PREFIX   = 'NCW';
export const VAT_RATE_PERCENT       = 16;
export const RECONNECTION_FEE_KES   = 1500;
export const LATE_PAYMENT_PENALTY_PERCENT = 3;  // % per month on overdue
export const MIN_INSTALMENT_DEPOSIT_PERCENT = 30; // % of total balance required upfront

// ─────────────────────────────────────────────────────────────
// NRW THRESHOLDS  (for alert colouring on dashboards)
// ─────────────────────────────────────────────────────────────

export const NRW_THRESHOLDS = {
    excellent: 15,   // ≤15%  — international best practice
    good:      25,   // ≤25%  — acceptable
    warning:   35,   // ≤35%  — requires attention
    critical:  Infinity, // >35% — critical action needed
};

export const NRW_THRESHOLD_LABELS: { max: number; label: string; color: string }[] = [
    { max: 15,       label: 'Excellent', color: '#00ff88' },
    { max: 25,       label: 'Good',      color: '#00c896' },
    { max: 35,       label: 'Warning',   color: '#ffaa00' },
    { max: Infinity, label: 'Critical',  color: '#ff2255' },
];

// ─────────────────────────────────────────────────────────────
// COLLECTION RATE THRESHOLDS
// ─────────────────────────────────────────────────────────────

export const COLLECTION_RATE_THRESHOLDS = {
    excellent: 90,
    good:      75,
    warning:   60,
    critical:  0,
};

export const COLLECTION_RATE_LABELS: { min: number; label: string; color: string }[] = [
    { min: 90, label: 'Excellent', color: '#00ff88' },
    { min: 75, label: 'Good',      color: '#00c896' },
    { min: 60, label: 'Warning',   color: '#ffaa00' },
    { min: 0,  label: 'Critical',  color: '#ff2255' },
];

// ─────────────────────────────────────────────────────────────
// KPI TARGETS  (annual corporate targets)
// ─────────────────────────────────────────────────────────────

export const KPI_TARGETS = {
    nrwPercentTarget:              32,   // % — Year 1 target (down from 42%)
    collectionRateTarget:          72,   // % — Year 1 target (up from 58%)
    customerSatisfactionTarget:    80,   // % NPS equivalent
    digitalAdoptionTarget:         35,   // % of customer base using portal
    avgResolutionTimeHoursTarget:  24,   // hours — service request resolution
    slaComplianceTarget:           90,   // % of requests resolved within SLA
    billProcessingDaysTarget:      2,    // days (down from 5)
    leakDetectionResponseHours:    4,    // hours (down from 72)
    systemUptimeTarget:            99.5, // %
};

// ─────────────────────────────────────────────────────────────
// CONVENIENCE: all option lists in one map
// (useful for dynamic form renderers)
// ─────────────────────────────────────────────────────────────

export const ALL_OPTIONS = {
    departments:           DEPARTMENT_OPTIONS,
    zones:                 ZONE_OPTIONS,
    serviceModules:        SERVICE_MODULE_OPTIONS,
    accountTypes:          ACCOUNT_TYPE_OPTIONS,
    tariffTiers:           TARIFF_TIER_OPTIONS,
    userRoles:             USER_ROLE_OPTIONS,
    requestStatuses:       REQUEST_STATUS_OPTIONS,
    workOrderStatuses:     WORK_ORDER_STATUS_OPTIONS,
    workOrderTypes:        WORK_ORDER_TYPE_OPTIONS,
    faultTypes:            FAULT_TYPE_OPTIONS,
    faultSeverities:       FAULT_SEVERITY_OPTIONS,
    priorityLevels:        PRIORITY_OPTIONS,
    billStatuses:          BILL_STATUS_OPTIONS,
    paymentMethods:        PAYMENT_METHOD_OPTIONS,
    paymentStatuses:       PAYMENT_STATUS_OPTIONS,
    meterTypes:            METER_TYPE_OPTIONS,
    meterStatuses:         METER_STATUS_OPTIONS,
    meterReadingMethods:   METER_READING_METHOD_OPTIONS,
    customerStatuses:      CUSTOMER_STATUS_OPTIONS,
    serviceStatuses:       SERVICE_STATUS_OPTIONS,
    notificationChannels:  NOTIFICATION_CHANNEL_OPTIONS,
    consumptionAlertTypes: CONSUMPTION_ALERT_TYPE_OPTIONS,
    documentTypes:         DOCUMENT_TYPE_OPTIONS,
    pipeSizes:             PIPE_SIZE_OPTIONS,
    pipeMaterials:         PIPE_MATERIAL_OPTIONS,
    languages:             LANGUAGE_OPTIONS,
    reportPeriods:         REPORT_PERIOD_OPTIONS,
    billingCycles:         BILLING_CYCLE_OPTIONS,
    slaHours:              SLA_HOUR_OPTIONS,
    ncwscDivisions:        NCWSC_DIVISION_OPTIONS,
} as const;

export const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB in bytes
export const ALLOWED_TYPES = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/webp",
];

const getEnvVar = (key: string): string => {
    const value = import.meta.env[key];
    if (!value) {
        throw new Error(`Missing environment variable: ${key}`);
    }
    return value;
};

// Rejects cleartext and non-http(s) API origins outside local development so
// customer data and credentials are never sent over an untrusted transport.
const requireSecureUrl = (key: string): string => {
    const value = getEnvVar(key);
    let url: URL;
    try {
        url = new URL(value);
    } catch {
        throw new Error(`${key} must be an absolute URL, got: ${value}`);
    }
    const isLocalhost = ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname);
    if (url.protocol !== "https:" && !(import.meta.env.DEV && isLocalhost)) {
        throw new Error(`${key} must use https, got: ${url.protocol}//${url.host}`);
    }
    return value;
};

// export const CLOUDINARY_UPLOAD_URL = getEnvVar("VITE_CLOUDINARY_UPLOAD_URL");
// export const CLOUDINARY_CLOUD_NAME = getEnvVar("VITE_CLOUDINARY_CLOUD_NAME");
export const BACKEND_BASE_URL = requireSecureUrl("VITE_BACKEND_BASE_URL");

export const BASE_URL =  import.meta.env.VITE_API_URL;
// export const ACCESS_TOKEN_KEY = import.meta.env.VITE_ACCESS_TOKEN_KEY
// export const REFRESH_TOKEN_KEY = import.meta.env.VITE_REFRESH_TOKEN_KEY
//
// export const REFRESH_TOKEN_URL = `${BASE_URL}/refresh-token`;
//
// export const CLOUDINARY_UPLOAD_PRESET = getEnvVar("VITE_CLOUDINARY_UPLOAD_PRESET");