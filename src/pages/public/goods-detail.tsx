import { useParams, useSearchParams } from 'react-router-dom';

import { GoodsDetail as GoodsDetailComponent } from '@components/goods/goods-detail';
import WithQueryAsyncBoundary from '@components/common/with-query-async-boundary/with-query-async-boundary';

function GoodsDetail() {
  const { id } = useParams() as { id: string };
  const [params] = useSearchParams();

  const category = params.get('category') ?? '';

  return <GoodsDetailComponent productId={id} category={category} />;
}

const GoodsDetailPage = WithQueryAsyncBoundary(GoodsDetail, {
  pendingFallback: <div>GoodsDetailPage 로딩 중...</div>,
});

export default GoodsDetailPage;
