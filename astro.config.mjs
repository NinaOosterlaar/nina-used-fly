// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from "@tailwindcss/vite";

import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  site: 'https://ninausedfly.com', // Change this to your custom domain
  integrations: [mdx(), sitemap()],

  vite: {
      plugins: [tailwindcss()],
	},

  adapter: netlify(),
});