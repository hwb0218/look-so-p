import { useState, createContext, useMemo } from 'react';

interface ModalContextProps {
  modalContent: React.ReactNode;
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;
}

export const ModalContext = createContext<ModalContextProps>({
  modalContent: null,
  openModal: () => {},
  closeModal: () => {},
});

interface Props {
  children: React.ReactNode;
}

export default function ModalProvider({ children }: Props) {
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);

  const openModal = (content: React.ReactNode) => setModalContent(content);
  const closeModal = () => setModalContent(null);

  const contextValue = useMemo(() => ({ modalContent, openModal, closeModal }), [modalContent]);

  return <ModalContext.Provider value={contextValue}>{children}</ModalContext.Provider>;
}
