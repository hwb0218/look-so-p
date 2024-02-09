import { Card, CardContent } from '@components/ui/card';

interface Props {
  src: string;
}

export default function GoodsItemCard({ src }: Props) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0 aspect-square flex items-center justify-center">
        <img src={src} alt={src} className="w-full h-full object-cover" />
      </CardContent>
    </Card>
  );
}
