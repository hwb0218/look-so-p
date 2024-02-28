import { useForm } from 'react-hook-form';

import useFetchProducts from '@hooks/use-fetch-console';
import { useAuthContext } from '@providers/auth';

import { zodResolver } from '@hookform/resolvers/zod';
import { type ProductFormSchema, productFormSchema } from '@src/lib/zod/console-product-schema';

import Images from './images';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@components/ui/select';
import { Input } from '@components/ui/input';
import { Button } from '@components/ui/button';
import { Textarea } from '@components/ui/textarea';
import Wrapper from '@components/common/ui/wrapper';
import { toast } from 'sonner';

import formatNumber from '@src/utils/format-number';
import { queryClient } from '@src/main';
import { QUERY_KEYS } from '@constants/query-keys';
import { useNavigate } from 'react-router-dom';
import { CONSOLE_ROUTE_PATHS } from '@constants/routes';

export default function ConsoleProductRegistration() {
  const navigate = useNavigate();
  const { state } = useAuthContext();
  const { createConsoleProducts } = useFetchProducts();

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
    toast.promise(createConsoleProducts(values, state?.auth.uid), {
      loading: '상품을 등록하고 있습니다',
      success: '상품이 정상 등록됐습니다',
      error: '등록에 실패했습니다',
    });
    await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.GOODS.MAIN() });
    navigate(CONSOLE_ROUTE_PATHS.CONSOLE(state?.auth.uid));
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
                  <Input placeholder="상품 이름" {...field} />
                </FormControl>
                <FormMessage className="ml-2" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="productCategory"
            render={({ field: { onChange, value } }) => (
              <FormItem className="mt-2">
                <FormLabel className="pl-1">상품 카테고리</FormLabel>
                <Select onValueChange={onChange} defaultValue={value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="상품 카테고리" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
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
                      placeholder="상품 수량"
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
                      placeholder="상품 가격"
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
          <Images form={form} />
          <Button type="submit" disabled={form.formState.isSubmitting} className="mt-5 mx-auto w-1/2 max-lg:w-full">
            상품 등록
          </Button>
        </Wrapper>
      </form>
    </Form>
  );
}
