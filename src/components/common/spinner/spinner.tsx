import Wrapper from '../ui/wrapper';

export default function Loading() {
  return (
    <Wrapper className="absolute top-4 left-4">
      <img src="/spinner.gif" alt="로딩" width="60%" />
    </Wrapper>
  );
}
