import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router/dom';
import { router } from './app/router';
import { ThemeProvider } from './context/ThemeContext';
// Font Be Vietnam Pro (tự lưu trữ, không gọi Google Fonts). Trình duyệt chỉ tải tập ký tự cần dùng.
import '@fontsource/be-vietnam-pro/400.css';
import '@fontsource/be-vietnam-pro/500.css';
import '@fontsource/be-vietnam-pro/600.css';
import '@fontsource/be-vietnam-pro/700.css';
import '@fontsource/be-vietnam-pro/800.css';
import '@fontsource/be-vietnam-pro/900.css';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Không tìm thấy phần tử root trong index.html');
}

createRoot(rootElement).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
