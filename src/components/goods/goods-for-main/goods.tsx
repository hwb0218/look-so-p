import { Suspense } from 'react';

import GoodsList from './goods-list';
import GoodsSkeleton from './goods-skeleton';

import Wrapper from '@components/common/ui/wrapper';

import { GOODS_CATEGORIES } from '@constants/goods-categories';

export default function Goods() {
  return (
    <Wrapper className="w-9/12 m-auto">
      <Wrapper className="flex-col items-start">
        <Suspense fallback={<GoodsSkeleton />}>
          <GoodsList categories={GOODS_CATEGORIES} />
        </Suspense>
      </Wrapper>
    </Wrapper>
  );
}
