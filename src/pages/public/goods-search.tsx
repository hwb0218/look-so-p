import { GoodsSearch as GoodsSearchComponent } from '@components/goods/goods-serach';

import { useSearchBarContext } from '@providers/search-bar';
import useFetchSearchGoodsQuery from '@hooks/use-fetch-search-goods-query';

import { Footer } from '@components/footer';
import { WithQueryAsyncBoundary } from '@components/common/with-query-async-boundary';
import Spinner from '@components/common/spinner/spinner';

function GoodsSearch() {
  const { data: firstGoods } = useFetchSearchGoodsQuery();

  const { searchGoods } = useSearchBarContext();

  const goods = searchGoods.length <= 0 ? firstGoods : searchGoods;

  if (!goods) {
    return null;
  }

  return (
    <>
      <GoodsSearchComponent goods={goods} />
      <Footer />
    </>
  );
}

const GoodsSearchPage = WithQueryAsyncBoundary(GoodsSearch, {
  pendingFallback: <Spinner />,
  rejectedFallback: <span>에러가 발생했습니다</span>,
});

export default GoodsSearchPage;
