import { useSearchParams } from 'react-router-dom';

import { GoodsByCategory } from '@components/goods';

export default function GoodsByCategoryPage() {
  const [params] = useSearchParams();
  const category = params.get('category') as string;

  return <GoodsByCategory category={category} />;
}
