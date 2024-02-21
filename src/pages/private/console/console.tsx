import { useParams } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

import { useGetProductsInfiniteQuery } from '@hooks/use-console-products-query';

import { ConsoleMain } from '@components/console';
import { Product } from '@src/lib/firebase/types';

export default function ConsoleMainPage() {
  const { id } = useParams() as { id: string };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetched } = useGetProductsInfiniteQuery({
    sellerId: id,
    pageLimit: 10,
  });

  const { pages } = (data as { pages: Product[] }) ?? [];

  const { ref: observerRef } = useInView({
    threshold: 0.3,
    onChange: (inView) => {
      if (inView && hasNextPage) {
        fetchNextPage();
      }
    },
  });

  return (
    <>
      <ConsoleMain products={pages} />
      {hasNextPage && isFetched && <div ref={observerRef} className="h-40" />}
      {hasNextPage && isFetchingNextPage && <h2 className="text-blue-600 col-span-full m-auto">로딩 중...</h2>}
    </>
  );
}
