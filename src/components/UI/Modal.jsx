import { createPortal } from 'react-dom';
import { useRef, useEffect, useCallback } from 'react';

export default function Modal({ children, open, onClose, className = '' }) {
  const dialog = useRef();
  const innerContainer = useRef();

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
      // document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      modal.close();
      // document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  return createPortal(
    <dialog ref={dialog} className={`modal ${className}`} onClose={onClose}>
      <div className='dialog-inner' ref={innerContainer}>
        {children}
      </div>
    </dialog>,
    document.getElementById('modal'),
  );
}
