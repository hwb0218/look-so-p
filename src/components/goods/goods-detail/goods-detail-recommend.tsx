import React from 'react';

import useFetchRecommend from '@hooks/use-fetch-recommend-query';

import GoodsDetailRecommendItem from './goods-detail-recommend-item';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselDots,
} from '@components/ui/carousel';
import { Link, createSearchParams } from 'react-router-dom';
import { ROUTE_PATHS } from '@constants/routes';
import useCarouselApi from '@hooks/use-carousel-api';
import { queryClient } from '@src/main';
import { QUERY_KEYS } from '@constants/query-keys';
import { storeService } from '@src/lib/firebase/StoreService';

interface Props {
  category: string;
}

const GoodsDetailRecommend = ({ category }: Props) => {
  const { data: recommend } = useFetchRecommend(category);

  const { count, current, onScrollTo, setApi } = useCarouselApi();

  return (
    <>
      <Carousel setApi={setApi} opts={{ skipSnaps: true, loop: true }} className="w-full">
        <CarouselContent className="-ml-1">
          {recommend?.map((recommendItem) => (
            <CarouselItem key={recommendItem.id} className="pl-1 basis-1/3">
              <Link
                to={{
                  pathname: ROUTE_PATHS.GOODS_DETAIL(recommendItem.id),
                  search: `?${createSearchParams({ category: recommendItem.productCategory.trim() })}`,
                }}
                replace={true}
                onMouseEnter={async () => {
                  await queryClient.prefetchQuery({
                    queryKey: QUERY_KEYS.GOODS.BY_ID(recommendItem.id),
                    queryFn: () => storeService.getGoodsById(recommendItem.id),
                  });
                }}
              >
                <GoodsDetailRecommendItem recommendItem={recommendItem} />
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <CarouselDots count={count} current={current} onScrollTo={onScrollTo} />
    </>
  );
};

export default React.memo(GoodsDetailRecommend);
