export const ROUTE_PATHS = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/sign-up',
  PRODUCT_ALL: '/product-all',
  GOODS_LIST: '/goods/goods-list',
  GOODS_DETAIL: (productId?: string) => (productId ? `/goods/goods-detail/${productId}` : '/goods/goods-detail/:id'),
};

export const AUTH_ROUTE_PATHS = {
  PRIVATE: '/auth',
  MYPAGE: (id?: string) => (id ? `/my-page/${id}` : '/my-page/:id'),
  ORDER: '/order',
  ORDER_COMPLETE: '/order/complete',
  ORDER_LIST: '/order-list',
};

export const CONSOLE_ROUTE_PATHS = {
  CONSOLE: (id?: string) => (id ? `/console/${id}` : '/console/:id'),
  PRODUCT_REGISTRATION: (id?: string) => (id ? `/console/add-product/${id}` : '/console/add-product/:id'),
};
