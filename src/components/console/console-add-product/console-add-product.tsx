import { FirebaseError } from 'firebase/app';
import { storageService } from '@src/lib/firebase/StorageService';
import { storeService } from '@src/lib/firebase/StoreService';

import { useAuthContext } from '@providers/auth';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type AddProductFormSchema, addProductFormSchema } from '@src/lib/zod/add-product-schema';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@components/ui/form';
import { Input } from '@components/ui/input';
import { Button } from '@components/ui/button';
import { Textarea } from '@components/ui/textarea';
import Wrapper from '@components/common/wrapper';
import { ProductImages } from '../product-images';

import { queryClient } from '@src/main';
import { QUERY_KEYS } from '@constants/query-keys';

import formatNumber from '@src/utils/format-number';

export default function ConsoleProductRegistration() {
  const { state } = useAuthContext();

  const form = useForm<AddProductFormSchema>({
    mode: 'onSubmit',
    resolver: zodResolver(addProductFormSchema),
    defaultValues: {
      productName: '',
      productQuantity: '',
      productPrice: '',
      productDescription: '',
    },
  });

  const onSubmit = async (values: AddProductFormSchema) => {
    try {
      const imageURL = await storageService.uploadFiles(values.images, `products/${state.auth?.uid}`);

      await storeService.createProducts({ ...values, images: imageURL });
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CONSOLE.PRODUCTS(state.auth?.uid) });
      alert('상품 등록 완료!');
    } catch (err) {
      if (err instanceof FirebaseError) {
        console.error(err);
      }
    }
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
                      value={formatNumber(field.value.replace(/[^0-9]/g, ''))}
                      onChange={(e) => field.onChange(e.target.value.replace(/[^0-9]/g, ''))}
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
                      value={formatNumber(field.value.replace(/[^0-9]/g, ''))}
                      onChange={(e) => field.onChange(e.target.value.replace(/[^0-9]/g, ''))}
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
          <ProductImages form={form} />
          <Button type="submit" disabled={form.formState.isSubmitting} className="mt-5 mx-auto w-1/2 max-lg:w-full">
            상품 등록
          </Button>
        </Wrapper>
      </form>
    </Form>
  );
}
