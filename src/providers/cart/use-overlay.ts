import { useCallback, useEffect, useState } from 'react';

export default function useOverlay() {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (expanded) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = '';
    }
  }, [expanded]);

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
  };
}
