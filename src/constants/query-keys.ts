export const QUERY_KEYS = {
  AUTH: {
    BASE: [{ scope: 'user' }] as const,
    USER: () => [{ ...QUERY_KEYS.AUTH.BASE[0] }] as const,
  },
  CONSOLE: {
    BASE: [{ scope: 'console' }] as const,
    PRODUCTS: (sellerId: string) => [{ ...QUERY_KEYS.CONSOLE.BASE[0], sellerId }] as const,
  },
  GOODS: {
    BASE: [{ scope: 'goods' }] as const,
    MAIN: () => [{ ...QUERY_KEYS.GOODS.BASE[0] }],
    BY_ID: (productId: string) => [{ ...QUERY_KEYS.GOODS.BASE[0], productId }] as const,
    BY_CATEGORY: (category: string) => [{ ...QUERY_KEYS.GOODS.BASE[0], category }] as const,
  },
};
