import { storeService } from '@src/lib/firebase/StoreService';
import { paymentService } from '@src/lib/IMP/PaymentService';

import { useAuthContext } from '@providers/auth';
import { queryClient } from '@providers/index';

import { QUERY_KEYS } from '@constants/query-keys';

import calcTotalPrice from '@src/utils/calc-total-price';

import type { CartGoods } from '@src/lib/firebase/types';

export default function usePayment(checkedGoods: CartGoods[]) {
  const { state } = useAuthContext();
  const { auth } = state;

  const requestPayment = async () => {
    try {
      await storeService.updateProductQuantity(checkedGoods);

      const paymentName =
        checkedGoods.length === 0
          ? checkedGoods[0].productName
          : `${checkedGoods[0].productName} 외 ${checkedGoods.length - 1}개`;

      const { merchantId, transactionId } = await paymentService.requestPayment({
        goods: {
          name: paymentName,
          price: calcTotalPrice(checkedGoods),
        },
      });

      await storeService.deleteGoodsToCart(checkedGoods, auth?.uid);

      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.GOODS.DETAILS() });

      return {
        merchantId,
        transactionId,
      };
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
        await storeService.rollbackProductQuantity(checkedGoods);
      }
    }
  };

  return { requestPayment };
}
