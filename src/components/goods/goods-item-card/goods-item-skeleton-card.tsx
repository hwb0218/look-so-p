import Wrapper from '@components/common/wrapper';

import { Skeleton } from '@components/ui/skeleton';

export default function GoodsItemSkeletonCard() {
  return (
    <Wrapper className="pt-[100%] relative w-full">
      <Wrapper className="absolute inset-0 border-0 overflow-hidden">
        <span className="p-0 aspect-square flex items-center justify-center">
          <Skeleton className="min-w-full min-h-full max-w-full max-h-full w-0 h-0" />
        </span>
      </Wrapper>
    </Wrapper>
  );
}
