import { createContext, useLayoutEffect } from "react";
import { ContextMenuItemGroupProps } from "./ContextMenuItemGroup";
import "./styles/ContextMenu.css";

export interface ContextMenuProps {
  parent: HTMLElement | null;
  event: MouseEvent | null;
  items: ContextMenuItemGroupProps[];
}

export const ContextMenuCtx = createContext({
  setMenuDetails: (details: ContextMenuProps) => {},
  disableMenu: () => {},
});

function ContextMenu(props: ContextMenuProps) {
  // useLayoutEffect(() => {
  //   if (props.parent !== null) {
  //     const contextMenu = document.getElementById("contextmenu")!;
  //   }
  // }, [props.parent]);

  return props.parent !== null ? (
    <div className="contextMenu" id="contextMenu"></div>
  ) : null;
}

export default ContextMenu;
