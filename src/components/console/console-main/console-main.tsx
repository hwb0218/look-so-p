import { FirebaseError } from 'firebase/app';

import { Li, Ul } from '@components/common/list';
import Wrapper from '@components/common/wrapper';
import { Button } from '@components/ui/button';

import type { Product } from '@src/lib/firebase/types';
import { useDeleteProductsMutation } from '@hooks/use-console-products-query';

interface Props {
  products?: Product[];
}

export default function ConsoleMain({ products }: Props) {
  const { mutate: deleteProduct } = useDeleteProductsMutation();

  const onClickDeleteButton = async (productId: string, sellerId: string) => {
    try {
      deleteProduct({ sellerId, productId });
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.error(error);
      }
    }
  };

  return (
    <Ul className="flex-col items-start gap-4 px-4 pb-4">
      <h1 className="text-3xl font-bold">전체 상품 조회</h1>
      {products?.map(({ createdAt, productName, productDescription, thumbnailUrl, id, sellerId }) => {
        const creaatedAt = createdAt.toDate();
        const date = new Intl.DateTimeFormat('ko-KR', {
          dateStyle: 'full',
          timeStyle: 'short',
          hour12: false,
        }).format(creaatedAt);

        return (
          <Li
            key={id}
            className="w-full rounded-md mt-4 p-4 shadow-sm hover:shadow-md transition-shadow duration-150 ease-in-out"
          >
            <Wrapper className="flex justify-between">
              <div>
                <div>{date}</div>
                <div>{productName}</div>
                <div>{productDescription}</div>
              </div>
              <div className="w-36 h-36 overflow-hidden rounded-md">
                <img src={thumbnailUrl} alt="대표 이미지" className="w-full h-full" />
              </div>
            </Wrapper>
            <Wrapper className="flex gap-x-2">
              <Button type="button">수정</Button>
              <Button type="button" onClick={() => onClickDeleteButton(id, sellerId)}>
                삭제
              </Button>
            </Wrapper>
          </Li>
        );
      })}
    </Ul>
  );
}
