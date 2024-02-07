import { useState } from 'react';

export default function useFilterCategory() {
  const [filterCategory, setFilterCategory] = useState<string>('toner');

  return {
    filterCategory,
    setFilterCategory,
  };
}
