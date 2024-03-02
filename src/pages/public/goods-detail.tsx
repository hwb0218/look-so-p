import { useParams, useSearchParams } from 'react-router-dom';

import useScrollToTop from '@hooks/use-scroll-to-top';

import { GoodsDetail as GoodsDetailComponent } from '@components/goods/goods-detail';
import { WithQueryAsyncBoundary } from '@components/common/with-query-async-boundary';
import Spinner from '@components/common/spinner/spinner';
import { Footer } from '@components/footer';

function GoodsDetail() {
  const { id } = useParams() as { id: string };
  const [params] = useSearchParams();

  useScrollToTop();

  const category = params.get('category') ?? '';

  return (
    <>
      <GoodsDetailComponent productId={id} category={category} />
      <Footer />
    </>
  );
}

const GoodsDetailPage = WithQueryAsyncBoundary(GoodsDetail, {
  pendingFallback: <Spinner />,
  rejectedFallback: <span>에러가 발생했습니다</span>,
});

export default GoodsDetailPage;
