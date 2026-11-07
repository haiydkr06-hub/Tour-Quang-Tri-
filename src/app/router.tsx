import { createBrowserRouter } from 'react-router';
import { routes } from './routes';

/**
 * Khởi tạo duy nhất thể hiện router bằng createBrowserRouter theo React Router 8 (Data Mode).
 */
export const router = createBrowserRouter(routes);
