import GoodsItem from './goods-item';

import { Ul } from '@components/common/list';

import { Product } from '@src/lib/firebase/types';

interface Props {
  goodsByCategory?: {
    [category: string]: Product[];
  };
  filterCategory: string;
}

export default function GoodsList({ goodsByCategory, filterCategory }: Props) {
  return (
    <Ul className="justify-center gap-x-4 p-3">
      {goodsByCategory && goodsByCategory[filterCategory]?.map((goods) => <GoodsItem key={goods.id} goods={goods} />)}
    </Ul>
  );
}
