import { useContext } from 'react';
import { SearchBarContext } from './search-bar-provider';

export default function useSearchBarContext() {
  const context = useContext(SearchBarContext);

  if (context === undefined) {
    throw new Error('SearchBarContext.Provider 내부에서 사용하세요.');
  }

  return context;
}
