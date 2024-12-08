import React from 'react';
import ReactModal from 'react-modal';

interface IProps {
  children?: React.ReactNode;
  isOpen: boolean;
  onClose?: () => void;
}

function Modal({children, isOpen, onClose}: IProps) {
  return (
    <ReactModal
      appElement={document.getElementById("root")!}
      isOpen={isOpen}
      className="bg-white dark:bg-primary-950 w-full max-w-5xl h-screen overflow-y-auto fixed right-0 slide-in z-[100]"
      htmlOpenClassName="overflow-hidden"
      overlayClassName="bg-black bg-opacity-70 w-full h-full fixed top-0 left-0 bottom-0 right-0 z-[90]"
      onRequestClose={onClose}
    >
      {children ?? <p>Nothing</p>}
    </ReactModal>
  );
}

export default Modal;
