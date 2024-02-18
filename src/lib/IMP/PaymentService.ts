import { Iamport, RequestPayParams, RequestPayResponse } from './types';

const PG_CODE = import.meta.env.VITE_PORTONE_PG_CODE || '';

type Goods = {
  name: string;
  price: number;
};

type Buyer = {
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  postalCode: string;
};

export default class PaymentService {
  instance: Iamport;

  constructor() {
    if (typeof window.IMP !== 'undefined') {
      this.instance = window.IMP;
    } else {
      throw new Error('아임포트 SDK가 로드되지 않았습니다.');
    }
  }

  async requestPayment({ goods, buyer }: { goods: Goods; buyer?: Buyer }): Promise<{
    merchantId: string;
    transactionId: string;
  }> {
    const now = new Date();
    const date = now.toISOString().slice(0, 10).replace(/-/g, '');
    const time = now.getTime();
    const nonce = Math.random().toString().slice(-5);
    const merchantId = `ORDER-${date}-${time}${nonce}`;

    const data: RequestPayParams = {
      pg: PG_CODE,
      pay_method: 'card',
      merchant_uid: merchantId,
      name: goods.name,
      amount: goods.price,
      buyer_email: buyer?.email,
      buyer_name: buyer?.name,
      buyer_tel: buyer?.phoneNumber,
      buyer_addr: buyer?.address,
      buyer_postcode: buyer?.postalCode,
    };

    return new Promise((resolve, reject) => {
      this.instance.request_pay(data, (response: RequestPayResponse) => {
        const { success, merchant_uid, imp_uid, error_msg } = response;

        if (success) {
          resolve({
            merchantId: merchant_uid,
            transactionId: imp_uid ?? '',
          });
        } else {
          reject(Error(error_msg));
        }
      });
    });
  }
}

export const paymentService = new PaymentService();
