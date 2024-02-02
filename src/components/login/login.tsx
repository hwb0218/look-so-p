import { useNavigate } from 'react-router-dom';

import { FirebaseError } from 'firebase/app';
import { authService } from '@src/lib/firebase/AuthService';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginFormSchema, type LoginFormSchema } from '@src/lib/zod/login-schema';

import { useAuthContext } from '@providers/auth';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@components/ui/form';
import { Input } from '@components/ui/input';
import { Button } from '@components/ui/button';
import Wrapper from '@components/common/wrapper';

import { ROUTE_PATHS } from '@constants/routes';

function Login() {
  const navigate = useNavigate();
  const { setAuth, setIsLoggedIn } = useAuthContext();

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
        setIsLoggedIn(true);
        navigate({ pathname: ROUTE_PATHS.HOME });
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.error(error);
      }
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="pt-40 flex justify-center items-center flex-col space-y-4"
      >
        <Wrapper className="p-6 min-w-64 w-1/3 border rounded-md ring-2 ring-ring ring-offset-2">
          <h1 className="text-2xl text-center font-bold">LookSoPrt</h1>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mt-2">
                <FormLabel>아이디</FormLabel>
                <FormControl>
                  <Input placeholder="아이디(이메일)" {...field} />
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
                  <Input placeholder="비밀번호(영문, 숫자, 특수문자 조합)" type="password" {...field} />
                </FormControl>
                <FormMessage className="flex-none" />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full mt-5">
            로그인
          </Button>
        </Wrapper>
      </form>
    </Form>
  );
}
export default Login;
