import { type CarouselApi } from '@components/ui/carousel';
import { useState, useEffect } from 'react';

export default function useCarouselApi() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const onScrollTo = (index: number) => {
    api?.scrollTo(index);
  };

  return {
    current,
    count,
    setApi,
    onScrollTo,
  };
}
