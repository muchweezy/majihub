import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    env: {
      VITE_BACKEND_BASE_URL: "https://api.majihub.test/v1",
      VITE_API_URL: "https://api.majihub.test",
    },
    coverage: {
      provider: "v8",
      reporter: ["text", "json-summary", "html"],
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src/**/*.d.ts",
        "src/test/**",
        "src/**/*.test.{ts,tsx}",
        "src/components/ui/**",
      ],
    },
  },
});
