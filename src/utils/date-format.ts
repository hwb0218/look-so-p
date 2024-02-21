export default function dateFormat(date?: Date) {
  const formatedDate = new Intl.DateTimeFormat('ko-KR', {
    dateStyle: 'short',
    timeStyle: 'short',
    hour12: false,
  }).format(date);

  return formatedDate ?? '';
}
