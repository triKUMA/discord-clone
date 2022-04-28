import { ServerType } from "../../../types/ServerType";
import { UserType } from "../../../types/UserType";
import ChannelFeed from "./ChannelFeed/ChannelFeed";
import ServerSidebar from "./ServerSidebar/ServerSidebar";
import "./styles/ServerContent.css";

interface ServerContentProps {
  activeServer: ServerType;
  activeUser: UserType;
}

function ServerContent(props: ServerContentProps) {
  return (
    <div className="serverContent">
      <ServerSidebar activeServer={props.activeServer} />
      <ChannelFeed activeServer={props.activeServer} />
    </div>
  );
}

export default ServerContent;
