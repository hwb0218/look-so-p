import { Outlet } from 'react-router-dom';

import ConsoleNav from './console-nav';
import Wrapper from '@components/common/wrapper';

function ConsoleLayout() {
  return (
    <div>
      <ConsoleNav />
      <Wrapper className="ml-60 mt-[80px]">
        <Outlet />
      </Wrapper>
    </div>
  );
}

export default ConsoleLayout;
