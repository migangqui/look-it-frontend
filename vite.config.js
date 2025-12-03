import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  server: {
    allowedHosts: ['e4d77eaa28adf2.lhr.life']
  },
});
