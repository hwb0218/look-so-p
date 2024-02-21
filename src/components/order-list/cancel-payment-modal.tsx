import { useCancelOrderListQuery } from '@hooks/use-fetch-order-list-query';

import { useModalContext } from '@providers/modal';

import { Modal } from '@components/common/modal';

interface Props {
  orderId: string;
  orderListId: string;
}

export default function CancelPaymentModal({ orderId, orderListId }: Props) {
  const { closeModal } = useModalContext();
  const { mutate } = useCancelOrderListQuery();

  const handleClickConfirm = () => {
    mutate({ orderId, orderListId });
    closeModal();
  };

  const handleClickCancel = () => {
    closeModal();
  };

  return (
    <Modal>
      <Modal.Header>상품 구매를 취소하시겠어요?</Modal.Header>
      <Modal.Description>취소하기 전에 상품 정보를 한 번 더 확인해 주세요</Modal.Description>
      <Modal.Footer>
        <Modal.Confirm onClick={handleClickConfirm}>예, 취소합니다</Modal.Confirm>
        <Modal.Cancel onClick={handleClickCancel}>아니오</Modal.Cancel>
      </Modal.Footer>
    </Modal>
  );
}
