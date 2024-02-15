import { useState } from 'react';
import { storeService } from '@src/lib/firebase/StoreService';

import { useCartContext } from '@providers/cart';
import { useAuthContext } from '@providers/auth';

import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from '@components/ui/select';
import { Checkbox } from '@components/ui/checkbox';
import { Li, Ul } from '@components/common/list';
import Wrapper from '@components/common/wrapper';
import { GoodsItemCard } from '@components/goods/goods-item-card';

import numberFormat from '@src/utils/number-format';

const ONETOTEN = Array.from({ length: 10 }, (_, i) => String(i + 1));

export default function Cart() {
  const [goodsCount, setGoodsCount] = useState('1');

  const { state } = useAuthContext();
  const { auth } = state;
  const { expanded, cart, checkedGoods, onDeleteItemFromCart, onAllCheckedGoods, onToggleCartGoods } = useCartContext();

  const handleAllCheck = (checked: HTMLInputElement['checked']) => {
    onAllCheckedGoods(checked);
  };

  const handleToggleCartGoods = (cartGoodsId: string) => {
    onToggleCartGoods(cartGoodsId);
  };

  const handleClickDeleteItem = async (cartGoodsId: string) => {
    if (window.confirm('상품을 삭제 하시겠습니까?')) {
      await storeService.deleteGoodsToCart(cartGoodsId, auth?.uid);
      onDeleteItemFromCart(cartGoodsId);
    }
  };

  const handleGoodsCountChange = (value: string) => {
    setGoodsCount(value);
  };

  return (
    <aside
      className={`w-96 py-6 px-8 fixed top-[25px] bottom-[25px] ${expanded ? 'right-6' : '-right-96'} bottom-0 bg-white border-l shadow-sm z-[9999] transition-all overflow-auto rounded-md scrollbar-none`}
    >
      <Ul className="flex flex-col items-start gap-y-4">
        <Wrapper className="mb-3 flex items-center gap-x-2">
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
        {cart?.map((cartGoods) => (
          <Li className="flex flex-col w-full">
            <Wrapper className="flex">
              <label
                htmlFor={`goods-${cartGoods.id}`}
                className="relative leading-none text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 select-none"
              >
                <Checkbox
                  id={`goods-${cartGoods.id}`}
                  checked={checkedGoods.includes(cartGoods.id)}
                  onClick={() => handleToggleCartGoods(cartGoods.id)}
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
              <Select onValueChange={handleGoodsCountChange} value={goodsCount} defaultValue={goodsCount}>
                <SelectTrigger className="w-[100px]">
                  <SelectValue>{goodsCount}</SelectValue>
                </SelectTrigger>
                <SelectContent className="min-w-[100px] z-[1000000]">
                  {ONETOTEN.map((number) => (
                    <SelectItem key={number} value={number}>
                      {number}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <strong>{numberFormat(cartGoods.productPrice)}원</strong>
            </Wrapper>
          </Li>
        ))}
        <Wrapper>최종 결제금액</Wrapper>
      </Ul>
    </aside>
  );
}
