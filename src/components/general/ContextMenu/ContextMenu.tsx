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

    window.addEventListener("resize", () => {
      setMenuActive(false);
    });
  }, []);

  useEffect(() => {
    setMenuActive(props.event !== null);
  }, [props.event]);

  useLayoutEffect(() => {
    if (menuActive) {
      const contextMenu = document.getElementById("contextMenu");
      if (contextMenu !== null) {
        contextMenu.style.left = props.event!.x - 2 + "px";
        contextMenu.style.top = props.event!.y - 2 + "px";

        const boundBox = contextMenu.getBoundingClientRect();
        const spacing = 8;

        if (boundBox.width > window.innerWidth - spacing * 2) {
          contextMenu.style.left = spacing + "px";
          contextMenu.style.maxWidth = window.innerWidth - spacing * 2 + "px";
        } else if (
          boundBox.left + boundBox.width >
          window.innerWidth - spacing
        ) {
          contextMenu.style.left =
            window.innerWidth - spacing - boundBox.width + "px";
        } else if (boundBox.left < spacing) {
          contextMenu.style.left = spacing + "px";
        }

        if (boundBox.height > window.innerHeight - spacing * 2) {
          contextMenu.style.top = spacing + "px";
          contextMenu.style.maxHeight = window.innerHeight - spacing * 2 + "px";
        } else if (
          boundBox.top + boundBox.height >
          window.innerHeight - spacing
        ) {
          contextMenu.style.top =
            window.innerHeight - spacing - boundBox.height + "px";
        } else if (boundBox.top < spacing) {
          contextMenu.style.top = spacing + "px";
        }
      }
    }
  }, [menuActive, props.event]);

  return menuActive && props.menuItems.length > 0 ? (
    <div className="contextMenu" id="contextMenu">
      {props.menuItems.map((item, index) => {
        return (
          <>
            <ContextMenuItemGroup
              groupType={item.groupType}
              groupItems={item.groupItems}
            />
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
