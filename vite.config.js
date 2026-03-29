import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc"
import path from "path";

export default defineConfig(({ mode }) => ({
  base: "/", 
  server: {
    host: true,
    port: 8080,
    strictPort: true,


    // allowedHosts: [
    //   "wholesome-sheila-piddling.ngrok-free.dev"
    // ],

    fs: {
      strict: false 
    }
  },
  plugins: [
    react(),
    mode === 'development'
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
}));