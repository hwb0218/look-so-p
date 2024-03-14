import * as PortOne from '@portone/browser-sdk/v2';

const STORE_ID = import.meta.env.VITE_PORTONE_STORE_ID || '';
const CHANNEL_KEY = import.meta.env.VITE_PORTONE_CHANNEL_KEY || '';

type Goods = {
  name: string;
  price: number;
};

export default class PaymentService {
  async requestPayment({ goods }: { goods: Goods }): Promise<{
    merchantId: string;
    transactionId: string;
  }> {
    const now = new Date();
    const date = now.toISOString().slice(0, 10).replace(/-/g, '');
    const time = now.getTime();
    const nonce = Math.random().toString().slice(-5);
    const merchantId = `${date}-${time}${nonce}`;

    const data: PortOne.PaymentRequest = {
      storeId: STORE_ID,
      channelKey: CHANNEL_KEY,
      paymentId: merchantId,
      orderName: goods.name,
      totalAmount: goods.price,
      currency: 'CURRENCY_KRW',
      payMethod: 'CARD',
    };

    const res = (await PortOne.requestPayment(data)) as PortOne.PaymentResponse;

    if (res.code !== null) {
      throw new Error(res.message);
    }

    return {
      merchantId: res.paymentId ?? '',
      transactionId: res.transactionType ?? '',
    };
  }
}

export const paymentService = new PaymentService();
