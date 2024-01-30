import * as z from 'zod';

export const loginFormSchema = z.object({
  email: z.string().min(1, { message: '이메일을 입력하세요' }).email({ message: '이메일이 아닙니다' }),
  password: z
    .string()
    .min(8, { message: '비밀번호를 입력하세요' })
    .regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/, {
      message: '8자 이상의 영어 대문자 또는 소문자, 숫자, 특수문자가 필요합니다',
    }),
});

export type LoginFormSchema = z.infer<typeof loginFormSchema>;
