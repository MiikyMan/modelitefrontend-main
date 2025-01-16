import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    // setupNodeEvents(on, config) {},
    baseUrl: 'http://localhost:3000',
    port: 3001,
    screenshotOnRunFailure: true,
    trashAssetsBeforeRuns: true,
    screenshotsFolder: 'cypress/screenshots',
    viewportHeight: 1080,
    viewportWidth: 1920,
  },
});
