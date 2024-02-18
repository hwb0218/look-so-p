import { storeService } from '@src/lib/firebase/StoreService';
import { paymentService } from '@src/lib/IMP/PaymentService';

import { useAuthContext } from '@providers/auth';

import calcTotalPrice from '@src/utils/calc-total-price';

import type { CartGoods } from '@src/lib/firebase/types';
import { queryClient } from '@src/main';
import { QUERY_KEYS } from '@constants/query-keys';

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

      const cart = await storeService.getCart(auth?.uid);

      return {
        merchantId,
        transactionId,
        newCart: cart,
        success: true,
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
