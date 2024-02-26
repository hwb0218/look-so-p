import { useParams } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

import { useGetProductsInfiniteQuery } from '@hooks/use-console-products-query';

import { Meta } from '@components/common/meta';
import { ConsoleMain as ConsoleMainComponent } from '@components/console';
import Spinner from '@components/common/spinner/spinner';
import { WithQueryAsyncBoundary } from '@components/common/with-query-async-boundary';

import { CONSOLE_ROUTE_PATHS } from '@constants/routes';

import { type Product } from '@src/lib/firebase/types';

function ConsoleMain() {
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
      <Meta title="상품 조회 - LookSoPrt" url={CONSOLE_ROUTE_PATHS.CONSOLE(id)} desc="상품 조회" />
      <ConsoleMainComponent products={pages} />
      {hasNextPage && isFetched && <div ref={observerRef} className="h-40" />}
      {hasNextPage && isFetchingNextPage && <h2 className="text-blue-600 col-span-full m-auto">로딩 중...</h2>}
    </>
  );
}

const ConsoleMainPage = WithQueryAsyncBoundary(ConsoleMain, {
  pendingFallback: <Spinner />,
  rejectedFallback: <span>에러가 발생했습니다</span>,
});

export default ConsoleMainPage;
