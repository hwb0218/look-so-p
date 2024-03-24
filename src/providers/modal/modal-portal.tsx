import useModalContext from '@providers/modal/use-modal-context';

import Portal from '@components/common/portal/portal';

export default function ModalPortal() {
  const { modalContent, isOpen } = useModalContext();

  return modalContent && <Portal isOpen={isOpen}>{modalContent}</Portal>;
}
