import { forwardRef, HTMLAttributes, MouseEvent } from 'react';

interface Props {
  expanded: boolean;
  onClick: (event: MouseEvent<HTMLElement>, forceHide?: boolean) => void;
}

const Overlay = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & Props>(
  ({ children, onClick, expanded }, ref) => {
    return (
      <div
        ref={ref}
        onClick={(e: MouseEvent<HTMLElement>) => onClick(e, false)}
        className={`fixed inset-0 transition-all duration-200 ${expanded ? 'bg-stone-800/80 z-[9998]' : '-z-[1] bg-transparent'}`}
      >
        {children}
      </div>
    );
  },
);

export default Overlay;
