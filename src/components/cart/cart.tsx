import { useCartContext } from '@providers/cart';

export default function Cart() {
  const { expanded } = useCartContext();
  return (
    <aside
      className={`fixed top-[73px] right-0 bottom-0 bg-white border-l shadow-sm z-[99] transition-all ${expanded ? 'w-80' : 'w-0'}`}
    ></aside>
  );
}
