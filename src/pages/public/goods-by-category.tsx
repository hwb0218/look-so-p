import { useSearchParams } from 'react-router-dom';

import { Meta } from '@components/common/meta';
import { GoodsByCategory } from '@components/goods';

import { ROUTE_PATHS } from '@constants/routes';

export default function GoodsByCategoryPage() {
  const [params] = useSearchParams();
  const category = params.get('category') as string;

  return (
    <>
      <Meta title={`${category} - LookSoPrt`} url={ROUTE_PATHS.HOME} desc={`${category}`} />
      <GoodsByCategory category={category} />
    </>
  );
}
