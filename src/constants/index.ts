export const DEPARTMENTS = ['Central', 'Dagoretti', 'Informal Settlement', 'Kasarani', 'Langata', 'Lower Embakasi', 'Roysambu', 'Upper Embakasi', 'Westlands'];
export const DEPARTMENT_OPTIONS = DEPARTMENTS.map((dept)=>({
    value: dept,
    label: dept,
}));
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