import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      crypto: path.resolve(__dirname, "node_modules/crypto-browserify"),
      stream: path.resolve(__dirname, "node_modules/stream-browserify"),
      buffer: path.resolve(__dirname, "node_modules/buffer"),
      process: path.resolve(__dirname, "node_modules/process/browser.js"),
      util: path.resolve(__dirname, "node_modules/util/"),
      "readable-stream": path.resolve(__dirname, "node_modules/readable-stream"),
      http: path.resolve(__dirname, "node_modules/stream-http"), // 👈 new
      https: path.resolve(__dirname, "node_modules/https-browserify"), // optional for secure requests
      url: path.resolve(__dirname, "node_modules/url/"), // 👈 new
    },
  },
  define: {
    global: "globalThis",
    "process.env": {},
  },
  optimizeDeps: {
    include: [
      "buffer",
      "process",
      "crypto-browserify",
      "stream-browserify",
      "util",
      "readable-stream",
      "stream-http",
      "url",
    ],
  },
});
