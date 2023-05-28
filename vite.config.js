import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { viteStaticCopy } from 'vite-plugin-static-copy'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: 'src/wasm/build/panel.wasm',
          dest: 'src/wasm/build'
        },
        {
          src: 'src/wasm/build/panel.js',
          dest: 'src/wasm/build'
        }
      ]
    }),
    svelte(),
  ]
});
