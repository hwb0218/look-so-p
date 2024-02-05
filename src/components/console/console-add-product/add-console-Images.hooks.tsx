import { useRef, useState } from 'react';
// import { FieldValues, UseFormReturn } from 'react-hook-form';

import { getImageData } from '@src/utils/image-data';

// interface RequiredFields extends FieldValues {
//   previewUrls?: string[];
//   previewThumbnailUrls?: string[];
// }

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

  const onChangeThumbnailInput = (e: React.ChangeEvent<HTMLInputElement>, onChange: (...event: FileList[]) => void) => {
    const { files, previewUrls } = getImageData({ selectedImages: e.target?.files as FileList });
    setPreveiwThumbnailUrls(previewUrls);
    onChange(files);
  };

  const onChangeFileInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (...event: FileList[]) => void,
    value?: FileList,
  ) => {
    const limitedFileLength = 3;
    const prevFiles = value?.length ?? 0;
    const currrentFiles = e.target?.files?.length ?? 0;
    const isOverMaxFiles = prevFiles + currrentFiles > limitedFileLength;

    if (isOverMaxFiles) {
      e.target.value = '';
      return alert(`최대 ${limitedFileLength}개의 파일만 선택할 수 있습니다.`);
    }

    const { files, previewUrls } = getImageData({
      selectedImages: e.target?.files as FileList,
      prevImages: value,
      multiple: true,
    });

    setPreviewImageUrls(previewUrls);
    onChange(files);
  };

  // const onResetFileInput = ({ targetImage, images }: { targetImage: number; images: FileList }) => {
  //   const { files, previewUrls } = resetImageData({ selectedImages: images, index: targetImage });
  //   return { files, previewUrls };
  // };

  return {
    previewImageUrls,
    previewThumbnailUrls,
    thumbnailInputRef,
    inputRef,
    setPreviewImageUrls,
    setPreveiwThumbnailUrls,
    onClickInput,
    // onResetFileInput,
    onChangeThumbnailInput,
    onChangeFileInput,
  };
}
