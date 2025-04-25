import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState, useLayoutEffect, useEffect } from 'react';
import { createPortal } from 'react-dom';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.1,
      staggerDirection: -1, // Animate children bottom-to-top
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

function getOptionClassNames(options, selectOption) {
  return (
    options.find((opt) => opt.value === selectOption?.value).classNames || ''
  );
}

export default function FancySelect({
  options,
  dropdownPosition = 'top',
  defaultValue,
  value,
  onChange,
  name,
}) {
  const triggerRef = useRef(null);
  const dropdownContainerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownStyle, setDropdownStyle] = useState({});
  const [internalSelected, setInternalSelected] = useState(
    options.find((opt) => opt.value === defaultValue) || null,
  );

  const selected = value
    ? options.find((opt) => opt.value === value)
    : internalSelected;

  function toggleDropdown() {
    setIsOpen((prev) => !prev);
  }

  function handleSelect(opt) {
    if (onChange) {
      onChange(opt.value);
    }
    if (!value) {
      setInternalSelected(opt); // uncontrolled mode
    }
    setIsOpen(false);
  }

  // update the css for selected option based on the option
  const selectedClasess =
    options.find((i) => i.value === selected?.value)?.classNames ||
    options[0].classNames;

  // Recalculate dropdown position
  useLayoutEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const scrollY = window.scrollY;
      const scrollX = window.scrollX;

      setDropdownStyle({
        position: 'fixed',
        top:
          dropdownPosition === 'top'
            ? rect.top + scrollY - 8
            : rect.bottom + scrollY,
        transform: dropdownPosition === 'top' ? 'translateY(-100%)' : 'none',
        left: rect.left + scrollX,
        width: rect.width,
        zIndex: 9999,
      });
    }
  }, [isOpen, dropdownPosition]);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e) => {
      if (
        !triggerRef.current?.contains(e.target) &&
        !dropdownContainerRef.current?.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Close if trigger moves or window resizes, or when user scrolls while the options are displayed
  useEffect(() => {
    if (!isOpen || !triggerRef.current) return;

    let prevRect = triggerRef.current.getBoundingClientRect();

    const checkPositionChange = () => {
      const rect = triggerRef.current.getBoundingClientRect();
      const moved =
        rect.top !== prevRect.top ||
        rect.left !== prevRect.left ||
        rect.width !== prevRect.width ||
        rect.height !== prevRect.height;

      if (moved) setIsOpen(false);
    };

    const interval = setInterval(checkPositionChange, 100);
    const handleResize = () => setIsOpen(false);

    window.addEventListener('resize', handleResize);
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen]);

  return (
    <>
      <button
        ref={triggerRef}
        onClick={toggleDropdown}
        type='button'
        className={`w-max min-w-fit cursor-pointer rounded-full border border-stone-700/50 px-5 py-1 text-left backdrop-blur-md ${selectedClasess}`}
      >
        {selected?.label || 'Please Select'}
      </button>

      {name && selected && (
        <input type='hidden' name={name} value={selected.value} />
      )}

      {createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div
              id='dropdownContainer'
              style={dropdownStyle}
              ref={dropdownContainerRef}
              initial='hidden'
              animate='visible'
              exit='hidden'
              variants={containerVariants}
              onMouseDown={(e) => e.stopPropagation()}
            >
              {options.map((opt) => (
                <motion.div
                  key={opt.value}
                  variants={itemVariants}
                  onClick={() => handleSelect(opt)}
                  className={`w-max min-w-fit cursor-pointer rounded-full px-5 py-1 text-left backdrop-blur-md not-first:mt-1 ${getOptionClassNames(options, opt)}`}
                >
                  {opt.label}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
}
