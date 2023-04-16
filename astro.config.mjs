import { defineConfig } from 'astro/config';
import robotsTxt from "astro-robots-txt";
// import netlify from '@astrojs/netlify/functions';

import react from "@astrojs/react";

// https://astro.build/config
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
import image from "@astrojs/image";

// https://astro.build/config
export default defineConfig({
  output: 'server',
  cacheDir: "/.cache",
  site: "https://scilab.netlify.app",
  integrations: [robotsTxt(), react(), image({
    serviceEntryPoint: '@astrojs/image/sharp',
    cacheDir: "./.cache/image"
  })],
  adapter: vercel()
});