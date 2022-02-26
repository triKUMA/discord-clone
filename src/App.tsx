import { useSelector } from "react-redux";
import "./App.css";
import { StoreType } from "./app/store";
import ChannelFeed from "./components/ChannelFeed/ChannelFeed";
import ServerList from "./components/ServerList/ServerList";
import Sidebar from "./components/Sidebar/Sidebar";
import NotificationBanner from "./components/general/NotificationBanner/NotificationBanner";
import NitroIcon from "./components/general/NitroIcon/NitroIcon";
import Tooltip, {
  TooltipCtx,
  TooltipProps,
} from "./components/general/Tooltip/Tooltip";
import { useState } from "react";
import ContextMenu, {
  ContextMenuCtx,
  ContextMenuProps,
} from "./components/general/ContextMenu/ContextMenu";
import { ContextMenuItemGroupProps } from "./components/general/ContextMenu/ContextMenuItemGroup";
import { MdDetails } from "react-icons/md";

function App() {
  const [displayBanner, setDisplayBanner] = useState(false);

  // Context Menu Properties
  const [contextMenuDetails, setContextMenuDetails] =
    useState<ContextMenuProps>({ parent: null, event: null, items: [] });

  // Tooltip Properties
  const [tooltipDetails, setTooltipDetails] = useState<TooltipProps>({
    text: "",
    parent: null,
    parentSide: "right",
  });

  const activeUser = useSelector((state: StoreType) => {
    if (state.users.activeUser === null) {
      return null;
    } else {
      const activeUser = state.users.users.find(
        (user) => user.id === state.users.activeUser
      );

      return typeof activeUser !== "undefined" ? activeUser : null;
    }
  });

  const activeServer = useSelector((state: StoreType) => {
    if (state.servers.activeServer === null) {
      return null;
    } else {
      const activeServer = state.servers.servers.find(
        (server) => server.id === state.servers.activeServer
      );

      return typeof activeServer !== "undefined" ? activeServer : null;
    }
  });

  return (
    <div
      className="App"
      onContextMenu={(e) => {
        e.preventDefault();
      }}
    >
      <ContextMenuCtx.Provider
        value={{
          setMenuDetails: (details) => {
            setContextMenuDetails(details);
          },
          disableMenu: () => {
            setContextMenuDetails({ parent: null, event: null, items: [] });
          },
        }}
      >
        <TooltipCtx.Provider
          value={{
            setTooltipDetails: (details) => {
              setTooltipDetails(details);
            },
            disableTooltip: () => {
              setTooltipDetails({
                text: "",
                parent: null,
                parentSide: "right",
              });
            },
          }}
        >
          {activeUser === null ? (
            <></>
          ) : (
            <>
              <ServerList activeUser={activeUser} />
              <div className="mainArea-wrapper">
                {displayBanner && (
                  <NotificationBanner>
                    <NitroIcon className="icon" />
                    <p className="text">
                      Hey, you have something waiting for you in your gift
                      inventory! Don't forget to claim it before it's lost.
                    </p>
                    <button>Take me there</button>
                  </NotificationBanner>
                )}
                <div className="mainArea">
                  <Sidebar activeServer={activeServer} />
                  <ChannelFeed />
                </div>
              </div>
            </>
          )}
        </TooltipCtx.Provider>
      </ContextMenuCtx.Provider>

      {/* Global Singular Elements */}
      <ContextMenu
        parent={contextMenuDetails.parent}
        event={contextMenuDetails.event}
        items={contextMenuDetails.items}
      />
      <Tooltip
        text={tooltipDetails.text}
        parent={tooltipDetails.parent}
        parentSide={tooltipDetails.parentSide}
        offset={tooltipDetails.offset}
      />
    </div>
  );
}

export default App;
