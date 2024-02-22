import { lazy } from 'react';

const MyPage = lazy(() => import('./my-page'));
const ConsoleMainPage = lazy(() => import('./console/console'));
const ConsoleAddProductPage = lazy(() => import('./console/add-product'));
const ConsoleOrderManagementPage = lazy(() => import('./console/order-management'));
const OrderPage = lazy(() => import('./order'));
const OrderListPage = lazy(() => import('./order-list'));

export { MyPage, ConsoleMainPage, ConsoleAddProductPage, ConsoleOrderManagementPage, OrderPage, OrderListPage };
