import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { privateRoutes, publicRoutes } from './routes';

// 이 부분이 auth token을 검증하는 uitl 함수 모의 기능입니다.
const checkAuth = () => false;

const routes = [checkAuth() ? privateRoutes : {}, publicRoutes];

const router = createBrowserRouter(routes);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
