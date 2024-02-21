import { createPortal } from 'react-dom';

import useModalContext from '@providers/modal/use-modal-context';
import Wrapper from '@components/common/wrapper';
import { PropsWithChildren } from 'react';

export default function ModalPortal() {
  const { modalContent } = useModalContext();

  if (!modalContent) {
    return null;
  }

  const ModalWrapper = ({ children }: PropsWithChildren) => {
    return (
      <Wrapper className="flex justify-center items-center fixed inset-0 bg-stone-800/80 z-[9999]">{children}</Wrapper>
    );
  };

  return createPortal(<ModalWrapper>{modalContent}</ModalWrapper>, document.getElementById('overlay')!);
}
