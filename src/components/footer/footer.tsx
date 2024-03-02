import Wrapper from '@components/common/ui/wrapper';

import IconLink from '@src/assets/link.svg';
import IconGithub from '@src/assets/github.svg';
import IconBlog from '@src/assets/blog.svg';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <Wrapper className="flex flex-col justify-center items-center h-[300px] bg-gray-900 border-t px-5">
      <Wrapper className="mb-5 text-2xl text-lime-500">
        <strong>Look So Pretty</strong>
      </Wrapper>
      <Wrapper className="*:inline-block *:w-9 *:h-9 *:mx-3 *:cursor-pointer">
        <Link to="https://litt.ly/hwb0218/" target="_blank" rel="noopener noreferrer">
          <IconLink className="w-full h-full" />
        </Link>
        <Link to="https://github.com/hwb0218/" target="_blank" rel="noopener noreferrer">
          <IconGithub className="w-full h-full" />
        </Link>
        <Link to="https://hwb0218.tistory.com/" target="_blank" rel="noopener noreferrer">
          <IconBlog className="w-full h-full" />
        </Link>
      </Wrapper>
    </Wrapper>
  );
}
