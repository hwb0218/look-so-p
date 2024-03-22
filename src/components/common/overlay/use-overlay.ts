import { useCallback, useEffect, useRef, useState } from 'react';

export default function useOverlay() {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (expanded) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = '';
    }
  }, [expanded]);

  const overlayRef = useRef<HTMLDivElement>(null);

  const onShowOverlay = useCallback(() => {
    setExpanded(true);
  }, []);

  const onHideOverlay = useCallback((e: React.MouseEvent<HTMLElement>, forceHide = false) => {
    if (forceHide || overlayRef.current === e.target) {
      setExpanded(false);
    }
  }, []);

  return {
    overlayRef,
    expanded,
    onShowOverlay,
    onHideOverlay,
  };
}
