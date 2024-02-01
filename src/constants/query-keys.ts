export const QUERY_KEYS = {
  AUTH: {
    BASE: [{ scope: 'user' }] as const,
    USER: () => [{ ...QUERY_KEYS.AUTH.BASE[0] }] as const,
  },
  CONSOLE: {
    BASE: [{ scope: 'console' }] as const,
    PRODUCTS: (sellerId: string) => [{ ...QUERY_KEYS.CONSOLE.BASE[0], sellerId }] as const,
  },
};
