import { Meta } from '@components/common/meta';

import { ConsoleAddProduct } from '@components/console';
import { CONSOLE_ROUTE_PATHS } from '@constants/routes';
import { useParams } from 'react-router-dom';

export default function ConsoleAddProductPage() {
  const { id } = useParams() as { id: string };

  return (
    <>
      <Meta title="상품 등록 - LookSoPrt" url={CONSOLE_ROUTE_PATHS.PRODUCT_REGISTRATION(id)} desc="상품 등록" />
      <ConsoleAddProduct />
    </>
  );
}
