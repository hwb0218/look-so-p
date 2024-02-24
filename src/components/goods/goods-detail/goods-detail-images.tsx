import Wrapper from '@components/common/ui/wrapper';

import { GoodsItemCard } from '../goods-item-card';

import { Product } from '@src/lib/firebase/types';

interface Props {
  goods: Product;
}

export default function GoodsDetailImages({ goods }: Props) {
  return (
    <Wrapper className="w-full max-w-sm">
      <GoodsItemCard src={goods.thumbnail} alt={goods.productName} />
    </Wrapper>
  );
}
