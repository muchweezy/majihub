import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import { ErrorBoundary } from "./components/error-boundary";

const container = document.getElementById("root");

if (!container) {
  throw new Error(
    'Could not mount the app: no element with id "root" was found in the document.'
  );
}

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
