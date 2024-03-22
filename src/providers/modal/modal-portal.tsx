import useModalContext from '@providers/modal/use-modal-context';

import Portal from '@components/common/portal/portal';

export default function ModalPortal() {
  const { modalContent } = useModalContext();

  if (!modalContent) {
    return null;
  }

  return <Portal>{modalContent}</Portal>;
}
