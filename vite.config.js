import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
  build: {
    outDir: "build", // This will create a "build" folder for your output
  },
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": "/src", // Alias for the `src` folder
    },
  },
});
