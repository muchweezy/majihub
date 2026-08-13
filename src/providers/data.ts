import { createDataProvider, CreateDataProviderOptions } from "@refinedev/rest";
import { CreateResponse, GetOneResponse, ListResponse } from "@/types";
import { BACKEND_BASE_URL } from "@/constants";


if (!BACKEND_BASE_URL) {
    throw new Error("BACKEND_BASE_URL is not configured. Set up VITE_BACKEND_BASE_URL in the .env");
}
// Maji Hub API is versioned: https://api.majihub.co.ke/v1
const options: CreateDataProviderOptions = {
    getList: {
        getEndpoint: ({ resource }) => resource,
        buildQueryParams: async ({ resource, pagination, filters }) => {
            const params: Record<string, string | number> = {};

            if (pagination?.mode !== "off") {
                const page = pagination?.currentPage ?? 1;
                const pageSize = pagination?.pageSize ?? 10;
                params.page = page;
                params.limit = pageSize;
            }

            filters?.forEach((filter) => {
                const field = "field" in filter ? filter.field : "";
                const value = String(filter.value);

                // Global role filter (admin users, technicians, billing staff, etc.)
                if (field === "role") {
                    params.role = value;
                }

                // Customers: residential / commercial accounts
                if (resource === "customers") {
                    if (field === "search" || field === "name" || field === "account_no") {
                        params.search = value;
                    }
                    if (field === "account_type") params.account_type = value; // RESIDENTIAL | COMMERCIAL
                    if (field === "zone") params.zone = value; // North | Central | South
                    if (field === "status") params.status = value; // active | disconnected
                }

                // Bills: filter by status, billing month, customer
                if (resource === "bills") {
                    if (field === "status") params.status = value; // paid | pending | overdue
                    if (field === "customer_id") params.customer_id = value;
                    if (field === "bill_month") params.bill_month = value;
                }

                // Payments: filter by method, status, date range
                if (resource === "payments") {
                    if (field === "method") params.method = value; // mpesa | card | bank_transfer
                    if (field === "status") params.status = value;
                    if (field === "bill_id") params.bill_id = value;
                }

                // Meters: filter by customer, status, serial number
                if (resource === "meters") {
                    if (field === "search" || field === "serial_no" || field === "meter_no") {
                        params.search = value;
                    }
                    if (field === "customer_id") params.customer_id = value;
                    if (field === "status") params.status = value; // active | faulty | replaced
                }

                // Service Requests: new connections, faults, reconnections
                if (resource === "requests") {
                    if (field === "type") params.type = value; // new_connection | fault | reconnection | meter_repair
                    if (field === "status") params.status = value; // pending | assigned | in_progress | completed
                    if (field === "zone") params.zone = value;
                    if (field === "technician_id") params.technician_id = value;
                }

                // Admin - Users (staff accounts: billing, field techs, admins)
                if (resource === "admin/users") {
                    if (field === "search" || field === "name" || field === "email") {
                        params.search = value;
                    }
                    if (field === "role") params.role = value; // admin | technician | billing_staff | manager
                }
                if (resource === "service") {
                    if (field === "department") params.department = value;
                    if (field === "name" || field === "code") params.search = value;
                }

                // Analytics/reports: date range filters
                if (resource === "analytics" || resource === "reports") {
                    if (field === "start_date") params.start_date = value;
                    if (field === "end_date") params.end_date = value;
                    if (field === "zone") params.zone = value;
                }
            });

            return params;
        },
        mapResponse: async (response) => {
            const payload: ListResponse = await response.clone().json();
            return payload.data ?? [];
        },
        getTotalCount: async (response) => {
            const payload: ListResponse = await response.clone().json();
            return payload.pagination?.total ?? payload.data?.length ?? 0;
        },
    },

    create: {
        getEndpoint: ({ resource }) => resource,
        buildBodyParams: async ({ variables }) => variables,
        mapResponse: async (response) => {
            const json: CreateResponse = await response.json();
            return json.data ?? {};
        },
    },

    getOne: {
        getEndpoint: ({ resource, id }) => `${resource}/${id}`,
        mapResponse: async (response) => {
            const json: GetOneResponse = await response.json();
            return json.data ?? {};
        },
    },
};

const { dataProvider } = createDataProvider(BACKEND_BASE_URL, options);

export { dataProvider };