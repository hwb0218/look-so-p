export default function genUID() {
  return new Date().getTime().toString(36);
}
