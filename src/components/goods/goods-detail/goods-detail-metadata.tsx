import { useState, useEffect } from 'react';

import useAddGoodsToCartQuery from '@hooks/use-fetch-cart-item-query';

import { useCartContext } from '@providers/cart';
import { useAuthContext } from '@providers/auth';

import Wrapper from '@components/common/ui/wrapper';
import { Button } from '@components/ui/button';

import numberFormat from '@src/utils/number-format';

import { type Product } from '@src/lib/firebase/types';

interface Props {
  goods: Product;
  productId: string;
}

export default function GoodsDetailMetadata({ goods, productId }: Props) {
  const [goodsCount, setGoodsCount] = useState(1);

  const { cart, onAddItemToCart, onShowOverlay } = useCartContext();
  const { state } = useAuthContext();
  const { uid } = state.auth;

  const { mutate: addGoodsToCart, data, isSuccess } = useAddGoodsToCartQuery();

  useEffect(() => {
    if (isSuccess && data) {
      onAddItemToCart(data);
      onShowOverlay();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isSuccess]);

  const handleClickGoodsCount = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = e.currentTarget;

    if (name === 'increase') {
      setGoodsCount((prevCount) => prevCount + 1);
    } else if (name === 'decrease' && goodsCount > 1) {
      setGoodsCount((prevCount) => prevCount - 1);
    }
  };

  const handleClickMyCart = () => {
    onShowOverlay();
  };

  const handleClickAddCart = () => {
    try {
      const values = {
        ...goods,
        productId,
        goodsCount,
        totalPrice: goodsCount * goods.productPrice,
      };
      addGoodsToCart({ goods: values, uid });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Wrapper className="w-1/4 max-w-[576px] min-w-96 border-t border-t-black">
      <div className="pt-10 mb-3">
        <h3 className="text-lg">{goods.productName}</h3>
      </div>
      <div>
        <ul className="my-3">
          <li>
            <small className="inline-block w-full max-w-20">판매가</small>
            <strong>{numberFormat(goods.productPrice)}원</strong>
          </li>
          <li>
            <small className="inline-block w-full max-w-20">수량</small>
            <span>{numberFormat(goods.productQuantity)}개</span>
          </li>
        </ul>
        <small>{goods.productDescription}</small>
      </div>
      <div className="flex justify-between items-center mt-4 border-t break-keep">
        <div>
          <small>{goods?.productName}</small>
        </div>
        <div className="pt-2">
          <span className="inline-block">
            <input type="text" value={goodsCount} readOnly className="float-left w-8 h-8 text-center text-sm border" />
            <span className="float-left">
              <button name="increase" onClick={handleClickGoodsCount} className="w-6 h-4 block leading-tight border">
                +
              </button>
              <button name="decrease" onClick={handleClickGoodsCount} className="w-6 h-4 block leading-tight border">
                -
              </button>
            </span>
          </span>
        </div>
        <div className="text-right text-sm w-full max-w-20">
          <strong>{numberFormat(goods.productPrice * goodsCount)}원</strong>
        </div>
      </div>
      <div className="flex justify-between mb-3">
        <span className="text-stone-800">총 합계금액</span>
        <strong>{numberFormat(goods.productPrice * goodsCount)}원</strong>
      </div>
      <div>
        {cart.some((item) => item.productId === productId) ? (
          <>
            <Button onClick={handleClickMyCart} className="mb-1 w-full h-12">
              나의 장바구니
            </Button>
            <small className="float-right pr-1">상품이 장바구니에 있습니다</small>
          </>
        ) : (
          <Button onClick={handleClickAddCart} className="w-full h-12">
            장바구니 추가
          </Button>
        )}
      </div>
    </Wrapper>
  );
}
