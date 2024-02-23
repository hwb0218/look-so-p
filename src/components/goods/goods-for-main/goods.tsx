import { Suspense } from 'react';

import GoodsList from './goods-list';
import GoodsSkeleton from './goods-skeleton';

import Wrapper from '@components/common/wrapper';

import { GOODS_CATEGORIES } from '@constants/goods-categories';

export default function Goods() {
  return (
    <Wrapper className="w-9/12 pt-6 m-auto">
      <Wrapper className="flex-col items-start py-3">
        <Suspense fallback={<GoodsSkeleton />}>
          <GoodsList categories={GOODS_CATEGORIES} />
        </Suspense>
      </Wrapper>
    </Wrapper>
  );
}
