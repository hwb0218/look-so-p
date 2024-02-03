export default function extractPathFromUrl(url: string) {
  const regex = /\/o\/(.*)\?alt/;
  const matched = url.match(regex);

  if (matched && matched[1]) {
    return matched[1];
  }

  return null;
}
