import { IconType } from "react-icons";
import "./styles/ContextMenuItem.css";
import { IoMdRadioButtonOff, IoMdRadioButtonOn } from "react-icons/io";
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";

export interface ContextMenuItemProps {
  text: string;
  icon?: IconType;
  itemType?: "radio" | "checklist" | "expandable";
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  colour?: "discord" | "red" | "pink";
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
      onMouseEnter={() => {
        typeof props.disabled !== "undefined"
          ? !props.disabled && props.onMouseEnter && props.onMouseEnter()
          : props.onMouseEnter && props.onMouseEnter();
      }}
      onMouseLeave={() => {
        typeof props.disabled !== "undefined"
          ? !props.disabled && props.onMouseLeave && props.onMouseLeave()
          : props.onMouseLeave && props.onMouseLeave();
      }}
    >
      <p className="text">{props.text}</p>

      {props.itemType === "radio" ? (
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
