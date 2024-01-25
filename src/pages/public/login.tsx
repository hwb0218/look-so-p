import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
  email: z.string().min(1, { message: '이메일을 입력하세요' }).email({ message: '이메일이 아닙니다' }),
  password: z
    .string()
    .min(8, { message: '비밀번호를 입력하세요' })
    .regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/, {
      message: '8자 이상의 영어 대문자 또는 소문자, 숫자, 특수문자가 필요합니다',
    }),
});

function Login() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="h-screen flex justify-center items-center flex-col space-y-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>아이디</FormLabel>
              <FormControl>
                <Input placeholder="아이디(이메일)" {...field} className="w-96" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>비밀번호</FormLabel>
              <FormControl>
                <Input placeholder="비밀번호(영문, 숫자, 특수문자 조합)" type="password" className="w-96" {...field} />
              </FormControl>
              <FormMessage className="flex-none" />
            </FormItem>
          )}
        />
        <Button type="submit" variant="default">
          로그인
        </Button>
      </form>
    </Form>
  );
}

export default Login;
