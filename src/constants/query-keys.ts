export const QUERY_KEYS = {
  AUTH: {
    BASE: ['user'] as const,
    USER: () => [...QUERY_KEYS.AUTH.BASE] as const,
  },
  CONSOLE: {
    BASE: ['console'] as const,
    PRODUCTS: (sellerId: string) => [...QUERY_KEYS.CONSOLE.BASE, sellerId] as const,
  },
  GOODS: {
    BASE: ['goods'] as const,
    MAIN: () => [...QUERY_KEYS.GOODS.BASE],
    BY_ID: (productId: string) => [...QUERY_KEYS.GOODS.BASE, productId] as const,
    BY_CATEGORY: (category: string) => [...QUERY_KEYS.GOODS.BASE, category] as const,
    RECOMMEND: () => [...QUERY_KEYS.GOODS.BASE, 'recommend'] as const,
  },
};
