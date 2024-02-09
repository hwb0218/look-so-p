import { Product } from '@src/lib/firebase/types';

export default function sortbyOptions(goods: Product[], sortingOption: string) {
  return goods.sort((a, b) => {
    switch (sortingOption) {
      case 'lowestPrice':
        return Number(a.productPrice) - Number(b.productPrice);
      case 'highestPrice':
        return Number(b.productPrice) - Number(a.productPrice);
      case 'latest':
        return b.updatedAt.seconds - a.updatedAt.seconds;
      default:
        return 0;
    }
  });
}
