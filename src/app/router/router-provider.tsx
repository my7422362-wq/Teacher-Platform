import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './index';

export function RouterProvider() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

