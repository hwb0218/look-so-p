import { Card, CardContent } from '@components/ui/card';

interface Props {
  src: string;
  alt: string;
}

export default function GoodsItemCard({ src, alt = '' }: Props) {
  return (
    <Card className="border-0 overflow-hidden">
      <CardContent className="p-0 aspect-square flex items-center justify-center">
        <img src={src} alt={alt} draggable={false} className="w-full h-full object-cover" />
      </CardContent>
    </Card>
  );
}
