import { useNavigate } from 'react-router-dom';

import { FirebaseError } from 'firebase/app';
import { authService } from '@firebase/AuthService';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginFormSchema, type LoginFormSchema } from '@src/schema/login-schema';

import useAuthContext from '@providers/use-auth-context';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@components/ui/form';
import { Input } from '@components/ui/input';
import { Button } from '@components/ui/button';

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
      <form onSubmit={form.handleSubmit(onSubmit)} className="h-screen flex items-center flex-col space-y-4">
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
