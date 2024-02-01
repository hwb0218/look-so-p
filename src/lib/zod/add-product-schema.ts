import * as z from 'zod';

const MAX_IMAGE_SIZE = 5242880;
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];

export const productFormSchema = z.object({
  images: z
    .custom<FileList>((val) => val instanceof FileList, '이미지를 추가하세요')
    .refine((files) => files.length > 0, `최소 1장이상의 이미지가 필요합니다`)
    .refine((files) => files.length <= 3, `이미지는 최대 3장까지만 가능합니다`)
    .refine((files) => Array.from(files).every((file) => file.size <= MAX_IMAGE_SIZE), `최대 이미지 크기는 5MB입니다`)
    .refine((files) =>
      Array.from(files).every((file) => ALLOWED_IMAGE_TYPES.includes(file.type), '.jpg, .jpeg, .png 형식만 지원됩니다'),
    ),
  productName: z.string().min(1, { message: '상품 이름을 입력하세요' }),
  productQuantity: z.string().min(1, { message: '상품 수량을 입력하세요' }),
  productPrice: z.string().min(1, { message: '상품 가격을 입력하세요' }),
  productDescription: z.string().optional(),
});

export type ProductFormSchema = z.infer<typeof productFormSchema>;
