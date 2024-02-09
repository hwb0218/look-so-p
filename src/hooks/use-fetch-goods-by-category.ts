import { useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { storeService } from '@src/lib/firebase/StoreService';

import { QUERY_KEYS } from '@constants/query-keys';

export default function useFetchGoodsByCategory(category: string) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetched } = useInfiniteQuery({
    queryKey: QUERY_KEYS.GOODS.BY_CATEGORY(category),
    queryFn: ({ pageParam }: { pageParam?: QueryDocumentSnapshot<DocumentData, DocumentData> }) =>
      storeService.getAllGoodsByCategory(category, { pageParam, limitNum: 12 }),
    initialPageParam: undefined,
    getNextPageParam: ({ lastVisible }) => lastVisible,
    select: (data) => ({
      pages: data.pages.flatMap((page) => page.products),
      pageParams: data.pageParams,
    }),
  });

  const { ref, inView } = useInView({
    threshold: 0.1,
    rootMargin: '0px 0px 100px 0px',
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return {
    data: data,
    fetchNextPage: fetchNextPage,
    hasNextPage: hasNextPage,
    isFetchingNextPage: isFetchingNextPage,
    isFetched: isFetched,
    ref,
  };
}
