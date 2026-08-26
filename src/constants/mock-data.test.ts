import { describe, expect, it } from "vitest";
import { SERVICE_MODULE_OPTIONS, SERVICE_STATUSES } from "@/constants";
import { MOCK_SERVICES } from "@/constants/mock-data";

const KNOWN_MODULES = new Set(
  SERVICE_MODULE_OPTIONS.map((option) => option.label)
);

const KNOWN_STATUSES = new Set(
  SERVICE_STATUSES.map((status) => status.toLowerCase())
);

describe("MOCK_SERVICES", () => {
  it("is not empty", () => {
    expect(MOCK_SERVICES.length).toBeGreaterThan(0);
  });

  it("uses unique ids and service codes", () => {
    const ids = MOCK_SERVICES.map((service) => service.id);
    const codes = MOCK_SERVICES.map((service) => service.serviceCode);

    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(codes).size).toBe(codes.length);
  });

  it("fills in the required display fields", () => {
    for (const service of MOCK_SERVICES) {
      expect(service.name).toBeTruthy();
      expect(service.nameSwahili).toBeTruthy();
      expect(service.description).toBeTruthy();
      expect(service.icon).toBeTruthy();
    }
  });

  it("references known modules and service statuses", () => {
    for (const service of MOCK_SERVICES) {
      expect(KNOWN_MODULES).toContain(service.module);
      expect(KNOWN_STATUSES).toContain(service.status);
    }
  });

  it("names a department for every service", () => {
    for (const service of MOCK_SERVICES) {
      expect(service.department).toBeTruthy();
    }
  });

  it("uses non-negative application fees", () => {
    for (const service of MOCK_SERVICES) {
      expect(service.applicationFeeKES).toBeGreaterThanOrEqual(0);
    }
  });

  it("acknowledges before it resolves in every SLA", () => {
    for (const service of MOCK_SERVICES) {
      expect(service.sla.acknowledgementHours).toBeGreaterThan(0);
      expect(service.sla.escalationHours).toBeGreaterThan(0);
      expect(service.sla.resolutionHours).toBeGreaterThan(
        service.sla.acknowledgementHours
      );
    }
  });

  it("tags every service and lists documents for paid services", () => {
    for (const service of MOCK_SERVICES) {
      expect(service.tags.length).toBeGreaterThan(0);
      if (service.applicationFeeKES > 0) {
        expect(service.documentsRequired.length).toBeGreaterThan(0);
      }
    }
  });

  it("uses parseable ISO timestamps that never update before creation", () => {
    for (const service of MOCK_SERVICES) {
      const createdAt = new Date(service.createdAt);
      const updatedAt = new Date(service.updatedAt);

      expect(Number.isNaN(createdAt.getTime())).toBe(false);
      expect(Number.isNaN(updatedAt.getTime())).toBe(false);
      expect(updatedAt.getTime()).toBeGreaterThanOrEqual(createdAt.getTime());
    }
  });
});
