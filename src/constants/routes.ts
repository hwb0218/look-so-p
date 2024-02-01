export const ROUTE_PATHS = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/sign-up',
  PRODUCT_ALL: '/product-all',
};

export const AUTH_ROUTE_PATHS = {
  PRIVATE: '/auth',
  MYPAGE: (id?: string) => (id ? `/my-page/${id}` : '/my-page/:id'),
};

export const CONSOLE_ROUTE_PATHS = {
  CONSOLE: (id?: string) => (id ? `/console/${id}` : '/console/:id'),
  PRODUCT_REGISTRATION: (id?: string) => (id ? `/console/add-product/${id}` : '/console/add-product/:id'),
};
