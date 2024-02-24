import { Outlet } from 'react-router-dom';

import ConsoleNav from './console-nav';
import Wrapper from '@components/common/ui/wrapper';

function ConsoleLayout() {
  return (
    <div>
      <ConsoleNav />
      <Wrapper className="ml-60 mt-[80px] pt-5">
        <Outlet />
      </Wrapper>
    </div>
  );
}

export default ConsoleLayout;
