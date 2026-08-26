import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ThemeToggle } from "@/components/refine-ui/theme/theme-toggle";

const setTheme = vi.fn();
const useTheme = vi.fn();

vi.mock("@/components/refine-ui/theme/theme-provider", () => ({
  useTheme: () => useTheme(),
}));

const renderToggle = (theme: string, className?: string) => {
  useTheme.mockReturnValue({ theme, setTheme });
  return render(<ThemeToggle className={className} />);
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe("ThemeToggle", () => {
  it.each([
    ["light", "dark"],
    ["dark", "system"],
    ["system", "light"],
  ])("cycles %s to %s", (current, next) => {
    renderToggle(current);

    fireEvent.click(screen.getByRole("button"));

    expect(setTheme).toHaveBeenCalledWith(next);
  });

  it("falls back to the light theme for an unknown current theme", () => {
    renderToggle("sepia");

    fireEvent.click(screen.getByRole("button"));

    expect(setTheme).toHaveBeenCalledWith("light");
  });

  it("labels the control for screen readers", () => {
    renderToggle("light");

    expect(
      screen.getByText("Toggle theme (Light → Dark → System)")
    ).toBeInTheDocument();
  });

  it("merges the provided class name onto the button", () => {
    renderToggle("light", "ml-4");

    expect(screen.getByRole("button")).toHaveClass("ml-4");
  });
});
