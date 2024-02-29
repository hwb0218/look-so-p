// import { useRef } from 'react';
import { type UseFormReturn } from 'react-hook-form';

import useUpdateConsoleImage from '@components/console/console-update-product/update-console-images.hooks';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@components/ui/form';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { Badge } from '@components/ui/badge';
import Wrapper from '@components/common/ui/wrapper';

import { type UpdateProductFormSchema } from '@src/lib/zod/update-console-product-schama';
import extractPathFromUrl from '@src/utils/extract-path-from-url';

import type { ImagesToBeUpdated } from './types';

interface Props {
  form: UseFormReturn<UpdateProductFormSchema>;
  setImagesToBeUpdated: React.Dispatch<React.SetStateAction<ImagesToBeUpdated>>;
}

export default function Images({ form, setImagesToBeUpdated }: Props) {
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
  } = useUpdateConsoleImage(form);

  return (
    <>
      <FormField
        control={form.control}
        name="thumbnail"
        render={({ field: { onChange } }) => (
          <FormItem className="mt-2">
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
                onChange={(e) => onChangeFileInput(e, onChange, value as FileList)}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <Wrapper className="mt-2 p-2 grid grid-cols-2 gap-3 border rounded-md">
        {[...Array(1)].map((_, index) => {
          const url = previewThumbnailUrls[index];
          return (
            <div
              key={url}
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
                    const extractedThumbnialPath = extractPathFromUrl(url);

                    if (extractedThumbnialPath) {
                      setImagesToBeUpdated((prev) => ({
                        ...prev,
                        thumbnail: extractedThumbnialPath,
                      }));
                    }
                    form.setValue('thumbnail', undefined);
                    setPreveiwThumbnailUrls([]);
                  }}
                  className="object-cover w-full h-full cursor-pointer"
                />
              )}
            </div>
          );
        })}
        {previewImageUrls.map((url, index) => {
          return (
            <div
              key={url}
              className="relative w-full h-52 rounded-md hover:ring-2 hover:ring-ring hover:ring-offset-2 overflow-hidden cursor-pointer"
            >
              {url && (
                <img
                  src={url}
                  onClick={(e) => {
                    e.stopPropagation();
                    const extractedImagePath = extractPathFromUrl(url);

                    if (extractedImagePath) {
                      setImagesToBeUpdated((prev) => ({
                        ...prev,
                        images: [...prev.images, extractedImagePath],
                      }));
                    }

                    const images = form.getValues('images') as FileList;
                    setPreviewImageUrls(previewImageUrls.filter((url) => url !== e.currentTarget.currentSrc));

                    const dataTransfer = new DataTransfer();

                    if (images?.length) {
                      Array.from(images)
                        .filter((_, i) => i !== index)
                        .forEach((image) => dataTransfer.items.add(image));
                    }
                    const files = dataTransfer.files;
                    form.setValue('images', files);
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
