import { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  isOpen: 'open' | 'closed';
}

export default function Portal({ children, isOpen }: PropsWithChildren<Props>) {
  return createPortal(
    <div
      data-state={isOpen}
      className="fixed inset-0 z-[10000] bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
    >
      {children}
    </div>,
    document.getElementById('overlay')!,
  );
}
