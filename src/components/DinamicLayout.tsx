import { useLayout } from "../context/LayoutContext";
import { LayoutNavbar } from "../layouts/LayoutNavbar";
import { LayoutSidebar } from "../layouts/LayoutSidebar";

export const DynamicLayout = () => {
  const { layout } = useLayout();

  return layout === "sidebar" ? <LayoutSidebar /> : <LayoutNavbar />;
};
