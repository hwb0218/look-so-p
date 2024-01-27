import { PropsWithChildren } from 'react';
import { cn } from '@src/lib/utils';

interface Props {
  className?: string;
}

function Wrapper({ className, children }: PropsWithChildren<Props>) {
  return <div className={cn(className)}>{children}</div>;
}

export default Wrapper;
