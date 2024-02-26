import { useDeleteProductsMutation } from '@hooks/use-console-products-query';
import { useModalContext } from '@providers/modal';

import { ConsoleUpdateProduct } from '..';

import Wrapper from '@components/common/ui/wrapper';
import { Li, Ul } from '@components/common/ui/list';
import { Button } from '@components/ui/button';
import { GoodsItemCard } from '@components/goods/goods-item-card';

import dateFormat from '@src/utils/date-format';

import type { Product } from '@src/lib/firebase/types';

interface Props {
  products: Product[];
}

export default function ConsoleMain({ products }: Props) {
  const { mutate: deleteProduct } = useDeleteProductsMutation();
  const { openModal } = useModalContext();

  const onClickEditButton = (productId: string) => {
    const product = products.find((p) => p.id === productId);

    if (!product) {
      throw new Error('product not found');
    }

    openModal(<ConsoleUpdateProduct product={product} />);
  };

  const onClickDeleteButton = async (productId: string, sellerId: string) => {
    const confirm = window.confirm('정말로 삭제하겠습니까?');
    if (confirm) {
      deleteProduct({ sellerId, productId });
    }
  };

  return (
    <Ul className="flex-col items-start space-y-4">
      <h1 className="px-4 text-2xl font-bold">상품 조회</h1>
      {products?.map(({ createdAt, productName, productDescription, thumbnail, id, sellerId }) => (
        <Li key={id} className="w-full before:h-[2px] before:content-[''] before:block before:bg-slate-100">
          <Wrapper className="w-full rounded-md p-4">
            <div className="float-right text-sm">등록일 {dateFormat(createdAt.toDate())}</div>
            <Wrapper className="flex justify-between">
              <div>
                <Wrapper className="flex">
                  <div className="w-36 h-36 mr-3 overflow-hidden rounded-md">
                    <GoodsItemCard src={thumbnail} alt={productName} />
                  </div>
                  <div>
                    <strong>{productName}</strong>
                    <div>{productDescription}</div>
                  </div>
                </Wrapper>
              </div>
            </Wrapper>
            <Wrapper className="flex justify-end gap-x-2">
              <Button type="button" variant="outline" onClick={() => onClickEditButton(id)}>
                수정
              </Button>
              <Button type="button" variant="destructive" onClick={() => onClickDeleteButton(id, sellerId)}>
                삭제
              </Button>
            </Wrapper>
          </Wrapper>
        </Li>
      ))}
    </Ul>
  );
}
