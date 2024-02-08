import { useState } from 'react';

export default function useFilterCategory(category: string) {
  const [filterCategory, setFilterCategory] = useState<string>(category);

  return {
    filterCategory,
    setFilterCategory,
  };
}
