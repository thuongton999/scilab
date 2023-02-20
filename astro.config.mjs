import { defineConfig } from 'astro/config';

// https://astro.build/config
import robotsTxt from "astro-robots-txt";

import { astroImageTools } from "astro-imagetools";

// https://astro.build/config
export default defineConfig({
  site: "https://scilab.netlify.app",
  integrations: [robotsTxt(), astroImageTools]
});