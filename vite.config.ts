import { defineConfig, type PluginOption } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import webfontDownload from 'vite-plugin-webfont-dl';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    webfontDownload(['https://github.com/orioncactus/pretendard/tree/v1.3.9/packages/pretendard/dist']),
    visualizer({
      filename: './dist/stats.html',
      open: true,
      template: 'treemap',
    }) as PluginOption,
  ],
});
