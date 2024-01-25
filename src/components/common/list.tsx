import { PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';

interface Props {
  className?: string;
}

const Ul = ({ className, children }: PropsWithChildren<Props>) => {
  return <ul className={cn('flex items-center justify-center', className)}>{children}</ul>;
};

const Li = ({ className, children }: PropsWithChildren<Props>) => {
  return <li className={cn(className)}>{children}</li>;
};

export { Ul, Li };
