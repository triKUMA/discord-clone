import { IconType } from "react-icons";
import "./styles/ContextMenuItem.css";

export interface ContextMenuItemProps {
  text: string;
  itemType?: "list" | "radio" | "checklist";
  onClick: () => void;
  colour?: "default" | "discord" | "red";
  icon?: IconType;
  active?: boolean;
  breakAfter?: boolean;
}

function ContextMenuItem(props: ContextMenuItemProps) {
  return <div className="contextMenuItem"></div>;
}

export default ContextMenuItem;
