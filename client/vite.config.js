import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (
              id.includes("react") ||
              id.includes("react-dom") ||
              id.includes("react-router-dom")
            ) {
              return "vendor-react";
            }
            if (id.includes("motion")) {
              return "vendor-motion";
            }
            if (id.includes("socket.io-client")) {
              return "vendor-socket";
            }
            if (id.includes("leaflet") || id.includes("react-leaflet")) {
              return "vendor-map";
            }
            return "vendor";
          }
        },
      },
    },
  },
});
