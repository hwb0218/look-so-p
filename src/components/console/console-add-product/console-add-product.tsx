import { useState } from 'react';

import { FirebaseError } from 'firebase/app';
import { storageService } from '@firebase/StorageService';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@components/ui/form';
import { Input } from '@components/ui/input';
import { Button } from '@components/ui/button';
import { Textarea } from '@components/ui/textarea';
import Wrapper from '@components/common/wrapper';

import formatNumber from '@src/utils/format-number';

import { AddProductImages } from './add-product-images';

const MAX_IMAGE_SIZE = 5242880;
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/jpg', 'image/svg+xml'];

export const productFormSchema = z.object({
  images: z
    .any()
    .refine((file) => file[0]?.size <= MAX_IMAGE_SIZE, `최대 이미지 크기는 5MB입니다`)
    .refine((file) => ALLOWED_IMAGE_TYPES.includes(file[0]?.type), '.jpg, .jpeg, .png 형식만 지원됩니다'),
  productName: z.string().min(1, { message: '상품 이름을 입력하세요' }),
  productQuantity: z.string().min(1, { message: '상품 수량을 입력하세요' }),
  productPrice: z.string().min(1, { message: '상품 가격을 입력하세요' }),
  productDescription: z.string().optional(),
});
// .superRefine(({ password, checkPassword }, ctx) => {
//   if (password !== checkPassword) {
//     ctx.addIssue({
//       code: z.ZodIssueCode.custom,
//       message: '패스워드가 일치하지 않습니다',
//       path: ['checkPassword'],
//     });
//   }
// });

export type ProductFormSchema = z.infer<typeof productFormSchema>;

export default function ConsoleProductRegistration() {
  const [displayValues, setDisplayValues] = useState({
    productQuantity: '',
    productPrice: '',
  });

  const form = useForm<ProductFormSchema>({
    mode: 'onSubmit',
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      productName: '',
      productQuantity: '',
      productPrice: '',
      productDescription: '',
    },
  });

  const onSubmit = async (values: ProductFormSchema) => {
    try {
      const imageURL = await storageService.uploadFiles(values.images[0]);
      console.log(imageURL);
    } catch (err) {
      if (err instanceof FirebaseError) {
        console.error(err);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numberValue = value.replace(/,/g, '');
    setDisplayValues({
      ...displayValues,
      [name]: formatNumber(numberValue),
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex justify-center items-center">
        <Wrapper className="w-1/2 flex flex-col justify-center mb-5">
          <h1 className="text-3xl font-bold">상품 등록</h1>
          <FormField
            control={form.control}
            name="productName"
            render={({ field }) => (
              <FormItem className="mt-2">
                <FormLabel className="pl-1">상품 이름</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage className="ml-2" />
              </FormItem>
            )}
          />
          <Wrapper className="grid grid-flow-col gap-3">
            <FormField
              control={form.control}
              name="productQuantity"
              render={({ field }) => (
                <FormItem className="mt-2">
                  <FormLabel className="pl-1">상품 수량</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={displayValues['productQuantity']}
                      name="productQuantity"
                      pattern="[0-9]"
                      onChange={handleInputChange}
                    />
                  </FormControl>
                  <FormMessage className="ml-2" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="productPrice"
              render={({ field }) => (
                <FormItem className="mt-2">
                  <FormLabel className="pl-1">상품 가격</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={displayValues['productPrice']}
                      name="productPrice"
                      pattern="[0-9]"
                      onChange={handleInputChange}
                    />
                  </FormControl>
                  <FormMessage className="ml-2" />
                </FormItem>
              )}
            />
          </Wrapper>
          <FormField
            control={form.control}
            name="productDescription"
            render={({ field }) => (
              <FormItem className="mt-2">
                <FormLabel className="pl-1">상품 설명</FormLabel>
                <FormControl>
                  <Textarea {...field} className="resize-none" />
                </FormControl>
                <FormMessage className="flex-none" />
              </FormItem>
            )}
          />
          <AddProductImages form={form} />
          <Button type="submit" disabled={form.formState.isSubmitting} className="mt-5 mx-auto w-1/2 max-lg:w-full">
            상품 등록
          </Button>
        </Wrapper>
      </form>
    </Form>
  );
}
