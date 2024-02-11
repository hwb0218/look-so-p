import { Link, createSearchParams } from 'react-router-dom';

import { Li, Ul } from '@components/common/list';
import { GoodsItemCard } from '../goods-item-card';
import Wrapper from '@components/common/wrapper';

import { Product } from '@src/lib/firebase/types';

import numberFormat from '@src/utils/number-format';

import { ROUTE_PATHS } from '@constants/routes';

interface Props {
  goods?: Product[];
}

export default function GoodsListByCategory({ goods }: Props) {
  return (
    <Ul className="grid grid-cols-4 gap-x-5 gap-y-20">
      {goods?.map((item) => (
        <Li key={item.id} className="w-full">
          <Link
            to={{
              pathname: ROUTE_PATHS.GOODS_DETAIL(item.id),
              search: `?${createSearchParams({ category: item.productCategory.trim() })}`,
            }}
            key={item.id}
          >
            <GoodsItemCard src={item.thumbnail} />
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
