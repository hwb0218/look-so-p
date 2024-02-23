import GoodsItemSkeletonCard from '../goods-item-card/goods-item-skeleton-card';

import { Li, Ul } from '@components/common/list';
import { Skeleton } from '@components/ui/skeleton';

export default function GoodsSkeleton() {
  return (
    <>
      {[...Array(5)].map((item) => (
        <section key={item} className="mb-24">
          <div className="mx-1 mb-2 flex justify-between items-center">
            <Skeleton className="w-[110px] h-[32px]" />
            <span className="cursor-pointer">+ More</span>
          </div>
          <Ul className="justify-normal items-baseline grid grid-cols-4 gap-x-5">
            {[...Array(4)].map((item) => (
              <Li key={item} className="w-full h-full">
                <GoodsItemSkeletonCard />
                <Skeleton className="mt-1 max-w-[270px] w-full h-[20px]" />
                <Skeleton className="mt-1 max-w-[90px] w-full h-[24px]" />
              </Li>
            ))}
          </Ul>
        </section>
      ))}
    </>
  );
}
