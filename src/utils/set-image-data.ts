// TODO: set-image-data 변경

export function getImageData({
  selectedImages,
  prevImages,
  multiple = false,
}: {
  selectedImages: FileList;
  prevImages?: FileList;
  multiple?: boolean;
}) {
  const dataTransfer = new DataTransfer();

  if (multiple && prevImages) {
    Array.from(prevImages).forEach((image) => dataTransfer.items.add(image));
  }
  Array.from(selectedImages).forEach((image) => dataTransfer.items.add(image));

  const files = dataTransfer.files;
  const previewUrls = Array.from(files).map((file) => URL.createObjectURL(file));

  return { files, previewUrls };
}

export function resetImageData({
  selectedImages,
  previewImageUrls,
  index,
}: {
  selectedImages: FileList | File[];
  previewImageUrls: string[];
  index: number;
}) {
  const dataTransfer = new DataTransfer();

  Array.from(selectedImages)
    .filter((_, i) => i !== index)
    .forEach((image) => dataTransfer.items.add(image));

  const files = dataTransfer.files;
  const previewUrls = previewImageUrls.filter((_, i) => i !== index);

  return { files, previewUrls };
}
