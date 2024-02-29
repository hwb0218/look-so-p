import { useModalContext } from '@providers/modal';
import WarningIcon from '@src/assets/triangle_warning.svg';

import { Modal } from '@components/common/modal';

interface Props {
  onDeleteGoods: () => void;
}

export default function DeleteGoodsAlert({ onDeleteGoods }: Props) {
  const { isOpen, closeModal } = useModalContext();

  const handleClickConfirm = async () => {
    onDeleteGoods();
    closeModal();
  };

  const handleClickCancel = () => {
    closeModal();
  };

  return (
    <Modal data-state={isOpen}>
      <Modal.Header>
        <WarningIcon fill="#000" className="relative -top-[2px]" />
        <span>정말 상품을 삭제하시겠습니까?</span>
      </Modal.Header>
      <Modal.Description>삭제하기 전 상품 정보를 한 번 더 확인해 주세요</Modal.Description>
      <Modal.Footer>
        <Modal.Confirm onClick={handleClickConfirm}>예, 삭제합니다</Modal.Confirm>
        <Modal.Cancel onClick={handleClickCancel}>아니오</Modal.Cancel>
      </Modal.Footer>
    </Modal>
  );
}
