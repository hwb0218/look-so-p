import { useCallback, useEffect, useRef, useState } from 'react';

export default function useOverlay() {
  const [expanded, setExpanded] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onCloseCart = (e: globalThis.MouseEvent) => {
      const target = e.target as HTMLElement;

      if (expanded && overlayRef.current?.contains(target)) {
        document.body.classList.remove('overflow-hidden');
        setExpanded(false);
      }
    };

    window.addEventListener('click', onCloseCart);
    return () => {
      window.removeEventListener('click', onCloseCart);
    };
  }, [expanded]);

  const onOpenCart = useCallback(() => {
    document.body.classList.add('overflow-hidden');
    setExpanded(true);
  }, []);

  return {
    expanded,
    onOpenCart,
    overlayRef,
  };
}
