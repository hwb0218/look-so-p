export default function getImageData(event: React.ChangeEvent<HTMLInputElement>) {
  const dataTransfer = new DataTransfer();

  Array.from(event.target.files!).forEach((image) => dataTransfer.items.add(image));

  const files = dataTransfer.files;
  const displayUrl = Array.from(files).map((file) => URL.createObjectURL(file));

  return { files, displayUrl };
}
