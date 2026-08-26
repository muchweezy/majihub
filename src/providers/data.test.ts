import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { dataProvider } from "@/providers/data";

type FetchMock = ReturnType<typeof vi.fn>;

const jsonResponse = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

const lastRequestUrl = (fetchMock: FetchMock): URL => {
  const [input] = fetchMock.mock.calls[fetchMock.mock.calls.length - 1];
  const url = input instanceof Request ? input.url : String(input);
  return new URL(url);
};

const queryParams = (fetchMock: FetchMock): Record<string, string> =>
  Object.fromEntries(lastRequestUrl(fetchMock).searchParams.entries());

type CapturedRequest = { method: string; body: string };

let fetchMock: FetchMock;
let requests: CapturedRequest[];
let response: Response;

const respondWith = (body: unknown, status = 200) => {
  response = jsonResponse(body, status);
};

beforeEach(() => {
  requests = [];
  response = jsonResponse({ data: [] });
  fetchMock = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
    const request = input instanceof Request ? input : undefined;
    requests.push({
      method: request?.method ?? init?.method ?? "GET",
      body: request ? await request.text() : String(init?.body ?? ""),
    });
    return response.clone();
  });
  vi.stubGlobal("fetch", fetchMock);
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("dataProvider.getList", () => {
  it("requests the resource collection endpoint", async () => {
    await dataProvider.getList({ resource: "customers" });

    expect(lastRequestUrl(fetchMock).pathname).toContain("/customers");
  });

  it("defaults pagination to the first page of ten items", async () => {
    await dataProvider.getList({ resource: "bills" });

    expect(queryParams(fetchMock)).toMatchObject({ page: "1", limit: "10" });
  });

  it("forwards the requested page and page size", async () => {
    await dataProvider.getList({
      resource: "bills",
      pagination: { currentPage: 3, pageSize: 25 },
    });

    expect(queryParams(fetchMock)).toMatchObject({ page: "3", limit: "25" });
  });

  it("omits pagination params when pagination is off", async () => {
    await dataProvider.getList({
      resource: "bills",
      pagination: { mode: "off" },
    });

    const params = queryParams(fetchMock);
    expect(params.page).toBeUndefined();
    expect(params.limit).toBeUndefined();
  });

  it("maps the role filter for any resource", async () => {
    await dataProvider.getList({
      resource: "anything",
      filters: [{ field: "role", operator: "eq", value: "technician" }],
    });

    expect(queryParams(fetchMock).role).toBe("technician");
  });

  it.each(["search", "name", "account_no"])(
    "maps the customers %s filter onto search",
    async (field) => {
      await dataProvider.getList({
        resource: "customers",
        filters: [{ field, operator: "contains", value: "Wanjiku" }],
      });

      expect(queryParams(fetchMock).search).toBe("Wanjiku");
    }
  );

  it("maps customer account type, zone and status filters", async () => {
    await dataProvider.getList({
      resource: "customers",
      filters: [
        { field: "account_type", operator: "eq", value: "COMMERCIAL" },
        { field: "zone", operator: "eq", value: "Central" },
        { field: "status", operator: "eq", value: "active" },
      ],
    });

    expect(queryParams(fetchMock)).toMatchObject({
      account_type: "COMMERCIAL",
      zone: "Central",
      status: "active",
    });
  });

  it("maps bill filters", async () => {
    await dataProvider.getList({
      resource: "bills",
      filters: [
        { field: "status", operator: "eq", value: "overdue" },
        { field: "customer_id", operator: "eq", value: "cust-1" },
        { field: "bill_month", operator: "eq", value: "2025-07" },
      ],
    });

    expect(queryParams(fetchMock)).toMatchObject({
      status: "overdue",
      customer_id: "cust-1",
      bill_month: "2025-07",
    });
  });

  it("maps payment filters", async () => {
    await dataProvider.getList({
      resource: "payments",
      filters: [
        { field: "method", operator: "eq", value: "mpesa" },
        { field: "status", operator: "eq", value: "success" },
        { field: "bill_id", operator: "eq", value: "bill-9" },
      ],
    });

    expect(queryParams(fetchMock)).toMatchObject({
      method: "mpesa",
      status: "success",
      bill_id: "bill-9",
    });
  });

  it.each(["search", "serial_no", "meter_no"])(
    "maps the meters %s filter onto search",
    async (field) => {
      await dataProvider.getList({
        resource: "meters",
        filters: [{ field, operator: "contains", value: "MTR-42" }],
      });

      expect(queryParams(fetchMock).search).toBe("MTR-42");
    }
  );

  it("maps service request filters", async () => {
    await dataProvider.getList({
      resource: "requests",
      filters: [
        { field: "type", operator: "eq", value: "new_connection" },
        { field: "status", operator: "eq", value: "in_progress" },
        { field: "zone", operator: "eq", value: "South" },
        { field: "technician_id", operator: "eq", value: "tech-7" },
      ],
    });

    expect(queryParams(fetchMock)).toMatchObject({
      type: "new_connection",
      status: "in_progress",
      zone: "South",
      technician_id: "tech-7",
    });
  });

  it.each(["search", "name", "email"])(
    "maps the admin users %s filter onto search",
    async (field) => {
      await dataProvider.getList({
        resource: "admin/users",
        filters: [{ field, operator: "contains", value: "otieno" }],
      });

      expect(queryParams(fetchMock).search).toBe("otieno");
    }
  );

  it.each(["name", "code"])(
    "maps the service %s filter onto search",
    async (field) => {
      await dataProvider.getList({
        resource: "service",
        filters: [{ field, operator: "contains", value: "connection" }],
      });

      expect(queryParams(fetchMock).search).toBe("connection");
    }
  );

  it("maps the service department filter", async () => {
    await dataProvider.getList({
      resource: "service",
      filters: [{ field: "department", operator: "eq", value: "Westlands" }],
    });

    expect(queryParams(fetchMock).department).toBe("Westlands");
  });

  it.each(["analytics", "reports"])(
    "maps date range and zone filters for %s",
    async (resource) => {
      await dataProvider.getList({
        resource,
        filters: [
          { field: "start_date", operator: "gte", value: "2025-01-01" },
          { field: "end_date", operator: "lte", value: "2025-01-31" },
          { field: "zone", operator: "eq", value: "North" },
        ],
      });

      expect(queryParams(fetchMock)).toMatchObject({
        start_date: "2025-01-01",
        end_date: "2025-01-31",
        zone: "North",
      });
    }
  );

  it("ignores filters that do not belong to the resource", async () => {
    await dataProvider.getList({
      resource: "bills",
      filters: [{ field: "serial_no", operator: "eq", value: "MTR-1" }],
    });

    const params = queryParams(fetchMock);
    expect(params.search).toBeUndefined();
    expect(params.serial_no).toBeUndefined();
  });

  it("stringifies non-string filter values", async () => {
    await dataProvider.getList({
      resource: "payments",
      filters: [{ field: "bill_id", operator: "eq", value: 42 }],
    });

    expect(queryParams(fetchMock).bill_id).toBe("42");
  });

  it("returns the payload data and the reported total", async () => {
    respondWith({
      data: [{ id: "svc-1" }, { id: "svc-2" }],
      pagination: { page: 1, limit: 10, total: 57, totalPages: 6 },
    });

    const result = await dataProvider.getList({ resource: "service" });

    expect(result.data).toEqual([{ id: "svc-1" }, { id: "svc-2" }]);
    expect(result.total).toBe(57);
  });

  it("falls back to the item count when pagination metadata is missing", async () => {
    respondWith({ data: [{ id: "svc-1" }, { id: "svc-2" }] });

    const result = await dataProvider.getList({ resource: "service" });

    expect(result.total).toBe(2);
  });

  it("returns an empty list and a zero total for an empty payload", async () => {
    respondWith({});

    const result = await dataProvider.getList({ resource: "service" });

    expect(result.data).toEqual([]);
    expect(result.total).toBe(0);
  });
});

describe("dataProvider.create", () => {
  it("posts the variables to the resource endpoint and returns the created record", async () => {
    respondWith({ data: { id: "svc-9", name: "Meter Repair" } }, 201);

    const result = await dataProvider.create({
      resource: "service",
      variables: { name: "Meter Repair" },
    });

    expect(lastRequestUrl(fetchMock).pathname).toContain("/service");
    expect(requests[0].method).toBe("POST");
    expect(JSON.parse(requests[0].body)).toEqual({ name: "Meter Repair" });
    expect(result.data).toEqual({ id: "svc-9", name: "Meter Repair" });
  });

  it("returns an empty object when the response carries no data", async () => {
    respondWith({}, 201);

    const result = await dataProvider.create({
      resource: "service",
      variables: {},
    });

    expect(result.data).toEqual({});
  });
});

describe("dataProvider.getOne", () => {
  it("requests the nested record endpoint and returns the record", async () => {
    respondWith({ data: { id: "svc-3" } });

    const result = await dataProvider.getOne({
      resource: "service",
      id: "svc-3",
    });

    expect(lastRequestUrl(fetchMock).pathname).toContain("/service/svc-3");
    expect(result.data).toEqual({ id: "svc-3" });
  });

  it("returns an empty object when the record is missing from the payload", async () => {
    respondWith({});

    const result = await dataProvider.getOne({ resource: "service", id: 1 });

    expect(result.data).toEqual({});
  });
});

describe("dataProvider.getApiUrl", () => {
  it("exposes the configured backend base url", () => {
    expect(dataProvider.getApiUrl()).toBe("https://api.majihub.test/v1");
  });
});
