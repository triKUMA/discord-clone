import { useState } from "react";
import ContextMenuItem, { ContextMenuItemProps } from "./ContextMenuItem";
import { ContextMenuItemGroupProps } from "./ContextMenuItemGroup";
import "./styles/ContextSubMenu.css";

export interface ContextSubMenuProps extends ContextMenuItemProps {
  subMenuItems: ContextMenuItemGroupProps[];
  dir?: "left" | "right";
  itemType: "expandable";
  // ------- Inherited Values: -------
  // text: string;
  // icon?: IconType;
  // itemType?: "radio" | "checklist" | "expandable";
  // onClick: () => void;
  // onMouseEnter?: () => void;
  // onMouseLeave?: () => void;
  // colour?: "discord" | "red";
  // active?: boolean;
  // disabled?: boolean;
}

function ContextSubMenu(props: ContextSubMenuProps) {
  const [subMenuActive, setSubMenuActive] = useState(false);

  return (
    <div className="contextSubMenu">
      <ContextMenuItem
        text={props.text}
        icon={props.icon}
        itemType="expandable"
        onClick={props.onClick}
        onMouseEnter={() => {
          setSubMenuActive(true);
          props.onMouseEnter && props.onMouseEnter();
        }}
        onMouseLeave={() => {
          setSubMenuActive(false);
          props.onMouseLeave && props.onMouseLeave();
        }}
        colour={props.colour}
        active={props.active}
        disabled={props.disabled}
      />
    </div>
  );
}

export default ContextSubMenu;
