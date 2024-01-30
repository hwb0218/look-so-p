import { useState, useRef } from 'react';
import { type UseFormReturn } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@components/ui/form';
import Wrapper from '@components/common/wrapper';

import getImageData from '@src/utils/get-image-data';

import { type ProductFormSchema } from '../console-add-product';
import { Button } from '@components/ui/button';
import { Badge } from '@components/ui/badge';

interface Props {
  form: UseFormReturn<ProductFormSchema>;
}

const MAX_FILES = 3;

export default function AddProductImages({ form }: Props) {
  const [previewURLs, setPreviewURLs] = useState<string[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  const onClickFileInput = () => {
    inputRef.current?.click();
  };

  const onResetFileInput = (e: React.MouseEvent, selectedPreviewUrl: string) => {
    e.stopPropagation();

    if (inputRef.current) {
      inputRef.current.value = '';

      const filteredPreviewURLs = previewURLs.filter((previewURL) => previewURL !== selectedPreviewUrl);

      setPreviewURLs(filteredPreviewURLs);
    }
  };

  return (
    <>
      <FormField
        control={form.control}
        name="images"
        render={({ field: { onChange } }) => (
          <FormItem className="mt-2 w-1/2">
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
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                multiple
                hidden
                disabled={form.formState.isSubmitting}
                onChange={(e) => {
                  if (e.target.files && e.target.files?.length > MAX_FILES) {
                    e.target.value = '';
                    alert(`최대 ${MAX_FILES}개의 파일만 선택할 수 있습니다.`);
                  }

                  const { files, displayUrl } = getImageData(e);
                  setPreviewURLs(displayUrl);
                  onChange(files);
                }}
              />
            </FormControl>
            <FormMessage className="text-center space-y-2" />
          </FormItem>
        )}
      />
      <Wrapper className="mt-2 p-2 flex w-1/2 gap-3 border rounded-md max-xl:flex-col">
        {[...Array(3)].map((_, i) => {
          const previewURL = previewURLs[i];
          const thumbnail = i === 0;
          // TODO: hover -> 우측 상단 제거 아이콘 추가하기
          return (
            <div className="relative w-full h-52 rounded-md hover:ring-2 hover:ring-ring hover:ring-offset-2 bg-slate-100 overflow-hidden cursor-pointer">
              {thumbnail && (
                <Badge className="absolute ml-2 mt-2 px-3 break-keep text-xs">
                  <span className="relative -left-[3px] p-1 mr-1 bg-emerald-400 rounded-full" />
                  썸네일
                </Badge>
              )}
              {previewURL && (
                <img
                  src={previewURL}
                  onClick={(e) => onResetFileInput(e, previewURL)}
                  className="object-cover w-full h-full"
                />
              )}
            </div>
          );
        })}
      </Wrapper>
    </>
  );
}
