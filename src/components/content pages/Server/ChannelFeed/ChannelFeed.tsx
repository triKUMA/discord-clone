import { useState } from "react";
import { ServerType } from "../../../../types/ServerType";
import NotYetImplemented from "../../../general/NotYetImplemented/NotYetImplemented";
import MemberList from "../MemberList/MemberList";
import ChannelFeedHeader from "./ChannelFeedHeader";
import ChannelFeedInput from "./ChannelFeedInput";
import "./styles/ChannelFeed.css";

interface ChannelFeedProps {
  activeServer: ServerType;
}

function ChannelFeed(props: ChannelFeedProps) {
  const [memberPanelActive, setMemberPanelActive] = useState(true);

  return (
    <div className="channelFeed-area-wrapper">
      <ChannelFeedHeader
        activeServer={props.activeServer}
        setMemberListActive={(input: boolean) => {
          setMemberPanelActive(input);
        }}
      />
      <div className="channelFeed-area">
        <div className="channelFeed-wrapper">
          <div className="channelFeed">
            {[...Array(15)].map((item, index) => (
              <div className="test">{index}</div>
            ))}
          </div>
          <ChannelFeedInput />
        </div>
        {memberPanelActive && <MemberList />}
      </div>
    </div>
  );
}

export default ChannelFeed;
