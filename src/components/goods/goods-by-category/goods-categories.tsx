import { Li, Ul } from '@components/common/list';

import { GOODS_CATEGORIES } from '@constants/goods-categories';

interface Props {
  categories: typeof GOODS_CATEGORIES;
  filterCategory: string;
  setFilterCategory: React.Dispatch<React.SetStateAction<string>>;
}

export default function GoodsCategories({ categories, filterCategory, setFilterCategory }: Props) {
  const handleClickCategory = (category: string) => {
    setFilterCategory(category);
  };

  return (
    <Ul className="w-full py-6 text-center relative px-12 break-keep">
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
