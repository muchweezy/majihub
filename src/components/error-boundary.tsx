import { Component, type ErrorInfo, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  error: Error | null;
};

/**
 * Catches render-time errors so that a failing screen shows an actionable
 * message instead of an empty page.
 */
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Unhandled render error", error, errorInfo.componentStack);
  }

  render() {
    const { error } = this.state;

    if (!error) return this.props.children;

    return (
      <div
        role="alert"
        className={cn(
          "flex",
          "flex-col",
          "items-center",
          "justify-center",
          "gap-4",
          "min-h-svh",
          "p-6",
          "text-center"
        )}
      >
        <h1 className={cn("text-2xl", "font-semibold", "text-foreground")}>
          Something went wrong
        </h1>
        <p
          className={cn(
            "text-sm",
            "text-muted-foreground",
            "max-w-xl",
            "break-words"
          )}
        >
          {error.message || "An unexpected error occurred."}
        </p>
        <div className={cn("flex", "gap-2")}>
          <Button onClick={() => this.setState({ error: null })}>
            Try again
          </Button>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Reload page
          </Button>
        </div>
      </div>
    );
  }
}
