import { useState } from "react";
import { ServerType } from "../../../types/ServerType";
import { UserType } from "../../../types/UserType";
import NitroIcon from "../../general/NitroIcon/NitroIcon";
import NotificationBanner from "../../general/NotificationBanner/NotificationBanner";
import ChannelFeed from "./ChannelFeed/ChannelFeed";
import ServerSidebar from "./ServerSidebar/ServerSidebar";
import "./styles/ServerContent.css";

interface ServerContentProps {
  activeServer: ServerType;
  activeUser: UserType;
}

function ServerContent(props: ServerContentProps) {
  const [displayBanner, setDisplayBanner] = useState(false);

  return (
    <div className="serverContent">
      <div className="mainArea-wrapper">
        {displayBanner && (
          <NotificationBanner>
            <NitroIcon className="icon" />
            <p className="text">
              Hey, you have something waiting for you in your gift inventory!
              Don't forget to claim it before it's lost.
            </p>
            <button>Take me there</button>
          </NotificationBanner>
        )}
        <div className="mainArea">
          <ServerSidebar activeServer={props.activeServer} />
          <ChannelFeed />
        </div>
      </div>
    </div>
  );
}

export default ServerContent;
