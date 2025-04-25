import { createPortal } from 'react-dom';
import { useEffect, useRef } from 'react';

export default function Modal({
  children,
  open,
  onClose,
  className = '',
  modalInnerClassName = '',
  closeOnClickOutside = false,
}) {
  const innerContainer = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        innerContainer.current &&
        !innerContainer.current.contains(event.target) &&
        event.button === 0
      ) {
        onClose?.();
      }
    };

    if (open && closeOnClickOutside) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [open, closeOnClickOutside, onClose]);

  // prevent the user from scrolling the body if the modal is open(ed)
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;

    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = originalStyle;
    }

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [open]);

  if (!open) return null;

  const dialogInnerClasses = `modal-inner ${modalInnerClassName || ''}`;

  return createPortal(
    <div className='modal-overlay'>
      <div className={`modal ${className}`}>
        <div ref={innerContainer} className={dialogInnerClasses}>
          {children}
        </div>
      </div>
    </div>,
    document.getElementById('modal'),
  );
}
