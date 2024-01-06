import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  envDir: "./",
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "https://twine.onrender.com",
        secure: true,
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
});
