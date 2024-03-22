import { useContext } from 'react';
import { ModalContext } from './modal-provider';

export default function useModalContext() {
  const context = useContext(ModalContext);

  if (context === undefined) {
    throw new Error('ModalContext.Provider 내부에서 사용하세요.');
  }

  return context;
}
