import React from 'react';

import { Li, Ul } from '@components/common/list';

import { Product } from '@src/lib/firebase/types';
import { GoodsItemCard } from '../goods-item-card';
import Wrapper from '@components/common/wrapper';

import numberFormat from '@src/utils/number-format';

interface Props {
  goods?: Product[];
}

export default function GoodsListByCategory({ goods }: Props) {
  return (
    <Ul className="grid grid-cols-4 gap-x-5 gap-y-20">
      {goods?.map((item) => (
        <Li className="w-full">
          <React.Fragment key={item.id}>
            <GoodsItemCard src={item.thumbnail} />
            <Wrapper className="pt-4">
              <div className="text-sm">{item.productName}</div>
              <div>{`${numberFormat(Number(item.productPrice))}원`}</div>
            </Wrapper>
          </React.Fragment>
        </Li>
      ))}
    </Ul>
  );
}
