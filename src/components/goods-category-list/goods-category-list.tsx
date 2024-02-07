import { useNavigate, createSearchParams } from 'react-router-dom';

import { Li, Ul } from '@components/common/list';

import { GOODS_CATEGORIES } from '@constants/goods-categories';
import { ROUTE_PATHS } from '@constants/routes';

interface Props {
  categories: typeof GOODS_CATEGORIES;
  filterCategory: string;
  setFilterCategory: React.Dispatch<React.SetStateAction<string>>;
}

export default function GoodsCategoryList({ categories, filterCategory, setFilterCategory }: Props) {
  const navigate = useNavigate();

  const handleClickCategory = (category: string) => {
    setFilterCategory(category);
  };

  const handleClickMore = (category: string) => {
    navigate({
      pathname: ROUTE_PATHS.GOODS_LIST,
      search: `?${createSearchParams({ category: category.trim() })}`,
    });
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
      <Li className="absolute right-0 cursor-pointer" onClick={() => handleClickMore(filterCategory)}>
        + More
      </Li>
    </Ul>
  );
}
