import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      fallback: '200.html', // may differ from host to host
    }),
    paths: {
      relative: false,
      base: process.argv.includes('dev') ? '/webapp' : process.env.BASE_PATH
    }
  },
};

export default config;
