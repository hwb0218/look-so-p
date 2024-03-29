import * as z from 'zod';

const MAX_IMAGE_SIZE = 5242880;
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];

export const updateProductFormSchema = z.object({
  thumbnail: z
    .custom<FileList>((val) => val instanceof FileList, '썸네일은 필수입니다')
    .refine((files) => Array.from(files).every((file) => file.size <= MAX_IMAGE_SIZE))
    .refine((files) => Array.from(files).every((file) => ALLOWED_IMAGE_TYPES.includes(file.type)))
    .optional(),
  images: z
    .custom<FileList>((val) => val instanceof FileList, '1장 이상의 보조 이미지를 추가하세요')
    .refine((files) => files.length <= 4, '최대 3장의 보조 이미지만 가능합니다')
    .refine((files) => Array.from(files).every((file) => file.size <= MAX_IMAGE_SIZE), '최대 이미지 크기는 5MB입니다')
    .refine((files) =>
      Array.from(files).every((file) => ALLOWED_IMAGE_TYPES.includes(file.type), '.jpg, .jpeg, .png 형식만 지원됩니다'),
    )
    .optional(),
  previewUrls: z.array(z.string()).optional(),
  previewThumbnailUrls: z.array(z.string()).optional(),
  productName: z.string().min(1, { message: '상품 이름을 입력하세요' }),
  productQuantity: z.string().min(1, { message: '상품 수량을 입력하세요' }),
  productPrice: z.string().min(1, { message: '상품 가격을 입력하세요' }),
  productDescription: z.string().optional(),
  productCategory: z.string({ required_error: '카테고리를 선택하세요' }).min(1),
});

export type UpdateProductFormSchema = z.infer<typeof updateProductFormSchema>;
