import { afterEach, describe, expect, it, vi } from "vitest";
import {
  ALL_OPTIONS,
  ALLOWED_TYPES,
  BILLING_CYCLE_OPTIONS,
  COLLECTION_RATE_LABELS,
  DEPARTMENT_OPTIONS,
  DEPARTMENTS,
  LANGUAGE_OPTIONS,
  MAX_FILE_SIZE,
  NCWSC_DIVISION_OPTIONS,
  NCWSC_DIVISIONS,
  NRW_THRESHOLD_LABELS,
  NRW_THRESHOLDS,
  PIPE_MATERIAL_OPTIONS,
  REPORT_PERIOD_OPTIONS,
  SLA_HOUR_OPTIONS,
  SLA_HOURS,
  SYSTEM_HEALTH_STATUS_OPTIONS,
  TARIFF_TIER_OPTIONS,
  TARIFF_TIERS,
  ZONE_OPTIONS,
  ZONES,
  ZONES_BY_DEPARTMENT,
} from "@/constants";

type Option = { value: string | number; label: string };

const OPTION_LISTS: [string, readonly Option[]][] = Object.entries(
  ALL_OPTIONS
) as [string, readonly Option[]][];

describe("option lists", () => {
  it.each(OPTION_LISTS)("%s options are non-empty", (_name, options) => {
    expect(options.length).toBeGreaterThan(0);
  });

  it.each(OPTION_LISTS)(
    "%s options all have a value and a label",
    (_name, options) => {
      for (const option of options) {
        expect(option.value).not.toBe("");
        expect(option.value).toBeDefined();
        expect(option.label).toBeTruthy();
      }
    }
  );

  it.each(OPTION_LISTS)("%s option values are unique", (_name, options) => {
    const values = options.map((option) => option.value);
    expect(new Set(values).size).toBe(values.length);
  });

  it("keeps derived option lists in sync with their source lists", () => {
    expect(DEPARTMENT_OPTIONS).toHaveLength(DEPARTMENTS.length);
    expect(ZONE_OPTIONS).toHaveLength(ZONES.length);
    expect(TARIFF_TIER_OPTIONS).toHaveLength(TARIFF_TIERS.length);
    expect(NCWSC_DIVISION_OPTIONS).toHaveLength(NCWSC_DIVISIONS.length);
    expect(SLA_HOUR_OPTIONS).toHaveLength(SLA_HOURS.length);
  });
});

describe("option value slugs", () => {
  it("uses the department name as both value and label", () => {
    expect(DEPARTMENT_OPTIONS[0]).toEqual({
      value: DEPARTMENTS[0],
      label: DEPARTMENTS[0],
    });
  });

  it("uses the zone name as both value and label", () => {
    expect(ZONE_OPTIONS).toContainEqual({
      value: "Upper Hill",
      label: "Upper Hill",
    });
  });

  it("slugifies divisions, replacing ampersands", () => {
    expect(NCWSC_DIVISION_OPTIONS).toContainEqual({
      value: "finance_accounts",
      label: "Finance & Accounts",
    });
  });

  it("strips parentheses from pipe material values", () => {
    expect(PIPE_MATERIAL_OPTIONS).toContainEqual({
      value: "gi_galvanised_iron",
      label: "GI (Galvanised Iron)",
    });
  });

  it("maps report periods to underscore slugs", () => {
    expect(REPORT_PERIOD_OPTIONS).toContainEqual({
      value: "last_3_months",
      label: "Last 3 Months",
    });
  });

  it("normalises hyphenated billing cycles", () => {
    expect(BILLING_CYCLE_OPTIONS).toContainEqual({
      value: "bi_monthly",
      label: "Bi-Monthly",
    });
  });

  it("maps languages to ISO codes", () => {
    expect(LANGUAGE_OPTIONS).toEqual([
      { value: "en", label: "English" },
      { value: "sw", label: "Kiswahili" },
    ]);
  });

  it("slugifies system health statuses", () => {
    expect(SYSTEM_HEALTH_STATUS_OPTIONS).toContainEqual({
      value: "degraded_performance",
      label: "Degraded Performance",
    });
  });
});

describe("SLA_HOUR_OPTIONS labels", () => {
  it("labels sub-day values in hours and pluralises them", () => {
    expect(SLA_HOUR_OPTIONS[0]).toEqual({ value: 1, label: "1 hour" });
    expect(SLA_HOUR_OPTIONS).toContainEqual({ value: 12, label: "12 hours" });
  });

  it("labels full days in days and pluralises them", () => {
    expect(SLA_HOUR_OPTIONS).toContainEqual({ value: 24, label: "1 day" });
    expect(SLA_HOUR_OPTIONS).toContainEqual({ value: 168, label: "7 days" });
  });
});

describe("ZONES_BY_DEPARTMENT", () => {
  it("only maps known departments", () => {
    for (const department of Object.keys(ZONES_BY_DEPARTMENT)) {
      expect(DEPARTMENTS).toContain(department);
    }
  });

  it("only maps zones that exist in the master zone list", () => {
    for (const zones of Object.values(ZONES_BY_DEPARTMENT)) {
      expect(zones.length).toBeGreaterThan(0);
      for (const zone of zones) {
        expect(ZONES).toContain(zone);
      }
    }
  });
});

describe("threshold tables", () => {
  it("orders NRW thresholds from best to worst", () => {
    expect(NRW_THRESHOLDS.excellent).toBeLessThan(NRW_THRESHOLDS.good);
    expect(NRW_THRESHOLDS.good).toBeLessThan(NRW_THRESHOLDS.warning);
    expect(NRW_THRESHOLDS.warning).toBeLessThan(NRW_THRESHOLDS.critical);
  });

  it("orders NRW threshold labels by ascending bound and ends at Infinity", () => {
    const maxes = NRW_THRESHOLD_LABELS.map((entry) => entry.max);
    expect(maxes).toEqual([...maxes].sort((a, b) => a - b));
    expect(maxes.at(-1)).toBe(Infinity);
  });

  it("orders collection rate labels by descending bound down to zero", () => {
    const mins = COLLECTION_RATE_LABELS.map((entry) => entry.min);
    expect(mins).toEqual([...mins].sort((a, b) => b - a));
    expect(mins.at(-1)).toBe(0);
  });
});

describe("upload constraints", () => {
  it("caps uploads at 3MB", () => {
    expect(MAX_FILE_SIZE).toBe(3 * 1024 * 1024);
  });

  it("allows only image mime types", () => {
    expect(ALLOWED_TYPES.every((type) => type.startsWith("image/"))).toBe(true);
  });
});

describe("environment configuration", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it("reads the backend base url from the environment", async () => {
    vi.stubEnv("VITE_BACKEND_BASE_URL", "https://api.example.test/v1");
    vi.resetModules();

    const constants = await import("@/constants");

    expect(constants.BACKEND_BASE_URL).toBe("https://api.example.test/v1");
  });

  it("throws when the backend base url is missing", async () => {
    vi.stubEnv("VITE_BACKEND_BASE_URL", "");
    vi.resetModules();

    await expect(import("@/constants")).rejects.toThrow(
      "Missing environment variable: VITE_BACKEND_BASE_URL"
    );
  });
});
