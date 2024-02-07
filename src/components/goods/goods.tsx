import useFetchGoods from '@hooks/use-fetch-goods';

import useFilterCategory from '@hooks/use-filter-category';

import GoodsCategories from '../goods-category-list/goods-category-list';
import GoodsList from './goods-list';

import Wrapper from '@components/common/wrapper';

import { GOODS_CATEGORIES } from '@constants/goods-categories';

export default function Goods() {
  const { data: goodsByCategory } = useFetchGoods(GOODS_CATEGORIES);

  const { filterCategory, setFilterCategory } = useFilterCategory();

  return (
    <Wrapper className="w-10/12 pt-6 m-auto">
      <GoodsCategories
        categories={GOODS_CATEGORIES}
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
      />
      <GoodsList goodsByCategory={goodsByCategory} filterCategory={filterCategory} />
    </Wrapper>
  );
}
