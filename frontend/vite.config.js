import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    // Proxy requests prefixed with '/api' and '/uploads'
    proxy: {
      "/api": "http://localhost:8000",
      "/uploads": "http://localhost:8000",
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      // Treat all .js files as .jsx
      loader: {
        ".js": "jsx",
      },
    },
  },
});
