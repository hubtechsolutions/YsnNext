'use client';
import React, { useEffect, useCallback } from 'react';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface DesktopSearchProps {
  isOpen: boolean;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  open: () => void;
  close: () => void;
}


const DesktopSearchComponent: React.FC<DesktopSearchProps> = ({ isOpen, searchQuery, setSearchQuery, open, close }) => {
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Variants
  const buttonVariants = {
    visible: { opacity: 1, scale: 1 },
    hidden: { opacity: 0, scale: 0.75 }
  } as const;
  const shellVariants = {
    open: {
      width: 240,
      backgroundColor: 'rgba(0,0,0,0.85)',
      boxShadow: '0 4px 18px -2px rgba(168,85,247,0.35)',
      backdropFilter: 'blur(6px)',
      transition: {
        width: { type: 'spring', stiffness: 320, damping: 32 },
        backgroundColor: { duration: 0.25 },
        boxShadow: { duration: 0.25 }
      }
    },
    closed: {
      width: 40,
      backgroundColor: 'rgba(0,0,0,0)',
      boxShadow: '0 0 0 0 rgba(0,0,0,0)',
      backdropFilter: 'blur(0px)',
      transition: {
        width: { duration: 0.22, ease: 'easeInOut' },
        backgroundColor: { duration: 0.18 },
        boxShadow: { duration: 0.18 }
      }
    }
  } as const;
  const closeBtnVariants = {
    open: { opacity: 1, scale: 1, rotate: 0 },
    closed: { opacity: 0, scale: 0.5, rotate: 180 }
  } as const;
  const inputVariants = {
    open: { opacity: 1, x: 0, scale: 1, transition: { delay: 0.05, duration: 0.18 } },
    closed: { opacity: 0, x: 28, scale: 0.95, transition: { duration: 0.12 } }
  } as const;

  // Focus input when opening
  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [isOpen]);

  // Outside click to close
  useEffect(() => {
    if (!isOpen) return;
    const onDown = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        close();
      }
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [isOpen, close]);

  // Stable change handler so motion elements don't think props changed identity each key stroke
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, [setSearchQuery]);

  return (
    <div ref={wrapperRef} className="relative h-10" aria-expanded={isOpen}>
      <div className="w-10 h-10" />
      <motion.button
        className="absolute top-0 right-0 w-10 h-10 flex items-center justify-center cursor-pointer z-20"
        initial={false}
        variants={buttonVariants}
        animate={isOpen ? 'hidden' : 'visible'}
        transition={{ duration: 0.18, ease: 'easeInOut' }}
        style={{ pointerEvents: isOpen ? 'none' : 'auto' }}
        onClick={open}
        type="button"
        aria-label="Open search"
      >
        <Search className="w-5 h-5 text-gray-400" />
      </motion.button>
      <motion.div
        initial={false}
        variants={shellVariants}
        animate={isOpen ? 'open' : 'closed'}
        className="absolute top-0 right-0 h-10 rounded-full flex items-center pr-2 pl-3 overflow-hidden border border-purple-500/60"
        style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
        aria-hidden={!isOpen}
      >
        <motion.input
          ref={inputRef}
          variants={inputVariants}
          initial={false}
          animate={isOpen ? 'open' : 'closed'}
            type="text"
            placeholder="Search..."
            className="bg-transparent text-white text-sm placeholder:text-white/40 outline-none pr-8 w-full"
            value={searchQuery}
            onChange={handleChange}
        />
        <motion.button
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
          type="button"
          variants={closeBtnVariants}
          initial={false}
          animate={isOpen ? 'open' : 'closed'}
          transition={{ duration: 0.18, ease: 'easeOut', delay: 0.05 }}
          onClick={close}
          aria-label="Close search"
        >
          <X className="w-4 h-4" />
        </motion.button>
        <AnimatePresence>
          {isOpen && searchQuery && (
            <motion.ul
              className="bg-gray-900/95 backdrop-blur-sm mt-1 rounded-lg shadow-xl ring-1 ring-purple-500/30 overflow-y-auto scrollbar-thin scrollbar-thumb-custom scrollbar z-50 absolute w-[240px] right-0 top-12"
              initial={{ opacity: 0, y: -4, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.97 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
            >
              <div className="flex items-center justify-center h-24 px-4">
                <p className="text-xs tracking-wide text-white/60">No Results Found</p>
              </div>
            </motion.ul>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export const DesktopSearch = React.memo(DesktopSearchComponent);
export default DesktopSearch;
