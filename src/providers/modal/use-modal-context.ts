import { useContext, useEffect } from 'react';
import { ModalContext } from './modal-provider';

export default function useModalContext() {
  const context = useContext(ModalContext);

  useEffect(() => {
    if (context.modalContent) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [context.modalContent]);

  if (context === undefined) {
    throw new Error('ModalContext.Provider 내부에서 사용하세요.');
  }

  return context;
}
