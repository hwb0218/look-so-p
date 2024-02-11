import { useParams } from 'react-router-dom';

import { GoodsDetail } from '@components/goods/goods-detail';

export default function GoodsDetailPage() {
  const { id } = useParams() as { id: string };

  return <GoodsDetail productId={id} />;
}
