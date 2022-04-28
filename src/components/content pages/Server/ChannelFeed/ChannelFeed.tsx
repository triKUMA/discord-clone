import { ServerType } from "../../../../types/ServerType";
import NotYetImplemented from "../../../general/NotYetImplemented/NotYetImplemented";
import ChannelFeedHeader from "./ChannelFeedHeader";
import "./styles/ChannelFeed.css";

interface ChannelFeedProps {
  activeServer: ServerType;
}

function ChannelFeed(props: ChannelFeedProps) {
  return (
    <div className="channelFeed">
      <ChannelFeedHeader activeServer={props.activeServer} />
      <NotYetImplemented />
    </div>
  );
}

export default ChannelFeed;
