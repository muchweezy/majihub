/**
 * Declarative mapping of Refine filter fields to Maji Hub API query params.
 *
 * `params` maps a filter field onto the query param it sets, and `searchFields`
 * lists the fields that all collapse onto the generic `search` param.
 */
export type ResourceFilterConfig = {
    params?: Record<string, string>;
    searchFields?: readonly string[];
};

/** Applies to every resource. */
export const GLOBAL_FILTER_PARAMS: Record<string, string> = {
    // Global role filter (admin users, technicians, billing staff, etc.)
    role: "role",
};

export const RESOURCE_FILTER_CONFIG: Record<string, ResourceFilterConfig> = {
    // Customers: residential / commercial accounts
    customers: {
        searchFields: ["search", "name", "account_no"],
        params: {
            account_type: "account_type", // RESIDENTIAL | COMMERCIAL
            zone: "zone", // North | Central | South
            status: "status", // active | disconnected
        },
    },

    // Bills: filter by status, billing month, customer
    bills: {
        params: {
            status: "status", // paid | pending | overdue
            customer_id: "customer_id",
            bill_month: "bill_month",
        },
    },

    // Payments: filter by method, status, date range
    payments: {
        params: {
            method: "method", // mpesa | card | bank_transfer
            status: "status",
            bill_id: "bill_id",
        },
    },

    // Meters: filter by customer, status, serial number
    meters: {
        searchFields: ["search", "serial_no", "meter_no"],
        params: {
            customer_id: "customer_id",
            status: "status", // active | faulty | replaced
        },
    },

    // Service Requests: new connections, faults, reconnections
    requests: {
        params: {
            type: "type", // new_connection | fault | reconnection | meter_repair
            status: "status", // pending | assigned | in_progress | completed
            zone: "zone",
            technician_id: "technician_id",
        },
    },

    // Admin - Users (staff accounts: billing, field techs, admins)
    "admin/users": {
        searchFields: ["search", "name", "email"],
        params: {
            role: "role", // admin | technician | billing_staff | manager
        },
    },

    service: {
        searchFields: ["name", "code"],
        params: {
            department: "department",
        },
    },

    // Analytics/reports: date range filters
    analytics: {
        params: {
            start_date: "start_date",
            end_date: "end_date",
            zone: "zone",
        },
    },
    reports: {
        params: {
            start_date: "start_date",
            end_date: "end_date",
            zone: "zone",
        },
    },
};
