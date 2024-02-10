import useFetchAllGoods from '@hooks/use-fetch-All-goods';

import GoodsSection from './goods-section';

import { GoodsCategories } from '../types';

import { GOODS_CATEGORIES } from '@constants/goods-categories';

interface Props {
  categories: GoodsCategories;
}

export default function GoodsList({ categories }: Props) {
  const { data: goodsByCategory } = useFetchAllGoods(GOODS_CATEGORIES);

  return (
    <div className="flex-col items-start p-3">
      {categories.map(({ value, title }) => (
        <GoodsSection key={value} goodsByCategory={goodsByCategory} category={value} title={title} />
      ))}
    </div>
  );
}