import GoodsList from './goods-list';

import Wrapper from '@components/common/wrapper';

import { GOODS_CATEGORIES } from '@constants/goods-categories';

export default function Goods() {
  return (
    <Wrapper className="w-10/12 pt-6 m-auto">
      <GoodsList categories={GOODS_CATEGORIES} />
    </Wrapper>
  );
}
