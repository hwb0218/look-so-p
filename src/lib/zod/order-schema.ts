import * as z from 'zod';

export const orderFormSchema = z.object({
  name: z.string({ required_error: '이름은 필수입니다', invalid_type_error: '문자를 입력하세요' }),
  jibunAddress: z.string(),
  roadAddress: z.string(),
  address2: z.string(),
  postalCode: z.string(),
  phoneNumber: z.string(),
});

export type OrderFormSchema = z.infer<typeof orderFormSchema>;
