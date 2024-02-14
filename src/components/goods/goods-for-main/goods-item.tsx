import { Link, createSearchParams } from 'react-router-dom';

import { GoodsItemCard } from '../goods-item-card';

import Wrapper from '@components/common/wrapper';
import { Li } from '@components/common/list';
import { Carousel, CarouselContent, CarouselItem } from '@components/ui/carousel';

import { Product } from '@src/lib/firebase/types';

import numberFormat from '@src/utils/number-format';

import { ROUTE_PATHS } from '@constants/routes';

interface Props {
  goods: Product;
}

export default function GoodsItem({ goods }: Props) {
  return (
    <Li className="flex">
      <Link
        to={{
          pathname: ROUTE_PATHS.GOODS_DETAIL(goods.id),
          search: `?${createSearchParams({ category: goods.productCategory.trim() })}`,
        }}
        key={goods.id}
      >
        <Carousel className="w-full max-w-xs">
          <CarouselContent>
            {[goods.thumbnail, ...goods.images].map((src) => (
              <CarouselItem key={src}>
                <GoodsItemCard src={src} alt="" />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <span className="text-sm">{goods.productName}</span>
        <Wrapper>
          <span>{`${numberFormat(Number(goods.productPrice))}원`}</span>
          <span className="float-right">{`${goods.productCategory}`}</span>
        </Wrapper>
      </Link>
    </Li>
  );
}
