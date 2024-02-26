import { useCallback, useEffect, useRef, useState } from 'react';

import { FieldValues, UseFormReturn } from 'react-hook-form';
import { getImageData } from '@src/utils/set-image-data';

interface RequiredFields extends FieldValues {
  previewUrls?: string[];
  previewThumbnailUrls?: string[];
}

export default function useUpdateConsoleImage<T extends RequiredFields>(form: UseFormReturn<T>) {
  const [previewThumbnailUrls, setPreveiwThumbnailUrls] = useState<string[]>([]);
  const [previewImageUrls, setPreviewImageUrls] = useState<string[]>([]);

  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const images = form.getValues().previewUrls;
  const thumbnailImages = form.getValues().previewThumbnailUrls;

  useEffect(() => {
    if (images) {
      setPreviewImageUrls(images);
    }

    if (thumbnailImages) {
      setPreveiwThumbnailUrls(thumbnailImages);
    }
  }, [images, thumbnailImages]);

  const onClickInput = (inputRef: React.RefObject<HTMLInputElement>) => {
    if (inputRef.current) {
      inputRef.current.click();
      inputRef.current.value = '';
    }
  };

  const onChangeThumbnailInput = (e: React.ChangeEvent<HTMLInputElement>, onChange: (...event: FileList[]) => void) => {
    const { files, previewUrls } = getImageData({ selectedImages: e.target?.files as FileList });
    setPreveiwThumbnailUrls(previewUrls);
    onChange(files);
  };

  const onChangeFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, onChange: (...event: FileList[]) => void, value?: FileList) => {
      const limitedFileLength = 3;
      const prevFileList = value?.length ?? 0;
      const fileList = e.target.files?.length ?? 0;
      const isOverMaxFiles =
        prevFileList + fileList > limitedFileLength || previewImageUrls.length >= limitedFileLength;

      if (isOverMaxFiles) {
        e.target.value = '';
        return alert('최대 3개의 파일을 선택할 수 있습니다.');
      }

      const { files, previewUrls } = getImageData({
        selectedImages: e.target?.files as FileList,
        prevImages: value,
        multiple: true,
      });

      setPreviewImageUrls((prev) => [...prev, ...previewUrls].slice(-limitedFileLength));
      onChange(files);
    },
    [previewImageUrls.length],
  );

  return {
    previewImageUrls,
    previewThumbnailUrls,
    thumbnailInputRef,
    inputRef,
    setPreviewImageUrls,
    setPreveiwThumbnailUrls,
    onClickInput,
    onChangeThumbnailInput,
    onChangeFileInput,
  };
}
