import { defineConfig } from "vite";

export default defineConfig({
  server: {
    cache: false, // Disable caching for development
  },
  optimizeDeps: {
    include: [
      "three/examples/jsm/loaders/FontLoader",
      "three/examples/jsm/geometries/TextGeometry",
    ],
  },
});
