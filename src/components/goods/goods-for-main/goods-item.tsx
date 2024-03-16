import { useRef } from 'react';
import { Link, createSearchParams } from 'react-router-dom';
import { storeService } from '@src/lib/firebase/StoreService';
import Autoplay from 'embla-carousel-autoplay';

import { queryClient } from '@providers/index';

import { GoodsItemCard } from '../goods-item-card';

import { Li } from '@components/common/ui/list';
import { Carousel, CarouselContent, CarouselItem } from '@components/ui/carousel';

import numberFormat from '@src/utils/number-format';

import { ROUTE_PATHS } from '@constants/routes';
import { QUERY_KEYS } from '@constants/query-keys';

import type { Product } from '@src/lib/firebase/types';

interface Props {
  goods: Product;
}

export default function GoodsItem({ goods }: Props) {
  const plugin = useRef(Autoplay({ delay: 2000, playOnInit: false }));

  const handleMouseEnter = () => {
    plugin.current.play();
  };

  const handleMouseLeave = () => {
    plugin.current.stop();
  };

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
        <Carousel
          opts={{ loop: true }}
          plugins={[plugin.current]}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="w-full"
        >
          <CarouselContent>
            {[goods.thumbnail, ...goods.images].map((src) => (
              <CarouselItem key={src}>
                <GoodsItemCard src={src} alt="" className="transform-gpu duration-200 hover:scale-105" />
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
