import { useCartContext } from '@providers/cart';

import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from '@components/ui/select';
import { Checkbox } from '@components/ui/checkbox';
import { Button } from '@components/ui/button';
import { Li, Ul } from '@components/common/list';
import Wrapper from '@components/common/wrapper';
import { GoodsItemCard } from '@components/goods/goods-item-card';

import numberFormat from '@src/utils/number-format';

import type { CartGoods } from '@src/lib/firebase/types';
import { useNavigate } from 'react-router-dom';
import { AUTH_ROUTE_PATHS } from '@constants/routes';

const SELECT_ITEMS = Array.from({ length: 10 }, (_, i) => String(i + 1));

export default function Cart() {
  const navigate = useNavigate();

  const {
    expanded,
    cart,
    checkedGoods,
    totalPrice,
    onCloseCart,
    onDeleteItemFromCart,
    onAllCheckedGoods,
    onToggleCartGoods,
    onChangeGoodsCount,
  } = useCartContext();

  const handleAllCheck = (checked: HTMLInputElement['checked']) => {
    onAllCheckedGoods(checked);
  };

  const handleToggleCartGoods = (cartGoods: CartGoods) => {
    onToggleCartGoods(cartGoods);
  };

  const handleClickDeleteItem = (cartGoodsId: string) => {
    if (window.confirm('상품을 삭제 하시겠습니까?')) {
      onDeleteItemFromCart(cartGoodsId);
    }
  };

  const handleGoodsCountChange = (cartGoods: CartGoods, goodsCount: string) => {
    onChangeGoodsCount(cartGoods, Number(goodsCount));
  };

  const handleClickPayment = async () => {
    onCloseCart();
    navigate(AUTH_ROUTE_PATHS.ORDER);
  };

  return (
    <aside
      className={`w-96 fixed top-[25px] bottom-[25px] ${expanded ? 'right-6' : '-right-96'} bottom-0 bg-white z-[9999] transition-all rounded-md`}
    >
      <Wrapper className="relative h-full flex flex-col">
        <Wrapper className="mb-3 px-8 py-4 flex items-center gap-x-2">
          <Checkbox
            id="all"
            checked={checkedGoods.length === cart.length && checkedGoods.length > 0}
            onCheckedChange={handleAllCheck}
            className="rounded-md border-slate-100 bg-white h-6 w-6 data-[state=checked]:bg-lime-400 data-[state=checked]:border-none"
          />
          <label htmlFor="all" className="text-sm">
            전체
          </label>
        </Wrapper>
        <Ul className="mb-[80px] pb-[40px] flex-col justify-normal overflow-y-scroll scrollbar-none">
          {cart?.map((cartGoods) => (
            <Li key={cartGoods.id} className="flex flex-col w-full pb-8 px-8">
              <Wrapper className="flex">
                <label
                  htmlFor={`goods-${cartGoods.id}`}
                  className="relative leading-none text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 select-none"
                >
                  <Checkbox
                    id={`goods-${cartGoods.id}`}
                    checked={checkedGoods.some((goods) => goods.id === cartGoods.id)}
                    onCheckedChange={() => handleToggleCartGoods(cartGoods)}
                    className="absolute left-0 top-0 rounded-md border-slate-100 bg-white h-6 w-6 data-[state=checked]:bg-lime-400 data-[state=checked]:border-none"
                  />
                  <Wrapper className="w-[100px] h-[100px]">
                    <GoodsItemCard src={cartGoods.thumbnail} alt={cartGoods.productName} />
                  </Wrapper>
                </label>
                <Wrapper className="ml-3 w-full flex flex-col items-start">
                  <Wrapper className="ml-auto">
                    <button onClick={() => handleClickDeleteItem(cartGoods.id)}>
                      <img src="/close_MD.svg" alt="close" />
                    </button>
                  </Wrapper>
                  <span>{cartGoods.productName}</span>
                </Wrapper>
              </Wrapper>
              <Wrapper className="pt-3 pb-4 flex items-center justify-between">
                <Select
                  defaultValue={cartGoods.goodsCount.toString()}
                  value={cartGoods.goodsCount.toString()}
                  onValueChange={(goodsCount) => handleGoodsCountChange(cartGoods, goodsCount)}
                >
                  <SelectTrigger className="w-[100px]">
                    <SelectValue>{cartGoods.goodsCount}</SelectValue>
                  </SelectTrigger>
                  <SelectContent className="min-w-[100px] z-[1000000]">
                    {SELECT_ITEMS.map((number) => (
                      <SelectItem key={number} value={number}>
                        {number}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <strong>{numberFormat(cartGoods.productPrice * cartGoods.goodsCount)}원</strong>
              </Wrapper>
            </Li>
          ))}
          <Wrapper className="absolute bottom-0 left-0 right-0 bg-white py-6 px-8 w-full rounded-b-md border-t border-stone-200 ">
            <Wrapper className="flex justify-between">
              <span>최종 결제금액</span>
              <strong className="text-lg">{numberFormat(totalPrice)}원</strong>
            </Wrapper>
            <Wrapper className="pt-3">
              <Button className="w-full" onClick={handleClickPayment}>
                주문하기
              </Button>
            </Wrapper>
          </Wrapper>
        </Ul>
      </Wrapper>
    </aside>
  );
}
