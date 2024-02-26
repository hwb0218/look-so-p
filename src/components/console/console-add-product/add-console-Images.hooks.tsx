import { useCallback, useRef, useState } from 'react';

import { getImageData } from '@src/utils/set-image-data';
import resizeImages from '@src/utils/resize-images';

export default function useAddConsoleImage() {
  const [previewThumbnailUrls, setPreveiwThumbnailUrls] = useState<string[]>([]);
  const [previewImageUrls, setPreviewImageUrls] = useState<string[]>([]);

  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const onClickInput = (inputRef: React.RefObject<HTMLInputElement>) => {
    if (inputRef.current) {
      inputRef.current.click();
      inputRef.current.value = '';
    }
  };

  const onChangeThumbnailInput = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>, onChange: (...event: FileList[]) => void) => {
      const resizedImages = await resizeImages(e.target?.files as FileList);

      const { files, previewUrls } = getImageData({ selectedImages: resizedImages as FileList });

      setPreveiwThumbnailUrls(previewUrls);
      onChange(files);
    },
    [],
  );

  const onChangeFileInput = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>, onChange: (...event: FileList[]) => void, value?: FileList) => {
      const limitedFileLength = 3;
      const prevFiles = value?.length ?? 0;
      const currrentFiles = e.target?.files?.length ?? 0;
      const isOverMaxFiles = prevFiles + currrentFiles > limitedFileLength;

      if (isOverMaxFiles) {
        e.target.value = '';
        return alert(`최대 ${limitedFileLength}개의 파일만 선택할 수 있습니다.`);
      }

      const resizedImages = await resizeImages(e.target?.files as FileList);

      const { files, previewUrls } = getImageData({
        selectedImages: resizedImages as FileList,
        prevImages: value,
        multiple: true,
      });

      setPreviewImageUrls(previewUrls);
      onChange(files);
    },
    [],
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
