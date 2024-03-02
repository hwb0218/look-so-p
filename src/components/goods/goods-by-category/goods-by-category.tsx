import { Suspense, useState } from 'react';

import Wrapper from '@components/common/ui/wrapper';
import { GoodsCategories, GoodsListByCategory, GoodsSorter } from './';

import { GOODS_CATEGORIES } from '@constants/goods-categories';
import GoodsByCategorySkeleton from './goods-by-category-skeleton';

interface Props {
  category: string;
}

export default function GoodsByCategory({ category }: Props) {
  const [filterCategory, setFilterCategory] = useState(category);
  const [sortingOption, setSortingOption] = useState('latest');

  return (
    <Wrapper className="w-9/12 m-auto pb-32">
      <GoodsCategories
        categories={GOODS_CATEGORIES}
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
      />
      <GoodsSorter sortingOption={sortingOption} setSortingOption={setSortingOption} />
      <Suspense fallback={<GoodsByCategorySkeleton />}>
        <GoodsListByCategory sortingOption={sortingOption} filterCategory={filterCategory} />
      </Suspense>
    </Wrapper>
  );
}
