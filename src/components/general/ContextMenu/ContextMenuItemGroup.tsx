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
              subMenuItems={item.subMenuItems}
              dir={item.dir}
              text={item.text}
              itemType="expandable"
              onClick={item.onClick}
              onMouseEnter={item.onMouseEnter}
              onMouseLeave={item.onMouseLeave}
              colour={item.colour}
              active={item.active}
              disabled={item.disabled}
            />
          );
        } else {
          return (
            <ContextMenuItem
              text={item.text}
              icon={item.icon}
              itemType={
                typeof props.groupType !== "undefined"
                  ? props.groupType
                  : item.itemType
              }
              onClick={item.onClick}
              onMouseEnter={item.onMouseEnter}
              onMouseLeave={item.onMouseLeave}
              colour={item.colour}
              active={item.active}
              disabled={item.disabled}
            />
          );
        }
      })}
    </div>
  );
}

export default ContextMenuItemGroup;
