import React, { FC, useEffect, useState } from 'react';
import { useDelayClass } from 'hooks/useDelayClass';
import ReactDOM from 'react-dom';

import styles from './Modal.module.scss';

interface ModalProps {
  show: boolean;
  onOverlayClick?: () => any;
}

const Modal: FC<ModalProps> = ({ show, onOverlayClick, children }) => {
  const [isBrowser, setIsBrowser] = useState(false);
  const { visible, render } = useDelayClass({
    show,
    startDelay: 50,
  });

  // Delay for creating  modal
  useEffect(() => {
    setIsBrowser(true);
  }, [setIsBrowser]);

  const ModalContent = render && (
    <div className={`${styles.mainContainer} ${visible ? styles.visible : ''}`}>
      <div className={styles.blackOverlay} onClick={onOverlayClick} />
      <div className={styles.modalContainer}>{children}</div>
    </div>
  );

  if (isBrowser) {
    return ReactDOM.createPortal(
      ModalContent,
      document.getElementById('modal-root')!
    );
  } else {
    return null;
  }
};

export default Modal;
