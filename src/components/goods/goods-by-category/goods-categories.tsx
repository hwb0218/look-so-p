import React from 'react';

import { useSearchParams } from 'react-router-dom';

import { Li, Ul } from '@components/common/ui/list';

import { GOODS_CATEGORIES } from '@constants/goods-categories';

interface Props {
  categories: typeof GOODS_CATEGORIES;
  filterCategory: string;
  setFilterCategory: React.Dispatch<React.SetStateAction<string>>;
}

function GoodsCategories({ categories, filterCategory, setFilterCategory }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClickCategory = (category: string) => {
    searchParams.set('category', category);
    setSearchParams(searchParams);
    setFilterCategory(category);
  };

  return (
    <Ul className="w-full pt-12 pb-6 text-center relative px-12 break-keep">
      {categories.map(({ value, title }) => (
        <Li
          key={value}
          onClick={() => handleClickCategory(value)}
          className={`w-full cursor-pointer text-stone-500 hover:text-stone-900 ${value === filterCategory && 'text-stone-900 text-base font-bold'}`}
        >
          {title}
        </Li>
      ))}
    </Ul>
  );
}

export default React.memo(GoodsCategories);
