import { useParams } from 'react-router-dom';

import useGetConsoleProducts from '@hooks/use-get-console-products';

import { ConsoleMain } from '@components/console';

export default function ConsoleMainPage() {
  const { id } = useParams() as { id: string };

  const { products } = useGetConsoleProducts(id);

  return <ConsoleMain products={products} />;
}
