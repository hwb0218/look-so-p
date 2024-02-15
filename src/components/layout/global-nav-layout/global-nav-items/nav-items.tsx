import { NavLink, useNavigate } from 'react-router-dom';

import { Li } from '@components/common/list';

import { useCartContext } from '@providers/cart';
import { useAuthContext } from '@providers/auth';

// import { ROUTE_PATHS } from '@constants/routes';

// const NAVIGATION_ITEMS = [
//   {
//     title: '전체상품',
//     to: ROUTE_PATHS.PRODUCT_ALL,
//   },
// ];

function NavItems() {
  const navigate = useNavigate();
  const { state } = useAuthContext();
  const { cart, onOpenCart } = useCartContext();

  const handleClickCartBtn = (e: React.MouseEvent) => {
    if (!state.auth?.uid) {
      return navigate('/login');
    }
    onOpenCart(e);
  };

  return (
    <>
      <Li onClick={handleClickCartBtn} className="relative ml-3 leading-4 cursor-pointer">
        <img src="/shopping_cart_01.svg" alt="장바구니" />
        <strong className="w-5 h-5 absolute -top-2 -right-2 leading-6 text-center text-sm text-gray-50 bg-lime-500 rounded-full">
          {cart.length}
        </strong>
      </Li>
      {/* {NAVIGATION_ITEMS.map(({ title, to }) => (
        <Li key={to} className="ml-3">
          <NavLink to={to}>
            <span>{title}</span>
          </NavLink>
        </Li>
      ))} */}
    </>
  );
}

export default NavItems;
