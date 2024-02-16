import { useState } from 'react';

import useFetchGoodsById from '@hooks/use-fetch-goods-by-id';
import useFetchRecommend from '@hooks/use-fetch-recommend';
import useAddGoodsToCartQuery from '@hooks/use-fetch-cart-item-query';

import { useAuthContext } from '@providers/auth';
import { useCartContext } from '@providers/cart';

import { Button } from '@components/ui/button';
import Wrapper from '@components/common/wrapper';

import { GoodsItemCard } from '../goods-item-card';
import GoodsDetailRecommend from './goods-detail-recommend';

import numberFormat from '@src/utils/number-format';

interface Props {
  productId: string;
  category: string;
}

export default function GoodsDetail({ productId, category }: Props) {
  const [goodsCount, setGoodsCount] = useState(1);

  const { cart, onAddItemToCart, onOpenCart } = useCartContext();
  const { state } = useAuthContext();
  const { uid } = state.auth;

  const { data: goods } = useFetchGoodsById(productId);
  const { data: recommend } = useFetchRecommend(category);
  const { mutate: addGoodsToCart } = useAddGoodsToCartQuery();

  if (!goods || !recommend) {
    return <p>상품 정보 없을 때..!</p>;
  }

  const handleClickGoodsCount = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = e.currentTarget;

    if (name === 'increase') {
      setGoodsCount((prevCount) => prevCount + 1);
    } else if (name === 'decrease' && goodsCount > 1) {
      setGoodsCount((prevCount) => prevCount - 1);
    }
  };

  const handleClickMyCart = (e: React.MouseEvent) => {
    onOpenCart(e);
  };

  const handleClickAddCart = (e: React.MouseEvent) => {
    try {
      const values = {
        ...goods,
        productId,
        goodsCount,
      };
      addGoodsToCart({ goods: values, uid });
      onAddItemToCart(values);
      onOpenCart(e);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper className="w-full flex flex-col justify-center items-center p-20">
      <div className="flex justify-center gap-x-6">
        <div className="w-full max-w-sm">
          <GoodsItemCard src={goods.thumbnail} alt={goods.productName} />
        </div>
        <div className="w-1/4 max-w-[576px] min-w-96 border-t border-t-black">
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
                <input
                  type="text"
                  value={goodsCount}
                  readOnly
                  className="float-left w-8 h-8 text-center text-sm border"
                />
                <span className="float-left">
                  <button
                    name="increase"
                    onClick={handleClickGoodsCount}
                    className="w-6 h-4 block leading-tight border"
                  >
                    +
                  </button>
                  <button
                    name="decrease"
                    onClick={handleClickGoodsCount}
                    className="w-6 h-4 block leading-tight border"
                  >
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
                <small className="float-right mb-1 pr-1">상품이 장바구니에 있습니다</small>
                <Button onClick={handleClickMyCart} className="w-full h-12">
                  나의 장바구니
                </Button>
              </>
            ) : (
              <Button onClick={handleClickAddCart} className="w-full h-12">
                장바구니 추가
              </Button>
            )}
          </div>
        </div>
      </div>
      <GoodsDetailRecommend recommend={recommend} />
    </Wrapper>
  );
}
