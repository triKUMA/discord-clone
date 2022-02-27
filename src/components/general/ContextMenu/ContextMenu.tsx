import { createContext, useEffect, useLayoutEffect, useState } from "react";
import ContextMenuItemGroup, {
  ContextMenuItemGroupProps,
} from "./ContextMenuItemGroup";
import "./styles/ContextMenu.css";

export interface ContextMenuProps {
  event: MouseEvent | null;
  menuItems: ContextMenuItemGroupProps[];
}

export const ContextMenuCtx = createContext({
  setMenuDetails: (details: ContextMenuProps) => {},
  disableMenu: () => {},
});

function ContextMenu(props: ContextMenuProps) {
  const [menuActive, setMenuActive] = useState(false);

  useEffect(() => {
    document.addEventListener("mouseup", (e) => {
      const contextMenu = document.getElementById("contextMenu");
      const target = e.target as HTMLElement | null;

      if (
        contextMenu !== null &&
        e.button !== 1 &&
        !contextMenu.contains(target)
      ) {
        setMenuActive(false);
      }
    });
  }, []);

  useEffect(() => {
    setMenuActive(props.event !== null);
  }, [props.event]);

  useLayoutEffect(() => {
    if (menuActive) {
      const contextMenu = document.getElementById("contextMenu");
      if (contextMenu !== null) {
        contextMenu.style.left = props.event!.x - 5 + "px";
        contextMenu.style.top = props.event!.y - 5 + "px";
      }
    }
  }, [menuActive, props.event]);

  return menuActive && props.menuItems.length > 0 ? (
    <div className="contextMenu" id="contextMenu">
      {props.menuItems.map((item, index) => {
        return (
          <>
            <ContextMenuItemGroup groupItems={item.groupItems} key={index} />
            {index !== props.menuItems.length - 1 && (
              <div className="separator"></div>
            )}
          </>
        );
      })}
    </div>
  ) : null;
}

export default ContextMenu;
