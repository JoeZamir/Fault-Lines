import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./src/test",
  timeout: 30_000,
  use: {
    headless: true,
  },
});
