import "./styles/ContextMenuItemGroup.css";
import ContextMenuItem, { ContextMenuItemProps } from "./ContextMenuItem";
import ContextSubMenu, { ContextSubMenuProps } from "./ContextSubMenu";

export interface ContextMenuItemGroupProps {
  listType?: "list" | "radio" | "checklist";
  items: (ContextMenuItemProps | ContextSubMenuProps)[];
}

function ContextMenuItemGroup(props: ContextMenuItemGroupProps) {
  function isContextSubMenu(
    item: ContextMenuItemProps | ContextSubMenuProps
  ): item is ContextSubMenuProps {
    return typeof (item as ContextSubMenuProps).items !== "undefined";
  }

  return (
    <div className="contextMenuItemGroup">
      {props.items.map((item) => {
        if (isContextSubMenu(item)) {
          return (
            <ContextSubMenu
              text={item.text}
              itemType={item.itemType}
              onClick={item.onClick}
              items={item.items}
              listType={item.listType}
              colour={item.colour}
              active={item.active}
              breakAfter={item.breakAfter}
            />
          );
        } else {
          return (
            <ContextMenuItem
              text={item.text}
              onClick={item.onClick}
              itemType={item.itemType}
              active={item.active}
              colour={item.colour}
              breakAfter={item.breakAfter}
            />
          );
        }
      })}
    </div>
  );
}

export default ContextMenuItemGroup;
