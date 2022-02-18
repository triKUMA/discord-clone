import ServerIcon from "../Icons/Server/ServerIcon";
import "./styles/ServerList.css";
import { FaDiscord } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import { IoCompassSharp } from "react-icons/io5";
import { HiOutlineDownload } from "react-icons/hi";

function ServerList() {
  return (
    <div className="serverList">
      <ServerIcon icon={FaDiscord} text="Home" variant="discord" />
      <ServerIcon
        imgSrc="https://images.freeimages.com/images/thumbs/ae4/landscape-1311222.jpg"
        text="Server"
      />
      <div className="separator" />
      <ServerIcon text="MSMA" notification={true} />
      <ServerIcon
        imgSrc="https://dhwwtar19mmjy.apowersoft.info/screenshot/wp-content/uploads/2014/10/landscape-hd-walls.jpg"
        text="Server"
      />
      <ServerIcon
        imgSrc="https://www.rockymtnrefl.com/Sedonacd171tb.jpg"
        text="Server"
      />
      <ServerIcon icon={AiOutlinePlus} text="Add a Server" variant="green" />
      <ServerIcon
        icon={IoCompassSharp}
        text="Explore Public Servers"
        variant="green"
      />
      <div className="separator" />
      <ServerIcon
        icon={HiOutlineDownload}
        text="Download Apps"
        variant="green"
      />
    </div>
  );
}

export default ServerList;
