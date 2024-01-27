export const QUERY_KEYS = {
  AUTH: {
    BASE: [{ scope: 'user' }] as const,
    USER: () => [{ ...QUERY_KEYS.AUTH.BASE[0] }] as const,
  },
};
