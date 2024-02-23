import type { ComponentType, ReactNode } from 'react';
import { Suspense } from 'react';
// import { useQueryErrorResetBoundary } from '@tanstack/react-query';

// import { ErrorBoundary } from '@components/common/error-boundary';

export default function WithQueryAsyncBoundary(
  Component: ComponentType<Record<string, unknown>>,
  {
    pendingFallback,
  }: {
    pendingFallback: ReactNode;
  },
) {
  const Wrapped = (props: Record<string, unknown>) => {
    // const { reset } = useQueryErrorResetBoundary();

    return (
      <Suspense fallback={pendingFallback}>
        <Component {...props} />
      </Suspense>
    );
  };

  return Wrapped;
}
