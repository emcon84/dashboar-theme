import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";

import type { ReactNode } from "react";

interface AccordionItem {
  title: ReactNode;
  content: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  singleOpen?: boolean; // solo uno abierto a la vez
}

export const Accordion = ({ items, singleOpen = false }: AccordionProps) => {
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const toggle = (index: number) => {
    setOpenIndexes((prev) => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index);
      } else {
        return singleOpen ? [index] : [...prev, index];
      }
    });
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const isOpen = openIndexes.includes(index);
        return (
          <div
            key={index}
            className="rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
          >
            <button
              onClick={() => toggle(index)}
              className="flex justify-between items-center w-full p-4 text-left text-gray-800 dark:text-gray-100 font-semibold"
            >
              {item.title}
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <FiChevronDown />
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="px-4 pb-4 pt-0 text-sm text-gray-700 dark:text-gray-300"
                  layout
                >
                  {item.content}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};
