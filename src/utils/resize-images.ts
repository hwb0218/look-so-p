import imageCompression from 'browser-image-compression';

export default async function resizeImages(images: FileList) {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 800,
    useWebWorker: true,
  };
  try {
    const compressionPromises = Array.from(images).map(async (imageFile: File) => {
      const compressedBlob: Blob = await imageCompression(imageFile, options);

      const compressedFile = new File([compressedBlob], imageFile.name, { type: imageFile.type });
      return compressedFile;
    });

    const compressedFiles: File[] = await Promise.all(compressionPromises);

    const dataTransfer = new DataTransfer();
    compressedFiles.forEach((file) => dataTransfer.items.add(file));

    return dataTransfer.files;
  } catch (error) {
    console.log(error);
  }
}
