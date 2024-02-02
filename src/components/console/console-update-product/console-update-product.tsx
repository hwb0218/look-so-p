import { FirebaseError } from 'firebase/app';
import { storageService } from '@src/lib/firebase/StorageService';
import { storeService } from '@src/lib/firebase/StoreService';

import { useAuthContext } from '@providers/auth';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type EditProductFormSchema, editProductFormSchema } from '@src/lib/zod/edit-product-schema';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@components/ui/form';
import { Input } from '@components/ui/input';
import { Button } from '@components/ui/button';
import { Textarea } from '@components/ui/textarea';
import Wrapper from '@components/common/wrapper';
import { AddProductImages } from '../product-images';

// import { queryClient } from '@src/main';
// import { QUERY_KEYS } from '@constants/query-keys';

import formatNumber from '@src/utils/format-number';
import { useModalContext } from '@providers/modal';

export default function ConsoleUpdateProduct() {
  const { closeModal } = useModalContext();

  const form = useForm<EditProductFormSchema>({
    mode: 'onSubmit',
    resolver: zodResolver(editProductFormSchema),
    defaultValues: {
      productName: '',
      productQuantity: '',
      productPrice: '',
      productDescription: '',
    },
  });

  const onSubmit = async (values: EditProductFormSchema) => {};

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex justify-center items-center absolute left-0 right-0 top-0 bottom-0 bg-stone-800 bg-opacity-80 z-[9999]">
          <Wrapper className="p-4 w-1/2 mb-5 bg-white rounded-md overflow-hidden max-xl:h-5/6 max-xl:overflow-y-scroll">
            <h1 className="text-3xl font-bold">상품 정보 수정</h1>
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
            <AddProductImages form={form} />
            <Button type="button" onClick={closeModal} className="absolute top-5 right-5">
              모달 제거
            </Button>
          </Wrapper>
        </div>
      </form>
    </Form>
  );
}
