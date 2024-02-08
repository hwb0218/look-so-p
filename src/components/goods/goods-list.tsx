import { createSearchParams, useNavigate } from 'react-router-dom';

import GoodsItem from './goods-item';

import { Ul } from '@components/common/list';

import { ROUTE_PATHS } from '@constants/routes';

import { Product } from '@src/lib/firebase/types';
import { GoodsCategories } from './types';

interface Props {
  categories: GoodsCategories;
  goodsByCategory?: {
    [category: string]: Product[];
  };
}

export default function GoodsList({ categories, goodsByCategory }: Props) {
  const navigate = useNavigate();

  const handleClickMore = (category: string) => {
    navigate({
      pathname: ROUTE_PATHS.GOODS_LIST,
      search: `?${createSearchParams({ category: category.trim() })}`,
    });
  };

  return (
    <article className="flex-col items-start p-3">
      {categories.map(({ value, title }) => (
        <section key={value} className="mb-10">
          <div className="relative">
            <h3 className="pb-10 text-2xl text-center">{title}</h3>
            <span className="absolute top-0 right-0 cursor-pointer" onClick={() => handleClickMore(value)}>
              + More
            </span>
          </div>
          <Ul className="gap-x-6">
            {goodsByCategory && goodsByCategory[value]?.map((goods) => <GoodsItem key={goods.id} goods={goods} />)}
          </Ul>
        </section>
      ))}
    </article>
  );
}
