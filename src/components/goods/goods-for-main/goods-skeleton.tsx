import GoodsItemSkeletonCard from '../goods-item-card/goods-item-skeleton-card';

import { Li, Ul } from '@components/common/ui/list';
import { Skeleton } from '@components/ui/skeleton';

export default function GoodsSkeleton() {
  return (
    <>
      {['클렌징', '토너/패드'].map((title) => (
        <section key={title} className="mb-24">
          <div className="mx-1 mb-2 flex justify-between items-center">
            <h3 className="text-2xl">{title}</h3>
            <span className="cursor-pointer">+ More</span>
          </div>
          <Ul className="justify-normal items-baseline grid grid-cols-4 gap-x-5">
            {Array.from({ length: 4 }, (_, i) => i).map((_, i) => (
              <Li key={i} className="w-full h-full">
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
