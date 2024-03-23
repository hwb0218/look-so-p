import { useCallback, useEffect, useRef, useState } from 'react';

export default function useOverlay() {
  const [isOpen, setIsOpen] = useState<'open' | 'closed'>('closed');
  const [visible, setVisible] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen === 'open') {
      document.body.style.overflowY = 'hidden';
      setVisible(true);
    } else {
      document.body.style.overflowY = '';
    }
  }, [isOpen]);

  const onShowOverlay = useCallback(() => {
    setIsOpen('open');
  }, []);

  const onHideOverlay = useCallback((e: React.MouseEvent<HTMLElement>, forceHide = false) => {
    if (forceHide || overlayRef.current === e.target) {
      setVisible(false);
      setTimeout(() => {
        setIsOpen('closed');
      }, 250);
    }
  }, []);

  return {
    overlayRef,
    isOpen,
    visible,
    onShowOverlay,
    onHideOverlay,
  };
}
