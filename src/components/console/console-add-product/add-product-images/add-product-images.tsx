import { useState, useRef } from 'react';
import { type UseFormReturn } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@components/ui/form';
import { Button } from '@components/ui/button';
import { Badge } from '@components/ui/badge';
import { Input } from '@components/ui/input';
import Wrapper from '@components/common/wrapper';

import { type ProductFormSchema } from '@src/lib/zod/add-product-schema';

import getImageData from '@src/utils/get-image-data';

interface Props {
  form: UseFormReturn<ProductFormSchema>;
}

export default function AddProductImages({ form }: Props) {
  const [previewURLs, setPreviewURLs] = useState<string[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  const onClickFileInput = () => {
    if (inputRef.current) {
      inputRef.current?.click();
      inputRef.current.value = '';
    }
  };

  const onResetFileInput = (e: React.MouseEvent, selectedImage: number) => {
    e.stopPropagation();

    if (inputRef.current) {
      const dataTransfer = new DataTransfer();

      const images = Array.from(form.getValues('images')).filter((_, i) => i !== selectedImage);
      images.forEach((image) => dataTransfer.items.add(image));
      form.setValue('images', dataTransfer.files);

      const filteredPreviewURLs = previewURLs.filter((_, i) => i !== selectedImage);
      setPreviewURLs(filteredPreviewURLs);
    }
  };

  return (
    <>
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
              onClick={onClickFileInput}
            >
              등록
            </Button>
            <FormControl>
              <Input
                ref={inputRef}
                type="file"
                accept="image/*"
                multiple
                hidden
                className="hidden"
                disabled={form.formState.isSubmitting}
                onChange={(e) => {
                  const maxFiles = 3;
                  const prevFiles = value?.length ?? 0;
                  const selectedFiles = e.target?.files;
                  const isOverMaxFiles = selectedFiles && selectedFiles.length + prevFiles > maxFiles;

                  if (isOverMaxFiles) {
                    e.target.value = '';
                    alert(`최대 ${maxFiles}개의 파일만 선택할 수 있습니다.`);
                    return;
                  }
                  const { files, displayUrl } = getImageData({ event: e, prevImages: value, multiple: true });
                  setPreviewURLs(displayUrl);

                  onChange(files);
                }}
              />
            </FormControl>
            <FormMessage className="text-center space-y-2" />
          </FormItem>
        )}
      />
      <Wrapper className="mt-2 p-2 flex gap-3 border rounded-md max-xl:flex-col">
        {[...Array(3)].map((_, i) => {
          const url = previewURLs[i];
          const thumbnail = i === 0;
          // TODO: hover -> 우측 상단 제거 아이콘 추가하기
          return (
            <div
              key={url}
              className="relative w-full h-52 rounded-md hover:ring-2 hover:ring-ring hover:ring-offset-2 bg-slate-100 overflow-hidden cursor-pointer"
            >
              {thumbnail && (
                <Badge className="absolute ml-2 mt-2 px-3 break-keep text-xs">
                  <span className="relative -left-[3px] p-1 mr-1 bg-emerald-400 rounded-full" />
                  썸네일
                </Badge>
              )}
              {url && <img src={url} onClick={(e) => onResetFileInput(e, i)} className="object-cover w-full h-full" />}
            </div>
          );
        })}
      </Wrapper>
    </>
  );
}
