import { useState } from 'react';

import useFetchGoodsById from '@hooks/use-fetch-goods-by-id';
import useFetchRecommend from '@hooks/use-fetch-recommend';

import Wrapper from '@components/common/wrapper';
import { GoodsItemCard } from '../goods-item-card';

import numberFormat from '@src/utils/number-format';
import GoodsDetailRecommend from './goods-detail-recommend';
import { Button } from '@components/ui/button';

interface Props {
  productId: string;
  category: string;
}

export default function GoodsDetail({ productId, category }: Props) {
  const [goodsCount, setGoodsCount] = useState(1);

  const { data: goods } = useFetchGoodsById(productId);
  const { data: recommend } = useFetchRecommend(category);

  if (!goods || !recommend) {
    return <p>상품 정보 없을 때..!</p>;
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = e.currentTarget;

    if (name === 'increase') {
      setGoodsCount((prevCount) => prevCount + 1);
    } else if (name === 'decrease' && goodsCount > 1) {
      setGoodsCount((prevCount) => prevCount - 1);
    }
  };

  return (
    <Wrapper className="flex flex-col items-center p-20">
      <div className="flex justify-center gap-x-6">
        <div className="w-full max-w-md">
          <GoodsItemCard src={goods.thumbnail} />
        </div>
        <div className="w-1/4 max-w-[576px] min-w-80 border-t border-t-black">
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
                  <button name="increase" onClick={handleClick} className="w-6 h-4 block leading-tight border">
                    +
                  </button>
                  <button name="decrease" onClick={handleClick} className="w-6 h-4 block leading-tight border">
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
            <Button className="w-full h-12">장바구니</Button>
          </div>
        </div>
      </div>
      <GoodsDetailRecommend recommend={recommend} />
    </Wrapper>
  );
}
