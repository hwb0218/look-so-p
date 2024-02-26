import { forwardRef } from 'react';
import { cn } from '@src/lib/utils';

const Ul = forwardRef<HTMLUListElement, React.HTMLAttributes<HTMLUListElement>>(({ className, children }, ref) => {
  return (
    <ul ref={ref} className={cn('flex items-center justify-center', className)}>
      {children}
    </ul>
  );
});

const Li = forwardRef<HTMLLIElement, React.HTMLAttributes<HTMLLIElement>>(
  ({ className = '', children = null, ...props }, ref) => {
    return (
      <li {...props} ref={ref} className={cn(className)}>
        {children}
      </li>
    );
  },
);

export { Ul, Li };
