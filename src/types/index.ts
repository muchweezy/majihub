export type ServiceStatus    = "active" | "inactive" | "deprecated" | "beta";
export type RequestStatus    = "submitted" | "pending_review" | "approved" | "in_progress" | "on_hold" | "completed" | "rejected" | "cancelled";
export type WorkOrderStatus  = "unassigned" | "assigned" | "dispatched" | "in_progress" | "completed" | "escalated" | "cancelled";
export type BillStatus       = "draft" | "issued" | "partial" | "paid" | "overdue" | "disputed" | "waived";
export type PaymentMethod    = "mpesa" | "card" | "bank_transfer" | "cash" | "ussd";
export type PaymentStatus    = "pending" | "processing" | "success" | "failed" | "reversed";
export type UserRole         = "customer" | "billing_staff" | "field_technician" | "customer_service" | "admin" | "manager" | "super_admin";
export type AccountType      = "domestic" | "commercial" | "industrial" | "government" | "bulk";
export type CustomerStatus   = "active" | "suspended" | "disconnected" | "pending_activation" | "archived";
export type Priority         = "low" | "medium" | "high" | "critical";
export type FaultType        = "pipe_burst" | "leak" | "low_pressure" | "no_supply" | "meter_fault" | "contamination" | "illegal_connection";
export type Zone             = "central" | "north" | "south" | "east" | "west" | "industrial" | "karen" | "westlands" | "kasarani" | "embakasi";
export type NotifChannel     = "sms" | "email" | "push" | "whatsapp";
export type MeterStatus      = "active" | "faulty" | "tampered" | "removed" | "replaced" | "pending_installation";


export interface GeoCoordinates {
    lat: number;
    lng: number;
    address: string;
    zone: Zone;
}

export interface SLA {
    acknowledgementHours: number;
    resolutionHours: number;
    escalationHours: number;
    priority: Priority;
}


export type Service = {
    id: string;
    serviceCode: string;
    name: string;
    nameSwahili: string;
    department: string;
    description: string;
    module: string;
    icon: string;
    status: ServiceStatus;
    sla: SLA;
    applicationFeeKES: number;
    requiresFieldVisit: boolean;
    selfServiceEligible: boolean;
    documentsRequired: string[];
    tags: string[];
    createdAt: string;
    updatedAt: string;
}
export interface Customer {
    id: string;
    accountNumber: string;
    fullName: string;
    nationalId: string;
    phone: string;
    alternatePhone?: string;
    email?: string;
    accountType: AccountType;
    status: CustomerStatus;
    zone: Zone;
    address: GeoCoordinates;
    plotNumber: string;
    meterId: string;
    registeredAt: string;
    lastPaymentDate?: string;
    totalOutstandingKES: number;
    preferredNotifChannel: NotifChannel;
    languagePreference: "en" | "sw";
    digitallyEnrolled: boolean;
}

export interface User {
    id: string;
    employeeId?: string;
    fullName: string;
    email: string;
    phone: string;
    role: UserRole;
    department: string;
    zone?: Zone;
    status: "active" | "inactive" | "suspended";
    permissions: string[];
    lastLogin?: string;
    createdAt: string;
    avatar?: string;
    mfaEnabled: boolean;
    linkedCustomerId?: string; // for customer role
}

export interface Meter {
    id: string;
    serialNumber: string;
    customerId: string;
    accountNumber: string;
    meterType: "mechanical" | "digital" | "smart_amr";
    installDate: string;
    lastReadDate: string;
    lastReadingM3: number;
    status: MeterStatus;
    zone: Zone;
    address: GeoCoordinates;
    manufacturer: string;
    modelNumber: string;
    calibrationDueDate: string;
    nominalFlowRateM3H: number;
}

export interface MeterReading {
    id: string;
    meterId: string;
    customerId: string;
    readingDate: string;
    consumptionM3: number;
    previousReadingM3: number;
    currentReadingM3: number;
    readingMethod: "manual" | "amr" | "customer_submitted";
    readBy?: string; // userId
    isEstimated: boolean;
    anomalyFlag: boolean;
    anomalyReason?: string;
    imagePath?: string;
}

export interface Bill {
    id: string;
    billNumber: string;
    customerId: string;
    accountNumber: string;
    meterId: string;
    billingPeriod: { from: string; to: string };
    issuedDate: string;
    dueDate: string;
    status: BillStatus;
    consumptionM3: number;
    tariffTier: "tier1" | "tier2" | "tier3" | "tier4";
    baseChargeKES: number;
    consumptionChargeKES: number;
    sewerageChargeKES: number;
    vatKES: number;
    penaltyKES: number;
    discountKES: number;
    totalAmountKES: number;
    paidAmountKES: number;
    balanceKES: number;
    previousBalanceKES: number;
    payments: string[]; // paymentIds
    generatedBy: string; // userId | "system"
    notes?: string;
}

export interface Payment {
    id: string;
    paymentReference: string;
    customerId: string;
    billId?: string;
    accountNumber: string;
    amount: number;
    method: PaymentMethod;
    status: PaymentStatus;
    transactionId: string; // gateway ref e.g. mpesa transaction code
    phoneNumber?: string;
    cardLast4?: string;
    bankRef?: string;
    initiatedAt: string;
    completedAt?: string;
    receiptNumber?: string;
    narration: string;
    processedBy: string; // userId | "system"
}

export interface ServiceRequest {
    id: string;
    requestNumber: string;
    serviceId: string;
    serviceCode: string;
    customerId: string;
    accountNumber: string;
    status: RequestStatus;
    priority: Priority;
    title: string;
    description: string;
    zone: Zone;
    address: GeoCoordinates;
    submittedAt: string;
    acknowledgedAt?: string;
    assignedAt?: string;
    resolvedAt?: string;
    closedAt?: string;
    assignedToUserId?: string;
    workOrderId?: string;
    documents: { name: string; url: string; uploadedAt: string }[];
    statusHistory: {
        status: RequestStatus;
        changedAt: string;
        changedBy: string;
        note: string;
    }[];
    customerFeedback?: {
        rating: 1 | 2 | 3 | 4 | 5;
        comment: string;
        submittedAt: string;
    };
    slaBreached: boolean;
    estimatedCompletionDate?: string;
}

export interface WorkOrder {
    id: string;
    workOrderNumber: string;
    requestId?: string;
    faultReportId?: string;
    title: string;
    description: string;
    type: "new_connection" | "disconnection" | "reconnection" | "meter_repair" | "pipe_repair" | "leak_fix" | "meter_reading" | "site_inspection" | "maintenance";
    status: WorkOrderStatus;
    priority: Priority;
    zone: Zone;
    address: GeoCoordinates;
    assignedTechnicianId: string;
    supervisorId: string;
    scheduledDate: string;
    scheduledTimeSlot: string;
    startedAt?: string;
    completedAt?: string;
    estimatedDurationHours: number;
    actualDurationHours?: number;
    materialsUsed: { item: string; quantity: number; unitCostKES: number }[];
    labourCostKES: number;
    totalCostKES: number;
    completionNotes?: string;
    completionPhotos: string[];
    customerSignatureObtained: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface FaultReport {
    id: string;
    faultCode: string;
    reportedByCustomerId?: string;
    reportedByUserId?: string;
    faultType: FaultType;
    description: string;
    zone: Zone;
    address: GeoCoordinates;
    severity: "minor" | "moderate" | "major" | "critical";
    status: "open" | "acknowledged" | "assigned" | "in_progress" | "resolved" | "closed";
    affectedCustomers: number;
    workOrderId?: string;
    reportedAt: string;
    acknowledgedAt?: string;
    resolvedAt?: string;
    resolutionSummary?: string;
    nrwImpactEstimateM3?: number;
    imagePaths: string[];
}

export interface ConsumptionAlert {
    id: string;
    customerId: string;
    meterId: string;
    alertType: "high_consumption" | "suspected_leak" | "zero_consumption" | "unusual_pattern" | "threshold_exceeded";
    detectedAt: string;
    consumptionM3: number;
    baselineM3: number;
    deviationPercent: number;
    acknowledged: boolean;
    acknowledgedBy?: string;
    acknowledgedAt?: string;
    workOrderId?: string;
    message: string;
}

export interface AnalyticsSummary {
    reportDate: string;
    zone: Zone | "all";
    totalCustomers: number;
    activeConnections: number;
    waterSuppliedM3: number;
    waterBilledM3: number;
    nrwM3: number;
    nrwPercent: number;
    revenueTargetKES: number;
    revenueCollectedKES: number;
    collectionRatePercent: number;
    openFaults: number;
    resolvedFaultsThisMonth: number;
    openServiceRequests: number;
    avgResolutionTimeHours: number;
    customerSatisfactionScore: number;
    digitalAdoptionPercent: number;
}
