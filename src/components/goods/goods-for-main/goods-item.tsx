import { Link, createSearchParams } from 'react-router-dom';
import { storeService } from '@src/lib/firebase/StoreService';

import { GoodsItemCard } from '../goods-item-card';

import { Li } from '@components/common/ui/list';
import { Carousel, CarouselContent, CarouselItem } from '@components/ui/carousel';

import { Product } from '@src/lib/firebase/types';

import numberFormat from '@src/utils/number-format';

import { ROUTE_PATHS } from '@constants/routes';
import { queryClient } from '@src/main';
import { QUERY_KEYS } from '@constants/query-keys';

interface Props {
  goods: Product;
}

export default function GoodsItem({ goods }: Props) {
  return (
    <Li className="w-full h-full">
      <Link
        to={{
          pathname: ROUTE_PATHS.GOODS_DETAIL(goods.id),
          search: `?${createSearchParams({ category: goods.productCategory.trim() })}`,
        }}
        key={goods.id}
        onMouseEnter={async () => {
          await queryClient.prefetchQuery({
            queryKey: QUERY_KEYS.GOODS.BY_ID(goods.id),
            queryFn: () => storeService.getGoodsById(goods.id),
          });
        }}
      >
        <Carousel className="w-full">
          <CarouselContent>
            {[goods.thumbnail, ...goods.images].map((src) => (
              <CarouselItem key={src}>
                <GoodsItemCard src={src} alt="" />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="mt-1 text-sm">{goods.productName}</div>
        <div className="mt-1">
          <strong>{numberFormat(Number(goods.productPrice))}</strong>원
        </div>
      </Link>
    </Li>
  );
}
