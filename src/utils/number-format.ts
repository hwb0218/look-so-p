export default function numberFormat(value: number | string) {
  if (typeof value === 'string') {
    value = Number(value);
  }

  return new Intl.NumberFormat().format(value);
}
