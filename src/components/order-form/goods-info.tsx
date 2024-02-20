import Wrapper from '@components/common/wrapper';
import { CartGoods } from '@src/lib/firebase/types';
import numberFormat from '@src/utils/number-format';

interface Props {
  checkedGoods: CartGoods[];
}

export default function GoodsInfo({ checkedGoods }: Props) {
  return (
    <>
      <table className="w-full">
        <colgroup>
          <col />
          <col className="w-28" />
          <col className="w-28" />
          <col className="w-28" />
        </colgroup>
        <thead>
          <h2 className="pt-10 pb-1 text-xl">상품 정보</h2>
          <tr className="*:p-2 border-t-2 bg-gray-100">
            <th>상품정보</th>
            <th>판매가</th>
            <th>수량</th>
            <th>구매가</th>
          </tr>
        </thead>
        <tbody>
          {checkedGoods.map((item) => (
            <tr className="border-b *:text-center">
              <td className="px-4 py-6">
                <Wrapper>
                  <Wrapper className="flex items-center">
                    <span className="w-[80px] h-[80px]">
                      <img src={item.thumbnail} alt={item.productName} className="w-full h-full" />
                    </span>
                    <span className="ml-4">{item.productName}</span>
                  </Wrapper>
                </Wrapper>
              </td>
              <td>{numberFormat(item.productPrice)}원</td>
              <td>{item.goodsCount}</td>
              <td>{numberFormat(item.productPrice * item.goodsCount)}원</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
