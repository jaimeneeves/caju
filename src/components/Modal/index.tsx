import { ReactNode } from 'react';
import styled from 'styled-components';
import { ButtonSmall } from "~/components/Buttons";
import {
  HiX
} from "react-icons/hi";

type ModalProps =  {
  title: string;
  children: ReactNode;
  onConfirm: () => void;
  onClose: () => void;
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: white;
  border-radius: 8px;
  padding: 24px;
  max-width: 500px;
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding-bottom: 16px;
  margin-bottom: 16px;
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
`;

const ModalBody = styled.div`
  margin-bottom: 24px;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
`;

const Modal = ({ title, children, onConfirm, onClose }: ModalProps) => {
  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <CloseButton onClick={onClose} aria-label="close"><HiX /></CloseButton>
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <ButtonSmall bgcolor="#f44336" color="#fff" onClick={onClose}>Cancel</ButtonSmall>
          <ButtonSmall bgcolor="#64a98c" color="#fff" data-cy="modal-confirm" onClick={onConfirm}>Confirmar</ButtonSmall>
        </ModalFooter>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default Modal;
