import GoodsDetailRecommendItem from './goods-detail-recommend-item';

import { Product } from '@src/lib/firebase/types';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@components/ui/carousel';
import Wrapper from '@components/common/wrapper';

interface Props {
  recommend: Product[];
}

export default function GoodsDetailRecommend({ recommend }: Props) {
  return (
    <Wrapper className="flex flex-col justify-center mt-14">
      <h3 className="text-lg font-bold py-4">비슷한 상품</h3>
      <Carousel className="w-full max-w-3xl">
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
    </Wrapper>
  );
}
