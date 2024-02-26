import { useState } from 'react';

import useFetchGoodsByCategoryQuery from '@hooks/use-fetch-goods-by-category-query';

import Wrapper from '@components/common/ui/wrapper';
import { GoodsCategories, GoodsListByCategory, GoodsSorter } from './';

import sortbyOptions from '@src/utils/sort-by-options';

import { GOODS_CATEGORIES } from '@constants/goods-categories';

interface Props {
  category: string;
}

export default function GoodsByCategory({ category }: Props) {
  const [filterCategory, setFilterCategory] = useState(category);
  const [sortingOption, setSortingOption] = useState('latest');

  const { data: goods, ref, hasNextPage, isFetchingNextPage } = useFetchGoodsByCategoryQuery(filterCategory);

  const goodsContent = goods?.pages ?? [];

  const sortedGoods = sortbyOptions(goodsContent, sortingOption);

  return (
    <Wrapper className="w-9/12 m-auto pb-20">
      <GoodsCategories
        categories={GOODS_CATEGORIES}
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
      />
      <GoodsSorter sortingOption={sortingOption} setSortingOption={setSortingOption} />
      <GoodsListByCategory goods={sortedGoods} />
      {hasNextPage && !isFetchingNextPage && <div ref={ref} />}
    </Wrapper>
  );
}
