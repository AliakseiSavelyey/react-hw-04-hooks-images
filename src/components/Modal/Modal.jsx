import{Overlay, ModalStyled} from '../Modal/Modal.styled'
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';

const modalRoot = document.querySelector('#modal-root');

export function Modal({ onClose, children, prevChildren, nextChildren }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <ModalStyled>{children}</ModalStyled>
      {/* <BtnClose type="button" onClick={onClose}>
        <GrClose style={{ width: 30, height: 30, margin: 0 }} />
      </BtnClose> */}
    </Overlay>,
    modalRoot
  );
}

Modal.propTypes = {
  onClose: PropTypes.func,
  children: PropTypes.node.isRequired,
};