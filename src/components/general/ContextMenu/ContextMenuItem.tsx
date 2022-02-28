import { IconType } from "react-icons";
import "./styles/ContextMenuItem.css";
import { FiChevronRight } from "react-icons/fi";
import { IoMdRadioButtonOff, IoMdRadioButtonOn } from "react-icons/io";
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";

export interface ContextMenuItemProps {
  text: string;
  icon?: IconType;
  itemType?: "radio" | "checklist" | "expandable";
  onClick: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  colour?: "discord" | "red";
  active?: boolean;
  disabled?: boolean;
}

function ContextMenuItem(props: ContextMenuItemProps) {
  return (
    <button
      className={
        "contextMenuItem" +
        (props.colour ? ` ${props.colour}` : "") +
        (props.active ? " active" : "") +
        (props.disabled ? " disabled" : "")
      }
      onClick={(e) => {
        e.stopPropagation();
        props.onClick && props.onClick();
      }}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
    >
      <p className="text">{props.text}</p>

      {props.itemType === "expandable" ? (
        <FiChevronRight className="icon" />
      ) : props.itemType === "radio" ? (
        !props.active ? (
          <IoMdRadioButtonOff className="icon" />
        ) : (
          <IoMdRadioButtonOn className="icon" />
        )
      ) : props.itemType === "checklist" ? (
        !props.active ? (
          <MdCheckBoxOutlineBlank className="icon" />
        ) : (
          <MdCheckBox className="icon" />
        )
      ) : (
        props.icon && <props.icon className="icon" />
      )}
    </button>
  );
}

export default ContextMenuItem;
