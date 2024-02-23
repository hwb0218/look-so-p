import useFetchAllGoodsQuery from '@hooks/use-fetch-All-goods-query';

import GoodsSection from './goods-section';

import { GoodsCategories } from '../types';

import { GOODS_CATEGORIES } from '@constants/goods-categories';

interface Props {
  categories: GoodsCategories;
}

export default function GoodsList({ categories }: Props) {
  const { data: goodsByCategory } = useFetchAllGoodsQuery(GOODS_CATEGORIES);

  return (
    <>
      {categories.map(({ value, title }) => (
        <GoodsSection key={value} goodsByCategory={goodsByCategory} category={value} title={title} />
      ))}
    </>
  );
}
