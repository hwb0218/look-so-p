import { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

export default function Portal({ children }: PropsWithChildren) {
  // TODO: 너 내일 여기부터 해라!
  const PortalWrapper = ({ children }: PropsWithChildren) => {
    return (
      <div
        // data-state={isOpen}
        className="fixed inset-0 z-[10000] bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
      >
        {children}
      </div>
    );
  };

  return createPortal(<PortalWrapper>{children}</PortalWrapper>, document.getElementById('overlay')!);
}
