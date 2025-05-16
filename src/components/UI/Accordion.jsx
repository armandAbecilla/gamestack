import CaretUp from '../Icons/CaretUp';
import CaretDown from '../Icons/CaretDown';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function Accordion({
  label = 'Accordion',
  isOpen = false,
  children,
}) {
  const [isCollapsed, setIsCollapsed] = useState(!isOpen);

  function handleToggleCollapse() {
    setIsCollapsed(!isCollapsed);
  }

  const caretClasses = 'w-[12px] text-stone-200';

  return (
    <div>
      <button
        className='flex w-full cursor-pointer items-center justify-between hover:opacity-90'
        onClick={handleToggleCollapse}
      >
        {label}

        {isCollapsed ? (
          <CaretDown className={caretClasses} />
        ) : (
          <CaretUp className={caretClasses} />
        )}
      </button>

      <AnimatePresence initial={false}>
        {!isCollapsed && (
          <motion.div
            className='mt-2 overflow-hidden'
            key='content'
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
