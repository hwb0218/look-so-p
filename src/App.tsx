import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { auth } from '@firebase/config';

import { privateRoutes, publicRoutes } from './routes';

const user = auth.currentUser;

console.log(user);

// 이 부분이 auth token을 검증
const routes = [...privateRoutes, ...publicRoutes];

const router = createBrowserRouter(routes);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
