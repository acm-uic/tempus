import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        short_name: "Tempus",
        name: "Project Tempus",
        icons: [
          {
            src: "favicon.ico",
            sizes: "64x64 32x32 24x24 16x16",
            type: "image/x-icon",
          },
          {
            src: "images/logo120.png",
            type: "image/png",
            sizes: "120x120",
          },
          {
            src: "images/logo144.png",
            type: "image/png",
            sizes: "144x144",
          },
          {
            src: "images/logo152.png",
            type: "image/png",
            sizes: "152x152",
          },
          {
            src: "images/logo167.png",
            type: "image/png",
            sizes: "167x167",
          },
          {
            src: "images/logo180.png",
            type: "image/png",
            sizes: "180x180",
          },
          {
            src: "images/logo192.png",
            type: "image/png",
            sizes: "192x192",
          },
          {
            src: "images/logo512.png",
            type: "image/png",
            sizes: "512x512",
          },
        ],
        start_url: ".",
        display: "standalone",
        theme_color: "#4bc0c8",
        background_color: "#ffffff",
      },
    }),
  ],
});
