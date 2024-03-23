import { useState, createContext, useMemo } from 'react';

interface ModalContextProps {
  isOpen: 'open' | 'closed';
  modalContent: React.ReactNode;
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;
}

export const ModalContext = createContext<ModalContextProps>({
  isOpen: 'closed',
  modalContent: null,
  openModal: () => {},
  closeModal: () => {},
});

interface Props {
  children: React.ReactNode;
}

export default function ModalProvider({ children }: Props) {
  const [isOpen, setIsOpen] = useState<'open' | 'closed'>('closed');
  // const [visible, setVisible] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);

  const openModal = (content: React.ReactNode) => {
    setModalContent(content);
    // setVisible(true);
    setIsOpen('open');
  };

  const closeModal = () => {
    setIsOpen('closed');
    // setVisible(false);
    setTimeout(() => {
      setModalContent(null);
    }, 250);
  };

  const contextValue = useMemo(() => ({ isOpen, modalContent, openModal, closeModal }), [isOpen, modalContent]);

  return <ModalContext.Provider value={contextValue}>{children}</ModalContext.Provider>;
}
