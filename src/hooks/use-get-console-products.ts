import { QUERY_KEYS } from '@constants/query-keys';
import { getSellerProducts } from '@src/apis/console';
import { useQuery } from '@tanstack/react-query';

export default function useGetConsoleProducts(sellerId: string) {
  const { data: products } = useQuery({
    queryKey: QUERY_KEYS.CONSOLE.PRODUCTS(sellerId),
    queryFn: () => getSellerProducts({ sellerId }),
  });

  return {
    products: products ?? [],
  };
}
