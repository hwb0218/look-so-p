import React from 'react';
import { Link, createSearchParams } from 'react-router-dom';
import { storeService } from '@src/lib/firebase/StoreService';

import { queryClient } from '@providers/index';

import { GoodsItemCard } from '../goods-item-card';

import Wrapper from '@components/common/ui/wrapper';
import { Li, Ul } from '@components/common/ui/list';

import numberFormat from '@src/utils/number-format';

import { ROUTE_PATHS } from '@constants/routes';
import { QUERY_KEYS } from '@constants/query-keys';

import type { Product } from '@src/lib/firebase/types';

interface Props {
  goods: Product[];
}

function GoodsSerach({ goods }: Props) {
  return (
    <Wrapper className="w-9/12 m-auto pb-20">
      <Ul className="justify-normal items-baseline grid grid-cols-4 gap-x-5 gap-y-20">
        {goods?.map((item) => (
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
      </Ul>
    </Wrapper>
  );
}

export default React.memo(GoodsSerach);
