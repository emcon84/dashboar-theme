import type { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiAlertCircle,
  FiCheckCircle,
  FiInfo,
  FiXCircle,
} from "react-icons/fi";

interface AlertProps {
  type?: "success" | "error" | "info" | "warning";
  message: string;
  description?: string;
  icon?: ReactNode;
  visible?: boolean; // para controlar con estado si se muestra
}

const baseColors = {
  success: {
    bg: "bg-green-100",
    border: "border-green-400",
    text: "text-green-800",
    icon: <FiCheckCircle />,
  },
  error: {
    bg: "bg-red-100",
    border: "border-red-400",
    text: "text-red-800",
    icon: <FiXCircle />,
  },
  info: {
    bg: "bg-blue-100",
    border: "border-blue-400",
    text: "text-blue-800",
    icon: <FiInfo />,
  },
  warning: {
    bg: "bg-yellow-100",
    border: "border-yellow-400",
    text: "text-yellow-800",
    icon: <FiAlertCircle />,
  },
};

export const Alert = ({
  type = "info",
  message,
  description,
  icon,
  visible = true,
}: AlertProps) => {
  const colors = baseColors[type];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className={`flex items-start gap-3 p-4 rounded border-l-4 ${colors.bg} ${colors.border}`}
        >
          <div className={`text-xl ${colors.text}`}>{icon || colors.icon}</div>
          <div className="flex-1">
            <p className={`font-semibold ${colors.text}`}>{message}</p>
            {description && (
              <p className={`text-sm mt-1 ${colors.text}`}>{description}</p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
