import { createPortal } from 'react-dom';

import useModalContext from '@providers/modal/use-modal-context';
import Wrapper from '@components/common/ui/wrapper';
import { PropsWithChildren } from 'react';

export default function ModalPortal() {
  const { modalContent, isOpen } = useModalContext();

  if (!modalContent) {
    return null;
  }

  const ModalWrapper = ({ children }: PropsWithChildren) => {
    return (
      <Wrapper
        data-state={isOpen}
        className="fixed inset-0 z-[10000] bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
      >
        {children}
      </Wrapper>
    );
  };

  return createPortal(<ModalWrapper>{modalContent}</ModalWrapper>, document.getElementById('overlay')!);
}
