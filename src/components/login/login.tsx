import { NavLink, useNavigate } from 'react-router-dom';

import { FirebaseError } from 'firebase/app';
import { authService } from '@src/lib/firebase/AuthService';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginFormSchema, type LoginFormSchema } from '@src/lib/zod/login-schema';

import { useAuthContext } from '@providers/auth';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@components/ui/form';
import { Input } from '@components/ui/input';
import { Button } from '@components/ui/button';
import Wrapper from '@components/common/ui/wrapper';

import { ROUTE_PATHS } from '@constants/routes';

function Login() {
  const navigate = useNavigate();
  const { setAuth } = useAuthContext();

  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginFormSchema) => {
    try {
      const { email, password } = values;

      const user = await authService.getUser(email, password);

      if (user) {
        setAuth(user);
        navigate({ pathname: ROUTE_PATHS.HOME });
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.error(error);
      }
    }
  };

  return (
    <Wrapper className="px-4 max-w-sm w-full fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex justify-center items-center flex-col space-y-4">
          <Wrapper className="w-full relative p-6 border rounded-md ring-2 ring-ring ring-offset-2">
            <h1 className="text-2xl text-center font-bold">LookSoPrt</h1>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="mt-2">
                  <FormLabel>아이디</FormLabel>
                  <FormControl>
                    <Input placeholder="아이디(이메일)" className="w-full" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="mt-2">
                  <FormLabel>비밀번호</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="비밀번호(영문, 숫자, 특수문자 조합)"
                      type="password"
                      className="w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="flex-none" />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full mt-5">
              로그인
            </Button>
            <NavLink to={ROUTE_PATHS.HOME} className="absolute top-2 right-2">
              <img src="/close_MD.svg" alt="close" className="text-black" />
            </NavLink>
          </Wrapper>
        </form>
      </Form>
    </Wrapper>
  );
}
export default Login;
