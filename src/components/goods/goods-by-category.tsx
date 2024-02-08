import { useSearchParams } from 'react-router-dom';

import { GoodsCategoryList } from '@components/goods-category-list';

import useFilterCategory from '@hooks/use-filter-category';

import Wrapper from '@components/common/wrapper';

import { GOODS_CATEGORIES } from '@constants/goods-categories';

export default function GoodsByCategory() {
  const [params] = useSearchParams();
  const category = params.get('category') as string;

  const { filterCategory, setFilterCategory } = useFilterCategory(category);

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
