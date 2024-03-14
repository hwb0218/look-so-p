import { Goods } from '@components/goods';
import { Meta } from '@components/common/meta';
import { Footer } from '@components/footer';

import { ROUTE_PATHS } from '@constants/routes';

function HomePage() {
  return (
    <>
      <Meta title="LookSoPrt" url={ROUTE_PATHS.HOME} desc="LookSoPrt" />
      <Goods />
      <Footer />
    </>
  );
}

export default HomePage;
