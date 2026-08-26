import { renderHook } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useNotificationProvider } from "@/components/refine-ui/notification/use-notification-provider";

const toast = vi.hoisted(() => {
  const fn = vi.fn();
  return Object.assign(fn, {
    success: vi.fn(),
    error: vi.fn(),
    dismiss: vi.fn(),
  });
});

vi.mock("sonner", () => ({ toast }));

const renderProvider = () => renderHook(() => useNotificationProvider()).result.current;

beforeEach(() => {
  vi.clearAllMocks();
});

describe("useNotificationProvider open", () => {
  it("shows a success toast keyed by the notification key", () => {
    renderProvider().open({
      key: "created",
      type: "success",
      message: "Service created",
      description: "It is live",
    });

    expect(toast.success).toHaveBeenCalledWith("Service created", {
      id: "created",
      description: "It is live",
      richColors: true,
    });
    expect(toast.error).not.toHaveBeenCalled();
  });

  it("shows an error toast", () => {
    renderProvider().open({
      key: "failed",
      type: "error",
      message: "Request failed",
      description: "500",
    });

    expect(toast.error).toHaveBeenCalledWith("Request failed", {
      id: "failed",
      description: "500",
      richColors: true,
    });
  });

  it("renders an undoable toast for progress notifications", () => {
    renderProvider().open({
      key: "deleting",
      type: "progress",
      message: "Deleting service",
      undoableTimeout: 7,
      cancelMutation: vi.fn(),
    });

    const [content, options] = toast.mock.calls[0] as [
      () => ReactNode,
      { id: string; duration: number; unstyled: boolean }
    ];
    expect(options).toMatchObject({
      id: "deleting",
      duration: 7000,
      unstyled: true,
    });
    expect(typeof content).toBe("function");
  });

  it("defaults the progress toast duration to five seconds", () => {
    renderProvider().open({
      key: "deleting",
      type: "progress",
      message: "Deleting service",
    });

    expect(toast.mock.calls[0][1]).toMatchObject({ duration: 5000 });
  });

  it("falls back to a generated id when no key is given for a progress toast", () => {
    vi.spyOn(Date, "now").mockReturnValue(1_700_000_000_000);

    renderProvider().open({
      type: "progress",
      message: "Deleting service",
    });

    expect(toast.mock.calls[0][1]).toMatchObject({ id: 1_700_000_000_000 });
  });

  it("dismisses the progress toast from the rendered notification", () => {
    renderProvider().open({
      key: "deleting",
      type: "progress",
      message: "Deleting service",
    });

    const content = toast.mock.calls[0][0] as () => {
      props: { onClose: () => void };
    };
    content().props.onClose();

    expect(toast.dismiss).toHaveBeenCalledWith("deleting");
  });

  it("ignores unknown notification types", () => {
    renderProvider().open({
      key: "unknown",
      type: "info" as never,
      message: "Nothing to see",
    });

    expect(toast).not.toHaveBeenCalled();
    expect(toast.success).not.toHaveBeenCalled();
    expect(toast.error).not.toHaveBeenCalled();
  });
});

describe("useNotificationProvider close", () => {
  it("dismisses the toast with the given id", () => {
    renderProvider().close?.("created");

    expect(toast.dismiss).toHaveBeenCalledWith("created");
  });
});
