import { useSearchParams } from 'react-router-dom';

import { Meta } from '@components/common/meta';
import { GoodsByCategory as GoodsByCategoryComponent } from '@components/goods';

import { ROUTE_PATHS } from '@constants/routes';
import { WithQueryAsyncBoundary } from '@components/common/with-query-async-boundary';
import Spinner from '@components/common/spinner/spinner';

function GoodsByCategory() {
  const [params] = useSearchParams();
  const category = params.get('category') as string;

  return (
    <>
      <Meta title={`${category} - LookSoPrt`} url={ROUTE_PATHS.HOME} desc={`${category}`} />
      <GoodsByCategoryComponent category={category} />
    </>
  );
}

const GoodsByCategoryPage = WithQueryAsyncBoundary(GoodsByCategory, {
  pendingFallback: <Spinner />,
  rejectedFallback: <span>에러가 발생했습니다</span>,
});

export default GoodsByCategoryPage;
