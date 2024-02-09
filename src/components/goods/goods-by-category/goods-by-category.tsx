import { useState } from 'react';

import useFetchGoodsByCategory from '@hooks/use-fetch-goods-by-category';

import Wrapper from '@components/common/wrapper';
import { GoodsCategories, GoodsListByCategory, GoodsSorter } from './';

import sortbyOptions from '@src/utils/sort-by-options';

import { GOODS_CATEGORIES } from '@constants/goods-categories';

interface Props {
  category: string;
}

export default function GoodsByCategory({ category }: Props) {
  const [filterCategory, setFilterCategory] = useState(category);
  const [sortingOption, setSortingOption] = useState('latest');

  const { data: goods, ref } = useFetchGoodsByCategory(filterCategory);

  const goodsContent = goods?.pages ?? [];

  const sortedGoods = sortbyOptions(goodsContent, sortingOption);

  return (
    <Wrapper className="w-10/12 m-auto pb-20">
      <GoodsCategories
        categories={GOODS_CATEGORIES}
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
      />
      <GoodsSorter sortingOption={sortingOption} setSortingOption={setSortingOption} />
      <GoodsListByCategory goods={sortedGoods} />
      {goods && <div ref={ref} />}
    </Wrapper>
  );
}
