import { Carousel, CarouselContent, CarouselItem } from '@components/ui/carousel';
import { Card, CardContent } from '@components/ui/card';
import { Li } from '@components/common/list';
import Wrapper from '@components/common/wrapper';

import { Product } from '@src/lib/firebase/types';

import numberFormat from '@src/utils/number-format';

interface Props {
  goods: Product;
}

export default function GoodsItem({ goods }: Props) {
  return (
    <Li className="w-1/4">
      <Carousel className="w-full max-w-xs">
        <CarouselContent>
          {[goods.thumbnail, ...goods.images].map((src) => (
            <CarouselItem key={src}>
              <Wrapper className="p-1">
                <Card>
                  <CardContent className="p-0 flex aspect-square items-center justify-center">
                    <img src={src} alt={src} className="w-full h-full object-cover" />
                  </CardContent>
                </Card>
              </Wrapper>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <Wrapper>
        <span>{`[${goods.productCategory}]`}</span>
        <span>{goods.productName}</span>
      </Wrapper>
      <div>{`${numberFormat(Number(goods.productPrice))}원`}</div>
    </Li>
  );
}
