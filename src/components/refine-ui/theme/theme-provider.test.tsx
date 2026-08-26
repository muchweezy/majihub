import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  ThemeProvider,
  useTheme,
} from "@/components/refine-ui/theme/theme-provider";

const STORAGE_KEY = "refine-ui-theme";

function ThemeConsumer() {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button onClick={() => setTheme("dark")}>dark</button>
      <button onClick={() => setTheme("light")}>light</button>
      <button onClick={() => setTheme("system")}>system</button>
    </div>
  );
}

const stubPrefersDark = (matches: boolean) => {
  vi.stubGlobal(
    "matchMedia",
    vi.fn((query: string) => ({
      matches,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }))
  );
};

beforeEach(() => {
  localStorage.clear();
  document.documentElement.classList.remove("light", "dark");
  stubPrefersDark(false);
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("ThemeProvider", () => {
  it("defaults to the system theme", () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );

    expect(screen.getByTestId("theme")).toHaveTextContent("system");
  });

  it("honours an explicit default theme", () => {
    render(
      <ThemeProvider defaultTheme="dark">
        <ThemeConsumer />
      </ThemeProvider>
    );

    expect(screen.getByTestId("theme")).toHaveTextContent("dark");
    expect(document.documentElement).toHaveClass("dark");
  });

  it("restores the persisted theme over the default", () => {
    localStorage.setItem(STORAGE_KEY, "light");

    render(
      <ThemeProvider defaultTheme="dark">
        <ThemeConsumer />
      </ThemeProvider>
    );

    expect(screen.getByTestId("theme")).toHaveTextContent("light");
    expect(document.documentElement).toHaveClass("light");
  });

  it("reads and writes the persisted theme under a custom storage key", async () => {
    localStorage.setItem("custom-theme", "dark");

    render(
      <ThemeProvider storageKey="custom-theme">
        <ThemeConsumer />
      </ThemeProvider>
    );
    expect(screen.getByTestId("theme")).toHaveTextContent("dark");

    await userEvent.click(screen.getByRole("button", { name: "light" }));

    expect(localStorage.getItem("custom-theme")).toBe("light");
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
  });

  it("persists the theme and swaps the document class on change", async () => {
    render(
      <ThemeProvider defaultTheme="light">
        <ThemeConsumer />
      </ThemeProvider>
    );

    await userEvent.click(screen.getByRole("button", { name: "dark" }));

    expect(screen.getByTestId("theme")).toHaveTextContent("dark");
    expect(localStorage.getItem(STORAGE_KEY)).toBe("dark");
    expect(document.documentElement).toHaveClass("dark");
    expect(document.documentElement).not.toHaveClass("light");
  });

  it("resolves the system theme from the OS colour scheme", async () => {
    stubPrefersDark(true);

    render(
      <ThemeProvider defaultTheme="light">
        <ThemeConsumer />
      </ThemeProvider>
    );
    expect(document.documentElement).toHaveClass("light");

    await userEvent.click(screen.getByRole("button", { name: "system" }));

    expect(document.documentElement).toHaveClass("dark");
    expect(document.documentElement).not.toHaveClass("light");
  });
});

describe("useTheme", () => {
  it("falls back to a no-op context outside of a provider", () => {
    render(<ThemeConsumer />);

    expect(screen.getByTestId("theme")).toHaveTextContent("system");
  });
});
