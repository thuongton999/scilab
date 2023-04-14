import { defineConfig } from 'astro/config';

import robotsTxt from "astro-robots-txt";
import { astroImageTools } from "astro-imagetools";

// https://astro.build/config
import netlify from '@astrojs/netlify/edge-functions';

// https://astro.build/config
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  output: 'server',
  site: "https://scilab.netlify.app",
  integrations: [robotsTxt(), astroImageTools, react()],
  adapter: netlify()
});