export default function formatNumber(num: string) {
  let str = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  if (str[0] === '0') {
    str = str.slice(1);
  }

  return str;
}
