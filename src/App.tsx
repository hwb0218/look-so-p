import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { privateRoutes, publicRoutes } from './routes';
import { Suspense } from 'react';

const routes = [...privateRoutes, ...publicRoutes];

const router = createBrowserRouter(routes);

export default function App() {
  return (
    <Suspense fallback={<div>로딩 중..</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
