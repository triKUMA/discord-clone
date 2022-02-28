import { useState } from "react";
import ContextMenuItem, { ContextMenuItemProps } from "./ContextMenuItem";
import ContextMenuItemGroup, {
  ContextMenuItemGroupProps,
} from "./ContextMenuItemGroup";
import "./styles/ContextSubMenu.css";
import { FiChevronRight } from "react-icons/fi";

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
    <div className="contextSubMenu-wrapper">
      <ContextMenuItem
        text={props.text}
        icon={FiChevronRight}
        itemType="expandable"
        onClick={props.onClick}
        onMouseEnter={() => {
          setSubMenuActive(true);
          props.onMouseEnter && props.onMouseEnter();
        }}
        onMouseLeave={() => {
          props.onMouseLeave && props.onMouseLeave();
          setSubMenuActive(false);
        }}
        colour={props.colour}
        active={subMenuActive}
        disabled={props.disabled}
      />
      {subMenuActive && props.subMenuItems.length > 0 && (
        <div
          className="contextSubMenu-spacer"
          onMouseEnter={() => {
            setSubMenuActive(true);
          }}
          onMouseLeave={() => {
            setSubMenuActive(false);
          }}
        >
          <div className="contextSubMenu">
            {props.subMenuItems.map((item, index) => {
              return (
                <>
                  <ContextMenuItemGroup
                    groupType={item.groupType}
                    groupItems={item.groupItems}
                  />
                  {index !== props.subMenuItems.length - 1 && (
                    <div className="separator"></div>
                  )}
                </>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default ContextSubMenu;
