import { Li, Ul } from '@components/common/list';

import { GOODS_CATEGORIES } from '@constants/goods-categories';

interface Props {
  categories: typeof GOODS_CATEGORIES;
  filterCategory: string;
  setFilterCategory: React.Dispatch<React.SetStateAction<string>>;
}

export default function GoodsCategoryList({ categories, filterCategory, setFilterCategory }: Props) {
  const handleClickCategory = (category: string) => {
    setFilterCategory(category);
  };

  return (
    <Ul className="relative px-12 break-keep ">
      {categories.map(({ value, title }) => (
        <Li
          key={value}
          onClick={() => handleClickCategory(value)}
          className={`px-10 cursor-pointer text-stone-500 hover:text-stone-900 ${value === filterCategory && 'text-stone-900 font-bold'}`}
        >
          {title}
        </Li>
      ))}
    </Ul>
  );
}
