import { defineConfig } from "vite";
import eslintPlugin from "vite-plugin-eslint";

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    eslintPlugin({
      cache: false,
      emitWarning: true,
      include: ["./src//*.ts"],
      exclude: [],
    }),
  ],
});
