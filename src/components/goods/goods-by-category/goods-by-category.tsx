import { useState } from 'react';

import useFetchGoodsByCategory from '@hooks/use-fetch-goods-by-category';

import { GoodsCategories, GoodsListByCategory } from '.';
import Wrapper from '@components/common/wrapper';

import { GOODS_CATEGORIES } from '@constants/goods-categories';

interface Props {
  category: string;
}

export default function GoodsByCategory({ category }: Props) {
  const [filterCategory, setFilterCategory] = useState(category);

  const { data: goods, ref } = useFetchGoodsByCategory(filterCategory);

  const goodsContent = goods?.pages ?? [];

  return (
    <Wrapper className="w-10/12 m-auto pb-20">
      <GoodsCategories
        categories={GOODS_CATEGORIES}
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
      />
      <GoodsListByCategory goods={goodsContent} />
      {goods && <div ref={ref} />}
    </Wrapper>
  );
}
