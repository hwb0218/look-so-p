import { useParams } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

import useFetchOrderManagementQuery from '@hooks/use-fetch-order-management-query';

import { Meta } from '@components/common/meta';
import { ConsoleOrderManagement } from '@components/console';

import { CONSOLE_ROUTE_PATHS } from '@constants/routes';

import { type OrderList } from '@src/lib/firebase/types';

export default function ConsoleOrderManagementPage() {
  const { id } = useParams() as { id: string };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetched } = useFetchOrderManagementQuery({
    sellerId: id,
    pageLimit: 5,
  });

  const { pages } = (data as { pages: OrderList[] }) ?? [];

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
      <Meta title="주문 관리 - LookSoPrt" url={CONSOLE_ROUTE_PATHS.ORDER_MANAGEMENT(id)} desc="주문 관리" />
      <ConsoleOrderManagement orders={pages} sellerId={id} />
      {hasNextPage && isFetched && <div ref={observerRef} className="h-40" />}
      {hasNextPage && isFetchingNextPage && <h2 className="text-blue-600 col-span-full m-auto">로딩 중...</h2>}
    </>
  );
}
