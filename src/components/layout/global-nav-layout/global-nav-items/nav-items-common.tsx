import { useNavigate } from 'react-router-dom';

import { Li } from '@components/common/ui/list';

import { useCartContext } from '@providers/cart';
import { useAuthContext } from '@providers/auth';

function NavItemsCommon() {
  const navigate = useNavigate();
  const { state } = useAuthContext();
  const { cart, onShowOverlay } = useCartContext();

  const handleClickCartBtn = () => {
    if (!state.auth?.uid) {
      return navigate('/login');
    }
    onShowOverlay();
  };

  return (
    <>
      <Li onClick={handleClickCartBtn} className="relative md:ml-2 leading-4 cursor-pointer">
        <img src="/shopping_cart_01.svg" alt="장바구니" className="w-full h-full" />
        {cart?.length > 0 && (
          <strong className="w-5 h-5 absolute -top-2 -right-2 leading-[23px] text-center text-sm text-gray-50 bg-lime-500 rounded-full">
            {cart.length}
          </strong>
        )}
      </Li>
    </>
  );
}

export default NavItemsCommon;
