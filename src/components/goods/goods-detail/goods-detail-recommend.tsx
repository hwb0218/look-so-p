import React from 'react';

import useFetchRecommend from '@hooks/use-fetch-recommend-query';

import GoodsDetailRecommendItem from './goods-detail-recommend-item';

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@components/ui/carousel';

interface Props {
  category: string;
}

const GoodsDetailRecommend = ({ category }: Props) => {
  const { data: recommend } = useFetchRecommend(category);

  return (
    <>
      <Carousel className="w-full">
        <CarouselContent className="-ml-1">
          {recommend.map((recommendItem) => (
            <CarouselItem key={recommendItem.id} className="pl-1 basis-1/3">
              <GoodsDetailRecommendItem recommendItem={recommendItem} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  );
};

export default React.memo(GoodsDetailRecommend);
