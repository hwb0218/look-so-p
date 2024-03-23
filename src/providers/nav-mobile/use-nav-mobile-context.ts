import { useContext } from 'react';

import { NavMobileContext } from './nav-mobile-provider';

export default function useNavMobileContext() {
  const context = useContext(NavMobileContext);

  if (context === undefined) {
    throw new Error('NavMobileContext.Provider 내부에서 사용하세요.');
  }

  return context;
}
