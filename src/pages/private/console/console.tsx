import { useParams } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

import { useGetProductsInfiniteQuery } from '@hooks/use-console-products-query';

import { ConsoleMain } from '@components/console';

export default function ConsoleMainPage() {
  const { id } = useParams() as { id: string };

  const { products, fetchNextPage, hasNextPage, isFetchingNextPage, isFetched } = useGetProductsInfiniteQuery(id);

  const { ref: observerRef, inView } = useInView({
    threshold: 0.3,
    onChange: (inView) => {
      if (isFetchingNextPage) {
        return;
      }

      if (inView && hasNextPage) {
        fetchNextPage();
      }
    },
  });

  return (
    <>
      <ConsoleMain products={products} />
      <h2 className="fixed left-5 bottom-0 text-blue-600 z-[9999]">{`observer ${inView}`}</h2>
      {hasNextPage && isFetched && <div ref={observerRef} className="h-40" />}
      {hasNextPage && isFetchingNextPage && <h2 className="text-blue-600 col-span-full m-auto">로딩 중...</h2>}
    </>
  );
}
