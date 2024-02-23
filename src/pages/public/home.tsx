import { Goods } from '@components/goods';
import { Suspense } from 'react';

export default function HomePage() {
  return (
    <Suspense fallback={<div>홈 화면</div>}>
      <Goods />
    </Suspense>
  );
}
