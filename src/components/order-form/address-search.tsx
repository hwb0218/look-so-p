import { useEffect, useRef } from 'react';

import Wrapper from '@components/common/ui/wrapper';
import { UseFormReturn } from 'react-hook-form';
import { OrderFormSchema } from '@src/lib/zod/order-schema';

interface Props {
  setSearching: React.Dispatch<React.SetStateAction<boolean>>;
  form: UseFormReturn<OrderFormSchema>;
}

export default function AddressSearch({ setSearching, form }: Props) {
  const refElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    new daum.Postcode({
      oncomplete(data) {
        const { jibunAddress, autoJibunAddress, autoRoadAddress, roadAddress, zonecode: postalCode } = data;

        form.setValue('jibunAddress', jibunAddress || autoJibunAddress);
        form.setValue('roadAddress', roadAddress || autoRoadAddress);
        form.setValue('postalCode', postalCode);
        setSearching(false);
      },
      width: '100%',
      height: '100%',
    }).embed(refElement.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Wrapper className="fixed top-0 left-0 w-full h-full bg-black/50" onClick={() => setSearching(false)}>
      <div
        ref={refElement}
        className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-4/5 h-4/5 max-w-3xl"
      />
    </Wrapper>
  );
}
