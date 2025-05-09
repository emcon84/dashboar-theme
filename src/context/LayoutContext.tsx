import { createContext, useContext, useState, type ReactNode } from "react";

type LayoutType = "sidebar" | "navbar";

interface LayoutContextProps {
  layout: LayoutType;
  toggleLayout: () => void;
}

const LayoutContext = createContext<LayoutContextProps | undefined>(undefined);

export const LayoutProvider = ({ children }: { children: ReactNode }) => {
  const [layout, setLayout] = useState<LayoutType>("sidebar");

  const toggleLayout = () => {
    setLayout((prev) => (prev === "sidebar" ? "navbar" : "sidebar"));
  };

  return (
    <LayoutContext.Provider value={{ layout, toggleLayout }}>
      {children}
    </LayoutContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayout must be used within a LayoutProvider");
  }
  return context;
};
