import { useSelector } from "react-redux";
import "./App.css";
import { StoreType } from "./app/store";
import ChannelFeed from "./components/ChannelFeed/ChannelFeed";
import ServerList from "./components/ServerList/ServerList";
import Sidebar from "./components/Sidebar/Sidebar";
import NotificationBanner from "./components/general/NotificationBanner/NotificationBanner";
import NitroIcon from "./components/general/NitroIcon/NitroIcon";
import Tooltip, { TooltipCtx } from "./components/general/Tooltip/Tooltip";
import { useState } from "react";

function App() {
  const [tooltipText, setTooltipText] = useState<string | null>("Tooltip");
  const [tooltipParent, setTooltipParent] = useState<HTMLElement | null>(null);
  const [tooltipParentSide, setTooltipParentSide] = useState<
    "left" | "right" | "top" | "bottom"
  >("right");
  const [tooltipOffset, setTooltipOffset] = useState<number | undefined>(
    undefined
  );
  const [tooltipActive, setTooltipActive] = useState(false);

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
    <div className="App">
      <TooltipCtx.Provider
        value={{
          setDetails: (details) => {
            setTooltipText(details.text);
            setTooltipParent(details.parent);
            setTooltipParentSide(details.parentSide);
            setTooltipOffset(details.offset);
          },
          disableTooltip: () => {
            setTooltipParent(null);
          },
        }}
      >
        {activeUser === null ? (
          <></>
        ) : (
          <>
            <ServerList activeUser={activeUser} />
            <div className="mainArea-wrapper">
              <NotificationBanner>
                <NitroIcon className="icon" />
                <p className="text">
                  Hey, you have something waiting for you in your gift
                  inventory! Don't forget to claim it before it's lost.
                </p>
                <button>Take me there</button>
              </NotificationBanner>
              <div className="mainArea">
                <Sidebar activeServer={activeServer} />
                <ChannelFeed />
              </div>
            </div>
          </>
        )}
      </TooltipCtx.Provider>
      <Tooltip
        text={tooltipText}
        parent={tooltipParent}
        parentSide={tooltipParentSide}
        offset={tooltipOffset}
      />
    </div>
  );
}

export default App;
