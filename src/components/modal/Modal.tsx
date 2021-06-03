import React from "react";
import styled from "styled-components";

const ModalBackDrop = styled.div`
  display: ${({show}: { show: boolean }) => (show ? 'block' : 'none')};
  position: fixed;
  z-index: 1;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
`;

const ModalHeader = styled.div`
  margin-bottom: 20px;
  padding-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e3e3e3;
`;

const ModalBody = styled.div`
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  max-width: 100%;
  width: 500px;
  min-height: 150px;
`;

const ModalClose = styled.button`
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  background: none;
  border: 0;
  &:hover, &:focus
  {
    color: #000;
    text-decoration: none;
    cursor: pointer;
  }
`;

interface ModalProps {
  isOpen: boolean;
  onClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  title: string;
}

const Modal = React.memo(({isOpen, children, onClose, title}: ModalProps) => {
  return (<ModalBackDrop show={isOpen}>
    <ModalBody>
      <ModalHeader>
        <span>{title}</span>
        <ModalClose onClick={onClose}>&times;</ModalClose>
      </ModalHeader>
      <div>
        {children}
      </div>
    </ModalBody>
  </ModalBackDrop>);
});

export default Modal;
