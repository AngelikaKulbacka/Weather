import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslintPlugin from '@nabla/vite-plugin-eslint';
import { resolve } from 'path';

import overrides from './overrides';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@types': resolve(__dirname, './src/@types/index'),
      '@styles': resolve(__dirname, './src/styles/'),
      '@components': resolve(__dirname, './src/components/'),
      '@store': resolve(__dirname, './src/store/'),
      '@pages': resolve(__dirname, './src/pages/'),
      '@paths': resolve(__dirname, './src/paths/'),
      '@utils': resolve(__dirname, './src/utils/'),
      '@services': resolve(__dirname, './src/services/'),
      '@shared': resolve(__dirname, './src/shared/'),
      '@router': resolve(__dirname, './src/router/'),
      '@dictionary': resolve(__dirname, './src/dictionary/'),
      '@plugins': resolve(__dirname, './src/plugins/'),
      '@hooks': resolve(__dirname, './src/hooks/'),
      '@resources': resolve(__dirname, './src/resources/index'),
      '@src': resolve(__dirname, './src'),
      '@root': resolve(__dirname, './'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name].[ext]',
        entryFileNames: '[name].js',
        chunkFileNames: 'assets/[name].js',
      },
    },
  },
  plugins: [vue(), eslintPlugin()],
  server: {
    host: true,
    port: 3000,
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          ...overrides,
        },
        javascriptEnabled: true,
      },
    },
  },
});
