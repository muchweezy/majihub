import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { LoadingOverlay } from "@/components/refine-ui/layout/loading-overlay";

const spinner = () => document.querySelector(".animate-spin");

describe("LoadingOverlay", () => {
  it("renders only the children when not loading", () => {
    render(
      <LoadingOverlay>
        <p>Bills</p>
      </LoadingOverlay>
    );

    expect(screen.getByText("Bills")).toBeInTheDocument();
    expect(spinner()).toBeNull();
  });

  it("overlays a spinner on top of the children while loading", () => {
    render(
      <LoadingOverlay loading>
        <p>Bills</p>
      </LoadingOverlay>
    );

    expect(screen.getByText("Bills")).toBeInTheDocument();
    expect(spinner()).not.toBeNull();
  });

  it("merges the class name onto the overlay and forwards the ref and props", () => {
    const ref = createRef<HTMLDivElement>();

    render(
      <LoadingOverlay
        loading
        ref={ref}
        className="bg-black/80"
        data-testid="overlay-root"
      >
        <p>Bills</p>
      </LoadingOverlay>
    );

    expect(ref.current).toBe(screen.getByTestId("overlay-root"));
    expect(spinner()?.parentElement?.parentElement).toHaveClass("bg-black/80");
  });
});
