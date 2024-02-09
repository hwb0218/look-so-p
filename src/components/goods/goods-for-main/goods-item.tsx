import { GoodsItemCard } from '../goods-item-card';

import Wrapper from '@components/common/wrapper';
import { Li } from '@components/common/list';
import { Carousel, CarouselContent, CarouselItem } from '@components/ui/carousel';

import { Product } from '@src/lib/firebase/types';

import numberFormat from '@src/utils/number-format';

interface Props {
  goods: Product;
}

export default function GoodsItem({ goods }: Props) {
  return (
    <Li className="flex">
      <div>
        <Carousel className="w-full max-w-xs">
          <CarouselContent>
            {[goods.thumbnail, ...goods.images].map((src) => (
              <CarouselItem key={src}>
                <GoodsItemCard src={src} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <span className="text-sm">{goods.productName}</span>
        <Wrapper>
          <span>{`${numberFormat(Number(goods.productPrice))}원`}</span>
          <span className="float-right">{`${goods.productCategory}`}</span>
        </Wrapper>
      </div>
    </Li>
  );
}
