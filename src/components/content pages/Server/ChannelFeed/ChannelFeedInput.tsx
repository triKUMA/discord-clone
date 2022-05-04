import { useEffect } from "react";
import { IoMdAddCircle } from "react-icons/io";
import { ChannelType } from "../../../../types/ChannelType";
import "./styles/ChannelFeedInput.css";

interface ChannelFeedInputProps {
  activeChannel: ChannelType;
}

function ChannelFeedInput(props: ChannelFeedInputProps) {
  useEffect(() => {}, []);

  return (
    <div className="channelFeedInput-wrapper" id="channelFeedInput-wrapper">
      <div className="channelFeedInput" id="channelFeedInput">
        <div className="input-left">
          <IoMdAddCircle className="input-icon" />
        </div>
        <textarea
          className="input-field"
          placeholder={"Message #" + props.activeChannel.name}
          rows={1}
          onChange={(e) => {
            const textArea = e.currentTarget as HTMLTextAreaElement;
            textArea.style.height = "1rem";
            textArea.style.height = textArea.scrollHeight + "px";

            const mainWrapper = document.getElementById(
              "channelFeedInput-wrapper"
            );

            const input = document.getElementById("channelFeedInput");

            if (mainWrapper != null && input != null) {
              mainWrapper.style.height = "2.75rem";
              mainWrapper.style.height =
                e.currentTarget.getBoundingClientRect().height + "px";
            }
          }}
        />
        <div className="input-right"></div>
      </div>
    </div>
  );
}

export default ChannelFeedInput;
