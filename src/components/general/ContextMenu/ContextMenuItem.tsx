import { IconType } from "react-icons";
import "./styles/ContextMenuItem.css";

export interface ContextMenuItemProps {
  text: string;
  itemType?: "radio" | "checklist" | "expandable";
  onClick?: () => void;
  colour?: "discord" | "red";
  icon?: IconType;
  active?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

function ContextMenuItem(props: ContextMenuItemProps) {
  return (
    <button
      className={
        "contextMenuItem" +
        (props.colour ? ` ${props.colour}` : "") +
        (typeof props.active !== "undefined" && !props.active ? " disable" : "")
      }
      onClick={(e) => {
        e.stopPropagation();
        props.onClick && props.onClick();
      }}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
    >
      <p className="text">{props.text}</p>
    </button>
  );
}

export default ContextMenuItem;
