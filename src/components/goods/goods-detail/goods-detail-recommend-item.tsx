import { GoodsItemCard } from '../goods-item-card';

import { Product } from '@src/lib/firebase/types';

interface Props {
  recommendItem: Product;
}

export default function GoodsDetailRecommendItem({ recommendItem }: Props) {
  return <GoodsItemCard src={recommendItem.thumbnail} />;
}
