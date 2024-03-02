import Wrapper from '../ui/wrapper';

export default function Spinner() {
  return (
    <>
      <Wrapper className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
        <img src="/spinner.svg" alt="로딩" />
      </Wrapper>
      <Wrapper className="min-h-[calc(100vh_-_72px)]" />
    </>
  );
}
