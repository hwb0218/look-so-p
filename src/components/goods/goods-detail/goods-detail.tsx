import { Suspense } from 'react';

import { GoodsDetailRecommend, GoodsDetailImages, GoodsDetailMetadata, GoodsDetailRecommendSkeleton } from '.';

import { Meta } from '@components/common/meta';
import Wrapper from '@components/common/ui/wrapper';

import { ROUTE_PATHS } from '@constants/routes';

import { type Product } from '@src/lib/firebase/types';

interface Props {
  goods: Product;
  productId: string;
  category: string;
}

export default function GoodsDetail({ goods, productId, category }: Props) {
  return (
    <>
      <Meta
        title={`${goods.productName} - LookSoPrt`}
        url={ROUTE_PATHS.GOODS_DETAIL(productId)}
        desc={`${goods.productName}`}
      />
      <Wrapper className="w-full flex flex-col justify-center items-center p-20">
        <div className="w-full h-full flex justify-center gap-x-6">
          <GoodsDetailImages goods={goods} />
          <GoodsDetailMetadata goods={goods} productId={productId} />
        </div>
        <Wrapper className="w-full max-w-3xl mt-14">
          <h3 className="text-lg font-bold py-4">추천 상품</h3>
          <Suspense fallback={<GoodsDetailRecommendSkeleton />}>
            <GoodsDetailRecommend category={category} />
          </Suspense>
        </Wrapper>
      </Wrapper>
    </>
  );
}
