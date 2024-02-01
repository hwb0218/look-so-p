import { useParams } from 'react-router-dom';

import { useGetProductsInfiniteQuery } from '@hooks/use-console-products-query';

import { ConsoleMain } from '@components/console';

export default function ConsoleMainPage() {
  const { id } = useParams() as { id: string };

  const { products, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetProductsInfiniteQuery(id);

  return (
    <>
      <ConsoleMain products={products} />
      {hasNextPage && (
        <button
          type="button"
          onClick={() => {
            if (hasNextPage) {
              fetchNextPage();
            }
          }}
          disabled={isFetchingNextPage}
        >
          더보기
        </button>
      )}
    </>
  );
}
