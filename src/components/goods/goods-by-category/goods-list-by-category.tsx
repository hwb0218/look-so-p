import { Link, createSearchParams } from 'react-router-dom';
import { storeService } from '@src/lib/firebase/StoreService';
import { queryClient } from '@src/main';

import { Li, Ul } from '@components/common/list';
import { GoodsItemCard } from '../goods-item-card';
import Wrapper from '@components/common/wrapper';

import { Product } from '@src/lib/firebase/types';

import numberFormat from '@src/utils/number-format';

import { ROUTE_PATHS } from '@constants/routes';
import { QUERY_KEYS } from '@constants/query-keys';

interface Props {
  goods?: Product[];
}

export default function GoodsListByCategory({ goods }: Props) {
  return (
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
  );
}
