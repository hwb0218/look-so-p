import { Goods } from '@components/goods';
import { Meta } from '@components/common/meta';

import { WithQueryAsyncBoundary } from '@components/common/with-query-async-boundary';
import Spinner from '@components/common/spinner/spinner';

import { ROUTE_PATHS } from '@constants/routes';

import ComponentThatMayError from '@components/common/error-boundary/test';

function Home() {
  return (
    <>
      <Meta title="LookSoPrt" url={ROUTE_PATHS.HOME} desc="LookSoPrt" />
      <ComponentThatMayError />
      <Goods />
    </>
  );
}

const HomePage = WithQueryAsyncBoundary(Home, {
  pendingFallback: <Spinner />,
  rejectedFallback: <span>에러가 발생했습니다</span>,
});

export default HomePage;
