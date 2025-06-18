import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import routes from './router/routes';
import 'flag-icon-css/css/flag-icon.min.css';
import './styles/global.css';

const router = createBrowserRouter(routes, {
  basename: '/sundries/',
  future: {
    v7_startTransition: true,
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
