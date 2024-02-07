import { Li } from '@components/common/list';

import Wrapper from '@components/common/wrapper';

import { Product } from '@src/lib/firebase/types';

interface Props {
  goods: Product;
}

export default function GoodsItem({ goods }: Props) {
  return (
    <Li className="w-1/4">
      <Wrapper>
        <div>
          <img src={goods.thumbnail} alt={goods.title} className="w-full" />
        </div>
        <span>{`[${goods.productCategory}]`}</span>
        <span>{goods.productPrice}</span>
      </Wrapper>
      <div>{goods.productCategory}</div>
    </Li>
  );
}
