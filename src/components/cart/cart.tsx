import { storeService } from '@src/lib/firebase/StoreService';

import { useCartContext } from '@providers/cart';
import { useAuthContext } from '@providers/auth';

import { Li, Ul } from '@components/common/list';
import Wrapper from '@components/common/wrapper';
import { GoodsItemCard } from '@components/goods/goods-item-card';
import { Checkbox } from '@components/ui/checkbox';

import numberFormat from '@src/utils/number-format';

export default function Cart() {
  const { state } = useAuthContext();
  const { auth } = state;
  const { expanded, cart, onDeleteItemFromCart } = useCartContext();

  const handleClickDeleteItem = async (cartGoodsId: string) => {
    await storeService.deleteGoodsToCart(cartGoodsId, auth?.uid);
    onDeleteItemFromCart(cartGoodsId);
  };

  return (
    <aside
      className={`w-96 py-6 px-8 fixed top-[25px] bottom-[25px] ${expanded ? 'right-6' : '-right-96'} bottom-0 bg-white border-l shadow-sm z-[9999] transition-all overflow-auto rounded-md scrollbar-none`}
    >
      <Ul className="flex flex-col items-start gap-y-9">
        {cart?.map((cartItem) => (
          <Li className="flex flex-col w-full">
            <Wrapper className="py-2 flex items-center">
              <Checkbox
                id={`goods-${cartItem.id}`}
                className="h-6 w-6 data-[state=checked]:bg-lime-400 data-[state=checked]:border-none"
              />
              <label
                htmlFor={`goods-${cartItem.id}`}
                className="ml-2 leading-none text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 select-none"
              >
                {cartItem.productName}
              </label>
              <button className="ml-auto" onClick={() => handleClickDeleteItem(cartItem.id)}>
                <img src="/close_MD.svg" alt="close" />
              </button>
            </Wrapper>
            <Wrapper className="flex w-full">
              <Wrapper className="max-w-[100px] max-h-[100px]">
                <GoodsItemCard src={cartItem.thumbnail} alt={cartItem.productName} />
              </Wrapper>
              <Wrapper>
                <span>상품 수량 수정</span>
                <span>{numberFormat(cartItem.productPrice)}원</span>
              </Wrapper>
            </Wrapper>
          </Li>
        ))}
      </Ul>
    </aside>
  );
}
