import useOverlay from '@components/common/overlay/use-overlay';
import { useMemo, createContext, MouseEvent, PropsWithChildren, RefObject } from 'react';

interface NavMobileContext {
  overlayRef: RefObject<HTMLDivElement>;
  visible: boolean;
  isOpen: 'open' | 'closed';
  onShowOverlay: () => void;
  onHideOverlay: (e: MouseEvent<HTMLElement>, forceHide?: boolean) => void;
}

export const NavMobileContext = createContext<NavMobileContext | undefined>(undefined);

export default function NavMobileProvider({ children }: PropsWithChildren) {
  const { overlayRef, visible, isOpen, onShowOverlay, onHideOverlay } = useOverlay();

  const contextValue = useMemo(
    () => ({
      overlayRef,
      visible,
      isOpen,
      onShowOverlay,
      onHideOverlay,
    }),
    [overlayRef, visible, isOpen, onShowOverlay, onHideOverlay],
  );

  return <NavMobileContext.Provider value={contextValue}>{children}</NavMobileContext.Provider>;
}
