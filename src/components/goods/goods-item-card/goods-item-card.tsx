import Wrapper from '@components/common/ui/wrapper';
import { Card, CardContent } from '@components/ui/card';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface Props {
  src: string;
  alt: string;
}

export default function GoodsItemCard({ src, alt = '' }: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const { ref, inView } = useInView({
    rootMargin: '200px',
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);

  return (
    <Wrapper ref={ref} className="pt-[100%] relative w-full rounded-lg">
      <Card className="absolute inset-0 border-0 shadow-none bg-muted overflow-hidden">
        <CardContent className="p-0 aspect-square flex items-center justify-center bg-transparent">
          {isVisible && <img src={src} alt={alt} draggable={false} className="w-full h-full" />}
        </CardContent>
      </Card>
    </Wrapper>
  );
}
