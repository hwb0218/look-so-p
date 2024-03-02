import type { PropsWithChildren, ReactNode } from 'react';
import { Suspense } from 'react';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';

import { ErrorBoundary } from '../error-boundary';
export default function WithQueryAsyncBoundary<T>(
  Component: React.ComponentType<T>,
  {
    pendingFallback,
    rejectedFallback,
  }: {
    pendingFallback: ReactNode;
    rejectedFallback: ReactNode;
  },
) {
  const Wrapped = (props: PropsWithChildren<T>) => {
    const { reset } = useQueryErrorResetBoundary();

    return (
      <ErrorBoundary rejectedFallback={rejectedFallback} reset={reset}>
        <Suspense fallback={pendingFallback}>
          <Component {...props} />
        </Suspense>
      </ErrorBoundary>
    );
  };

  return Wrapped;
}
