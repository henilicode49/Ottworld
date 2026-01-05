import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tsconfigPaths from "vite-tsconfig-paths";
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
