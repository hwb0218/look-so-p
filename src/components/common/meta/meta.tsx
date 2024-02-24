import { Helmet } from 'react-helmet-async';

interface Props {
  title: string;
  url: string;
  desc: string;
}

export default function Meta({ title, url, desc }: Props) {
  return (
    <Helmet>
      <meta property="og:title" content={title} />
      <meta property="og:url" content={url} />
      <meta property="og:description" content={desc} />
    </Helmet>
  );
}
