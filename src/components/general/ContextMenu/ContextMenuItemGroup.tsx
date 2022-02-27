import "./styles/ContextMenuItemGroup.css";
import ContextMenuItem, { ContextMenuItemProps } from "./ContextMenuItem";
import ContextSubMenu, { ContextSubMenuProps } from "./ContextSubMenu";

export interface ContextMenuItemGroupProps {
  groupType?: "radio" | "checklist";
  groupItems: (ContextMenuItemProps | ContextSubMenuProps)[];
}

function ContextMenuItemGroup(props: ContextMenuItemGroupProps) {
  function isContextSubMenu(
    item: ContextMenuItemProps | ContextSubMenuProps
  ): item is ContextSubMenuProps {
    return typeof (item as ContextSubMenuProps).subMenuItems !== "undefined";
  }

  return (
    <div className="contextMenuItemGroup">
      {props.groupItems.map((item, index) => {
        if (isContextSubMenu(item)) {
          return (
            <ContextSubMenu
              text={item.text}
              itemType="expandable"
              onClick={item.onClick}
              subMenuItems={item.subMenuItems}
              colour={item.colour}
              active={item.active}
              key={index}
            />
          );
        } else {
          return (
            <ContextMenuItem
              text={item.text}
              onClick={item.onClick}
              itemType={
                typeof item.itemType !== "undefined"
                  ? item.itemType
                  : props.groupType
              }
              active={item.active}
              colour={item.colour}
              key={index}
            />
          );
        }
      })}
    </div>
  );
}

export default ContextMenuItemGroup;
