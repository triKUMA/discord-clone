import { ContextMenuItemProps } from "./ContextMenuItem";
import { ContextMenuItemGroupProps } from "./ContextMenuItemGroup";
import "./styles/ContextSubMenu.css";

export interface ContextSubMenuProps extends ContextMenuItemProps {
  listType?: "list" | "radio" | "checklist";
  items: ContextMenuItemGroupProps[];
}

function ContextSubMenu(props: ContextSubMenuProps) {
  return <div className="contextSubMenu"></div>;
}

export default ContextSubMenu;
