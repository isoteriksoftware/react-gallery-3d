import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import EsLint from "vite-plugin-linter";
import tsConfigPaths from "vite-tsconfig-paths";
const { EsLinter, linterPlugin } = EsLint;
import * as packageJson from "./package.json";

export default defineConfig((configEnv) => ({
  plugins: [
    react(),
    tsConfigPaths(),
    linterPlugin({
      include: ["./src}/**/*.{ts,tsx}"],
      linters: [new EsLinter({ configEnv })],
    }),
    dts({
      include: ["src/"],
    }),
  ],
  build: {
    lib: {
      entry: resolve("src", "index.ts"),
      name: "react-gallery-3d",
      formats: ["es", "umd"],
      fileName: (format) => `react-gallery-3d.${format}.js`,
    },
    rollupOptions: {
      external: [...Object.keys(packageJson.peerDependencies)],
    },
  },
}));
