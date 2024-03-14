const ConsoleMainPage = () => import('./console/console');
const ConsoleAddProductPage = () => import('./console/add-product');
const ConsoleOrderManagementPage = () => import('./console/order-management');
const OrderPage = () => import('./order');
const OrderListPage = () => import('./order-list');

export { ConsoleMainPage, ConsoleAddProductPage, ConsoleOrderManagementPage, OrderPage, OrderListPage };
