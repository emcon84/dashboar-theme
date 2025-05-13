import toast, { type ToastOptions } from "react-hot-toast";

const baseOptions: ToastOptions = {
  style: {
    borderRadius: "8px",
    background: "#f0f0f0",
    color: "#333",
    padding: "12px 16px",
  },
  position: "top-right",
};

export const Toast = {
  success: (message: string) =>
    toast.success(message, {
      ...baseOptions,
      icon: "✅",
    }),

  error: (message: string) =>
    toast.error(message, {
      ...baseOptions,
      icon: "❌",
      style: {
        ...baseOptions.style,
        background: "#fee2e2",
        color: "#b91c1c",
      },
    }),

  info: (message: string) =>
    toast(message, {
      ...baseOptions,
      icon: "ℹ️",
      style: {
        ...baseOptions.style,
        background: "#e0f2fe",
        color: "#0c4a6e",
      },
    }),
};
