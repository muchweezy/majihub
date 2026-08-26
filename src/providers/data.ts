import { createDataProvider, CreateDataProviderOptions } from "@refinedev/rest";
import { ListResponse } from "@/types";
import { BACKEND_BASE_URL } from "@/constants";
import {
    GLOBAL_FILTER_PARAMS,
    RESOURCE_FILTER_CONFIG,
} from "@/providers/filter-params";


if (!BACKEND_BASE_URL) {
    throw new Error("BACKEND_BASE_URL is not configured. Set up VITE_BACKEND_BASE_URL in the .env");
}

/** Maji Hub wraps every payload in `{ data }`. */
const unwrapData = async (response: Response) => {
    const payload: { data?: Record<string, unknown> } = await response.json();
    return payload.data ?? {};
};
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

            const config = RESOURCE_FILTER_CONFIG[resource] ?? {};

            filters?.forEach((filter) => {
                const field = "field" in filter ? filter.field : "";
                const value = String(filter.value);

                const globalParam = GLOBAL_FILTER_PARAMS[field];
                if (globalParam) params[globalParam] = value;

                if (config.searchFields?.includes(field)) {
                    params.search = value;
                }

                const param = config.params?.[field];
                if (param) params[param] = value;
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
        mapResponse: unwrapData,
    },

    getOne: {
        getEndpoint: ({ resource, id }) => `${resource}/${id}`,
        mapResponse: unwrapData,
    },
};

const { dataProvider } = createDataProvider(BACKEND_BASE_URL, options);

export { dataProvider };