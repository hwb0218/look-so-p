import { Li, Ul } from '@components/common/list';
import { useAuthContext } from '@providers/auth';
import { useCartContext } from '@providers/cart';

export default function Cart() {
  const { state } = useAuthContext();
  const { expanded } = useCartContext();

  const { auth } = state;

  return (
    <aside
      className={`w-96 py-6 px-8 fixed top-[25px] bottom-[25px] ${expanded ? 'right-6' : '-right-96'} bottom-0 bg-white border-l shadow-sm z-[9999] transition-all overflow-auto rounded-md`}
    >
      <Ul className="flex flex-col justify-center item-center">
        {auth.cart?.map((cartItem) => <Li>{cartItem.productName}</Li>)}
      </Ul>
    </aside>
  );
}
