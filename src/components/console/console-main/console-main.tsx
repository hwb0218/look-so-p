import { Li, Ul } from '@components/common/list';

import { type Product } from '@src/apis/console';

interface Props {
  products: Product[];
}

export default function ConsoleMain({ products }: Props) {
  return (
    <Ul className="flex flex-col">
      {products.map((product) => (
        <Li>{product.productName}</Li>
      ))}
    </Ul>
  );
}
