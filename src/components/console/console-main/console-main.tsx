import { Li, Ul } from '@components/common/list';
import Wrapper from '@components/common/wrapper';
import { Button } from '@components/ui/button';

import { useDeleteProductsMutation } from '@hooks/use-console-products-query';

import { useModalContext } from '@providers/modal';

import type { Product } from '@src/lib/firebase/types';
import ConsoleUpdateProduct from '../console-update-product/console-update-product';
import dateFormat from '@src/utils/date-format';

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
      <h1 className="px-4 text-2xl font-bold">전체 상품 조회</h1>
      {products?.map(({ createdAt, productName, productDescription, thumbnail, id, sellerId }) => (
        <Li key={id} className="w-full before:h-[2px] before:content-[''] before:block before:bg-slate-100">
          <Wrapper className="w-full rounded-md p-4">
            <Wrapper className="flex justify-between">
              <div>
                <div>{dateFormat(createdAt.toDate())}</div>
                <div>
                  <strong>{productName}</strong>
                </div>
                <div>{productDescription}</div>
              </div>
              <div className="w-36 h-36 overflow-hidden rounded-md">
                <img src={thumbnail} alt="대표 이미지" className="object-cover w-full h-full" />
              </div>
            </Wrapper>
            <Wrapper className="flex gap-x-2">
              <Button type="button" onClick={() => onClickEditButton(id)}>
                수정
              </Button>
              <Button type="button" onClick={() => onClickDeleteButton(id, sellerId)}>
                삭제
              </Button>
            </Wrapper>
          </Wrapper>
        </Li>
      ))}
    </Ul>
  );
}
