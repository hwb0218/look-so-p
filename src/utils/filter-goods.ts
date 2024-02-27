import { Product } from '@src/lib/firebase/types';

interface FilterConditions {
  query: string;
}

export default function filterGoods(goods: Product[], { query }: FilterConditions) {
  if (query.trim() === '') {
    return goods;
  }

  const contains = (goods: Product) => goods.productName.includes(query.trim().toLocaleLowerCase());

  return goods.filter(contains);
}
