import useFetchGoods from '@hooks/use-fetch-goods';

import GoodsSection from './goods-section';

import { GoodsCategories } from '../types';

import { GOODS_CATEGORIES } from '@constants/goods-categories';

interface Props {
  categories: GoodsCategories;
}

export default function GoodsList({ categories }: Props) {
  const { data: goodsByCategory } = useFetchGoods(GOODS_CATEGORIES);

  return (
    <div className="flex-col items-start p-3">
      {categories.map(({ value, title }) => (
        <GoodsSection goodsByCategory={goodsByCategory} category={value} title={title} />
      ))}
    </div>
  );
}
