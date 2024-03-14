import React from 'react';
import { Link, createSearchParams } from 'react-router-dom';
import { storeService } from '@src/lib/firebase/StoreService';
import { queryClient } from '@src/main';

import { Li, Ul } from '@components/common/ui/list';
import { GoodsItemCard } from '../goods-item-card';
import Wrapper from '@components/common/ui/wrapper';

import numberFormat from '@src/utils/number-format';

import { ROUTE_PATHS } from '@constants/routes';
import { QUERY_KEYS } from '@constants/query-keys';

import useFetchGoodsByCategoryQuery from '@hooks/use-fetch-goods-by-category-query';
import sortbyOptions from '@src/utils/sort-by-options';
import { WithQueryAsyncBoundary } from '@components/common/with-query-async-boundary';
import GoodsByCategorySkeleton from './goods-by-category-skeleton';

interface Props {
  sortingOption: string;
  filterCategory: string;
}

function GoodsListByCategoryComponent({ sortingOption, filterCategory }: Props) {
  const { data: goods, ref, hasNextPage, isFetchingNextPage } = useFetchGoodsByCategoryQuery(filterCategory);

  const goodsContent = goods?.pages ?? [];

  const sortedGoods = sortbyOptions(goodsContent, sortingOption);

  return (
    <Ul className="justify-normal items-baseline grid grid-cols-4 gap-x-5 gap-y-20">
      {sortedGoods?.map((item) => (
        <Li key={item.id} className="w-full">
          <Link
            to={{
              pathname: ROUTE_PATHS.GOODS_DETAIL(item.id),
              search: `?${createSearchParams({ category: item.productCategory.trim() })}`,
            }}
            key={item.id}
            onMouseEnter={async () => {
              await queryClient.prefetchQuery({
                queryKey: QUERY_KEYS.GOODS.BY_ID(item.id),
                queryFn: () => storeService.getGoodsById(item.id),
              });
            }}
          >
            <GoodsItemCard src={item.thumbnail} alt={item.productName} />
            <Wrapper className="pt-4">
              <div className="text-sm">{item.productName}</div>
              <div>{`${numberFormat(Number(item.productPrice))}원`}</div>
            </Wrapper>
          </Link>
        </Li>
      ))}
      {hasNextPage && !isFetchingNextPage && <div ref={ref} />}
    </Ul>
  );
}

const GoodsListByCategory = WithQueryAsyncBoundary(GoodsListByCategoryComponent, {
  pendingFallback: <GoodsByCategorySkeleton />,
  rejectedFallback: <span>에러가 발생했습니다</span>,
});

export default React.memo(GoodsListByCategory);
