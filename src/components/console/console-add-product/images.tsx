// import { useRef } from 'react';
import { type UseFormReturn } from 'react-hook-form';

import useAddConsoleImage from './add-console-Images.hooks';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@components/ui/form';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { Badge } from '@components/ui/badge';
import Wrapper from '@components/common/ui/wrapper';

import { type ProductFormSchema } from '@src/lib/zod/console-product-schema';
import { resetImageData } from '@src/utils/set-image-data';

import { v4 as uuidv4 } from 'uuid';

interface Props {
  form: UseFormReturn<ProductFormSchema>;
}

export default function Images({ form }: Props) {
  const {
    previewImageUrls,
    previewThumbnailUrls,
    setPreviewImageUrls,
    setPreveiwThumbnailUrls,
    onChangeFileInput,
    onChangeThumbnailInput,
    onClickInput,
    inputRef,
    thumbnailInputRef,
  } = useAddConsoleImage();

  return (
    <>
      <FormField
        control={form.control}
        name="thumbnail"
        render={({ field: { onChange } }) => (
          <FormItem className="mt2">
            <FormControl>
              <Input
                ref={thumbnailInputRef}
                type="file"
                accept="image/*"
                hidden
                className="hidden"
                disabled={form.formState.isSubmitting}
                onChange={(e) => onChangeThumbnailInput(e, onChange)}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="images"
        render={({ field: { onChange, value } }) => (
          <FormItem className="mt-2">
            <FormLabel className="pl-1">상품 이미지</FormLabel>
            <Button
              type="button"
              className="ml-2 p-2 h-8"
              disabled={form.formState.isSubmitting}
              onClick={() => onClickInput(thumbnailInputRef)}
            >
              썸네일 +
            </Button>
            <Button
              type="button"
              className="ml-2 p-2 h-8"
              disabled={form.formState.isSubmitting}
              onClick={() => onClickInput(inputRef)}
            >
              보조 이미지 +
            </Button>
            <FormMessage className="space-y-2" />
            <FormControl>
              <Input
                ref={inputRef}
                type="file"
                accept="image/*"
                multiple
                hidden
                className="hidden"
                disabled={form.formState.isSubmitting}
                onChange={(e) => onChangeFileInput(e, onChange, value)}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <Wrapper className="mt-2 p-2 flex gap-3 border rounded-md max-xl:flex-col">
        {[...Array(1)].map((_, index) => {
          const url = previewThumbnailUrls[index];
          return (
            <div
              key={uuidv4()}
              className="relative w-full h-52 rounded-md hover:ring-2 hover:ring-ring hover:ring-offset-2 bg-slate-100 overflow-hidden"
            >
              <Badge className="absolute ml-2 mt-2 px-3 break-keep text-xs">
                <span className="relative -left-[3px] p-1 mr-1 bg-emerald-400 rounded-full" />
                썸네일
              </Badge>
              {url && (
                <img
                  src={url}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (thumbnailInputRef.current) {
                      form.resetField('thumbnail');
                      setPreveiwThumbnailUrls([]);
                    }
                  }}
                  className="object-cover w-full h-full cursor-pointer"
                />
              )}
            </div>
          );
        })}
        {[...Array(3)].map((_, index) => {
          const url = previewImageUrls[index];
          return (
            <div
              key={uuidv4()}
              className="relative w-full h-52 rounded-md hover:ring-2 hover:ring-ring hover:ring-offset-2 bg-slate-100 overflow-hidden cursor-pointer"
            >
              {url && (
                <img
                  src={url}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (inputRef.current) {
                      const { files, previewUrls } = resetImageData({
                        selectedImages: form.getValues('images'),
                        index,
                        previewImageUrls,
                      });

                      form.setValue('images', files);
                      setPreviewImageUrls(previewUrls);
                    }
                  }}
                  className="absolute inset-0 object-cover w-full h-full cursor-pointer"
                />
              )}
            </div>
          );
        })}
      </Wrapper>
    </>
  );
}
