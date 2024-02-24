import React from 'react';
import { cn } from '@src/lib/utils';

const Wrapper = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn(className)} {...props}>
      {children}
    </div>
  ),
);
Wrapper.displayName = 'Wrapper';

export default Wrapper;
