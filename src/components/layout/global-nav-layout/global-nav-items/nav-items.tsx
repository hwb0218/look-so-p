import { NavLink } from 'react-router-dom';

import { Li } from '@components/common/list';

import { ROUTE_PATHS } from '@constants/routes';

const NAVIGATION_ITEMS = [
  {
    title: '전체상품',
    to: ROUTE_PATHS.PRODUCT_ALL,
  },
];

function NavItems() {
  return (
    <>
      {NAVIGATION_ITEMS.map(({ title, to }) => (
        <Li key={to}>
          <NavLink to={to}>
            <span>{title}</span>
          </NavLink>
        </Li>
      ))}
    </>
  );
}

export default NavItems;
