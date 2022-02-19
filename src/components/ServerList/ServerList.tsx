import ServerIcon from "./ServerIcon";
import "./styles/ServerList.css";
import { FaDiscord } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import { IoCompassSharp } from "react-icons/io5";
import { HiOutlineDownload } from "react-icons/hi";
import { RandServer } from "../../helper/RandomData";
import { useState } from "react";
import { ServerType } from "../../types/ServerType";
import Modal from "../Modal/Modal";

function ServerList() {
  const [downloadModal, setDownloadModal] = useState(false);
  const [friends, setFriends] = useState<ServerType[]>([]);
  const [servers, setServers] = useState<ServerType[]>([]);

  return (
    <div className="serverList">
      <ServerIcon
        icon={FaDiscord}
        text="Home"
        onClick={() => {
          setFriends(friends.concat(RandServer()));
        }}
        variant="discord"
      />

      {friends.map((item) => (
        <ServerIcon imgSrc={item.imgSrc} text={item.name} />
      ))}

      <div className="separator" />

      {servers.map((item) => (
        <ServerIcon imgSrc={item.imgSrc} text={item.name} />
      ))}

      <ServerIcon
        icon={AiOutlinePlus}
        text="Add a Server"
        onClick={() => {
          setServers(servers.concat(RandServer()));
        }}
        disablePill
        variant="green"
      />
      <ServerIcon
        icon={IoCompassSharp}
        text="Explore Public Servers"
        variant="green"
      />

      <div className="separator" />

      <ServerIcon
        icon={HiOutlineDownload}
        text="Download Apps"
        onClick={() => setDownloadModal(true)}
        variant="green"
      />

      <Modal
        active={downloadModal}
        handleDisable={() => {
          setDownloadModal(false);
        }}
      >
        <div className="dlAppsModal"></div>
      </Modal>
    </div>
  );
}

export default ServerList;
