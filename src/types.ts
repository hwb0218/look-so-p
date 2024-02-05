import { type UpdateProductFormSchema } from '@src/lib/zod/update-console-product-schama';

export interface UpdateConsoleProducts extends UpdateProductFormSchema {
  imagesToBeUpdated: { thumbnail: string; images: string[] };
}
