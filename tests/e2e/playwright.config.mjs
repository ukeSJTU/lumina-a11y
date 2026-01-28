import { defineConfig } from "@playwright/test";

export default defineConfig({
  timeout: 60_000,
  retries: 0,
  use: {
    headless: false,
    viewport: { width: 1280, height: 800 }
  }
});
