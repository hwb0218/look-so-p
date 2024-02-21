import { useCallback, useState } from 'react';

export default function useOverlay() {
  const [expanded, setExpanded] = useState(false);

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
