import { useState } from "react";
import { ServerType } from "../../../../types/ServerType";
import NotYetImplemented from "../../../general/NotYetImplemented/NotYetImplemented";
import MemberList from "../MemberList/MemberList";
import ChannelFeedHeader from "./ChannelFeedHeader";
import "./styles/ChannelFeed.css";

interface ChannelFeedProps {
  activeServer: ServerType;
}

function ChannelFeed(props: ChannelFeedProps) {
  const [memberPanelActive, setMemberPanelActive] = useState(false);

  return (
    <div className="channelFeed-wrapper">
      <ChannelFeedHeader
        activeServer={props.activeServer}
        setMemberListActive={(input: boolean) => {
          setMemberPanelActive(input);
        }}
      />
      <div className="channelFeed">
        <NotYetImplemented />
        {memberPanelActive && <MemberList />}
      </div>
    </div>
  );
}

export default ChannelFeed;
