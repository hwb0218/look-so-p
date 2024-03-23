import { useNavMobileContext } from '@providers/nav-mobile';

import { Overlay } from '@components/common/overlay';
import { Ul, Li } from '@components/common/ui/list';

function GlobalNavMobile() {
  const { overlayRef, visible, isOpen, onHideOverlay } = useNavMobileContext();

  return (
    <Overlay ref={overlayRef} visible={visible} isOpen={isOpen} onClick={onHideOverlay}>
      <div
        className={`${visible ? 'translate-x-full' : '-translate-x-full'} transform-gpu p-5 h-screen w-96 fixed top-0 bottom-0 right-full z-[9999] transition-all duration-500`}
      >
        <aside className="relative h-full w-full rounded-md bg-white">
          <div className="h-full w-full flex flex-col">
            <div>로고</div>
            <div>로그인/회원가입</div>
            <hr />
            <Ul>
              <Li>카테고리 리스트</Li>
            </Ul>
          </div>
        </aside>
      </div>
    </Overlay>
  );
}

export default GlobalNavMobile;
