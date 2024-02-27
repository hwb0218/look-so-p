import Wrapper from '@components/common/ui/wrapper';

export default function NotFound() {
  return (
    <Wrapper className="w-screen h-screen bg-amber-100 ">
      <img src="/404.png" className="block w-full h-full" />
    </Wrapper>
  );
}
