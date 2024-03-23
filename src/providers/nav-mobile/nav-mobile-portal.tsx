import Portal from '@components/common/portal/portal';
import { GlobalNavMobile } from '@components/layout/global-nav-layout/global-nav-mobile';
import { useNavMobileContext } from '.';

export default function NavMobilePotal() {
  const { isOpen } = useNavMobileContext();

  return (
    isOpen === 'open' && (
      <Portal isOpen={isOpen}>
        <GlobalNavMobile />
      </Portal>
    )
  );
}
