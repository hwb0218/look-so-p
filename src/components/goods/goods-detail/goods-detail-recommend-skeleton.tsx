import GoodsItemSkeletonCard from '../goods-item-card/goods-item-skeleton-card';

import Wrapper from '@components/common/ui/wrapper';
import { Ul } from '@components/common/ui/list';

export default function GoodsDetailRecommendSkeleton() {
  return (
    <Wrapper className="w-full">
      <Ul className="justify-normal items-baseline grid grid-cols-3 gap-x-[1px]">
        {[...Array(3)].map((item) => (
          <GoodsItemSkeletonCard key={item} />
        ))}
      </Ul>
    </Wrapper>
  );
}
