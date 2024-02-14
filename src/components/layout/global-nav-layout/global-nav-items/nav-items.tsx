import { NavLink } from 'react-router-dom';

import { Li } from '@components/common/list';

import { ROUTE_PATHS } from '@constants/routes';
import { useCartContext } from '@providers/cart';

const NAVIGATION_ITEMS = [
  {
    title: '전체상품',
    to: ROUTE_PATHS.PRODUCT_ALL,
  },
];

function NavItems() {
  const { handleOpenCart } = useCartContext();

  return (
    <>
      <Li className="ml-2">
        <button onClick={handleOpenCart}>장바구니</button>
      </Li>
      {NAVIGATION_ITEMS.map(({ title, to }) => (
        <Li key={to} className="ml-2">
          <NavLink to={to}>
            <span>{title}</span>
          </NavLink>
        </Li>
      ))}
    </>
  );
}

export default NavItems;
