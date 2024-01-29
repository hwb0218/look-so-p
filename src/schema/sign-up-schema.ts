import * as z from 'zod';

const MAX_IMAGE_SIZE = 5242880; // 5 MB
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/jpg', 'image/svg+xml'];

export const signUpFormSchema = z
  .object({
    images: z
      .any()
      .refine((file) => {
        return file[0]?.size <= MAX_IMAGE_SIZE, `최대 이미지 크기는 5MB입니다`;
      })
      .refine((file) => ALLOWED_IMAGE_TYPES.includes(file[0]?.type), '.jpg, .jpeg, .png 형식만 지원됩니다'),
    email: z.string().min(1, { message: '이메일을 입력하세요' }).email({ message: '이메일이 아닙니다' }),
    nickname: z
      .string()
      .min(1, { message: '닉네임을 입력하세요' })
      .regex(/^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$/, {
        message: '2자 이상의 닉네임이 필요합니다',
      }),
    password: z
      .string()
      .min(1, { message: '비밀번호를 입력하세요' })
      .regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/, {
        message: '8자 이상의 영어 대문자 또는 소문자, 숫자, 특수문자가 필요합니다',
      }),
    checkPassword: z.string().optional(),
    isSeller: z.boolean().optional(),
  })
  .superRefine(({ password, checkPassword }, ctx) => {
    if (password !== checkPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '패스워드가 일치하지 않습니다',
        path: ['checkPassword'],
      });
    }
  });

export type SignUpFormSchema = z.infer<typeof signUpFormSchema>;
