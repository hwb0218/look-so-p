import Wrapper from '@components/common/ui/wrapper';

import { Skeleton } from '@components/ui/skeleton';

export default function GoodsItemSkeletonCard() {
  return (
    <Wrapper className="pt-[100%] relative w-full">
      <Wrapper className="absolute inset-0 border-0 overflow-hidden">
        <span className="p-0 aspect-square flex items-center justify-center">
          <Skeleton className="w-full h-full rounded-lg" />
        </span>
      </Wrapper>
    </Wrapper>
  );
}
