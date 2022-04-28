import { useSelector } from "react-redux";
import "./App.css";
import { StoreType } from "./app/store";
import ChannelFeed from "./components/content pages/Server/ChannelFeed/ChannelFeed";
import ServerList from "./components/ServerList/ServerList";
import ServerSidebar from "./components/content pages/Server/ServerSidebar/ServerSidebar";
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
import ServerContent from "./components/content pages/Server/ServerContent";
import HomeContent from "./components/content pages/Home/HomeContent";
import ExploreContent from "./components/content pages/Explore/ExploreContent";

function App() {
  const [displayBanner, setDisplayBanner] = useState(false);

  // Context Menu Properties
  const [contextMenuDetails, setContextMenuDetails] =
    useState<ContextMenuProps>({ event: null, menuItems: [] });

  // Tooltip Properties
  const [tooltipDetails, setTooltipDetails] = useState<TooltipProps>({
    text: "",
    parent: null,
    parentSide: "right",
    size: "sm",
  });

  const activeUserID = useSelector(
    (state: StoreType) => state.users.activeUser
  );

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

  const activeServerID = useSelector(
    (state: StoreType) => state.servers.activeServer
  );

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
            setContextMenuDetails({ event: null, menuItems: [] });
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
                size: "sm",
              });
            },
          }}
        >
          {activeUser !== null && (
            <>
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
                  <ServerList
                    activeUser={activeUser}
                    activeServer={activeServer}
                  />

                  {activeServerID === "home" ? (
                    <HomeContent />
                  ) : activeServerID === "explore" ? (
                    <ExploreContent />
                  ) : activeServer !== null ? (
                    <ServerContent
                      activeServer={activeServer}
                      activeUser={activeUser}
                    />
                  ) : (
                    <>
                      <div className="sidebarPlaceholder" />
                      <div className="feedPlaceholder" />
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </TooltipCtx.Provider>
      </ContextMenuCtx.Provider>

      {/* Global Singular Elements */}
      <ContextMenu
        event={contextMenuDetails.event}
        menuItems={contextMenuDetails.menuItems}
      />
      <Tooltip
        text={tooltipDetails.text}
        parent={tooltipDetails.parent}
        parentSide={tooltipDetails.parentSide}
        size={tooltipDetails.size}
        offset={tooltipDetails.offset}
      />
    </div>
  );
}

export default App;
