import { Li, Ul } from '@components/common/ui/list';

import GoodsItemSkeletonCard from '../goods-item-card/goods-item-skeleton-card';
import Wrapper from '@components/common/ui/wrapper';
import { Skeleton } from '@components/ui/skeleton';

export default function GoodsByCategorySkeleton() {
  return (
    <Ul className="justify-normal items-baseline grid grid-cols-4 gap-x-5 gap-y-20">
      {[...Array(8)]?.map((_, i) => (
        <Li key={i} className="w-full">
          <GoodsItemSkeletonCard />
          <Wrapper className="pt-4">
            <Skeleton className="mt-1 max-w-[270px] w-full h-[20px]" />
            <Skeleton className="mt-1 max-w-[90px] w-full h-[24px]" />
          </Wrapper>
        </Li>
      ))}
    </Ul>
  );
}
