import { PropsWithChildren, forwardRef } from 'react';
import { cn } from '@src/lib/utils';

interface Props {
  className?: string;
}

const Ul = forwardRef<HTMLUListElement, PropsWithChildren<Props>>(({ className, children }, ref) => {
  return (
    <ul ref={ref} className={cn('flex items-center justify-center', className)}>
      {children}
    </ul>
  );
});

const Li = forwardRef<HTMLLIElement, PropsWithChildren<Props>>(({ className = '', children = null, ...props }, ref) => {
  return (
    <li {...props} ref={ref} className={cn(className)}>
      {children}
    </li>
  );
});

export { Ul, Li };
