import { describe, expect, it } from "vitest";
import { cn } from "@/lib/utils";

describe("cn", () => {
  it("joins truthy class names", () => {
    expect(cn("px-2", "py-1")).toBe("px-2 py-1");
  });

  it("ignores falsy values", () => {
    expect(cn("px-2", undefined, null, false, "")).toBe("px-2");
  });

  it("supports conditional object and array syntax", () => {
    expect(cn(["flex", { "gap-2": false, "gap-4": true }])).toBe("flex gap-4");
  });

  it("lets later tailwind classes win over conflicting earlier ones", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
    expect(cn("text-sm text-muted-foreground", "text-lg")).toBe(
      "text-muted-foreground text-lg"
    );
  });

  it("keeps non-conflicting tailwind classes", () => {
    expect(cn("px-2", "text-sm")).toBe("px-2 text-sm");
  });

  it("returns an empty string with no input", () => {
    expect(cn()).toBe("");
  });
});
