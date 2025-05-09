import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title?: string;
  message?: string;
  children?: ReactNode;
}

export const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm",
  children,
  message = "Are you sure you want to proceed?",
}: ConfirmModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-sm text-center"
      >
        {/** Ícono */}
        <HiOutlineExclamationTriangle
          className="mx-auto mb-4 text-yellow-500 dark:text-yellow-400"
          size={48}
        />

        {/** Título */}
        <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
          {title}
        </h2>

        {/** Aca es donde agregamos lo nuevo 👇 */}
        {message && (
          <p className="text-gray-700 dark:text-gray-300 mb-6">{message}</p>
        )}

        {children}

        {/** BOTONES */}
        <div className="flex justify-center space-x-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-400 dark:hover:bg-gray-600"
          >
            Cancel
          </button>
          {onConfirm && (
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Confirm
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};
