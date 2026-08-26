import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { UndoableNotification } from "@/components/refine-ui/notification/undoable-notification";

vi.mock("@refinedev/core", () => ({
  useTranslate: () => (_key: string, fallback: string) => fallback,
}));

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

const renderNotification = (
  props: Partial<Parameters<typeof UndoableNotification>[0]> = {}
) => {
  return render(<UndoableNotification message="Deleting service" {...props} />);
};

describe("UndoableNotification", () => {
  it("renders the message and an undo action", () => {
    renderNotification();

    expect(screen.getByText("Deleting service")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Undo" })).toBeInTheDocument();
  });

  it("renders the description only when provided", () => {
    const { unmount } = renderNotification({ description: "3 seconds left" });
    expect(screen.getByText("3 seconds left")).toBeInTheDocument();
    unmount();

    renderNotification();
    expect(screen.queryByText("3 seconds left")).not.toBeInTheDocument();
  });

  it("cancels the mutation and closes when undo is clicked", () => {
    const cancelMutation = vi.fn();
    const onClose = vi.fn();
    renderNotification({ cancelMutation, onClose });

    fireEvent.click(screen.getByRole("button", { name: "Undo" }));

    expect(cancelMutation).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("closes itself after the undoable timeout elapses", () => {
    const onClose = vi.fn();
    renderNotification({ onClose, undoableTimeout: 3 });

    vi.advanceTimersByTime(2999);
    expect(onClose).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("defaults the undoable timeout to five seconds", () => {
    const onClose = vi.fn();
    renderNotification({ onClose });

    vi.advanceTimersByTime(5000);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does not close after unmount", () => {
    const onClose = vi.fn();
    const { unmount } = renderNotification({ onClose, undoableTimeout: 3 });

    unmount();
    vi.advanceTimersByTime(5000);

    expect(onClose).not.toHaveBeenCalled();
  });
});
