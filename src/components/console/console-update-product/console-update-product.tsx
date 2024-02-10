import { useState } from 'react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type UpdateProductFormSchema, updateProductFormSchema } from '@src/lib/zod/update-console-product-schama';

import { useAuthContext } from '@providers/auth';
import { useModalContext } from '@providers/modal';
import useFetchProducts from '@hooks/use-fetch-console';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@components/ui/select';
import { Input } from '@components/ui/input';
import { Button } from '@components/ui/button';
import { Textarea } from '@components/ui/textarea';
import Wrapper from '@components/common/wrapper';

import { Product } from '@src/lib/firebase/types';

import formatNumber from '@src/utils/format-number';
import Images from './images';

import type { ImagesToBeUpdated } from './types';

interface Props {
  product: Product;
}

export default function ConsoleUpdateProduct({ product }: Props) {
  const [imagesToBeUpdated, setImagesToBeUpdated] = useState<ImagesToBeUpdated>({
    thumbnail: '',
    images: [],
  });

  const { state } = useAuthContext();
  const { closeModal } = useModalContext();
  const { updateConsoleProducts } = useFetchProducts();

  const form = useForm<UpdateProductFormSchema>({
    mode: 'onSubmit',
    resolver: zodResolver(updateProductFormSchema),
    defaultValues: {
      productName: product.productName,
      productQuantity: product.productQuantity,
      productPrice: product.productPrice,
      productDescription: product.productDescription,
      previewUrls: product.images,
      previewThumbnailUrls: [product.thumbnail],
      productCategory: product.productCategory,
    },
  });

  const onSubmit = async (values: UpdateProductFormSchema) => {
    await updateConsoleProducts({ ...values, imagesToBeUpdated }, state?.auth.uid, product.id);
    alert('상품 수정 완료!');
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex justify-center items-center fixed left-0 right-0 top-0 bottom-0 bg-stone-800 bg-opacity-80 z-[9999]">
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
            <FormField
              control={form.control}
              name="productCategory"
              render={({ field }) => (
                <FormItem className="mt-2">
                  <FormLabel className="pl-1">상품 카테고리</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="상품 카테고리..?" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="z-[1000000]">
                      <SelectItem value="toner">토너/패드</SelectItem>
                      <SelectItem value="cream">로션/크림</SelectItem>
                      <SelectItem value="ampoule">에센스/앰플</SelectItem>
                      <SelectItem value="cleansing">클렌징</SelectItem>
                      <SelectItem value="suncare">선케어</SelectItem>
                    </SelectContent>
                  </Select>
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
                        value={formatNumber(String(field.value).replace(/[^0-9]/g, ''))}
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
                        value={formatNumber(String(field.value).replace(/[^0-9]/g, ''))}
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
            <Images form={form} setImagesToBeUpdated={setImagesToBeUpdated} />
            <Wrapper className="flex gap-x-3">
              <Button type="submit" disabled={form.formState.isSubmitting} className="mt-5 w-1/2 max-lg:w-full">
                수정
              </Button>
              <Button type="button" onClick={closeModal} className="mt-5 w-1/2 max-lg:w-full">
                취소
              </Button>
            </Wrapper>
          </Wrapper>
        </div>
      </form>
    </Form>
  );
}
