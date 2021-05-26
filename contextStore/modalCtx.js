import { createContext, useState } from 'react';

export const ModalCtx = createContext({});

export const ModalCtxProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [create, setCreate] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  const modalValues = {
    showModal: showModal,
    closeModal: closeModal,
    setShowModal: setShowModal,
    create: create,
    setCreate: setCreate,
    confirm: confirm,
    setConfirm: setConfirm,
  };

  return <ModalCtx.Provider value={modalValues}>{children}</ModalCtx.Provider>;
};