import { useState } from "react";
import ContextMenuItem, { ContextMenuItemProps } from "./ContextMenuItem";
import { ContextMenuItemGroupProps } from "./ContextMenuItemGroup";
import "./styles/ContextSubMenu.css";

export interface ContextSubMenuProps extends ContextMenuItemProps {
  subMenuItems: ContextMenuItemGroupProps[];
  // ------- Inherited Values: -------
  // text: string;
  // itemType?: "radio" | "checklist" | "expandable";
  // onClick: () => void;
  // colour?: "discord" | "red";
  // icon?: IconType;
  // active?: boolean;
}

function ContextSubMenu(props: ContextSubMenuProps) {
  const [subMenuActive, setSubMenuActive] = useState(false);

  return (
    <div className="contextSubMenu">
      <ContextMenuItem
        text={props.text}
        itemType="expandable"
        onClick={props.onClick}
        colour={props.colour}
        icon={props.icon}
        active={props.active}
        onMouseEnter={() => {
          setSubMenuActive(true);
        }}
        onMouseLeave={() => {
          setSubMenuActive(false);
        }}
      />
    </div>
  );
}

export default ContextSubMenu;
