export default function getImageData({
  event,
  prevImages,
  multiple = false,
}: {
  event: React.ChangeEvent<HTMLInputElement>;
  prevImages?: FileList;
  multiple?: boolean;
}) {
  const dataTransfer = new DataTransfer();

  if (multiple && prevImages) {
    Array.from(prevImages).forEach((image) => dataTransfer.items.add(image));
  }

  Array.from(event.target.files!).forEach((image) => dataTransfer.items.add(image));

  const files = dataTransfer.files;
  const displayUrl = Array.from(files).map((file) => URL.createObjectURL(file));

  return { files, displayUrl };
}
