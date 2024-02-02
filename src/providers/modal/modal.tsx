import { createPortal } from 'react-dom';

import useModalContext from '@providers/modal/use-modal-context';

export default function Modal() {
  const { modalContent } = useModalContext();

  if (!modalContent) {
    return null;
  }

  return createPortal(modalContent, document.getElementById('overlay')!);
}
