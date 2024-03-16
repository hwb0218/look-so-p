import { useState, createContext, useMemo, PropsWithChildren } from 'react';

import { queryClient } from '@providers/index';

import filterGoods from '@src/utils/filter-goods';

import { QUERY_KEYS } from '@constants/query-keys';

import type { Product } from '@src/lib/firebase/types';

interface SearchBarContextProps {
  isOpen: boolean;
  searchGoods: Product[];
  openSearchBar: () => void;
  closeSearchBar: () => void;
  filterSearchGoods: (query: string) => void;
}

export const SearchBarContext = createContext<SearchBarContextProps | undefined>(undefined);

export default function SearchBarProvider({ children }: PropsWithChildren) {
  const [searchGoods, setSearchGoods] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const openSearchBar = () => setIsOpen(true);
  const closeSearchBar = () => setIsOpen(false);

  const filterSearchGoods = (query: string) => {
    const queryKey = QUERY_KEYS.GOODS.SEARCH();
    const goods = queryClient.getQueryData<Product[]>(queryKey) ?? [];
    const filteredGoods = filterGoods(goods, { query });
    setSearchGoods(filteredGoods);
  };

  const contextValue = useMemo(
    () => ({ isOpen, searchGoods, openSearchBar, closeSearchBar, filterSearchGoods }),
    [isOpen, searchGoods],
  );

  return <SearchBarContext.Provider value={contextValue}>{children}</SearchBarContext.Provider>;
}
