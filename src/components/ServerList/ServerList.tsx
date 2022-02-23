import "./styles/ServerList.css";
import { useState } from "react";
import { ServerType } from "../../types/ServerType";
import Modal from "../general/Modal/Modal";
import DownloadAppsCTA from "./DownloadAppsCTA";
import ServerIcon from "./ServerIcon";
import { FaDiscord } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import { IoCompassSharp } from "react-icons/io5";
import { HiOutlineDownload } from "react-icons/hi";
import NewServerCTA from "./NewServerCTA";
import { UserType } from "../../types/UserType";
import { useSelector } from "react-redux";
import { StoreType } from "../../app/store";

interface ServerListProps {
  activeUser: UserType;
}

function ServerList(props: ServerListProps) {
  const [dlAppsModal, setDLAppsModal] = useState(false);
  const [newServerModal, setNewServerModal] = useState(false);
  const servers = useSelector((state: StoreType) => state.servers.servers);

  return (
    <div className="serverList">
      <ServerIcon icon={FaDiscord} text="Home" variant="discord" />

      <div className="separator" />

      {servers.map((item) => (
        <ServerIcon
          imgSrc={item.iconSrc !== null ? item.iconSrc : undefined}
          text={item.name}
        />
      ))}

      <ServerIcon
        icon={AiOutlinePlus}
        text="Add a Server"
        onClick={() => {
          setNewServerModal(true);
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
        onClick={() => setDLAppsModal(true)}
        variant="green"
      />

      {/* New Server Modal */}
      <Modal
        active={newServerModal}
        handleDisable={() => {
          setNewServerModal(false);
        }}
      >
        <NewServerCTA activeUser={props.activeUser} />
      </Modal>

      {/* Download Apps Modal */}
      <Modal
        active={dlAppsModal}
        handleDisable={() => {
          setDLAppsModal(false);
        }}
      >
        <DownloadAppsCTA />
      </Modal>
    </div>
  );
}

export default ServerList;
