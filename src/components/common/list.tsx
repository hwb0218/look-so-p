import { PropsWithChildren } from 'react';
import { cn } from '@src/lib/utils';

interface Props {
  className?: string;
}

const Ul = ({ className, children }: PropsWithChildren<Props>) => {
  return <ul className={cn('flex items-center justify-center', className)}>{children}</ul>;
};

const Li = ({ className, children, ...props }: React.HTMLAttributes<HTMLLIElement> & PropsWithChildren<Props>) => {
  return (
    <li {...props} className={cn(className)}>
      {children}
    </li>
  );
};

export { Ul, Li };
