export const QUERY_KEYS = {
  AUTH: {
    BASE: ['user'] as const,
    USER: () => [...QUERY_KEYS.AUTH.BASE] as const,
    CART: () => [...QUERY_KEYS.AUTH.BASE, 'cart'] as const,
    ORDER_LIST: () => [...QUERY_KEYS.AUTH.BASE, 'orderList'] as const,
  },
  CONSOLE: {
    BASE: ['console'] as const,
    PRODUCTS: (sellerId: string) => [...QUERY_KEYS.CONSOLE.BASE, sellerId] as const,
  },
  GOODS: {
    BASE: ['goods'] as const,
    MAIN: () => [...QUERY_KEYS.GOODS.BASE],
    DETAILS: () => [...QUERY_KEYS.GOODS.BASE, 'detail'] as const,
    BY_ID: (productId?: string) => [...QUERY_KEYS.GOODS.DETAILS(), productId] as const,
    BY_CATEGORY: (category: string) => [...QUERY_KEYS.GOODS.BASE, category] as const,
    RECOMMEND: () => [...QUERY_KEYS.GOODS.BASE, 'recommend'] as const,
  },
};
