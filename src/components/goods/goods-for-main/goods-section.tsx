import { createSearchParams, useNavigate } from 'react-router-dom';

import { GoodsItem } from '.';

import { Ul } from '@components/common/list';

import { Product } from '@src/lib/firebase/types';

import { ROUTE_PATHS } from '@constants/routes';

interface Props {
  category: string;
  title: string;
  goodsByCategory?: {
    [category: string]: Product[];
  };
}

export default function GoodsSection({ category, title, goodsByCategory }: Props) {
  const navigate = useNavigate();

  const handleClickMore = (category: string) => {
    navigate({
      pathname: ROUTE_PATHS.GOODS_LIST,
      search: `?${createSearchParams({ category: category.trim() })}`,
    });
  };

  return (
    <section className="mb-10">
      <div className="relative">
        <h3 className="pb-10 text-2xl text-center">{title}</h3>
        <span className="absolute top-0 right-0 cursor-pointer" onClick={() => handleClickMore(category)}>
          + More
        </span>
      </div>
      <Ul className="grid grid-cols-4 gap-x-6">
        {goodsByCategory && goodsByCategory[category]?.map((goods) => <GoodsItem key={goods.id} goods={goods} />)}
      </Ul>
    </section>
  );
}
