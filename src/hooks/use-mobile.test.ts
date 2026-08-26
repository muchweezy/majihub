import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useIsMobile } from "@/hooks/use-mobile";

const MOBILE_BREAKPOINT = 768;

let listeners: Array<() => void>;
let removeEventListener: ReturnType<typeof vi.fn>;
let matchMedia: ReturnType<typeof vi.fn>;

const setWidth = (width: number) => {
  window.innerWidth = width;
};

const fireChange = () => {
  act(() => {
    for (const listener of listeners) {
      listener();
    }
  });
};

beforeEach(() => {
  listeners = [];
  removeEventListener = vi.fn();
  matchMedia = vi.fn((query: string) => ({
    matches: window.innerWidth < MOBILE_BREAKPOINT,
    media: query,
    addEventListener: (_event: string, listener: () => void) => {
      listeners.push(listener);
    },
    removeEventListener,
  }));
  vi.stubGlobal("matchMedia", matchMedia);
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("useIsMobile", () => {
  it("subscribes to a media query built from the mobile breakpoint", () => {
    setWidth(1280);
    renderHook(() => useIsMobile());

    expect(matchMedia).toHaveBeenCalledWith("(max-width: 767px)");
  });

  it("reports false for viewports at or above the breakpoint", () => {
    setWidth(MOBILE_BREAKPOINT);
    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(false);
  });

  it("reports true for viewports below the breakpoint", () => {
    setWidth(MOBILE_BREAKPOINT - 1);
    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(true);
  });

  it("updates when the media query reports a change", () => {
    setWidth(1280);
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);

    setWidth(375);
    fireChange();

    expect(result.current).toBe(true);
  });

  it("unsubscribes on unmount", () => {
    setWidth(1280);
    const { unmount } = renderHook(() => useIsMobile());

    unmount();

    expect(removeEventListener).toHaveBeenCalledWith(
      "change",
      expect.any(Function)
    );
  });
});
