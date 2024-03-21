import GoodsList from './goods-list';
import GoodsSkeleton from './goods-skeleton';

import Wrapper from '@components/common/ui/wrapper';
import { WithQueryAsyncBoundary } from '@components/common/with-query-async-boundary';

import { GOODS_CATEGORIES } from '@constants/goods-categories';

function GoodsComponent() {
  return (
    <Wrapper className="w-11/12 md:w-9/12 m-auto">
      <Wrapper className="flex-col items-start">
        <GoodsList categories={GOODS_CATEGORIES} />
      </Wrapper>
    </Wrapper>
  );
}

const Goods = WithQueryAsyncBoundary(GoodsComponent, {
  pendingFallback: <GoodsSkeleton />,
  rejectedFallback: <span>에러가 발생했습니다</span>,
});

export default Goods;
