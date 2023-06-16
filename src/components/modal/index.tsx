import React, { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import { FiX } from 'react-icons/fi';
import styles from './Modal.module.scss';
import classNames from 'classnames';

interface AModalProps extends ReactModal.Props {
  onClose: () => void;
}

const customStyles = {
  overlay: {
    // Overlay 样式
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 9999
  },
  content: {
    // Content 样式
  }
};
ReactModal.setAppElement('body');

export const AModal = (props: AModalProps) => {
  const [open, setOpen] = useState(props.isOpen ?? false);

  const close = () => {
    props?.onClose();
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      document.documentElement.style.overflow = 'hidden';
    }
    return () => {
      document.documentElement.style.overflow = 'initial';
    };
  }, [open]);

  return (
    <ReactModal
      {...props}
      isOpen={open}
      closeTimeoutMS={200}
      className={classNames(styles.awa__modal, open && styles.awa__modal__open)}
      style={customStyles}
      onRequestClose={close}
    >
      <div className="flex justify-end">
        <FiX size={24} onClick={close} className="cursor-pointer" />
      </div>
      <div className="px-4 pb-10">{props.children}</div>
    </ReactModal>
  );
};
