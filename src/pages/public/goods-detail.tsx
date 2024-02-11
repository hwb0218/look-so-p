import { useParams, useSearchParams } from 'react-router-dom';

import { GoodsDetail } from '@components/goods/goods-detail';

export default function GoodsDetailPage() {
  const { id } = useParams() as { id: string };
  const [params] = useSearchParams();

  const category = params.get('category') ?? '';

  return <GoodsDetail productId={id} category={category} />;
}
