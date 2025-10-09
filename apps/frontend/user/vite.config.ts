import tsconfigPaths from 'vite-tsconfig-paths';
import ViteYaml from '@modyfi/vite-plugin-yaml';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  envPrefix: 'REACT_APP_',
  base: '/',
  server: {
    port: 3001,
    strictPort: true,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        // rewrite: path => path.replace(/^\/api/, ""),
      },
    },
  },
  define: {
    'process.env': process.env,
  },
  build: {
    outDir: 'build',
  },
  plugins: [
    tsconfigPaths(),
    react({
      // Enable react19 features
      babel: {
        plugins: [['babel-plugin-react-compiler', { target: '19' }]],
      },
    }),
    ViteYaml(),
    tailwindcss(),
  ],
  css: {
    modules: {
      // This is the default value, but you can customize it if needed
      generateScopedName: '[local]__[hash:base64:5]',
    },
  },
});
