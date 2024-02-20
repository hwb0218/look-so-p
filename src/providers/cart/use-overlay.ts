import { useCallback, useEffect, useRef, useState } from 'react';

export default function useOverlay() {
  const [expanded, setExpanded] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onCloseCart = (e: globalThis.MouseEvent) => {
      const target = e.target as HTMLElement;

      if (overlayRef.current && overlayRef.current?.contains(target)) {
        setExpanded(false);
      }
    };

    window.addEventListener('click', onCloseCart);
    return () => {
      window.removeEventListener('click', onCloseCart);
      setExpanded(false);
    };
  }, [overlayRef]);

  const onOpenCart = useCallback(() => {
    setExpanded(true);
  }, []);

  const onCloseCart = useCallback(() => {
    setExpanded(false);
  }, []);

  return {
    expanded,
    onOpenCart,
    onCloseCart,
    overlayRef,
  };
}
