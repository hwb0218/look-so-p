import { useState } from 'react';

import useFetchGoodsById from '@hooks/use-fetch-goods-by-id';

import Wrapper from '@components/common/wrapper';
import { GoodsItemCard } from '../goods-item-card';

import numberFormat from '@src/utils/number-format';

interface Props {
  productId: string;
}

export default function GoodsDetail({ productId }: Props) {
  const [goodsCount, setGoodsCount] = useState(1);

  const { data: goods } = useFetchGoodsById(productId);

  if (!goods) {
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
    <Wrapper className="w-10/12 m-auto pt-6 pb-20">
      <div className="flex justify-center gap-x-6 m-auto">
        <div className="w-full max-w-md">
          <GoodsItemCard src={goods.thumbnail} />
        </div>
        <div className="w-1/4 max-w-[576px] min-w-80 border-t border-t-black">
          <div className="pt-10 mb-3">
            <h3 className="text-lg">{goods.productName}</h3>
          </div>
          <div>
            <ul>
              <li>
                <small className="inline-block w-full max-w-20">판매가</small>
                <strong>{numberFormat(goods.productPrice)}원</strong>
              </li>
              <li>
                <small className="inline-block w-full max-w-20">수량</small>
                <span>{numberFormat(goods.productQuantity)}개</span>
              </li>
            </ul>
          </div>
          <table className="my-4 border-t break-keep">
            <colgroup>
              <col className="w-[284px]" />
              <col className="w-[118px]" />
              <col className="w-[95px]" />
            </colgroup>
            <tbody>
              <tr>
                <td>
                  <small>{goods?.productName}</small>
                </td>
                <td className="pt-2">
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
                </td>
                <td className="text-right text-sm">
                  <strong>{numberFormat(goods.productPrice * goodsCount)}원</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Wrapper>
  );
}
