import { createPortal } from 'react-dom';
import { useRef, useEffect, useCallback } from 'react';

export default function Modal({
  children,
  open,
  onClose,
  className = '',
  dialogInnerClassName = '',
  closeOnClickOutside = false,
}) {
  const dialog = useRef();
  const innerContainer = useRef();
  let dialogInnerClasses = 'dialog-inner';

  function handleClickOutside(event) {
    if (
      innerContainer.current &&
      !innerContainer.current.contains(event.target)
    ) {
      onClose(); // User clicked outside the dialog
    }
  }

  useEffect(() => {
    const modal = dialog.current; // lock-in the value to this modal

    if (open) {
      modal.showModal();

      if (closeOnClickOutside) {
        document.addEventListener('mousedown', handleClickOutside);
      }
    }

    return () => {
      modal.close();

      if (closeOnClickOutside) {
        document.removeEventListener('mousedown', handleClickOutside);
      }
    };
  }, [open]);

  if (dialogInnerClassName !== '') {
    dialogInnerClasses += ' ' + dialogInnerClassName;
  }

  return createPortal(
    <dialog ref={dialog} className={`modal ${className}`} onClose={onClose}>
      <div className={dialogInnerClasses} ref={innerContainer}>
        {children}
      </div>
    </dialog>,
    document.getElementById('modal'),
  );
}
