import { Meta } from '@components/common/meta';
import Spinner from '@components/common/spinner/spinner';
import { WithQueryAsyncBoundary } from '@components/common/with-query-async-boundary';

import { ConsoleAddProduct as ConsoleAddProductComponent } from '@components/console';
import { CONSOLE_ROUTE_PATHS } from '@constants/routes';
import { useParams } from 'react-router-dom';

function ConsoleAddProduct() {
  const { id } = useParams() as { id: string };

  return (
    <>
      <Meta title="상품 등록 - LookSoPrt" url={CONSOLE_ROUTE_PATHS.PRODUCT_REGISTRATION(id)} desc="상품 등록" />
      <ConsoleAddProductComponent />
    </>
  );
}

const ConsoleAddProductPage = WithQueryAsyncBoundary(ConsoleAddProduct, {
  pendingFallback: <Spinner />,
  rejectedFallback: <span>에러가 발생했습니다</span>,
});

export default ConsoleAddProductPage;
