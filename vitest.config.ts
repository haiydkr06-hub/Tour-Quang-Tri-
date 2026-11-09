import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

// Dùng lại cấu hình Vite (alias @, plugin React) và thêm môi trường trình duyệt giả lập cho test.
export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      include: ['src/**/*.test.{ts,tsx}', 'server/**/*.test.ts'],
      restoreMocks: true,
    },
  }),
);
