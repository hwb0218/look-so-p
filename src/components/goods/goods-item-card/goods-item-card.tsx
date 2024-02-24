import Wrapper from '@components/common/ui/wrapper';
import { Card, CardContent } from '@components/ui/card';

interface Props {
  src: string;
  alt: string;
}

export default function GoodsItemCard({ src, alt = '' }: Props) {
  return (
    <Wrapper className="pt-[100%] relative w-full">
      <Card className="absolute inset-0 border-0 overflow-hidden">
        <CardContent className="p-0 aspect-square flex items-center justify-center">
          <img src={src} alt={alt} draggable={false} className="w-full h-full" />
        </CardContent>
      </Card>
    </Wrapper>
  );
}
