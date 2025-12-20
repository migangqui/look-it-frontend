import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  server: {
    allowedHosts: ["97c2dc1da3b6cb.lhr.life"],
  },
});
