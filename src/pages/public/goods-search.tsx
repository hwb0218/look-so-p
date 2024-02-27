import { GoodsSearch as GoodsSearchComponent } from '@components/goods/goods-serach';

import Spinner from '@components/common/spinner/spinner';
import { WithQueryAsyncBoundary } from '@components/common/with-query-async-boundary';
import useFetchSearchGoodsQuery from '@hooks/use-fetch-search-goods-query';
import { useSearchBarContext } from '@providers/search-bar';

function GoodsSearch() {
  const { data: firstGoods } = useFetchSearchGoodsQuery();

  const { searchGoods } = useSearchBarContext();

  const goods = searchGoods.length <= 0 ? firstGoods : searchGoods;

  if (!goods) {
    return null;
  }

  return <GoodsSearchComponent goods={goods} />;
}

const GoodsSearchPage = WithQueryAsyncBoundary(GoodsSearch, {
  pendingFallback: <Spinner />,
  rejectedFallback: <span>에러가 발생했습니다</span>,
});

export default GoodsSearchPage;
