import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { privateRoutes, publicRoutes } from './routes';

const routes = [...privateRoutes, ...publicRoutes];

const router = createBrowserRouter(routes);

export default function App() {
  return <RouterProvider router={router} />;
}
