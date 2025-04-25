import { useRef, useState, useLayoutEffect, useEffect } from 'react';
import { createPortal } from 'react-dom';

const statusOptions = [
  { label: 'Playing', value: 'playing', classNames: '' },
  { label: 'Backlog', value: 'backlog', classNames: '' },
  { label: 'Completed', value: 'completed', classNames: '' },
  { label: 'Wishlist', value: 'wishlist', classNames: '' },
];

export default function FancySelect() {
  const triggerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownStyle, setDropdownStyle] = useState({});
  const [selected, setSelected] = useState(null);
  const [dropdownContainer, setDropdownContainer] = useState(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  useLayoutEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setDropdownStyle({
        position: 'fixed',
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
        background: 'white',
        border: '1px solid #ccc',
        borderRadius: 4,
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        zIndex: 9999,
      });
    }
  }, [isOpen]);

  useEffect(() => {
    // Find the closest dialog element and append the dropdown to it
    if (triggerRef.current) {
      const dialog = triggerRef.current.closest('dialog');
      if (dialog) {
        setDropdownContainer(dialog);
      } else {
        setDropdownContainer(document.body); // fallback
      }
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!triggerRef.current?.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleSelect = (opt) => {
    setSelected(opt);
    setIsOpen(false);
  };

  return (
    <>
      <button
        ref={triggerRef}
        onClick={toggleDropdown}
        style={{
          padding: '8px 12px',
          border: '1px solid #ccc',
          borderRadius: 4,
          background: 'white',
        }}
      >
        {selected || 'Select an option'}
      </button>

      {isOpen &&
        dropdownContainer &&
        createPortal(
          <div style={dropdownStyle}>
            {statusOptions.map((opt) => (
              <div
                key={opt.value}
                onClick={() => handleSelect(opt.value)}
                style={{
                  padding: '8px 12px',
                  cursor: 'pointer',
                  borderBottom: '1px solid #eee',
                }}
              >
                {opt.label}
              </div>
            ))}
          </div>,
          dropdownContainer,
        )}
    </>
  );
}
