import { useState } from 'react';

import { GoodsCategoryList } from '.';

import Wrapper from '@components/common/wrapper';

import { GOODS_CATEGORIES } from '@constants/goods-categories';

interface Props {
  category: string;
}

export default function GoodsByCategory({ category }: Props) {
  const [filterCategory, setFilterCategory] = useState(category);

  return (
    <Wrapper className="w-10/12 pt-6 m-auto">
      <GoodsCategoryList
        categories={GOODS_CATEGORIES}
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
      />
    </Wrapper>
  );
}
