import { defineConfig, type PluginOption } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';
import webfontDownload from 'vite-plugin-webfont-dl';
import { visualizer } from 'rollup-plugin-visualizer';
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split('.').at(1);
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'img';
          }
          return `assets/${extType}/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            const module = id.split('node_modules/').pop().split('/')[0];
            return `vendor/${module}`;
          }
        },
      },
    },
  },
  plugins: [
    react(),
    tsconfigPaths(),
    webfontDownload(['https://github.com/orioncactus/pretendard/tree/v1.3.9/packages/pretendard/dist']),
    svgr({
      include: '**/*.svg',
    }),
    visualizer({
      filename: './dist/stats.html',
      open: true,
      template: 'treemap',
    }) as PluginOption,
  ],
});
